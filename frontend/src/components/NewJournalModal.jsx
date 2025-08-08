import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import axios from "../api/axios";

export default function NewJournalModal({ isOpen, onClose, onEntryAdded, entryToEdit = null }) {

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [mood, setMood] = useState("🙂");
  const username = localStorage.getItem("username");
  const emojiToEnum = {
  "🙂": "HAPPY",
  "😔": "SAD",
  "😠": "ANGRY",
  "😌": "NEUTRAL",
  "🤯": "ANXIOUS"
};

const enumToEmoji = {
  "HAPPY": "🙂",
  "SAD": "😔",
  "ANGRY": "😠",
  "NEUTRAL": "😌",
  "ANXIOUS": "🤯"
};


  useEffect(() => {
    if (entryToEdit) {
  setTitle(entryToEdit.title || "");
  setContent(entryToEdit.content || "");
  setMood(enumToEmoji[entryToEdit.mood] || "🙂");
} else {
      setTitle("");
      setContent("");
      setMood("🙂");
    }
  }, [entryToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { title, content, mood: emojiToEnum[mood] || "NEUTRAL" };

    try {
      if (entryToEdit) {
        // Update existing
        const res = await axios.put(`/journals/${username}/${entryToEdit.id}`, data,);
        onEntryAdded(res.data);
      } else {
        // Create new
        const res = await axios.post(`/journals/${username}`, data,);
        onEntryAdded(res.data);
      }
      onClose();
    } catch (err) {
      console.error("Save failed:", err);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="max-w-lg mx-auto mt-20 bg-white p-8 rounded-2xl shadow-xl outline-none"
      overlayClassName="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-start"
    >
      <h2 className="text-2xl font-bold mb-4">
        {entryToEdit ? "✏️ Edit Entry" : "📝 New Journal Entry"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full px-4 py-2 border rounded-xl"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="w-full px-4 py-2 border rounded-xl min-h-[120px]"
          placeholder="Write your thoughts..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <select
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          className="w-full px-4 py-2 border rounded-xl"
        >
          <option value="🙂">🙂 Happy</option>
          <option value="😔">😔 Sad</option>
          <option value="😠">😠 Angry</option>
          <option value="😌">😌 Calm</option>
          <option value="🤯">🤯 Stressed</option>
        </select>

        <div className="flex justify-end gap-4 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded-xl"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700"
          >
            {entryToEdit ? "Update" : "Create"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
