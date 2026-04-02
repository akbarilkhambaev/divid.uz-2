'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function AcademyHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Track active section based on scroll position
  useEffect(() => {
    const sections = [
      'hero',
      'about',
      'audience',
      'why',
      'structure',
      'diploma',
      'mentorship',
      'individual',
      'pricing',
      'team',
      'free-lesson',
    ];

    const observerOptions = {
      root: null,
      rootMargin: '-100px 0px -50% 0px', // Top offset for header
      threshold: 0,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions,
    );

    // Observe all sections
    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      sections.forEach((sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, []);
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);

    if (element) {
      // Set active section immediately
      setActiveSection(sectionId);

      // Use scrollIntoView - most reliable method
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });

      // Adjust for fixed header after scroll completes
      setTimeout(() => {
        const yOffset = -80; // height of fixed header
        const y =
          element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }, 500);
    }
  };
  const navItems = [
    { id: 'hero', label: 'Asosiy' },
    { id: 'about', label: 'Biz haqida' },
    { id: 'audience', label: 'Kimlar uchun' },
    { id: 'why', label: 'Nega biz' },
    { id: 'structure', label: 'Tuzilish' },
    { id: 'diploma', label: 'Diplom' },
    { id: 'mentorship', label: 'Mentorlik' },
    { id: 'individual', label: 'Individual' },
    { id: 'pricing', label: 'Narxlar' },
    { id: 'team', label: 'Jamoa' },
    { id: 'free-lesson', label: 'Bepul dars' },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'backdrop-blur-lg bg-white/50 shadow-lg'
          : 'backdrop-blur-md bg-white/50'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex-shrink-0"
          >
            <Image
              src="/DIVIDEND 1.svg"
              alt="Dividend Academy"
              width={150}
              height={40}
              className={`object-contain transition-all duration-300 ${
                scrolled ? 'h-8' : 'h-10'
              }`}
            />
          </Link>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex flex-1 mx-8">
            <ul className="flex items-center justify-center gap-6 w-full">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      console.log('Button clicked for:', item.id);
                      scrollToSection(item.id);
                    }}
                    className={`transition-all text-sm font-medium cursor-pointer relative ${
                      activeSection === item.id
                        ? 'text-cs-blue font-bold'
                        : 'text-gray-700 hover:text-cs-blue'
                    }`}
                  >
                    {item.label}
                    {activeSection === item.id && (
                      <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-cs-blue rounded-full"></span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Navigation - Tablet/Mobile (Dropdown) */}
          <div className="md:hidden relative group">
            <button
              type="button"
              className="px-4 py-2 bg-cs-blue text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors"
            >
              Navigatsiya ▼
            </button>

            <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 max-h-[70vh] overflow-y-auto">
              <div className="p-2">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      console.log('Mobile button clicked for:', item.id);
                      scrollToSection(item.id);
                    }}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors text-sm font-medium cursor-pointer ${
                      activeSection === item.id
                        ? 'bg-cs-blue text-white'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-cs-blue'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
