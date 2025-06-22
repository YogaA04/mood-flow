'use client';   
import { logout } from "@/libs/auth";

export default function LogoutButton() {

    const handleLogout = async () => {
        await logout();
    };

    return (
        <button
            className='bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white px-7 py-2.5 rounded-lg transition font-semibold shadow-md'
            onClick={handleLogout}
        >
            Logout
        </button>
    );
}