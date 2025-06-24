import ButtonPrimary from "@/components/utilities/button/buttonPrimary";
import { getUser } from "@/libs/dal";
import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";

export default async function DashboardPage() {
    const user = await getUser();

    const menus = [
        {
            href: "/dashboard/rutinitas",
            icon: "🗓️",
            title: "Rutinitas",
            desc: "Kelola rutinitas harianmu",
        },
        {
            href: "/dashboard/weeklyfocus",
            icon: "🏃‍♂️",
            title: "Fokus minggu ini",
            desc: "Dahulukan yang terpenting minggu ini",
        },
        {
            href: "/dashboard/moodcheck",
            icon: "😊",
            title: "MoodCheck",
            desc: "Cek dan catat mood harianmu",
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-100 flex flex-col items-center py-12">
            <div className="bg-white/80 backdrop-blur-md p-10 rounded-3xl shadow-2xl w-full max-w-3xl space-y-8 border border-purple-100">
                <h1 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-pink-500 drop-shadow mb-2">
                    Selamat datang, {user.name}!
                </h1>
                <p className="text-center text-gray-600 mb-8 text-lg">
                    Ini adalah dashboard kamu. Silakan pilih menu di bawah untuk mulai aktivitas.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {menus.map((menu) => (
                        <Link
                            key={menu.href}
                            href={menu.href}
                            className="group flex flex-col items-center bg-gradient-to-br from-purple-100 to-pink-100 border border-purple-200 rounded-2xl p-7 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:border-pink-400 cursor-pointer"
                        >
                            <span className="text-4xl mb-3 group-hover:scale-125 group-hover:-translate-y-1 transition-transform duration-300">
                                {menu.icon}
                            </span>
                            <span className="font-bold text-lg text-purple-700 group-hover:text-pink-600 transition-colors">
                                {menu.title}
                            </span>
                            <span className="text-xs text-gray-500 mt-2 text-center">
                                {menu.desc}
                            </span>
                        </Link>
                    ))}
                </div>
                <ButtonPrimary
                    as={Link}
                    href="/profile"
                    className="mt-8 w-full flex items-center justify-center gap-2 text-lg py-3 rounded-xl shadow-md hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-400 transition-all"
                >
                    <FaUserCircle className="text-2xl" />
                    Lihat Profil
                </ButtonPrimary>
            </div>
        </div>
    );
}