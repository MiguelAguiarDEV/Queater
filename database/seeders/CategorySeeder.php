<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    public function run()
    {
        $categories = [
            [
                'name'        => 'Bebidas',
                'description' => 'Refrescos, cafés, zumos y cervezas.',
            ],
            [
                'name'        => 'Cócteles',
                'description' => 'Selección de cócteles y combinados.',
            ],
            [
                'name'        => 'Entradas',
                'description' => 'Aperitivos y primeros bocados para compartir.',
            ],
            [
                'name'        => 'Ensaladas',
                'description' => 'Opciones ligeras y frescas de verduras y hortalizas.',
            ],
            [
                'name'        => 'Sopas',
                'description' => 'Caldo caliente y cremas reconfortantes.',
            ],
            [
                'name'        => 'Platos Principales',
                'description' => 'Nuestros platos fuertes: carnes, pastas y mariscos.',
            ],
            [
                'name'        => 'Postres',
                'description' => 'Dulces caseros y especialidades de la casa.',
            ],
        ];

        foreach ($categories as $data) {
            Category::create($data);
        }
    }
}
