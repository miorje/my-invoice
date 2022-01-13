import { FunctionComponent } from "react";
import { motion } from "framer-motion";

export const Title: FunctionComponent = ({ children }) => {
  return (
    <motion.h1
      initial={{ opacity: 0.2, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 80,
        damping: 10,
      }}
      className="mt-20 mb-8 text-2xl font-extrabold text-gray-800 md:max-w-4xl sm:text-3xl"
    >
      {children}
    </motion.h1>
  );
};
