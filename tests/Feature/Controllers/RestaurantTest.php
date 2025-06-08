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
        $user = User::factory()->create();
        $this->actingAs($user);
        Restaurant::factory()->count(3)->create(['user_id' => $user->id]);
        $response = $this->getJson('/api/restaurants');
        $response->assertStatus(200)->assertJsonStructure([['id', 'name', 'user_id']]);
    }    public function test_can_show_restaurant()
    {
        $user = User::factory()->create();
        $this->actingAs($user);
        $restaurant = Restaurant::factory()->create([
            'user_id' => $user->id,
            'name' => 'test-restaurant'
        ]);
        $response = $this->getJson("/api/restaurants/{$restaurant->name}");
        $response->assertStatus(200)->assertJsonFragment(['id' => $restaurant->id]);
    }

    public function test_can_create_restaurant()
    {
        $user = User::factory()->create();
        $this->actingAs($user);
        $data = [
            'name' => 'Restaurante Test',
            'user_id' => $user->id,
        ];
        $response = $this->postJson('/api/restaurants', $data);
        $response->assertStatus(201)->assertJsonFragment(['name' => 'Restaurante Test']);
        $this->assertDatabaseHas('restaurants', ['name' => 'Restaurante Test', 'user_id' => $user->id]);
    }    public function test_can_update_restaurant()
    {
        $user = User::factory()->create();
        $this->actingAs($user);
        $restaurant = Restaurant::factory()->create([
            'user_id' => $user->id,
            'name' => 'test-restaurant'
        ]);
        $data = ['name' => 'Restaurante-Actualizado'];
        $response = $this->putJson("/api/restaurants/{$restaurant->name}", $data);
        $response->assertStatus(200)->assertJsonFragment(['name' => 'Restaurante-Actualizado']);
        $this->assertDatabaseHas('restaurants', ['id' => $restaurant->id, 'name' => 'Restaurante-Actualizado']);
    }    public function test_can_delete_restaurant()
    {
        $user = User::factory()->create();
        $this->actingAs($user);
        $restaurant = Restaurant::factory()->create([
            'user_id' => $user->id,
            'name' => 'test-restaurant'
        ]);
        $response = $this->deleteJson("/api/restaurants/{$restaurant->name}");
        $response->assertStatus(204);
        $this->assertDatabaseMissing('restaurants', ['id' => $restaurant->id]);
    }
}
