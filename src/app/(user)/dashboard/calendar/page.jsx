"use client";

import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';

export default function CalendarPage() {
    const [value, setValue] = useState(new Date());
    const [routines, setRoutines] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRoutines = async () => {
            setLoading(true);
            try {
                const res = await fetch('/api/graphql', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        query: `
                            query {
                                myDayRoutines {
                                    date
                                    description
                                    id
                                    isChecked
                                    routine {
                                        moodBox { mood }
                                        title
                                        category
                                    }
                                }
                            }
                        `
                    })
                });
                const { data } = await res.json();
                setRoutines(data?.myDayRoutines || []);
            } catch (err) {
                setRoutines([]);
            }
            setLoading(false);
        };
        fetchRoutines();
    }, []);

    function getRoutinesByDate(date) {
        const selectedTime = new Date(date).setHours(0, 0, 0, 0);
        return routines.filter(r => {
            const routineDate = new Date(Number(r.date)).setHours(0, 0, 0, 0);
            return routineDate === selectedTime;
        });
    }

    function hasRoutine(date) {
        const selectedTime = new Date(date).setHours(0, 0, 0, 0);
        return routines.some(r => {
            const routineDate = new Date(Number(r.date)).setHours(0, 0, 0, 0);
            return routineDate === selectedTime;
        });
    }

    const selectedRoutines = getRoutinesByDate(value);

    return (
        <div className="max-w-2xl mx-auto p-8">
            <h1 className="text-3xl font-bold text-center text-purple-700 mb-6">Kalender Aktivitas</h1>
            <div className="bg-gradient-to-br from-purple-100 to-pink-100 border border-purple-200 rounded-2xl shadow-lg p-6">
                <Calendar
                    onChange={setValue}
                    value={value}
                    className="w-full border-0 bg-transparent custom-calendar"
                    tileClassName={({ date }) =>
                        date.toDateString() === new Date().toDateString()
                            ? 'bg-purple-500 text-white rounded-full' : ''
                    }
                    prev2Label={null}
                    next2Label={null}
                    formatAriaLabel={({ date }) => {
                        const options = { day: '2-digit', month: 'short', year: 'numeric' };
                        const localeDate = date.toLocaleDateString('en-GB', options);
                        return localeDate;
                    }}
                    tileContent={({ date, view }) =>
                        view === 'month' && hasRoutine(date) ? (
                            <span className="block w-full flex justify-center mt-1">
                                <span className="inline-block w-2 h-2 rounded-full bg-blue-500"></span>
                            </span>
                        ) : null
                    }
                />
            </div>
            <div className="mt-8">
                <h2 className="text-xl font-semibold text-purple-700 mb-4 text-center">
                    Rutinitas pada {value.toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
                </h2>
                {loading ? (
                    <div className="text-gray-500 text-center">Memuat rutinitas...</div>
                ) : selectedRoutines.length > 0 ? (
                    <ul className="space-y-4">
                        {selectedRoutines.map((routine) => (
                            <li key={routine.id} className="bg-white border border-purple-100 rounded-lg p-4 shadow">
                                <div className="font-bold text-purple-800">{routine.routine.title}</div>
                                <div className="text-gray-600">{routine.description}</div>
                                <div className="text-xs text-gray-400 mt-1 w-full flex justify-between">
                                    Kategori: <span className="font-semibold text-purple-500">{routine.routine.category}</span>
                                    {" | "}
                                    Mood: <span className="font-semibold text-blue-500">{routine.routine.moodBox.mood}</span>

                                    <span
                                        className={`text-right ${routine.isChecked
                                            ? "text-gray-400"
                                            : "text-red-500"
                                            }`}
                                    >
                                        {routine.isChecked ? "Selesai" : "Belum Selesai"}
                                    </span>
                                </div>

                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="text-gray-500 text-center">Tidak ada rutinitas pada tanggal ini.</div>
                )}
            </div>
            <style jsx global>{`
                .custom-calendar .react-calendar__tile--active {
                    background: linear-gradient(to right, #a78bfa, #f472b6) !important;
                    color: white !important;
                    border-radius: 9999px;
                }
                .custom-calendar .react-calendar__tile--now {
                    background: #a78bfa !important;
                    color: white !important;
                    border-radius: 9999px;
                }
                .custom-calendar .react-calendar__tile {
                    border-radius: 9999px;
                    transition: background 0.2s;
                }
                .custom-calendar .react-calendar__tile:enabled:hover {
                    background: #f3e8ff !important;
                    color: #a21caf !important;
                }
                .custom-calendar .react-calendar__navigation button {
                    color: #a21caf;
                    font-weight: bold;
                }
            `}</style>
        </div>
    );
}
