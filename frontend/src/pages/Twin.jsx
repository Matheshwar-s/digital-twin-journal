import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";

export default function Twin() {
  const [summary, setSummary] = useState("Loading...");
  const [ghostMessage, setGhostMessage] = useState("");

  useEffect(() => {
    async function fetchTwinReflection() {
      try {
        const username = localStorage.getItem("username");
        const res = await axios.get(`http://localhost:8080/api/twin/${username}`);
        setSummary(res.data.summary);
        setGhostMessage(res.data.message);
      } catch (err) {
        setSummary("Could not load reflection.");
        setGhostMessage("Past you is silent today...");
        console.error(err);
      }
    }

    fetchTwinReflection();
  }, []);

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-[#e0e7ff] via-[#f0e8ff] to-[#fdf4ff]">
      {/* Sidebar Fixed on Left */}
      <div className="w-64 sticky top-0 h-screen shadow-xl bg-white z-10">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10 space-y-12 overflow-auto">
        {/* Heading */}
        <h1 className="text-4xl font-extrabold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
          🧬 Your Digital Twin Journal
        </h1>

        {/* AI Summary Card */}
        <section className="backdrop-blur-lg bg-white/60 border border-white/30 shadow-2xl rounded-3xl p-8 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-indigo-800 mb-4">
            🧠 Mindset Summary
          </h2>
          <p className="text-gray-800 leading-relaxed whitespace-pre-line text-lg">
            {summary}
          </p>
        </section>

        {/* Ghost Avatar Reflection */}
        <section className="relative max-w-3xl mx-auto bg-gradient-to-r from-purple-100 to-pink-100 p-10 rounded-3xl shadow-2xl overflow-hidden h-72">
          <h2 className="text-2xl font-bold text-purple-900 mb-4">
            👻 Past You Reflects
          </h2>

          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-float text-center">
            <div className="text-5xl animate-pulse drop-shadow-xl">👤</div>
            <p className="italic mt-4 text-lg text-gray-800 max-w-md mx-auto px-4">
              {ghostMessage}
            </p>
          </div>

          {/* Sparkle particles */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
            <div className="w-2 h-2 bg-white rounded-full absolute top-10 left-12 animate-ping" />
            <div className="w-1.5 h-1.5 bg-pink-300 rounded-full absolute bottom-12 right-16 animate-ping delay-200" />
            <div className="w-2 h-2 bg-purple-400 rounded-full absolute top-1/3 right-1/3 animate-ping delay-500" />
          </div>
        </section>
      </div>
    </div>
  );
}
