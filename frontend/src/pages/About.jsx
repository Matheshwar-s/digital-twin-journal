import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="pt-24 px-6 pb-20 bg-gradient-to-b from-purple-100 via-pink-50 to-blue-50 min-h-screen text-gray-800">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h1
          className="text-4xl md:text-5xl font-extrabold mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          About the <span className="text-purple-600">Digital Twin Journal</span>
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-gray-700 mb-12 max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          A unique journaling experience where your thoughts evolve into a reflective version of your past self — capable of offering insights, reminders, and emotional support.
        </motion.p>

        <div className="grid md:grid-cols-2 gap-10 text-left">
          {/* Feature 1 */}
          <motion.div
            className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition"
            whileHover={{ scale: 1.02 }}
          >
            <h2 className="text-2xl font-bold text-purple-700 mb-2">📔 Daily Journaling</h2>
            <p>
              Write your thoughts, moods, and moments. Our AI analyzes and learns from your entries to build a digital twin of your emotional journey.
            </p>
            <p className="mt-2 text-sm italic text-gray-500">
              e.g., "I feel stuck today..." ➝ becomes a learning moment for your twin.
            </p>
          </motion.div>

          {/* Feature 2 */}
          <motion.div
            className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition"
            whileHover={{ scale: 1.02 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold text-pink-600 mb-2">🧠 Digital Twin Responses</h2>
            <p>
              Your past self writes back. Get reflective prompts, insights, and advice as if your wiser self is journaling *to you*.
            </p>
            <p className="mt-2 text-sm italic text-gray-500">
              e.g., "Remember how we overcame fear last year? You’ve done harder things!"
            </p>
          </motion.div>

          {/* Feature 3 */}
          <motion.div
            className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition"
            whileHover={{ scale: 1.02 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-2xl font-bold text-blue-600 mb-2">📅 Memory Timeline</h2>
            <p>
              Visualize and revisit your emotional patterns over weeks and months. Understand how you've grown.
            </p>
            <p className="mt-2 text-sm italic text-gray-500">
              e.g., See entries from "Last October" with emotion graphs.
            </p>
          </motion.div>

          {/* Feature 4 */}
          <motion.div
            className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition"
            whileHover={{ scale: 1.02 }}
            transition={{ delay: 0.6 }}
          >
            <h2 className="text-2xl font-bold text-indigo-600 mb-2">🧵 AI Prompts & Mood Tracking</h2>
            <p>
              Don’t know what to write? The app gives smart prompts and tracks your emotions with beautiful visual feedback.
            </p>
            <p className="mt-2 text-sm italic text-gray-500">
              e.g., "What made you feel seen today?" — auto-detected mood: 😌
            </p>
          </motion.div>
        </div>

        {/* Back to Home Button */}
        <div className="mt-16">
          <Link
            to="/"
            className="inline-block px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium hover:scale-105 transition"
          >
            ⬅️ Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
