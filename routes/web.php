<?php

use Illuminate\Support\Facades\Route;

Route::get('/', fn () => inertia('store2/home'));
Route::get('/products', fn () => inertia('store2/products'));
Route::get('/products/{id}', fn () => inertia('store2/product-detail'));
Route::get('/cart', fn () => inertia('store2/cart'));
Route::get('/checkout', fn () => inertia('store2/checkout'));



Route::prefix('admin')->group(function(){
    Route::get('/', fn () => inertia('admin2/dashboard'));
    Route::get('users', fn () => inertia('admin2/users'));
    Route::get('reviews', fn () => inertia('admin2/reviews'));
    Route::get('orders', fn () => inertia('admin2/orders'));
    Route::get('order-details', fn () => inertia('admin2/order-details'));
    Route::get('books', fn () => inertia('admin2/books'));
    Route::get('categories', fn () => inertia('admin2/categories'));
});




// Route::get('/', fn () => inertia('store/Home'));
// Route::get('/propos', fn () => inertia('store/About'));
// Route::get('/contact', fn () => inertia('store/Contact'));
// Route::get('/catalogue', fn () => inertia('store/Catalogue'));
// Route::get('/login', fn () => inertia('Login'));
// Route::get('/register', fn () => inertia('Register'));



// Route::get('/admin/dashboard', fn () => inertia('admin/dashboard'));
// Route::get('/admin/users', fn () => inertia('admin/users/index'));
// Route::get('/admin/books', fn () => inertia('admin/books/index'));
// Route::get('/admin/categories', fn () => inertia('admin/categories/index'));
// Route::get('/admin/orders', fn () => inertia('admin/orders/index'));


