import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

const teamMembers = [
  {
    name: 'САГДИЕВ КАМОЛИДДИН',
    position: 'ТАСИСЧИ / МОЛИЯВИЙ ДИРЕКТОР',
    image: '/team/Sagdiyev_K.png',
  },
  {
    name: 'ЭРГАШБОЕВ АБДУЛАЗИЗ',
    position: 'ПРОЕКТ МЕНЕЖЕР',
    image: '/team/Ergashboev_A.png',
  },
  {
    name: 'КОМОЛХУЖАЕВ МУРОДХУЖА',
    position: 'МОЛИЯЧИ / ДАСТУРЧИ',
    image: '/team/Komolxo’jaev_M.png',
  },
  {
    name: 'МАННОНОВ САРДОР',
    position: 'ТАХЛИЛЧИ',
    image: '/team/Mannonov_S.png',
  },
  {
    name: 'ТОШПУЛАТОВ ЮСУФ',
    position: 'ПРОЕКТ МЕНЕЖЕР',
    image: '/team/Tashpulatov_Y.png',
  },
  {
    name: 'МАННОНОВ САРДОР',
    position: 'ТАХЛИЛЧИ',
    image: '/team/Mannonov_S.png',
  },
];

export default function OurTeam() {
  return (
    <section className="min-h-full h-full min-h-[720px] py-16 bg-radial from-gray-900 via-gray-700 to-gray-900 text-white">
      <h2 className="text-5xl uppercase font-bold mb-6 pb-6 text-center">
        <span className="relative inline-block before:absolute before:-inset-2 before:block before:-skew-y-2 before:bg-cs-blue">
          <span className="relative text-white">БИЗНИНГ</span>
        </span>{' '}
        <span className="ml-2 text-cs-blue">ЖАМОА</span>
      </h2>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]} // Подключаем Autoplay
        spaceBetween={10}
        slidesPerView={1}
        loop={true} // Включаем бесконечный цикл
        autoplay={{
          delay: 2500, // Задержка между слайдами (в миллисекундах)
          disableOnInteraction: false, // Автоплей не останавливается при взаимодействии
        }}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 4 },
          1372: { slidesPerView: 5 },
        }}
        className="w-full max-w-screen"
      >
        {teamMembers.map((member, index) => (
          <SwiperSlide key={index}>
            <div className="bg-gray-800 w-[300px] rounded-lg shadow-lg p-6 text-center">
              <img
                src={member.image}
                alt={member.name}
                className="w-250 mx-auto rounded-full mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold">{member.name}</h3>
              <p className="text-gray-400">{member.position}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
