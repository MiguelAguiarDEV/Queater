// resources/js/Pages/Dashboard/Index.tsx
import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';

export default function Index({ restaurant }: { restaurant: any }) {
    return (
        <AdminLayout header={<h1 className="text-2xl">Dashboard: {restaurant.name}</h1>}>
            <Head title={`Admin • ${restaurant.name}`} />
            <p>Bienvenido al panel del restaurante: {restaurant.name}</p>
        </AdminLayout>
    );
}
