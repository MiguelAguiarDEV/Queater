<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\DashboardController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\Restaurant;
use App\Models\Article;
use App\Models\Category;
use App\Models\Menu;
use App\Http\Controllers\Auth\AuthenticatedSessionController;

//HOME PAGE ROUTE
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});


//TEST WS
Route::get('/ws-demo', function () {
    return Inertia::render('WebsocketsDemo');
});

//DASHBOARD ROUTES
Route::middleware(['auth', 'verified'])->group(function () {
    
    // GET dashboard - Elección de restaurantes
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // GET dashboard/{restaurant} - Dashboard del restaurante
    Route::get('/dashboard/{restaurant}', [DashboardController::class, 'show'])
        ->name('dashboard.restaurant');

    // GET dashboard/{restaurant}/articles - Sección de artículos
    Route::get('/dashboard/{restaurant}/articles', [DashboardController::class, 'articles'])
        ->name('dashboard.articles');

    // GET dashboard/{restaurant}/categories - Sección de categorías
    Route::get('/dashboard/{restaurant}/categories', [DashboardController::class, 'categories'])
        ->name('dashboard.categories');

    // GET dashboard/{restaurant}/menus - Sección de menús
    Route::get('/dashboard/{restaurant}/menus', [DashboardController::class, 'menus'])
        ->name('dashboard.menus');
    
});


// Perfil de usuario
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
