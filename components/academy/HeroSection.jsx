'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

// Дефолтные значения
const defaultData = {
  title:
    'Билимга килинган инвестициядa —<br /><span class="text-white/90">дивиденд кафолатланган</span>',
  description:
    'Дивиденд Академия — молиявий соҳада карьера қуришингиз учун профессионал тайёргарлик маркази',
  videoUrl: '/academy/hero-bg.webm',
  posterUrl: '/academy/hero-poster.avif',
};

export default function HeroSection() {
  const [data, setData] = useState(defaultData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, 'academySettings', 'hero');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const firebaseData = docSnap.data();
          setData({
            title: firebaseData.title || defaultData.title,
            description: firebaseData.description || defaultData.description,
            videoUrl: firebaseData.videoUrl || defaultData.videoUrl,
            posterUrl: firebaseData.posterUrl || defaultData.posterUrl,
          });
        }
      } catch (error) {
        console.error('Error fetching hero data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <section
      id="hero"
      className="min-h-screen mt-18 bg-cs-blue flex items-center justify-center relative px-4 md:px-8 scroll-mt-18 overflow-hidden"
    >
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster={data.posterUrl}
        >
          <source
            src={data.videoUrl}
            type="video/webm"
          />
        </video>
        {/* Темный оверлей для читаемости текста */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="absolute top-8 right-8 text-white/50 text-6xl md:text-8xl font-bold z-10">
        01
      </div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
        className="max-w-6xl text-center relative z-10"
      >
        <h1
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight drop-shadow-lg"
          dangerouslySetInnerHTML={{ __html: data.title }}
        />
        <p className="text-lg md:text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto drop-shadow-md">
          {data.description}
        </p>
      </motion.div>
    </section>
  );
}
