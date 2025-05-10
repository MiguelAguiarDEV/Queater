<?php

namespace Tests\Feature\Database;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\Menu;
use App\Models\Article;

class MenuTableTest extends TestCase
{
    use RefreshDatabase;

    public function test_menu_can_be_created()
    {
        $menu = Menu::factory()->create();
        $this->assertDatabaseHas('menus', [
            'id' => $menu->id,
            'name' => $menu->name,
        ]);
    }

    public function test_menu_can_have_articles()
    {
        $menu = Menu::factory()->create();
        $article = Article::factory()->create();
        $menu->articles()->attach($article->id);
        $this->assertTrue($menu->articles->contains($article));
    }

    public function test_menu_can_have_multiple_articles()
    {
        $menu = Menu::factory()->create();
        $articles = Article::factory()->count(3)->create();
        $menu->articles()->attach($articles->pluck('id')->toArray());
        $this->assertCount(3, $menu->articles);
    }

    public function test_deleting_menu_removes_article_menu_relations()
    {
        $menu = Menu::factory()->create();
        $article = Article::factory()->create();
        $menu->articles()->attach($article->id);
        $menu->delete();
        $this->assertDatabaseMissing('article_menu', [
            'menu_id' => $menu->id,
            'article_id' => $article->id,
        ]);
    }
}
