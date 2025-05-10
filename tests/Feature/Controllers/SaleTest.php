<?php

namespace Tests\Feature\Controllers;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\Sale;
use App\Models\Order;

class SaleTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_list_sales()
    {
        Sale::factory()->count(3)->create();
        $response = $this->getJson('/api/sales');
        $response->assertStatus(200)->assertJsonStructure([['id', 'order_id', 'total_amount']]);
    }

    public function test_can_show_sale()
    {
        $sale = Sale::factory()->create();
        $response = $this->getJson("/api/sales/{$sale->id}");
        $response->assertStatus(200)->assertJsonFragment(['id' => $sale->id]);
    }

    public function test_can_create_sale()
    {
        $order = Order::factory()->create();
        $data = [
            'order_id' => $order->id,
            'total_amount' => 100.50
        ];
        $response = $this->postJson('/api/sales', $data);
        $response->assertStatus(201)->assertJsonFragment(['order_id' => $order->id]);
        $this->assertDatabaseHas('sales', ['order_id' => $order->id]);
    }

    public function test_can_update_sale()
    {
        $sale = Sale::factory()->create();
        $data = ['total_amount' => 200.00];
        $response = $this->putJson("/api/sales/{$sale->id}", $data);
        $response->assertStatus(200)->assertJsonFragment(['total_amount' => 200.00]);
        $this->assertDatabaseHas('sales', ['id' => $sale->id, 'total_amount' => 200.00]);
    }

    public function test_can_delete_sale()
    {
        $sale = Sale::factory()->create();
        $response = $this->deleteJson("/api/sales/{$sale->id}");
        $response->assertStatus(204);
        $this->assertDatabaseMissing('sales', ['id' => $sale->id]);
    }
}
