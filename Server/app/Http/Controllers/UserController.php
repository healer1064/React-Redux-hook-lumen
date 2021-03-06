<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use  App\User;
use  App\Connect;

/*
Author : Zilya
UserController has functions related to user management.

- profile : return requested users' information.
- editProfile : edit requested users' information. 
                Request has updated firstname and updated lastname of user.
                change firstname and lastname of requested user and return information of user and token.
- saveSchedule : create schedule. request has info of schedule.
                Return all schedules between saver and partner.
- allUsers : get all users in this site.
                Return all users information in user table include connection status with requested user.
                Search connect table and set connect of response 
                    1 if user connected,
                    0 if user disconneted
- updateSchedule : update existed schedule. request has id of schedule in table and updated schedule.
*/

class UserController extends Controller
{
     /**
     * Instantiate a new UserController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Get the authenticated User.
     *
     * @return Response
     */
    public function profile()
    {
        return response()->json(['user' => Auth::user()], 200);
    }

    public function editProfile(Request $request)
    {
        //validate incoming request 
        $this->validate($request, [
            'firstName' => 'required|string',
            'lastName' => 'required|string'
        ]);

        try {
           
            $user =  Auth::user();
            $user->firstName = $request->input('firstName');
            $user->lastName = $request->input('lastName');

            $user->save();
            $token = $request->bearerToken();
            
            //return successful response
            return response()->json([
                'token' => $token,
                'token_type' => 'bearer',
                'expires_in' => Auth::factory()->getTTL() * 60,
                'user_info' => $user
            ], 201);

        } catch (\Exception $e) {
            //return error message
            return response()->json(['message' => 'User Registration Failed!'], 409);
        }
    }

    /**
     * Get all User.
     *
     * @return Response
     */
    public function allUsers($id)
    {
        $usersWithoutMe = User::where('id', '<>', $id)->get();
        // $connectedUserIds = DB::select('SELECT secondId FROM connects WHERE firstId = ? UNION SELECT firstId FROM connects WHERE secondId = ?', [$id, $id]);
        $a = Connect::select('secondId')->where('firstId', $id);
        $b = Connect::select('firstId')->where('secondId', $id);
        $connectedUserIds = $a->union($b)->get();
        $users = [];
        $idArr = [];
        foreach($connectedUserIds as $connectedUserId) {
            array_push($idArr, $connectedUserId->secondId);
        }
        foreach($usersWithoutMe as $user) {
            if(in_array($user->id, $idArr)) {
                $user->connect = 1;
                array_push($users, $user);
            }
            else {
                $user->connect = 0;
                array_push($users, $user);
            }
        }
        return response()->json(['users' => $users], 200);
        
        // return response()->json(['users' =>  User::all()], 200);

    }

}
