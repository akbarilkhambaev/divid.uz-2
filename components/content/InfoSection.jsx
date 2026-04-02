'use client';
import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { FaLongArrowAltRight } from 'react-icons/fa';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';

import React from 'react';
import Link from 'next/link';
import 'swiper/css';
import 'swiper/css/pagination';
import 'animate.css';

export default function InfoSection() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const q = query(collection(db, 'homeSlider'), orderBy('order', 'asc'));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setSlides(data);
      } catch (error) {
        console.error('Ошибка загрузки слайдов:', error);
        // Fallback на статичные данные при ошибке
        setSlides([
          {
            id: 1,
            title: 'Audit va tahlil xizmatlari',
            text: 'Moliyaviy muammolar, ularga yechim topish',
            image: 'slider/audit.png',
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchSlides();
  }, []);

  if (loading) {
    return (
      <section className="flex h-[420px] min-h-full items-center justify-center bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <div className="text-lg text-white md:text-xl">Yuklanmoqda...</div>
      </section>
    );
  }

  if (slides.length === 0) {
    return null;
  }

  return (
    <section className="relative h-full min-h-full overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <div className="pointer-events-none absolute inset-0 opacity-50">
        <div className="animate-pulse absolute -top-28 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-cs-blue/25 blur-3xl" />
        <div className="animate-pulse absolute bottom-10 left-10 h-56 w-56 rounded-full bg-fuchsia-500/20 blur-3xl" />
        <div className="animate-pulse absolute -bottom-24 right-24 h-72 w-72 rounded-full bg-emerald-500/20 blur-3xl" />
      </div>

      <Swiper
        modules={[Autoplay, Pagination]}
        pagination={{ clickable: true }}
        loop={slides.length > 1}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        onSlideChange={(swiper) => setActiveSlide(swiper.realIndex)}
        className="custom-swiper relative z-10 h-[460px] w-full md:h-[620px] lg:h-[720px]"
      >
        {slides.map((slide, index) => (
          <SwiperSlide
            key={slide.id}
            className="relative h-[460px] md:h-[620px] lg:h-[720px]"
          >
            <div className="absolute inset-0">
              <div
                className="absolute inset-0 bg-cover bg-start"
                style={{
                  backgroundImage: `url(${
                    slide.imageBase64 || slide.image || 'slider/audit.png'
                  })`,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-slate-950/85 via-slate-950/75 to-slate-900/60" />
              <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </div>

            <div className="relative z-10 mx-auto flex h-full w-full max-w-full flex-col justify-start px-4 py-6 md:flex-row md:items-center md:gap-12 md:px-6 md:py-10">
              <div className="w-full md:w-[40%] lg:w-[40%]">
                <div
                  className={`relative overflow-hidden rounded-3xl border border-white/10 bg-white/10 p-5 text-white shadow-xl backdrop-blur-xl transition-all duration-500 sm:p-7 md:p-12 ${
                    activeSlide === index
                      ? 'animate__animated animate__fadeInLeft'
                      : ''
                  }`}
                >
                  <div className="absolute inset-px rounded-[inherit] border border-white/10 opacity-60" />
                  <h2 className="relative text-left text-xl font-bold leading-tight sm:text-2xl md:text-4xl lg:text-5xl">
                    {slide.title}
                  </h2>
                  <div
                    className="relative mt-3 max-w-3xl text-left text-sm text-slate-200 sm:mt-4 md:mt-6 md:text-lg [&_p]:mb-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5"
                    dangerouslySetInnerHTML={{ __html: slide.text || '' }}
                  />

                  <Link
                    href="/services"
                    className={`relative mt-5 inline-flex items-center gap-2 rounded-full border border-cs-blue/70 bg-cs-blue/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-cs-blue transition duration-300 hover:border-white/60 hover:bg-white/20 hover:text-white sm:px-6 sm:py-2.5 sm:tracking-[0.3em] md:mt-10 md:gap-3 md:px-7 md:py-3 md:text-sm md:tracking-[0.4em] ${
                      activeSlide === index
                        ? 'animate__animated animate__fadeInUpBig'
                        : ''
                    }`}
                  >
                    Ko‘proq ma'lumot olish
                    <FaLongArrowAltRight className="text-sm md:text-lg" />
                  </Link>
                </div>
              </div>

              {/* <div className="mt-10 w-full md:mt-0 md:w-[40%]">
                <div
                  className={`rounded-3xl border border-white/10 bg-white/5 p-6 text-left text-slate-100 backdrop-blur-lg transition-all duration-500 ${
                    activeSlide === index
                      ? 'animate__animated animate__fadeInRight'
                      : ''
                  }`}
                >
                  <p className="text-lg font-semibold uppercase tracking-[0.25em] text-slate-200">
                    янги слайд {String(index + 1).padStart(2, '0')}
                  </p>
                  <p className="mt-4 text-sm text-slate-300 md:text-base">
                    {slide.description || slide.text || 'Таъриф янгиланмоқда'}
                  </p>
                </div>
              </div> */}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
