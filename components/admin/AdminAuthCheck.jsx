'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function AdminAuthCheck({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Проверка аутентификации
    const checkAuth = () => {
      // Публичные страницы, которые не требуют авторизации
      const publicPages = ['/admin/login', '/admin/setup'];

      // Если мы на публичной странице, не проверяем авторизацию
      if (publicPages.includes(pathname)) {
        setIsLoading(false);
        return;
      }

      const authData = localStorage.getItem('adminAuth');

      if (!authData) {
        router.push('/admin/login');
        return;
      }

      try {
        const auth = JSON.parse(authData);

        if (!auth.loggedIn) {
          router.push('/admin/login');
          return;
        }

        // Проверка на истечение сессии (24 часа)
        const loginTime = new Date(auth.loginTime);
        const currentTime = new Date();
        const hoursDiff = (currentTime - loginTime) / (1000 * 60 * 60);

        if (hoursDiff > 24) {
          localStorage.removeItem('adminAuth');
          router.push('/admin/login');
          return;
        }

        setIsAuthenticated(true);
      } catch (error) {
        console.error('Ошибка проверки авторизации:', error);
        router.push('/admin/login');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [pathname, router]);

  // Показываем загрузку
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <svg
            className="animate-spin h-12 w-12 text-cs-blue mx-auto mb-4"
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
          <p className="text-gray-600">Проверка авторизации...</p>
        </div>
      </div>
    );
  }

  // Публичные страницы, которые не требуют авторизации
  const publicPages = ['/admin/login', '/admin/setup'];

  // Если на публичной странице, показываем контент без проверки
  if (publicPages.includes(pathname)) {
    return children;
  }

  // Если авторизован, показываем контент
  if (isAuthenticated) {
    return children;
  }

  // В противном случае не показываем ничего (редирект уже произошел)
  return null;
}
