<?php

namespace Tests\Feature\Controllers;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\Order;

class OrderTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_list_orders()
    {
        Order::factory()->count(3)->create();
        $response = $this->getJson('/api/orders');
        $response->assertStatus(200)->assertJsonStructure([['id', 'customer_name', 'customer_email', 'status']]);
    }

    public function test_can_show_order()
    {
        $order = Order::factory()->create();
        $response = $this->getJson("/api/orders/{$order->id}");
        $response->assertStatus(200)->assertJsonFragment(['id' => $order->id]);
    }

    public function test_can_create_order()
    {
        $restaurant = \App\Models\Restaurant::factory()->create();
        $data = [
            'customer_name' => 'Cliente Test',
            'customer_email' => 'cliente@test.com',
            'status' => 'pending',
            'ordered_at' => now()->toDateTimeString(),
            'restaurant_id' => $restaurant->id, // Add valid restaurant_id
        ];
        $response = $this->postJson('/api/orders', $data);
        $response->assertStatus(201)->assertJsonFragment(['customer_name' => 'Cliente Test']);
        $this->assertDatabaseHas('orders', ['customer_email' => 'cliente@test.com']);
    }

    public function test_can_update_order()
    {
        $order = Order::factory()->create();
        $data = ['status' => 'completed'];
        $response = $this->putJson("/api/orders/{$order->id}", $data);
        $response->assertStatus(200)->assertJsonFragment(['status' => 'completed']);
        $this->assertDatabaseHas('orders', ['id' => $order->id, 'status' => 'completed']);
    }

    public function test_can_delete_order()
    {
        $order = Order::factory()->create();
        $response = $this->deleteJson("/api/orders/{$order->id}");
        $response->assertStatus(204);
        $this->assertDatabaseMissing('orders', ['id' => $order->id]);
    }
}
