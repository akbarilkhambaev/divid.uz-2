'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IMaskInput } from 'react-imask';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

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
    <section className="min-h-full h-full bg-gradient-to-r from-cs-blue via-gray-950 to-gray-900 py-8 md:py-12 text-white flex flex-col lg:flex-row justify-between items-center px-4 md:px-8">
      {/* Левый блок - Текст */}
      <div className="w-full lg:w-1/2 mb-8 lg:mb-0 lg:px-4">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
          БИЗ БИЛАН ХАМКОРЛИК КИЛИШГА ТАЁРМИСИЗ?
        </h2>
        <p className="mb-6 text-lg md:text-xl lg:text-2xl uppercase">
          Консультацияга ёзилинг — биз сизга бизнес мақсадларингизга эришишда
          ёрдам берамиз.
        </p>
      </div>

      {/* Правый блок - Форма */}
      <div className="w-full lg:w-1/2 lg:px-4 uppercase">
        <form
          onSubmit={handleSubmit}
          className="bg-white text-black p-4 md:p-6 rounded-lg shadow-lg"
        >
          <h3 className="text-xl md:text-2xl font-bold mb-4">
            БИЗ БИЛАН <span className="text-cs-blue"> БОГЛАНИНГ</span>
          </h3>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium mb-2"
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
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cs-blue"
              placeholder="Исмингизни киритинг"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="tel"
              className="block text-sm font-medium mb-2"
            >
              Телефон ракамингиз
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
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cs-blue"
              placeholder="+998 __ ___ __ __"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="topic"
              className="block text-sm font-medium mb-2"
            >
              Мавзу
            </label>
            <select
              id="topic"
              value={formData.topic}
              onChange={(e) =>
                setFormData({ ...formData, topic: e.target.value })
              }
              className="w-full p-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cs-blue"
              required
            >
              <option value="audit">АУДИТ ВА ТАХЛИЛ ХИЗМАТЛАРИ</option>
              <option value="finance">МОЛИЯВИЙ КОНСАЛТИНГ</option>
              <option value="hr">HR ВА КАДРЛАР БИЛАН ИШЛАШ</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="message"
              className="block text-sm font-medium mb-2"
            >
              Хабарингиз
            </label>
            <textarea
              id="message"
              rows="4"
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cs-blue"
              placeholder="Хабарингизни ёзинг"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-cs-blue text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-950 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Юборилмоқда...' : 'Юбориш'}
          </button>
        </form>
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
                  Сизнинг заявкангиз қабул қилинди. Тез орада сиз билан
                  боғланамиз.
                </p>

                {/* Кнопка */}
                <button
                  onClick={() => setSubmitted(false)}
                  className="w-full bg-cs-blue text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
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
