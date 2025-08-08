import { useState } from "react";
import axios from "../api/axios";
import { motion } from "framer-motion";
import Sidebar from "../components/Sidebar";

export default function PastYouChat() {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const username = localStorage.getItem("username");
  const avatarEmoji = localStorage.getItem("avatarEmoji") || "👤";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    const userMessage = { sender: "you", text: prompt };
    setMessages((prev) => [...prev, userMessage]);
    setPrompt("");
    setLoading(true);

    try {
      const res = await axios.post("/twin/chat", { username, prompt });
      const ghostMessage = { sender: "ghost", text: res.data.reply };
      setMessages((prev) => [...prev, ghostMessage]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { sender: "ghost", text: "👻 Hmm... something went wrong." },
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Sidebar */}
      <div className="w-64 bg-white shadow-md z-10">
        <Sidebar />
      </div>

      {/* Right Main Content */}
      <div className="flex-1 bg-gradient-to-b from-indigo-50 to-white p-8 relative">
        {/* Floating Ghost Avatar */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute top-4 right-8 text-5xl"
        >
          {avatarEmoji}
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-6 text-center text-indigo-700">
            💬 Chat with Past You
          </h1>

          {/* Chat Box */}
          <div className="bg-white shadow-md rounded-lg p-6 h-[400px] overflow-y-auto space-y-4 border border-gray-200">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.sender === "you" ? "justify-end" : "justify-start"
                }`}
              >
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`max-w-xs px-4 py-2 rounded-xl text-sm shadow-md ${
                    msg.sender === "you"
                      ? "bg-indigo-100 text-right"
                      : "bg-gray-100"
                  }`}
                >
                  {msg.text}
                </motion.div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-300 text-sm px-4 py-2 rounded-lg animate-pulse">
                  Typing...
                </div>
              </div>
            )}
          </div>

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="mt-6 flex gap-3 items-center">
            <textarea
              className="flex-1 p-4 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400"
              rows={2}
              placeholder="Ask your past self something..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-md transition-all"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
