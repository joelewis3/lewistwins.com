'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function DynamicBackground({ primaryColor = '#667eea', secondaryColor = '#764ba2', intensity = 0.3 }) {
  console.log('DynamicBackground colors:', { primaryColor, secondaryColor }); // Debug log
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Convert hex to RGB for better blending
  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 102, g: 126, b: 234 };
  };

  const primary = hexToRgb(primaryColor);
  const secondary = hexToRgb(secondaryColor);

  return (
    <div 
      className="fixed inset-0 w-full h-full overflow-hidden" 
      style={{ 
        zIndex: -10,
        background: `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)` // Immediate fallback
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={`${primaryColor}-${secondaryColor}`}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          style={{
            background: `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`
          }}
        />
      </AnimatePresence>

      {/* Animated overlay gradients */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 20% 80%, rgba(${primary.r}, ${primary.g}, ${primary.b}, ${intensity}) 0%, transparent 50%)`
        }}
        animate={{
          backgroundPosition: ['20% 80%', '80% 20%', '40% 40%', '20% 80%']
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Secondary animated overlay */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 60% 30%, rgba(${secondary.r}, ${secondary.g}, ${secondary.b}, ${intensity * 0.7}) 0%, transparent 60%)`
        }}
        animate={{
          backgroundPosition: ['60% 30%', '30% 70%', '70% 50%', '60% 30%']
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />

      {/* Moving orbs */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-64 h-64 rounded-full"
          style={{
            background: `radial-gradient(circle, 
              rgba(${i % 2 === 0 ? primary.r : secondary.r}, 
                   ${i % 2 === 0 ? primary.g : secondary.g}, 
                   ${i % 2 === 0 ? primary.b : secondary.b}, 0.1) 0%, 
              transparent 70%)`,
            filter: 'blur(40px)',
          }}
          animate={{
            x: [0, 200, 0],
            y: [0, -200, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 15 + i * 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 5,
          }}
          initial={{
            left: `${5 + i * 25}%`,
            top: `${10 + i * 20}%`,
          }}
        />
      ))}

      {/* Animated rainbow overlay - reduced opacity */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(270deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #ffeaa7, #fd79a8, #a29bfe)',
          backgroundSize: '400% 400%',
          opacity: 0.1,
        }}
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </div>
  );
} 