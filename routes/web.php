<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {return inertia('Home');});
Route::get('/login', function () {return inertia('Login');});
Route::get('/register', function () {return inertia('Register');});




Route::get('/users', function () {return inertia('users/index');});
Route::get('/livres', function () {return inertia('livress/index');});
Route::get('/users', function () {return inertia('users/index');});
Route::get('/users', function () {return inertia('users/index');});


