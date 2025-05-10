<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Invoice extends Model
{
    use HasFactory;

    protected $fillable = [
        'sale_id',
        'invoice_number',
        'issued_at',
        'amount',
    ];

    // Una factura pertenece a una venta
    public function sale()
    {
        return $this->belongsTo(Sale::class);
    }
}
