// resources/js/Pages/Dashboard/Index.tsx
import AdminLayout from "@/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";

export default function Index() {
    return (
        <AdminLayout header={<h1 className="text-2xl">Inicio</h1>}>
            <Head title="Admin • Inicio" />
            <p>Bienvenido al panel de administración de Queater.</p>
        </AdminLayout>
    );
}
