<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ArticleController;
use App\Http\Controllers\MenuController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\SaleController;
use App\Http\Controllers\InvoiceController;
use App\Http\Controllers\RestaurantController;

Route::apiResource('categories', CategoryController::class);
Route::apiResource('articles', ArticleController::class);
Route::apiResource('menus', MenuController::class);
Route::apiResource('orders', OrderController::class);
Route::apiResource('sales', SaleController::class);
Route::apiResource('invoices', InvoiceController::class);
Route::apiResource('restaurants', RestaurantController::class);
