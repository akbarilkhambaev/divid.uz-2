'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IMaskInput } from 'react-imask';
import { FaInstagram, FaFacebook, FaTelegram } from 'react-icons/fa';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function Footer() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '+998 ',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addDoc(collection(db, 'leads'), {
        formType: 'footer',
        name: formData.name,
        phone: formData.phone,
        createdAt: serverTimestamp(),
        status: 'new',
      });

      setSubmitted(true);
      setFormData({ name: '', phone: '+998 ' });
    } catch (error) {
      console.error('Ошибка отправки формы:', error);
      alert('Ошибка отправки. Попробуйте позже.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-gray-900 text-white py-8 md:py-12 px-4">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center md:items-start justify-between gap-6 md:gap-8">
        {/* Logo */}
        <div className="flex flex-col items-center md:items-start w-full md:w-1/3 mb-6 md:mb-0">
          <img
            src="/DIVIDEND 3.svg"
            alt="Divid Logo"
            className="h-12 md:h-14 mb-4"
          />
          <p className="text-sm text-center md:text-left">© 2025 Консалтинг</p>
        </div>
        {/* Contacts */}
        <div className="flex flex-col items-center md:items-start w-full md:w-1/3 mb-6 md:mb-0 text-center md:text-left">
          <h3 className="text-lg font-semibold mb-2">Алоқа</h3>
          <p className="mb-1 text-sm md:text-base">
            Телефон:{' '}
            <a
              href="tel:+998901234567"
              className="underline hover:text-cs-blue transition"
            >
              +998 90 123 45 67
            </a>
          </p>
          <p className="mb-1 text-sm md:text-base">
            Email:{' '}
            <a
              href="mailto:info@divid.uz"
              className="underline hover:text-cs-blue transition"
            >
              info@divid.uz
            </a>
          </p>
          <p className="text-sm md:text-base">
            Манзил: Тошкент ш., Намуна кўчаси, 1-уй
          </p>
          <div className="flex gap-4 mt-3">
            <a
              href="#"
              aria-label="Instagram"
              className="hover:text-pink-500 transition"
            >
              <FaInstagram className="text-2xl" />
            </a>
            <a
              href="#"
              aria-label="Facebook"
              className="hover:text-blue-500 transition"
            >
              <FaFacebook className="text-2xl" />
            </a>
            <a
              href="#"
              aria-label="Telegram"
              className="hover:text-blue-400 transition"
            >
              <FaTelegram className="text-2xl" />
            </a>
          </div>
        </div>
        {/* Order Service Form */}
        <div className="w-full md:w-1/3 bg-gray-800 rounded-lg p-4 md:p-6 flex flex-col items-center">
          <h3 className="text-base md:text-lg font-semibold mb-4 text-center">
            Хизматга буюртма бериш
          </h3>
          <form
            onSubmit={handleSubmit}
            className="w-full flex flex-col gap-3 md:gap-4"
          >
            <input
              type="text"
              placeholder="Исм"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-4 py-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <IMaskInput
              mask="+998 00 000 00 00"
              value={formData.phone}
              unmask={false}
              onAccept={(value) => {
                setFormData({ ...formData, phone: value });
              }}
              type="tel"
              className="w-full px-4 py-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="+998 __ ___ __ __"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 rounded bg-blue-600 hover:bg-blue-700 text-white font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Юборилмоқда...' : 'Буюртма бериш'}
            </button>
          </form>
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
                  Муваффақиятли юборилди!
                </h3>
                <p className="text-gray-600 mb-6">
                  Сизнинг буюртмангиз қабул қилинди. Тез орада сиз билан
                  боғланамиз.
                </p>

                {/* Кнопка */}
                <button
                  onClick={() => setSubmitted(false)}
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
                >
                  Яхши
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </footer>
  );
}
