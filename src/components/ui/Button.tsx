import React from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { Loader2 } from "lucide-react";

// Combine Framer Motion button props with our custom props
type ButtonSize = "sm" | "md" | "lg";
type ButtonVariant = "primary" | "secondary" | "danger" | "info";

interface ButtonProps extends HTMLMotionProps<"button"> {
  children?: React.ReactNode;
  variant?: ButtonVariant;
  loading?: boolean;
  size?: ButtonSize;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  loading = false,
  size = "md",
  disabled,
  ...props
}) => {
  const baseStyles =
    "rounded-2xl font-semibold flex items-center justify-center gap-2 transition-colors duration-200";

  const sizeClasses: Record<ButtonSize, string> = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  const variants: Record<ButtonVariant, string> = {
    primary: "bg-primary text-white hover:bg-indigo-700",
    secondary: "bg-secondary text-white hover:bg-teal-700",
    danger: "bg-red-500 text-white hover:bg-red-600",
    info: "bg-blue-500 text-white hover:bg-blue-600",
  };

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      disabled={loading || disabled}
      className={`${baseStyles} ${sizeClasses[size]} ${variants[variant]} ${
        loading || disabled ? "opacity-70 cursor-not-allowed" : ""
      }`}
      {...props}
    >
      {loading && <Loader2 className="animate-spin w-5 h-5" />}
      {children}
    </motion.button>
  );
};

export default Button;
