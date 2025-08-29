import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Button from "./Button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Build menu items based on user role
  const navItems = user
    ? [
        { name: "Home", path: "/dashboard" }, // Dashboard as central landing
        { name: "Resources", path: "/resources" },
        { name: "My Bookings", path: "/bookings/my" }, // users
        ...(user.role === "admin"
          ? [{ name: "All Bookings", path: "/bookings/all" }] // admins only
          : []),
      ]
    : [
        { name: "Home", path: "/" },
        { name: "Login", path: "/login" },
        { name: "Register", path: "/register" },
      ];

  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to={user ? "/dashboard" : "/"} className="text-2xl font-bold text-primary">
            BookEasy
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 items-center">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="text-gray-700 hover:text-primary font-medium transition"
              >
                {item.name}
              </Link>
            ))}

            {user && (
              <div className="flex items-center space-x-2">
                <User className="w-5 h-5 text-gray-600" />
                <span className="font-medium text-gray-700">{user.fullName}</span>
                <Button size="sm" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sliding Menu */}
      {isOpen && (
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          exit={{ x: "-100%" }}
          className="md:hidden bg-white fixed top-16 left-0 w-3/4 h-full shadow-lg p-6 flex flex-col gap-4 z-40"
        >
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className="text-gray-700 hover:text-primary font-medium text-lg transition"
            >
              {item.name}
            </Link>
          ))}

          {user && (
            <div className="flex flex-col gap-2 mt-4">
              <div className="flex items-center gap-2 text-gray-700">
                <User className="w-5 h-5" /> {user.fullName}
              </div>
              <Button onClick={handleLogout}>Logout</Button>
            </div>
          )}
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
