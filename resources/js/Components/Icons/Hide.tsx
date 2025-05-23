interface HideProps {
    cursor?: boolean;
    hide?: boolean;
}

export default function Hide({ cursor, hide }: HideProps) {
    return (
        <div
            className={`flex items-center justify-center rounded-lg bg-gray-200 p-2 text-gray-950 transition duration-250 ease-in-out ${
                cursor ? 'cursor-pointer' : 'cursor-auto'
            } ${hide ? 'pointer-events-none opacity-50' : ''} `}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-eye-closed-icon lucide-eye-closed size-4"
            >
                <path d="m15 18-.722-3.25" />
                <path d="M2 8a10.645 10.645 0 0 0 20 0" />
                <path d="m20 15-1.726-2.05" />
                <path d="m4 15 1.726-2.05" />
                <path d="m9 18 .722-3.25" />
            </svg>
        </div>
    );
}
