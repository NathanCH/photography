<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

// Authentication routes...
Route::get('login', 'Auth\AuthController@getLogin');
Route::post('login', 'Auth\AuthController@postLogin');
Route::get('logout', 'Auth\AuthController@logout');

// Registration routes...
Route::get('register', 'Auth\AuthController@getRegister');
Route::post('register', 'Auth\AuthController@postRegister');

// Photos routes...
Route::resource('photos', 'PhotosController');
Route::get('photos/{id}/next', 'PhotosController@next');
Route::get('photos/{id}/prev', 'PhotosController@prev');

// API routes...
Route::group(['prefix' => 'api'], function() {

	Route::get('photos', 'ApiController@all');
	Route::get('photos/{id}', 'ApiController@show');
	Route::get('photos/{id}/next', 'ApiController@next');
	Route::get('photos/{id}/prev', 'ApiController@prev');

	Route::post('photos', 'ApiController@store');
	Route::delete('photos/{id}', 'ApiController@destroy');
});
