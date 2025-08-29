import { motion } from "framer-motion";
import { CheckCircle, XCircle } from "lucide-react";

interface MessageProps {
  type: "success" | "error";
  text: string;
}

const Message: React.FC<MessageProps> = ({ type, text }) => {
  const styles =
    type === "success"
      ? "bg-green-100 text-green-700"
      : "bg-red-100 text-red-700";

  const Icon = type === "success" ? CheckCircle : XCircle;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex items-center gap-2 p-2 rounded-lg ${styles}`}
    >
      <Icon className="w-5 h-5" />
      <span>{text}</span>
    </motion.div>
  );
};

export default Message;
