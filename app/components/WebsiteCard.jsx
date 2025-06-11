'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export default function WebsiteCard({ title, url, description, categoryColor, index = 0 }) {
  const [isHovered, setIsHovered] = useState(false);

  // Convert hex color to RGB for transparency effects
  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 255, g: 107, b: 107 }; // fallback to pink
  };

  const rgb = hexToRgb(categoryColor || '#ff6b6b');
  const accentColor = `${rgb.r}, ${rgb.g}, ${rgb.b}`;

  // Extract domain from URL
  const getDomain = (url) => {
    try {
      return new URL(url).hostname.replace('www.', '');
    } catch {
      return url;
    }
  };

  const handleClick = () => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 30, 
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 350,
        damping: 25,
        delay: index * 0.05
      }
    },
    hover: {
      scale: 1.03,
      y: -6,
      rotateX: 3,
      rotateY: 3,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 20
      }
    }
  };

  const glowVariants = {
    initial: { opacity: 0, scale: 0.9 },
    hover: { 
      opacity: 0.8, 
      scale: 1.1,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    }
  };

  const iconVariants = {
    initial: { scale: 1, rotate: 0 },
    hover: { 
      scale: 1.1, 
      rotate: 5,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15
      }
    }
  };

  return (
    <motion.div
      className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden cursor-pointer transform-gpu min-h-44 h-auto shadow-xl"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={handleClick}
      style={{
        background: `linear-gradient(135deg, 
          rgba(${accentColor}, 0.12) 0%, 
          rgba(255,255,255,0.06) 50%, 
          rgba(${accentColor}, 0.08) 100%)`,
        borderColor: `rgba(${accentColor}, 0.25)`,
      }}
    >
      {/* Animated glow effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl"
        style={{
          background: `radial-gradient(circle at center, rgba(${accentColor}, 0.3), transparent 70%)`,
          filter: 'blur(15px)',
        }}
        variants={glowVariants}
        initial="initial"
        animate={isHovered ? "hover" : "initial"}
      />

      {/* Shine effect on hover */}
      <div className="absolute inset-0 overflow-hidden rounded-2xl">
        <motion.div
          className="absolute top-0 left-0 w-full h-full opacity-0"
          style={{
            background: `linear-gradient(45deg, transparent, rgba(${accentColor}, 0.15), transparent)`,
          }}
          animate={isHovered ? { 
            opacity: [0, 1, 0],
            x: ['-100%', '100%']
          } : { opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 p-4 h-full flex flex-col justify-between">
        {/* Header */}
        <div className="flex items-start justify-between mb-2">
          <motion.div
            className="w-2 h-2 rounded-full flex-shrink-0 mt-2"
            style={{ backgroundColor: categoryColor || '#ff6b6b' }}
            variants={iconVariants}
            initial="initial"
            animate={isHovered ? "hover" : "initial"}
          />
          
          {/* External Link Icon */}
          <motion.div
            className="p-1 rounded-lg bg-white/10 backdrop-blur-sm"
            variants={iconVariants}
            initial="initial"
            animate={isHovered ? "hover" : "initial"}
          >
            <svg
              className="w-3 h-3 text-white/70"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
              />
            </svg>
          </motion.div>
        </div>

        {/* Title */}
        <motion.h3 
          className="text-lg font-semibold text-white mb-1 line-clamp-2 leading-tight"
          animate={isHovered ? { x: [0, 1, 0] } : { x: 0 }}
          transition={{ duration: 0.4 }}
        >
          {title}
        </motion.h3>

        {/* Domain */}
        <motion.p 
          className="text-xs font-medium mb-2"
          style={{ color: categoryColor || '#ff6b6b' }}
          animate={isHovered ? { opacity: [0.8, 1, 0.8] } : { opacity: 0.8 }}
          transition={{ duration: 1.2, repeat: isHovered ? Infinity : 0 }}
        >
          {getDomain(url)}
        </motion.p>

        {/* Description */}
        <motion.p 
          className="text-white/70 text-xs leading-relaxed line-clamp-3 mb-3 flex-grow"
          animate={isHovered ? { opacity: [0.7, 0.9, 0.7] } : { opacity: 0.7 }}
          transition={{ duration: 1.8, repeat: isHovered ? Infinity : 0 }}
        >
          {description || 'Click to explore this website and discover what it has to offer.'}
        </motion.p>

        {/* Visit button */}
        <motion.div
          className="flex items-center text-white/90 text-xs font-medium"
          animate={isHovered ? { x: [0, 2, 0] } : { x: 0 }}
          transition={{ duration: 0.5, repeat: isHovered ? Infinity : 0 }}
        >
          <span>Visit Site</span>
          <motion.svg
            className="w-3 h-3 ml-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            animate={isHovered ? { x: [0, 2, 0] } : { x: 0 }}
            transition={{ duration: 0.3, repeat: isHovered ? Infinity : 0 }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </motion.svg>
        </motion.div>
      </div>

      {/* Floating sparkles */}
      {isHovered && [...Array(2)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-0.5 h-0.5 rounded-full bg-white"
          style={{ 
            left: `${20 + i * 40}%`,
            top: `${30 + i * 20}%`
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
            y: [0, -15, -30]
          }}
          transition={{
            duration: 1.2,
            delay: i * 0.3,
            repeat: Infinity
          }}
        />
      ))}

      {/* Loading state overlay */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center bg-white/10 backdrop-blur-xl border border-white/30 opacity-0 pointer-events-none"
        animate={isHovered ? { opacity: [0, 0.3, 0] } : { opacity: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>

      {/* Corner accents */}
      <div 
        className="absolute top-1 right-1 w-1 h-1 rounded-full opacity-60"
        style={{ backgroundColor: categoryColor || '#ff6b6b' }}
      />
      <div className="absolute bottom-1 left-1 w-0.5 h-0.5 rounded-full bg-white/40" />
    </motion.div>
  );
} 