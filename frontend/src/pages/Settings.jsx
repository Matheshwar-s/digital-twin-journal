import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AvatarSettingsModal from "../components/AvatarSettingsModal";

export default function Settings() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const emoji = localStorage.getItem("avatarEmoji") || "👤";
  const tone = localStorage.getItem("avatarTone") || "gentle";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-md w-full space-y-6 border border-indigo-200">
        {/* Back Button */}
        <button
          onClick={() => navigate("/dashboard")}
          className="text-sm text-indigo-600 hover:underline flex items-center gap-1"
        >
          ← Back to Dashboard
        </button>

        {/* Title */}
        <h1 className="text-3xl font-bold text-center text-indigo-800">Avatar Settings</h1>

        {/* Avatar Display */}
        <div className="flex flex-col items-center gap-2">
          <div className="text-6xl">{emoji}</div>
          <div className="text-gray-600 text-lg">
            <span className="font-medium">Voice Tone:</span>{" "}
            <span className="capitalize">{tone}</span>
          </div>
        </div>

        {/* Customize Button */}
        <div className="flex justify-center">
          <button
            onClick={() => setOpen(true)}
            className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all"
          >
            Customize Avatar
          </button>
        </div>
      </div>

      {/* Modal */}
      <AvatarSettingsModal isOpen={open} onClose={() => setOpen(false)} />
    </div>
  );
}
