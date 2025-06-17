'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineChatBubbleLeftRight, HiXMark } from 'react-icons/hi2';

export default function FullSupportWidget() {
  const [isOpen, setIsOpen] = useState(false);

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
              <h3 className="font-semibold text-lg">Служба поддержки</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:text-gray-200"
              >
                <HiXMark size={22} />
              </button>
            </div>

            {/* Контент / форма */}
            <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4 text-sm">
              <p className="text-gray-700">Здравствуйте! Чем можем помочь?</p>
              <form className="space-y-3">
                <input
                  type="text"
                  placeholder="Ваше имя"
                  className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
                />
                <textarea
                  placeholder="Ваше сообщение..."
                  rows={4}
                  className="w-full border rounded-md px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-200"
                ></textarea>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                >
                  Отправить
                </button>
              </form>
            </div>

            {/* Footer */}
            <div className="text-xs text-gray-400 text-center py-2 border-t">
              Поддержка © {new Date().getFullYear()}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
