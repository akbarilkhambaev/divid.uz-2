'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { HiUser, HiLockClosed, HiMail } from 'react-icons/hi';
import Image from 'next/image';

export default function SetupPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    // Проверка, существуют ли уже администраторы
    const checkAdmins = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'administrators'));
        if (!snapshot.empty) {
          // Если администраторы уже есть, перенаправляем на логин
          router.push('/admin/login');
        }
      } catch (error) {
        console.error('Ошибка проверки администраторов:', error);
      } finally {
        setChecking(false);
      }
    };

    checkAdmins();
  }, [router]);

  const handleSetup = async (e) => {
    e.preventDefault();
    setError('');

    // Валидация
    if (formData.password !== formData.confirmPassword) {
      setError('Пароли не совпадают');
      return;
    }

    if (formData.password.length < 6) {
      setError('Пароль должен содержать минимум 6 символов');
      return;
    }

    setLoading(true);

    try {
      // Создание первого супер-администратора
      await addDoc(collection(db, 'administrators'), {
        username: formData.username,
        email: formData.email,
        password: formData.password, // В production используйте хеширование!
        role: 'superadmin',
        createdAt: serverTimestamp(),
        isActive: true,
      });

      alert(
        'Супер-администратор успешно создан! Теперь вы можете войти в систему.'
      );
      router.push('/admin/login');
    } catch (error) {
      console.error('Ошибка создания администратора:', error);
      setError('Произошла ошибка при создании администратора');
    } finally {
      setLoading(false);
    }
  };

  if (checking) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cs-blue via-blue-600 to-blue-800 flex items-center justify-center">
        <div className="text-white text-center">
          <svg
            className="animate-spin h-12 w-12 mx-auto mb-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <p>Проверка системы...</p>
        </div>
      </div>
    );
  }

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
            Первоначальная настройка
          </h1>
          <p className="text-gray-600">
            Создайте первого супер-администратора системы
          </p>
        </div>

        {/* Форма */}
        <form
          onSubmit={handleSetup}
          className="space-y-4"
        >
          {/* Ошибка */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Поле username */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Имя пользователя *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <HiUser className="text-gray-400 text-xl" />
              </div>
              <input
                type="text"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cs-blue"
                placeholder="admin"
                required
              />
            </div>
          </div>

          {/* Поле email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <HiMail className="text-gray-400 text-xl" />
              </div>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cs-blue"
                placeholder="admin@example.com"
                required
              />
            </div>
          </div>

          {/* Поле password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Пароль *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <HiLockClosed className="text-gray-400 text-xl" />
              </div>
              <input
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cs-blue"
                placeholder="Минимум 6 символов"
                required
                minLength={6}
              />
            </div>
          </div>

          {/* Поле confirmPassword */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Подтвердите пароль *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <HiLockClosed className="text-gray-400 text-xl" />
              </div>
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cs-blue"
                placeholder="Повторите пароль"
                required
                minLength={6}
              />
            </div>
          </div>

          {/* Кнопка */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-cs-blue text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Создание...' : 'Создать администратора'}
          </button>
        </form>

        {/* Предупреждение */}
        <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-sm text-yellow-800">
            <strong>Важно:</strong> Этот аккаунт будет иметь полный доступ к
            системе. Сохраните учетные данные в безопасном месте.
          </p>
        </div>
      </div>
    </div>
  );
}
