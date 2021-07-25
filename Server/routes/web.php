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

/*
cors middleware is needed to fix cors error This is happened oftenly in Reat+Laravel project.
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

        //disconnect other from me and send users' data
        $router->get('disconnect/{myId}/{otherId}', 'ConnectController@disconnect');

        //connect other from me and send users' data
        $router->get('connect/{myId}/{otherId}', 'ConnectController@connect');
        
        //get all schedules between I and partner
        $router->get('scheduleList/{myId}/{partnerId}', 'ScheduleController@partnerSchedules');
        
        //get all schedules between I and others
        $router->get('allScheduleList/{myId}', 'ScheduleController@allSchedules');

        // Matches "/api/saveSchedule
        $router->post('schedule', 'ScheduleController@saveSchedule');

        //cancel schedule by id
        $router->delete('schedule/{id}', 'ScheduleController@cancelSchedule');
        
        //update schedule by id
        $router->put('schedule/{id}', 'ScheduleController@updateSchedule');
    });
});