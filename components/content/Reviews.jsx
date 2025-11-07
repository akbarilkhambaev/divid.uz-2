'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
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
      <section className="min-h-[720px] h-full bg-gray-50 py-12 flex items-center justify-center">
        <div className="text-xl">Загрузка...</div>
      </section>
    );
  }

  if (reviews.length === 0) {
    return null;
  }

  return (
    <section className="min-h-[500px] md:min-h-[720px] h-full bg-gray-50 py-8 md:py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl lg:text-5xl uppercase text-center font-bold mb-6 pb-5">
          <span className="relative inline-block before:absolute before:-inset-2 before:block before:-skew-y-2 before:bg-cs-blue">
            <span className="relative text-white dark:text-blue-50">
              Мижозларимиз
            </span>
          </span>{' '}
          <span className="ml-2">фикрлари</span>
        </h2>
        <div className="relative">
          <Swiper
            loop={reviews.length > 1}
            slidesPerView={1}
            spaceBetween={20}
            navigation={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            modules={[Autoplay, Navigation]}
            className="reviewsSwiper"
            breakpoints={{
              768: {
                slidesPerView: 3,
                spaceBetween: 25,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
            }}
          >
            {reviews.map((review) => (
              <SwiperSlide key={review.id}>
                <div
                  className="relative min-h-60 border rounded shadow flex flex-col justify-end items-center overflow-hidden text-center mx-auto"
                  style={{
                    height: '420px',
                    justifyContent: 'flex-start',
                    maxWidth: '500px',
                  }}
                >
                  {review.imageBase64 || review.image ? (
                    <Image
                      src={review.imageBase64 || review.image}
                      alt="feedback"
                      fill
                      sizes="100vw"
                      className="absolute inset-0 w-full h-full object-cover z-0"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gray-800 z-0" />
                  )}
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-10" />
                  {/* Content */}
                  <div className="relative z-20 w-full px-6 pb-8 pt-10 flex flex-col justify-end h-full">
                    <div
                      className="bg-black/60 rounded-lg p-4 mb-4 flex flex-col items-center"
                      style={{
                        backdropFilter: 'blur(2px)',
                        marginTop: '-40px',
                      }}
                    >
                      <p
                        className="text-white text-xl font-bold mb-3 drop-shadow-2xl"
                        style={{
                          textShadow: '0 2px 8px #000, 0 0px 2px #333',
                        }}
                      >
                        "{review.text}"
                      </p>
                      <div className="w-full border mb-3 border-white/30"></div>
                      <h4
                        className="font-extrabold text-cs-blue text-lg mb-1"
                        style={{ textShadow: '0 2px 8px #000' }}
                      >
                        {review.name}
                      </h4>
                      <span
                        className="text-sm text-blue-100 font-medium"
                        style={{ textShadow: '0 1px 4px #000' }}
                      >
                        {review.position}
                      </span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <style
        jsx
        global
      >{`
        .reviewsSwiper .swiper-button-next,
        .reviewsSwiper .swiper-button-prev {
          color: #3b82f6;
          background: rgba(255, 255, 255, 0.9);
          width: 44px;
          height: 44px;
          border-radius: 50%;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        }
        .reviewsSwiper .swiper-button-next:after,
        .reviewsSwiper .swiper-button-prev:after {
          font-size: 20px;
          font-weight: bold;
        }
        .reviewsSwiper .swiper-button-next:hover,
        .reviewsSwiper .swiper-button-prev:hover {
          background: rgba(255, 255, 255, 1);
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
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
