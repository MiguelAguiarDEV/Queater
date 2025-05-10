<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Menu extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'is_active',
        'restaurant_id',
    ];

    // Un menú agrupa muchos artículos
    public function articles()
    {
        return $this->belongsToMany(Article::class, 'article_menu');
    }

    // Un menú pertenece a un restaurante
    public function restaurant()
    {
        return $this->belongsTo(Restaurant::class);
    }
}
