'use client';

import { useState, useEffect } from "react";
import FormPrimary from "@/components/utilities/form/FormPrimary";
import EmojiPicker from 'emoji-picker-react';

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
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  // Ambil mood yang sudah ada dari API
  useEffect(() => {
    fetch("/api/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
          query {
            moodBoxes {
              id
              mood
            }
          }
        `
      })
    })
      .then(res => res.json())
      .then(data => setMoodBoxes(data.data.moodBoxes || []));
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

    const moodToSend = useCustomMood ? form.moodInput : form.mood;

    const res = await fetch("/api/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
          mutation CreateRoutine($title: String!, $category: String!, $mood: String!,) {
            createRoutine(
              title: $title
              category: $category
              mood: $mood
            ) {
              id
              title
            }
          }
        `,
        variables: {
          title: form.title,
          category: form.category,
          mood: moodToSend,
        }
      })
    });

    const data = await res.json();
    setPending(false);

    if (data.errors) {
      setError(data.errors[0].message || "Gagal membuat rutinitas.");
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
          <div className="relative flex items-center mt-2">
            <input
              type="text"
              name="moodInput"
              value={form.moodInput}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="Masukkan mood baru"
              required
            />
            <button
              type="button"
              className="ml-2 px-2 py-1 rounded-lg bg-purple-100 hover:bg-purple-200 text-xl"
              onClick={() => setShowEmojiPicker((v) => !v)}
              tabIndex={-1}
            >
              😊
            </button>
            {showEmojiPicker && (
              <div className="fixed z-50">
                <EmojiPicker
                  onEmojiClick={(emojiObject) => {
                    setForm({ ...form, moodInput: form.moodInput + emojiObject.emoji });
                    setShowEmojiPicker(false);
                  }}
                  theme="light"
                />
              </div>
            )}
          </div>
        )}
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