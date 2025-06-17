import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Services() {
  const services = [
    {
      id: 1,
      title: 'Аудит ва таҳлил хизматлари',
      text: 'Молиявий муаммолар, уларга ечим топиш, лорем ипсум ис доп сит амет, лоагр перпедуа, оавпоапоашпшо лоаща ашвповщашпвашшати пловаапшвашвапол',
      image: 'slider/audit.png',
    },
    {
      id: 2,
      title: 'Молиявий консалтинг ва бошқарув',
      text: 'Молиявий ҳисоботлар, бюджетлаш ва молиявий режалаштириш бўйича маслаҳатлар.',
      image: 'slider/moliya.png',
    },
    {
      id: 3,
      title: 'HR ва кадрлар билан ишлаш',
      text: 'Кадрлар билан ишлаш, HR стратегияси ва бошқаруви бўйича маслаҳатлар.',
      image: 'slider/hr.jpg',
    },
    {
      id: 4,
      title: 'Юридик ва ҳуқуқий хизматлар',
      text: 'Юридик маслаҳатлар, шартномаларни тузиш ва ҳуқуқий ҳимоя.',
      image: 'slider/law.jpg',
    },
  ];

  return (
    <section className="max-w-screen mx-auto min-h-[] px-4 py-8 bg-cs-blue text-white">
      <h2 className="text-5xl text-center font-bold mb-8">
        <span className="relative inline-block before:absolute before:-inset-2 before:block before:-skew-y-2 before:bg-white">
          <span className="relative text-white dark:text-black">БИЗНИНГ</span>
        </span>
        <span className="ml-3">ХИЗМАТЛАР</span>
      </h2>
      <Link href={`/services/`}>
        <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((serv) => (
            <div
              key={serv.id}
              className="relative group rounded-2xl p-[2px] bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600 transition-all duration-300 hover:scale-105 hover:-translate-y-2"
            >
              <div className="h-full w-full bg-white rounded-2xl p-6 text-black transition-all duration-300 group-hover:shadow-xl">
                <h3 className="text-xl font-bold mb-4 group-hover:text-cs-blue transition-colors duration-300">
                  {serv.title}
                </h3>
                <p className="text-md text-gray-700 mb-6">{serv.text}</p>

                <span className="inline-block text-cs-blue text-3xl transform group-hover:translate-x-2 transition-transform duration-300">
                  →
                </span>
              </div>
            </div>
          ))}
        </div>
      </Link>
    </section>
  );
}
