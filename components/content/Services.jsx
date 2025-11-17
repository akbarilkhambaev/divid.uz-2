'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { FaArrowRight } from 'react-icons/fa';

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
      <section className="flex min-h-[520px] items-center justify-center bg-slate-950 text-white">
        <div className="text-lg md:text-xl">Загрузка...</div>
      </section>
    );
  }

  if (services.length === 0) {
    return null;
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-16 md:py-24">
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="animate-pulse absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-cs-blue/30 blur-3xl" />
        <div className="animate-pulse absolute bottom-10 left-10 h-56 w-56 rounded-full bg-fuchsia-500/20 blur-3xl" />
        <div className="animate-pulse absolute -bottom-28 right-24 h-80 w-80 rounded-full bg-emerald-500/20 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-full flex-col gap-10 px-4 text-white md:px-6">
        <motion.h2
          className="text-center text-3xl font-bold leading-tight tracking-tight md:text-4xl lg:text-5xl"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <span className="relative inline-block before:absolute before:-inset-2 before:block before:-skew-y-2 before:bg-white/90 before:blur-[2px]">
            <span className="relative text-slate-950">БИЗНИНГ</span>
          </span>
          <span className="ml-2 md:ml-3">ХИЗМАТЛАР</span>
        </motion.h2>

        <motion.p
          className="mx-auto max-w-3xl text-center text-base text-slate-300 md:text-lg"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 0.6,
            delay: 0.15,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        >
          Har bir yo'nalishda soha ehtiyojlariga mos yechimlar, chuqur tahlillar
          va operatsion qo'llab-quvvatlashni taqdim etamiz.
        </motion.p>

        <motion.div
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.12,
              },
            },
          }}
        >
          {services.map((serv, index) => (
            <Link
              key={serv.id}
              href="/services"
              className="group block h-full"
            >
              <motion.div
                variants={{
                  hidden: { opacity: 0, scale: 0.94, y: 24 },
                  visible: { opacity: 1, scale: 1, y: 0 },
                }}
                transition={{
                  duration: 0.6,
                  ease: [0.43, 0.13, 0.23, 0.96],
                }}
                whileHover={{
                  translateY: -6,
                  transition: { duration: 0.25, ease: [0.34, 1.56, 0.64, 1] },
                }}
                className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl transition-all duration-300 group-hover:border-cs-blue/60 group-hover:shadow-[0_35px_80px_-40px_rgba(59,130,246,0.8)]"
              >
                <div className="absolute inset-0">
                  {(serv.imageBase64 || serv.image) && (
                    <img
                      src={serv.imageBase64 || serv.image}
                      alt={serv.title}
                      className="h-full w-full object-cover opacity-80 transition-transform duration-[750ms] ease-out group-hover:scale-105"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-950/80 via-slate-950/70 to-slate-900/60" />
                  <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="absolute inset-0 bg-gradient-to-tr from-cs-blue/30 via-transparent to-transparent" />
                  </div>
                </div>

                <div className="relative z-10 flex h-full flex-col justify-between p-6 md:p-7">
                  <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-slate-300">
                    <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 font-semibold text-slate-200">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="hidden rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold text-slate-200 sm:inline">
                      хизматлар йуналиши
                    </span>
                  </div>

                  <div className="mt-12 space-y-4">
                    <h3 className="text-2xl font-semibold text-white transition-colors duration-300 group-hover:text-cs-blue md:text-xl lg:text-2xl">
                      {serv.title}
                    </h3>
                    <p className="text-sm text-slate-200 md:text-base">
                      {serv.text}
                    </p>
                  </div>

                  <div className="mt-8 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-cs-blue transition group-hover:text-white">
                    Батафсил маълумот
                    <FaArrowRight className="text-xs" />
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
