import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const navLinks = [
  { name: "Home", href: "#" },
  { name: "Features", href: "#features" },
  { name: "About", href: "#about" },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">

        {/* Logo */}
        <Link
          to="/"
          className="font-heading text-3xl font-bold text-blue-600"
        >
          LostLink
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                className="text-gray-600 font-medium transition hover:text-blue-600"
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center gap-3">

          {!user ? (
            <>
              <button
                onClick={() => navigate("/login")}
                className="px-5 py-2.5 rounded-xl border border-blue-600 text-blue-600 font-medium transition hover:bg-blue-50"
              >
                Login
              </button>

              <button
                onClick={() => navigate("/register")}
                className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-medium shadow-md transition hover:bg-blue-700 hover:shadow-lg"
              >
                Register
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate("/dashboard")}
                className="px-5 py-2.5 rounded-xl border border-blue-600 text-blue-600 font-medium transition hover:bg-blue-50"
              >
                Dashboard
              </button>

              <button
                onClick={handleLogout}
                className="px-5 py-2.5 rounded-xl bg-red-500 text-white font-medium transition hover:bg-red-600"
              >
                Logout
              </button>
            </>
          )}

        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="px-6 py-6 flex flex-col gap-5">

            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-700 font-medium hover:text-blue-600"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}

            {!user ? (
              <>
                <button
                  onClick={() => {
                    navigate("/login");
                    setIsOpen(false);
                  }}
                  className="w-full py-3 rounded-xl border border-blue-600 text-blue-600 font-medium"
                >
                  Login
                </button>

                <button
                  onClick={() => {
                    navigate("/register");
                    setIsOpen(false);
                  }}
                  className="w-full py-3 rounded-xl bg-blue-600 text-white font-medium"
                >
                  Register
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    navigate("/dashboard");
                    setIsOpen(false);
                  }}
                  className="w-full py-3 rounded-xl border border-blue-600 text-blue-600 font-medium"
                >
                  Dashboard
                </button>

                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="w-full py-3 rounded-xl bg-red-500 text-white font-medium"
                >
                  Logout
                </button>
              </>
            )}

          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;