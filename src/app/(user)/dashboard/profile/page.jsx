
import ButtonPrimary from '@/components/utilities/button/buttonPrimary';
import LogoutButton from '@/components/utilities/button/LogoutButton';
import { getUser } from '@/libs/dal';
import Link from 'next/link';

export default async function ProfilePage() {

    const user = await getUser();

    return (
        <div className=" p-10 w-full max-w-md space-y-8 ">
            <div className="flex flex-col items-center">
                <div className="w-28 h-28 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-6xl text-white font-bold mb-5 border-4 border-white shadow-lg transition-transform duration-200 hover:scale-105 hover:shadow-xl">
                    {user.name ? user.name[0].toUpperCase() : user.email[0].toUpperCase()}
                </div>
                <h1 className="text-3xl font-extrabold text-purple-700 mb-1 tracking-tight">
                    {user.name || 'Pengguna'}
                </h1>
                <p className="text-gray-500 text-lg">{user.email}</p>
            </div>
            <div className="border-t border-purple-100 pt-6 space-y-3">
                <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-700">Nama</span>
                    <span className="text-gray-800">{user.name || '-'}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-700">Email</span>
                    <span className="text-gray-800">{user.email}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-700">Tanggal Bergabung</span>
                    <span className="text-gray-800">
                        {user.createdAt
                            ? new Date(user.createdAt).toLocaleDateString('id-ID')
                            : '-'}
                    </span>
                </div>
            </div>
            <div className="flex flex-col md:flex-row justify-center pt-6 gap-3">
                <ButtonPrimary as={Link} href="/dashboard">
                    Dashboard
                </ButtonPrimary>
                <LogoutButton />
            </div>
        </div>
    );
}