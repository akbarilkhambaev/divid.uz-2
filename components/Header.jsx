'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiPhone } from 'react-icons/fi';
import { FaInstagram, FaFacebook, FaTwitter, FaTelegram } from 'react-icons/fa';
import 'animate.css';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* Вся шапка фиксированная */}
      <div
        className={`fixed top-0 left-0 w-full bg-white z-50 transition-transform duration-300 ${
          scrolled ? '-translate-y-[48px]' : 'translate-y-0'
        }`}
      >
        {/* Верхняя часть (48px) */}
        <div className=" h-12 flex px-4 py-2 justify-between bg-cs-blue text-cs-white items-center border-b border-gray-200">
          <Link
            href="tel:+998712000000"
            className="flex items-center"
          >
            <FiPhone className="text-cs-white text-xl mx-2" />
            <span
              className="text-cs-white text-sm uppercase underline underline-offset-2 decoration-dotted
 mx-2"
            >
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

        {/* Навигация (высота 80px = h-20) */}
        <div className="h-20 flex items-center shadow-md">
          <div className="w-full mx-auto px-4 flex items-center justify-between">
            <Link
              href="/"
              className="px-2 py-3"
            >
              <Image
                src="/DIVIDEND 1.svg"
                alt="divid"
                width={150}
                height={80}
                className="object-contain h-10"
              />
            </Link>
            <nav>
              <ul className="flex items-center gap-7 text-gray-800 text-lg uppercase">
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
                    href="/contacts"
                    className="hover:text-cs-blue"
                  >
                    DIVIDEND <span className="text-cs-blue">ACADEMY</span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>

      {/* Отступ под всю шапку (48 + 80 = 128px) */}
      <div className="pt-[120px]" />
    </>
  );
}
