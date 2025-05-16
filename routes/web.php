<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\LivreController;
use App\Http\Controllers\CategorieController;
use App\Http\Controllers\AvisController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\HomeController;
use Illuminate\Support\Facades\Route;


Route::get('/login', [AuthController::class, 'showLoginForm'])->name('login');
Route::post('/login', [AuthController::class, 'login']);
Route::get('/register', [AuthController::class, 'showRegistrationForm'])->name('register');
Route::post('/register', [AuthController::class, 'register']);
Route::post('/logout', [AuthController::class, 'logout'])->name('logout');




Route::get('/', [HomeController::class, 'index'])->name('home');
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
    Route::get('users', [UserController::class, 'index'])->name('users.index');
    Route::post('users', [UserController::class, 'store'])->name('users.store');
    Route::put('users/{user}', [UserController::class, 'update'])->name('users.update');
    Route::delete('users/{user}', [UserController::class, 'destroy'])->name('users.destroy');
    Route::get('reviews', [AvisController::class, 'index'])->name('reviews.index');
    Route::post('reviews', [AvisController::class, 'store'])->name('reviews.store');
    Route::put('reviews/{review}', [AvisController::class, 'update'])->name('reviews.update');
    Route::delete('reviews/{review}', [AvisController::class, 'destroy'])->name('reviews.destroy');
    Route::get('orders', fn () => inertia('admin/orders'))->name('orders.index');
    Route::get('order-details', fn () => inertia('admin/order-details'))->name('order-details.index');
    Route::get('categories', [CategorieController::class, 'index'])->name('categories.index');
    Route::post('categories', [CategorieController::class, 'store'])->name('categories.store');
    Route::put('categories/{category}', [CategorieController::class, 'update'])->name('categories.update');
    Route::delete('categories/{category}', [CategorieController::class, 'destroy'])->name('categories.destroy');

    Route::resource('books',LivreController::class);
});
