'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import {
  doc,
  getDoc,
  collection,
  getDocs,
  query,
  orderBy,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

const defaultPremiumFeatures = [
  'Faqat siz uchun ajratilgan mentor',
  'Real kompaniyalarda amaliyotga olib chiqish',
  'Haftasiga umumiy amaliyotdan tashqari 1:1 uchrashuvlar (online/offline)',
  'Rezyume tayyorlash, suhbatlarga tayyorlash',
  'Sizning qiziqishingizga mos keyslar',
];

const defaultSettings = {
  sectionTitle: 'PREMIUM',
  sectionSubtitle: 'INDIVIDUAL MENTOR',
  sectionDescription:
    'Agar siz yanada chuqurroq rivojlanishni istasangiz, qo‘shimcha to‘lov evaziga shaxsiy mentor tanlashingiz mumkin.',
};

export default function IndividualMentorSection() {
  const [premiumFeatures, setPremiumFeatures] = useState(
    defaultPremiumFeatures,
  );
  const [settings, setSettings] = useState(defaultSettings);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch settings
        const settingsDoc = await getDoc(
          doc(db, 'academySettings', 'individual'),
        );
        if (settingsDoc.exists()) {
          setSettings({
            sectionTitle:
              settingsDoc.data().sectionTitle || defaultSettings.sectionTitle,
            sectionSubtitle:
              settingsDoc.data().sectionSubtitle ||
              defaultSettings.sectionSubtitle,
            sectionDescription:
              settingsDoc.data().sectionDescription ||
              defaultSettings.sectionDescription,
          });
        }
        // Fetch features
        const q = query(
          collection(db, 'academyIndividualFeatures'),
          orderBy('order', 'asc'),
        );
        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
          const firebaseData = snapshot.docs.map((d) => d.data().title);
          setPremiumFeatures(firebaseData);
        }
      } catch (error) {
        console.error('Error fetching individual data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <section
      id="individual"
      className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex items-center justify-center relative px-4 md:px-8 py-16 scroll-mt-18"
    >
      <div className="absolute top-8 right-8 text-white/10 text-6xl md:text-8xl font-bold">
        08
      </div>
      <div className="max-w-6xl w-full text-white">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
            {settings.sectionTitle}
            <br />
            <span className="text-cs-blue">{settings.sectionSubtitle}</span>
          </h2>
          <p className="text-xl md:text-2xl text-white/80">
            {settings.sectionDescription}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {premiumFeatures.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="bg-gradient-to-r from-blue-600 to-cs-blue p-8 rounded-xl"
            >
              <div className="text-3xl mb-3">⭐</div>
              <h3 className="text-2xl font-bold">{item}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
