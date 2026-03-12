'use client';

import { LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';

export default function LogoutButton() {
    return (
        <button
            onClick={() => signOut({ callbackUrl: '/admin/login' })}
            className="absolute bottom-4 w-[calc(100%-2rem)] flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-red-50 text-red-600 transition-colors"
        >
            <LogOut className="w-5 h-5" /> Cerrar Sesión
        </button>
    );
}
