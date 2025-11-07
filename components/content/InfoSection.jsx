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
            title: 'Аудит ва таҳлил хизматлари',
            text: 'Молиявий муаммолар, уларга ечим топиш',
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
      <section className="min-h-full h-full flex items-center justify-center">
        <div className="text-white text-xl">Загрузка...</div>
      </section>
    );
  }

  if (slides.length === 0) {
    return null;
  }

  return (
    <section className="min-h-full h-full">
      <Swiper
        modules={[Autoplay, Pagination]}
        pagination={{ clickable: true }}
        loop={slides.length > 1}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        onSlideChange={(swiper) => setActiveSlide(swiper.realIndex)}
        className="w-full h-[500px] md:h-[600px] lg:h-[700px] m-0 p-0 custom-swiper"
      >
        {slides.map((slide, index) => (
          <SwiperSlide
            key={slide.id}
            className="relative h-[500px] md:h-[600px] lg:h-[700px]"
          >
            {/* Фоновое изображение */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${
                  slide.imageBase64 || slide.image || 'slider/audit.png'
                })`,
              }}
            />

            {/* Затемнение поверх фона */}
            <div className="absolute inset-0 bg-gradient-to-l from-black/100 via-black/90 to-black/50 md:via-black/100 md:to-transparent opacity-100" />

            {/* Контент поверх */}
            <div className="relative z-10 w-full h-full flex flex-col md:flex-row items-center justify-between text-white px-4 md:px-10 py-8 md:py-10">
              {/* Левый блок */}
              <div className="w-full md:w-1/2 mb-6 md:mb-0">
                <h2
                  className={`text-3xl md:text-4xl lg:text-6xl font-bold text-shadow-lg/30 w-full md:w-[80%] mb-4 ${
                    activeSlide === index
                      ? 'animate__animated animate__fadeInLeft'
                      : ''
                  }`}
                >
                  {slide.title}
                </h2>
                <Link
                  href="/services"
                  className={`inline-flex items-center gap-2 text-white bg-cs-blue hover:bg-cs-blue/80 px-4 py-2 rounded-lg shadow-lg transition duration-300 ease-in-out ${
                    activeSlide === index
                      ? 'animate__animated animate__fadeInUpBig'
                      : ''
                  }`}
                >
                  <span className="text-base md:text-lg font-semibold">
                    Копрок маълумот олиш
                  </span>
                  <FaLongArrowAltRight className="text-xl translate-y-[3px]" />
                </Link>
              </div>

              {/* Правый блок */}
              <div className="w-full md:w-1/2 leading-relaxed">
                <h2
                  className={`text-2xl md:text-3xl lg:text-4xl text-shadow-2xs text-shadow-sky-300 ${
                    activeSlide === index
                      ? 'animate__animated animate__fadeInRight'
                      : ''
                  }`}
                >
                  {slide.text}
                </h2>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
