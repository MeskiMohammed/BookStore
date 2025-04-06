<?php

use Illuminate\Support\Facades\Route;

Route::get('/', fn () => inertia('store/Home'));
Route::get('/propos', fn () => inertia('store/About'));
Route::get('/contact', fn () => inertia('store/Contact'));
Route::get('/catalogue', fn () => inertia('store/Catalogue'));
Route::get('/login', fn () => inertia('Login'));
Route::get('/register', fn () => inertia('Register'));


Route::get('/admin/dashboard', fn () => inertia('admin/dashboard'));
Route::get('/admin/users', fn () => inertia('admin/users/index'));
Route::get('/admin/books', fn () => inertia('admin/books/index'));
Route::get('/admin/categories', fn () => inertia('admin/categories/index'));
Route::get('/admin/orders', fn () => inertia('admin/orders/index'));


