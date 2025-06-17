import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import Image from 'next/image';

export default function NewsPageSlider() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      const snapshot = await getDocs(collection(db, 'news'));
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      // Сортировка по дате (новые первыми)
      data.sort((a, b) => {
        if (a.createdAt && b.createdAt) {
          return b.createdAt.seconds - a.createdAt.seconds;
        }
        return 0;
      });
      setNews(data);
    };
    fetchNews();
  }, []);

  return (
    <section className="py-16 bg-radial from-gray-900 via-gray-700 to-gray-900 text-white">
      <h2 className="text-5xl uppercase font-bold mb-8 pb-5 text-center">
        <span className="relative inline-block before:absolute before:-inset-2 before:block before:-skew-y-2 before:bg-cs-blue">
          <span className="relative text-white">ЯНГИЛИКЛАР</span>
        </span>
      </h2>
      <Swiper
        modules={[Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="w-full max-w-screen-xl px-8"
      >
        {news.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="bg-white w-[350px] min-h-[370px] rounded-lg shadow-lg p-6 text-gray-900 flex flex-col h-full">
              {item.imageBase64 ? (
                <Image
                  src={item.imageBase64}
                  alt={item.title}
                  width={350}
                  height={180}
                  className="w-full h-40 object-cover rounded mb-4"
                />
              ) : (
                <div className="w-full h-40 bg-gray-200 flex items-center justify-center rounded mb-4">
                  <span className="text-gray-500">Нет изображения</span>
                </div>
              )}
              <h3 className="text-lg font-bold mb-2 line-clamp-2">
                {item.title}
              </h3>
              <p className="text-gray-700 mb-4 line-clamp-2 whitespace-pre-line flex-1">
                {item.description || 'Описание недоступно.'}
              </p>
              <p className="text-xs text-gray-400 mt-auto">
                Дата публикации:{' '}
                {item.createdAt
                  ? new Date(item.createdAt.seconds * 1000).toLocaleDateString()
                  : 'неизвестна'}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
