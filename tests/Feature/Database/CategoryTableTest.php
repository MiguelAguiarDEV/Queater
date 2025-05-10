<?php

namespace Tests\Feature\Database;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\Category;
use App\Models\Article;

class CategoryTableTest extends TestCase
{
    use RefreshDatabase;

    public function test_category_can_be_created()
    {
        $category = Category::factory()->create();
        $this->assertDatabaseHas('categories', [
            'id' => $category->id,
            'name' => $category->name,
        ]);
    }

    public function test_category_has_articles()
    {
        $category = Category::factory()->create();
        $article = Article::factory()->create(['category_id' => $category->id]);
        $this->assertTrue($category->articles->contains($article));
    }

    public function test_category_cannot_be_deleted_if_articles_exist()
    {
        $category = Category::factory()->create();
        $article = Article::factory()->create(['category_id' => $category->id]);
        $this->expectException(\Illuminate\Database\QueryException::class);
        $category->delete();
    }

    public function test_category_can_be_deleted_if_no_articles_exist()
    {
        $category = Category::factory()->create();
        $category->delete();
        $this->assertDatabaseMissing('categories', [
            'id' => $category->id,
        ]);
    }

    public function test_deleting_category_does_not_delete_articles_by_default()
    {
        $category = Category::factory()->create();
        $article = Article::factory()->create(['category_id' => $category->id]);
        try {
            $category->delete();
        } catch (\Exception $e) {
            // Ignore exception for this test
        }
        $this->assertDatabaseHas('articles', [
            'id' => $article->id,
        ]);
    }

    public function test_category_name_is_required()
    {
        $this->expectException(\Illuminate\Database\QueryException::class);
        Category::create(['name' => null]);
    }

    public function test_category_name_is_unique()
    {
        $name = 'UnicaCategoria';
        Category::factory()->create(['name' => $name]);
        $this->expectException(\Illuminate\Database\QueryException::class);
        Category::factory()->create(['name' => $name]);
    }
}
