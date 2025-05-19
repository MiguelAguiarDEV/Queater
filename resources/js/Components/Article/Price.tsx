import React, { useState, useEffect } from 'react';
import { formatEuros } from '@/utils/formatters';

interface PriceProps {
    price: number;
    active?: boolean;
    onChange?: (newValue: number) => void;
}

export default function Price({ price, active = false, onChange }: PriceProps) {
    const [inputValue, setInputValue] = useState<string>(
        active ? price.toString() : formatEuros(price)
    );

    useEffect(() => {
        setInputValue(active ? price.toString() : formatEuros(price));
    }, [active, price]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!active) return;
        const val = e.target.value;
        if (val === '' || /^\d*(?:[.,]\d{0,2})?$/.test(val)) {
            setInputValue(val);
        }
    };

    const handleBlur = () => {
        const num = parseFloat(inputValue.replace(',', '.')) || 0;
        setInputValue(formatEuros(num)); // formatea con Intl.NumberFormat
        onChange?.(num);
    };

    return (
        <input
            type="text"
            inputMode="decimal"
            pattern="[0-9]+([.,][0-9]{1,2})?"
            aria-label="Precio"
            value={inputValue}
            onChange={handleChange}
            onBlur={handleBlur}
            readOnly={!active}
            placeholder={active ? 'Precio' : undefined}
            className={`field-sizing-content w-fit rounded-lg px-2 py-1 text-sm font-semibold transition-all duration-300 ease-in-out focus:outline-none ${
                active
                    ? 'cursor-text bg-blue-200 text-blue-800'
                    : 'cursor-auto bg-gray-200'
            }`}
        />
    );
}
