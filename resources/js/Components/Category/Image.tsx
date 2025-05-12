export default function Image() {
    return (
        <div className="w-fit min-w-[80px] overflow-hidden rounded-lg bg-gray-100">
            <img
                src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
                className="size-20 object-cover"
            />
        </div>
    );
}
