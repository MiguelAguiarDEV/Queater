<?php

namespace Tests\Feature\Controllers;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\Menu;

class MenuTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_list_menus()
    {
        \App\Models\Restaurant::factory()->create();
        Menu::factory()->count(3)->create();
        $response = $this->getJson('/api/menus');
        $response->assertStatus(200)->assertJsonStructure([['id', 'name', 'description', 'is_active']]);
    }

    public function test_can_show_menu()
    {
        \App\Models\Restaurant::factory()->create();
        $menu = Menu::factory()->create();
        $response = $this->getJson("/api/menus/{$menu->id}");
        $response->assertStatus(200)->assertJsonFragment(['id' => $menu->id]);
    }

    public function test_can_create_menu()
    {
        $restaurant = \App\Models\Restaurant::factory()->create();
        $data = [
            'name' => 'Menu Test',
            'description' => 'Desc',
            'is_active' => true,
            'restaurant_id' => $restaurant->id,
        ];
        $response = $this->postJson('/api/menus', $data);
        $response->assertStatus(201)->assertJsonFragment(['name' => 'Menu Test']);
        $this->assertDatabaseHas('menus', ['name' => 'Menu Test']);
    }

    public function test_can_update_menu()
    {
        $restaurant = \App\Models\Restaurant::factory()->create();
        $menu = Menu::factory()->create(['restaurant_id' => $restaurant->id]);
        $data = ['name' => 'Menu Actualizado'];
        $response = $this->putJson("/api/menus/{$menu->id}", $data);
        $response->assertStatus(200)->assertJsonFragment(['name' => 'Menu Actualizado']);
        $this->assertDatabaseHas('menus', ['id' => $menu->id, 'name' => 'Menu Actualizado']);
    }

    public function test_can_delete_menu()
    {
        $restaurant = \App\Models\Restaurant::factory()->create();
        $menu = Menu::factory()->create(['restaurant_id' => $restaurant->id]);
        $response = $this->deleteJson("/api/menus/{$menu->id}");
        $response->assertStatus(204);
        $this->assertDatabaseMissing('menus', ['id' => $menu->id]);
    }
}
