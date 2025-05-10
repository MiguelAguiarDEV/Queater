import { ReactNode } from "react";
import { Link, usePage } from "@inertiajs/react";
import NavLink from "@/Components/NavLink";

interface Props {
    header?: ReactNode;
    children: ReactNode;
}

export default function AdminLayout({ header, children }: Props) {
    // Puedes usar `user` dentro del header si lo necesitas más adelante
    const user = usePage().props.auth?.user ?? { id: 0, name: "", email: "" };

    return (
        <div className="h-screen flex overflow-hidden">
            <aside className="hidden md:flex flex-col w-60 bg-gray-100 overflow-y-auto shadow-md">
                <div className="h-16 flex items-center justify-center">
                    seré un logo
                </div>

                <nav className="flex flex-col px-4 py-4 space-y-4">
                    <NavLink
                        href={route("admin.dashboard")}
                        active={route().current("admin.dashboard")}
                    >
                        Inicio
                    </NavLink>
                    <NavLink
                        href={route("admin.menus.index")}
                        active={route().current("admin.menus.*")}
                    >
                        Menús
                    </NavLink>
                    <NavLink
                        href={route("admin.categorias.index")}
                        active={route().current("admin.categorias.*")}
                    >
                        Categorías
                    </NavLink>
                    <NavLink
                        href={route("admin.articulos.index")}
                        active={route().current("admin.articulos.*")}
                    >
                        Artículos
                    </NavLink>
                </nav>

                <div className="p-4 mt-auto">
                    <Link
                        href={route("logout")}
                        className="block bg-linear-to-r from-orange-400 to-orange-200  p-2 rounded text-orange-900 font-black text-center hover:scale-105 transition duration-150 ease-in-out"
                    >
                        Logout
                    </Link>
                </div>
            </aside>

            <div className="flex-1 flex flex-col">
                <header className="h-16 flex items-center px-4 ">
                    <nav>soy un navbar</nav>
                </header>

                <main className="flex-1 overflow-y-scroll scrollbar-hide p-4 min-h-0">
                    {header && <div className="mb-4">{header}</div>}
                    <div className="space-y-6">{children}</div>
                </main>
            </div>
        </div>
    );
}
