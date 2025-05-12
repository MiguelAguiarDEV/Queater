import axios from 'axios';
import { useState, useEffect } from 'react';

interface Restaurant {
    id: number;
    name: string;
}

export default function Index() {
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

    useEffect(() => {
        axios
            .get('/api/restaurants')
            .then((response) => setRestaurants(response.data))
            .catch((error) =>
                console.error('Error al cargar artículos:', error)
            );
    }, []);
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 px-6 text-gray-900">
            <h1 className="mb-12 text-center text-4xl font-semibold tracking-tight text-gray-800 md:text-5xl">
                Selecciona un restaurante
            </h1>
            <ul className="grid w-full max-w-5xl grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:gap-8">
                {restaurants.map((restaurant) => (
                    <li
                        key={restaurant.id}
                        className="group flex h-48 transform cursor-pointer flex-col items-center justify-center overflow-hidden rounded-md bg-gradient-to-br from-orange-400 to-orange-600 p-4 text-center shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl hover:shadow-orange-500/40 hover:brightness-110"
                    >
                        <p className="text-lg font-semibold text-white drop-shadow-sm">
                            {restaurant.name}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
