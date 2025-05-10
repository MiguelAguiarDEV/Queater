<?php

namespace Tests\Feature\Database;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\Invoice;
use App\Models\Sale;

class InvoiceTableTest extends TestCase
{
    use RefreshDatabase;

    public function test_invoice_can_be_created()
    {
        $sale = Sale::factory()->create();
        $invoice = Invoice::factory()->create(['sale_id' => $sale->id]);
        $this->assertDatabaseHas('invoices', [
            'id' => $invoice->id,
            'sale_id' => $sale->id,
        ]);
    }

    public function test_invoice_belongs_to_sale()
    {
        $sale = Sale::factory()->create();
        $invoice = Invoice::factory()->create(['sale_id' => $sale->id]);
        $this->assertEquals($sale->id, $invoice->sale->id);
    }

    public function test_invoice_sale_is_required()
    {
        $this->expectException(\Illuminate\Database\QueryException::class);
        \App\Models\Invoice::factory()->create(['sale_id' => null]);
    }

    public function test_deleting_sale_removes_invoice()
    {
        $sale = \App\Models\Sale::factory()->create();
        $invoice = \App\Models\Invoice::factory()->create(['sale_id' => $sale->id]);
        $sale->delete();
        $this->assertDatabaseMissing('invoices', [
            'id' => $invoice->id,
        ]);
    }
}
