import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-64 h-screen bg-gray-900 text-white p-6 fixed">
      <h1 className="text-2xl font-bold mb-10">🪞 Digital Twin</h1>
      <ul className="space-y-4">
        <li><Link to="/dashboard">🏠 Home</Link></li>
        <li><Link to="/dashboard/journals">📓 My Journals</Link></li>
        <li><Link to="/dashboard/twin">🧬 Digital Twin</Link></li>
        <li> <Link to="/dashboard/chat" >
            💬 Past You Chat
          </Link></li>
        <li><Link to="/dashboard/settings">🚪 Settings</Link></li>
        <li><Link to="/login">🚪 Logout</Link></li>
      </ul>
    </div>
  );
}
