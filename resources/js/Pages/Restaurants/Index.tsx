import House from '@/Components/Icons/House';
import HousePlus from '@/Components/Icons/HousePlus';
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
            <div className="flex w-full max-w-5xl justify-center gap-6 lg:gap-8">
                <ul className="flex gap-6 lg:gap-8">
                    {restaurants.map((restaurant) => (
                        <li
                            key={restaurant.id}
                            className="group flex h-48 w-48 transform cursor-pointer flex-col items-center justify-center gap-4 overflow-hidden rounded-md bg-gradient-to-br from-orange-400 to-orange-600 p-4 text-center shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl hover:shadow-orange-500/40 hover:brightness-110"
                        >
                            <div className="flex size-16 items-center justify-center rounded-full bg-orange-50">
                                <House className="size-10 text-orange-600" />
                            </div>
                            <p className="h-8 text-lg font-semibold text-white drop-shadow-sm">
                                {restaurant.name}
                            </p>
                        </li>
                    ))}
                </ul>
                <button className="flex h-48 w-48 transform cursor-pointer flex-col items-center justify-center gap-4 overflow-hidden rounded-md bg-gradient-to-br from-gray-200 to-gray-400 p-4 text-center shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl hover:shadow-gray-500/40 hover:brightness-110">
                    <div className="flex size-16 items-center justify-center rounded-full bg-gray-50">
                        <HousePlus className="size-10 text-gray-600" />
                    </div>
                    <p className="h-8 text-lg font-semibold text-white drop-shadow-sm">
                        crear
                    </p>
                </button>
            </div>
        </div>
    );
}
