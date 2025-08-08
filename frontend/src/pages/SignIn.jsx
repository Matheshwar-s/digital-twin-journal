import { use, useState } from "react";
import axios from "../api/axios"; // Replace with your axios instance path
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const Navigate=useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/login", formData);
      localStorage.setItem("username", res.data.username); // Save JWT
      setMessage("✅ Login successful!");
      Navigate("/dashboard"); // Redirect to dashboard
    } catch (error) {
      console.error("Login error:", error);
      setMessage("❌ Login failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 px-4">
      <div className="bg-white/70 backdrop-blur-lg shadow-xl rounded-3xl p-10 w-full max-w-md animate-fade-up">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
          Welcome Back 👋
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            name="username"
            type="text"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
          <input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Sign In 🚪
          </button>
        </form>

        {message && (
          <p className="text-center mt-4 text-sm font-medium text-gray-700">
            {message}
          </p>
        )}

        <p className="text-sm text-center mt-6 text-gray-600">
          Don’t have an account?{" "}
          <a href="/register" className="text-purple-600 hover:underline font-medium">
            Sign up now
          </a>
        </p>
      </div>
    </div>
  );
}
