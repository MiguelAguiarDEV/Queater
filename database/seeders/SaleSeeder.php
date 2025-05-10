<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Sale;
use App\Models\Order;

class SaleSeeder extends Seeder
{
    public function run()
    {
        $orders = Order::where('status', 'completed')->get();
        foreach ($orders as $order) {
            $total = $order->articles->sum(function($a) {
                return $a->pivot->quantity * $a->pivot->unit_price;
            });
            Sale::create([
                'order_id' => $order->id,
                'total_amount' => $total,
            ]);
        }
    }
}
