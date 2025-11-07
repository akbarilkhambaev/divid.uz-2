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
      <section className="min-h-[500px] md:min-h-[720px] h-full mx-auto px-4 py-8 md:py-16 bg-radial from-gray-600 via-gray-60% to-gray-900 text-white flex items-center justify-center">
        <div className="text-lg md:text-xl">Загрузка...</div>
      </section>
    );
  }

  if (faqs.length === 0) {
    return null;
  }

  return (
    <section className="min-h-[500px] md:min-h-[720px] h-full mx-auto px-4 py-8 md:py-16 bg-radial from-gray-600 via-gray-60% to-gray-900 text-white">
      <motion.h2
        className="text-2xl md:text-3xl lg:text-5xl uppercase font-bold mb-4 md:mb-6 text-center px-2"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <span className="relative inline-block before:absolute before:-inset-2 before:block before:-skew-y-2 before:bg-cs-blue">
          <span className="relative text-white">КОПИНЧА</span>
        </span>{' '}
        <span className="ml-2 text-cs-blue">БЕРИЛАДИГАН САВОЛЛАР</span>
      </motion.h2>
      <motion.div
        className="space-y-3 md:space-y-4 pt-4 md:pt-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.12,
              delayChildren: 0.2,
            },
          },
        }}
      >
        {faqs.map((faq, index) => (
          <motion.div
            key={faq.id || index}
            variants={{
              hidden: { opacity: 0, x: -60 },
              visible: { opacity: 1, x: 0 },
            }}
            transition={{
              duration: 0.6,
              ease: [0.43, 0.13, 0.23, 0.96],
            }}
            className={`border ${
              activeIndex === index ? 'border-cs-blue' : 'border-gray-600'
            } rounded-lg shadow-lg overflow-hidden transition-all duration-500 bg-gray-700`}
          >
            <button
              onClick={() => toggleAccordion(index)}
              className={`w-full flex justify-between items-center p-4 md:p-6 text-left ${
                activeIndex === index ? 'text-cs-blue' : 'text-white'
              } font-semibold text-base md:text-lg lg:text-xl uppercase focus:outline-none`}
            >
              <span className="pr-4">{faq.question}</span>
              <span
                className={`transform transition-transform duration-300 text-lg md:text-xl flex-shrink-0 ${
                  activeIndex === index
                    ? 'rotate-180 text-cs-blue'
                    : 'text-white'
                }`}
              >
                ▼
              </span>
            </button>
            <div
              className={`transition-all duration-300 ease-in-out ${
                activeIndex === index
                  ? 'max-h-screen p-4 md:p-6'
                  : 'max-h-0 p-0'
              } overflow-hidden bg-gray-800`}
            >
              <p className="text-gray-300 text-sm md:text-base lg:text-lg leading-relaxed">
                {faq.answer}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
