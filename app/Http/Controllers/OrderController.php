<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Http\Requests\StoreOrderRequest;
use App\Http\Requests\UpdateOrderRequest;
use Illuminate\Http\Request;
use App\Events\OrderCreated;

class OrderController extends Controller
{
    public function index()
    {
        return response()->json(Order::all());
    }

    public function show(Order $order)
    {
        return response()->json($order);
    }

    /**
     * Crea un nuevo pedido y lo guarda en la base de datos.
     * Además, emite un evento OrderCreated para notificar en tiempo real a los clientes conectados
     * al canal del restaurante correspondiente mediante websockets.
     *
     * @param  StoreOrderRequest  $request  Petición validada con los datos del pedido
     * @return \Illuminate\Http\JsonResponse  Respuesta con el pedido creado
     */
    public function store(StoreOrderRequest $request)
    {
        // 1. Crear el pedido con los datos validados
        $order = Order::create($request->validated());

        // 2. Emitir el evento OrderCreated para broadcasting
        // Esto notificará a todos los clientes suscritos al canal del restaurante
        event(new OrderCreated($order));

        // 3. Devolver el pedido creado como respuesta
        return response()->json($order, 201);
    }

    public function update(UpdateOrderRequest $request, Order $order)
    {
        $order->update($request->validated());
        return response()->json($order);
    }

    public function destroy(Order $order)
    {
        $order->delete();
        return response()->json(null, 204);
    }
}
