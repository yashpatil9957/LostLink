import {
  LayoutDashboard,
  Search,
  Package,
  Handshake,
  User,
  LogOut,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const menuItems = [
    {
      name: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      path: "/dashboard",
    },
    {
      name: "Lost Items",
      icon: <Search size={20} />,
      path: "/lost-items",
    },
    {
      name: "Found Items",
      icon: <Package size={20} />,
      path: "/found-items",
    },
    {
      name: "Claims",
      icon: <Handshake size={20} />,
      path: "/claims",
    },
    {
      name: "Profile",
      icon: <User size={20} />,
      path: "/profile",
    },
  ];

  return (
    <aside className="w-64 min-h-[calc(100vh-72px)] bg-white border-r border-slate-200">
      <nav className="space-y-2 p-5">

        {menuItems.map((item) => (
          <button
            key={item.name}
            onClick={() => navigate(item.path)}
            className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 font-medium transition
              ${
                location.pathname === item.path
                  ? "bg-blue-50 text-blue-600"
                  : "hover:bg-slate-100 text-slate-700"
              }`}
          >
            {item.icon}
            {item.name}
          </button>
        ))}

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