<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'customer_name',
        'customer_email',
        'status',
        'ordered_at',
        'restaurant_id', // Add this to allow mass assignment
    ];

    protected $dates = [
        'ordered_at',
    ];

    // Un pedido contiene muchos artículos (pivot con cantidad y precio)
    public function articles()
    {
        return $this->belongsToMany(Article::class, 'order_article')
                    ->withPivot(['quantity', 'unit_price']);
    }

    // Un pedido puede derivar en una venta
    public function sale()
    {
        return $this->hasOne(Sale::class);
    }

    // Un pedido pertenece a un restaurante
    public function restaurant()
    {
        return $this->belongsTo(Restaurant::class);
    }
}
