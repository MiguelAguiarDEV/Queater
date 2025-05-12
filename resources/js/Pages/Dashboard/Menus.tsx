// resources/js/Pages/Dashboard/Menus.tsx
import AdminLayout from '@/Layouts/AdminLayout';
import { PageProps } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import axios from 'axios';
import { useState, useEffect } from 'react';

interface Menu extends PageProps {
    id: number;
    name: string;
}

export default function Menus() {
    const [menus, setMenus] = useState<Menu[]>([]);
    useEffect(() => {
        axios
            .get('/api/menus')
            .then((response) => setMenus(response.data))
            .catch((error) => console.error('Error al cargar menús:', error));
    }, []);

    return (
        <AdminLayout header={<h1 className="text-2xl">Menús</h1>}>
            <Head title="Admin • Menús" />
            <ul className="space-y-2">
                {menus.map((m) => (
                    <li key={m.id} className="rounded border p-2">
                        {m.name}
                    </li>
                ))}
            </ul>
        </AdminLayout>
    );
}
