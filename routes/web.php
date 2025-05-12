<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

//logout
Route::get('/logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');

// Ruta de ejemplo para mostrar cómo usar websockets en el frontend
Route::get('/ws-demo', function () {
    return Inertia::render('WebsocketsDemo');
});

Route::middleware(['auth', 'verified'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::get('/menus', function () {
        return Inertia::render('Dashboard/Menus');
    })->name('menus.index');

    Route::get('/categorias', function () {
        return Inertia::render('Dashboard/Categories');
    })->name('categorias.index');

    Route::get('/articulos', function () {
        return Inertia::render('Dashboard/Articles');
    })->name('articulos.index');

    Route::get('/restaurants', function () {
        return Inertia::render('Restaurants/Index');
    })->name('restaurants.index');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
