'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineChatBubbleLeftRight, HiXMark } from 'react-icons/hi2';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { sendToTelegram } from '@/lib/telegram';
import TurnstileWidget from '@/components/TurnstileWidget';

export default function FullSupportWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    telegram: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState(null);

  return (
    <>
      {/* Кнопка запуска */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full border border-cs-blue/60 bg-cs-blue/90 text-white shadow-[0_25px_50px_-20px_rgba(59,130,246,0.65)] backdrop-blur-lg"
      >
        <span className="absolute inset-0 -z-10 rounded-full bg-cs-blue/40 blur-xl" />
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cs-blue/50 opacity-60" />
        <HiOutlineChatBubbleLeftRight
          size={26}
          className="relative z-10"
        />
      </motion.button>

      {/* Чат окно во весь рост справа */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 260, damping: 28 }}
            className="fixed top-0 right-0 z-50 flex h-full w-full max-w-[380px] flex-col overflow-hidden bg-gradient-to-b from-white via-white/95 to-cs-blue/5 shadow-[0_40px_70px_-45px_rgba(15,23,42,0.45)] backdrop-blur-xl md:max-w-md"
          >
            <div className="relative flex items-center justify-between px-5 py-4">
              <div className="relative">
                <span className="absolute -inset-1 -skew-y-2 rounded-lg bg-white/60 blur-sm" />
                <h3 className="relative text-lg font-semibold uppercase tracking-wide text-slate-900">
                  Qo‘llab-quvvatlash
                </h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition hover:border-cs-blue/40 hover:text-cs-blue"
              >
                <HiXMark size={20} />
              </button>
            </div>

            <div className="flex-1 space-y-6 overflow-y-auto px-5 py-8 text-sm">
              <p className="text-slate-600">
                Salom! Sizga qanday yordam berishimiz mumkin?
              </p>
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  setLoading(true);

                  try {
                    await addDoc(collection(db, 'leads'), {
                      formType: 'callback',
                      name: formData.name,
                      email: formData.email,
                      phone: formData.phone,
                      telegram: formData.telegram,
                      message: formData.message,
                      createdAt: serverTimestamp(),
                      status: 'new',
                    });

                    // Отправляем в Telegram
                    await sendToTelegram({
                      name: formData.name,
                      email: formData.email,
                      phone: formData.phone,
                      telegram: formData.telegram,
                      message: formData.message,
                      formType: 'callback',
                      turnstileToken,
                    });

                    setSubmitted(true);
                    setTurnstileToken(null);
                    setFormData({
                      name: '',
                      email: '',
                      phone: '',
                      telegram: '',
                      message: '',
                    });
                  } catch (error) {
                    console.error('Ошибка отправки формы:', error);
                    alert('Yuborish xatoligi. Keyinroq urinib ko‘ring.');
                  } finally {
                    setLoading(false);
                  }
                }}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-[0.25em] text-slate-500">
                    Ismingiz
                  </label>
                  <input
                    type="text"
                    placeholder="Ismingiz"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full rounded-2xl border border-slate-200 bg-white/90 px-4 py-2.5 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-cs-blue/60 focus:ring-2 focus:ring-cs-blue/30"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-[0.25em] text-slate-500">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full rounded-2xl border border-slate-200 bg-white/90 px-4 py-2.5 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-cs-blue/60 focus:ring-2 focus:ring-cs-blue/30"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-[0.25em] text-slate-500">
                    Telefon
                  </label>
                  <input
                    type="tel"
                    placeholder="+998 90 000 00 00"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full rounded-2xl border border-slate-200 bg-white/90 px-4 py-2.5 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-cs-blue/60 focus:ring-2 focus:ring-cs-blue/30"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-[0.25em] text-slate-500">
                    Telegram username
                  </label>
                  <input
                    type="text"
                    placeholder="@username"
                    value={formData.telegram}
                    onChange={(e) =>
                      setFormData({ ...formData, telegram: e.target.value })
                    }
                    className="w-full rounded-2xl border border-slate-200 bg-white/90 px-4 py-2.5 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-cs-blue/60 focus:ring-2 focus:ring-cs-blue/30"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-[0.25em] text-slate-500">
                    Xabaringiz
                  </label>
                  <textarea
                    placeholder="Xabaringiz..."
                    rows={4}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full resize-none rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-cs-blue/60 focus:ring-2 focus:ring-cs-blue/30"
                    required
                  />
                </div>
                <TurnstileWidget
                  onVerify={setTurnstileToken}
                  onExpire={() => setTurnstileToken(null)}
                />
                <button
                  type="submit"
                  disabled={loading || !turnstileToken}
                  className="w-full rounded-full border border-cs-blue/60 bg-cs-blue/90 px-6 py-3 text-sm font-semibold uppercase tracking-[0.4em] text-white shadow-lg transition hover:shadow-[0_20px_40px_-30px_rgba(59,130,246,0.7)] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? 'Yuborilmoqda...' : 'Yuborish'}
                </button>
              </form>
            </div>

            <div className="border-t border-slate-200 py-3 text-center text-xs text-slate-500">
              Qo‘llab-quvvatlash © {new Date().getFullYear()}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Модальное окно успешной отправки */}
      <AnimatePresence>
        {submitted && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setSubmitted(false);
                setIsOpen(false);
              }}
              className="fixed inset-0 z-[60] bg-slate-900/30 backdrop-blur"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 40 }}
              transition={{ type: 'spring', stiffness: 320, damping: 30 }}
              className="fixed inset-0 z-[70] flex items-center justify-center p-4"
            >
              <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-b from-white via-white/90 to-cs-blue/5 p-10 text-center text-slate-900 shadow-[0_45px_90px_-40px_rgba(15,23,42,0.5)]">
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setIsOpen(false);
                  }}
                  className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition hover:border-cs-blue/40 hover:text-cs-blue"
                >
                  <HiXMark size={20} />
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

                <h3 className="text-2xl font-semibold">Xabar yuborildi!</h3>
                <p className="mt-3 text-sm text-slate-600 md:text-base">
                  Sizning zayavkangiz qabul qilindi. Tez orada siz bilan
                  bog‘lanamiz.
                </p>

                <button
                  onClick={() => {
                    setSubmitted(false);
                    setIsOpen(false);
                  }}
                  className="mt-8 inline-flex w-full items-center justify-center rounded-full border border-cs-blue/60 bg-cs-blue/90 px-6 py-3 text-sm font-semibold uppercase tracking-[0.4em] text-white shadow-lg transition hover:shadow-[0_20px_40px_-30px_rgba(59,130,246,0.7)]"
                >
                  Yaxshi
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
