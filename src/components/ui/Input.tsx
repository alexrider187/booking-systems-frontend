import { type InputHTMLAttributes, useState } from "react";
import type { LucideIcon } from "lucide-react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: LucideIcon;       // default icon (optional, e.g., email/user)
  eyeIcon?: LucideIcon;    // Eye icon
  eyeOffIcon?: LucideIcon; // EyeOff icon
  isPassword?: boolean;    // toggle password visibility
}

const Input = ({
  label,
  error,
  icon: IconComp,
  eyeIcon: EyeIcon,
  eyeOffIcon: EyeOffIcon,
  isPassword,
  ...props
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const inputType = isPassword ? (showPassword ? "text" : "password") : props.type;

  return (
    <div className="flex flex-col">
      {label && <label className="mb-1 font-medium">{label}</label>}
      <div className="relative">
        <input
          className={`w-full border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary ${
            error ? "border-red-500" : ""
          }`}
          {...props}
          type={inputType}
        />

        {(isPassword || IconComp) && (
          <button
            type="button"
            onClick={() => isPassword && setShowPassword(!showPassword)}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-primary"
          >
            {isPassword
              ? showPassword
                ? EyeOffIcon && <EyeOffIcon className="w-5 h-5" /> // password visible → EyeOff
                : EyeIcon && <EyeIcon className="w-5 h-5" />     // password hidden → Eye
              : IconComp && <IconComp className="w-5 h-5" />}
          </button>
        )}
      </div>

      {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
    </div>
  );
};

export default Input;
