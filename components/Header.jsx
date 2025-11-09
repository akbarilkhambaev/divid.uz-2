'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiPhone, FiMenu, FiX } from 'react-icons/fi';
import { FaInstagram, FaFacebook, FaTwitter, FaTelegram } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import 'animate.css';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Закрываем меню при изменении размера экрана
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [mobileMenuOpen]);

  // Блокируем скролл когда меню открыто
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

  return (
    <>
      {/* Вся шапка фиксированная */}
      <div
        className={`fixed top-0 left-0 w-full bg-white z-50 transition-transform duration-300 ${
          scrolled ? 'md:-translate-y-[48px] -translate-y-0' : 'translate-y-0'
        }`}
      >
        {/* Верхняя часть (48px) - скрывается на мобильных */}
        <div className="hidden md:flex h-12 px-4 py-2 justify-between bg-cs-blue text-cs-white items-center border-b border-gray-200">
          <Link
            href="tel:+998712000000"
            className="flex items-center"
          >
            <FiPhone className="text-cs-white text-xl mx-2" />
            <span className="text-cs-white text-sm uppercase underline underline-offset-2 decoration-dotted mx-2">
              биз билан боғланинг
            </span>
          </Link>
          <div className="flex items-center gap-2">
            <div className="flex flex-col">
              <Link href="">
                <span className="text-[10px] uppercase underline underline-offset-2 decoration-dotted">
                  Юнусобод т. Бектемир 87
                </span>
              </Link>
              <Link
                href="tel:+998712000000"
                className="text-[10px] uppercase"
              >
                +998 71 000 00 00
              </Link>
            </div>
            <Link
              href="#"
              className="flex items-center"
            >
              <FaInstagram className="text-cs-white text-xl mx-2" />
            </Link>
            <Link
              href="#"
              className="flex items-center"
            >
              <FaFacebook className="text-cs-white text-xl mx-2" />
            </Link>
            <Link
              href="#"
              className="flex items-center"
            >
              <FaTelegram className="text-cs-white text-xl mx-2" />
            </Link>
          </div>
        </div>

        {/* Навигация */}
        <div
          className={`flex items-center shadow-md transition-all duration-300 ${
            scrolled ? 'h-14 md:h-16' : 'h-16 md:h-20'
          }`}
        >
          <div className="w-full mx-auto px-4 flex items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="px-2 py-3"
            >
              <Image
                src="/DIVIDEND 1.svg"
                alt="divid"
                width={150}
                height={80}
                className={`object-contain transition-all duration-300 ${
                  scrolled ? 'h-6 md:h-8' : 'h-8 md:h-10'
                }`}
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:block">
              <ul
                className={`flex items-center gap-4 xl:gap-7 text-gray-800 uppercase transition-all duration-300 ${
                  scrolled ? 'text-sm xl:text-base' : 'text-base xl:text-lg'
                }`}
              >
                <li className="hover:border-cs-blue border-b-2 border-transparent transition">
                  <Link
                    href="/#about_us"
                    className="hover:text-cs-blue"
                  >
                    Биз хакимизда
                  </Link>
                </li>
                <li className="hover:border-cs-blue border-b-2 border-transparent transition">
                  <Link
                    href="/services"
                    className="hover:text-cs-blue"
                  >
                    Хизматлар
                  </Link>
                </li>
                <li className="hover:border-cs-blue border-b-2 border-transparent transition">
                  <Link
                    href="/media"
                    className="hover:text-cs-blue"
                  >
                    Янгиликлар
                  </Link>
                </li>
                <li className="hover:border-cs-blue border-b-2 border-transparent transition">
                  <Link
                    href="/contacts"
                    className="hover:text-cs-blue"
                  >
                    Контактлар
                  </Link>
                </li>
                <li className="hover:border-cs-blue border-b-2 border-transparent transition">
                  <Link
                    href="/academy"
                    className="hover:text-cs-blue"
                  >
                    DIVIDEND <span className="text-cs-blue">ACADEMY</span>
                  </Link>
                </li>
              </ul>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden p-2 text-gray-800 hover:text-cs-blue transition-all duration-300 ${
                scrolled ? 'text-2xl' : 'text-3xl'
              }`}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <FiX className={scrolled ? 'text-2xl' : 'text-3xl'} />
              ) : (
                <FiMenu className={scrolled ? 'text-2xl' : 'text-3xl'} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              style={{ top: scrolled ? '56px' : '64px' }}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className={`fixed right-0 w-80 bg-white shadow-2xl z-50 lg:hidden overflow-y-auto transition-all duration-300 ${
                scrolled
                  ? 'top-14 h-[calc(100vh-3.5rem)]'
                  : 'top-16 h-[calc(100vh-4rem)]'
              }`}
            >
              <nav className="p-6">
                <ul className="space-y-4">
                  <li>
                    <Link
                      href="/#about_us"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-gray-800 hover:text-cs-blue text-lg font-medium py-3 px-4 rounded-lg hover:bg-gray-100 transition uppercase"
                    >
                      Биз хакимизда
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/services"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-gray-800 hover:text-cs-blue text-lg font-medium py-3 px-4 rounded-lg hover:bg-gray-100 transition uppercase"
                    >
                      Хизматлар
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/media"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-gray-800 hover:text-cs-blue text-lg font-medium py-3 px-4 rounded-lg hover:bg-gray-100 transition uppercase"
                    >
                      Янгиликлар
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/contacts"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-gray-800 hover:text-cs-blue text-lg font-medium py-3 px-4 rounded-lg hover:bg-gray-100 transition uppercase"
                    >
                      Контактлар
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/academy"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-gray-800 hover:text-cs-blue text-lg font-medium py-3 px-4 rounded-lg hover:bg-gray-100 transition uppercase"
                    >
                      DIVIDEND <span className="text-cs-blue">ACADEMY</span>
                    </Link>
                  </li>
                </ul>

                {/* Contact Info in Mobile Menu */}
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <div className="space-y-4">
                    <Link
                      href="tel:+998712000000"
                      className="flex items-center text-gray-700 hover:text-cs-blue"
                    >
                      <FiPhone className="text-xl mr-3" />
                      <span>+998 71 000 00 00</span>
                    </Link>
                    <p className="text-sm text-gray-600">
                      Юнусобод т. Бектемир 87
                    </p>
                  </div>

                  {/* Social Links */}
                  <div className="flex gap-4 mt-6">
                    <Link
                      href="#"
                      className="text-gray-700 hover:text-cs-blue transition"
                    >
                      <FaInstagram className="text-2xl" />
                    </Link>
                    <Link
                      href="#"
                      className="text-gray-700 hover:text-cs-blue transition"
                    >
                      <FaFacebook className="text-2xl" />
                    </Link>
                    <Link
                      href="#"
                      className="text-gray-700 hover:text-cs-blue transition"
                    >
                      <FaTelegram className="text-2xl" />
                    </Link>
                  </div>
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Отступ под шапку */}
      <div
        className={`transition-all duration-300 ${
          scrolled ? 'pt-14 md:pt-16' : 'pt-16 md:pt-[120px]'
        }`}
      />
    </>
  );
}
