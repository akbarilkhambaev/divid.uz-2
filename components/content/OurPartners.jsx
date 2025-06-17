import React from 'react';
import Image from 'next/image';

const partners = [
  { id: 1, src: '/ourpartners/Chinar mebel.png', alt: 'Партнер 1' },
  { id: 2, src: '/ourpartners/HAABR.png', alt: 'Партнер 2' },
  { id: 3, src: '/ourpartners/akfal.png', alt: 'Партнер 3' },
  { id: 4, src: '/ourpartners/ARMADA.JPG', alt: 'Партнер 4' },
  { id: 5, src: '/ourpartners/Es.png', alt: 'Партнер 5' },
  { id: 7, src: '/ourpartners/HAABR.png', alt: 'Партнер 2' },
  { id: 6, src: '/ourpartners/Chinar mebel.png', alt: 'Партнер 1' },
  { id: 10, src: '/ourpartners/Es.png', alt: 'Партнер 5' },
  { id: 8, src: '/ourpartners/akfal.png', alt: 'Партнер 3' },
  { id: 9, src: '/ourpartners/ARMADA.JPG', alt: 'Партнер 4' },
  { id: 11, src: '/ourpartners/akfal.png', alt: 'Партнер 3' },
  { id: 13, src: '/ourpartners/ARMADA.JPG', alt: 'Партнер 4' },
  { id: 14, src: '/ourpartners/HAABR.png', alt: 'Партнер 2' },
  { id: 12, src: '/ourpartners/Es.png', alt: 'Партнер 5' },
  { id: 15, src: '/ourpartners/Chinar mebel.png', alt: 'Партнер 1' },
];

export default function OurPartners() {
  return (
    <section className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl uppercase text-center font-bold mb-6 pb-5">
          <span className="relative inline-block before:absolute before:-inset-2 before:block before:-skew-y-2 before:bg-cs-blue">
            <span className="relative text-white dark:text-blue-50">
              БИЗНИНГ
            </span>
          </span>{' '}
          <span className="ml-2">ХАМКОРЛАРИМИЗ</span>
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {partners.map((partner) => (
            <div
              key={partner.id}
              className="flex items-center justify-center bg-white shadow-md rounded-lg p-4"
            >
              <Image
                src={partner.src}
                alt={partner.alt}
                width={150}
                height={150}
                className="object-contain transition delay-150 duration-300 ease-in-out hover:scale-120 "
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
