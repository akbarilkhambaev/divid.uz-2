'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function OurPartners() {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const q = query(collection(db, 'partners'), orderBy('order', 'asc'));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPartners(data);
      } catch (error) {
        console.error('Ошибка загрузки партнеров:', error);
        setPartners([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPartners();
  }, []);
  if (loading) {
    return (
      <section className="min-h-[400px] md:min-h-[600px] h-full bg-gray-50 py-8 md:py-12 flex items-center justify-center">
        <div className="text-lg md:text-xl">Загрузка...</div>
      </section>
    );
  }

  if (partners.length === 0) {
    return null;
  }

  return (
    <section className="min-h-[400px] md:min-h-[600px] h-full bg-gray-50 py-8 md:py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl lg:text-5xl uppercase text-center font-bold mb-6 md:mb-8 pb-4 md:pb-5 px-2">
          <span className="relative inline-block before:absolute before:-inset-2 before:block before:-skew-y-2 before:bg-cs-blue">
            <span className="relative text-white dark:text-blue-50">
              БИЗНИНГ
            </span>
          </span>{' '}
          <span className="ml-2">ХАМКОРЛАРИМИЗ</span>
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 lg:gap-8">
          {partners.map((partner) => (
            <div
              key={partner.id}
              className="flex items-center justify-center bg-white shadow-md rounded-lg p-3 md:p-4 min-h-[100px] md:min-h-[120px]"
            >
              <Image
                src={
                  partner.imageBase64 ||
                  partner.image ||
                  partner.src ||
                  '/ourpartners/default.png'
                }
                alt={partner.alt || partner.name || 'Партнер'}
                width={150}
                height={150}
                className="object-contain transition delay-150 duration-300 ease-in-out hover:scale-110 max-w-[80px] md:max-w-[120px] lg:max-w-[150px] w-full h-auto"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
