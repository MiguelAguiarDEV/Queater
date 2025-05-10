<?php

namespace Database\Seeders;



use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
                CategorySeeder::class,
                ArticleSeeder::class,
                MenuSeeder::class,
                OrderSeeder::class,
                SaleSeeder::class,
                InvoiceSeeder::class,
        ]);

        // Crear un usuario de pruebas
        $user = \App\Models\User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => \Illuminate\Support\Facades\Hash::make('password123'),
        ]);

        // Crear un restaurante de pruebas asociado a ese usuario
        $restaurant = \App\Models\Restaurant::factory()->create([
            'user_id' => $user->id,
            'name' => 'Restaurante Demo',
            'address' => 'Calle Falsa 123',
            'phone' => '555-1234',
            'email' => 'restaurante@demo.com',
        ]);
    }
}
