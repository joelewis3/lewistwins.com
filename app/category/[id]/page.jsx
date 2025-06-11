'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '../../../lib/supabase';
import Layout from '../../components/Layout';
import WebsiteCard from '../../components/WebsiteCard';
import LoadingSpinner from '../../components/LoadingSpinner';
import PageTransition from '../../components/PageTransition';
import GlassButton from '../../components/GlassButton';
import LewisIcon from '../../components/LewisIcon';

export default function CategoryPage() {
  const params = useParams();
  const router = useRouter();
  const { id } = params;
  
  const [category, setCategory] = useState(null);
  const [websites, setWebsites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { scrollY } = useScroll();
  const headerY = useTransform(scrollY, [0, 300], [0, -50]);
  const headerOpacity = useTransform(scrollY, [0, 200], [1, 0.8]);

  useEffect(() => {
    if (id) {
      fetchCategoryData();
    }
  }, [id]);

  const fetchCategoryData = async () => {
    try {
      setLoading(true);
      
      // Fetch category details
      const { data: categoryData, error: categoryError } = await supabase
        .from('website_lists')
        .select('*')
        .eq('id', id)
        .single();

      if (categoryError) throw categoryError;
      setCategory(categoryData);

      // Fetch websites in this category
      const { data: websitesData, error: websitesError } = await supabase
        .from('websites')
        .select('*')
        .eq('website_list_id', id)
        .order('order_index', { ascending: true });

      if (websitesError) throw websitesError;
      setWebsites(websitesData || []);

    } catch (err) {
      console.error('Error fetching category data:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Convert hex color to RGB for transparency effects
  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 255, g: 107, b: 107 };
  };

  const rgb = category ? hexToRgb(category.color) : { r: 255, g: 107, b: 107 };
  const accentColor = `${rgb.r}, ${rgb.g}, ${rgb.b}`;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  };

  const headerVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
        duration: 0.6
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
              <h2 className="text-2xl font-bold text-white mb-2">Category Not Found</h2>
              <p className="text-white/70 mb-6">{error}</p>
              <GlassButton onClick={() => router.push('/')}>
                ← Back to Home
              </GlassButton>
            </motion.div>
          </div>
        </PageTransition>
      </Layout>
    );
  }

  return (
    <Layout categoryColor={category?.color}>
      <PageTransition>
        {/* Hero Header */}
        <motion.section 
          className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-transparent"
          style={{ y: headerY, opacity: headerOpacity }}
        >


          <div className="max-w-4xl mx-auto text-center relative z-10">
            <motion.div
              variants={headerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Back Button */}
              <motion.div
                className="flex justify-center mb-8"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <GlassButton
                  onClick={() => router.push('/')}
                  variant="outline"
                  className="group"
                >
                  <motion.svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    animate={{ x: [0, -2, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </motion.svg>
                  Back to Categories
                </GlassButton>
              </motion.div>

              {/* Category Indicator */}
              {category && (
                <motion.div
                  className="flex justify-center mb-6"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
                >
                  <motion.div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: category.color }}
                    animate={{ 
                      scale: [1, 1.3, 1],
                      boxShadow: [
                        `0 0 0 0 rgba(${accentColor}, 0.4)`,
                        `0 0 0 10px rgba(${accentColor}, 0)`,
                        `0 0 0 0 rgba(${accentColor}, 0)`
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </motion.div>
              )}

              {/* Loading State */}
              {loading && (
                <motion.div
                  className="py-20"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <LoadingSpinner size="lg" className="mb-4" />
                  <p className="text-white/70 text-lg">Loading category...</p>
                </motion.div>
              )}

              {/* Category Info */}
              {!loading && category && (
                <>
                  <motion.h1
                    className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-white"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    {category.name}
                  </motion.h1>

                  <motion.p
                    className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-8 leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    {category.description || 'Explore this curated collection of websites.'}
                  </motion.p>

                  <motion.div
                    className="flex items-center justify-center gap-6 text-white/60"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                      </svg>
                      <span>{websites.length} Website{websites.length !== 1 ? 's' : ''}</span>
                    </div>
                  </motion.div>
                </>
              )}
            </motion.div>
          </div>
        </motion.section>

        {/* Websites Grid */}
        <section className="relative py-10 px-4 sm:px-6 lg:px-8 bg-transparent">
          <div className="max-w-7xl mx-auto">
            {!loading && websites.length > 0 && (
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {websites.map((website, index) => (
                  <WebsiteCard
                    key={website.id}
                    title={website.title}
                    url={website.url}
                    description={website.description}
                    categoryColor={category?.color}
                    index={index}
                  />
                ))}
              </motion.div>
            )}

            {/* Empty State */}
            {!loading && websites.length === 0 && category && (
              <motion.div
                className="text-center py-20"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
              >
                <motion.div
                  className="bg-gradient-to-br from-white/15 to-white/8 backdrop-blur-2xl border border-white/30 p-12 rounded-3xl max-w-lg mx-auto shadow-2xl"
                  style={{
                    background: `linear-gradient(135deg, 
                      rgba(${accentColor}, 0.1) 0%, 
                      rgba(255,255,255,0.05) 100%)`,
                    borderColor: `rgba(${accentColor}, 0.2)`,
                  }}
                >
                  <LewisIcon size={64} className="mx-auto mb-6 opacity-50" />
                  <h3 className="text-2xl font-bold text-white mb-4">No Websites Yet</h3>
                  <p className="text-white/70 mb-8">
                    This category is waiting for amazing websites to be added. Check back soon!
                  </p>
                  <GlassButton onClick={() => router.push('/')}>
                    ← Explore Other Categories
                  </GlassButton>
                </motion.div>
              </motion.div>
            )}
          </div>
        </section>

        {/* Floating Action Button */}
        <motion.div
          className="fixed bottom-8 right-8 z-40"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, type: "spring", stiffness: 300 }}
        >
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <GlassButton
              onClick={() => {
                router.push('/');
              }}
              className="w-14 h-14 rounded-full p-0 shadow-2xl"
              style={{
                background: `linear-gradient(135deg, rgba(${accentColor}, 0.2), rgba(255,255,255,0.1))`,
                borderColor: `rgba(${accentColor}, 0.3)`,
              }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m0 0V11a1 1 0 011-1h2a1 1 0 011 1v10m0 0h3a1 1 0 001-1V10M9 21h6" />
              </svg>
            </GlassButton>
          </motion.div>
        </motion.div>
      </PageTransition>
    </Layout>
  );
} 