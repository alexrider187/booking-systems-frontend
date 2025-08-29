import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useForm, Controller } from "react-hook-form";
import { createResource } from "../api/resources";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Message from "../components/ui/Message";
import Spinner from "../components/ui/Spinner";
import type { AxiosError } from "axios";

interface FormValues {
  name: string;
  description?: string;
}

const CreateResource = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { handleSubmit, control, reset } = useForm<FormValues>({
    defaultValues: { name: "", description: "" },
  });

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      await createResource(data);
      setSuccessMsg("Resource created successfully!");
      reset(); // Clear the form
      setTimeout(() => navigate("/resources"), 1500);
    } catch (err) {
      const axiosErr = err as AxiosError<{ message: string }>;
      setErrorMsg(axiosErr.response?.data?.message || "Failed to create resource");
    } finally {
      setLoading(false);
    }
  };

  if (!user) return <Spinner />;

  if (user.role !== "admin") {
    return <p className="text-center mt-10 text-red-500">Access Denied. Admins only.</p>;
  }

  return (
    <div className="max-w-md mx-auto mt-10">
      <Card className="p-6 space-y-4">
        <h2 className="text-xl font-bold">Create Resource</h2>

        {errorMsg && <Message type="error" text={errorMsg} />}
        {successMsg && <Message type="success" text={successMsg} />}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Controller
            name="name"
            control={control}
            rules={{ required: "Resource name is required" }}
            render={({ field, fieldState }) => (
              <>
                <Input label="Name" placeholder="Resource name" {...field} />
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

          <Button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create Resource"}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default CreateResource;
