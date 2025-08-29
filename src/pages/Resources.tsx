import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import ResourceCard from "../components/ui/ResourceCard";
import Button from "../components/ui/Button";
import Spinner from "../components/ui/Spinner";
import { useNavigate } from "react-router-dom";
import type { Resource } from "../types/resource";
import { getAllResources, deleteResource } from "../api/resources";
import { createBooking } from "../api/bookings";
import Message from "../components/ui/Message";
import type { AxiosError } from "axios";

const Resources = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // booking modal state
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [bookingDate, setBookingDate] = useState("");

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const data = await getAllResources();
        setResources(data);
      } catch (err) {
        const axiosErr = err as AxiosError<{ message: string }>;
        setErrorMsg(axiosErr.response?.data?.message || "Error fetching resources");
      } finally {
        setLoading(false);
      }
    };
    fetchResources();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this resource?")) return;
    try {
      await deleteResource(id);
      setResources((prev) => prev.filter((r) => r._id !== id));
      setSuccessMsg("Resource deleted successfully!");
      setTimeout(() => setSuccessMsg(null), 3000);
    } catch (err) {
      const axiosErr = err as AxiosError<{ message: string }>;
      setErrorMsg(axiosErr.response?.data?.message || "Error deleting resource");
      setTimeout(() => setErrorMsg(null), 3000);
    }
  };

  const handleEdit = (id: string) => navigate(`/resources/edit/${id}`);
  const handleCreate = () => navigate("/resources/create");

  // 👇 triggered when user clicks "Book Now"
  const handleOpenBooking = (resource: Resource) => {
    setSelectedResource(resource);
    setBookingDate("");
    setShowBookingModal(true);
  };

  const handleConfirmBooking = async () => {
    if (!selectedResource || !bookingDate) {
      setErrorMsg("Please select a date.");
      return;
    }

    try {
      await createBooking({ resourceId: selectedResource._id, date: bookingDate });
      setSuccessMsg("Booking created successfully!");
      setShowBookingModal(false);
      setTimeout(() => setSuccessMsg(null), 3000);
    } catch (err) {
      const axiosErr = err as AxiosError<{ message: string }>;
      setErrorMsg(axiosErr.response?.data?.message || "Error creating booking");
      setTimeout(() => setErrorMsg(null), 3000);
    }
  };

  if (loading) return <Spinner />;

  return (
    <div className="max-w-5xl mx-auto p-4 space-y-4">
      {errorMsg && <Message type="error" text={errorMsg} />}
      {successMsg && <Message type="success" text={successMsg} />}

      {user?.role === "admin" && (
        <div className="flex justify-end">
          <Button onClick={handleCreate} variant="primary">
            Create Resource
          </Button>
        </div>
      )}

      {resources.length === 0 ? (
        <p className="text-center">No resources found.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {resources.map((r) => (
            <ResourceCard
              key={r._id}
              id={r._id}
              name={r.name}
              description={r.description}
              onEdit={user?.role === "admin" ? handleEdit : undefined}
              onDelete={user?.role === "admin" ? handleDelete : undefined}
              onBook={user?.role === "user" ? () => handleOpenBooking(r) : undefined}
            />
          ))}
        </div>
      )}

      {/* Booking Modal */}
      {showBookingModal && selectedResource && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-sm">
            <h3 className="text-lg font-bold mb-4">Book {selectedResource.name}</h3>

            <label className="block mb-4">
              <span className="text-gray-700 font-medium">Select Date</span>
              <input
                type="date"
                value={bookingDate}
                onChange={(e) => setBookingDate(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                required
              />
            </label>

            <div className="flex justify-end gap-2">
              <Button variant="secondary" onClick={() => setShowBookingModal(false)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleConfirmBooking}>
                Confirm Booking
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Resources;
