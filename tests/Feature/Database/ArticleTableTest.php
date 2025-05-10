<?php

namespace Tests\Feature\Database;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\Article;
use App\Models\Category;

class ArticleTableTest extends TestCase
{
    use RefreshDatabase;

    public function test_article_can_be_created()
    {
        $article = Article::factory()->create();
        $this->assertDatabaseHas('articles', [
            'id' => $article->id,
            'title' => $article->title,
        ]);
    }

    public function test_article_belongs_to_category()
    {
        $category = Category::factory()->create();
        $article = Article::factory()->create(['category_id' => $category->id]);
        $this->assertEquals($category->id, $article->category_id);
        $this->assertEquals($category->id, $article->category->id);
    }

    public function test_article_can_be_attached_to_menu()
    {
        $menu = \App\Models\Menu::factory()->create();
        $article = Article::factory()->create();
        $menu->articles()->attach($article->id);
        $this->assertDatabaseHas('article_menu', [
            'article_id' => $article->id,
            'menu_id' => $menu->id,
        ]);
    }

    public function test_article_can_be_detached_from_menu()
    {
        $menu = \App\Models\Menu::factory()->create();
        $article = Article::factory()->create();
        $menu->articles()->attach($article->id);
        $menu->articles()->detach($article->id);
        $this->assertDatabaseMissing('article_menu', [
            'article_id' => $article->id,
            'menu_id' => $menu->id,
        ]);
    }

    public function test_article_menu_prevents_duplicate_entries()
    {
        $menu = \App\Models\Menu::factory()->create();
        $article = Article::factory()->create();
        $menu->articles()->attach($article->id);
        $this->expectException(\Illuminate\Database\QueryException::class);
        $menu->articles()->attach($article->id);
    }
}
