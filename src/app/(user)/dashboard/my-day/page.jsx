"use client";

import CardMyDay from "@/components/ui/myDay/CardMyDay";
import CreateRoutine from "@/components/ui/routine/CreateRoutine";
import { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";

export default function MyDayPage() {

    const [showModal, setShowModal] = useState(false);
    const [today, setToday] = useState("");
    useEffect(() => {
        const now = new Date().toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
        setToday(now);
    }, []);

    const handleSuccess = () => {
        setShowModal(false);
    };

    return (
        <div className=" p-6 min-h-screen w-full">
            {/* Subheader & Add Button */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-[#2564cf] mb-1">My Day</h1>
                    <p className="text-gray-500 mb-6">{today}</p>
                </div>
                <button
                    onClick={() => setShowModal(true)}
                    className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white px-4 py-2 rounded-xl font-semibold shadow-lg transition-all duration-200 active:scale-95"
                >
                    <FiPlus className="text-lg" />
                    <span className="hidden sm:inline">Tambah Rutinitas</span>
                </button>
            </div>

            {/* Routine List */}
            <CardMyDay checked={false} date={new Date().toISOString().split("T")[0]} />

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
        </div>
    );
}
