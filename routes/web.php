<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\LivreController;
use App\Http\Controllers\CategorieController;
use App\Http\Controllers\AvisController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\CatalogueController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CheckoutController;
use Illuminate\Support\Facades\Route;


Route::get('/login', [AuthController::class, 'showLoginForm'])->name('login');
Route::post('/login', [AuthController::class, 'login']);
Route::get('/register', [AuthController::class, 'showRegistrationForm'])->name('register');
Route::post('/register', [AuthController::class, 'register']);
Route::post('/logout', [AuthController::class, 'logout'])->name('logout');




Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/propos', fn () => inertia('store/about'));
Route::get('/contact', fn () => inertia('store/contact'));
Route::get('/catalogue', [CatalogueController::class, 'index'])->name('catalogue.index');
Route::get('/catalogue/{livre}', [CatalogueController::class, 'show'])->name('catalogue.show');
Route::get('/cart', fn () => inertia('store/cart'));
Route::get('/checkout', [CheckoutController::class, 'index'])->name('checkout.index');
Route::post('/checkout', [CheckoutController::class, 'store'])->name('checkout.store');
Route::get('/profile', fn () => inertia('store/profile'));

// Book details route
Route::get('/books/{book}', [LivreController::class, 'show'])->name('books.show');

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

// Cart routes
Route::prefix('cart')->group(function () {
    Route::get('/', [CartController::class, 'index'])->name('cart.index');
    Route::post('/add', [CartController::class, 'add'])->name('cart.add');
    Route::put('/update/{id}', [CartController::class, 'update'])->name('cart.update');
    Route::delete('/remove/{id}', [CartController::class, 'remove'])->name('cart.remove');
    Route::delete('/clear', [CartController::class, 'clear'])->name('cart.clear');
});
