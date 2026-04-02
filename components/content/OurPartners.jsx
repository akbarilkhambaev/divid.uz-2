'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
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
      <section className="flex min-h-[480px] items-center justify-center bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <div className="text-lg text-white md:text-xl">Yuklanmoqda...</div>
      </section>
    );
  }

  if (partners.length === 0) {
    return null;
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-16 text-white md:py-20">
      <div className="pointer-events-none absolute inset-0 opacity-35">
        <div className="animate-pulse absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-cs-blue/25 blur-3xl" />
        <div className="animate-pulse absolute bottom-16 left-12 h-56 w-56 rounded-full bg-fuchsia-500/15 blur-3xl" />
        <div className="animate-pulse absolute -bottom-28 right-24 h-72 w-72 rounded-full bg-emerald-500/15 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-full flex-col gap-10 px-4 md:px-6">
        <motion.h2
          className="text-center text-3xl font-bold uppercase leading-tight tracking-tight md:text-4xl lg:text-5xl"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <span className="relative inline-block before:absolute before:-inset-2 before:block before:-skew-y-2 before:bg-white/90 before:blur-[2px]">
            <span className="relative text-slate-950">BIZNING</span>
          </span>
          <span className="ml-2 text-cs-blue"> HAMKORLARIMIZ</span>
        </motion.h2>

        <motion.div
          className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 md:gap-6 lg:gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
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
          {partners.map((partner) => (
            <motion.div
              key={partner.id}
              variants={{
                hidden: { opacity: 0, scale: 0.94, y: 24 },
                visible: { opacity: 1, scale: 1, y: 0 },
              }}
              transition={{
                duration: 0.5,
                ease: [0.43, 0.13, 0.23, 0.96],
              }}
              whileHover={{
                translateY: -6,
                transition: { duration: 0.25, ease: [0.34, 1.56, 0.64, 1] },
              }}
              className="relative flex min-h-[120px] items-center justify-center overflow-hidden rounded-3xl border border-white/10 bg-white/10 p-4 shadow-lg backdrop-blur-xl transition-all duration-300"
            >
              <div className="absolute inset-0 bg-white" />
              <Image
                src={
                  partner.imageBase64 ||
                  partner.image ||
                  partner.src ||
                  '/ourpartners/default.png'
                }
                alt={partner.alt || partner.name || 'Партнер'}
                width={180}
                height={180}
                className="relative z-10 h-auto w-full max-w-[110px] object-contain transition-transform duration-[650ms] ease-out group-hover:scale-110 md:max-w-[140px]"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
