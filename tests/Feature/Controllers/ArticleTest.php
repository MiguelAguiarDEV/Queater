<?php

namespace Tests\Feature\Controllers;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\Article;
use App\Models\Category;
use App\Models\Restaurant;

class ArticleTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_list_articles()
    {
        Article::factory()->count(3)->create();
        $response = $this->getJson('/api/articles');
        $response->assertStatus(200)->assertJsonStructure([['id', 'title', 'body', 'price']]);
    }

    public function test_can_show_article()
    {
        $article = Article::factory()->create();
        $response = $this->getJson("/api/articles/{$article->id}");
        $response->assertStatus(200)->assertJsonFragment(['id' => $article->id]);
    }    public function test_can_create_article()
    {
        $category = Category::factory()->create();
        $restaurant = Restaurant::factory()->create();
        $data = [
            'title' => 'Nuevo Artículo',
            'body' => 'Contenido',
            'price' => 10.5,
            'category_id' => $category->id,
            'restaurant_id' => $restaurant->id,
            'is_published' => true
        ];
        $response = $this->postJson('/api/articles', $data);
        $response->assertStatus(201)->assertJsonFragment(['title' => 'Nuevo Artículo']);
        $this->assertDatabaseHas('articles', ['title' => 'Nuevo Artículo']);
    }

    public function test_can_update_article()
    {
        $article = Article::factory()->create();
        $data = ['title' => 'Actualizado'];
        $response = $this->putJson("/api/articles/{$article->id}", $data);
        $response->assertStatus(200)->assertJsonFragment(['title' => 'Actualizado']);
        $this->assertDatabaseHas('articles', ['id' => $article->id, 'title' => 'Actualizado']);
    }

    public function test_can_delete_article()
    {
        $article = Article::factory()->create();
        $response = $this->deleteJson("/api/articles/{$article->id}");
        $response->assertStatus(204);
        $this->assertDatabaseMissing('articles', ['id' => $article->id]);
    }
}
