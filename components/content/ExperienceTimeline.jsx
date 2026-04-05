'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '@/lib/firebase';

const cardVariants = {
  hidden: { opacity: 0, scale: 0.94, y: 24 },
  visible: { opacity: 1, scale: 1, y: 0 },
};

export default function ExperienceTimeline() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const snap = await getDocs(
          query(collection(db, 'partners'), orderBy('order', 'asc')),
        );

        const partners = snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Group partners by category; partners without a category go into a fallback group
        const groupMap = new Map();
        partners.forEach((p) => {
          const cat = p.category?.trim() || 'Boshqalar';
          if (!groupMap.has(cat)) groupMap.set(cat, []);
          groupMap.get(cat).push(p);
        });

        const grouped = Array.from(groupMap.entries()).map(
          ([title, items]) => ({
            title,
            items,
          }),
        );

        setCards(grouped);
      } catch (error) {
        console.error('Failed to load partners', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPartners();
  }, []);

  if (loading) {
    return (
      <section className="flex min-h-[520px] items-center justify-center bg-slate-950 text-white">
        <div className="text-lg md:text-xl">Yuklanmoqda...</div>
      </section>
    );
  }

  if (cards.length === 0) return null;

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-16 md:py-24">
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="animate-pulse absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-cs-blue/30 blur-3xl" />
        <div className="animate-pulse absolute bottom-10 left-16 h-60 w-60 rounded-full bg-fuchsia-500/20 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-full flex-col gap-6 px-4 text-white md:px-6">
        <motion.h2
          className="text-center text-3xl font-bold leading-tight tracking-tight md:text-4xl lg:text-5xl"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <span className="relative inline-block before:absolute before:-inset-2 before:block before:-skew-y-2 before:bg-white/90 before:blur-[2px]">
            <span className="relative text-slate-950">SOHALAR</span>
          </span>
          <span className="ml-2 md:ml-3">
            BO'YICHA TAJRIBAMIZ VA HAMKORLARIMIZ
          </span>
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
          Har bir loyiha uchun soha xususiyatlarini inobatga olib, operatsion
          jarayonlar, raqamli yechimlar va boshqaruv amaliyotlarini
          moslashtiramiz.
        </motion.p>

        <div className="relative mt-12 lg:mt-16">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {cards.map((card, idx) => (
              <motion.article
                key={card.title}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.6,
                  delay: idx * 0.08,
                  ease: [0.43, 0.13, 0.23, 0.96],
                }}
                className="relative flex flex-col gap-6 overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl md:p-8"
              >
                {/* Card number + title */}
                <div className="flex items-center gap-3">
                  <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-slate-200">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <h3 className="text-lg font-semibold uppercase tracking-wide text-white md:text-xl">
                    {card.title}
                  </h3>
                </div>

                {/* Divider */}
                <div className="h-px w-full bg-white/10" />

                {/* Partner logos */}
                <div className="grid grid-cols-3 gap-3">
                  {card.items.map((partner) => (
                    <div
                      key={partner.id}
                      className="flex flex-col items-center gap-2"
                    >
                      <div className="flex aspect-square w-full items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white p-2">
                        <Image
                          src={
                            partner.imageBase64 ||
                            partner.image ||
                            partner.src ||
                            '/ourpartners/default.png'
                          }
                          alt={partner.alt || partner.name || 'Partner'}
                          width={96}
                          height={96}
                          className="h-full w-full object-contain"
                        />
                      </div>
                      {(partner.alt || partner.name) && (
                        <span className="text-center text-xs text-slate-300 leading-tight">
                          {partner.alt || partner.name}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
