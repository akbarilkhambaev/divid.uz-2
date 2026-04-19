// app/contact/page.js
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ContactMap from '../components/ContactMap';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { sendToTelegram } from '@/lib/telegram';
import TurnstileWidget from '@/components/TurnstileWidget';
import Head from 'next/head';
import { FaInstagram, FaFacebook, FaTelegram } from 'react-icons/fa';

export default function ContactPage() {
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

  function handleChange(e) {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      await addDoc(collection(db, 'leads'), {
        formType: 'contacts',
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
        formType: 'contact',
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
  }

  return (
    <>
      <Head>
        <title>Kontaktlar | Divid.uz</title>
        <meta
          name="description"
          content="Biz bilan bog'laning — Divid.uz. Manzil, telefon, email, aloqa shakli va yo'nalish xaritasi."
        />
        <meta
          property="og:title"
          content="Kontaktlar | Divid.uz"
        />
        <meta
          property="og:description"
          content="Divid.uz bilan bog'laning: manzil, telefon, email, aloqa shakli va yo'nalish xaritasi."
        />
        <meta
          property="og:type"
          content="website"
        />
        <meta
          property="og:url"
          content="https://divid.uz/contacts"
        />
        <meta
          property="og:image"
          content="/logo.png"
        />
        <meta
          name="robots"
          content="index, follow"
        />
      </Head>
      <section className="relative min-h-auto overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 pb-24 pt-28 text-white">
        <div className="pointer-events-none absolute inset-0 opacity-40">
          <span className="absolute -top-24 left-[12%] h-72 w-72 rounded-full bg-cs-blue/30 blur-3xl" />
          <span className="absolute bottom-10 right-[18%] h-64 w-64 rounded-full bg-fuchsia-400/25 blur-3xl" />
          <span className="absolute top-1/2 right-12 h-56 w-56 -translate-y-1/2 rounded-full bg-emerald-400/20 blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto flex w-full max-w-full flex-col gap-12 px-4 sm:px-6 lg:px-8 md:flex-row md:items-stretch">
          <div className="w-full max-w-md rounded-[28px] border border-white/10 bg-white/5 p-8 shadow-[0_35px_65px_-40px_rgba(15,23,42,0.9)] backdrop-blur-xl flex flex-col justify-center min-h-[480px]">
            <h2 className="text-2xl font-bold mb-6 text-white">
              Biz bilan bog‘laning
            </h2>
            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <div>
                <label
                  className="block font-semibold mb-1 text-slate-200"
                  htmlFor="name"
                >
                  Ism
                </label>
                <input
                  className="border border-white/10 focus:border-cs-blue/40 focus:ring-2 focus:ring-cs-blue/30 w-full p-3 rounded-xl transition outline-none placeholder:text-slate-400 bg-white/10 text-white"
                  type="text"
                  name="name"
                  id="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Ismingiz"
                  autoComplete="name"
                />
              </div>
              <div>
                <label
                  className="block font-semibold mb-1 text-slate-200"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="border border-white/10 focus:border-cs-blue/40 focus:ring-2 focus:ring-cs-blue/30 w-full p-3 rounded-xl transition outline-none placeholder:text-slate-400 bg-white/10 text-white"
                  type="email"
                  name="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="email@example.com"
                  autoComplete="email"
                />
              </div>
              <div>
                <label
                  className="block font-semibold mb-1 text-slate-200"
                  htmlFor="phone"
                >
                  Telefon
                </label>
                <input
                  className="border border-white/10 focus:border-cs-blue/40 focus:ring-2 focus:ring-cs-blue/30 w-full p-3 rounded-xl transition outline-none placeholder:text-slate-400 bg-white/10 text-white"
                  type="tel"
                  name="phone"
                  id="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+998 90 000 00 00"
                  autoComplete="tel"
                />
              </div>
              <div>
                <label
                  className="block font-semibold mb-1 text-slate-200"
                  htmlFor="telegram"
                >
                  Telegram username
                </label>
                <input
                  className="border border-white/10 focus:border-cs-blue/40 focus:ring-2 focus:ring-cs-blue/30 w-full p-3 rounded-xl transition outline-none placeholder:text-slate-400 bg-white/10 text-white"
                  type="text"
                  name="telegram"
                  id="telegram"
                  value={formData.telegram}
                  onChange={handleChange}
                  placeholder="@username"
                />
              </div>
              <div>
                <label
                  className="block font-semibold mb-1 text-slate-200"
                  htmlFor="message"
                >
                  Xabar
                </label>
                <textarea
                  className="border border-white/10 focus:border-cs-blue/40 focus:ring-2 focus:ring-cs-blue/30 w-full p-3 rounded-xl transition outline-none placeholder:text-slate-400 bg-white/10 text-white resize-none"
                  name="message"
                  id="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Xabaringizni yozing..."
                />
              </div>
              <TurnstileWidget
                onVerify={setTurnstileToken}
                onExpire={() => setTurnstileToken(null)}
              />
              <button
                className="bg-cs-blue hover:bg-cs-blue/80 transition text-white py-3 px-6 rounded-xl font-semibold shadow-md w-full text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                type="submit"
                disabled={loading || !turnstileToken}
              >
                {loading ? 'Yuborilmoqda...' : 'Yuborish'}
              </button>
            </form>

            {/* Social links */}
            <div className="mt-6 flex items-center gap-4 justify-center">
              <a
                href="https://instagram.com"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-300 hover:text-pink-500 transition"
              >
                <FaInstagram className="text-2xl" />
              </a>
              <a
                href="https://facebook.com"
                aria-label="Facebook"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-300 hover:text-blue-500 transition"
              >
                <FaFacebook className="text-2xl" />
              </a>
              <a
                href="https://t.me"
                aria-label="Telegram"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-300 hover:text-blue-400 transition"
              >
                <FaTelegram className="text-2xl" />
              </a>
            </div>
          </div>
          <div className="flex-1 w-full rounded-[28px] overflow-hidden shadow-lg flex-shrink-0 border border-white/10 bg-white/5 backdrop-blur-xl min-h-[480px] flex items-stretch">
            <ContactMap />
          </div>
        </div>

        {/* Модальное окно успешной отправки */}
        <AnimatePresence>
          {submitted && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSubmitted(false)}
                className="fixed inset-0 bg-black/50 z-50"
              />
              {/* Modal */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 50 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4"
              >
                <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center relative">
                  {/* Кнопка закрытия */}
                  <button
                    onClick={() => setSubmitted(false)}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <svg
                      className="w-6 h-6"
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

                  {/* Иконка успеха */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                    className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
                  >
                    <svg
                      className="w-12 h-12 text-green-500"
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

                  {/* Текст */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Xabar yuborildi!
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Sizning xabaringiz qabul qilindi. Tez orada siz bilan
                    bog‘lanamiz.
                  </p>

                  {/* Кнопка */}
                  <button
                    onClick={() => setSubmitted(false)}
                    className="w-full bg-cs-blue text-white py-3 px-6 rounded-lg font-semibold hover:bg-cs-blue/80 transition duration-300"
                  >
                    Yaxshi
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </section>
    </>
  );
}
