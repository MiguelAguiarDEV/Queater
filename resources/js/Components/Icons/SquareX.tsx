interface HideProps {
    cursor?: boolean;
}

export default function SquareX({ cursor }: HideProps) {
    return (
        <div
            className={`flex justify-center items-center bg-red-200 text-red-950 w-8 h-8 rounded-lg transition duration-250 ease-in-out ${
                cursor ? "cursor-pointer" : "cursor-auto"
            } `}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-x-icon lucide-x size-4"
            >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
            </svg>
        </div>
    );
}
