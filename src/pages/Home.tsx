import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Button from "../components/ui/Button";
import { motion } from "framer-motion";

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    if (!user) {
      navigate(`/login?redirect=${path}`);
    } else {
      navigate(path);
    }
  };

  return (
    <div className="relative min-h-screen text-white overflow-hidden">
      {/* Single background image */}
      <img
        src="/image/beach.jpg"
        alt="Tropical beach background"
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
      />

      {/* Dark overlay */}
      <motion.div
        className="absolute inset-0 bg-black opacity-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 2 }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center items-center text-center px-4 py-20">
        <motion.h1
          className="text-5xl font-bold mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          Welcome to BookEasy
        </motion.h1>
        <p className="text-xl mb-8 max-w-xl">
          Manage your resources, book efficiently, and let BookEasy handle the
          rest. Admins and users alike can track and manage bookings seamlessly.
        </p>
        <div className="flex gap-4 flex-wrap justify-center">
          <Button variant="primary" onClick={() => handleNavigate("/resources")}>
            Explore Resources
          </Button>
          <Button variant="secondary" onClick={() => handleNavigate("/bookings")}>
            My Bookings
          </Button>
          {user?.role === "admin" && (
            <Button variant="info" onClick={() => handleNavigate("/bookings/all")}>
              All Bookings
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
