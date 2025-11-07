'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { HiUser, HiLockClosed, HiEye, HiEyeOff } from 'react-icons/hi';
import Image from 'next/image';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Поиск администратора в Firestore
      const q = query(
        collection(db, 'administrators'),
        where('username', '==', formData.username),
        where('password', '==', formData.password),
        where('isActive', '==', true)
      );

      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        setError('Неверное имя пользователя или пароль');
        setLoading(false);
        return;
      }

      const adminData = snapshot.docs[0].data();

      // Сохранение данных в localStorage
      localStorage.setItem('adminAuth', JSON.stringify({
        username: adminData.username,
        email: adminData.email,
        role: adminData.role,
        loggedIn: true,
        loginTime: new Date().toISOString(),
      }));

      // Перенаправление на админ-панель
      router.push('/admin');
    } catch (error) {
      console.error('Ошибка входа:', error);
      setError('Произошла ошибка. Попробуйте позже.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cs-blue via-blue-600 to-blue-800 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Image
            width={200}
            height={100}
            src="/DIVIDEND 1.svg"
            alt="Logo"
            className="h-16 w-auto"
          />
        </div>

        {/* Заголовок */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Вход в админ-панель
          </h1>
          <p className="text-gray-600">
            Введите свои учетные данные для входа
          </p>
        </div>

        {/* Форма */}
        <form onSubmit={handleLogin} className="space-y-6">
          {/* Ошибка */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Поле username */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Имя пользователя
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <HiUser className="text-gray-400 text-xl" />
              </div>
              <input
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cs-blue focus:border-transparent"
                placeholder="Введите имя пользователя"
                required
              />
            </div>
          </div>

          {/* Поле password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Пароль
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <HiLockClosed className="text-gray-400 text-xl" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cs-blue focus:border-transparent"
                placeholder="Введите пароль"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <HiEyeOff className="text-xl" />
                ) : (
                  <HiEye className="text-xl" />
                )}
              </button>
            </div>
          </div>

          {/* Кнопка входа */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-cs-blue text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Вход...
              </>
            ) : (
              'Войти'
            )}
          </button>
        </form>

        {/* Дополнительная информация */}
        <div className="mt-6 text-center text-sm text-gray-600">
          <p>Забыли пароль? Обратитесь к администратору</p>
        </div>
      </div>
    </div>
  );
}
