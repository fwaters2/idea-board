import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ReactElement } from "react";
import "./cards.css";

interface CardsProps {
  children: ReactElement[];
}

export const Cards = (props: CardsProps) => {
  const { children } = props;
  return (
    <ul className="cards">
      <AnimatePresence>
        {children.map((child) => (
          <motion.li
            key={child.key}
            initial={{ opacity: 0, x: -500 }}
            animate={{
              x: 0,
              opacity: 1,
              transition: { delay: 0.5 },
              scale: 1,
            }}
            exit={{
              opacity: 0,
              scale: 0,
            }}
            layout="position"
          >
            {child}
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  );
};
