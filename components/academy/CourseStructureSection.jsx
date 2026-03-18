'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

const defaultSettings = {
  sectionTitle: 'Курс тузилиши',
  beginnerTitle: 'Бошланғич дастур',
  beginnerDuration: 'Давомийлиги: 2 ой',
  course1Title: '1-курс: Корпоратив молияга кириш',
  course1Desc: 'Молиявий асослар ва корпоратив ҳисоботлар',
  course2Title: '2-курс: Молиявий таҳлилчи',
  course2Desc: 'Таҳлил усуллари ва прогнозлаш',
  professionalTitle: 'Профессионал дастур',
  professionalDuration: 'Давомийлиги: 5 ой',
  course12Title: '1-2 курс: Бошланғич пакет',
  course12Desc: 'Барча бошланғич курслар',
  course3Title: '3-курс: Илғор молиявий таҳлил',
  course3Desc: 'M&A, валуация, инвестициялар',
  course4Title: '4-курс: Корпоратив стратегия',
  course4Desc: 'Бизнес-режалаштириш ва CFO вазифалари',
};

export default function CourseStructureSection() {
  const [settings, setSettings] = useState(defaultSettings);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const docRef = doc(db, 'academySettings', 'courses');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setSettings((prev) => ({ ...prev, ...docSnap.data() }));
        }
      } catch (error) {
        console.error('Error fetching course settings:', error);
      }
    };
    fetchSettings();
  }, []);

  return (
    <section
      id="structure"
      className="min-h-screen bg-white flex items-center justify-center relative px-4 md:px-8 py-16 scroll-mt-18"
    >
      <div className="absolute top-8 right-8 text-gray-200 text-6xl md:text-8xl font-bold">
        05
      </div>
      <div className="max-w-7xl w-full">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-16 text-center"
        >
          {settings.sectionTitle}
        </motion.h2>

        {/* Grid Container */}
        <div className="space-y-16">
          {/* Boshlang'ich - видео справа */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
          >
            {/* Контент слева */}
            <div className="bg-gradient-to-br from-cs-blue to-blue-700 p-8 rounded-2xl text-white shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <h3 className="text-3xl font-bold mb-4">
                {settings.beginnerTitle}
              </h3>
              <p className="text-2xl font-semibold mb-6">
                {settings.beginnerDuration}
              </p>

              <div className="space-y-4 relative">
                {/* Вертикальная линия таймлайна */}
                <div className="absolute left-3 top-3 bottom-3 w-0.5 bg-white/30 overflow-hidden">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: ['0%', '100%', '100%', '0%'] }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      times: [0, 0.4, 0.6, 1],
                    }}
                    className="w-full bg-gradient-to-b from-white via-white to-white/50"
                  ></motion.div>
                </div>

                {/* Курс 1 */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="relative pl-10"
                >
                  {/* Точка таймлайна */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.4 }}
                    className="absolute left-0 top-4 w-6 h-6 bg-white rounded-full border-4 border-cs-blue shadow-lg"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute inset-0 bg-white rounded-full opacity-50"
                    ></motion.div>
                  </motion.div>

                  <div className="bg-white/20 backdrop-blur p-4 rounded-lg hover:bg-white/30 transition-all">
                    <p className="font-semibold mb-2">
                      {settings.course1Title}
                    </p>
                    <p className="text-sm text-white/80">
                      {settings.course1Desc}
                    </p>
                  </div>
                </motion.div>

                {/* Курс 2 */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="relative pl-10"
                >
                  {/* Точка таймлайна */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.6 }}
                    className="absolute left-0 top-4 w-6 h-6 bg-white rounded-full border-4 border-cs-blue shadow-lg"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                      className="absolute inset-0 bg-white rounded-full opacity-50"
                    ></motion.div>
                  </motion.div>

                  <div className="bg-white/20 backdrop-blur p-4 rounded-lg hover:bg-white/30 transition-all">
                    <p className="font-semibold mb-2">
                      {settings.course2Title}
                    </p>
                    <p className="text-sm text-white/80">
                      {settings.course2Desc}
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Видео справа */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br from-cs-blue to-blue-700 p-1"
            >
              <div className="bg-white rounded-xl overflow-hidden aspect-video">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                >
                  <source
                    src="/academy/structure-beginner.webm"
                    type="video/webm"
                  />
                </video>
              </div>
            </motion.div>
          </motion.div>

          {/* Professional - видео слева */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
          >
            {/* Видео слева */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br from-blue-600 to-blue-800 p-1 lg:order-1"
            >
              <div className="bg-white rounded-xl overflow-hidden aspect-video">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                >
                  <source
                    src="/academy/structure-professional.webm"
                    type="video/webm"
                  />
                </video>
              </div>
            </motion.div>

            {/* Контент справа */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-8 rounded-2xl text-white shadow-xl hover:shadow-2xl transition-shadow duration-300 lg:order-2">
              <h3 className="text-3xl font-bold mb-4">
                {settings.professionalTitle}
              </h3>
              <p className="text-2xl font-semibold mb-6">
                {settings.professionalDuration}
              </p>

              <div className="space-y-4 relative">
                {/* Вертикальная линия таймлайна справа */}
                <div className="absolute right-3 top-3 bottom-3 w-0.5 bg-white/30 overflow-hidden">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: ['0%', '100%', '100%', '0%'] }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      times: [0, 0.4, 0.6, 1],
                      delay: 1,
                    }}
                    className="w-full bg-gradient-to-b from-white via-white to-white/50"
                  ></motion.div>
                </div>

                {/* Курс 1-2 */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="relative pr-10"
                >
                  {/* Точка таймлайна */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.4 }}
                    className="absolute right-0 top-4 w-6 h-6 bg-white rounded-full border-4 border-blue-800 shadow-lg"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute inset-0 bg-white rounded-full opacity-50"
                    ></motion.div>
                  </motion.div>

                  <div className="bg-white/20 backdrop-blur p-4 rounded-lg hover:bg-white/30 transition-all">
                    <p className="font-semibold mb-2">
                      {settings.course12Title}
                    </p>
                    <p className="text-sm text-white/80">
                      {settings.course12Desc}
                    </p>
                  </div>
                </motion.div>

                {/* Курс 3 */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="relative pr-10"
                >
                  {/* Точка таймлайна */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.6 }}
                    className="absolute right-0 top-4 w-6 h-6 bg-white rounded-full border-4 border-blue-800 shadow-lg"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                      className="absolute inset-0 bg-white rounded-full opacity-50"
                    ></motion.div>
                  </motion.div>

                  <div className="bg-white/20 backdrop-blur p-4 rounded-lg hover:bg-white/30 transition-all">
                    <p className="font-semibold mb-2">
                      {settings.course3Title}
                    </p>
                    <p className="text-sm text-white/80">
                      {settings.course3Desc}
                    </p>
                  </div>
                </motion.div>

                {/* Курс 4 */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  className="relative pr-10"
                >
                  {/* Точка таймлайна */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.8 }}
                    className="absolute right-0 top-4 w-6 h-6 bg-white rounded-full border-4 border-blue-800 shadow-lg"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                      className="absolute inset-0 bg-white rounded-full opacity-50"
                    ></motion.div>
                  </motion.div>

                  <div className="bg-white/20 backdrop-blur p-4 rounded-lg hover:bg-white/30 transition-all">
                    <p className="font-semibold mb-2">
                      {settings.course4Title}
                    </p>
                    <p className="text-sm text-white/80">
                      {settings.course4Desc}
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
