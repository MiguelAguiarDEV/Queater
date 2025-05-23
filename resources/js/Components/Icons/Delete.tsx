interface HideProps {
    cursor?: boolean;
}

export default function Delete(props: HideProps) {
    return (
        <div
            className={`flex items-center justify-center rounded-lg bg-red-200 p-2 text-red-950 ${
                props.cursor ? 'cursor-pointer' : 'cursor-auto'
            }`}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-trash-icon lucide-trash size-4"
            >
                <path d="M3 6h18" />
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
            </svg>
        </div>
    );
}
