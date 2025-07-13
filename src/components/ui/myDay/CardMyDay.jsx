'use client'

import { useEffect, useState } from "react";


export default function CardMyDay({checked}) {
    const [myDay, setMyDay] = useState([]);
    const [loading, setLoading] = useState(true);
    const [notif, setNotif] = useState(null);

    const fetchMyDay = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/graphql', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    query: `
                        query {
                            myDayRoutines(isChecked: ${checked})  {
                                id
                                routine {
                                    id
                                    title
                                    category
                                    moodBox {
                                        mood
                                    }
                                }
                                isChecked
                                date
                                description
                            }
                        }`
                })
            });
            const { data } = await res.json();
            setMyDay(data.myDayRoutines || []);
        } catch (err) {
            setNotif('Gagal memuat rutinitas MyDay');
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchMyDay();
    }, []);

    // Fungsi untuk menandai rutinitas MyDay sebagai checked
    const checkMyDayRoutine = async (routineId) => {
        try {
            const res = await fetch('/api/graphql', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    query: `
                        mutation($id: String!) {
                            checkMyDayRoutine(id: $id) {
                                id
                                isChecked
                            }
                        }`,
                    variables: { id: routineId }
                })
            });
            const { data, errors } = await res.json();
            if (errors) {
                setNotif('Gagal menandai rutinitas');
                return;
            }
            setMyDay(prev =>
                prev.map(r =>
                    r.id === routineId ? { ...r, isChecked: true } : r
                )
            );
            setNotif('Rutinitas sudah diceklis!');
        } catch (err) {
            setNotif('Gagal menandai rutinitas');
        }
        setTimeout(() => setNotif(null), 2000);
    };

    return (
        <>
            {notif && (
                <div className="fixed top-4 right-4 bg-purple-600 text-white px-4 py-2 rounded shadow z-50">
                    {notif}
                </div>
            )}
            {loading ? (
                <div className="flex flex-col items-center py-12">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-purple-500 mb-4"></div>
                    <div className="text-center text-gray-500">Memuat rutinitas MyDay...</div>
                </div>
            ) : myDay.length === 0 ? (
                <div className="text-center text-gray-400 py-12 italic">Belum ada rutinitas MyDay.</div>
            ) : (
                <ul>
                    {myDay.map((routine) => (
                        <li
                            key={routine.id}
                            className="group py-5 flex flex-col md:flex-row md:items-center md:justify-between bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl shadow-md mb-5 px-5 md:px-8 border border-purple-100 hover:shadow-xl hover:scale-[1.02] transition-all duration-200"
                        >
                            <div>
                                <div className="font-bold text-lg text-purple-800 group-hover:text-blue-700 transition">{routine.routine.title}</div>
                                <div className="text-xs text-gray-400 mt-1">
                                    <span className="mr-2">Kategori: <span className="font-semibold text-purple-500">{routine.routine.category}</span></span>
                                    <span className="mr-2">Mood: <span className="font-semibold text-blue-500">{routine.routine.moodBox?.mood || '-'}</span></span>
                                    <span className="ml-2">Tanggal: <span className="font-semibold text-gray-500">{new Date(Number(routine.date)).toLocaleDateString()}</span></span>
                                </div>
                                <div className="text-xs text-gray-500 mt-1">Deskripsi: {routine.description || '-'}</div>
                            </div>
                            <div className="mt-3 md:mt-0 flex items-center gap-2">
                                <button
                                    className={`px-4 py-2 rounded-lg transition ${
                                        routine.isChecked
                                            ? "bg-gray-400 text-white cursor-not-allowed"
                                            : "bg-purple-600 text-white hover:bg-purple-700"
                                    }`}
                                    disabled={routine.isChecked}
                                    onClick={() => !routine.isChecked && checkMyDayRoutine(routine.id)}
                                >
                                    {routine.isChecked ? "Sudah Diceklis" : "Ceklis"}
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </>
    )
}