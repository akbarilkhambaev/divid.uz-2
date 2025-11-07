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
        // Fallback на статичные данные
        setTeamMembers([
          {
            name: 'САГДИЕВ КАМОЛИДДИН',
            position: 'ТАСИСЧИ / МОЛИЯВИЙ ДИРЕКТОР',
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
      <section className="min-h-full h-full min-h-[720px] py-16 bg-radial from-gray-900 via-gray-700 to-gray-900 text-white flex items-center justify-center">
        <div className="text-xl">Загрузка...</div>
      </section>
    );
  }

  if (teamMembers.length === 0) {
    return null;
  }

  return (
    <section className="min-h-[500px] md:min-h-[720px] py-8 md:py-16 bg-radial from-gray-900 via-gray-700 to-gray-900 text-white">
      <motion.h2
        className="text-3xl md:text-4xl lg:text-5xl uppercase font-bold mb-6 pb-6 text-center px-4"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <span className="relative inline-block before:absolute before:-inset-2 before:block before:-skew-y-2 before:bg-cs-blue">
          <span className="relative text-white">БИЗНИНГ</span>
        </span>{' '}
        <span className="ml-2 text-cs-blue">ЖАМОА</span>
      </motion.h2>
      <motion.div
        className="px-4 md:px-8 relative"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: 0.15, ease: [0.33, 1, 0.68, 1] }}
      >
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          centeredSlides={true}
          loop={teamMembers.length > 1}
          navigation={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
              centeredSlides: false,
              spaceBetween: 15,
            },
            768: {
              slidesPerView: 3,
              centeredSlides: false,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 4,
              centeredSlides: false,
              spaceBetween: 20,
            },
            1372: {
              slidesPerView: 5,
              centeredSlides: false,
              spaceBetween: 20,
            },
          }}
          className="w-full teamSwiper"
        >
          {teamMembers.map((member, index) => (
            <SwiperSlide key={member.id || index}>
              <motion.div
                className="bg-gray-800 w-full max-w-[280px] mx-auto rounded-lg shadow-lg p-4 md:p-6 text-center flex flex-col items-center"
                initial={{ opacity: 0, scale: 0.92, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.08,
                  ease: [0.43, 0.13, 0.23, 0.96],
                }}
                whileHover={{
                  scale: 1.03,
                  y: -8,
                  transition: { duration: 0.25, ease: [0.34, 1.56, 0.64, 1] },
                }}
              >
                <motion.div
                  className="w-full flex justify-center items-center mb-4"
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
                    className="w-[200px] h-[300px] md:w-[220px] md:h-[300px] rounded-full object-cover shadow-xl"
                  />
                </motion.div>
                <motion.h3
                  className="text-base md:text-lg lg:text-xl font-semibold"
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
                  className="text-sm md:text-base text-gray-400 mt-2"
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
              </motion.div>
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
          color: #3b82f6;
          background: rgba(59, 130, 246, 0.1);
          width: 44px;
          height: 44px;
          border-radius: 50%;
          backdrop-filter: blur(10px);
        }
        .teamSwiper .swiper-button-next:after,
        .teamSwiper .swiper-button-prev:after {
          font-size: 20px;
          font-weight: bold;
        }
        .teamSwiper .swiper-button-next:hover,
        .teamSwiper .swiper-button-prev:hover {
          background: rgba(59, 130, 246, 0.3);
        }
        @media (max-width: 768px) {
          .teamSwiper .swiper-button-next,
          .teamSwiper .swiper-button-prev {
            display: flex !important;
          }
        }
      `}</style>
    </section>
  );
}
