import React from 'react';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';
import 'animate.css';

export default function ExampleWorksInfo() {
  const { ref, inView } = useInView({
    triggerOnce: true, // Анимация срабатывает только один раз
    threshold: 0.2, // Срабатывает, когда 20% секции видны
  });
  return (
    <section
      id="about_us"
      className="h-full min-h-[500px] md:min-h-[720px] pt-16 md:pt-[120px] bg-gray-50 py-8 md:py-12"
      ref={ref}
    >
      <div className="max-w-screen mx-auto px-4">
        <h2
          className={`text-3xl md:text-4xl lg:text-5xl text-center font-bold mb-6 ${
            inView
              ? 'animate__animated animate__fadeInDown animate__delay-1s'
              : ''
          }`}
        >
          <span className="relative inline-block before:absolute before:-inset-2 before:block before:-skew-y-2 before:bg-cs-blue">
            <span className="relative text-white dark:text-blue-50">БИЗ</span>
          </span>
          <span className="ml-3">ХАКИМИЗДА</span>
        </h2>

        <div
          className={`grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 bg-white shadow-lg rounded-lg ${
            inView
              ? 'animate__animated animate__fadeInDown animate__delay-1s'
              : ''
          }`}
        >
          {/* Блок с изображением */}
          <div className="overflow-hidden flex items-center justify-center p-4 md:p-0">
            <Image
              src="/team.png"
              alt="Example Works"
              width={500}
              height={500}
              className="object-cover rounded-[30%] w-full max-w-[400px] md:max-w-none md:p-5 transition-transform duration-300 transform hover:scale-105"
            />
          </div>

          {/* Блок с текстом */}
          <div className="overflow-hidden flex flex-col items-center justify-center p-4 md:p-6">
            <p className="text-xl md:text-2xl lg:text-4xl text-gray-700 leading-relaxed w-full text-center mb-4 md:mb-5 pb-4 md:pb-5">
              DI
              <span className="text-xl md:text-2xl lg:text-4xl font-bold text-cs-blue">
                V
              </span>
              IDEND- бу профессионаллар жамоаси, бизнесингизни ривожлантириш
              учун инновацион ечимларни таклиф этувчи консалтинг компанияси.
            </p>
            <p className="text-base md:text-xl lg:text-2xl text-gray-700 leading-relaxed mb-4 md:mb-5 pb-4 md:pb-5 w-full text-center">
              <cite>
                - Биз сиз учун аудит ўтказмаймиз – биз сиз учун жавобгарликни
                камайтирувчи тизим яратамиз
              </cite>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
