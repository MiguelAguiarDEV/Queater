// resources/js/utils/websockets.ts
import Echo from 'laravel-echo';
import Pusher from 'pusher-js'; // Import Pusher

/**
 * Servicio utilitario para conectar y escuchar eventos de websockets por restaurante.
 * Permite suscribirse fácilmente a canales privados y manejar eventos.
 */
export class WebsocketsService {
    private echo: Echo<any> | null = null;
    private channel: any = null;

    /**
     * Conecta al canal privado de un restaurante y escucha un evento.
     * @param restaurantId ID del restaurante
     * @param onOrderCreated Callback cuando llega un nuevo pedido
     * @param onStatus Opcional: callback para cambios de estado (conectado, error, etc)
     */
    connectToRestaurant(
        restaurantId: number,
        onOrderCreated: (order: any) => void,
        onStatus?: (status: string) => void
    ) {
        if (this.echo) {
            this.echo.leave(`private-restaurant.${restaurantId}`);
        }
        (window as any).Pusher = Pusher; // Make Pusher globally available before initializing Echo
        this.echo = new Echo({
            broadcaster: 'reverb',
            key: import.meta.env.VITE_REVERB_APP_KEY,
            wsHost:
                import.meta.env.VITE_REVERB_HOST || window.location.hostname,
            wsPort: Number(import.meta.env.VITE_REVERB_PORT) || 8080,
            wssPort: Number(import.meta.env.VITE_REVERB_PORT) || 443,
            forceTLS: (import.meta.env.VITE_REVERB_SCHEME || 'ws') === 'wss',
            disableStats: true,
            enabledTransports: ['ws', 'wss'],
            authEndpoint: '/broadcasting/auth',
            auth: {
                headers: {
                    'X-CSRF-TOKEN':
                        (
                            document.querySelector(
                                'meta[name="csrf-token"]'
                            ) as HTMLMetaElement
                        )?.content || '',
                },
            },
        });
        if (onStatus) onStatus('Conectando...');
        this.channel = this.echo
            .private(`restaurant.${restaurantId}`)
            .listen('OrderCreated', (e: any) => {
                onOrderCreated(e.order);
            })
            .subscribed(() => onStatus && onStatus('Conectado ✔'))
            .error(() => onStatus && onStatus('Error de conexión'));
    }

    /**
     * Desconecta del canal y cierra la conexión.
     */
    disconnect() {
        if (this.channel) {
            this.channel.unsubscribe();
        }
        if (this.echo) {
            this.echo.disconnect();
            this.echo = null;
        }
    }
}
