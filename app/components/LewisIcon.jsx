'use client';

import { motion } from 'framer-motion';

export default function LewisIcon({ size = 48, className = '', animated = true }) {
  const iconVariants = {
    initial: { scale: 0, rotate: -180 },
    animate: { 
      scale: 1, 
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
        delay: 0.2
      }
    },
    hover: {
      scale: 1.1,
      rotate: 5,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 15
      }
    }
  };

  const glowVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: [0, 0.8, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse"
      }
    }
  };

  return (
    <motion.div 
      className={`relative ${className}`}
      variants={animated ? iconVariants : {}}
      initial="initial"
      animate="animate"
      whileHover="hover"
      style={{ width: size, height: size }}
    >
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-full blur-xl"
        style={{
          background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1)',
          filter: 'blur(20px)',
        }}
        variants={glowVariants}
        initial="initial"
        animate="animate"
      />
      
      {/* Main icon */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        className="relative z-10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background circle with glass effect */}
        <defs>
          <linearGradient id="glassGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: 'rgba(255,255,255,0.2)' }} />
            <stop offset="50%" style={{ stopColor: 'rgba(255,255,255,0.1)' }} />
            <stop offset="100%" style={{ stopColor: 'rgba(255,255,255,0.05)' }} />
          </linearGradient>
          <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#ff6b6b' }} />
            <stop offset="33%" style={{ stopColor: '#4ecdc4' }} />
            <stop offset="66%" style={{ stopColor: '#45b7d1' }} />
            <stop offset="100%" style={{ stopColor: '#96ceb4' }} />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Glass circle background */}
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="url(#glassGradient)"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="1"
          style={{
            backdropFilter: 'blur(20px)',
            filter: 'drop-shadow(0 8px 32px rgba(0,0,0,0.1))'
          }}
        />
        
        {/* Inner geometric pattern */}
        <path
          d="M25 35 L50 25 L75 35 L75 65 L50 75 L25 65 Z"
          fill="none"
          stroke="url(#textGradient)"
          strokeWidth="2"
          opacity="0.6"
        />
        
        {/* L letter */}
        <path
          d="M30 30 L30 55 L45 55"
          stroke="url(#textGradient)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#glow)"
        />
        
        {/* T letter */}
        <path
          d="M55 30 L70 30 M62.5 30 L62.5 55"
          stroke="url(#textGradient)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#glow)"
        />
        
        {/* Decorative dots */}
        <circle cx="35" cy="65" r="2" fill="url(#textGradient)" opacity="0.8" />
        <circle cx="50" cy="68" r="1.5" fill="url(#textGradient)" opacity="0.6" />
        <circle cx="65" cy="65" r="2" fill="url(#textGradient)" opacity="0.8" />
      </svg>
      
      {/* Sparkle effects */}
      <motion.div
        className="absolute top-2 right-2 w-1 h-1 bg-white rounded-full"
        animate={{
          opacity: [0, 1, 0],
          scale: [0, 1, 0]
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          delay: 0.5
        }}
      />
      <motion.div
        className="absolute bottom-3 left-3 w-0.5 h-0.5 bg-white rounded-full"
        animate={{
          opacity: [0, 1, 0],
          scale: [0, 1, 0]
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          delay: 1
        }}
      />
    </motion.div>
  );
} 