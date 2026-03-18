'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import {
  collection,
  getDocs,
  query,
  orderBy,
  doc,
  getDoc,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

const defaultSettings = {
  sectionTitle: 'Сизни бепул кириш дарсига таклиф қиламиз',
  topic:
    '"Нега кўпчилик бизнеслар 3 йилда банкрот бўлади — ва нега уларнинг молиявий ҳисоботлари фойда келтирмайди?"',
  dateText: 'Сана:',
  durationText: 'Давомийлиги: 2 соат',
  seatsText: 'Жойлар сони чекланган',
  registrationText: 'Рўйхатдан ўтиш учун:',
  learningTitle: 'Бу дарсда биз:',
  footerNote:
    'Ҳамда академиямиз ва курсларимиз ҳақида тўлиқ малумотлар берамиз.',
};

const defaultLearningPoints = [
  {
    text: 'ҳисоботларда рақамлар ортда яширинган вақтинчалик "ўсиш" иллузияларини мавжудлигини',
  },
  { text: 'нега кўпчилик ҳисоботлар real ҳолатни акс еттирмаслигини,' },
  {
    text: 'уларни қандай қилиб бошқарув қарорларига йўналтирган шаклда тузиш мумкинлигини',
  },
  { text: 'ва хатоларни ерта аниқлаш йўлларини муҳокама қиламиз' },
];

export default function FreeLessonSection() {
  const [settings, setSettings] = useState(defaultSettings);
  const [learningPoints, setLearningPoints] = useState(defaultLearningPoints);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch settings
        const settingsRef = doc(db, 'academySettings', 'freeLesson');
        const settingsSnap = await getDoc(settingsRef);
        if (settingsSnap.exists()) {
          setSettings((prev) => ({ ...prev, ...settingsSnap.data() }));
        }

        // Fetch learning points
        const q = query(
          collection(db, 'academyLearningPoints'),
          orderBy('order', 'asc'),
        );
        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
          const points = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setLearningPoints(points);
        }
      } catch (error) {
        console.error('Error fetching free lesson data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <section
      id="free-lesson"
      className="min-h-screen bg-cs-blue flex items-center justify-center relative px-4 md:px-8 py-16 scroll-mt-18"
    >
      <div className="absolute top-8 right-8 text-white/10 text-6xl md:text-8xl font-bold">
        11
      </div>
      <div className="max-w-7xl w-full text-white">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-5xl lg:text-6xl font-bold mb-16 text-center"
        >
          {settings.sectionTitle}
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Topic */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-2xl font-bold mb-6">Мавзу:</p>
            <h3 className="text-2xl md:text-3xl font-bold mb-8 leading-tight">
              {settings.topic}
            </h3>

            <div className="text-8xl mb-8 text-center">↓</div>

            <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-3xl">📅</span>
                <div>
                  <p className="font-semibold">{settings.dateText}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-3xl">⏰</span>
                <div>
                  <p className="font-semibold">{settings.durationText}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-3xl">👥</span>
                <div>
                  <p className="font-semibold">{settings.seatsText}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-3xl">📍</span>
                <div>
                  <p className="font-semibold">{settings.registrationText}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right side - What you'll learn */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl"
          >
            <h3 className="text-3xl font-bold mb-8">
              {settings.learningTitle}
            </h3>
            <ul className="space-y-6">
              {learningPoints.map((point, idx) => (
                <li
                  key={point.id || idx}
                  className="flex gap-4"
                >
                  <span className="text-2xl flex-shrink-0">✓</span>
                  <p className="text-lg">{point.text}</p>
                </li>
              ))}
            </ul>

            <p className="mt-8 text-sm text-white/70">{settings.footerNote}</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
