import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md fixed w-full z-10">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          🪞Digital Twin Journal
        </Link>
        <div className="space-x-4">
          <Link to="/about" className="text-gray-700 hover:text-blue-600 font-medium">About</Link>
          <Link to="/login" className="text-blue-600 hover:underline">Sign In</Link>
          <Link to="/register" className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700">Sign Up</Link>
        </div>
      </div>
    </nav>
  );
}
