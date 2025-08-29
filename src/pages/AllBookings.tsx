import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import BookingCard from "../components/ui/BookingCard";
import Spinner from "../components/ui/Spinner";
import Message from "../components/ui/Message";
import {
  getAllBookings,
  approveBooking,
  rejectBooking,
  cancelBooking,
} from "../api/bookings";
import type { AxiosError } from "axios";
import type { Booking } from "../types/booking";

// ✅ Tabs include all statuses
const TABS = ["all", "pending", "approved", "rejected", "cancelled"] as const;
type TabType = (typeof TABS)[number];

const AllBookings = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>("all");

  useEffect(() => {
    if (user?.role !== "admin") {
      setLoading(false);
      return;
    }

    const fetchBookings = async () => {
      try {
        const data = await getAllBookings();
        setBookings(data);
      } catch (err) {
        const axiosErr = err as AxiosError<{ message: string }>;
        setErrorMsg(
          axiosErr.response?.data?.message || "Failed to fetch bookings"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user]);

  const handleApprove = async (id: string) => {
    try {
      const { booking: updated } = await approveBooking(id); // ✅ unwrap booking
      setBookings((prev) =>
        prev.map((b) => (b._id === id ? updated : b))
      );
      setSuccessMsg("Booking approved successfully!");
      setTimeout(() => setSuccessMsg(null), 3000);
    } catch (err) {
      const axiosErr = err as AxiosError<{ message: string }>;
      setErrorMsg(
        axiosErr.response?.data?.message || "Error approving booking"
      );
      setTimeout(() => setErrorMsg(null), 3000);
    }
  };

  const handleReject = async (id: string) => {
    const reason = prompt("Please enter a rejection reason:");
    if (!reason) return;

    try {
      const { booking: updated } = await rejectBooking(id, reason); // ✅ unwrap booking
      setBookings((prev) =>
        prev.map((b) => (b._id === id ? updated : b))
      );
      setSuccessMsg("Booking rejected successfully!");
      setTimeout(() => setSuccessMsg(null), 3000);
    } catch (err) {
      const axiosErr = err as AxiosError<{ message: string }>;
      setErrorMsg(
        axiosErr.response?.data?.message || "Error rejecting booking"
      );
      setTimeout(() => setErrorMsg(null), 3000);
    }
  };

  const handleCancel = async (id: string) => {
    if (!window.confirm("Are you sure you want to cancel this booking?"))
      return;

    try {
      const { booking: updated } = await cancelBooking(id); // ✅ unwrap booking
      setBookings((prev) =>
        prev.map((b) => (b._id === id ? updated : b))
      );
      setSuccessMsg("Booking cancelled successfully!");
      setTimeout(() => setSuccessMsg(null), 3000);
    } catch (err) {
      const axiosErr = err as AxiosError<{ message: string }>;
      setErrorMsg(
        axiosErr.response?.data?.message || "Error cancelling booking"
      );
      setTimeout(() => setErrorMsg(null), 3000);
    }
  };

  // --- Access checks ---
  if (loading) return <Spinner />;
  if (!user) return <p className="text-center mt-10">You must be logged in.</p>;
  if (user.role !== "admin")
    return (
      <p className="text-center mt-10 text-red-500">
        Access Denied. Admins only.
      </p>
    );

  // --- Filter bookings by tab ---
  const filteredBookings =
    activeTab === "all"
      ? bookings
      : bookings.filter((b) => b.status === activeTab);

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      {errorMsg && <Message type="error" text={errorMsg} />}
      {successMsg && <Message type="success" text={successMsg} />}

      {/* Tabs */}
      <div className="flex gap-3 border-b pb-2">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-t-md font-medium ${
              activeTab === tab
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Booking list */}
      {filteredBookings.length === 0 ? (
        <p className="text-center text-gray-500">
          No {activeTab} bookings found.
        </p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {filteredBookings.map((b) => (
            <BookingCard
              key={b._id}
              booking={b}
              currentUserRole="admin"
              onApprove={handleApprove}
              onReject={handleReject}
              onCancel={handleCancel}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllBookings;
