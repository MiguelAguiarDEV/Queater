<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Order;
use App\Models\Article;
use Illuminate\Support\Arr;

class OrderSeeder extends Seeder
{
    public function run()
    {
        // Obtener un restaurante existente para asociar los pedidos
        $restaurantId = \App\Models\Restaurant::query()->value('id');
        if (!$restaurantId) {
            // Si no hay restaurante, crea uno por defecto
            $restaurant = \App\Models\Restaurant::factory()->create([
                'name' => 'Restaurante Pedido',
                // TODO: Add necessary fields
                // 'address' => 'Calle Pedido 123',
                // 'phone' => '555-1111',
                'email' => 'pedido@demo.com',
            ]);
            $restaurantId = $restaurant->id;
        }

        $statuses = ['pending', 'completed', 'canceled'];
        for ($i = 1; $i <= 10; $i++) {
            $order = Order::create([
                'customer_name' => 'Cliente ' . $i,
                'customer_email' => 'cliente' . $i . '@example.com',
                'status' => Arr::random($statuses),
                'ordered_at' => now()->subDays(rand(0, 30)),
                'restaurant_id' => $restaurantId,
            ]);
            $articles = Article::inRandomOrder()->take(rand(1, 4))->get();
            foreach ($articles as $article) {
                $order->articles()->attach($article->id, [
                    'quantity' => rand(1, 5),
                    'unit_price' => $article->price,
                ]);
            }
        }
    }
}
