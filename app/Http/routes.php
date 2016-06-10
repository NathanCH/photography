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

Route::resource('photos', 'PhotosController');

Route::group(['prefix' => 'api'], function() {

	Route::get('photos', 'ApiController@all');
	Route::get('photos/{id}', 'ApiController@view');

	Route::post('photos', 'ApiController@store');
});
