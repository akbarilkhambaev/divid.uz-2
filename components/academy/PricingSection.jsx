'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

const defaultPricing = {
  sectionTitle: 'Boshlang‘ich kurs narxlari',
  beginnerPackageTitle: 'Boshlang‘ich paket (2 oy)',
  beginnerCourse1Title: 'Korporativ moliyaga kirish',
  beginnerCourse1Price: '8 MLN',
  beginnerCourse2Title: 'Moliyaviy tahlilchi',
  beginnerCourse2Price: '12 MLN',
  beginnerTotalPrice: "Umumiy qiymat: 20 MLN so'm",
  beginnerTotalNote:
    '(2 oy davomida, 24 ta nazariy, 8 amaliy dars, 40 dan oshiq keyslar)',
  additionalTitle: 'Qo‘shimcha imkoniyat',
  additionalCourse1Title: 'Individual mentorlik',
  additionalCourse1Price: '4 MLN',
  additionalCourse2Title: 'Individual mentorlik',
  additionalCourse2Price: '6 MLN',
  additionalResultNote:
    'Natija: atigi 2 oy ichida moliyaviy sifatida ish boshlash darajasiga chiqasiz',
  footerNote:
    'Hamda akademiyamiz va kurslarimiz haqida to‘liq maʼlumotlar beramiz.',
};

export default function PricingSection() {
  const [pricing, setPricing] = useState(defaultPricing);

  useEffect(() => {
    const fetchPricing = async () => {
      try {
        const docRef = doc(db, 'academySettings', 'pricing');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setPricing({ ...defaultPricing, ...docSnap.data() });
        }
      } catch (error) {
        console.error('Error fetching pricing:', error);
      }
    };
    fetchPricing();
  }, []);

  return (
    <section
      id="pricing"
      className="min-h-screen bg-black flex items-center justify-center relative px-4 md:px-8 py-16 scroll-mt-18"
    >
      <div className="absolute top-8 right-8 text-white/10 text-6xl md:text-8xl font-bold">
        09
      </div>
      <div className="max-w-7xl w-full text-white">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-5xl lg:text-6xl font-bold mb-16 text-center uppercase"
        >
          {pricing.sectionTitle}
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Boshlang'ich paket */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <h3 className="text-3xl font-bold mb-6">
              {pricing.beginnerPackageTitle}
            </h3>

            <div className="bg-orange-500 p-6 rounded-xl">
              <p className="text-sm mb-2">1 КУРС</p>
              <p className="text-xl font-semibold mb-3">
                {pricing.beginnerCourse1Title}
              </p>
              <p className="text-5xl font-bold">
                {pricing.beginnerCourse1Price}
              </p>
              <p className="text-sm mt-1">со'м</p>
            </div>

            <div className="bg-orange-500 p-6 rounded-xl">
              <p className="text-sm mb-2">2 КУРС</p>
              <p className="text-xl font-semibold mb-3">
                {pricing.beginnerCourse2Title}
              </p>
              <p className="text-5xl font-bold">
                {pricing.beginnerCourse2Price}
              </p>
              <p className="text-sm mt-1">со'м</p>
            </div>

            <div className="bg-gradient-to-r from-yellow-600 to-yellow-700 p-6 rounded-xl">
              <p className="text-sm mb-2">*Бу курслар биргаликда ўқилади</p>
              <p className="text-3xl font-bold">{pricing.beginnerTotalPrice}</p>
              <p className="text-sm mt-2 text-white/80">
                {pricing.beginnerTotalNote}
              </p>
            </div>
          </motion.div>

          {/* Qo'shimcha imkoniyat */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            <h3 className="text-3xl font-bold mb-6">
              {pricing.additionalTitle}
            </h3>

            <div className="bg-teal-500 p-6 rounded-xl">
              <p className="text-sm mb-2">1 КУРС</p>
              <p className="text-xl font-semibold mb-3">
                {pricing.additionalCourse1Title}
              </p>
              <p className="text-5xl font-bold">
                {pricing.additionalCourse1Price}
              </p>
              <p className="text-sm mt-1">со'м</p>
            </div>

            <div className="bg-teal-500 p-6 rounded-xl">
              <p className="text-sm mb-2">2 КУРС</p>
              <p className="text-xl font-semibold mb-3">
                {pricing.additionalCourse2Title}
              </p>
              <p className="text-5xl font-bold">
                {pricing.additionalCourse2Price}
              </p>
              <p className="text-sm mt-1">со'м</p>
            </div>

            <div className="bg-teal-600/50 p-6 rounded-xl border-2 border-teal-400">
              <p className="text-lg font-semibold">
                {pricing.additionalResultNote}
              </p>
            </div>
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center text-white/70 text-sm"
        >
          {pricing.footerNote}
        </motion.p>
      </div>
    </section>
  );
}
