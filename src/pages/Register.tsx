import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Mail, User, Eye, EyeOff } from "lucide-react";

import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import Spinner from "../components/ui/Spinner";
import Message from "../components/ui/Message";
import { useAuth } from "../hooks/useAuth";
import { AxiosError } from "axios";

interface RegisterForm {
  fullName: string;
  email: string;
  password: string;
  role: "user" | "admin";
}

const Register = () => {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>();

  const onSubmit = async (data: RegisterForm) => {
    try {
      setLoading(true);
      setErrorMsg(null);
      await registerUser(data.fullName, data.email, data.password, data.role);
      navigate("/login");
    } catch (err) {
      const axiosErr = err as AxiosError<{ message: string }>;
      setErrorMsg(axiosErr.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-xl shadow-md w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Register</h2>

        {errorMsg && <Message type="error" text={errorMsg} />}

        <Input
          label="Full Name"
          placeholder="Enter your full name"
          icon={User}
          {...register("fullName", { required: "Full name is required" })}
          error={errors.fullName?.message}
        />

        <Input
          label="Email"
          placeholder="Enter your email"
          icon={Mail}
          {...register("email", { required: "Email is required" })}
          error={errors.email?.message}
        />

        <Input
          label="Password"
          placeholder="Enter your password"
          isPassword
          eyeIcon={Eye}
          eyeOffIcon={EyeOff}
          {...register("password", { required: "Password is required", minLength: { value: 6, message: "Min 6 characters" } })}
          error={errors.password?.message}
        />

        <div>
          <label className="mb-1 font-medium">Role</label>
          <select
            className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            {...register("role", { required: true })}
            defaultValue="user"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <Button type="submit" disabled={loading}>
          {loading ? <Spinner /> : "Register"}
        </Button>

        <p className="text-sm text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-primary font-medium hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
