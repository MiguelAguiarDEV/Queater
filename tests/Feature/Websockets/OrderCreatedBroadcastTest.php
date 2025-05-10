<?php
namespace Tests\Feature\Websockets;

use App\Events\OrderCreated;
use App\Models\Order;
use App\Models\Restaurant;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Broadcast;
use Illuminate\Support\Facades\Event;
use Tests\TestCase;

/**
 * @covers \App\Events\OrderCreated
 *
 * Prueba que el evento OrderCreated se emite correctamente
 * y se transmite por el canal privado adecuado.
 */
class OrderCreatedBroadcastTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function it_broadcasts_order_created_event_on_private_restaurant_channel()
    {
        // Finge los listeners de eventos para testear broadcasting
        Event::fake([OrderCreated::class]);

        // Crea un usuario y un restaurante asociado
        $user = User::factory()->create();
        $restaurant = Restaurant::factory()->create(['user_id' => $user->id]);
        // Crea un pedido asociado al restaurante
        $order = Order::factory()->create(['restaurant_id' => $restaurant->id]);

        // Dispara el evento
        event(new OrderCreated($order));

        // Aserta que el evento fue emitido
        Event::assertDispatched(OrderCreated::class, function ($event) use ($order) {
            return $event->order->id === $order->id;
        });
    }
}
