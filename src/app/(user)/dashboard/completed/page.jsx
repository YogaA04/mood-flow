import React from "react";

// Contoh data todo yang sudah selesai
const completedTodos = [
    { id: 1, text: "Menyelesaikan tugas React", completedAt: "2024-06-10" },
    { id: 2, text: "Olahraga pagi", completedAt: "2024-06-09" },
    { id: 3, text: "Membaca buku 1 bab", completedAt: "2024-06-08" },
];

export default function CompletedTodoList() {
    return (
        <div className="p-6 mt-10 w-full">
            <h2 className="text-3xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-pink-500 drop-shadow mb-4">
                Tugas Selesai
            </h2>
            {completedTodos.length === 0 ? (
                <p className="text-center text-gray-500">
                    Belum ada tugas yang selesai.
                </p>
            ) : (
                <ul className="space-y-3">
                    {completedTodos.map((todo) => (
                        <li
                            key={todo.id}
                            className="flex items-center justify-between bg-white/80 border border-purple-100 rounded-xl px-5 py-3 shadow group hover:scale-[1.02] transition"
                        >
                            <span className="line-through text-lg text-gray-700 group-hover:text-pink-600 transition-colors">
                                {todo.text}
                            </span>
                            <span className="text-xs text-purple-600 font-semibold">
                                Selesai: {todo.completedAt}
                            </span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}