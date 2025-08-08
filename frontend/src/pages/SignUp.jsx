import { useState } from "react";
import axios from "../api/axios";

export default function SignUp() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/auth/signup", formData);
      setMessage("🎉 Registered successfully!");
    } catch (error) {
      setMessage("❌ Registration failed. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-4">
      <div className="bg-white/70 backdrop-blur-md shadow-xl rounded-3xl p-10 w-full max-w-md animate-fade-up">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
          Create Your Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            name="username"
            type="text"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
          />
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
          />
          <input
            name="password"
            value={formData.password}
            onChange={handleChange}
            type="password"
            placeholder="Password"
            className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
          />

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Register 🚀
          </button>
        </form>

        {message && (
          <p className="text-center mt-4 text-sm font-medium text-gray-700">
            {message}
          </p>
        )}

        <p className="text-sm text-center mt-6 text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-purple-600 hover:underline font-medium">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}
