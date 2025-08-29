import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import BookingCard from "../components/ui/BookingCard";
import Spinner from "../components/ui/Spinner";
import { getMyBookings, cancelBooking } from "../api/bookings";
import Message from "../components/ui/Message";
import type { AxiosError } from "axios";
import type { Booking } from "../types/booking";

const MyBookings = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchBookings = async () => {
      try {
        const data = await getMyBookings();
        setBookings(data);
      } catch (err) {
        const axiosErr = err as AxiosError<{ message: string }>;
        setErrorMsg(axiosErr.response?.data?.message || "Failed to fetch bookings");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user]);

  const handleCancel = async (id: string) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;

    try {
      const updated = await cancelBooking(id);
      setBookings((prev) =>
        prev.map((b) => (b._id === id ? updated : b))
      );
      setSuccessMsg("Booking cancelled successfully!");
      setTimeout(() => setSuccessMsg(null), 3000);
    } catch (err) {
      const axiosErr = err as AxiosError<{ message: string }>;
      setErrorMsg(axiosErr.response?.data?.message || "Error cancelling booking");
      setTimeout(() => setErrorMsg(null), 3000);
    }
  };

  if (loading) return <Spinner />;

  if (!user) {
    return (
      <div className="text-center mt-10 text-gray-600">
        You must be logged in to see your bookings.
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-4 space-y-4">
      {errorMsg && <Message type="error" text={errorMsg} />}
      {successMsg && <Message type="success" text={successMsg} />}

      {bookings.length === 0 ? (
        <p className="text-center text-gray-500">You have no bookings yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {bookings.map((b) => (
            <BookingCard
              key={b._id}
              booking={b}
              currentUserRole="user"
              onCancel={handleCancel}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
