'use client';

import { useEffect, useState } from "react";
import { FiArrowLeft } from "react-icons/fi";

export default function Moodcheck() {
    const [moodBoxes, setMoodBoxes] = useState([]);
    const [selectedMoodId, setSelectedMoodId] = useState("");
    const [selectedMood, setSelectedMood] = useState(null);

    // Ambil mood yang ada di DB
    useEffect(() => {
        fetch("/api/mood_box")
            .then((res) => res.json())
            .then((data) => setMoodBoxes(data.moodBoxes || []));
    }, []);

    // Saat user memilih mood, cari moodBox yang sesuai
    useEffect(() => {
        if (!selectedMoodId) {
            setSelectedMood(null);
            return;
        }
        const moodBox = moodBoxes.find((mb) => mb.id === selectedMoodId);
        setSelectedMood(moodBox || null);
    }, [selectedMoodId, moodBoxes]);

    return (
        <div className="p-8 w-full space-y-6">

            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <button
                    onClick={() => window.history.back()}
                    className="flex items-center gap-2 bg-white hover:bg-purple-100 text-purple-700 px-3 py-2 rounded-lg font-semibold shadow transition"
                >
                    <FiArrowLeft className="text-xl" />
                    <span className="hidden sm:inline">Kembali</span>
                </button>
                <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-blue-500 drop-shadow-lg">
                    Mood Check
                </h1>
                <div className="w-24" /> {/* Spacer */}
            </div>

            <form
                onSubmit={e => e.preventDefault()}
                className="space-y-4"
            >
                <label className="block text-sm font-medium text-gray-700 mb-1 text-center">
                    Bagaimana mood kamu sekarang?
                </label>
                <select
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    value={selectedMoodId}
                    onChange={e => setSelectedMoodId(e.target.value)}
                    required
                >
                    <option value="">Pilih mood...</option>
                    {moodBoxes.map((mb) => (
                        <option key={mb.id} value={mb.id}>
                            {mb.mood}
                        </option>
                    ))}
                </select>
            </form>

            {selectedMood && (
                <div className="mt-6">
                    <h3 className="text-lg font-semibold text-purple-700 mb-2 text-center">
                        Rutinitas untuk mood: <span className="capitalize">{selectedMood.mood}</span>
                    </h3>
                    {selectedMood.routines.length === 0 ? (
                        <div className="text-center text-gray-500">Belum ada rutinitas untuk mood ini.</div>
                    ) : (
                        <ul className="divide-y">
                            {selectedMood.routines.map((routine) => (
                                <li
                                    key={routine.id}
                                    className="group py-5 flex flex-col md:flex-row md:items-center md:justify-between bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl shadow-md mb-5 px-5 md:px-8 border border-purple-100 hover:shadow-xl hover:scale-[1.02] transition-all duration-200"
                                >
                                    <div>
                                        <div className="font-bold text-lg text-purple-800 group-hover:text-blue-700 transition">{routine.title}</div>
                                        <div className="text-sm text-gray-600 mb-1">{routine.description}</div>
                                        <div className="text-xs text-gray-400 mt-1">
                                            <span className="mr-2">Kategori: <span className="font-semibold text-purple-500">{routine.category}</span></span>
                                            <span className="mr-2">Mood: <span className="font-semibold text-blue-500">{routine.mood}</span></span>
                                            <span>Waktu: <span className="font-semibold text-pink-500">{routine.timeBlock}</span></span>
                                        </div>
                                    </div>
                                    <div className="mt-3 md:mt-0 flex items-center gap-2">
                                        {routine.done ? (
                                            <span className="px-4 py-1 bg-gradient-to-r from-green-400 to-green-600 text-white rounded-full text-xs font-bold shadow">
                                                Selesai
                                            </span>
                                        ) : (
                                            <span className="px-4 py-1 bg-gradient-to-r from-yellow-300 to-yellow-500 text-yellow-900 rounded-full text-xs font-bold shadow">
                                                Belum Selesai
                                            </span>
                                        )}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </div>
    );
}