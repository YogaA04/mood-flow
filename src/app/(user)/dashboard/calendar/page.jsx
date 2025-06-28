"use client";

import { useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';

// Contoh data rutinitas
const routines = [
    { date: "2025-06-10", title: "Olahraga Pagi", description: "Jogging di taman selama 30 menit" },
    { date: "2025-06-10", title: "Meeting Tim", description: "Diskusi proyek jam 10 pagi" },
    { date: "2025-06-11", title: "Belajar React", description: "Mempelajari hooks dan context" },
    { date: "2025-06-12", title: "Baca Buku", description: "Membaca 1 bab buku pengembangan diri" },
];

function getRoutinesByDate(date) {
    const dateStr = date.toISOString().split('T')[0];
    return routines.filter(r => r.date === dateStr);
}

function hasRoutine(date) {
    const dateStr = date.toISOString().split('T')[0];
    return routines.some(r => r.date === dateStr);
}

export default function CalendarPage() {
    const [value, setValue] = useState(new Date());
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
                        // Format: 29 May 2025
                        const options = { day: '2-digit', month: 'short', year: 'numeric' };
                        const localeDate = date.toLocaleDateString('en-GB', options);
                        // en-GB returns "29 May 2025"
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
                {selectedRoutines.length > 0 ? (
                    <ul className="space-y-4">
                        {selectedRoutines.map((routine, idx) => (
                            <li key={idx} className="bg-white border border-purple-100 rounded-lg p-4 shadow">
                                <div className="font-bold text-purple-800">{routine.title}</div>
                                <div className="text-gray-600">{routine.description}</div>
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
