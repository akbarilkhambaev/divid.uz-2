'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import {
  FaBriefcase,
  FaUsers,
  FaChartLine,
  FaAward,
  FaCheckCircle,
} from 'react-icons/fa';
import CountUp from 'react-countup';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function AboutServicesSection() {
  const timelineItems = [
    'Бухгалтерия ва хужжатларни тартибга солиш',
    'Харажатларни камайтириш ва даромадни ошириш',
    'Ходимлар бошқарувини автоматлаштириш',
    'Бизнесни кенгайтириш ёки сармоя жалб қилишга тайёргарлик',
  ];

  const sectionRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from('.about-title', {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.about-title',
          start: 'top 80%',
        },
      });

      gsap.from('.about-timeline-item', {
        opacity: 0,
        x: -40,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.15,
        scrollTrigger: {
          trigger: '.about-timeline',
          start: 'top 75%',
        },
      });

      gsap.fromTo(
        '.about-services-image',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.about-image-wrapper',
            start: 'top 80%',
          },
        }
      );

      gsap.from('.about-stat-card', {
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: 'power2.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: '.about-stat-grid',
          start: 'top 80%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-full h-full w-full bg-gray-900 text-white py-16 px-6"
    >
      {/* Заголовок */}
      <div className="text-center mb-12 about-title">
        <h2 className="text-5xl font-bold mb-4 uppercase">
          Бизнинг хизматлар — самарали бизнес сари йўл
        </h2>
      </div>

      {/* Блок с текстом и фото */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-7xl mx-auto mb-16">
        <div className="text-gray-200 space-y-4 text-2xl">
          <p>
            Бизнинг жамоа тажрибали бухгалтерлар, таҳлилчилар ва HR
            мутахассисларидан иборат. Биз ҳар бир мижоз учун индивидуал
            ечимларни таклиф қиламиз ва натижага йўналганмиз.
          </p>
          <p className="text-gray-400 text-2xl">
            Биз билан ҳамкорлик қилаётган компаниялар учун муҳим бўлган
            жиҳатлар:
          </p>

          {/* Таймлайн с анимацией и иконками */}
          <div className="relative pl-6 space-y-6 about-timeline">
            {timelineItems.map((item, index) => (
              <div
                key={index}
                className="relative flex items-start gap-3 group about-timeline-item text-2xl"
              >
                <FaCheckCircle className="text-blue-500 mt-1 group-hover:scale-110 transition-transform" />
                <p className="text-blue-300 font-medium group-hover:text-blue-400 transition-colors duration-300">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center about-image-wrapper">
          <Image
            src="/teamwork.avif" // замени на актуальный путь к изображению
            alt="Жамоа"
            width={500}
            height={400}
            className="rounded-lg shadow-xl about-services-image"
          />
        </div>
      </div>

      {/* Инфографика */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-7xl mx-auto text-center pt-8 border-t border-gray-700 about-stat-grid">
        <div className="about-stat-card">
          <FaBriefcase className="text-4xl text-blue-400 mx-auto mb-2" />
          <p className="text-3xl font-bold text-blue-400">
            <CountUp
              end={120}
              duration={2}
            />
            +
          </p>
          <p className="text-md text-gray-400">Якунланган лойиҳалар</p>
        </div>
        <div className="about-stat-card">
          <FaUsers className="text-4xl text-blue-400 mx-auto mb-2" />
          <p className="text-3xl font-bold text-blue-400">
            <CountUp
              end={80}
              duration={2}
            />
            +
          </p>
          <p className="text-md text-gray-400">Мамнун мижозлар</p>
        </div>
        <div className="about-stat-card">
          <FaChartLine className="text-4xl text-blue-400 mx-auto mb-2" />
          <p className="text-3xl font-bold text-blue-400">
            <CountUp
              end={10}
              duration={2}
            />{' '}
            йил
          </p>
          <p className="text-md text-gray-400">жамоа тажрибаси</p>
        </div>
        <div className="about-stat-card">
          <FaAward className="text-4xl text-blue-400 mx-auto mb-2" />
          <p className="text-3xl font-bold text-blue-400">
            <CountUp
              end={95}
              duration={2}
            />
            %
          </p>
          <p className="text-md text-gray-400">мижозлар сақланиш даражаси</p>
        </div>
      </div>
    </section>
  );
}
