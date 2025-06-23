'use client';

import { useState, useEffect } from "react";
import FormPrimary from "@/components/utilities/form/FormPrimary";

const initialState = {
  title: "",
  description: "",
  category: "",
  mood: "",
  timeBlock: "",
  moodInput: "", // untuk input mood baru
};

export default function CreateRoutine({ onSuccess }) {
  const [form, setForm] = useState(initialState);
  const [error, setError] = useState(null);
  const [pending, setPending] = useState(false);
  const [moodBoxes, setMoodBoxes] = useState([]);
  const [useCustomMood, setUseCustomMood] = useState(false);

  // Ambil mood yang sudah ada dari API
  useEffect(() => {
    fetch("/api/mood_box")
      .then((res) => res.json())
      .then((data) => setMoodBoxes(data.moodBoxes || []));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleMoodChange = (e) => {
    if (e.target.value === "__custom__") {
      setUseCustomMood(true);
      setForm({ ...form, mood: "", moodInput: "" });
    } else {
      setUseCustomMood(false);
      setForm({ ...form, mood: e.target.value, moodInput: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setPending(true);

    // Gunakan mood baru jika user input manual
    const moodToSend = useCustomMood ? form.moodInput : form.mood;

    const res = await fetch("/api/rutinitas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, mood: moodToSend }),
    });

    const data = await res.json();
    setPending(false);

    if (!res.ok) {
      setError(data.error || "Gagal membuat rutinitas.");
    } else {
      setForm(initialState);
      setUseCustomMood(false);
      if (onSuccess) onSuccess();
    }
  };

  return (
    <FormPrimary onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold text-purple-700 text-center mb-2">Buat Rutinitas Baru</h2>
      {error && <div className="text-red-500 text-sm text-center">{error}</div>}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Judul</label>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
          rows={2}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
        <input
          type="text"
          name="category"
          value={form.category}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Mood</label>
        <select
          name="mood"
          value={useCustomMood ? "__custom__" : form.mood}
          onChange={handleMoodChange}
          className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
          required={!useCustomMood}
        >
          <option value="">Pilih mood</option>
          {moodBoxes.map((mb) => (
            <option key={mb.id} value={mb.mood}>
              {mb.mood}
            </option>
          ))}
          <option value="__custom__">+ Mood baru...</option>
        </select>
        {useCustomMood && (
          <input
            type="text"
            name="moodInput"
            value={form.moodInput}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 mt-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
            placeholder="Masukkan mood baru"
            required
          />
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Waktu (Time Block)</label>
        <input
          type="text"
          name="timeBlock"
          value={form.timeBlock}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
          placeholder="Contoh: Pagi, Siang, Malam"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-lg transition"
        disabled={pending}
      >
        {pending ? "Menyimpan..." : "Simpan Rutinitas"}
      </button>
    </FormPrimary>
  );
}