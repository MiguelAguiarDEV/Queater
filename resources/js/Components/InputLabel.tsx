import { LabelHTMLAttributes } from "react";

export default function InputLabel({
    value,
    className = "",
    children,
    ...props
}: LabelHTMLAttributes<HTMLLabelElement> & { value?: string }) {
    return (
        <label
            {...props}
            className={
                `block text-sm md:text-base lg:text-lg font-bold text-gray-600` +
                className
            }
        >
            {value ? value : children}
        </label>
    );
}
