import { motion } from "framer-motion";

interface CardProps {
  children: React.ReactNode;
  title?: string;
  className: string;
}

const Card: React.FC<CardProps> = ({ children, title }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md mx-auto"
    >
      {title && <h2 className="text-xl font-bold mb-4 text-center">{title}</h2>}
      {children}
    </motion.div>
  );
};

export default Card;
