'use client';
import React from 'react';

export default function Landing() {
  return (
    <div className="font-sans text-gray-800">
      {/* Header */}
      <header className="bg-white shadow sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">DIVIDENT Молия</h1>
          <nav className="space-x-4 hidden md:flex">
            <a
              href="#about"
              className="hover:text-blue-600"
            >
              Биз ҳақимизда
            </a>
            <a
              href="#services"
              className="hover:text-blue-600"
            >
              Хизматлар
            </a>
            <a
              href="#team"
              className="hover:text-blue-600"
            >
              Жамоа
            </a>
            <a
              href="#contact"
              className="hover:text-blue-600"
            >
              Алоқа
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-white py-16 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold mb-4">
            Молиявий яхлитлик – ҳар бир рақамда
          </h2>
          <p className="text-lg mb-6">
            Сизнинг ҳисоботингизда емас, натижангиздамиз
          </p>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition">
            Маслаҳат олиш
          </button>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="py-16 bg-white"
      >
        <div className="max-w-5xl mx-auto px-4">
          <h3 className="text-2xl font-bold mb-4">Биз ҳақимизда</h3>
          <p className="mb-4">
            “DIVIDENT Молия” — бу тажрибали экспертлар жамоаси бўлиб, молиявий
            консалтинг, HR, бухгалтерия ва автоматлаштириш соҳаларида ечимлар
            таклиф қилади.
          </p>
          <p>
            Биз сиз учун аудит ўтказмаймиз – биз сиз учун жавобгарликни
            камайтирувчи тизим яратамиз.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section
        id="services"
        className="py-16 bg-gray-50"
      >
        <div className="max-w-5xl mx-auto px-4">
          <h3 className="text-2xl font-bold mb-8">Хизматлар</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              'Аудит',
              'Солиқ маслаҳати',
              'Бухгалтерия аутсорсинги',
              'HR консалтинг',
              'Автоматлаштириш ва CRM',
            ].map((service, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-xl shadow"
              >
                <h4 className="text-lg font-semibold mb-2">{service}</h4>
                <p>Қисқача маълумот ва афзалликлар.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section
        id="team"
        className="py-16 bg-white"
      >
        <div className="max-w-5xl mx-auto px-4">
          <h3 className="text-2xl font-bold mb-4">Жамоа</h3>
          <p>
            Экспертларимиз тажрибали ва сертификатларга эга. Яқинда карточкалар
            қўшилади.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="py-16 bg-gray-100"
      >
        <div className="max-w-5xl mx-auto px-4">
          <h3 className="text-2xl font-bold mb-4">Алоқа</h3>
          <form className="grid gap-4 max-w-xl">
            <input
              type="text"
              placeholder="Исмингиз"
              className="border rounded p-2"
            />
            <input
              type="email"
              placeholder="Email"
              className="border rounded p-2"
            />
            <textarea
              placeholder="Хабарингиз"
              className="border rounded p-2"
            ></textarea>
            <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
              Юбориш
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white text-center py-6 border-t">
        <p className="text-sm">
          © 2025 DIVIDENT Молия. Барча ҳуқуқлар ҳимояланган.
        </p>
      </footer>
    </div>
  );
}
