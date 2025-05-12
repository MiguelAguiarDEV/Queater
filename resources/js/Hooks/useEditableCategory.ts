import axios from 'axios';
import { Category } from '@/types';
import { useEditableBase } from './useEditableBase';
import { useState, useEffect, useRef } from 'react';

export function useEditableCategory(initialCategory: Category) {
    const prevCategoryRef = useRef(initialCategory);
    const [category, setCategory] = useState(initialCategory);

    // Sincronizamos cuando initialCategory cambia realmente
    useEffect(() => {
        const prev = prevCategoryRef.current;
        if (
            prev.id !== initialCategory.id ||
            prev.name !== initialCategory.name ||
            prev.description !== initialCategory.description
        ) {
            setCategory(initialCategory);
            prevCategoryRef.current = initialCategory;
        }
    }, [initialCategory]);

    const {
        isEditing,
        values,
        setField,
        setValues,
        setIsEditing,
        startEditing,
        cancelEditing,
    } = useEditableBase({
        name: category.name,
        description: category.description ?? '',
    });

    // Solo actualizamos valores si cambian
    const valuesRef = useRef(values);
    useEffect(() => {
        if (
            valuesRef.current.name !== category.name ||
            valuesRef.current.description !== category.description
        ) {
            setValues({
                name: category.name,
                description: category.description ?? '',
            });
            valuesRef.current = {
                name: category.name,
                description: category.description ?? '',
            };
        }
    }, [category, setValues]);

    const saveChanges = async () => {
        try {
            const response = await axios.put(
                `/api/categories/${category.id}`,
                values
            );

            const updatedCategory = {
                ...category,
                name: response.data.name,
                description: response.data.description,
            };

            setCategory(updatedCategory);
            setIsEditing(false);
        } catch (error) {
            console.error('Error al guardar categoría:', error);
        }
    };

    const { name, description } = values;

    return {
        name,
        setName: (val: string) => setField('name', val),
        description,
        setDescription: (val: string) => setField('description', val),
        isEditing,
        startEditing,
        cancelEditing,
        saveChanges,
    };
}
