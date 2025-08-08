import React, { useState, useEffect } from "react";

const emojiOptions = ["👤", "🤖", "👽", "🧙‍♂️", "👻", "🧞‍♂️"];
const voiceTones = ["funny", "wise", "sarcastic", "gentle"];

export default function AvatarSettingsModal({ isOpen, onClose }) {
  const [emoji, setEmoji] = useState("👤");
  const [tone, setTone] = useState("gentle");

  useEffect(() => {
    const savedEmoji = localStorage.getItem("avatarEmoji");
    const savedTone = localStorage.getItem("avatarTone");
    if (savedEmoji) setEmoji(savedEmoji);
    if (savedTone) setTone(savedTone);
  }, []);

  const saveSettings = () => {
    localStorage.setItem("avatarEmoji", emoji);
    localStorage.setItem("avatarTone", tone);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md space-y-6 animate-fade-in">
        <h2 className="text-2xl font-bold text-center">🧬 Customize Your Twin</h2>

        <div>
          <label className="block font-medium mb-2 text-gray-700">Choose Avatar Emoji</label>
          <div className="flex gap-3 flex-wrap">
            {emojiOptions.map((e) => (
              <button
                key={e}
                className={`text-3xl px-3 py-2 rounded-xl transition border-2 ${
                  emoji === e ? "border-purple-500 bg-purple-100" : "border-transparent"
                }`}
                onClick={() => setEmoji(e)}
              >
                {e}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block font-medium mb-2 text-gray-700">Select Voice Tone</label>
          <select
            value={tone}
            onChange={(e) => setTone(e.target.value)}
            className="w-full p-2 border rounded-lg"
          >
            {voiceTones.map((toneOption) => (
              <option key={toneOption} value={toneOption}>
                {toneOption.charAt(0).toUpperCase() + toneOption.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={saveSettings}
            className="px-4 py-2 rounded-lg bg-indigo-500 text-white hover:bg-indigo-600"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
