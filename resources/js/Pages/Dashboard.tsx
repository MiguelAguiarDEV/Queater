import NavLink from "@/Components/NavLink";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Head, usePage } from "@inertiajs/react";

interface Article {
    id: number;
    title: string;
    price: number;
}

interface DashboardProps extends PageProps {
    articles: Article[];
}

export default function Dashboard() {
    const { articles } = usePage<DashboardProps>().props;

    return (
        <>
            <Head title="Dashboard" />

            <div className="grid md:grid-cols-10 md:grid-rows-10 grid-cols-1 grid-rows-10 h-[100dvh] p-2 md:gap-2">
                <aside className="border-2 border-red-500 md:col-span-2 md:row-span-10 hidden md:grid grid-rows-10 px-2">
                    <div className="row-span-1 flex justify-center">
                        <p className="my-auto">seré un logo</p>
                    </div>
                    <div className="row-span-8">
                        <ul className="border border-red-500 rounded-md flex flex-col gap-4 p-4">
                            <li>
                                <NavLink
                                    href={route("admin.dashboard")}
                                    active={route().current("admin.dashboard")}
                                >
                                    Inicio
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    href={route("admin.menus.index")}
                                    active={route().current("admin.menus.*")}
                                >
                                    Menus
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    href={route("admin.categorias.index")}
                                    active={route().current(
                                        "admin.categorias.*"
                                    )}
                                >
                                    Categorias
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    href={route("admin.articulos.index")}
                                    active={route().current(
                                        "admin.articulos.*"
                                    )}
                                >
                                    Articulos
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                    <div className="row-span-1 flex justify-center">
                        <p className="my-auto">Logout</p>
                    </div>
                </aside>
                <header className="border-2 border-blue-500 md:col-span-8 md:row-span-1">
                    <nav>soy un navbar</nav>
                </header>
                <main className="border-2 border-green-500 md:col-span-8 md:row-span-9 row-span-9">
                    <p>contenido</p>
                </main>
            </div>
        </>
    );
}
