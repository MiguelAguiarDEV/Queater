import { ReactNode } from 'react';
import { Link, usePage } from '@inertiajs/react';
import NavLink from '@/Components/NavLink';

interface Props {
    header?: ReactNode;
    children: ReactNode;
}

export default function AdminLayout({ header, children }: Props) {
    // Puedes usar `user` dentro del header si lo necesitas más adelante
    const user = usePage().props.auth?.user ?? { id: 0, name: '', email: '' };

    return (
        <div className="flex h-screen overflow-hidden">
            <aside className="hidden w-60 flex-col overflow-y-auto bg-gray-100 shadow-md md:flex">
                <div className="flex h-16 items-center justify-center">
                    seré un logo
                </div>

                <nav className="flex flex-col space-y-4 px-4 py-4">
                    <NavLink
                        href={route('admin.dashboard')}
                        active={route().current('admin.dashboard')}
                    >
                        Inicio
                    </NavLink>
                    <NavLink
                        href={route('admin.menus.index')}
                        active={route().current('admin.menus.*')}
                    >
                        Menús
                    </NavLink>
                    <NavLink
                        href={route('admin.categorias.index')}
                        active={route().current('admin.categorias.*')}
                    >
                        Categorías
                    </NavLink>
                    <NavLink
                        href={route('admin.articulos.index')}
                        active={route().current('admin.articulos.*')}
                    >
                        Artículos
                    </NavLink>
                </nav>

                <div className="mt-auto p-4">
                    <Link
                        href={route('logout')}
                        className="block rounded bg-linear-to-r from-orange-400 to-orange-200 p-2 text-center font-black text-orange-900 transition duration-150 ease-in-out hover:scale-105"
                    >
                        Logout
                    </Link>
                </div>
            </aside>

            <div className="flex flex-1 flex-col">
                <header className="flex h-16 items-center px-4">
                    <nav>soy un navbar</nav>
                </header>

                <main className="scrollbar-hide min-h-0 flex-1 overflow-y-scroll p-4">
                    {header && <div className="mb-4">{header}</div>}
                    <div className="space-y-6">{children}</div>
                </main>
            </div>
        </div>
    );
}
