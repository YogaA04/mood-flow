'use client';

import { useEffect, useState } from "react";
import CreateRoutine from '@/components/ui/routine/CreateRoutine';

export default function RoutinePage() {
    const [routines, setRoutines] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);

    // Ambil data rutinitas dari API
    const fetchRoutines = async () => {
        setLoading(true);
        const res = await fetch("/api/rutinitas");
        const data = await res.json();
        setRoutines(data.routines || []);
        setLoading(false);
    };

    useEffect(() => {
        fetchRoutines();
    }, []);

    const handleSuccess = () => {
        setShowModal(false);
        fetchRoutines();
    };

    return (
        <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 py-10">
            <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-6 mb-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-purple-700">Daftar Rutinitas</h2>
                    <button
                        onClick={() => setShowModal(true)}
                        className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-semibold transition"
                    >
                        + Tambah Rutinitas
                    </button>
                </div>
                {loading ? (
                    <div className="text-center text-gray-500 py-8">Memuat rutinitas...</div>
                ) : routines.length === 0 ? (
                    <div className="text-center text-gray-500 py-8">Belum ada rutinitas.</div>
                ) : (
                    <ul className="divide-y">
                        {routines.map((routine) => (
                            <li key={routine.id} className="py-4 flex flex-col md:flex-row md:items-center md:justify-between">
                                <div>
                                    <div className="font-semibold text-lg text-purple-700">{routine.title}</div>
                                    <div className="text-sm text-gray-600">{routine.description}</div>
                                    <div className="text-xs text-gray-400 mt-1">
                                        Kategori: {routine.category} | Mood: {routine.mood} | Waktu: {routine.timeBlock}
                                    </div>
                                </div>
                                <div className="mt-2 md:mt-0">
                                    {routine.done ? (
                                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs">Selesai</span>
                                    ) : (
                                        <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs">Belum Selesai</span>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Modal CreateRoutine */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                    <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md relative">
                        <button
                            onClick={() => setShowModal(false)}
                            className="absolute top-2 right-3 text-gray-400 hover:text-gray-700 text-2xl font-bold"
                            aria-label="Tutup"
                        >
                            &times;
                        </button>
                        <CreateRoutine onSuccess={handleSuccess} />
                    </div>
                </div>
            )}
        </div>
    );
}