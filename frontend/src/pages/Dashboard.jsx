import Sidebar from "../components/Sidebar";
import DashboardHome from "../components/DashboardHome";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-indigo-50">
      <Sidebar />
      <div className="ml-64 w-full">
        <DashboardHome />
      </div>
    </div>
  );
}
