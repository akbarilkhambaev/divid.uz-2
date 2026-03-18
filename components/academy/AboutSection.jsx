'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';

const defaultSlides = [
  {
    title: 'Дарсларда қатнашиш',
    subtitle: '(80% амалиёт, 20% назарий билимлар)',
    description: 'Машғулотларда янги мавзуни ўзлаштирасиз ва билимларни мустаҳкамлаш учун уй вазифасини бажаришингиз керак.',
    videoUrl: '/academy/class-1.webm',
  },
  {
    title: 'Амалий курслар',
    subtitle: '(Фақат реал бизнес кейслари)',
    description: 'Бизнинг курсларимиз фақат назарий билимлар билан чегараланмайди.',
    videoUrl: '/academy/practical-2.webm',
  },
];

export default function AboutSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState(defaultSlides);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const q = query(collection(db, 'academyAboutSlides'), orderBy('order', 'asc'));
        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
          const firebaseSlides = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          setSlides(firebaseSlides);
        }
      } catch (error) {
        console.error('Error fetching about slides:', error);
      }
    };
    fetchSlides();
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section id="about" className="min-h-screen bg-gray-900 flex items-center justify-center relative px-4 md:px-8 py-16 scroll-mt-18">
      <div className="absolute top-8 right-8 text-white/20 text-6xl md:text-8xl font-bold">02</div>
      <div className="max-w-7xl w-full">
        <motion.h2 initial={{ opacity: 0, y: -30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-12 text-center">
          Дивиденд Академия хақида
        </motion.h2>
        <div className="relative bg-gray-800 rounded-2xl overflow-hidden shadow-2xl">
          <AnimatePresence mode="wait">
            <motion.div key={currentSlide} initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -100 }} transition={{ duration: 0.5 }} className="grid grid-cols-1 lg:grid-cols-2 gap-0 min-h-[600px]">
              <div className="p-8 md:p-12 flex flex-col justify-center bg-gray-800 order-2 lg:order-1">
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">{slides[currentSlide]?.title}</h3>
                <p className="text-lg md:text-xl text-blue-400 mb-6">{slides[currentSlide]?.subtitle}</p>
                <div className="text-gray-300 text-base md:text-lg leading-relaxed whitespace-pre-line">{slides[currentSlide]?.description}</div>
              </div>
              <div className="relative aspect-video p-8 rounded-lg lg:aspect-auto order-1 lg:order-2">
                <video key={slides[currentSlide]?.videoUrl} autoPlay loop muted playsInline className="w-full h-full object-cover rounded-lg">
                  <source src={slides[currentSlide]?.videoUrl} type="video/webm" />
                </video>
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="absolute bottom-8 left-8 flex items-center gap-4 z-10">
            <button onClick={prevSlide} className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <span className="text-white text-lg font-semibold bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">{currentSlide + 1} / {slides.length}</span>
            <button onClick={nextSlide} className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
