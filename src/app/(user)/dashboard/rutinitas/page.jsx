'use client';

import { useState } from "react";
import CreateRoutine from '@/components/ui/routine/CreateRoutine';
import { FiArrowLeft, FiPlus } from "react-icons/fi";
import CardRoutine from "@/components/ui/routine/CardRoutine";

export default function RoutinePage() {
    const [showModal, setShowModal] = useState(false);

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

                {/* Routine List */}
                <CardRoutine /> 

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
        </>
    );
}