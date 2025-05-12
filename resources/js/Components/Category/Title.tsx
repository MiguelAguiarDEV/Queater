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
            placeholder={active ? 'Título' : undefined}
            className={`text-md w-full appearance-none rounded-lg px-1 py-0.5 font-semibold transition-all duration-300 ease-in-out focus:outline-none ${
                active
                    ? 'cursor-text bg-blue-200 text-blue-800'
                    : 'cursor-auto bg-transparent text-gray-800'
            }`}
            aria-label="Título"
        />
    );
}
