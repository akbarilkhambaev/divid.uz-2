'use client';
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { FaLongArrowAltRight } from 'react-icons/fa';

import React from 'react';
import Link from 'next/link';
import 'swiper/css';
import 'swiper/css/pagination';
import 'animate.css';

export default function InfoSection() {
  const [activeSlide, setActiveSlide] = useState(0);
  const slides = [
    {
      id: 1,
      title: 'Аудит ва таҳлил хизматлари',
      text: 'Молиявий муаммолар, уларга ечим топиш, лорем ипсум ис доп сит амет, лоагр перпедуа, оавпоапоашпшо лоаща ашвповщашпвашшати пловаапшвашвапол',
      image: 'slider/audit.png',
    },
    {
      id: 2,
      title: 'Молиявий консалтинг ва бошқарув',
      text: 'Молиявий ҳисоботлар, бюджетлаш ва молиявий режалаштириш бўйича маслаҳатлар.',
      image: 'slider/moliya.png',
    },
    {
      id: 3,
      title: 'HR ва кадрлар билан ишлаш',
      text: 'Кадрлар билан ишлаш, HR стратегияси ва бошқаруви бўйича маслаҳатлар.',
      image: 'slider/hr.jpg',
    },
    {
      id: 4,
      title: 'Юридик ва ҳуқуқий хизматлар',
      text: 'Юридик маслаҳатлар, шартномаларни тузиш ва ҳуқуқий ҳимоя.',
      image: 'slider/law.jpg',
    },
  ];

  return (
    <section className="min-h-full h-full">
      <Swiper
        modules={[Autoplay, Pagination]}
        pagination={{ clickable: true }}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        onSlideChange={(swiper) => setActiveSlide(swiper.realIndex)} // Обновляем активный слайд
        className="w-full h-[700px] m-0 p-0 custom-swiper"
      >
        {slides.map((slide, index) => (
          <SwiperSlide
            key={slide.id}
            className="relative h-[700px]"
          >
            {/* Фоновое изображение */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${slide.image})`,
              }}
            />

            {/* Затемнение поверх фона */}
            <div className="absolute inset-0 bg-gradient-to-l from-black/100 via-black/100 to-transparent opacity-100" />

            {/* Контент поверх */}
            <div className="relative z-10 w-full h-full flex items-center justify-between text-white px-10 py-10">
              {/* Левый блок */}
              <div className="w-1/2">
                <h2
                  className={`text-6xl font-bold text-shadow-lg/30 w-[80%] mb-4 ${
                    activeSlide === index
                      ? 'animate__animated animate__fadeInLeft'
                      : ''
                  }`}
                >
                  {slide.title}
                </h2>
                <Link
                  href="#"
                  className={`inline-flex items-center gap-2 text-white bg-cs-blue hover:bg-cs-blue/80 px-4 py-2 translate-y-1 rounded-lg shadow-lg transition duration-300 ease-in-out ${
                    activeSlide === index
                      ? 'animate__animated animate__fadeInUpBig'
                      : ''
                  }`}
                >
                  <span className="text-lg font-semibold">
                    Копрок маълумот олиш
                  </span>
                  <FaLongArrowAltRight className="text-xl translate-y-[3px]" />
                </Link>
              </div>

              {/* Правый блок */}
              <div className="w-1/2 leading-relaxed">
                <h2
                  className={`text-4xl text-shadow-2xs text-shadow-sky-300 ${
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
