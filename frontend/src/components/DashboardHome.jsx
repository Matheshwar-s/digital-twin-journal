import { useEffect, useState } from "react";
import axios from "../api/axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function DashboardHome() {
  const [ghostMessage, setGhostMessage] = useState("");
  const [adviceSummary, setAdviceSummary] = useState("");
  const username = localStorage.getItem("username");
  const avatarEmoji = localStorage.getItem("avatarEmoji") || "👻";
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTwinMessage = async () => {
      try {
        const res = await axios.get(`/twin/${username}`);
        setGhostMessage(res.data.message);
        setAdviceSummary(res.data.summary);
      } catch (err) {
        setGhostMessage("I'm still thinking... try again later.");
        setAdviceSummary("Advice will appear once you have some journal entries.");
      }
    };

    fetchTwinMessage();
  }, [username]);

  return (
    <div className="w-full px-10 py-8">
      <h2 className="text-3xl font-semibold mb-6 text-indigo-800">
        Welcome back, {username}!
      </h2>

      {/* Journal Prompt Card */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-200">
        <h3 className="text-xl font-semibold mb-2 text-indigo-700">
          📝 Today’s Journal Prompt
        </h3>
        <p className="text-gray-700">
          "If you could tell your past self one thing, what would it be?"
        </p>
        <button
          className="mt-4 px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all"
          onClick={() => navigate("/dashboard/journals")}
        >
          Write Entry
        </button>
      </div>

      {/* Twin Message Card */}
      <div className="bg-white rounded-xl shadow-lg p-6 flex items-start gap-4 border border-indigo-100 mb-8">
        {/* Floating Avatar */}
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-5xl"
        >
          {avatarEmoji}
        </motion.div>

        {/* Twin Message */}
        <div>
          <h3 className="text-xl font-semibold mb-2 text-indigo-700">
            🧠 Your Digital Twin says
          </h3>
          <p className="text-gray-800 italic text-lg leading-relaxed">
            “{ghostMessage}”
          </p>
        </div>
      </div>

      {/* Advice from your Past */}
      <div className="bg-indigo-50 border-l-4 border-indigo-500 p-6 rounded-xl shadow-inner">
        <h3 className="text-lg font-semibold mb-2 text-indigo-700">
          💡 Advice from your Past Journals
        </h3>
        <p className="text-gray-800 leading-relaxed">
          {adviceSummary}
        </p>
      </div>
    </div>
  );
}
