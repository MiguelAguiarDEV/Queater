<?php

namespace Tests\Feature\Controllers;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\Category;

class CategoryTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_list_categories()
    {
        Category::factory()->count(3)->create();
        $response = $this->getJson('/api/categories');
        $response->assertStatus(200)->assertJsonStructure([['id', 'name', 'description']]);
    }

    public function test_can_show_category()
    {
        $category = Category::factory()->create();
        $response = $this->getJson("/api/categories/{$category->id}");
        $response->assertStatus(200)->assertJsonFragment(['id' => $category->id]);
    }

    public function test_can_create_category()
    {
        $data = ['name' => 'Nueva Categoria', 'description' => 'Descripcion'];
        $response = $this->postJson('/api/categories', $data);
        $response->assertStatus(201)->assertJsonFragment(['name' => 'Nueva Categoria']);
        $this->assertDatabaseHas('categories', ['name' => 'Nueva Categoria']);
    }

    public function test_can_update_category()
    {
        $category = Category::factory()->create();
        $data = ['name' => 'Actualizada'];
        $response = $this->putJson("/api/categories/{$category->id}", $data);
        $response->assertStatus(200)->assertJsonFragment(['name' => 'Actualizada']);
        $this->assertDatabaseHas('categories', ['id' => $category->id, 'name' => 'Actualizada']);
    }

    public function test_can_delete_category()
    {
        $category = Category::factory()->create();
        $response = $this->deleteJson("/api/categories/{$category->id}");
        $response->assertStatus(204);
        $this->assertDatabaseMissing('categories', ['id' => $category->id]);
    }
}
