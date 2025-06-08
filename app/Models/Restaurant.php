<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Restaurant extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        // TODO: Uncomment and add necessary fields
        // 'address',
        // 'phone',
        // 'email',
    ];

    /**
     * Get the route key for the model.
     * Configura Laravel para usar el campo 'name' en lugar del 'id'
     * para el route model binding.
     */
    public function getRouteKeyName()
    {
        return 'name';
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }    public function menus()
    {
        return $this->hasMany(Menu::class);
    }

    public function articles()
    {
        return $this->hasMany(Article::class);
    }
}
