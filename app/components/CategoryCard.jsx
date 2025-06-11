'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';

export default function CategoryCard({ id, name, description, color, websiteCount, index = 0 }) {
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

  const rgb = hexToRgb(color || '#ff6b6b');
  const accentColor = `${rgb.r}, ${rgb.g}, ${rgb.b}`;

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50, 
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
        delay: index * 0.1
      }
    },
    hover: {
      scale: 1.02,
      y: -8,
      rotateX: 5,
      rotateY: 5,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 15
      }
    }
  };

  const glowVariants = {
    initial: { opacity: 0, scale: 0.8 },
    hover: { 
      opacity: 0.6, 
      scale: 1.2,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const shimmerVariants = {
    initial: { x: '-100%' },
    hover: { 
      x: '100%',
      transition: {
        duration: 0.8,
        ease: "easeInOut"
      }
    }
  };

  return (
    <Link href={`/category/${id}`} className="block group">
      <motion.div
        className="relative h-64 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden cursor-pointer transform-gpu shadow-2xl"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        whileHover="hover"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        style={{
          background: `linear-gradient(135deg, 
            rgba(${accentColor}, 0.15) 0%, 
            rgba(255,255,255,0.08) 50%, 
            rgba(${accentColor}, 0.1) 100%)`,
          borderColor: `rgba(${accentColor}, 0.3)`,
        }}
      >
        {/* Animated glow effect */}
        <motion.div
          className="absolute inset-0 rounded-2xl"
          style={{
            background: `radial-gradient(circle at center, rgba(${accentColor}, 0.4), transparent 70%)`,
            filter: 'blur(20px)',
          }}
          variants={glowVariants}
          initial="initial"
          animate={isHovered ? "hover" : "initial"}
        />

        {/* Shimmer effect */}
        <div className="absolute inset-0 overflow-hidden rounded-2xl">
          <motion.div
            className="absolute top-0 left-0 w-full h-full opacity-0 group-hover:opacity-100"
            style={{
              background: `linear-gradient(45deg, transparent, rgba(${accentColor}, 0.2), transparent)`,
            }}
            variants={shimmerVariants}
            initial="initial"
            animate={isHovered ? "hover" : "initial"}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 p-6 h-full flex flex-col justify-between">
          {/* Header with accent color indicator */}
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <motion.div
                className="w-3 h-3 rounded-full mb-3"
                style={{ backgroundColor: color || '#ff6b6b' }}
                animate={isHovered ? { scale: [1, 1.2, 1] } : { scale: 1 }}
                transition={{ duration: 0.6, repeat: isHovered ? Infinity : 0 }}
              />
              <motion.h3 
                className="text-xl font-bold text-white mb-2 line-clamp-2"
                animate={isHovered ? { x: [0, 2, 0] } : { x: 0 }}
                transition={{ duration: 0.3 }}
              >
                {name}
              </motion.h3>
            </div>
            
            {/* Website count badge */}
            <motion.div
              className="flex items-center justify-center w-8 h-8 rounded-full text-xs font-semibold text-white"
              style={{
                background: `linear-gradient(45deg, rgba(${accentColor}, 0.8), rgba(${accentColor}, 0.6))`,
                boxShadow: `0 4px 15px rgba(${accentColor}, 0.3)`
              }}
              animate={isHovered ? { rotate: [0, 5, -5, 0] } : { rotate: 0 }}
              transition={{ duration: 0.5 }}
            >
              {websiteCount || 0}
            </motion.div>
          </div>

          {/* Description */}
          <motion.p 
            className="text-white/80 text-sm leading-relaxed line-clamp-3 mb-4"
            animate={isHovered ? { opacity: [0.8, 1, 0.8] } : { opacity: 0.8 }}
            transition={{ duration: 1.5, repeat: isHovered ? Infinity : 0 }}
          >
            {description || 'Explore this collection of carefully curated websites.'}
          </motion.p>

          {/* Call to action */}
          <motion.div
            className="flex items-center text-white/90 text-sm font-medium"
            animate={isHovered ? { x: [0, 4, 0] } : { x: 0 }}
            transition={{ duration: 0.6, repeat: isHovered ? Infinity : 0 }}
          >
            <span>Explore Collection</span>
            <motion.svg
              className="w-4 h-4 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              animate={isHovered ? { x: [0, 3, 0] } : { x: 0 }}
              transition={{ duration: 0.4, repeat: isHovered ? Infinity : 0 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </motion.svg>
          </motion.div>
        </div>

        {/* Floating particles */}
        {isHovered && [...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{ 
              backgroundColor: color || '#ff6b6b',
              left: `${30 + i * 20}%`,
              top: `${40 + i * 10}%`
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              y: [0, -20, -40]
            }}
            transition={{
              duration: 1.5,
              delay: i * 0.2,
              repeat: Infinity
            }}
          />
        ))}

        {/* Corner decoration */}
        <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-white/20" />
        <div className="absolute bottom-2 left-2 w-1 h-1 rounded-full bg-white/30" />
      </motion.div>
    </Link>
  );
} 