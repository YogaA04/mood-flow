"use client";

import { useState } from "react";

export default function MyDayPage() {
    const today = new Date().toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
    const [todos, setTodos] = useState([
        { id: 1, text: "Bangun pagi", done: false },
        { id: 2, text: "Olahraga 15 menit", done: true },
        { id: 3, text: "Sarapan sehat", done: false },
    ]);
    const [input, setInput] = useState("");

    const addTodo = (e) => {
        e.preventDefault();
        if (!input.trim()) return;
        setTodos([...todos, { id: Date.now(), text: input, done: false }]);
        setInput("");
    };

    const toggleTodo = (id) => {
        setTodos(todos.map(todo => todo.id === id ? { ...todo, done: !todo.done } : todo));
    };

    const removeTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    return (
        <div className=" p-6 min-h-screen w-full">
            <h1 className="text-3xl font-bold text-[#2564cf] mb-1">My Day</h1>
            <p className="text-gray-500 mb-6">{today}</p>
            <form onSubmit={addTodo} className="flex gap-2 mb-6">
                <input
                    type="text"
                    className="flex-1 border border-[#d2e3fc] rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#2564cf] bg-white"
                    placeholder="Tambah aktivitas hari ini..."
                    value={input}
                    onChange={e => setInput(e.target.value)}
                />
                <button type="submit" className="bg-[#2564cf] text-white px-4 py-2 rounded-full font-semibold hover:bg-[#1b4fa0] transition">Tambah</button>
            </form>
            <ul className="space-y-2">
                {todos.map(todo => (
                    <li
                        key={todo.id}
                        className={`flex items-center bg-white rounded-full shadow-sm px-4 py-3 transition group hover:shadow-md hover:bg-[#e8f0fe] ${todo.done ? 'opacity-60' : ''}`}
                    >
                        <label className="flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={todo.done}
                                onChange={() => toggleTodo(todo.id)}
                                className="appearance-none w-6 h-6 border-2 border-[#2564cf] rounded-full checked:bg-[#2564cf] checked:border-[#2564cf] mr-3 flex-shrink-0 transition-all duration-150"
                                style={{
                                    boxShadow: todo.done ? "0 0 0 4px #d2e3fc" : "none"
                                }}
                            />
                            <span className={`flex-1 text-lg select-none ${todo.done ? 'line-through text-gray-400' : 'text-gray-700'}`}>{todo.text}</span>
                        </label>
                        <button
                            onClick={() => removeTodo(todo.id)}
                            className="ml-3 text-gray-400 opacity-0 group-hover:opacity-100 hover:text-red-500 transition"
                            aria-label="Hapus"
                            tabIndex={-1}
                        >
                            <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" d="M6 6l8 8M14 6l-8 8"/>
                            </svg>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
