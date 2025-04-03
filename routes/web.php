<?php

use Illuminate\Support\Facades\Route;

Route::get('/', fn () => inertia('Home'));
Route::get('/contact', fn () => inertia('Contact'));
Route::get('/catalogue', fn () => inertia('Catalogue'));
Route::get('/login', fn () => inertia('Login'));
Route::get('/register', fn () => inertia('Register'));


Route::get('/admin/dashboard', fn () => inertia('admin/dashboard'));
Route::get('/admin/users', fn () => inertia('admin/users/index'));
Route::get('/admin/books', fn () => inertia('admin/books/index'));
Route::get('/admin/categories', fn () => inertia('admin/categories/index'));
Route::get('/admin/orders', fn () => inertia('admin/orders/index'));


