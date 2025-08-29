import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { getAllResources } from "../api/resources";
import { createBooking } from "../api/bookings";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Spinner from "../components/ui/Spinner";
import Message from "../components/ui/Message";
import type { AxiosError } from "axios";
import type { Resource } from "../types/resource";

const CreateBooking = () => {
  const { user } = useAuth();
  const [resources, setResources] = useState<Resource[]>([]);
  const [selectedResource, setSelectedResource] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const data = await getAllResources();
        setResources(data);
      } catch (err) {
        const axiosErr = err as AxiosError<{ message: string }>;
        setErrorMsg(axiosErr.response?.data?.message || "Failed to fetch resources");
      }
    };
    fetchResources();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedResource || !date) {
      setErrorMsg("Please select a resource and date.");
      return;
    }

    setLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      await createBooking({ resourceId: selectedResource, date });
      setSuccessMsg("Booking created successfully!");
      setSelectedResource("");
      setDate("");

      setTimeout(() => setSuccessMsg(null), 3000);
    } catch (err) {
      const axiosErr = err as AxiosError<{ message: string }>;
      setErrorMsg(axiosErr.response?.data?.message || "Failed to create booking");
      setTimeout(() => setErrorMsg(null), 3000);
    } finally {
      setLoading(false);
    }
  };

  if (!user) return <p className="text-center mt-10">You must be logged in to create a booking.</p>;
  if (loading) return <Spinner />;

  return (
    <div className="max-w-md mx-auto mt-10">
      <Card className="p-6 space-y-4">
        <h2 className="text-xl font-bold">Create Booking</h2>

        {errorMsg && <Message type="error" text={errorMsg} />}
        {successMsg && <Message type="success" text={successMsg} />}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Resource selection */}
          <label className="block">
            <span className="text-gray-700 font-medium">Resource</span>
            <select
              value={selectedResource}
              onChange={(e) => setSelectedResource(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            >
              <option value="">Select a resource</option>
              {resources.map((r) => (
                <option key={r._id} value={r._id}>
                  {r.name}
                </option>
              ))}
            </select>
          </label>

          {/* Date */}
          <Input
            label="Booking Date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />

          {/* Submit */}
          <Button type="submit" disabled={loading}>
            {loading ? "Booking..." : "Create Booking"}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default CreateBooking;
