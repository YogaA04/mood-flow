'use client';

import { useEffect, useState } from "react";

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
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 py-10">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md space-y-6">
                <h2 className="text-2xl font-bold text-purple-700 text-center mb-4">Mood Check</h2>
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
                                    <li key={routine.id} className="py-3">
                                        <div className="font-semibold text-purple-700">{routine.title}</div>
                                        <div className="text-sm text-gray-600">{routine.description}</div>
                                        <div className="text-xs text-gray-400 mt-1">
                                            Kategori: {routine.category} | Waktu: {routine.timeBlock}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}