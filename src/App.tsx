import { Suspense, lazy, type JSX } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/ui/Navbar";
import Footer from "./components/ui/Footer";
import Spinner from "./components/ui/Spinner";
import { AuthProvider } from "./context/AuthProvider";
import PrivateRoute from "./components/PrivateRoutes";

// Lazy load pages
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Resources = lazy(() => import("./pages/Resources"));
const CreateResource = lazy(() => import("./pages/CreateResource"));
const EditResource = lazy(() => import("./pages/EditResource"));
const MyBookings = lazy(() => import("./pages/MyBookings"));
const AllBookings = lazy(() => import("./pages/AllBookings"));

// AdminRoute wrapper
const AdminRoute = ({ children }: { children: JSX.Element }) => (
  <PrivateRoute>{children}</PrivateRoute>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <div className="pt-16 min-h-[calc(100vh-64px)] flex flex-col">
          <Suspense
            fallback={
              <div className="flex justify-center items-center mt-10">
                <Spinner />
              </div>
            }
          >
            <Routes>
              {/* Public */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Protected - Dashboard instead of Profile */}
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />

              {/* Resources */}
              <Route
                path="/resources"
                element={
                  <PrivateRoute>
                    <Resources />
                  </PrivateRoute>
                }
              />
              <Route
                path="/resources/create"
                element={
                  <AdminRoute>
                    <CreateResource />
                  </AdminRoute>
                }
              />
              <Route
                path="/resources/edit/:id"
                element={
                  <AdminRoute>
                    <EditResource />
                  </AdminRoute>
                }
              />

              {/* Bookings */}
              <Route
                path="/bookings/my"
                element={
                  <PrivateRoute>
                    <MyBookings />
                  </PrivateRoute>
                }
              />
              <Route
                path="/bookings/all"
                element={
                  <AdminRoute>
                    <AllBookings />
                  </AdminRoute>
                }
              />

              {/* Catch all */}
              <Route
                path="*"
                element={<p className="text-center mt-10">Page Not Found</p>}
              />
            </Routes>
          </Suspense>
        </div>

        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
