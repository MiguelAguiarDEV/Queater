<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Restaurant extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'address',
        'phone',
        'email',
        'user_id',
    ];

    // Un restaurante pertenece a un usuario
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Un restaurante tiene muchos menús
    public function menus()
    {
        return $this->hasMany(Menu::class);
    }
}
