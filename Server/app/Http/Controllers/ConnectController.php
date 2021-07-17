<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use  App\Connect;

class ConnectController extends Controller
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

    public function getConnects($id) {
        
        try {
            $connect1 = DB::table('connect')->where('firstId', $id)->get();
            $connect2 = DB::table('connect')->where('secondId', $id)->get();
            $connectList = [];
            foreach ($connect1 as $connect) {
                array_push($connectList, $connect->secondId);
            }
            foreach ($connect2 as $connect) {
                array_push($connectList, $connect->firstId);
            }
            return response()->json(['connectList' => $connectList], 200);

        } catch (\Exception $e) {

            return response()->json(['message' => 'connect not found!'], 404);
        }
    }

    public function disconnect($myId, $otherId) {
        try {
            DB::statement('delete from connect where (firstId = ? AND secondId = ?) or (firstId = ? AND secondId = ?)', [$myId, $otherId, $otherId, $myId]);
            return response()->json(['message' => 'success to disconnect'], 200);

        } catch (\Exception $e) {

            return response()->json(['message' => 'fail to disconnect'], 404);
        }
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
    public function allUsers()
    {
        return response()->json(['users' =>  User::all()], 200);
    }

    /**
     * Get one user.
     *
     * @return Response
     */
    public function singleUser($id)
    {
        try {
            $user = User::findOrFail($id);

            return response()->json(['user' => $user], 200);

        } catch (\Exception $e) {

            return response()->json(['message' => 'user not found!'], 404);
        }

    }

}
