interface TitleProps {
    /** El texto a mostrar (y editar) */
    name: string;
    /** Modo edición */
    active?: boolean;
    /** Sólo se llama al cambiar el texto cuando `active === true` */
    onChange?: (newValue: string) => void;
}

export default function Title({ name, active = false, onChange }: TitleProps) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!active || !onChange) return;
        onChange(e.target.value);
    };

    return (
        <input
            type="text"
            value={name}
            onChange={handleChange}
            readOnly={!active}
            placeholder={active ? "Título" : undefined}
            className={`font-semibold text-md appearance-none focus:outline-none px-1 py-0.5 w-full rounded-lg transition-all duration-300 ease-in-out ${
                active
                    ? "bg-blue-200 text-blue-800 cursor-text"
                    : "bg-transparent text-gray-800 cursor-auto"
            }`}
            aria-label="Título"
        />
    );
}
