'use client';

import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';

const defaultAudiences = [
  {
    title: 'Янги бошловчилар',
    desc: 'Молиявий соҳада карьера бошламоқчи бўлган кишилар учун асосий билимлар',
    animationPath: '/academy/lottie-beginner.json',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    title: 'Амалиётчилар',
    desc: 'Ўз билимларини чуқурлаштириш ва замонавий усулларни ўрганмоқчи мутахассислар',
    animationPath: '/academy/lottie-practitioner.json',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    title: 'Тадбиркорлар',
    desc: 'Ўз бизнесини тўғри бошқариш ва молиявий жиҳатдан ривожлантириш истаганлар',
    animationPath: '/academy/lottie-entrepreneur.json',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    title: 'Малакали мутахассислар',
    desc: 'CFO, финансовый директор ва юқори лавозимларга талонт бўлганлар',
    animationPath: '/academy/lottie-professional.json',
    gradient: 'from-blue-500 to-cyan-500',
  },
];

export default function TargetAudienceSection() {
  const [animationData, setAnimationData] = useState({});
  const [audiences, setAudiences] = useState(defaultAudiences);

  // Загружаем данные из Firestore
  useEffect(() => {
    const fetchAudiences = async () => {
      try {
        const q = query(
          collection(db, 'academyAudience'),
          orderBy('order', 'asc'),
        );
        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
          const firebaseData = snapshot.docs.map((doc) => ({
            id: doc.id,
            title: doc.data().title,
            desc: doc.data().description,
            animationPath: doc.data().animationPath,
            gradient: doc.data().gradient || 'from-blue-500 to-cyan-500',
          }));
          setAudiences(firebaseData);
        }
      } catch (error) {
        console.error('Error fetching audiences:', error);
      }
    };
    fetchAudiences();
  }, []);

  // Загружаем все анимации
  useEffect(() => {
    const loadAnimations = async () => {
      const loaded = {};
      for (const audience of audiences) {
        if (audience.animationPath) {
          try {
            const response = await fetch(audience.animationPath);
            const data = await response.json();
            loaded[audience.animationPath] = data;
          } catch (error) {
            console.error(`Failed to load ${audience.animationPath}:`, error);
          }
        }
      }
      setAnimationData(loaded);
    };
    loadAnimations();
  }, [audiences]);

  return (
    <section
      id="audience"
      className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 flex items-center justify-center relative px-4 md:px-8 py-16 scroll-mt-18 overflow-hidden"
    >
      {/* Decorative background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl" />
      </div>

      <div className="absolute top-8 right-8 text-gray-200 text-6xl md:text-8xl font-bold z-0">
        03
      </div>

      <div className="max-w-7xl w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            Кимлар учун?
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Ҳар бир даражадаги мутахассислар учун мўлжалланган
          </p>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Gradient line connecting all items */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 via-orange-500 to-green-500 hidden md:block transform -translate-x-1/2" />

          <div className="space-y-12 md:space-y-24">
            {audiences.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -60 : 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{
                  duration: 0.8,
                  ease: [0.43, 0.13, 0.23, 0.96],
                  delay: idx * 0.2,
                }}
                className={`relative flex flex-col md:flex-row items-center gap-8 ${
                  idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-8 md:left-1/2 w-6 h-6 transform -translate-x-1/2 hidden md:block z-10">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.2 + 0.3 }}
                    className={`w-6 h-6 rounded-full bg-gradient-to-br ${item.gradient} shadow-lg ring-4 ring-white`}
                  />
                </div>

                {/* Content Card */}
                <div
                  className={`w-full md:w-5/12 ${
                    idx % 2 === 0
                      ? 'md:text-right md:pr-12'
                      : 'md:text-left md:pl-12'
                  }`}
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="group relative"
                  >
                    {/* Glow effect */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-r ${item.gradient} rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300`}
                    />

                    <div className="relative bg-white p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
                      {/* Number badge */}
                      <div
                        className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br ${item.gradient} text-white text-xl font-bold mb-4 shadow-md`}
                      >
                        {idx + 1}
                      </div>

                      <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                        {item.title}
                      </h3>

                      <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                </div>

                {/* Image/Illustration */}
                <div className="w-full md:w-5/12">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: idx * 0.2 + 0.2 }}
                    whileHover={{ scale: 1.05, rotate: idx % 2 === 0 ? 2 : -2 }}
                    className="relative"
                  >
                    {/* Animation container with gradient border */}
                    <div
                      className={`relative rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br ${item.gradient} p-1`}
                    >
                      <div className="bg-white rounded-xl overflow-hidden aspect-video flex items-center justify-center p-8">
                        {animationData[item.animationPath] ? (
                          <Lottie
                            animationData={animationData[item.animationPath]}
                            loop={true}
                            className="w-full h-full"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            Загрузка...
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Floating number badge */}
                    <div
                      className={`absolute -top-4 ${
                        idx % 2 === 0 ? '-right-4' : '-left-4'
                      } w-16 h-16 rounded-full bg-gradient-to-br ${
                        item.gradient
                      } flex items-center justify-center text-white font-bold text-2xl shadow-lg`}
                    >
                      {idx + 1}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex justify-center mt-16 relative z-20"
          >
            <div className="bg-cs-blue text-white px-8 py-4 rounded-full font-semibold shadow-lg text-lg">
              Биз билан хозирок богланинг!
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
