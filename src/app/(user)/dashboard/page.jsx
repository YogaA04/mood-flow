
import ButtonPrimary from "@/components/utilities/button/buttonPrimary";
import { getUser } from "@/libs/dal";
import Link from "next/link";


export default async function DashboardPage() {

    const user = await getUser();

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 flex flex-col items-center py-10">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-2xl space-y-6">
                <h1 className="text-3xl font-bold text-center text-purple-700 mb-2">
                    Selamat datang, {user.name}!
                </h1>
                <p className="text-center text-gray-600 mb-6">
                    Ini adalah dashboard kamu. Silakan pilih menu di bawah untuk mulai aktivitas.
                </p>
                <div className="flex flex-col md:flex-row gap-4 justify-center">
                    <a
                        href="/dashboard/rutinitas"
                        className="flex-1 bg-purple-100 hover:bg-purple-200 border border-purple-300 rounded-lg p-6 flex flex-col items-center transition shadow group"
                    >
                        <span className="text-2xl mb-2 group-hover:text-purple-700 transition">🗓️</span>
                        <span className="font-semibold text-purple-700">Rutinitas</span>
                        <span className="text-xs text-gray-500 mt-1 text-center">Kelola rutinitas harianmu</span>
                    </a>
                    <a
                        href="/dashboard/weeklyfocus"
                        className="flex-1 bg-purple-100 hover:bg-purple-200 border border-purple-300 rounded-lg p-6 flex flex-col items-center transition shadow group"
                    >
                        <span className="text-2xl mb-2 group-hover:text-purple-700 transition">🏃‍♂️</span>
                        <span className="font-semibold text-purple-700">Fokus minggu ini</span>
                        <span className="text-xs text-gray-500 mt-1 text-center">Dahulukan yang terpenting minggu ini</span>
                    </a>
                    <a
                        href="/dashboard/moodcheck"
                        className="flex-1 bg-purple-100 hover:bg-purple-200 border border-purple-300 rounded-lg p-6 flex flex-col items-center transition shadow group"
                    >
                        <span className="text-2xl mb-2 group-hover:text-purple-700 transition">😊</span>
                        <span className="font-semibold text-purple-700">MoodCheck</span>
                        <span className="text-xs text-gray-500 mt-1 text-center">Cek dan catat mood harianmu</span>
                    </a>
                </div>

                <ButtonPrimary as={Link} href="/profile" className="mt-6 w-full ">
                    Lihat Profil
                </ButtonPrimary>
            </div>
        </div>
    );
}