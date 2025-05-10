<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Menu;
use App\Models\Article;

class MenuSeeder extends Seeder
{
    public function run()
    {
        $menus = [
            ['name' => 'Menú del Día', 'description' => 'Platos especiales diarios', 'is_active' => true],
            ['name' => 'Menú Infantil', 'description' => 'Opciones para niños', 'is_active' => true],
            ['name' => 'Menú Vegetariano', 'description' => 'Solo platos vegetarianos', 'is_active' => true],
            ['name' => 'Menú Gourmet', 'description' => 'Platos exclusivos y gourmet', 'is_active' => false],
            ['name' => 'Menú Ejecutivo', 'description' => 'Rápido y delicioso para ejecutivos', 'is_active' => true],
        ];

        // Obtener un restaurante existente para asociar los menús
        $restaurantId = \App\Models\Restaurant::query()->value('id');
        if (!$restaurantId) {
            // Si no hay restaurante, crea uno por defecto
            $restaurant = \App\Models\Restaurant::factory()->create([
                'name' => 'Restaurante Seeder',
                'address' => 'Calle Seeder 123',
                'phone' => '555-0000',
                'email' => 'seeder@demo.com',
            ]);
            $restaurantId = $restaurant->id;
        }

        foreach ($menus as $data) {
            $data['restaurant_id'] = $restaurantId;
            $menu = Menu::create($data);
            $articles = Article::inRandomOrder()->take(rand(2, 5))->pluck('id');
            $menu->articles()->attach($articles);
        }
    }
}
