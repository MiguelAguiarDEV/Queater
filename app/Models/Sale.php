<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sale extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_id',
        'total_amount',
    ];

    // Una venta pertenece a un pedido
    public function order()
    {
        return $this->belongsTo(Order::class);
    }

    // Una venta genera una factura
    public function invoice()
    {
        return $this->hasOne(Invoice::class);
    }
}
