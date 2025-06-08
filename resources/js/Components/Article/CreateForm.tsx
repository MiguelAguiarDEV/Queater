import { useState, useEffect } from 'react';
import axios from 'axios';
import { Restaurant, Category } from '@/types';

interface CreateArticleFormProps {
    restaurant: Restaurant;
    categories: Category[];
    onArticleCreated: () => void | Promise<void>;
    onCancel: () => void;
}

export default function CreateArticleForm({ 
    restaurant, 
    categories, 
    onArticleCreated, 
    onCancel 
}: CreateArticleFormProps) {
    const [formData, setFormData] = useState({
        title: '',
        body: '',
        price: '',
        category_id: categories.length > 0 ? categories[0].id : '',
        is_published: true
    });
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<Record<string, string[]>>({});

    // Manejar tecla Escape para cerrar el modal
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && !isLoading) {
                onCancel();
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [isLoading, onCancel]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setErrors({});

        try {
            await axios.post('/api/articles', {
                ...formData,
                price: parseFloat(formData.price),
                restaurant_id: restaurant.id
            });

            // Limpiar formulario
            setFormData({
                title: '',
                body: '',
                price: '',
                category_id: categories.length > 0 ? categories[0].id : '',
                is_published: true
            });

            // Notificar que se creó el artículo
            await onArticleCreated();
            
        } catch (error: any) {
            if (error.response?.data?.errors) {
                setErrors(error.response.data.errors);
            } else {
                console.error('Error al crear artículo:', error);
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleOverlayClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onCancel();
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        
        if (type === 'checkbox') {
            const checked = (e.target as HTMLInputElement).checked;
            setFormData(prev => ({ ...prev, [name]: checked }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    return (
        <div 
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={handleOverlayClick}
        >
            <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200 transform transition-all duration-300 ease-out scale-100 opacity-100">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Crear Nuevo Artículo</h2>
                    <button
                        type="button"
                        onClick={onCancel}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                        aria-label="Cerrar modal"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Título */}
                <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                    Título *
                </label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
                {errors.title && (
                    <p className="text-red-500 text-sm mt-1">{errors.title[0]}</p>
                )}
                </div>

                {/* Descripción */}
                <div>
                <label htmlFor="body" className="block text-sm font-medium text-gray-700 mb-1">
                    Descripción
                </label>
                <textarea
                    id="body"
                    name="body"
                    value={formData.body}
                    onChange={handleChange}
                    rows={3}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.body && (
                    <p className="text-red-500 text-sm mt-1">{errors.body[0]}</p>
                )}
                </div>

                {/* Precio */}
                <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                    Precio (€) *
                </label>
                <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    step="0.01"
                    min="0"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
                {errors.price && (
                    <p className="text-red-500 text-sm mt-1">{errors.price[0]}</p>
                )}
                </div>

                {/* Categoría */}
                <div>
                <label htmlFor="category_id" className="block text-sm font-medium text-gray-700 mb-1">
                    Categoría *
                </label>
                <select
                    id="category_id"
                    name="category_id"
                    value={formData.category_id}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                >
                    {categories.map(category => (
                    <option key={category.id} value={category.id}>
                        {category.name}
                    </option>
                    ))}
                </select>
                {errors.category_id && (
                    <p className="text-red-500 text-sm mt-1">{errors.category_id[0]}</p>
                )}
                </div>

                {/* Publicado */}
                <div className="flex items-center">
                <input
                    type="checkbox"
                    id="is_published"
                    name="is_published"
                    checked={formData.is_published}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="is_published" className="ml-2 block text-sm text-gray-700">
                    Publicar artículo
                </label>
                </div>

                {/* Botones */}
                <div className="flex gap-3 pt-4">
                <button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    {isLoading ? 'Creando...' : 'Crear Artículo'}
                </button>
                <button
                    type="button"
                    onClick={onCancel}
                    className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                    Cancelar
                </button>
                </div>
            </form>
            </div>
        </div>
    );
}
