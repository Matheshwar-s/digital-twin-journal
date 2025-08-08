import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "../api/axios";
import Sidebar from "../components/Sidebar";
import JournalEntryCard from "../components/JournalEntryCard";
import NewJournalModal from "../components/NewJournalModal";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function Journals() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [moodFilter, setMoodFilter] = useState("");
  const [page, setPage] = useState(1);
  const entriesPerPage = 5;

  const formatDate = (date) => date.toISOString().split("T")[0];
  const username = localStorage.getItem("username");

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const res = await axios.get(`/journals/${username}`);
        setEntries(res.data);
      } catch (error) {
        console.error("Failed to fetch journals:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEntries();
  }, []);

  const filteredEntries = entries.filter((entry) => {
    const matchesDate = formatDate(new Date(entry.date)) === formatDate(selectedDate);
    const matchesSearch =
      entry.title?.toLowerCase().includes(search.toLowerCase()) ||
      entry.content?.toLowerCase().includes(search.toLowerCase());
    const matchesMood = moodFilter ? entry.mood === moodFilter : true;
    return matchesDate && matchesSearch && matchesMood;
  });

  const paginatedEntries = filteredEntries.slice(
    (page - 1) * entriesPerPage,
    page * entriesPerPage
  );

  const totalPages = Math.ceil(filteredEntries.length / entriesPerPage);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/journals/${id}`);
      setEntries((prev) => prev.filter((e) => e.id !== id));
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const handleUpdate = (updatedEntry) => {
    setEntries((prev) =>
      prev.map((entry) => (entry.id === updatedEntry.id ? updatedEntry : entry))
    );
  };

  const handleAddEntry = (newEntry) => {
    setEntries((prev) => [...prev, newEntry]);
  };

  // Mood chart calculation
  const moodCounts = {};
  entries.forEach((entry) => {
    const day = formatDate(new Date(entry.date));
    if (!moodCounts[day]) moodCounts[day] = [];
    moodCounts[day].push(entry.mood);
  });

  const chartLabels = Object.keys(moodCounts).slice(-7);
  const chartData = chartLabels.map((day) => {
    const moods = moodCounts[day];
    const moodScore = moods.reduce((acc, mood) => {
      switch (mood) {
        case "😊": return acc + 5;
        case "😢": return acc + 2;
        case "😡": return acc + 1;
        case "😴": return acc + 3;
        case "🤯": return acc + 1;
        default: return acc + 3;
      }
    }, 0) / moods.length;
    return moodScore;
  });

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 to-purple-100">
      <Sidebar />
      <div className="ml-64 w-full p-8">
        <h2 className="text-3xl font-bold mb-6">📓 My Journals</h2>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Calendar Section */}
          <div className="bg-white/70 backdrop-blur-lg p-6 rounded-2xl shadow-md w-fit">
            <Calendar onChange={setSelectedDate} value={selectedDate} className="text-sm" />
            <p className="mt-4 text-gray-700 text-center">
              Showing entries for: <span className="font-medium">{selectedDate.toDateString()}</span>
            </p>
          </div>

          {/* Journal Section */}
          <div className="flex-1">
            <div className="flex flex-wrap gap-3 mb-4">
              <input
                type="text"
                placeholder="Search entries..."
                className="p-2 border border-gray-300 rounded-lg shadow-sm w-60"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <select
                value={moodFilter}
                onChange={(e) => setMoodFilter(e.target.value)}
                className="p-2 border border-gray-300 rounded-lg shadow-sm"
              >
                <option value="">All Moods</option>
                <option>😊</option>
                <option>😢</option>
                <option>😡</option>
                <option>😴</option>
                <option>🤯</option>
              </select>
              <button
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                onClick={() => setShowModal(true)}
              >
                + New Entry
              </button>
            </div>

            {loading ? (
              <p className="text-gray-600">Loading entries...</p>
            ) : paginatedEntries.length > 0 ? (
              <>
                {paginatedEntries.map((entry) => (
                  <JournalEntryCard
                    key={entry.id}
                    entry={entry}
                    onDelete={handleDelete}
                    onUpdate={handleUpdate}
                  />
                ))}
                <div className="flex justify-between items-center mt-4">
                  <button
                    className={`px-4 py-2 rounded ${page === 1 ? "bg-gray-300" : "bg-purple-500 text-white hover:bg-purple-600"}`}
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    disabled={page === 1}
                  >
                    ◀ Prev
                  </button>
                  <span className="text-sm text-gray-700">
                    Page {page} of {totalPages}
                  </span>
                  <button
                    className={`px-4 py-2 rounded ${page === totalPages ? "bg-gray-300" : "bg-purple-500 text-white hover:bg-purple-600"}`}
                    onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={page === totalPages}
                  >
                    Next ▶
                  </button>
                </div>
              </>
            ) : (
              <p className="text-gray-600 italic">No entries for this day.</p>
            )}
          </div>
        </div>

        {/* Mood Chart */}
        <div className="mt-10 bg-white rounded-xl p-6 shadow">
          <h3 className="text-xl font-bold mb-4">📈 Mood Over Time</h3>
          <Line
            data={{
              labels: chartLabels,
              datasets: [
                {
                  label: "Mood Score (1–5)",
                  data: chartData,
                  fill: false,
                  borderColor: "#8b5cf6",
                  tension: 0.3,
                },
              ],
            }}
            options={{
              scales: {
                y: { min: 0, max: 5 },
              },
              plugins: {
                legend: { display: false },
              },
            }}
          />
        </div>

        {/* New Entry Modal */}
        <NewJournalModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onEntryAdded={handleAddEntry}
        />
      </div>
    </div>
  );
}
