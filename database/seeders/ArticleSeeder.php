<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Article;
use App\Models\Category;
use App\Models\Restaurant;
use Illuminate\Support\Arr;

class ArticleSeeder extends Seeder
{    public function run()
    {
        // Obtenemos todos los IDs de categorías
        $categoryIds = Category::pluck('id')->toArray();
        if (empty($categoryIds)) {
            // Si no hay categorías, crea una por defecto
            $defaultCategory = Category::create([
                'name' => 'General',
                'description' => 'Categoría por defecto para artículos',
            ]);
            $categoryIds = [$defaultCategory->id];
        }        // Obtener un restaurante existente para asociar los artículos
        $restaurantId = Restaurant::query()->value('id');
        if (!$restaurantId) {
            // Si no hay restaurante, crea uno por defecto con un usuario
            $user = \App\Models\User::factory()->create([
                'name' => 'Usuario Seeder',
                'email' => 'seeder@example.com',
            ]);
            
            $restaurant = Restaurant::factory()->create([
                'name' => 'Restaurante Seeder',
                'user_id' => $user->id,
            ]);
            $restaurantId = $restaurant->id;
        }

        // Listado de artículos típicos de un restaurante
        $items = [
            ['title' => 'Mojito',               'body' => 'Clásico cóctel cubano con ron blanco, hierbabuena y lima.',       'price' => 7.50],
            ['title' => 'Café Expreso',         'body' => 'Pequeña dosis de café concentrado, intenso y aromático.',          'price' => 2.00],
            ['title' => 'Agua Mineral',         'body' => 'Botella de agua mineral con o sin gas.',                            'price' => 1.80],
            ['title' => 'Ensalada César',       'body' => 'Lechuga, pollo a la plancha, croutons, queso parmesano y anchoas.', 'price' => 9.00],
            ['title' => 'Sopa de Mariscos',     'body' => 'Caldo ligero con gambas, mejillones y almejas.',                     'price' => 8.50],
            ['title' => 'Spaghetti Carbonara',  'body' => 'Pasta al dente con salsa de huevo, queso pecorino y panceta.',       'price' => 11.00],
            ['title' => 'Hamburguesa Clásica',  'body' => 'Carne de res, queso cheddar, lechuga, tomate y cebolla.',             'price' => 10.50],
            ['title' => 'Lasaña Boloñesa',      'body' => 'Capas de pasta, carne, tomate y bechamel gratinada.',                'price' => 12.00],
            ['title' => 'Tarta de Queso',       'body' => 'Postre cremoso con base de galleta y coulis de frutos rojos.',       'price' => 5.50],
            ['title' => 'Cerveza Artesanal',    'body' => 'Cerveza de producción local, distintas variedades según temporada.', 'price' => 4.00],
            ['title' => 'Margarita',            'body' => 'Cóctel de tequila, triple sec y lima, servido con sal en el borde.',  'price' => 8.00],
            ['title' => 'Jugo de Naranja',      'body' => 'Zumo natural exprimido al momento.',                                 'price' => 3.00],
        ];        foreach ($items as $item) {
            Article::create([
                'title'       => $item['title'],
                'body'        => $item['body'],
                'category_id' => Arr::random($categoryIds),
                'restaurant_id' => $restaurantId,
                'image_path'  => null,
                'price'       => $item['price'],
            ]);
        }
    }
}
