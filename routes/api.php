<?php

//use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::group(['namespace' => 'API', 'prefix' => 'v1', 'middleware' => 'throttle:60,1',], function() {
    Route::post('login', 'AuthController@login');
    Route::group(['middleware' => 'auth:api'], function() {
        Route::post('logout', 'AuthController@logout');
        Route::group(['namespace' => 'User', 'prefix' => 'user'], function() {
            Route::get('profile', 'UserController@user');
            Route::get('search/{id?}','UserController@search');
            Route::apiResource('address', 'AddressController');
        });
        Route::group(['namespace' => 'Student', 'prefix' => 'studetn'/*, 'middleware' => 'student'*/], function() {
            Route::apiResource('proture', 'ProtureController');
        });
        Route::group(['namespace' => 'Admin', 'prefix' => 'admin'/*, 'middleware' => 'admin'*/], function() {
            Route::apiResource('studetn', 'StudentController');
        });
    });
});