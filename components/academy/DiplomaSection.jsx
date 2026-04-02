'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

const defaultSettings = {
  sectionTitle: 'Kurs yakunida nimaga ega bo‘lasiz',
  sectionSubtitle: 'Dividend Academy Diplomi – Sizning Moliyaviy Pasportingiz',
  diplomaBlockTitle: 'Diplom sizga quyidagilarni beradi:',
  diplomaBlockText:
    'Bizning diplom - "faqat qatnashganlik" hujjati emas, balki bozorga chiqqaningizda sizni boshqa nomzodlardan ajratib turadigan isbotlangan natija.',
  certificateBlockTitle: 'Dividend Academy diplomi ustunliklari:',
  certificateBlockText:
    'Hozirda Dividend Academy diplomi hamkor kompaniyalari oldida tan olinadi (30+ kompaniya). Keyingi qadam: xalqaro/davlat akkreditatsiyasi uchun hujjatlar tayyorlanmoqda. Natijada sizning diplomingiz vaqt o‘tishi bilan yanada qimmatlashadi.',
};

export default function DiplomaSection() {
  const [settings, setSettings] = useState(defaultSettings);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const docRef = doc(db, 'academySettings', 'diploma');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setSettings((prev) => ({ ...prev, ...docSnap.data() }));
        }
      } catch (error) {
        console.error('Error fetching diploma settings:', error);
      }
    };
    fetchSettings();
  }, []);

  return (
    <section
      id="diploma"
      className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex items-center justify-center relative px-4 md:px-8 py-16 scroll-mt-18 overflow-hidden"
    >
      <div className="absolute top-8 right-8 text-white/10 text-6xl md:text-8xl font-bold">
        06
      </div>

      <div className="max-w-7xl w-full">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 text-white"
        >
          {settings.sectionTitle}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-lg md:text-xl text-white/70 mb-16 max-w-4xl"
        >
          {settings.sectionSubtitle}
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Content Blocks */}
          <div className="space-y-6">
            {/* Diplom Block */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-all duration-300"
            >
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                {settings.diplomaBlockTitle}
              </h3>
              <p className="text-white/80 text-lg leading-relaxed">
                {settings.diplomaBlockText}
              </p>
            </motion.div>

            {/* Sertifikat Block */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-all duration-300"
            >
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                {settings.certificateBlockTitle}
              </h3>
              <p className="text-white/80 text-lg leading-relaxed">
                {settings.certificateBlockText}
              </p>
            </motion.div>
          </div>

          {/* Right Side - Diploma Visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="relative">
              {/* Animated Background Circles */}
              <motion.div
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                className="absolute inset-0 opacity-30"
              >
                <div className="absolute top-1/4 right-1/4 w-64 h-64 border-2 border-cs-blue rounded-full"></div>
                <div className="absolute bottom-1/4 left-1/4 w-48 h-48 border-2 border-blue-400 rounded-full"></div>
              </motion.div>

              {/* Diploma Cards Container */}
              <div className="relative z-10">
                {/* Main Diploma - Center */}
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="relative"
                >
                  <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-1 rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-300">
                    <div className="bg-black rounded-xl p-8 md:p-12">
                      <div className="flex items-center justify-between mb-6">
                        <div className="text-sm text-cs-blue font-mono">
                          DIVIDEND
                        </div>
                        <div className="flex gap-2">
                          <div className="w-8 h-8 bg-cs-blue/20 rounded-lg flex items-center justify-center">
                            <span className="text-cs-blue text-xs">
                              &lt;/&gt;
                            </span>
                          </div>
                          <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                            <span className="text-blue-400 text-xs">⚡</span>
                          </div>
                        </div>
                      </div>
                      <h4 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        DIPLOM
                      </h4>
                      <div className="space-y-2 text-white/60 text-sm">
                        <p>ИСМИ ФАМИЛИЯСИ</p>
                        <p className="text-xs">Corporate Finance Specialist</p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Certificate - Top Right */}
                <motion.div
                  initial={{ opacity: 0, x: 40, y: -20 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="absolute -top-8 -right-8 md:-top-12 md:-right-12 w-48 md:w-64"
                >
                  <div className="bg-white p-1 rounded-xl shadow-2xl transform rotate-12 hover:rotate-6 transition-transform duration-300">
                    <div className="bg-gray-50 rounded-lg p-4 md:p-6">
                      <div className="text-xs text-gray-600 mb-2">
                        CERTIFICATE
                      </div>
                      <div className="text-sm font-bold text-gray-800 mb-2">
                        Сертификат
                      </div>
                      <div className="text-xs text-gray-500">
                        Financial Analysis
                      </div>
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <div className="text-xs text-gray-400">
                          Dividend Academy
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Certificate - Bottom Left */}
                <motion.div
                  initial={{ opacity: 0, x: -40, y: 20 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  className="absolute -bottom-8 -left-8 md:-bottom-12 md:-left-12 w-48 md:w-64"
                >
                  <div className="bg-white p-1 rounded-xl shadow-2xl transform -rotate-12 hover:-rotate-6 transition-transform duration-300">
                    <div className="bg-gray-50 rounded-lg p-4 md:p-6">
                      <div className="text-xs text-gray-600 mb-2">
                        CERTIFICATE OF COMPLETION
                      </div>
                      <div className="text-sm font-bold text-gray-800 mb-2">
                        Тугалланганлик
                      </div>
                      <div className="text-xs text-gray-500">
                        Advanced Corporate Finance
                      </div>
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <div className="text-xs text-gray-400">2024-2025</div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Decorative Elements */}
                <motion.div
                  animate={{ y: [0, -20, 0] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="absolute top-1/2 -right-8 text-4xl"
                >
                  ⚡
                </motion.div>
                <motion.div
                  animate={{ y: [0, 20, 0] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 1.5,
                  }}
                  className="absolute bottom-1/3 -left-8 text-3xl"
                >
                  ✨
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
