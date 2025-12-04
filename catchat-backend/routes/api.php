<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'
], function ($router) {
    Route::post('login', [\App\Http\Controllers\AuthController::class, 'login']);
    Route::post('register', [\App\Http\Controllers\AuthController::class, 'register']);
    Route::post('logout', [\App\Http\Controllers\AuthController::class, 'logout']);
    Route::post('refresh', [\App\Http\Controllers\AuthController::class, 'refresh']);
    Route::post('me', [\App\Http\Controllers\AuthController::class, 'me']);
    Route::post('profile', [\App\Http\Controllers\AuthController::class, 'updateProfile']);
});

Route::group(['middleware' => ['api', 'auth:api']], function () {
    Route::post('friend-request/send', [\App\Http\Controllers\FriendRequestController::class, 'sendRequest']);
    Route::get('friend-request/pending', [\App\Http\Controllers\FriendRequestController::class, 'getPendingRequests']);
    Route::post('friend-request/accept/{id}', [\App\Http\Controllers\FriendRequestController::class, 'acceptRequest']);
    Route::post('friend-request/reject/{id}', [\App\Http\Controllers\FriendRequestController::class, 'rejectRequest']);
    Route::get('friends', [\App\Http\Controllers\FriendRequestController::class, 'getFriends']);
    Route::delete('friends/{id}', [\App\Http\Controllers\FriendRequestController::class, 'removeFriend']);
});

Route::apiResource('users', \App\Http\Controllers\UserController::class);
