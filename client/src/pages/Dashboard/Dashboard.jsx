import {
  Search,
  Package,
  Handshake,
  CheckCircle,
} from "lucide-react";

import DashboardLayout from "../../components/dashboard/DashboardLayout";
import DashboardCard from "../../components/dashboard/DashboardCard";
import { useAuth } from "../../context/AuthContext";

function Dashboard() {
  const { user } = useAuth();

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">
          Welcome back, {user?.name}! 👋
        </h1>

        <p className="mt-2 text-slate-500">
          Here's an overview of your LostLink activity.
        </p>
      </div>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">

        <DashboardCard
          title="Lost Items"
          count={0}
          icon={<Search className="text-blue-600" size={28} />}
          color="bg-blue-100"
        />

        <DashboardCard
          title="Found Items"
          count={0}
          icon={<Package className="text-green-600" size={28} />}
          color="bg-green-100"
        />

        <DashboardCard
          title="Claims"
          count={0}
          icon={<Handshake className="text-yellow-600" size={28} />}
          color="bg-yellow-100"
        />

        <DashboardCard
          title="Resolved"
          count={0}
          icon={<CheckCircle className="text-purple-600" size={28} />}
          color="bg-purple-100"
        />

      </div>
    </DashboardLayout>
  );
}

export default Dashboard;