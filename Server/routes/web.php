<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/
$router->group(['middleware' => 'cors'], function() use ($router)
{
    $router->get('/', function () use ($router) {
        return $router->app->version();
    });

    // API route group
    $router->group(['prefix' => 'api'], function () use ($router) {
        // Matches "/api/register
        $router->post('register', 'AuthController@register');

        // Matches "/api/login
        $router->post('login', 'AuthController@login');

        // Matches "/api/users
        $router->get('userList/{id}', 'UserController@allUsers');

        // Matches "/api/editProfile"
        $router->put('editProfile', 'UserController@editProfile');

        //get one user by id
        // $router->get('users/{id}', 'UserController@singleUser');

        // Matches "/api/profile
        // $router->get('profile', 'UserController@profile');

        //get one user by id
        // $router->get('connectList/{id}', 'ConnectController@getConnects');

        //disconnect other from me and send users' data
        $router->get('disconnect/{myId}/{otherId}', 'ConnectController@disconnect');

        //connect other from me and send users' data
        $router->get('connect/{myId}/{otherId}', 'ConnectController@connect');
        
        //get all schedules between I and partner
        $router->get('scheduleList/{myId}/{partnerId}', 'ScheduleController@allSchedules');
        

    });
});