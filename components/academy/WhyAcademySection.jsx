'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';

const defaultAdvantages = [
  'Amaliyotga asoslangan dastur',
  'Big 4 tajribasi bor mentorlar',
  'Haqiqiy korporativ keyslar',
  'Zamonaviy moliyaviy vositalar',
  'Xalqaro standartlar',
  'Ish joylashtirish kafolati',
  'Fleksibil o‘qish grafigi',
  'Online va offline formatlar',
  'Davomiy qo‘llab-quvvatlash',
];

export default function WhyAcademySection() {
  const [advantages, setAdvantages] = useState(defaultAdvantages);

  useEffect(() => {
    const fetchAdvantages = async () => {
      try {
        const q = query(
          collection(db, 'academyWhyItems'),
          orderBy('order', 'asc'),
        );
        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
          const firebaseData = snapshot.docs.map((doc) => doc.data().title);
          setAdvantages(firebaseData);
        }
      } catch (error) {
        console.error('Error fetching advantages:', error);
      }
    };
    fetchAdvantages();
  }, []);

  return (
    <section
      id="why"
      className="min-h-screen bg-cs-blue flex items-center justify-center relative px-4 md:px-8 py-16 scroll-mt-18"
    >
      <div className="absolute top-8 right-8 text-gray-200 text-6xl md:text-8xl font-bold">
        04
      </div>
      <div className="max-w-7xl w-full">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-100 mb-16 text-center"
        >
          Nega Dividend Akademiya?
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {advantages.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all border-2 border-gray-100"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-cs-blue to-blue-600 rounded-lg mb-4 flex items-center justify-center text-white text-xl font-bold">
                {idx + 1}
              </div>
              <h3 className="text-lg font-semibold text-gray-900">{item}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
