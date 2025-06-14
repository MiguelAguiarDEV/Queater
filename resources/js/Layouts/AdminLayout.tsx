import { ReactNode } from 'react';
import { Link, usePage } from '@inertiajs/react';
import NavLink from '@/Components/NavLink';

interface Props {
    header?: ReactNode;
    children: ReactNode;
}

interface Restaurant {
    id: number;
    name: string;
}

export default function AdminLayout({ header, children }: Props) {
    const user = usePage().props.auth?.user ?? { id: 0, name: '', email: '' };

    const { restaurant } = usePage<{ restaurant: Restaurant }>().props;

    return (
        <div className="flex h-screen overflow-hidden">
            <aside className="hidden w-60 flex-col overflow-y-auto bg-gray-100 shadow-md md:flex">
                <div className="flex h-16 items-center justify-center">
                    seré un logo
                </div>                <nav className="flex flex-col space-y-4 px-4 py-4">
                    {restaurant?.id && (
                        <NavLink
                            href={route('dashboard.restaurant', restaurant.name)}
                            active={route().current('dashboard.restaurant')}
                        >
                            Inicio
                        </NavLink>
                    )}

                    {restaurant?.id && (
                        <NavLink
                            href={route('dashboard.articles', restaurant.name)}
                            active={route().current('dashboard.articles')}
                        >
                            Artículos
                        </NavLink>
                    )}

                    {restaurant?.id && (
                        <NavLink
                            href={route('dashboard.categories', restaurant.name)}
                            active={route().current('dashboard.categories')}
                        >
                            Categorías
                        </NavLink>
                    )}

                    {restaurant?.id && (
                        <NavLink
                            href={route('dashboard.menus', restaurant.name)}
                            active={route().current('dashboard.menus')}
                        >
                            Menús
                        </NavLink>
                    )}
                </nav>

                <div className="mt-auto p-4">
                    <Link
                        href={route('logout')}
                        className="block rounded bg-gradient-to-r from-orange-400 to-orange-200 p-2 text-center font-black text-orange-900 transition duration-150 ease-in-out hover:scale-105"
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
