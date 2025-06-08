<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Restaurant;
use App\Models\Article;
use App\Models\Category;
use App\Models\Menu;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

/**
 * DashboardController
 * 
 * Controlador encargado de manejar todas las rutas del dashboard del sistema.
 * Gestiona la visualización de restaurantes y sus respectivas secciones
 * (artículos, categorías, menús) con verificación de autorización.
 */
class DashboardController extends Controller
{
    /**
     * Muestra la página de selección de restaurantes
     * 
     * Esta función renderiza la vista principal donde el usuario autenticado
     * puede elegir entre sus restaurantes disponibles.
     * 
     * @return \Inertia\Response
     */
    public function index()
    {
        return Inertia::render('Restaurants/Index', [
            'restaurants' => Auth::user()->restaurants ?? [],
        ]);
    }    /**
     * Muestra el dashboard principal de un restaurante específico
     * 
     * Renderiza la vista del dashboard del restaurante seleccionado,
     * verificando previamente que el usuario autenticado sea el propietario.
     * Laravel automáticamente resuelve el restaurante por nombre usando
     * route model binding configurado en el modelo.
     * 
     * @param Restaurant $restaurant El restaurante a mostrar
     * @return \Inertia\Response
     * @throws \Symfony\Component\HttpKernel\Exception\HttpException Si el usuario no tiene permisos
     */
    public function show(Restaurant $restaurant)
    {
        /** @var User $user */
        $user = Auth::user();

        // Verificar autorización - solo el propietario puede acceder
        abort_if(!$user || $user->id !== $restaurant->user_id, 403);

        return Inertia::render('Dashboard/Index', [
            'restaurant' => $restaurant,
        ]);
    }

    /**
     * Muestra la sección de artículos de un restaurante
     * 
     * Renderiza la vista con todos los artículos pertenecientes al restaurante
     * especificado, filtrados correctamente por restaurant_id.
     * 
     * @param Restaurant $restaurant El restaurante del cual mostrar los artículos
     * @return \Inertia\Response
     * @throws \Symfony\Component\HttpKernel\Exception\HttpException Si el usuario no tiene permisos
     */
    public function articles(Restaurant $restaurant)
    {
        /** @var User $user */
        $user = Auth::user();

        // Verificar que el usuario sea el propietario del restaurante
        abort_if(!$user || $user->id !== $restaurant->user_id, 403);        return Inertia::render('Dashboard/Articles', [
            'restaurant' => $restaurant,
            'articles' => Article::where('restaurant_id', $restaurant->id)->get(),
            'categories' => Category::all(),
        ]);
    }

    /**
     * Muestra la sección de categorías de un restaurante
     * 
     * Renderiza la vista con todas las categorías pertenecientes al restaurante
     * especificado, aplicando el filtro correspondiente por restaurant_id.
     * 
     * @param Restaurant $restaurant El restaurante del cual mostrar las categorías
     * @return \Inertia\Response
     * @throws \Symfony\Component\HttpKernel\Exception\HttpException Si el usuario no tiene permisos
     */
    public function categories(Restaurant $restaurant)
    {
        /** @var User $user */
        $user = Auth::user();

        // Verificar autorización del propietario
        abort_if(!$user || $user->id !== $restaurant->user_id, 403);

        return Inertia::render('Dashboard/Categories', [
            'restaurant' => $restaurant,
            'categories' => Category::where('restaurant_id', $restaurant->id)->get(),
        ]);
    }

    /**
     * Muestra la sección de menús de un restaurante
     * 
     * Renderiza la vista con todos los menús pertenecientes al restaurante
     * especificado, asegurando que solo se muestren los menús correctos.
     * 
     * @param Restaurant $restaurant El restaurante del cual mostrar los menús
     * @return \Inertia\Response
     * @throws \Symfony\Component\HttpKernel\Exception\HttpException Si el usuario no tiene permisos
     */
    public function menus(Restaurant $restaurant)
    {
        /** @var User $user */
        $user = Auth::user();

        // Verificar que el usuario tenga permisos sobre este restaurante
        abort_if(!$user || $user->id !== $restaurant->user_id, 403);

        return Inertia::render('Dashboard/Menus', [
            'restaurant' => $restaurant,
            'menus' => Menu::where('restaurant_id', $restaurant->id)->get(),
        ]);
    }
}
