'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function FAQAccordion() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const q = query(collection(db, 'faq'), orderBy('order', 'asc'));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setFaqs(data);
      } catch (error) {
        console.error('Ошибка загрузки FAQ:', error);
        setFaqs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFAQs();
  }, []);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  if (loading) {
    return (
      <section className="flex min-h-[460px] items-center justify-center bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <div className="text-lg text-white md:text-xl">Yuklanmoqda...</div>
      </section>
    );
  }

  if (faqs.length === 0) {
    return null;
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-16 text-white md:py-20">
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="animate-pulse absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-cs-blue/25 blur-3xl" />
        <div className="animate-pulse absolute bottom-12 left-10 h-60 w-60 rounded-full bg-fuchsia-500/20 blur-3xl" />
        <div className="animate-pulse absolute -bottom-32 right-24 h-80 w-80 rounded-full bg-emerald-500/15 blur-3xl" />
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
            <span className="relative text-slate-950">KO‘PINCHA</span>
          </span>
          <span className="ml-3 text-cs-blue">BERILADIGAN SAVOLLAR</span>
        </motion.h2>

        <motion.div
          className="space-y-4 md:space-y-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.14,
                delayChildren: 0.25,
              },
            },
          }}
        >
          {faqs.map((faq, index) => (
            <motion.div
              key={faq.id || index}
              variants={{
                hidden: { opacity: 0, y: 28 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{
                duration: 0.6,
                ease: [0.43, 0.13, 0.23, 0.96],
              }}
              className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl transition-all duration-300 ${
                activeIndex === index
                  ? 'border-cs-blue/60 shadow-[0_35px_80px_-40px_rgba(59,130,246,0.8)]'
                  : 'shadow-[0_30px_80px_-60px_rgba(15,23,42,0.85)]'
              }`}
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="relative flex w-full items-center justify-between gap-4 px-6 py-5 text-left md:px-8 md:py-6"
              >
                <div className="flex items-start gap-4">
                  <span
                    className={`text-base font-semibold uppercase tracking-wide md:text-lg lg:text-xl ${
                      activeIndex === index ? 'text-cs-blue' : 'text-white'
                    }`}
                  >
                    {faq.question}
                  </span>
                </div>
                <span
                  className={`flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/5 text-lg font-bold text-white transition-all duration-300 ${
                    activeIndex === index
                      ? 'rotate-180 border-cs-blue/40 bg-cs-blue/20 text-cs-blue'
                      : ''
                  }`}
                >
                  ▼
                </span>
              </button>
              <div
                className={`grid transition-all duration-400 ease-in-out ${
                  activeIndex === index ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                }`}
              >
                <div className="overflow-hidden">
                  <div className="px-6 pb-6 text-slate-200 md:px-8 md:pb-8">
                    <p className="text-sm md:text-base lg:text-lg leading-relaxed text-slate-200/90">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
