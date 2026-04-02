'use client';

import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { motion } from 'framer-motion';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import { Navigation, Autoplay } from 'swiper/modules';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function OurTeam() {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const q = query(collection(db, 'team'), orderBy('order', 'asc'));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTeamMembers(data);
      } catch (error) {
        console.error('Ошибка загрузки команды:', error);
        setTeamMembers([
          {
            name: 'SAGDIYEV KAMOLIDDIN',
            position: 'ASOSCHI / MOLIYAVIY DIREKTOR',
            image: '/team/Sagdiyev_K.png',
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchTeam();
  }, []);

  if (loading) {
    return (
      <section className="flex h-[480px] min-h-full items-center justify-center bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
        <div className="text-lg md:text-xl">Yuklanmoqda...</div>
      </section>
    );
  }

  if (teamMembers.length === 0) {
    return null;
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-16 text-white md:py-20">
      <div className="pointer-events-none absolute inset-0 opacity-45">
        <div className="animate-pulse absolute -top-28 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-cs-blue/25 blur-3xl" />
        <div className="animate-pulse absolute bottom-16 left-12 h-64 w-64 rounded-full bg-fuchsia-500/15 blur-3xl" />
        <div className="animate-pulse absolute -bottom-24 right-24 h-72 w-72 rounded-full bg-emerald-500/15 blur-3xl" />
      </div>

      <motion.div
        className="relative z-10 mx-auto flex w-full max-w-full flex-col gap-10 px-4 md:px-6"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <motion.h2
          className="text-center text-3xl font-bold uppercase leading-tight tracking-tight md:text-4xl lg:text-5xl"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <span className="relative inline-block before:absolute before:-inset-2 before:block before:-skew-y-2 before:bg-white/90 before:blur-[2px]">
            <span className="relative text-slate-950">BIZNING</span>
          </span>
          <span className="ml-2 text-cs-blue"> JAMOA</span>
        </motion.h2>

        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
          centeredSlides
          loop={teamMembers.length > 1}
          navigation
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
              centeredSlides: false,
              spaceBetween: 18,
            },
            768: {
              slidesPerView: 2.5,
              centeredSlides: false,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 4,
              centeredSlides: false,
              spaceBetween: 24,
            },
            1372: {
              slidesPerView: 6,
              centeredSlides: false,
              spaceBetween: 18,
            },
          }}
          className="teamSwiper relative w-full"
        >
          {teamMembers.map((member, index) => (
            <SwiperSlide
              key={member.id || index}
              className="flex h-full items-stretch justify-center"
            >
              <motion.article
                className="group relative mx-auto flex h-full w-full max-w-[260px] flex-col items-center overflow-hidden rounded-3xl border border-white/10 bg-white/10 p-6 text-center text-white shadow-lg backdrop-blur-xl transition-all duration-300 sm:max-w-[320px]"
                initial={{ opacity: 0, scale: 0.92, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.08,
                  ease: [0.43, 0.13, 0.23, 0.96],
                }}
                whileHover={{
                  translateY: -8,
                  transition: { duration: 0.25, ease: [0.34, 1.56, 0.64, 1] },
                }}
              >
                <div className="absolute inset-0">
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-950/65 via-slate-950/45 to-slate-900/35" />
                  <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="absolute inset-0 bg-gradient-to-tr from-cs-blue/25 via-transparent to-transparent" />
                  </div>
                </div>
                <motion.div
                  className="relative z-10 mb-6 flex w-full justify-center"
                  initial={{ scale: 0.85, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.7,
                    delay: index * 0.08 + 0.15,
                    ease: [0.34, 1.56, 0.64, 1],
                  }}
                >
                  <img
                    src={
                      member.imageBase64 || member.image || '/team/default.png'
                    }
                    alt={member.name}
                    className="h-[280px] w-[200px] rounded-[1.75rem] object-cover shadow-[0_25px_60px_-30px_rgba(59,130,246,0.55)] transition-transform duration-[750ms] ease-out group-hover:scale-[1.03] md:h-[300px] md:w-[220px]"
                  />
                </motion.div>
                <motion.h3
                  className="relative z-10 text-lg font-semibold md:text-xl"
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.08 + 0.3,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                >
                  {member.name}
                </motion.h3>
                <motion.p
                  className="relative z-10 mt-2 text-sm text-slate-300 md:text-base"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.08 + 0.4,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                >
                  {member.position}
                </motion.p>
              </motion.article>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>
      <style
        jsx
        global
      >{`
        .teamSwiper .swiper-button-next,
        .teamSwiper .swiper-button-prev {
          color: #0f172a;
          background: rgba(255, 255, 255, 0.18);
          width: 44px;
          height: 44px;
          border-radius: 50%;
          backdrop-filter: blur(14px);
          border: 1px solid rgba(255, 255, 255, 0.25);
        }
        .teamSwiper .swiper-button-next:after,
        .teamSwiper .swiper-button-prev:after {
          font-size: 19px;
          font-weight: 700;
        }
        .teamSwiper .swiper-button-next:hover,
        .teamSwiper .swiper-button-prev:hover {
          background: rgba(59, 130, 246, 0.35);
          color: #fff;
        }
        @media (max-width: 768px) {
          .teamSwiper .swiper-button-next,
          .teamSwiper .swiper-button-prev {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}
