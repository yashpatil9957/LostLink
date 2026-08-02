import {
  LayoutDashboard,
  Search,
  Package,
  Handshake,
  User,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Sidebar() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <aside className="w-64 min-h-[calc(100vh-72px)] bg-white border-r border-slate-200">
      <nav className="space-y-2 p-5">

        <button className="flex w-full items-center gap-3 rounded-xl bg-blue-50 px-4 py-3 font-medium text-blue-600">
          <LayoutDashboard size={20} />
          Dashboard
        </button>

        <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 hover:bg-slate-100">
          <Search size={20} />
          Lost Items
        </button>

        <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 hover:bg-slate-100">
          <Package size={20} />
          Found Items
        </button>

        <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 hover:bg-slate-100">
          <Handshake size={20} />
          Claims
        </button>

        <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 hover:bg-slate-100">
          <User size={20} />
          Profile
        </button>

        <button
          onClick={handleLogout}
          className="mt-10 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-red-600 hover:bg-red-50"
        >
          <LogOut size={20} />
          Logout
        </button>

      </nav>
    </aside>
  );
}

export default Sidebar;