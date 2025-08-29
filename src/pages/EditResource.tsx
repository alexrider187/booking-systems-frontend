import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useForm, Controller } from "react-hook-form";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Message from "../components/ui/Message";
import Spinner from "../components/ui/Spinner";
import { getResourceById, updateResource } from "../api/resources";
import type { AxiosError } from "axios";
import type { Resource } from "../types/resource";

interface FormValues {
  name: string;
  description?: string;
}

const EditResource = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const { handleSubmit, control, reset } = useForm<FormValues>({
    defaultValues: { name: "", description: "" },
  });

  // Fetch resource
  useEffect(() => {
    const fetchResource = async () => {
      if (!id) {
        setErrorMsg("Invalid resource ID.");
        setLoading(false);
        return;
      }
      try {
        const data: Resource = await getResourceById(id);
        reset({ name: data.name, description: data.description || "" });
      } catch (err) {
        const axiosErr = err as AxiosError<{ message: string }>;
        setErrorMsg(axiosErr.response?.data?.message || "Failed to fetch resource");
      } finally {
        setLoading(false);
      }
    };
    fetchResource();
  }, [id, reset]);

  const onSubmit = async (data: FormValues) => {
    if (!id) return;
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      await updateResource(id, data);
      setSuccessMsg("Resource updated successfully!");
      setTimeout(() => navigate("/resources"), 1500);
    } catch (err) {
      const axiosErr = err as AxiosError<{ message: string }>;
      setErrorMsg(axiosErr.response?.data?.message || "Failed to update resource");
    }
  };

  if (!user) return <Spinner />;

  return (
    <div className="max-w-md mx-auto mt-10">
      {user.role !== "admin" ? (
        <p className="text-center mt-10 text-red-500">Access Denied. Admins only.</p>
      ) : loading ? (
        <Spinner />
      ) : (
        <Card className="p-6 space-y-4">
          <h2 className="text-xl font-bold">Edit Resource</h2>

          {errorMsg && <Message type="error" text={errorMsg} />}
          {successMsg && <Message type="success" text={successMsg} />}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Controller
              name="name"
              control={control}
              rules={{ required: "Resource name is required" }}
              render={({ field, fieldState }) => (
                <>
                  <Input
                    label="Name"
                    placeholder="Resource name"
                    {...field}
                  />
                  {fieldState.error && (
                    <p className="text-red-500 text-sm mt-1">{fieldState.error.message}</p>
                  )}
                </>
              )}
            />

            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <Input label="Description" placeholder="Optional description" {...field} />
              )}
            />

            <Button type="submit">{loading ? "Updating..." : "Update Resource"}</Button>
          </form>
        </Card>
      )}
    </div>
  );
};

export default EditResource;
