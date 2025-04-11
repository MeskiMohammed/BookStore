<?php

use App\Http\Controllers\LivreController;
use App\Models\Livre;
use Illuminate\Support\Facades\Route;
use SebastianBergmann\CodeCoverage\Report\Html\Dashboard;

Route::get('/', fn () => inertia('store/home'));
// Route::get('/products', fn () => inertia('store2/products'));
// Route::get('/products/{id}', fn () => inertia('store2/product-detail'));
// Route::get('/cart', fn () => inertia('store2/cart'));
// Route::get('/checkout', fn () => inertia('store2/checkout'));
Route::get('/propos', fn () => inertia('store/about'));
Route::get('/contact', fn () => inertia('store/contact'));
Route::get('/catalogue', fn () => inertia('store/catalogue'));
Route::get('/details-product', fn () => inertia('store/details-product'));
Route::get('/cart', fn () => inertia('store/cart'));
Route::get('/checkout', fn () => inertia('store/checkout'));
Route::get('/profile', fn () => inertia('store/profile'));

Route::get('/login', fn () => inertia('login'));
Route::get('/register', fn () => inertia('register'));


Route::prefix('admin')->group(function(){
    Route::get('/', fn () => inertia('admin/dashboard'))->name('dashboard');
    Route::get('users', fn () => inertia('admin/users'))->name('users.index');
    Route::get('reviews', fn () => inertia('admin/reviews'))->name('reviews.index');
    Route::get('orders', fn () => inertia('admin/orders'))->name('orders.index');
    Route::get('order-details', fn () => inertia('admin/order-details'))->name('order-details.index');
    // Route::get('books', fn () => inertia('admin/books',['initialBooks'=>Livre::all()]))->name('books.index');
    Route::get('categories', fn () => inertia('admin/categories'))->name('categories.index');

    // Route::delete('books/{id}', [LivreController::class, 'destroy'])->name('books.destroy');
    Route::resource('books',LivreController::class);
});




// Route::get('/', fn () => inertia('store/Home'));


// Route::get('/admin/dashboard', fn () => inertia('admin/dashboard'));
// Route::get('/admin/users', fn () => inertia('admin/users/index'));
// Route::get('/admin/books', fn () => inertia('admin/books/index'));
// Route::get('/admin/categories', fn () => inertia('admin/categories/index'));
// Route::get('/admin/orders', fn () => inertia('admin/orders/index'));


