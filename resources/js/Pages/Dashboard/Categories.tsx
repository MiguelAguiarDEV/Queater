import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import { Category, PageProps } from '@/types';
import axios from 'axios';
import { useState, useEffect } from 'react';
import CategoryCard from '@/Components/Category/Card';

export default function Categories() {
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        axios
            .get('/api/categories')
            .then((response) => setCategories(response.data))
            .catch((error) =>
                console.error('Error al cargar categorías:', error)
            );
    }, []);

    return (
        <AdminLayout header={<h1 className="text-2xl">Categorías</h1>}>
            <Head title="Admin • Categorías" />
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {categories.map((category) => (
                    <CategoryCard key={category.id} category={category} />
                ))}
            </ul>
        </AdminLayout>
    );
}
