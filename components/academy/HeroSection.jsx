'use client';

import { motion } from 'framer-motion';

export default function HeroSection() {
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
          poster="/academy/hero-poster.avif"
        >
          <source
            src="/academy/hero-bg.webm"
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
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight drop-shadow-lg">
          Билимга килинган инвестициядa —<br />
          <span className="text-white/90">дивиденд кафолатланган</span>
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto drop-shadow-md">
          Дивиденд Академия — молиявий соҳада карьера қуришингиз учун
          профессионал тайёргарлик маркази
        </p>
      </motion.div>
    </section>
  );
}
