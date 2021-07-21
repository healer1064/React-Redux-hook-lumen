<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use  App\Connect;

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
            DB::statement('delete from connect where (firstId = ? AND secondId = ?) or (firstId = ? AND secondId = ?)', [$myId, $otherId, $otherId, $myId]);
            return response()->json(['message' => 'success to disconnect'], 200);

        } catch (\Exception $e) {

            return response()->json(['message' => 'fail to disconnect'], 404);
        }
    }

    public function connect($myId, $otherId) {
        try {
            DB::insert('insert into connect (firstId, secondId, created_at, updated_at) values (?, ?, NOW(), NOW())', [$myId, $otherId]);
            return response()->json(['message' => 'success to connect'], 200);

        } catch (\Exception $e) {

            return response()->json(['message' => 'fail to connect'], 404);
        }
    }
}
