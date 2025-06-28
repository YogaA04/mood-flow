'use client';

import { useEffect, useState } from "react";
import CreateRoutine from '@/components/ui/routine/CreateRoutine';
import { FiArrowLeft, FiPlus } from "react-icons/fi";

export default function RoutinePage() {
    const [routines, setRoutines] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);

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
        <>
            <div className="w-full p-6">

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
                        Rutinitas Harian
                    </h1>
                    <div className="w-24" /> {/* Spacer */}
                </div>

                {/* Subheader & Add Button */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-purple-700">Daftar Rutinitas</h2>
                    <button
                        onClick={() => setShowModal(true)}
                        className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white px-4 py-2 rounded-xl font-semibold shadow-lg transition-all duration-200 active:scale-95"
                    >
                        <FiPlus className="text-lg" />
                        <span className="hidden sm:inline">Tambah Rutinitas</span>
                    </button>
                </div>

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

            {/* Modal CreateRoutine */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative border border-purple-200 animate-fadeIn">
                        <button
                            onClick={() => setShowModal(false)}
                            className="absolute top-3 right-4 text-gray-400 hover:text-purple-700 text-3xl font-bold transition"
                            aria-label="Tutup"
                        >
                            &times;
                        </button>
                        <CreateRoutine onSuccess={handleSuccess} />
                    </div>
                </div>
            )}

            {/* Animasi modal */}
            <style jsx global>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(40px);}
                    to { opacity: 1; transform: translateY(0);}
                }
                .animate-fadeIn {
                    animation: fadeIn 0.3s ease;
                }
            `}</style>
        </>
    );
}