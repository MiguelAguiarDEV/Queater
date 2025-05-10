<?php

namespace Tests\Feature\Controllers;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\Invoice;
use App\Models\Sale;

class InvoiceTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_list_invoices()
    {
        Invoice::factory()->count(3)->create();
        $response = $this->getJson('/api/invoices');
        $response->assertStatus(200)->assertJsonStructure([['id', 'sale_id', 'invoice_number', 'amount']]);
    }

    public function test_can_show_invoice()
    {
        $invoice = Invoice::factory()->create();
        $response = $this->getJson("/api/invoices/{$invoice->id}");
        $response->assertStatus(200)->assertJsonFragment(['id' => $invoice->id]);
    }

    public function test_can_create_invoice()
    {
        $sale = Sale::factory()->create();
        $data = [
            'sale_id' => $sale->id,
            'invoice_number' => 'INV-001',
            'amount' => 150.75
        ];
        $response = $this->postJson('/api/invoices', $data);
        $response->assertStatus(201)->assertJsonFragment(['invoice_number' => 'INV-001']);
        $this->assertDatabaseHas('invoices', ['invoice_number' => 'INV-001']);
    }

    public function test_can_update_invoice()
    {
        $invoice = Invoice::factory()->create();
        $data = ['amount' => 300.00];
        $response = $this->putJson("/api/invoices/{$invoice->id}", $data);
        $response->assertStatus(200)->assertJsonFragment(['amount' => 300.00]);
        $this->assertDatabaseHas('invoices', ['id' => $invoice->id, 'amount' => 300.00]);
    }

    public function test_can_delete_invoice()
    {
        $invoice = Invoice::factory()->create();
        $response = $this->deleteJson("/api/invoices/{$invoice->id}");
        $response->assertStatus(204);
        $this->assertDatabaseMissing('invoices', ['id' => $invoice->id]);
    }
}
