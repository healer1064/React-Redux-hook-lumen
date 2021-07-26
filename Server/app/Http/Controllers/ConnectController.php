<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use  App\Connect;

/*
Author : Zilya
ConnectController has two functions related to connect operation

- disconnect: input value is Two users id in User table.
                First find connect which firstId and secondId is myId and otherId.
                Then delete.
- connect: This is opposite of disconnect.
                Save myId as firstId and otherId as secondId
In both function, if failed, return 'failed' message.
*/

class ConnectController extends Controller
{
     /**
     * Instantiate a new ConnectController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function disconnect($myId, $otherId) {
        try {
            // DB::statement('delete from connects where (firstId = ? AND secondId = ?) or (firstId = ? AND secondId = ?)', [$myId, $otherId, $otherId, $myId]);
            Connect::where([['firstId', '=', $myId],['secondId', '=', $otherId]])->orWhere([['firstId', '=', $otherId],['secondId', '=', $myId]])->delete();
            return response()->json(['message' => 'success to disconnect'], 200);

        } catch (\Exception $e) {

            return response()->json(['message' => 'fail to disconnect'], 404);
        }
    }

    public function connect($myId, $otherId) {
        try {
            // DB::insert('insert into connects (firstId, secondId, created_at, updated_at) values (?, ?, NOW(), NOW())', [$myId, $otherId]);
            Connect::create(['firstId'=>$myId, 'secondId'=>$otherId]);
            return response()->json(['message' => 'success to connect'], 200);

        } catch (\Exception $e) {

            return response()->json(['message' => 'fail to connect'], 404);
        }
    }
}
