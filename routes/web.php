<?php

use Illuminate\Support\Facades\Route;

Route::get('/', fn () => inertia('Home'));
Route::get('/login', fn () => inertia('Login'));
Route::get('/register', fn () => inertia('Register'));


Route::get('/users', fn () => inertia('users/index'));
Route::get('/livres', fn () => inertia('livres/index'));
Route::get('/categories', fn () => inertia('categories/index'));
Route::get('/commandes', fn () => inertia('commandes/index'));


