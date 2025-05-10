// resources/js/utils/formatters.ts
export const euroFormatter = new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
});

export function formatEuros(value: number): string {
    return euroFormatter.format(value);
}
