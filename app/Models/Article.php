<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'body',
        'category_id',
        'image_path',
        'is_published',
        'price',
    ];

    // Un artículo pertenece a una categoría
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    // Un artículo puede estar en muchos menús
    public function menus()
    {
        return $this->belongsToMany(Menu::class);
    }

    // Un artículo puede pertenecer a muchos pedidos, con datos en el pivot
    public function orders()
    {
        return $this->belongsToMany(Order::class, 'order_article')
                    ->withPivot(['quantity', 'unit_price']);
    }
}
