import { type ReactNode } from 'react';

interface AdminLayoutProps {
    children: ReactNode;
}

function AdminLayout({ children }: AdminLayoutProps) {
    return (
        <div className="min-h-screen bg-base-100">
            {/* TODO: Agregar sidebar de admin y header */}
            <main className="w-full min-h-screen">
                {children}
            </main>
        </div>
    );
}

export default AdminLayout;
