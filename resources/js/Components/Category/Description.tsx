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
            placeholder={active ? 'Descripción' : undefined}
            aria-label="Descripción"
            rows={4}
            className={`scrollbar-hide w-full resize-none appearance-none rounded-lg px-2 py-1 text-sm transition-all duration-300 ease-in-out focus:outline-none ${
                active
                    ? 'cursor-text bg-blue-200 text-blue-800'
                    : 'cursor-auto bg-gray-200 text-gray-800'
            }`}
        />
    );
}
