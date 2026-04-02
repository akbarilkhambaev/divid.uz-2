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

const defaultFeatures = [
  'Nazariy o‘zlashtirishlarni tekshiradi',
  'Amaliyotga majbur qiladi',
  'Individual feedback beradi',
  'Sizni real natijaga olib chiqadi',
  'Baholashning 30% mentor xulosasiga bog‘liq',
];

const defaultSettings = {
  sectionTitle: 'Mentor:',
  sectionDescription:
    'Bizda mentor — bu darsdan tashqari savolga javob beruvchi odam emas. Bu sizning natijangiz uchun mas‘ul ustoz.',
};

export default function MentorshipSection() {
  const [features, setFeatures] = useState(defaultFeatures);
  const [settings, setSettings] = useState(defaultSettings);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch settings
        const settingsDoc = await getDoc(
          doc(db, 'academySettings', 'mentorship'),
        );
        if (settingsDoc.exists()) {
          setSettings({
            sectionTitle:
              settingsDoc.data().sectionTitle || defaultSettings.sectionTitle,
            sectionDescription:
              settingsDoc.data().sectionDescription ||
              defaultSettings.sectionDescription,
          });
        }
        // Fetch features
        const q = query(
          collection(db, 'academyMentorshipFeatures'),
          orderBy('order', 'asc'),
        );
        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
          const firebaseData = snapshot.docs.map((d) => d.data().title);
          setFeatures(firebaseData);
        }
      } catch (error) {
        console.error('Error fetching mentorship data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <section
      id="mentorship"
      className="min-h-screen bg-gradient-to-br from-orange-500 to-orange-700 flex items-center justify-center relative px-4 md:px-8 py-16 scroll-mt-18"
    >
      <div className="absolute top-8 right-8 text-white/20 text-6xl md:text-8xl font-bold">
        07
      </div>
      <div className="max-w-7xl w-full text-white">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 text-center"
        >
          {settings.sectionTitle}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl md:text-2xl text-center mb-16 text-white/90"
        >
          {settings.sectionDescription}
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white/10 backdrop-blur-lg p-6 rounded-xl border-2 border-white/20"
            >
              <div className="text-4xl mb-4">✓</div>
              <h3 className="text-xl font-semibold">{item}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
