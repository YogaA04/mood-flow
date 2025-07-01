'use client'

import { useEffect, useState } from "react";


export default function CardRoutine({ routine }) {
    const [routines, setRoutines] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchRoutines = async () => {
        setLoading(true);
        const res = await fetch('/api/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                query: `
                    query {
                        routines {
                            id
                            title
                            category
                            moodBox {
                            mood
                            }
                        }
                    }`
            })
        });
        const { data } = await res.json();
        setRoutines(data.routines || []);
        setLoading(false);
    };

    useEffect(() => {
        fetchRoutines();
    }, []);

    // Fungsi untuk menambahkan rutinitas ke MyDay
    const addToMyDay = async (routineId) => {
        try {
            const res = await fetch('/api/myday', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ routineId }),
            });
            if (res.ok) {
                alert('Rutinitas berhasil ditambahkan ke MyDay!');
            } else {
                alert('Gagal menambahkan ke MyDay.');
            }
        } catch (error) {
            alert('Terjadi kesalahan.');
        }
    };

    return (
        <>
            {/* Loading Animation */}
            {loading ? (
                <div className="flex flex-col items-center py-12">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-purple-500 mb-4"></div>
                    <div className="text-center text-gray-500">Memuat rutinitas...</div>
                </div>
            ) : routines.length === 0 ? (
                <div className="text-center text-gray-400 py-12 italic">Belum ada rutinitas.</div>
            ) : (
                <ul>
                    {routines.map((routine) => (
                        <li
                            key={routine.id}
                            className="group py-5 flex flex-col md:flex-row md:items-center md:justify-between bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl shadow-md mb-5 px-5 md:px-8 border border-purple-100 hover:shadow-xl hover:scale-[1.02] transition-all duration-200"
                        >
                            <div>
                                <div className="font-bold text-lg text-purple-800 group-hover:text-blue-700 transition">{routine.title}</div>

                                <div className="text-xs text-gray-400 mt-1">
                                    <span className="mr-2">Kategori: <span className="font-semibold text-purple-500">{routine.category}</span></span>
                                    <span className="mr-2">Mood: <span className="font-semibold text-blue-500">{routine.moodBox.mood}</span></span>
                                </div>
                            </div>
                            <div className="mt-3 md:mt-0 flex items-center gap-2">
                                <button
                                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
                                    onClick={() => addToMyDay(routine.id)}
                                >
                                    + Tambah ke MyDay
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </>
    )
}