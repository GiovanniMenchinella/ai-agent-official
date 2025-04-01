
import React, { useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Features from '@/components/Features'
import FAQ from '@/components/FAQ'
import Footer from '@/components/Footer'
import { SplashCursor } from '@/components/ui/splash-cursor'

const Index = () => {
  // Smooth scrolling for anchor links
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchorLink = target.closest('a[href^="#"]');
      
      if (anchorLink) {
        e.preventDefault();
        const targetId = anchorLink.getAttribute('href');
        if (targetId && targetId !== '#') {
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
            window.scrollTo({
              top: targetElement.getBoundingClientRect().top + window.scrollY - 100,
              behavior: 'smooth'
            });
          }
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  return (
    <main className="min-h-screen overflow-hidden">
      {/* Fluid animation only on home page */}
      <SplashCursor 
        COLOR_UPDATE_SPEED={5}
        SPLAT_RADIUS={0.3}
        SPLAT_FORCE={6000}
        SHADING={true}
        BACK_COLOR={{ r: 0.15, g: 0.1, b: 0.3 }}
        CURL={20}
      />
      <Navbar />
      <Hero />
      <Features />
      <FAQ />
      <Footer />
    </main>
  )
}

export default Index
