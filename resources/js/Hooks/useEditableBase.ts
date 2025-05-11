import { useState, useEffect, useRef } from "react";

export function useEditableBase<T>(initialValues: T) {
    // Sólo mantenemos dos estados: isEditing y values
    const [isEditing, setIsEditing] = useState(false);
    const [values, setValues] = useState<T>(initialValues);

    // Usamos una ref para trackear cambios reales en initialValues
    const prevValuesRef = useRef(initialValues);

    // Actualizamos values si initialValues cambia realmente y no estamos editando
    useEffect(() => {
        // Solo actualizamos si no estamos editando y hay un cambio real
        if (
            !isEditing &&
            JSON.stringify(prevValuesRef.current) !==
                JSON.stringify(initialValues)
        ) {
            setValues(initialValues);
            prevValuesRef.current = initialValues;
        }
    }, [initialValues, isEditing]);

    const updateField = <K extends keyof T>(key: K, value: T[K]) => {
        setValues((prev) => ({ ...prev, [key]: value }));
    };

    const startEditing = () => setIsEditing(true);

    const cancelEditing = () => {
        setValues(initialValues);
        setIsEditing(false);
    };

    return {
        isEditing,
        setIsEditing,
        values,
        setField: updateField,
        setValues,
        startEditing,
        cancelEditing,
    };
}
