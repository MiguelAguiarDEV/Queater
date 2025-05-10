<?php

namespace Tests\Feature\Database;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\Order;
use App\Models\User;

class OrderTableTest extends TestCase
{
    use RefreshDatabase;

    public function test_order_can_be_created()
    {
        $order = Order::factory()->create();
        $this->assertDatabaseHas('orders', [
            'id' => $order->id,
            'customer_name' => $order->customer_name,
        ]);
    }

    public function test_order_can_have_multiple_articles()
    {
        $order = Order::factory()->create();
        $articles = \App\Models\Article::factory()->count(2)->create();
        foreach ($articles as $article) {
            $order->articles()->attach($article->id, [
                'quantity' => 2,
                'unit_price' => $article->price,
            ]);
        }
        $this->assertCount(2, $order->articles);
    }

    public function test_deleting_order_removes_order_article_relations()
    {
        $order = Order::factory()->create();
        $article = \App\Models\Article::factory()->create();
        $order->articles()->attach($article->id, [
            'quantity' => 1,
            'unit_price' => $article->price,
        ]);
        $order->delete();
        $this->assertDatabaseMissing('order_article', [
            'order_id' => $order->id,
            'article_id' => $article->id,
        ]);
    }

    public function test_order_article_quantity_is_required()
    {
        $order = Order::factory()->create();
        $article = \App\Models\Article::factory()->create();
        $this->expectException(\Illuminate\Database\QueryException::class);
        $order->articles()->attach($article->id, [
            'quantity' => null,
            'unit_price' => $article->price,
        ]);
    }
}
