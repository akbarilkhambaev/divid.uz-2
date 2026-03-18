'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IMaskInput } from 'react-imask';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { sendToTelegram } from '@/lib/telegram';

export default function Ads() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '+998 ',
    topic: 'audit',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addDoc(collection(db, 'leads'), {
        formType: 'ads',
        name: formData.name,
        phone: formData.phone,
        topic: formData.topic,
        message: formData.message,
        createdAt: serverTimestamp(),
        status: 'new',
      });

      // Отправляем в Telegram
      await sendToTelegram({
        name: formData.name,
        phone: formData.phone,
        message: formData.message,
        service: formData.topic,
        formType: 'ads',
      });

      setSubmitted(true);
      setFormData({ name: '', phone: '+998 ', topic: 'audit', message: '' });
    } catch (error) {
      console.error('Ошибка отправки формы:', error);
      alert('Ошибка отправки. Попробуйте позже.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-16 md:py-24 text-white">
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="animate-pulse absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-cs-blue/30 blur-3xl" />
        <div className="animate-pulse absolute bottom-6 right-12 h-64 w-64 rounded-full bg-fuchsia-500/25 blur-3xl" />
        <div className="animate-pulse absolute top-1/3 right-1/2 h-56 w-56 rounded-full bg-emerald-500/20 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-[90%] flex-col items-center gap-14 px-4 md:flex-row md:items-start md:px-6 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          className="w-full md:w-1/2"
        >
          <h2 className="text-3xl font-bold leading-tight tracking-tight md:text-4xl lg:text-5xl">
            <span className="relative inline-block before:absolute before:-inset-2 before:block before:-skew-y-2 before:bg-white/90 before:blur-[2px]">
              <span className="relative text-slate-950">ХАМКОРЛИККА</span>
            </span>
            <span className="ml-2 md:ml-3">ТАЁРМИСИЗ?</span>
          </h2>

          <p className="mt-6 max-w-xl text-base text-slate-300 md:text-lg">
            Стратегик шерик сифатида биз компаниянгиз учун аудит, молия ва HR
            йўналишларида комплекс ечимларни тайёрлаймиз. Қисқа форма орқали биз
            билан боғланинг ва мақсадларингизга мос режани бошлаймиз.
          </p>

          <div className="mt-9 flex flex-col gap-3 text-sm uppercase tracking-[0.35em] text-slate-400">
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-slate-200 md:text-sm">
              стратегик аудит • молиявий консалтинг • кадрлар бошқаруви
            </span>
            <span className="text-xs text-slate-500">
              доимий қўллаб-қувватлаш • шаффофлик • натижа
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{
            duration: 0.75,
            delay: 0.15,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          className="w-full md:w-1/2"
        >
          <form
            onSubmit={handleSubmit}
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/10 p-6 text-sm uppercase tracking-[0.18em] text-slate-200 shadow-[0_45px_90px_-45px_rgba(15,23,42,0.85)] backdrop-blur-xl md:p-8"
          >
            <span className="pointer-events-none absolute inset-y-0 right-0 h-full w-1/3 bg-gradient-to-l from-cs-blue/15 via-transparent to-transparent" />

            <h3 className="relative text-base font-semibold text-white md:text-lg">
              Биз билан <span className="text-cs-blue">боғланинг</span>
            </h3>

            <div className="mt-6 space-y-5 text-left tracking-[0] normal-case">
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="text-xs uppercase tracking-[0.35em] text-slate-400"
                >
                  Исмингиз
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-400 focus:border-cs-blue/60 focus:ring-2 focus:ring-cs-blue/30"
                  placeholder="Исмингизни киритинг"
                  required
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="tel"
                  className="text-xs uppercase tracking-[0.35em] text-slate-400"
                >
                  Телефон рақамингиз
                </label>
                <IMaskInput
                  mask="+998 00 000 00 00"
                  value={formData.phone}
                  unmask={false}
                  onAccept={(value) => {
                    setFormData({ ...formData, phone: value });
                  }}
                  type="tel"
                  id="tel"
                  className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-400 focus:border-cs-blue/60 focus:ring-2 focus:ring-cs-blue/30"
                  placeholder="+998 __ ___ __ __"
                  required
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="topic"
                  className="text-xs uppercase tracking-[0.35em] text-slate-400"
                >
                  Мавзу
                </label>
                <select
                  id="topic"
                  value={formData.topic}
                  onChange={(e) =>
                    setFormData({ ...formData, topic: e.target.value })
                  }
                  className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white outline-none transition focus:border-cs-blue/60 focus:ring-2 focus:ring-cs-blue/30"
                  required
                >
                  <option
                    className="text-slate-900"
                    value="audit"
                  >
                    АУДИТ ВА ТАҲЛИЛ ХИЗМАТЛАРИ
                  </option>
                  <option
                    className="text-slate-900"
                    value="finance"
                  >
                    МОЛИЯВИЙ КОНСАЛТИНГ
                  </option>
                  <option
                    className="text-slate-900"
                    value="hr"
                  >
                    HR ВА КАДРЛАР БИЛАН ИШЛАШ
                  </option>
                </select>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="message"
                  className="text-xs uppercase tracking-[0.35em] text-slate-400"
                >
                  Хабарингиз
                </label>
                <textarea
                  id="message"
                  rows={4}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-400 focus:border-cs-blue/60 focus:ring-2 focus:ring-cs-blue/30"
                  placeholder="Хабарингизни ёзинг"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-8 w-full rounded-full border border-cs-blue/60 bg-cs-blue/90 px-6 py-3 text-sm font-semibold uppercase tracking-[0.35em] text-white shadow-[0_25px_60px_-30px_rgba(59,130,246,0.9)] transition hover:shadow-[0_35px_80px_-35px_rgba(59,130,246,1)] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? 'Юборилмоқда...' : 'Юбориш'}
            </button>
          </form>
        </motion.div>
      </div>

      <AnimatePresence>
        {submitted && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSubmitted(false)}
              className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="relative w-full max-w-[90%] overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white via-white/90 to-cs-blue/10 p-8 text-center text-slate-900 shadow-[0_45px_90px_-40px_rgba(15,23,42,0.65)]">
                <button
                  onClick={() => setSubmitted(false)}
                  className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition hover:border-cs-blue/40 hover:text-cs-blue"
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>

                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 220 }}
                  className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-emerald-300 bg-emerald-50 text-emerald-500"
                >
                  <svg
                    className="h-12 w-12"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </motion.div>

                <h3 className="text-2xl font-semibold">
                  Муваффақиятли юборилди!
                </h3>
                <p className="mt-3 text-sm text-slate-600 md:text-base">
                  Сизнинг заявкангиз қабул қилинди. Тез орада сиз билан
                  боғланамиз.
                </p>

                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-8 inline-flex w-full items-center justify-center rounded-full border border-cs-blue/60 bg-cs-blue/90 px-6 py-3 text-sm font-semibold uppercase tracking-[0.35em] text-white shadow-lg transition hover:shadow-[0_25px_60px_-35px_rgba(59,130,246,0.95)]"
                >
                  Яхши
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
