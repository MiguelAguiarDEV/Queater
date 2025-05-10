<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Invoice;
use App\Models\Sale;

class InvoiceSeeder extends Seeder
{
    public function run()
    {
        $sales = Sale::all();
        $n = 1;
        foreach ($sales as $sale) {
            Invoice::create([
                'sale_id' => $sale->id,
                'invoice_number' => 'INV-' . str_pad($n, 4, '0', STR_PAD_LEFT),
                'issued_at' => now()->subDays(rand(0, 30)),
                'amount' => $sale->total_amount,
            ]);
            $n++;
        }
    }
}
