<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
use Laravel\Lumen\Routing\Controller as BaseController;

/*
Author : Zilya
ConnectController has one function.

-respondWithToken : It will return infomations of user and token.
                    token, token_type, expire_time, user_info
*/

class Controller extends BaseController
{
    protected function respondWithToken($token)
    {
        return response()->json([
            'token' => $token,
            'token_type' => 'bearer',
            'expires_in' => Auth::factory()->getTTL() * 60,
            'user_info' => Auth::user()
        ], 200);
    }
}
