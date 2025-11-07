// app/contact/page.js
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

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
        message: formData.message,
        createdAt: serverTimestamp(),
        status: 'new',
      });

      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Ошибка отправки формы:', error);
      alert('Ошибка отправки. Попробуйте позже.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="p-8 flex flex-col md:flex-row gap-8">
      <div className="w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 ">Биз билан боғланинг</h2>
        <form
          onSubmit={handleSubmit}
          className="space-y-6 max-w-md bg-white rounded-xl shadow-lg p-8 border border-gray-100"
        >
          <div>
            <label
              className="block font-semibold mb-1 text-gray-700"
              htmlFor="name"
            >
              Исм
            </label>
            <input
              className="border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 w-full p-3 rounded-lg transition outline-none placeholder-gray-400"
              type="text"
              name="name"
              id="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="Исмингиз"
              autoComplete="name"
            />
          </div>
          <div>
            <label
              className="block font-semibold mb-1 text-gray-700"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 w-full p-3 rounded-lg transition outline-none placeholder-gray-400"
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
              className="block font-semibold mb-1 text-gray-700"
              htmlFor="message"
            >
              Хабар
            </label>
            <textarea
              className="border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 w-full p-3 rounded-lg transition outline-none placeholder-gray-400 resize-none"
              name="message"
              id="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              placeholder="Хабарингизни ёзинг..."
            />
          </div>
          <button
            className="bg-blue-600 hover:bg-blue-700 transition text-white py-3 px-6 rounded-lg font-semibold shadow-md w-full text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            type="submit"
            disabled={loading}
          >
            {loading ? 'Юборилмоқда...' : 'Юбориш'}
          </button>
        </form>
      </div>
      <div className="flex-1 w-full max-h-[557px] rounded-lg overflow-hidden shadow-lg flex-shrink-0 aspect-[4/3]">
        <iframe
          src="https://maps.google.com/maps?q=41.351512,69.273897&ll=41.351512,69.273897&z=16&output=embed"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Наш адрес на карте"
        />
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
                  Хабар юборилди!
                </h3>
                <p className="text-gray-600 mb-6">
                  Сизнинг хабарингиз қабул қилинди. Тез орада сиз билан
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
    </section>
  );
}
