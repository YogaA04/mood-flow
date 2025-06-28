import NavDasboard from "@/components/layouts/dasboard/Navbar";
import { getUser } from "@/libs/dal";

export default async function DashboardPage() {
    const user = await getUser();

    // Dummy data analisa, ganti dengan data asli jika sudah ada
    const weeklyStats = {
        routinesCompleted: 12,
        moodSummary: [
            { day: "Senin", mood: "😊" },
            { day: "Selasa", mood: "😐" },
            { day: "Rabu", mood: "😊" },
            { day: "Kamis", mood: "😔" },
            { day: "Jumat", mood: "😊" },
            { day: "Sabtu", mood: "😄" },
            { day: "Minggu", mood: "😊" },
        ],
        focus: "Belajar React & Meditasi",
    };

    return (
        <div className="p-10 w-full">
            <h1 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-pink-500 drop-shadow mb-2">
                Selamat datang, {user.name}!
            </h1>
            <p className="text-center text-gray-600 mb-8 text-lg">
                Berikut adalah analisa aktivitasmu selama 1 minggu terakhir.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gradient-to-br from-purple-100 to-pink-100 border border-purple-200 rounded-2xl p-7 shadow-lg flex flex-col items-center">
                    <span className="text-5xl mb-2">✅</span>
                    <span className="font-bold text-2xl text-purple-700 mb-1">
                        {weeklyStats.routinesCompleted}
                    </span>
                    <span className="text-sm text-gray-500 text-center">
                        Rutinitas selesai minggu ini
                    </span>
                </div>
                <div className="bg-gradient-to-br from-purple-100 to-pink-100 border border-purple-200 rounded-2xl p-7 shadow-lg flex flex-col items-center">
                    <span className="font-bold text-lg text-purple-700 mb-2">
                        Mood Harian
                    </span>
                    <div className="flex gap-2 mb-2">
                        {weeklyStats.moodSummary.map((m) => (
                            <div key={m.day} className="flex flex-col items-center">
                                <span className="text-2xl">{m.mood}</span>
                                <span className="text-xs text-gray-400">
                                    {m.day.slice(0, 3)}
                                </span>
                            </div>
                        ))}
                    </div>
                    <span className="text-xs text-gray-500 text-center">
                        Rangkuman mood 7 hari terakhir
                    </span>
                </div>
                <div className="bg-gradient-to-br from-purple-100 to-pink-100 border border-purple-200 rounded-2xl p-7 shadow-lg flex flex-col items-center">
                    <span className="text-3xl mb-2">🎯</span>
                    <span className="font-bold text-lg text-purple-700 mb-1">
                        Fokus Minggu Ini
                    </span>
                    <span className="text-sm text-gray-600 text-center">
                        {weeklyStats.focus}
                    </span>
                </div>
            </div>
        </div>
    );
}