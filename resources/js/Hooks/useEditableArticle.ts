import axios from "axios";
import { Article } from "@/types";
import { useEditableBase } from "./useEditableBase";
import { useState, useEffect, useRef } from "react";

export function useEditableArticle(initialArticle: Article) {
    // Usamos useRef para trackear cambios reales en initialArticle
    const prevArticleRef = useRef(initialArticle);

    // Mantenemos una versión actualizada del artículo
    const [article, setArticle] = useState(initialArticle);

    // Comprobamos si initialArticle ha cambiado realmente
    useEffect(() => {
        const prevArticle = prevArticleRef.current;
        // Solo actualizamos si hay un cambio real en las propiedades relevantes
        if (
            prevArticle.id !== initialArticle.id ||
            prevArticle.title !== initialArticle.title ||
            prevArticle.price !== initialArticle.price ||
            prevArticle.body !== initialArticle.body
        ) {
            setArticle(initialArticle);
            prevArticleRef.current = initialArticle;
        }
    }, [initialArticle]);

    const {
        isEditing,
        values,
        setField,
        setValues,
        setIsEditing,
        startEditing,
        cancelEditing,
    } = useEditableBase({
        title: article.title,
        price: article.price,
        body: article.body,
    });

    // Actualizamos valores solo cuando el artículo cambia, no en cada renderizado
    const valuesRef = useRef(values);
    useEffect(() => {
        // Comparamos valores para evitar actualizaciones innecesarias
        if (
            valuesRef.current.title !== article.title ||
            valuesRef.current.price !== article.price ||
            valuesRef.current.body !== article.body
        ) {
            setValues({
                title: article.title,
                price: article.price,
                body: article.body,
            });
            valuesRef.current = {
                title: article.title,
                price: article.price,
                body: article.body,
            };
        }
    }, [article, setValues]);

    const saveChanges = async () => {
        try {
            const response = await axios.put(
                `/api/articles/${article.id}`,
                values
            );

            // Actualizamos con los datos del servidor
            const updatedArticle = {
                ...article,
                title: response.data.title,
                price: response.data.price,
                body: response.data.body,
            };

            // Actualizamos nuestro estado local
            setArticle(updatedArticle);

            // Salimos del modo edición
            setIsEditing(false);
        } catch (error) {
            console.error("Error al guardar artículo:", error);
        }
    };

    // Extraemos los valores para devolverlos directamente
    const { title, price, body } = values;

    return {
        title,
        setTitle: (val: string) => setField("title", val),
        price,
        setPrice: (val: number) => setField("price", val),
        body,
        setBody: (val: string) => setField("body", val),
        isEditing,
        startEditing,
        cancelEditing,
        saveChanges,
    };
}
