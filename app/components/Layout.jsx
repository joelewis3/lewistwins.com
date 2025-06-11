'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import LewisIcon from './LewisIcon';
import GlassButton from './GlassButton';
import DynamicBackground from './DynamicBackground';

export default function Layout({ children, categoryColor = null }) {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  
  // Parallax effect for header
  const headerY = useTransform(scrollY, [0, 300], [0, -50]);
  const headerOpacity = useTransform(scrollY, [0, 100], [1, 0.9]);

  const getBreadcrumbs = () => {
    if (pathname === '/') return [{ label: 'Home', href: '/' }];
    
    const segments = pathname.split('/').filter(Boolean);
    const breadcrumbs = [{ label: 'Home', href: '/' }];
    
    let currentPath = '';
    segments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      if (segment === 'category') {
        breadcrumbs.push({ label: 'Categories', href: currentPath });
      } else if (index === segments.length - 1 && segments[0] === 'category') {
        breadcrumbs.push({ label: 'Category', href: currentPath });
      }
    });
    
    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs();

  // Generate background colors based on category color
  const getBackgroundColors = () => {
    if (categoryColor) {
      // Convert hex to RGB and create complementary colors
      const hexToRgb = (hex) => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16)
        } : { r: 102, g: 126, b: 234 };
      };

      const rgb = hexToRgb(categoryColor);
      // Create a complementary color by shifting hue
      const complementary = {
        r: Math.min(255, Math.max(0, rgb.r + 40)),
        g: Math.min(255, Math.max(0, rgb.g + 20)),
        b: Math.min(255, Math.max(0, rgb.b - 50))
      };

      return {
        primary: categoryColor,
        secondary: `#${complementary.r.toString(16).padStart(2, '0')}${complementary.g.toString(16).padStart(2, '0')}${complementary.b.toString(16).padStart(2, '0')}`
      };
    }
    
    // Default homepage colors
    return {
      primary: '#667eea',
      secondary: '#764ba2'
    };
  };

  const backgroundColors = getBackgroundColors();

  return (
    <div className="min-h-screen relative bg-transparent">
      {/* Dynamic Background */}
      <DynamicBackground 
        primaryColor={backgroundColors.primary}
        secondaryColor={backgroundColors.secondary}
        intensity={categoryColor ? 0.4 : 0.3}
      />
      {/* Fixed Header */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-2xl border border-white/20 border-b border-white/20"
        style={{ y: headerY, opacity: headerOpacity }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Brand - Left Side */}
            <Link href="/" className="flex items-center space-x-3 group">
              <LewisIcon size={40} className="group-hover:scale-110 transition-transform duration-300" />
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h1 className="text-xl font-bold bg-gradient-to-r from-pink-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">Lewis Twins</h1>
                <p className="text-xs text-white/70">Websites</p>
              </motion.div>
            </Link>

            {/* Breadcrumb Navigation - Right Side */}
            <nav className="hidden sm:flex items-center">
              <div className="flex items-center space-x-2">
                {breadcrumbs.map((crumb, index) => (
                  <motion.div
                    key={crumb.href}
                    className="flex items-center"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {index > 0 && (
                      <span className="mx-2 text-white/40">/</span>
                    )}
                    <Link
                      href={crumb.href}
                      className={`px-3 py-1 rounded-lg transition-all duration-300 text-sm ${
                        pathname === crumb.href
                          ? 'bg-white/10 backdrop-blur-md border border-white/20 text-white font-medium'
                          : 'text-white/70 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      {crumb.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </nav>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="relative z-10 pt-16">
        {children}
      </main>



      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent z-50"
        style={{
          scaleX: useTransform(scrollY, [0, 1000], [0, 1]),
          transformOrigin: "left"
        }}
      />
    </div>
  );
} 