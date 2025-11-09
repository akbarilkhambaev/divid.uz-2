'use client';

import { motion } from 'framer-motion';

export default function PricingSection() {
  return (
    <section
      id="pricing"
      className="min-h-screen bg-black flex items-center justify-center relative px-4 md:px-8 py-16 scroll-mt-18"
    >
      <div className="absolute top-8 right-8 text-white/10 text-6xl md:text-8xl font-bold">
        09
      </div>
      <div className="max-w-7xl w-full text-white">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-5xl lg:text-6xl font-bold mb-16 text-center uppercase"
        >
          Бошланғич курс нархлари
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Boshlang'ich paket */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <h3 className="text-3xl font-bold mb-6">Бошланғич пакет (2 ой)</h3>

            <div className="bg-orange-500 p-6 rounded-xl">
              <p className="text-sm mb-2">1 КУРС</p>
              <p className="text-xl font-semibold mb-3">
                Корпоратив молияга кириш
              </p>
              <p className="text-5xl font-bold">
                8 <span className="text-2xl">МЛН</span>
              </p>
              <p className="text-sm mt-1">со'м</p>
            </div>

            <div className="bg-orange-500 p-6 rounded-xl">
              <p className="text-sm mb-2">2 КУРС</p>
              <p className="text-xl font-semibold mb-3">Молиявий таҳлилчи</p>
              <p className="text-5xl font-bold">
                12 <span className="text-2xl">МЛН</span>
              </p>
              <p className="text-sm mt-1">со'м</p>
            </div>

            <div className="bg-gradient-to-r from-yellow-600 to-yellow-700 p-6 rounded-xl">
              <p className="text-sm mb-2">*Бу курслар биргаликда ўқилади</p>
              <p className="text-3xl font-bold">Умумий қиймат: 20 МЛН со'м</p>
              <p className="text-sm mt-2 text-white/80">
                (2 ой давомида, 24 та назарий, 8 амалий дарс, 40 дан ошиқ
                кейслар)
              </p>
            </div>
          </motion.div>

          {/* Qo'shimcha imkoniyat */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            <h3 className="text-3xl font-bold mb-6">Қўшимча имкониат</h3>

            <div className="bg-teal-500 p-6 rounded-xl">
              <p className="text-sm mb-2">1 КУРС</p>
              <p className="text-xl font-semibold mb-3">Individual mentorlik</p>
              <p className="text-5xl font-bold">
                4 <span className="text-2xl">МЛН</span>
              </p>
              <p className="text-sm mt-1">со'м</p>
            </div>

            <div className="bg-teal-500 p-6 rounded-xl">
              <p className="text-sm mb-2">2 КУРС</p>
              <p className="text-xl font-semibold mb-3">Individual mentorlik</p>
              <p className="text-5xl font-bold">
                6 <span className="text-2xl">МЛН</span>
              </p>
              <p className="text-sm mt-1">со'м</p>
            </div>

            <div className="bg-teal-600/50 p-6 rounded-xl border-2 border-teal-400">
              <p className="text-lg font-semibold">
                Натижа: атиги 2 ой ичида молиявий сифатида иш бошлаш даражасига
                чиқасиз
              </p>
            </div>
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center text-white/70 text-sm"
        >
          Ҳамда академиямиз ва курсларимиз ҳақида тўлиқ малумотлар берамиз.
        </motion.p>
      </div>
    </section>
  );
}
