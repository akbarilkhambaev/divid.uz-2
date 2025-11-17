'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { motion } from 'framer-motion';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const q = query(collection(db, 'reviews'), orderBy('order', 'asc'));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setReviews(data);
      } catch (error) {
        console.error('Ошибка загрузки отзывов:', error);
        setReviews([]);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (loading) {
    return (
      <section className="flex min-h-[520px] items-center justify-center bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
        <div className="text-lg md:text-xl">Загрузка...</div>
      </section>
    );
  }

  if (reviews.length === 0) {
    return null;
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-16 md:py-24">
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="animate-pulse absolute -top-24 left-1/3 h-72 w-72 rounded-full bg-cs-blue/25 blur-3xl" />
        <div className="animate-pulse absolute bottom-0 right-24 h-64 w-64 rounded-full bg-fuchsia-500/20 blur-3xl" />
        <div className="animate-pulse absolute top-1/3 right-1/3 h-52 w-52 rounded-full bg-emerald-500/20 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-[90%] flex-col gap-10 px-4 text-white md:px-6">
        <motion.h2
          className="text-center text-3xl font-bold leading-tight tracking-tight md:text-4xl lg:text-5xl"
          initial={{ opacity: 0, y: -24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <span className="relative inline-block before:absolute before:-inset-2 before:block before:-skew-y-2 before:bg-white/90 before:blur-[2px]">
            <span className="relative text-slate-950">МИЖОЗЛАР</span>
          </span>
          <span className="ml-2 md:ml-3">ФИКРЛАРИ</span>
        </motion.h2>

        <motion.p
          className="mx-auto max-w-3xl text-center text-base text-slate-300 md:text-lg"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 0.6,
            delay: 0.15,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        >
          Реал кейслар ва фикрлар орқали биз билан ишлашдан кейинги ўзгаришларни
          кўринг.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative"
        >
          <Swiper
            loop={reviews.length > 1}
            slidesPerView={1}
            spaceBetween={20}
            navigation
            autoplay={{
              delay: 3600,
              disableOnInteraction: false,
            }}
            modules={[Autoplay, Navigation]}
            className="reviewsSwiper !pb-14"
            breakpoints={{
              640: {
                slidesPerView: 1.3,
                spaceBetween: 24,
              },
              1024: {
                slidesPerView: 2.3,
                spaceBetween: 30,
              },
              1280: {
                slidesPerView: 3.6,
                spaceBetween: 36,
              },
            }}
          >
            {reviews.map((review, index) => (
              <SwiperSlide key={review.id}>
                <div className="flex w-full justify-center py-4">
                  <motion.div
                    whileHover={{ translateY: -8 }}
                    transition={{ duration: 0.25, ease: [0.34, 1.56, 0.64, 1] }}
                    className="group relative flex h-[420px] w-full max-w-[420px] flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/10 text-left text-white shadow-[0_35px_80px_-45px_rgba(15,23,42,0.8)] backdrop-blur-xl"
                  >
                    <div className="absolute inset-0">
                      {(review.imageBase64 || review.image) && (
                        <Image
                          src={review.imageBase64 || review.image}
                          alt={review.name}
                          fill
                          sizes="100vw"
                          className="h-full w-full object-cover opacity-70 transition-transform duration-[750ms] ease-out group-hover:scale-105"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-br from-slate-950/90 via-slate-950/65 to-slate-900/50" />
                      <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <div className="absolute inset-0 bg-gradient-to-tr from-cs-blue/40 via-transparent to-transparent" />
                      </div>
                    </div>

                    <div className="relative z-10 flex h-full flex-col justify-between p-6">
                      <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.3em] text-slate-300">
                        <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 font-semibold text-slate-100">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-semibold text-slate-200">
                          отзыв
                        </span>
                      </div>

                      <div className="mt-10 flex-1 space-y-6">
                        <p className="text-base font-medium leading-relaxed text-slate-100 md:text-lg">
                          “{review.text}”
                        </p>
                        <div className="flex flex-col gap-1 text-sm uppercase tracking-[0.25em] text-cs-blue">
                          <span className="text-base font-semibold tracking-[0.15em] text-white md:text-lg">
                            {review.name}
                          </span>
                          <span className="text-xs text-slate-300 normal-case tracking-[0.05em]">
                            {review.position}
                          </span>
                        </div>
                      </div>

                      <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                      <div className="text-xs uppercase tracking-[0.4em] text-slate-400">
                        • тажриба • ишонч • натижа •
                      </div>
                    </div>
                  </motion.div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
      <style
        jsx
        global
      >{`
        .reviewsSwiper .swiper-button-next,
        .reviewsSwiper .swiper-button-prev {
          color: #0f172a;
          background: rgba(248, 250, 252, 0.92);
          width: 46px;
          height: 46px;
          border-radius: 9999px;
          border: 1px solid rgba(148, 163, 184, 0.45);
          box-shadow: 0 18px 35px -22px rgba(59, 130, 246, 0.65);
          backdrop-filter: blur(18px);
        }
        .reviewsSwiper .swiper-button-next:after,
        .reviewsSwiper .swiper-button-prev:after {
          font-size: 18px;
          font-weight: 700;
        }
        .reviewsSwiper .swiper-button-next:hover,
        .reviewsSwiper .swiper-button-prev:hover {
          background: rgba(248, 250, 252, 1);
          box-shadow: 0 28px 55px -25px rgba(59, 130, 246, 0.85);
        }
        @media (max-width: 768px) {
          .reviewsSwiper .swiper-button-next,
          .reviewsSwiper .swiper-button-prev {
            display: flex !important;
          }
        }
      `}</style>
    </section>
  );
}
