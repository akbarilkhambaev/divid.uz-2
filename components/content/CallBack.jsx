'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineChatBubbleLeftRight, HiXMark } from 'react-icons/hi2';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function FullSupportWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      {/* Кнопка запуска */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-50 w-14 h-14 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg"
      >
        <span className="absolute inline-flex w-full h-full rounded-full bg-blue-400 opacity-75 animate-ping"></span>
        <HiOutlineChatBubbleLeftRight
          size={28}
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
            transition={{ type: 'spring', stiffness: 260, damping: 25 }}
            className="fixed top-0 right-0 h-full w-[360px] bg-white shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="bg-blue-600 text-white px-4 py-3 flex justify-between items-center">
              <h3 className="font-semibold text-lg">
                Қўллаб-қувватлаш хизмати
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:text-gray-200"
              >
                <HiXMark size={22} />
              </button>
            </div>

            {/* Контент / форма */}
            <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4 text-sm">
              <p className="text-gray-700">
                Салом! Сизга қандай ёрдам беришимиз мумкин?
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
                }}
                className="space-y-3"
              >
                <input
                  type="text"
                  placeholder="Исмингиз"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  required
                />
                <textarea
                  placeholder="Хабарингиз..."
                  rows={4}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full border rounded-md px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-200"
                  required
                ></textarea>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Юборилмоқда...' : 'Юбориш'}
                </button>
              </form>
            </div>

            {/* Footer */}
            <div className="text-xs text-gray-400 text-center py-2 border-t">
              Қўллаб-қувватлаш © {new Date().getFullYear()}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Модальное окно успешной отправки */}
      <AnimatePresence>
        {submitted && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setSubmitted(false);
                setIsOpen(false);
              }}
              className="fixed inset-0 bg-black/50 z-[60]"
            />
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed inset-0 z-[60] flex items-center justify-center p-4"
            >
              <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center relative">
                {/* Кнопка закрытия */}
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setIsOpen(false);
                  }}
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
                  Сизнинг заявкангиз қабул қилинди. Тез орада сиз билан
                  боғланамиз.
                </p>

                {/* Кнопка */}
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setIsOpen(false);
                  }}
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
                >
                  Яхши
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
