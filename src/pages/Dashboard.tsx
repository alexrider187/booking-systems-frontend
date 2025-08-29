import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import { getMyBookings } from "../api/bookings";
import type { Booking } from "../types/booking";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchBookings = async () => {
      try {
        const data = await getMyBookings();
        setBookings(data);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, [user]);

  if (!user)
    return <p className="text-center mt-10">You must be logged in to view the dashboard.</p>;

  return (
    <div className="max-w-5xl mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold text-center">Dashboard</h1>

      {/* User Info */}
      <Card className="p-4 space-y-2">
        <h2 className="text-xl font-semibold">User Info</h2>
        <p>Name: {user.fullName}</p>
        <p>Email: {user.email}</p>
        <p>Role: {user.role}</p>
      </Card>

      {/* Quick Actions */}
      <Card className="p-4 space-y-2">
        <h2 className="text-xl font-semibold">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          {user.role === "user" && (
            <>
              <Button onClick={() => navigate("/resources")}>Explore Resources</Button>
              <Button onClick={() => navigate("/bookings")}>My Bookings</Button>
            </>
          )}

          {user.role === "admin" && (
            <>
              <Button onClick={() => navigate("/resources")}>Manage Resources</Button>
              <Button onClick={() => navigate("/resources/create")}>Create Resource</Button>
              <Button onClick={() => navigate("/bookings/all")}>All Bookings</Button>
            </>
          )}
        </div>
      </Card>

      {/* User Bookings (only for users) */}
      {user.role === "user" && !loading && bookings.length > 0 && (
        <Card className="p-4 space-y-2">
          <h2 className="text-xl font-semibold">My Bookings</h2>
          <ul className="space-y-2">
            {bookings.map((b) => (
              <li key={b._id} className="flex justify-between items-center border p-2 rounded-md">
                <div>
                  <p className="font-medium">{b.resource.name}</p>
                  <p className="text-gray-600">Date: {new Date(b.date).toLocaleDateString()}</p>
                  <p className="text-gray-600">Status: {b.status}</p>
                </div>
                {b.status === "pending" && (
                  <Button variant="danger" onClick={() => navigate(`/bookings`)}>
                    Cancel
                  </Button>
                )}
              </li>
            ))}
          </ul>
        </Card>
      )}
    </div>
  );
};

export default Dashboard;
