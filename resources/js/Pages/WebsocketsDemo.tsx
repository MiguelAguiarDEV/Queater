import React, { useEffect, useState, useRef } from 'react';
import { Head } from '@inertiajs/react';
import { WebsocketsService } from '../utils/websockets';

interface Order {
    id: number;
    customer_name: string;
    customer_email: string;
    status: string;
}

/**
 * Demo de uso de WebsocketsService para escuchar pedidos en tiempo real por restaurante.
 * El equipo frontend puede usar este patrón para cualquier página que requiera eventos en vivo.
 */
export default function WebsocketsDemo() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [status, setStatus] = useState<string>('Desconectado');
    const [restaurantId, setRestaurantId] = useState<number>(1);
    const wsService = useRef<WebsocketsService | null>(null);

    useEffect(() => {
        // Desconecta si ya hay una instancia previa
        if (wsService.current) {
            wsService.current.disconnect();
        }
        // Crea y conecta el servicio de websockets
        wsService.current = new WebsocketsService();
        wsService.current.connectToRestaurant(
            restaurantId,
            (order) => setOrders((prev) => [order, ...prev]),
            setStatus
        );
        // Limpia la conexión al desmontar o cambiar de restaurante
        return () => {
            wsService.current?.disconnect();
        };
        // eslint-disable-next-line
    }, [restaurantId]);

    return (
        <div
            style={{ maxWidth: 600, margin: '2rem auto', fontFamily: 'Arial' }}
        >
            <Head title="Demo Websockets" />
            <h1>Demo Websockets: Pedidos en Tiempo Real</h1>
            <p>
                Escucha el canal{' '}
                <code>private-restaurant.&#123;restaurantId&#125;</code> para
                recibir nuevos pedidos.
                <br />
                <b>Evento:</b> <code>OrderCreated</code>
            </p>
            <label>
                ID del restaurante:
                <input
                    type="number"
                    value={restaurantId}
                    min={1}
                    onChange={(e) => setRestaurantId(Number(e.target.value))}
                    style={{ width: 60, marginLeft: 8 }}
                />
            </label>
            <span
                style={{
                    marginLeft: 16,
                    color: status.includes('✔') ? 'green' : 'red',
                }}
            >
                {status}
            </span>
            <h2 style={{ marginTop: 32 }}>Pedidos recibidos:</h2>
            <div>
                {orders.length === 0 && <div>No hay pedidos nuevos aún.</div>}
                {orders.map((order) => (
                    <div
                        key={order.id}
                        style={{
                            border: '1px solid #ccc',
                            padding: 12,
                            marginBottom: 12,
                        }}
                    >
                        <b>Pedido #{order.id}</b>
                        <br />
                        Cliente: {order.customer_name}
                        <br />
                        Email: {order.customer_email}
                        <br />
                        Estado: {order.status}
                    </div>
                ))}
            </div>
        </div>
    );
}
