<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\LivreController;
use Illuminate\Support\Facades\Route;


Route::get('/login', [AuthController::class, 'showLoginForm'])->name('login');
Route::post('/login', [AuthController::class, 'login']);
Route::get('/register', [AuthController::class, 'showRegistrationForm'])->name('register');
Route::post('/register', [AuthController::class, 'register']);
Route::post('/logout', [AuthController::class, 'logout'])->name('logout');




Route::get('/', fn () => inertia('store/home'));
Route::get('/propos', fn () => inertia('store/about'));
Route::get('/contact', fn () => inertia('store/contact'));
Route::get('/catalogue', fn () => inertia('store/catalogue'));
Route::get('/details-product', fn () => inertia('store/details-product'));
Route::get('/cart', fn () => inertia('store/cart'));
Route::get('/checkout', fn () => inertia('store/checkout'));
Route::get('/profile', fn () => inertia('store/profile'));

// Route::get('/login', fn () => inertia('login'));
// Route::get('/register', fn () => inertia('register'));


Route::middleware('auth')->prefix('admin')->group(function(){
    Route::get('/', fn () => inertia('admin/dashboard'))->name('dashboard');
    Route::get('users', fn () => inertia('admin/users'))->name('users.index');
    Route::get('reviews', fn () => inertia('admin/reviews'))->name('reviews.index');
    Route::get('orders', fn () => inertia('admin/orders'))->name('orders.index');
    Route::get('order-details', fn () => inertia('admin/order-details'))->name('order-details.index');
    Route::get('categories', fn () => inertia('admin/categories'))->name('categories.index');

    Route::resource('books',LivreController::class);
});
