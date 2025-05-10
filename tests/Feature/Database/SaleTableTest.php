<?php

namespace Tests\Feature\Database;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\Sale;
use App\Models\Order;
use App\Models\Invoice;

class SaleTableTest extends TestCase
{
    use RefreshDatabase;

    public function test_sale_can_be_created()
    {
        $order = Order::factory()->create();
        $sale = Sale::factory()->create(['order_id' => $order->id]);
        $this->assertDatabaseHas('sales', [
            'id' => $sale->id,
            'order_id' => $order->id,
        ]);
    }

    public function test_sale_belongs_to_order()
    {
        $order = Order::factory()->create();
        $sale = Sale::factory()->create(['order_id' => $order->id]);
        $this->assertEquals($order->id, $sale->order->id);
    }

    public function test_deleting_order_removes_sale()
    {
        $order = Order::factory()->create();
        $sale = Sale::factory()->create(['order_id' => $order->id]);
        $order->delete();
        $this->assertDatabaseMissing('sales', [
            'id' => $sale->id,
        ]);
    }

    public function test_sale_can_have_invoice()
    {
        $sale = Sale::factory()->create();
        $invoice = Invoice::factory()->create(['sale_id' => $sale->id]);
        $this->assertEquals($sale->id, $invoice->sale_id);
        $this->assertEquals($invoice->id, $sale->invoice->id);
    }
}
