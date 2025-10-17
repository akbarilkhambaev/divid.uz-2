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
    <section className="min-h-[720px] h-full bg-gray-50 py-12">
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
              <div
                className="relative min-h-60 border rounded shadow flex flex-col justify-end items-center overflow-hidden text-center"
                style={{ height: '420px', justifyContent: 'flex-start' }}
              >
                <Image
                  src={'/Reviews/akfa.png'}
                  alt="feedback"
                  fill
                  sizes="100vw"
                  className="absolute inset-0 w-full h-full object-cover z-0"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-10" />
                {/* Logo */}
                {/* Логотип убран, будет ниже */}
                {/* Content */}
                <div className="relative z-20 w-full px-6 pb-8 pt-10 flex flex-col justify-end h-full">
                  {/* Логотип компании — только один раз, ниже текста */}
                  <div
                    className="bg-black/60 rounded-lg p-4 mb-4 flex flex-col items-center"
                    style={{ backdropFilter: 'blur(2px)', marginTop: '-40px' }}
                  >
                    <p
                      className="text-white text-xl font-bold mb-3 drop-shadow-2xl"
                      style={{ textShadow: '0 2px 8px #000, 0 0px 2px #333' }}
                    >
                      "Мы давно искали надежного . Стратегический консалтинг
                      помог нам достичь новых высот! "
                    </p>
                    <div className="w-full border mb-3 border-white/30"></div>
                    <h4
                      className="font-extrabold text-cs-blue text-lg mb-1"
                      style={{ textShadow: '0 2px 8px #000' }}
                    >
                      ЖАМШИД ИСМОИЛОВ
                    </h4>
                    <span
                      className="text-sm text-blue-100 font-medium"
                      style={{ textShadow: '0 1px 4px #000' }}
                    >
                      AKFA КОМПАНИЯСИ ЕТАКЧИ МУТАХАСИСИ
                    </span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              {/* Пример отзыва 1 */}
              <div
                className="relative min-h-60 border rounded shadow flex flex-col justify-end items-center overflow-hidden text-center"
                style={{ height: '420px' }}
              >
                <Image
                  src={'/Reviews/UZPOLITEX.png'}
                  alt="feedback"
                  fill
                  sizes="100vw"
                  className="absolute inset-0 w-full h-full object-cover z-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-10" />
                {/* Logo */}
                {/* Логотип убран, будет ниже */}
                <div className="flex justify-start items-center mb-2">
                  <Image
                    src={'/Reviews/UZPOLITEX.png'}
                    alt="logo"
                    width={70}
                    height={40}
                  />
                </div>
                <div className="relative z-20 w-full px-6 pb-8 pt-10 flex flex-col justify-end h-full">
                  <div
                    className="bg-black/60 rounded-lg p-4 mb-4 flex flex-col items-center"
                    style={{ backdropFilter: 'blur(2px)', marginTop: '-40px' }}
                  >
                    <p
                      className="text-white text-xl font-bold mb-3 drop-shadow-2xl"
                      style={{ textShadow: '0 2px 8px #000, 0 0px 2px #333' }}
                    >
                      "Мы давно искали надежного . Стратегический консалтинг
                      помог нам достичь новых высот! "
                    </p>
                    <div className="w-full border mb-3 border-white/30"></div>
                    <h4
                      className="font-extrabold text-cs-blue text-lg mb-1"
                      style={{ textShadow: '0 2px 8px #000' }}
                    >
                      МИРКОМИЛ ХОШИМОВ
                    </h4>
                    <span
                      className="text-sm text-blue-100 font-medium"
                      style={{ textShadow: '0 1px 4px #000' }}
                    >
                      UZPOLITEX КОМПАНИЯСИ МАРКЕТИНГ БУЛИМИ БОШЛИГИ
                    </span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              {/* Пример отзыва 1 */}
              <div
                className="relative min-h-60 border rounded shadow flex flex-col justify-end items-center overflow-hidden text-center"
                style={{ height: '420px' }}
              >
                <Image
                  src={'/Reviews/CHINAR.png'}
                  alt="feedback"
                  fill
                  sizes="100vw"
                  className="absolute inset-0 w-full h-full object-cover z-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-10" />
                {/* Logo */}
                {/* Логотип убран, будет ниже */}
                <div className="flex justify-start items-center mb-2">
                  <Image
                    src={'/Reviews/CHINAR.png'}
                    alt="logo"
                    width={70}
                    height={40}
                  />
                </div>
                <div className="relative z-20 w-full px-6 pb-8 pt-10 flex flex-col justify-end h-full">
                  <div
                    className="bg-black/60 rounded-lg p-4 mb-4 flex flex-col items-center"
                    style={{ backdropFilter: 'blur(2px)', marginTop: '-40px' }}
                  >
                    <p
                      className="text-white text-xl font-bold mb-3 drop-shadow-2xl"
                      style={{ textShadow: '0 2px 8px #000, 0 0px 2px #333' }}
                    >
                      "Мы давно искали надежного . Стратегический консалтинг
                      помог нам достичь новых высот! "
                    </p>
                    <div className="w-full border mb-3 border-white/30"></div>
                    <h4
                      className="font-extrabold text-cs-blue text-lg mb-1"
                      style={{ textShadow: '0 2px 8px #000' }}
                    >
                      АБДУМАЛИК ТОШЕВ
                    </h4>
                    <span
                      className="text-sm text-blue-100 font-medium"
                      style={{ textShadow: '0 1px 4px #000' }}
                    >
                      Директор, Компания А
                    </span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              {/* Пример отзыва 1 */}
              <div
                className="relative min-h-60 border rounded shadow flex flex-col justify-end items-center overflow-hidden text-center"
                style={{ height: '420px' }}
              >
                <Image
                  src={'/Reviews/evolution.png'}
                  alt="feedback"
                  fill
                  sizes="100vw"
                  className="absolute inset-0 w-full h-full object-cover z-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-10" />
                <div className="relative z-20 w-full px-6 pb-8 pt-10 flex flex-col justify-end h-full">
                  <div
                    className="bg-black/60 rounded-lg p-4 mb-4 flex flex-col items-center"
                    style={{ backdropFilter: 'blur(2px)' }}
                  >
                    <p
                      className="text-white text-xl font-bold mb-3 drop-shadow-2xl"
                      style={{ textShadow: '0 2px 8px #000, 0 0px 2px #333' }}
                    >
                      "Мы давно искали надежного . Стратегический консалтинг
                      помог нам достичь новых высот! "
                    </p>
                    <div className="w-full border mb-3 border-white/30"></div>
                    <h4
                      className="font-extrabold text-cs-blue text-lg mb-1"
                      style={{ textShadow: '0 2px 8px #000' }}
                    >
                      САРДОР ЭРКИНОВ
                    </h4>
                    <span
                      className="text-sm text-blue-100 font-medium"
                      style={{ textShadow: '0 1px 4px #000' }}
                    >
                      Директор, Компания А
                    </span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              {/* Пример отзыва 1 */}
              <div
                className="relative min-h-60 border rounded shadow flex flex-col justify-end items-center overflow-hidden text-center"
                style={{ height: '420px' }}
              >
                <Image
                  src={'/Reviews/FACT.png'}
                  alt="feedback"
                  fill
                  sizes="100vw"
                  className="absolute inset-0 w-full h-full object-cover z-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-10" />
                <div className="relative z-20 w-full px-6 pb-8 pt-10 flex flex-col justify-end h-full">
                  <div
                    className="bg-black/60 rounded-lg p-4 mb-4 flex flex-col items-center"
                    style={{ backdropFilter: 'blur(2px)' }}
                  >
                    <p
                      className="text-white text-xl font-bold mb-3 drop-shadow-2xl"
                      style={{ textShadow: '0 2px 8px #000, 0 0px 2px #333' }}
                    >
                      "Мы давно искали надежного . Стратегический консалтинг
                      помог нам достичь новых высот! "
                    </p>
                    <div className="w-full border mb-3 border-white/30"></div>
                    <h4
                      className="font-extrabold text-cs-blue text-lg mb-1"
                      style={{ textShadow: '0 2px 8px #000' }}
                    >
                      СВЕТЛАНА ЛИ
                    </h4>
                    <span
                      className="text-sm text-blue-100 font-medium"
                      style={{ textShadow: '0 1px 4px #000' }}
                    >
                      Директор, Компания А
                    </span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </section>
  );
}
