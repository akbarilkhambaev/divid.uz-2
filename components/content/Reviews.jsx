import React from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';

export default function InfoSection() {
  return (
    <section className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl uppercase text-center font-bold mb-6 pb-5">
          <span className="relative inline-block before:absolute before:-inset-2 before:block before:-skew-y-2 before:bg-cs-blue">
            <span className="relative text-white dark:text-blue-50">
              Мижозларимиз
            </span>
          </span>{' '}
          <span className="ml-2">фикрлари</span>
        </h2>
        <div className="">
          <Swiper
            loop={true}
            slidesPerView={3}
            spaceBetween={30}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            modules={[Autoplay]}
            className="mySwiper"
          >
            <SwiperSlide>
              {/* Пример отзыва 1 */}
              <div className="p-4 min-h-60 border text-center items-center rounded shadow justify-between">
                <Image
                  width={300}
                  height={402}
                  src={'/logo.jpeg'}
                  alt="feedback"
                  className="grayscale cursor-pointer text-center mx-auto my-4"
                ></Image>
                <p className="text-gray-500 mb-4">
                  "Мы давно искали надежного . Стратегический консалтинг помог
                  нам достичь новых высот! "
                </p>
                <div className="w-full border mb-4"></div>
                <h4 className="font-semibold">Иван Петров</h4>
                <span className="text-sm text-gray-500">
                  Директор, Компания А
                </span>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              {/* Пример отзыва 1 */}
              <div className="p-4 min-h-60 border text-center items-center rounded shadow justify-between">
                <Image
                  width={300}
                  height={402}
                  src={'/logo.jpeg'}
                  alt="feedback"
                  className="grayscale cursor-pointer text-center mx-auto my-4"
                ></Image>
                <p className="text-gray-500 mb-4">
                  "Мы давно искали надежного . Стратегический консалтинг помог
                  нам достичь новых высот! "
                </p>
                <div className="w-full border mb-4"></div>
                <h4 className="font-semibold">Иван Петров</h4>
                <span className="text-sm text-gray-500">
                  Директор, Компания А
                </span>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              {/* Пример отзыва 1 */}
              <div className="p-4 min-h-60 border text-center items-center rounded shadow justify-between">
                <Image
                  width={300}
                  height={402}
                  src={'/logo.jpeg'}
                  alt="feedback"
                  className="grayscale cursor-pointer text-center mx-auto my-4"
                ></Image>
                <p className="text-gray-500 mb-4">
                  "Мы давно искали надежного . Стратегический консалтинг помог
                  нам достичь новых высот! "
                </p>
                <div className="w-full border mb-4"></div>
                <h4 className="font-semibold">Иван Петров</h4>
                <span className="text-sm text-gray-500">
                  Директор, Компания А
                </span>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              {/* Пример отзыва 1 */}
              <div className="p-4 min-h-60 border text-center items-center rounded shadow justify-between">
                <Image
                  width={300}
                  height={402}
                  src={'/logo.jpeg'}
                  alt="feedback"
                  className="grayscale cursor-pointer text-center mx-auto my-4"
                ></Image>
                <p className="text-gray-500 mb-4">
                  "Мы давно искали надежного . Стратегический консалтинг помог
                  нам достичь новых высот! "
                </p>
                <div className="w-full border mb-4"></div>
                <h4 className="font-semibold">Иван Петров</h4>
                <span className="text-sm text-gray-500">
                  Директор, Компания А
                </span>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              {/* Пример отзыва 1 */}
              <div className="p-4 min-h-60 border text-center items-center rounded shadow justify-between">
                <Image
                  width={300}
                  height={402}
                  src={'/logo.jpeg'}
                  alt="feedback"
                  className="grayscale cursor-pointer text-center mx-auto my-4"
                ></Image>
                <p className="text-gray-500 mb-4">
                  "Мы давно искали надежного . Стратегический консалтинг помог
                  нам достичь новых высот! "
                </p>
                <div className="w-full border mb-4"></div>
                <h4 className="font-semibold">Иван Петров</h4>
                <span className="text-sm text-gray-500">
                  Директор, Компания А
                </span>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </section>
  );
}
