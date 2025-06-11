'use client';

import { motion } from 'framer-motion';

export default function LoadingSpinner({ size = 'md', className = '' }) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-12 h-12', 
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  };

  const dotSizes = {
    sm: 'w-1 h-1',
    md: 'w-2 h-2',
    lg: 'w-3 h-3', 
    xl: 'w-4 h-4'
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <motion.div 
        className={`relative ${sizeClasses[size]}`}
        animate={{ rotate: 360 }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        {/* Outer ring */}
        <div className="absolute inset-0 glass rounded-full opacity-40" />
        
        {/* Animated dots */}
        {[0, 1, 2, 3, 4, 5].map((index) => (
          <motion.div
            key={index}
            className={`absolute ${dotSizes[size]} rounded-full`}
            style={{
              background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1)',
              top: '50%',
              left: '50%',
              transformOrigin: `0 ${size === 'sm' ? '12px' : size === 'md' ? '24px' : size === 'lg' ? '32px' : '48px'}`,
              transform: `rotate(${index * 60}deg) translateY(-50%)`
            }}
            animate={{
              scale: [0.8, 1.2, 0.8],
              opacity: [0.4, 1, 0.4]
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              delay: index * 0.2,
              ease: "easeInOut"
            }}
          />
        ))}
        
        {/* Center glow */}
        <motion.div
          className="absolute inset-0 rounded-full blur-sm"
          style={{
            background: 'radial-gradient(circle, rgba(255,255,255,0.3), transparent)'
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>
    </div>
  );
} 