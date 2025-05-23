interface HideProps {
    cursor?: boolean;
}

export default function Edit(props: HideProps) {
    return (
        <div
            className={`flex items-center justify-center rounded-lg bg-green-200 p-2 text-green-950 ${
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
                className="lucide lucide-pencil-icon lucide-pencil size-4"
            >
                <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
                <path d="m15 5 4 4" />
            </svg>
        </div>
    );
}
