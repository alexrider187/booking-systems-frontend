import React from "react";
import type { Booking } from "../../types/booking";

type Props = {
  booking: Booking;
  currentUserRole: "admin" | "user"; // ✅ NEW
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
  onCancel?: (id: string) => void;
};

const BookingCard: React.FC<Props> = ({ booking, currentUserRole, onApprove, onReject, onCancel }) => {
  return (
    <div className="border p-4 rounded-lg shadow-md bg-white">
      <h3 className="text-lg font-semibold">{booking.resource?.name || "Unknown Resource"}</h3>
      <p className="text-gray-600">Date: {new Date(booking.date).toLocaleDateString()}</p>
      <p className="mt-2">
        Status:{" "}
        <span
          className={`px-2 py-1 rounded text-sm ${
            booking.status === "pending"
              ? "bg-yellow-200 text-yellow-800"
              : booking.status === "approved"
              ? "bg-green-200 text-green-800"
              : booking.status === "rejected"
              ? "bg-red-200 text-red-800"
              : booking.status === "cancelled"
              ? "bg-gray-200 text-gray-800"
              : ""
          }`}
        >
          {booking.status}
        </span>
      </p>

      {/* --- Admin actions --- */}
      {currentUserRole === "admin" && (booking.status === "pending" || booking.status === "approved") && (
        <div className="flex gap-2 mt-3">
          {booking.status === "pending" && onApprove && (
            <button
              onClick={() => onApprove(booking._id)}
              className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
            >
              Approve
            </button>
          )}
          {booking.status === "pending" && onReject && (
            <button
              onClick={() => onReject(booking._id)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Reject
            </button>
          )}
          {onCancel && (
            <button
              onClick={() => onCancel(booking._id)}
              className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          )}
        </div>
      )}

      {/* --- User actions (cancel only) --- */}
      {currentUserRole === "user" && (booking.status === "pending" || booking.status === "approved") && onCancel && (
        <div className="flex gap-2 mt-3">
          <button
            onClick={() => onCancel(booking._id)}
            className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
          >
            Cancel Booking
          </button>
        </div>
      )}
    </div>
  );
};

export default BookingCard;
