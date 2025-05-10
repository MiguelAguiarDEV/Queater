import ArticleCard from "@/Components/Article/Card";
import AdminLayout from "@/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";
import { Article } from "@/types";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Articulos() {
    const [articles, setArticles] = useState<Article[]>([]);

    useEffect(() => {
        axios
            .get("/api/articles")
            .then((response) => setArticles(response.data))
            .catch((error) =>
                console.error("Error al cargar artículos:", error)
            );
    }, []);

    return (
        <AdminLayout
            header={
                <h1 className=" inline-block text-2xl font-bold">Artículos</h1>
            }
        >
            <Head title="Admin • Artículos" />
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4 gap-4">
                {articles.map((article) => (
                    <ArticleCard key={article.id} article={article} />
                ))}
                {articles.map((article) => (
                    <ArticleCard key={article.id} article={article} />
                ))}
            </ul>
        </AdminLayout>
    );
}
