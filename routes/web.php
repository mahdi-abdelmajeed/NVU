<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
//Route::get('logoutOtherDevices', 'API\AuthController@logoutOtherDevices');

Route::get('/profile', function () {
    // Only authenticated users may enter...
})->middleware('auth.basic');

Route::get('/welcome', function () {
    return view('welcome');
});
Route::get('/', function () {
    return view('nvu');
});
Route::get('/student', function () {
    return view('student');
});
Route::get('/stec', function () {
    return view('stec.index');
});
Route::post('/stec', function () {
    return view('stec.index');
});
Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
Route::get('/Auth/facebook', 'SocialAuthController@facebookLogin');
Route::domain('{account}.localhost')->group(function() {
    Route::get('user/{id}', function($account,$id) {
        return $account;
    });
});