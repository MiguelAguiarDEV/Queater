<?php

namespace Tests\Feature\Controllers;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\Restaurant;
use App\Models\User;

class RestaurantTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_list_restaurants()
    {
        Restaurant::factory()->count(3)->create();
        $response = $this->getJson('/api/restaurants');
        $response->assertStatus(200)->assertJsonStructure([['id', 'name', 'address', 'phone', 'email', 'user_id']]);
    }

    public function test_can_show_restaurant()
    {
        $restaurant = Restaurant::factory()->create();
        $response = $this->getJson("/api/restaurants/{$restaurant->id}");
        $response->assertStatus(200)->assertJsonFragment(['id' => $restaurant->id]);
    }

    public function test_can_create_restaurant()
    {
        $user = User::factory()->create();
        $data = [
            'name' => 'Restaurante Test',
            'address' => 'Calle Test 123',
            'phone' => '555-9999',
            'email' => 'restaurante@test.com',
            'user_id' => $user->id,
        ];
        $response = $this->postJson('/api/restaurants', $data);
        $response->assertStatus(201)->assertJsonFragment(['name' => 'Restaurante Test']);
        $this->assertDatabaseHas('restaurants', ['email' => 'restaurante@test.com']);
    }

    public function test_can_update_restaurant()
    {
        $restaurant = Restaurant::factory()->create();
        $data = ['name' => 'Restaurante Actualizado'];
        $response = $this->putJson("/api/restaurants/{$restaurant->id}", $data);
        $response->assertStatus(200)->assertJsonFragment(['name' => 'Restaurante Actualizado']);
        $this->assertDatabaseHas('restaurants', ['id' => $restaurant->id, 'name' => 'Restaurante Actualizado']);
    }

    public function test_can_delete_restaurant()
    {
        $restaurant = Restaurant::factory()->create();
        $response = $this->deleteJson("/api/restaurants/{$restaurant->id}");
        $response->assertStatus(204);
        $this->assertDatabaseMissing('restaurants', ['id' => $restaurant->id]);
    }
}
