'use client';

import { motion } from 'framer-motion';
import { forwardRef } from 'react';

const GlassButton = forwardRef(({ 
  children, 
  onClick, 
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  loading = false,
  type = 'button',
  ...props 
}, ref) => {
  const baseClasses = "relative inline-flex items-center justify-center font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden";
  
  const variants = {
    primary: "bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-xl text-white border border-white/30 shadow-2xl",
    secondary: "bg-gradient-to-r from-white/15 to-white/8 backdrop-blur-2xl text-white border border-white/40 shadow-2xl", 
    outline: "border-2 border-white/50 text-white hover:bg-white/10",
    ghost: "text-white hover:bg-white/10"
  };

  const sizes = {
    sm: "px-4 py-2 text-sm rounded-lg",
    md: "px-6 py-3 text-base rounded-xl", 
    lg: "px-8 py-4 text-lg rounded-2xl",
    xl: "px-10 py-5 text-xl rounded-3xl"
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.02,
      y: -2,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 15
      }
    },
    tap: { 
      scale: 0.98,
      y: 0,
      transition: {
        type: "spring", 
        stiffness: 600,
        damping: 20
      }
    }
  };

  const glowVariants = {
    initial: { opacity: 0, scale: 0.8 },
    hover: { 
      opacity: 1, 
      scale: 1.1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const rippleVariants = {
    initial: { scale: 0, opacity: 1 },
    animate: { 
      scale: 4, 
      opacity: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const Component = href ? motion.a : motion.button;
  const componentProps = href ? { href } : { type };

  return (
    <Component
      ref={ref}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      variants={buttonVariants}
      initial="initial"
      whileHover="hover"
      whileTap="tap"
      onClick={onClick}
      disabled={disabled || loading}
      {...componentProps}
      {...props}
    >
      {/* Background glow effect */}
      <motion.div
        className="absolute inset-0 rounded-full opacity-0"
        style={{
          background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1)',
          filter: 'blur(20px)',
        }}
        variants={glowVariants}
        initial="initial"
        whileHover="hover"
      />

      {/* Shine effect */}
      <div className="absolute inset-0 rounded-full overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            background: 'linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent)',
            transform: 'translateX(-100%)',
          }}
          whileHover={{
            transform: 'translateX(100%)',
            transition: { duration: 0.6, ease: "easeInOut" }
          }}
        />
      </div>

      {/* Content */}
      <span className="relative z-10 flex items-center gap-2">
        {loading && (
          <motion.div
            className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        )}
        {children}
      </span>

      {/* Ripple effect on click */}
      <motion.div
        className="absolute inset-0 rounded-full bg-white/20"
        variants={rippleVariants}
        initial="initial"
        whileTap="animate"
      />
    </Component>
  );
});

GlassButton.displayName = 'GlassButton';

export default GlassButton; 