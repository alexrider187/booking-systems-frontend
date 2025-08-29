import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Mail, Eye, EyeOff } from "lucide-react";

import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import Spinner from "../components/ui/Spinner";
import Message from "../components/ui/Message";
import { useAuth } from "../hooks/useAuth";
import { AxiosError } from "axios";

interface LoginForm {
  email: string;
  password: string;
}

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  const onSubmit = async (data: LoginForm) => {
    try {
      setLoading(true);
      setErrorMsg(null);
      await login(data.email, data.password);
      navigate("/profile");
    } catch (err) {
      const axiosErr = err as AxiosError<{ message: string }>;
      setErrorMsg(axiosErr.response?.data?.message || "Login failed");
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
        <h2 className="text-2xl font-bold text-center">Login</h2>

        {errorMsg && <Message type="error" text={errorMsg} />}

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

        <Button type="submit" disabled={loading}>
          {loading ? <Spinner /> : "Login"}
        </Button>

        <p className="text-sm text-center">
          Don't have an account?{" "}
          <Link to="/register" className="text-primary font-medium hover:underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
