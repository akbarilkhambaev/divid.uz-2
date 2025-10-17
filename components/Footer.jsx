'use client';
import { FaInstagram, FaFacebook, FaTelegram } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 px-4">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-start justify-between gap-8">
        {/* Logo */}
        <div className="flex flex-col items-center md:items-start w-full md:w-1/3 mb-8 md:mb-0">
          <img
            src="/DIVIDEND 3.svg"
            alt="Divid Logo"
            className="h-14 mb-4"
          />
          <p className="text-sm">© 2025 Консалтинг</p>
        </div>
        {/* Contacts */}
        <div className="flex flex-col items-center md:items-start w-full md:w-1/3 mb-8 md:mb-0">
          <h3 className="text-lg font-semibold mb-2">Алоқа</h3>
          <p className="mb-1">
            Телефон:{' '}
            <a
              href="tel:+998901234567"
              className="underline"
            >
              +998 90 123 45 67
            </a>
          </p>
          <p className="mb-1">
            Email:{' '}
            <a
              href="mailto:info@divid.uz"
              className="underline"
            >
              info@divid.uz
            </a>
          </p>
          <p>Манзил: Тошкент ш., Намуна кўчаси, 1-уй</p>
          <div className="flex gap-4 mt-3">
            <a
              href="#"
              aria-label="Instagram"
              className="hover:text-pink-500"
            >
              <FaInstagram className="text-2xl md:text-2xl" />
            </a>
            <a
              href="#"
              aria-label="Facebook"
              className="hover:text-blue-500"
            >
              <FaFacebook className="text-2xl md:text-2xl" />
            </a>
            <a
              href="#"
              aria-label="Telegram"
              className="hover:text-blue-400"
            >
              <FaTelegram className="text-2xl md:text-2xl" />
            </a>
          </div>
        </div>
        {/* Order Service Form */}
        <div className="w-full md:w-1/3 bg-gray-800 rounded-lg p-6 flex flex-col items-center">
          <h3 className="text-lg font-semibold mb-4">Хизматга буюртма бериш</h3>
          <form className="w-full flex flex-col gap-4">
            <input
              type="text"
              placeholder="Исм"
              className="w-full px-4 py-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="tel"
              placeholder="Телефон"
              className="w-full px-4 py-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="submit"
              className="w-full py-2 rounded bg-blue-600 hover:bg-blue-700 text-white font-semibold transition"
            >
              Буюртма бериш
            </button>
          </form>
        </div>
      </div>
    </footer>
  );
}
