import { type ReactNode } from 'react';

interface AuthLayoutProps {
    children: ReactNode;
}

function AuthLayout({ children }: AuthLayoutProps) {
    return (
        <div className="min-h-screen bg-base-200 flex items-center justify-center">
            <div className="w-full max-w-md">
                {children}
            </div>
        </div>
    );
}

export default AuthLayout;
