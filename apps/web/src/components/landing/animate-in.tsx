"use client";
import { motion } from "framer-motion";

function AnimateIn({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      transition={{
        duration: 0.5,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default AnimateIn;
