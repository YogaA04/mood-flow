"use client"

import Link from "next/link"
import { FaUserCircle, FaSignOutAlt, FaHome, FaListUl, FaStar, FaSun, FaCheckCircle, FaCalendarAlt   } from "react-icons/fa"

export default function NavDasboard({ user }) {
    return (
        <nav className="min-h-screen bg-gradient-to-b from-purple-200 to-pink-100 flex flex-col w-60 p-6 rounded-r shadow-xl justify-between">
            {/* Top Section: User Info */}
            <div className="">
                <div className="flex items-center gap-3 mb-8">
                    <div className="bg-white p-1 rounded-full shadow-md">
                        <FaUserCircle className="text-5xl text-purple-600" />
                    </div>
                    <div>
                        <h1 className="text-lg font-bold leading-tight">Hi, {user.name}</h1>
                        <span className="text-xs">Selamat Siang</span>
                    </div>
                </div>
                {/* Main Navigation */}
                <ul className="space-y-2 mb-8 border-y border-purple-300 pb-6">
                    <li>
                        <Link href="/dashboard/my-day" className="flex items-center gap-3 px-4 py-2 rounded-lg  hover:bg-purple-100 transition font-medium">
                            <FaSun /> My Day
                        </Link>
                    </li>
                    <li>
                        <Link href="/dashboard" className="flex items-center gap-3 px-4 py-2 rounded-lg  hover:bg-purple-100 transition font-medium">
                            <FaHome /> Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link href="/dashboard/rutinitas" className="flex items-center gap-3 px-4 py-2 rounded-lg  hover:bg-purple-100 transition font-medium">
                            <FaListUl /> Rutinitas
                        </Link>
                    </li>
                    <li>
                        <Link href="/dashboard/completed" className="flex items-center gap-3 px-4 py-2 rounded-lg  hover:bg-purple-100 transition font-medium">
                            <FaCheckCircle /> Selesai
                        </Link>
                    </li>
                    <li>
                        <Link href="/dashboard/calendar" className="flex items-center gap-3 px-4 py-2 rounded-lg  hover:bg-purple-100 transition font-medium">
                            <FaCalendarAlt /> Kalender
                        </Link>
                    </li>
                    <li>
                        <Link href="/dashboard/moodcheck" className="flex items-center gap-3 px-4 py-2 rounded-lg  hover:bg-purple-100 transition font-medium">
                            <FaStar /> Mood Check
                        </Link>
                    </li>
                </ul>
                
                {/* Fokus Minggu Ini Section */}
                <div className="mb-6">
                    <h2 className="text-sm font-semibold mb-2">Fokus Minggu Ini</h2>
                    <ul className="space-y-1 pl-2">
                        <li className="bg-white/20 rounded px-3 py-1  text-xs">Belajar React</li>
                        <li className="bg-white/20 rounded px-3 py-1  text-xs">Meditasi</li>
                    </ul>
                </div>
                {/* Project Section */}
                <div>
                    <h2 className="text-sm font-semibold mb-2">Proyek</h2>
                    <ul className="space-y-1 pl-2">
                        <li className="bg-white/20 rounded px-3 py-1  text-xs">Mood Flow</li>
                        <li className="bg-white/20 rounded px-3 py-1  text-xs">e-comers</li>
                    </ul>
                </div>
            </div>
            {/* Bottom Section: Logout */}
            <div className="mb-2">
                <button className="flex items-center gap-2 w-full px-4 py-2 rounded-lg bg-white text-purple-700 font-semibold shadow hover:bg-purple-100 transition">
                    <FaSignOutAlt /> Logout
                </button>
            </div>
        </nav>
    )
}