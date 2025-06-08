import ArticleCard from '@/Components/Article/Card';
import CreateArticleForm from '@/Components/Article/CreateForm';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import { Article, Restaurant, Category } from '@/types';
import axios from 'axios';
import { useState } from 'react';

interface Props {
    restaurant: Restaurant;
    articles: Article[];
    categories: Category[];
}

export default function Articulos({ restaurant, articles: initialArticles, categories }: Props) {
    const [articles, setArticles] = useState<Article[]>(initialArticles);
    const [showCreateForm, setShowCreateForm] = useState(false);

    // Función para recargar artículos (ej: después de crear/editar)
    const refreshArticles = async () => {
        try {
            const response = await axios.get(`/api/articles?restaurant_id=${restaurant.id}`);
            setArticles(response.data);
        } catch (error) {
            console.error('Error al recargar artículos:', error);
        }
    };

    const handleArticleCreated = async () => {
        await refreshArticles();
        setShowCreateForm(false);
    };    return (
        <AdminLayout
            header={
                <div className="flex items-center justify-between">
                    <h1 className="inline-block text-2xl font-bold">
                        Artículos - {restaurant.name}
                    </h1>
                    <button
                        onClick={() => setShowCreateForm(true)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        + Crear Artículo
                    </button>
                </div>
            }
        >
            <Head title="Admin • Artículos" />
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {articles.map((article) => (
                    <ArticleCard 
                        key={article.id} 
                        article={article}
                        onUpdate={refreshArticles}
                    />
                ))}
            </ul>

            {showCreateForm && (
                <CreateArticleForm
                    restaurant={restaurant}
                    categories={categories}
                    onArticleCreated={handleArticleCreated}
                    onCancel={() => setShowCreateForm(false)}
                />
            )}
        </AdminLayout>
    );
}
