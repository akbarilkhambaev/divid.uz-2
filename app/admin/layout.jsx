'use client';

import Sidebar from '@/components/Sidebar';
import AdminAuthCheck from '@/components/admin/AdminAuthCheck';
import { useRouter, usePathname } from 'next/navigation';
import { HiLogout, HiUser } from 'react-icons/hi';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [adminInfo, setAdminInfo] = useState(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    // Загружаем данные администратора при каждом изменении маршрута
    const loadAdminInfo = () => {
      const authData = localStorage.getItem('adminAuth');
      if (authData) {
        try {
          setAdminInfo(JSON.parse(authData));
        } catch (error) {
          console.error('Ошибка парсинга данных админа:', error);
          setAdminInfo(null);
        }
      } else {
        setAdminInfo(null);
      }
    };

    loadAdminInfo();
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    setShowLogoutModal(false);
    router.push('/admin/login');
  };

  // Страницы, которые не должны показывать layout с sidebar
  const publicPages = ['/admin/login', '/admin/setup'];
  const isPublicPage = publicPages.includes(pathname);

  // Если это публичная страница, показываем только контент без layout
  if (isPublicPage) {
    return <>{children}</>;
  }

  return (
    <AdminAuthCheck>
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1 flex flex-col ml-64">
          {/* Верхняя панель */}
          <header className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">
              Система управления контентом
            </h2>
            <div className="flex items-center gap-4">
              {adminInfo ? (
                <>
                  <div className="flex items-center gap-2">
                    <div className="bg-cs-blue rounded-full p-2">
                      <HiUser className="text-white text-xl" />
                    </div>
                    <div className="text-sm">
                      <p className="font-semibold text-gray-900">
                        {adminInfo.username}
                      </p>
                      <p className="text-gray-500 text-xs">
                        {adminInfo.role === 'superadmin'
                          ? 'Супер-админ'
                          : 'Администратор'}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowLogoutModal(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                  >
                    <HiLogout />
                    <span>Выйти</span>
                  </button>
                </>
              ) : (
                <div className="flex items-center gap-2">
                  <div className="bg-gray-300 rounded-full p-2">
                    <HiUser className="text-gray-600 text-xl" />
                  </div>
                  <button
                    onClick={() => setShowLogoutModal(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                  >
                    <HiLogout />
                    <span>Выйти</span>
                  </button>
                </div>
              )}
            </div>
          </header>
          {/* Основной контент */}
          <main className="flex-1 p-6">{children}</main>
        </div>
      </div>

      {/* Модальное окно подтверждения выхода */}
      <AnimatePresence>
        {showLogoutModal && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowLogoutModal(false)}
              className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
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
                {/* Иконка предупреждения */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
                  className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <HiLogout className="w-10 h-10 text-red-600" />
                </motion.div>

                {/* Текст */}
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Выход из системы
                </h3>
                <p className="text-gray-600 mb-6">
                  Вы действительно хотите выйти из админ-панели?
                </p>

                {/* Кнопки */}
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowLogoutModal(false)}
                    className="flex-1 bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-300 transition duration-300"
                  >
                    Отмена
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex-1 bg-red-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-red-700 transition duration-300"
                  >
                    Выйти
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </AdminAuthCheck>
  );
}
