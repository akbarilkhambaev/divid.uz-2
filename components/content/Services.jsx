'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const q = query(
          collection(db, 'homeServices'),
          orderBy('order', 'asc')
        );
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setServices(data);
      } catch (error) {
        console.error('Ошибка загрузки услуг:', error);
        setServices([]);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return (
      <section className="h-full min-h-[500px] md:min-h-[720px] max-w-screen mx-auto px-4 py-8 md:py-10 bg-cs-blue text-white flex items-center justify-center">
        <div className="text-lg md:text-xl">Загрузка...</div>
      </section>
    );
  }

  if (services.length === 0) {
    return null;
  }

  return (
    <>
      <section className="h-full min-h-[500px] md:min-h-[720px] max-w-screen mx-auto px-4 py-8 md:py-10 bg-cs-blue text-white">
        <motion.h2
          className="text-3xl md:text-4xl lg:text-5xl text-center font-bold mb-6 md:mb-8 px-2"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <span className="relative inline-block before:absolute before:-inset-2 before:block before:-skew-y-2 before:bg-white">
            <span className="relative text-gray-900 dark:text-gray-900">
              БИЗНИНГ
            </span>
          </span>
          <span className="ml-2 md:ml-3">ХИЗМАТЛАР</span>
        </motion.h2>
        <Link href={`/services/`}>
          <motion.div
            className="grid gap-6 md:gap-8 lg:gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.08,
                  delayChildren: 0.15,
                },
              },
            }}
          >
            {services.map((serv, index) => (
              <motion.div
                key={serv.id}
                variants={{
                  hidden: { opacity: 0, scale: 0.92, y: 20 },
                  visible: { opacity: 1, scale: 1, y: 0 },
                }}
                transition={{
                  duration: 0.6,
                  ease: [0.43, 0.13, 0.23, 0.96],
                }}
                whileHover={{
                  scale: 1.03,
                  y: -8,
                  transition: { duration: 0.25, ease: [0.34, 1.56, 0.64, 1] },
                }}
                className="relative group rounded-2xl p-[2px] bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600 transition-all duration-300"
              >
                <div className="h-full w-full bg-white rounded-2xl p-6 text-black transition-all duration-300 group-hover:shadow-xl relative overflow-hidden">
                  {/* Иконка в правом верхнем углу - за текстом */}
                  {serv.iconBase64 || serv.iconName ? (
                    <div className="absolute top-4 right-4 md:top-6 md:right-6 w-20 h-20 md:w-32 md:h-32 flex items-center justify-center z-0 opacity-40 group-hover:opacity-60 transition-opacity duration-300">
                      {serv.iconBase64 ? (
                        <img
                          src={serv.iconBase64}
                          alt="Icon"
                          className="w-12 h-12 md:w-20 md:h-20 object-contain filter brightness-0 opacity-30"
                        />
                      ) : serv.iconName ? (
                        <span className="text-4xl md:text-6xl opacity-30">
                          {serv.iconName}
                        </span>
                      ) : null}
                    </div>
                  ) : null}

                  {/* Контент поверх иконки */}
                  <motion.div
                    className="relative z-10"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      delay: 0.2,
                      ease: [0.25, 0.1, 0.25, 1],
                    }}
                  >
                    <h3 className="text-lg md:text-xl lg:text-2xl font-bold mb-3 md:mb-4 group-hover:text-cs-blue transition-colors duration-300">
                      {serv.title}
                    </h3>
                    <p className="text-sm md:text-base lg:text-md text-gray-700 mb-4 md:mb-6 leading-relaxed">
                      {serv.text}
                    </p>

                    <span className="inline-block text-cs-blue text-2xl md:text-3xl transform group-hover:translate-x-2 transition-transform duration-300">
                      →
                    </span>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </Link>
      </section>
    </>
  );
}
