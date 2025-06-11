'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import Layout from './components/Layout';
import LewisIcon from './components/LewisIcon';
import CategoryCard from './components/CategoryCard';
import LoadingSpinner from './components/LoadingSpinner';
import PageTransition from './components/PageTransition';

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, -150]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0.3]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      
      // Fetch categories with website counts
      const { data: categoriesData, error: categoriesError } = await supabase
        .from('website_lists')
        .select('id, name, description, color, order_index')
        .order('order_index', { ascending: true });

      if (categoriesError) throw categoriesError;

      // Get website counts for each category
      const categoriesWithCounts = await Promise.all(
        categoriesData.map(async (category) => {
          const { count, error: countError } = await supabase
            .from('websites')
            .select('*', { count: 'exact', head: true })
            .eq('website_list_id', category.id);

          if (countError) {
            console.warn(`Error counting websites for category ${category.id}:`, countError);
            return { ...category, websiteCount: 0 };
          }

          return { ...category, websiteCount: count || 0 };
        })
      );

      setCategories(categoriesWithCounts);
    } catch (err) {
      console.error('Error fetching categories:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const heroVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
        duration: 0.8
      }
    }
  };

  if (error) {
    return (
      <Layout categoryColor={null}>
        <PageTransition>
          <div className="min-h-screen flex items-center justify-center p-8">
            <motion.div
              className="bg-gradient-to-br from-white/15 to-white/8 backdrop-blur-2xl border border-white/30 p-8 rounded-3xl text-center max-w-md shadow-2xl"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-500/20 flex items-center justify-center">
                <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Connection Error</h2>
              <p className="text-white/70 mb-6">{error}</p>
              <button
                onClick={fetchCategories}
                className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-xl border border-white/30 text-white px-6 py-3 rounded-xl shadow-xl hover:scale-105 transition-transform"
              >
                Try Again
              </button>
            </motion.div>
          </div>
        </PageTransition>
      </Layout>
    );
  }

  return (
    <Layout categoryColor={null}>
      <PageTransition>
        {/* Hero Section */}
        <motion.section 
          className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden bg-transparent"
          style={{ y: heroY, opacity: heroOpacity }}
        >


          <motion.div
            className="relative z-10 text-center max-w-4xl mx-auto"
            variants={heroVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Main Logo */}
            <motion.div
              className="mb-8 flex justify-center"
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 1, 0]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <LewisIcon size={120} className="float" />
            </motion.div>

            {/* Title */}
            <motion.h1
              className="text-6xl sm:text-7xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-pink-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-2xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Lewis Twins
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="text-2xl sm:text-3xl md:text-4xl font-light text-white/90 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Websites
            </motion.p>

            {/* Description */}
            <motion.p
              className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto mb-12 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              Discover our curated collection of stunning websites, 
              organized into beautiful categories for your inspiration and exploration.
            </motion.p>

            {/* Scroll indicator */}
            <motion.div
              className="flex flex-col items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.8 }}
            >
              <span className="text-sm text-white/60 mb-2">Explore Categories</span>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <svg className="w-6 h-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.section>

        {/* Categories Section */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-transparent">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-pink-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent mb-4">
                Website Categories
              </h2>
              <p className="text-lg text-white/70 max-w-2xl mx-auto">
                Each category contains carefully selected websites that inspire, educate, and entertain.
              </p>
            </motion.div>

            {/* Loading State */}
            {loading && (
              <motion.div
                className="flex flex-col items-center justify-center py-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <LoadingSpinner size="xl" className="mb-4" />
                <p className="text-white/70 text-lg">Loading amazing categories...</p>
              </motion.div>
            )}

            {/* Categories Grid */}
            {!loading && categories.length > 0 && (
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {categories.map((category, index) => (
                  <CategoryCard
                    key={category.id}
                    {...category}
                    index={index}
                  />
                ))}
              </motion.div>
            )}

            {/* Empty State */}
            {!loading && categories.length === 0 && (
              <motion.div
                className="text-center py-20"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
              >
                <div className="bg-gradient-to-br from-white/15 to-white/8 backdrop-blur-2xl border border-white/30 p-12 rounded-3xl max-w-lg mx-auto shadow-2xl">
                  <LewisIcon size={64} className="mx-auto mb-6 opacity-50" />
                  <h3 className="text-2xl font-bold text-white mb-4">No Categories Yet</h3>
                  <p className="text-white/70">
                    We're working on adding some amazing website categories. Check back soon!
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        </section>

        {/* Footer CTA */}
        <motion.section
          className="relative py-20 px-4 sm:px-6 lg:px-8 bg-transparent"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              className="bg-gradient-to-br from-white/15 to-white/8 backdrop-blur-2xl border border-white/30 p-12 rounded-3xl shadow-2xl"
              whileHover={{ scale: 1.02, y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <LewisIcon size={80} className="mx-auto mb-6 animate-float" />
              <h3 className="text-3xl font-bold bg-gradient-to-r from-pink-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent mb-4">
                Ready to Explore?
              </h3>
              <p className="text-lg text-white/80 mb-8">
                Dive into our curated collections and discover your next favorite website.
              </p>
              <motion.button
                className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-xl border border-white/30 text-white px-8 py-4 text-lg rounded-2xl shadow-xl hover:scale-105 transition-transform"
                onClick={(e) => {
                  e.preventDefault();
                  
                  // Custom slow smooth scroll to top
                  const smoothScrollToTop = () => {
                    const currentScroll = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
                    
                    if (currentScroll > 0) {
                      const startPosition = currentScroll;
                      const startTime = performance.now();
                      const duration = 2000; // 2 seconds for slow, elegant scroll
                      
                      const easeInOutCubic = (t) => {
                        return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
                      };
                      
                      const animateScroll = (currentTime) => {
                        const elapsed = currentTime - startTime;
                        const progress = Math.min(elapsed / duration, 1);
                        const easedProgress = easeInOutCubic(progress);
                        
                        const newPosition = startPosition * (1 - easedProgress);
                        
                        window.scrollTo(0, newPosition);
                        document.documentElement.scrollTop = newPosition;
                        document.body.scrollTop = newPosition;
                        
                        if (progress < 1) {
                          requestAnimationFrame(animateScroll);
                        }
                      };
                      
                      requestAnimationFrame(animateScroll);
                    }
                  };
                  
                  smoothScrollToTop();
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Back to Top ↑
              </motion.button>
            </motion.div>
          </div>
        </motion.section>


      </PageTransition>
    </Layout>
  );
} 