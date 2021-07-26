<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use  App\Schedule;
use  App\Connect;

/*
Author : Zilya
ScheduleController has functions related to schedule.

- partnerSchedules : Get All schedules between two users.
                    input request has 2 ids of user table.
                    Find all schedules which firstId and secondId is myId and partnerId or partnerId and myId.
- allSchedules : Get all schedules connected user who send request.
                    Except for schedules with disconnected users.
- saveSchedule : create schedule. request has info of schedule.
                    Return all schedules between saver and partner.
- cancelSchedule : delete schedule. request has id of schedule in table. 
                    Return all schedules between canceler and partner.
- updateSchedule : update existed schedule. request has id of schedule in table and updated schedule.
*/

class ScheduleController extends Controller
{
     /**
     * Instantiate a new ScheduleController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function partnerSchedules($myId, $partnerId) {
        
        try {
            // $scheduleList = DB::select('select * from schedules where (firstId = ? AND secondId = ?) or (firstId = ? AND secondId = ?)', [$myId, $partnerId, $partnerId, $myId]);
            $scheduleList = Schedule::where([['firstId', '=', $myId],['secondId', '=', $partnerId]])->orWhere([['firstId', '=', $partnerId],['secondId', '=', $myId]])->get();
            return response()->json(['scheduleList' => $scheduleList], 200);

        } catch (\Exception $e) {

            return response()->json(['message' => 'schedules not found!'], 404);
        }
    }

    public function allSchedules($myId) {
        
        try {
            $scheduleList1 = DB::select('select schedules.*, users.lastName as lastName, users.firstName as firstName from schedules join users on schedules.secondId = users.id where firstId = ?', [$myId]);
            $scheduleList2 = DB::select('select schedules.*, users.lastName as lastName, users.firstName as firstName from schedules join users on schedules.firstId = users.id where secondId = ?', [$myId]);
            $scheduleList3 = $scheduleList1 + $scheduleList2;
            $scheduleList = [];
            foreach($scheduleList3 as $schedule) {
                $con1 = Connect::where('firstId', $schedule->firstId)->where('secondId', $schedule->secondId)->get();
                $con2 = Connect::where('firstId', $schedule->secondId)->where('secondId', $schedule->firstId)->get();
                if(count($con1) > 0 || count($con2) > 0) {
                    array_push($scheduleList, $schedule);
                }
            }
            return response()->json(['scheduleList' => $scheduleList], 200);

        } catch (\Exception $e) {

            return response()->json(['message' => $e], 404);
        }
    }
    
    public function saveSchedule(Request $request)
    {
        //validate incoming request 
        $this->validate($request, [
            'myId' => 'required|integer',
            'partnerId' => 'required|integer',
            'meetTime' => 'required|string',
            'title' => 'required|string',
            'description' => 'required|string',
        ]);

        try {
           
            $schedule = new Schedule;
            $schedule->firstId = $request->input('myId');
            $schedule->secondId = $request->input('partnerId');
            $schedule->meetTime = $request->input('meetTime');
            $schedule->title = $request->input('title');
            $schedule->description = $request->input('description');

            $schedule->save();

            $myId = $request->input('myId');
            $partnerId = $request->input('partnerId');

            // $scheduleList = DB::select('select * from schedules where (firstId = ? AND secondId = ?) or (firstId = ? AND secondId = ?)', [$myId, $partnerId, $partnerId, $myId]);
            $scheduleList = Schedule::where([['firstId', '=', $myId],['secondId', '=', $partnerId]])->orWhere([['firstId', '=', $partnerId],['secondId', '=', $myId]])->get();
            
            //return successful response
            return response()->json(['scheduleList' => $scheduleList], 200);

        } catch (\Exception $e) {
            echo $e;
            //return error message
            return response()->json(['message' => 'Saveing schedule Failed!'], 409);
        }

    }
    
    public function cancelSchedule($id)
    {
        try {
            $schedule = Schedule::findOrFail($id);
            $myId = $schedule->firstId;
            $partnerId = $schedule->secondId;

            $schedule->delete();
            
            // $scheduleList = DB::select('select * from schedules where (firstId = ? AND secondId = ?) or (firstId = ? AND secondId = ?)', [$myId, $partnerId, $partnerId, $myId]);
            $scheduleList = Schedule::where([['firstId', '=', $myId],['secondId', '=', $partnerId]])->orWhere([['firstId', '=', $partnerId],['secondId', '=', $myId]])->get();
            //return successful response
            return response()->json(['scheduleList' => $scheduleList], 200);

        } catch (\Exception $e) {

            return response()->json(['message' => 'user not found!'], 404);
        }

    }

    public function updateSchedule($id, Request $request)
    {
        //validate incoming request 
        $this->validate($request, [
            'meetTime' => 'required|string',
            'title' => 'required|string',
            'description' => 'required|string',
        ]);

        try {
           
            $schedule = Schedule::findOrFail($id);
            $schedule->meetTime = $request->input('meetTime');
            $schedule->title = $request->input('title');
            $schedule->description = $request->input('description');

            $myId = $schedule->firstId;
            $partnerId = $schedule->secondId;

            $schedule->save();

            // $scheduleList = DB::select('select * from schedules where (firstId = ? AND secondId = ?) or (firstId = ? AND secondId = ?)', [$myId, $partnerId, $partnerId, $myId]);
            $scheduleList = Schedule::where([['firstId', '=', $myId],['secondId', '=', $partnerId]])->orWhere([['firstId', '=', $partnerId],['secondId', '=', $myId]])->get();
            
            //return successful response
            return response()->json(['scheduleList' => $scheduleList], 200);

        } catch (\Exception $e) {
            echo $e;
            //return error message
            return response()->json(['message' => 'Saveing schedule Failed!'], 409);
        }

    }
    
}
