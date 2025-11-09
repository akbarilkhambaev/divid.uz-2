'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export default function AboutSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: 'Дарсларда қатнашиш',
      subtitle: '(80% амалиёт, 20% назарий билимлар)',
      description: `Машғулотларда янги мавзуни ўзлаштирасиз ва билимларни мустаҳкамлаш учун уй вазифасини бажаришингиз керак.

Дарслар ҳафтасига икки марта 90 дақиқадан ўтказилади. Дарслар орасидаги бундай интервал билимларни яхши ўзлаштириш ва уй вазифасини сифатли бажариш имконини беради.

Топшириқларни кейинги дарсгача топшириш керак - ҳар бир ишни шахсан ментор текширади.`,
      video: '/academy/class-1.webm',
    },
    {
      title: 'Амалий курслар',
      subtitle: '(Фақат реал бизнес кейслари)',
      description: `Бизнинг курсларимиз фақат назарий билимлар билан чегараланмайди. Ҳар бир дарсда реал компанияларнинг ҳақиқий молиявий ҳисоботлари, аудитлари ва бизнес-кейсларидан фойдаланилади.

Сиз нафақат қандай ишлашни, балки нима учун шундай қилиш кераклигини ҳам тушунасиз. Бу сизга ишга киришганингизда дарҳол натижа кўрсатиш имконини беради.`,
      video: '/academy/practical-2.webm',
    },
    {
      title: 'Менторлик ва қўллаб-қувватлаш',
      subtitle: '(Big 4 ва корпоратив тажриба)',
      description: `Барча менторларимиз Big 4 компанияларида ёки йирик корпорациялarda профессионал тажрибага эга мутахассислар.

Улар нафақат билим беришади, балки ўз тажрибаларини, реал вазиятлардан мисолларни ва карьера ривожланиши бўйича маслаҳатларни ҳам баҳам кўришади.

Ҳар бир талабага индивидуал ёндашув ва шахсий ривожланиш режаси.`,
      video: '/academy/mentoring-3.webm',
    },
    {
      title: 'Иш жойлаштириш',
      subtitle: '(Етакчи компаниялар билан ҳамкорлик)',
      description: `Курсни муваффақиятли тугатганингиздан сўнг, биз сизга иш топишда ёрдам берамиз.

Бизнинг ҳамкор компанияларимиз орасида йирик миллий ва халқаро ташкилотлар мавжуд. Энг яхши битирувчиларимиз учун махсус тавсия хатлари ва иш берувчилар билан тўғридан-тўғри танишув имконияти.`,
      video: '/academy/job-4.webm',
    },
    {
      title: 'Флексибл график',
      subtitle: '(Online ва offline форматлар)',
      description: `Биз ҳар бир талабанинг эҳтиёжларини тушунамиз. Шунинг учун курсларимиз online ва offline форматларда мавжуд.

Ишлайдиган талабалар учун кечки гуруҳлар, талабалар учун кундузги гуруҳлар. Сиз ўзингизга қулай вақт ва жойда ўрганишингиз мумкин.

Барча дарслар ёзиб олинади ва платформада сақланади - хоҳлаган вақтингизда қайта кўришингиз мумкин.`,
      video: '/academy/flexible-5.webm',
    },
    {
      title: 'Давомий қўллаб-қувватлаш',
      subtitle: '(Курсдан кейин ҳам ёрдам)',
      description: `Бизнинг қўллаб-қувватлашимиз курс тугаши билан тугамайди. Сиз доимо бизнинг жамоамиз ва alumni тармоғимизнинг бир қисми бўлиб қоласиз.

Карьера масалалари, янги иш қидириш, профессионал ривожланиш - ҳар қандай саволда ёрдам беришга таёрмиз.

Alumni учун махсус тадбирлар, networking имкониятлари ва янги курслардан чегирмалар.`,
      video: '/academy/support-6.webm',
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section
      id="about"
      className="min-h-screen bg-gray-900 flex items-center justify-center relative px-4 md:px-8 py-16 scroll-mt-18"
    >
      <div className="absolute top-8 right-8 text-white/20 text-6xl md:text-8xl font-bold">
        02
      </div>
      <div className="max-w-7xl w-full">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-12 text-center"
        >
          Дивиденд Академия хақида
        </motion.h2>

        {/* Slider Container */}
        <div className="relative bg-gray-800 rounded-2xl overflow-hidden shadow-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-0 min-h-[600px]"
            >
              {/* Left Side - Text Content */}
              <div className="p-8 md:p-12 flex flex-col justify-center bg-gray-800 order-2 lg:order-1">
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  {slides[currentSlide].title}
                </h3>
                <p className="text-lg md:text-xl text-blue-400 mb-6">
                  {slides[currentSlide].subtitle}
                </p>
                <div className="text-gray-300 text-base md:text-lg leading-relaxed whitespace-pre-line">
                  {slides[currentSlide].description}
                </div>
              </div>

              {/* Right Side - Video */}
              <div className="relative aspect-video p-8 rounded-lg lg:aspect-auto order-1 lg:order-2">
                <video
                  key={slides[currentSlide].video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover rounded-lg"
                >
                  <source
                    src={slides[currentSlide].video}
                    type="video/webm"
                  />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-gray-800/50 to-transparent lg:hidden" />
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="absolute bottom-8 left-8 flex items-center gap-4 z-10">
            <button
              onClick={prevSlide}
              className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 flex items-center justify-center transition-all group"
            >
              <svg
                className="w-6 h-6 text-white group-hover:scale-110 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <span className="text-white text-lg font-semibold bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              {currentSlide + 1} / {slides.length}
            </span>

            <button
              onClick={nextSlide}
              className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 flex items-center justify-center transition-all group"
            >
              <svg
                className="w-6 h-6 text-white group-hover:scale-110 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
