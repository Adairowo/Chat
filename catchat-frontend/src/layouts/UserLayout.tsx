import { type ReactNode } from 'react';

interface UserLayoutProps {
    children: ReactNode;
}

function UserLayout({ children }: UserLayoutProps) {
    return (
        <div className="min-h-screen bg-base-100">
            {/* TODO: Agregar header y sidebar para chats */}
            <main className="w-full h-screen">
                {children}
            </main>
        </div>
    );
}

export default UserLayout;
