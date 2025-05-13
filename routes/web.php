<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\Restaurant;
use App\Models\Article;
use App\Models\Category;
use App\Models\Menu;
use App\Http\Controllers\Auth\AuthenticatedSessionController;


Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');

Route::get('/ws-demo', function () {
    return Inertia::render('WebsocketsDemo');
});

Route::middleware(['auth', 'verified'])->prefix('restaurants')->group(function () {
    Route::get('/', function () {
        return Inertia::render('Restaurants/Index', [
            'restaurants' => Auth::user()->retaurants,
        ]);
    })->name('restaurants');
});

Route::prefix('/admin/dashboard/{restaurant}')
    ->middleware(['auth', 'verified'])
    ->name('admin.')
    ->group(function () {
        Route::get('/', function(Restaurant $restaurant){
            return Inertia::render('Dashboard/Index', [
                'restaurant' => $restaurant
            ]);
        })->name('dashboard');

        Route::get('/articles', function(Restaurant $restaurant) {
            return Inertia::render('Dashboard/Articles', [
                'restaurant' => $restaurant,
                'articles' => Article::all(),
            ]);
        })->name('articulos.index');

        Route::get('/categories', function(Restaurant $restaurant) {
            return Inertia::render('Dashboard/Categories', [
                'restaurant' => $restaurant,
                'categories' => Category::all(),
            ]);
        })->name('categorias.index');

        Route::get('/menus', function(Restaurant $restaurant) {
            return Inertia::render('Dashboard/Menus', [
                'restaurant' => $restaurant,
                'menus' => Menu::all(),
            ]);
        })->name('menus.index');
    });


// Perfil de usuario
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
