'use client';

import { motion, AnimatePresence } from 'framer-motion';

const pageVariants = {
  initial: { 
    opacity: 0, 
    y: 50, 
    scale: 0.95
  },
  enter: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
      duration: 0.6
    }
  },
  exit: { 
    opacity: 0, 
    y: -50, 
    scale: 1.05,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 40,
      duration: 0.4
    }
  }
};

export default function PageTransition({ children, className = '' }) {
  return (
    <motion.div
      className={`w-full ${className}`}
      variants={pageVariants}
      initial="initial"
      animate="enter"
      exit="exit"
    >
      {children}
    </motion.div>
  );
}

export function PageTransitionWrapper({ children, router }) {
  return (
    <AnimatePresence 
      mode="wait"
      onExitComplete={() => window.scrollTo(0, 0)}
    >
      <PageTransition key={router?.asPath || 'default'}>
        {children}
      </PageTransition>
    </AnimatePresence>
  );
} 