<?php

use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});

Broadcast::channel('restaurant.{restaurantId}', function ($user, $restaurantId) {
    // Solo permite si el usuario tiene acceso a ese restaurante
    // (puedes ajustar esta lógica según tu modelo de permisos)
    return $user->restaurants()->where('id', $restaurantId)->exists();
});
