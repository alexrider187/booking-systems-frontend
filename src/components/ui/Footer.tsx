import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const Footer = () => {
  const { user } = useAuth();

  const links = user
    ? [
        { name: "Home", path: user ? "/dashboard" : "/" },
        { name: "Resources", path: "/resources" },
        { name: "My Bookings", path: "/bookings/my" },
        ...(user.role === "admin"
          ? [{ name: "All Bookings", path: "/bookings/all" }]
          : []),
        // Removed "Profile"
      ]
    : [
        { name: "Home", path: "/" },
        { name: "Login", path: "/login" },
        { name: "Register", path: "/register" },
      ];

  return (
    <footer className="bg-gray-900 text-gray-200 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} BookEasy. All rights reserved.</p>
        <div className="flex flex-wrap gap-6 mt-4 md:mt-0">
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="hover:text-white transition"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
