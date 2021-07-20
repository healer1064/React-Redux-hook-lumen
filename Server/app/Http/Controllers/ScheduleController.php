<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use  App\Schedule;

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

    public function allSchedules($myId, $partnerId) {
        
        try {
            $scheduleList = DB::select('select * from schedules where (firstId = ? AND secondId = ?) or (firstId = ? AND secondId = ?)', [$myId, $partnerId, $partnerId, $myId]);
            
            return response()->json(['scheduleList' => $scheduleList], 200);

        } catch (\Exception $e) {

            return response()->json(['message' => 'schedules not found!'], 404);
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

            $scheduleList = DB::select('select * from schedules where (firstId = ? AND secondId = ?) or (firstId = ? AND secondId = ?)', [$myId, $partnerId, $partnerId, $myId]);
            
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
            
            $scheduleList = DB::select('select * from schedules where (firstId = ? AND secondId = ?) or (firstId = ? AND secondId = ?)', [$myId, $partnerId, $partnerId, $myId]);
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

        // echo "-------------id";
        // echo $id;

        try {
           
            $schedule = Schedule::findOrFail($id);
            $schedule->meetTime = $request->input('meetTime');
            $schedule->title = $request->input('title');
            $schedule->description = $request->input('description');

            $myId = $schedule->firstId;
            $partnerId = $schedule->secondId;

            $schedule->save();

            $scheduleList = DB::select('select * from schedules where (firstId = ? AND secondId = ?) or (firstId = ? AND secondId = ?)', [$myId, $partnerId, $partnerId, $myId]);
            
            //return successful response
            return response()->json(['scheduleList' => $scheduleList], 200);

        } catch (\Exception $e) {
            echo $e;
            //return error message
            return response()->json(['message' => 'Saveing schedule Failed!'], 409);
        }

    }
    
}
