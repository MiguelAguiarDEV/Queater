export default function Image() {
    return (
        <div className="bg-gray-100 rounded-lg w-fit min-w-[80px] overflow-hidden">
            <img
                src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
                className="object-cover size-20"
            />
        </div>
    );
}
