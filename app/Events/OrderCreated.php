<?php
namespace App\Events;

use App\Models\Order;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class OrderCreated implements ShouldBroadcast
{
    public $order;

    public function __construct(Order $order)
    {
        $this->order = $order;
    }

    /**
     * Obtiene el canal privado donde se emitirá el evento.
     * Solo los usuarios autorizados podrán escuchar este canal.
     *
     * @return \Illuminate\Broadcasting\PrivateChannel
     */
    public function broadcastOn()
    {
        // Canal privado por restaurante, ejemplo: restaurant.5
        return new PrivateChannel('restaurant.' . $this->order->restaurant_id);
    }

    public function broadcastWith()
    {
        return ['order' => $this->order];
    }
}
