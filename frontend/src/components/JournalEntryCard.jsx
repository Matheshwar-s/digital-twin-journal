import React from "react";
import { FaTrash, FaEdit } from "react-icons/fa";

export default function JournalEntryCard({ entry, onEdit, onDelete }) {
  return (
    <div className="bg-white shadow-md rounded-xl p-6 mb-4 relative">
      <div className="absolute top-4 right-4 flex space-x-3">
        <button
          onClick={() => onEdit(entry)}
          className="text-blue-500 hover:text-blue-700"
        >
          <FaEdit />
        </button>
        <button
          onClick={() => onDelete(entry.id)}
          className="text-red-500 hover:text-red-700"
        >
          <FaTrash />
        </button>
      </div>

      <h3 className="text-xl font-semibold mb-2">{entry.title}</h3>
      <p className="text-gray-700 whitespace-pre-wrap">{entry.content}</p>
      <div className="mt-4 text-sm text-gray-500">
        {new Date(entry.date).toLocaleDateString()} | Mood: {entry.mood || "🙂"}
      </div>

      {entry.reflection && (
        <div className="mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 rounded-lg">
          <p className="text-sm italic">
            🧠 <strong>Past You Reflects:</strong> {entry.reflection}
          </p>
        </div>
      )}
    </div>
  );
}
