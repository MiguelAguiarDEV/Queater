interface TitleProps {
    /** El texto a mostrar (y editar) */
    description: string;
    /** Modo edición */
    active?: boolean;
    /** Sólo se llama al cambiar el texto cuando `active === true` */
    onChange?: (newValue: string) => void;
}

export default function Description({
    description,
    active = false,
    onChange,
}: TitleProps) {
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (!active || !onChange) return;
        onChange(e.target.value);
    };

    return (
        <textarea
            value={description}
            onChange={handleChange}
            readOnly={!active}
            placeholder={active ? "Descripción" : undefined}
            aria-label="Descripción"
            rows={4}
            className={`appearance-none focus:outline-none text-sm px-2 py-1 w-full rounded-lg resize-none scrollbar-hide transition-all duration-300 ease-in-out ${
                active
                    ? "bg-blue-200 text-blue-800 cursor-text"
                    : "bg-gray-200 text-gray-800 cursor-auto"
            }`}
        />
    );
}
