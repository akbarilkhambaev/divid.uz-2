// app/contact/page.js
'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  function handleChange(e) {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    alert(JSON.stringify(formData));
  }

  return (
    <section className="p-8 flex flex-col md:flex-row gap-8">
      <div className="w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 ">Связаться с нами</h2>
        <form
          onSubmit={handleSubmit}
          className="space-y-6 max-w-md bg-white rounded-xl shadow-lg p-8 border border-gray-100"
        >
          <div>
            <label
              className="block font-semibold mb-1 text-gray-700"
              htmlFor="name"
            >
              Имя
            </label>
            <input
              className="border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 w-full p-3 rounded-lg transition outline-none placeholder-gray-400"
              type="text"
              name="name"
              id="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="Ваше имя"
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
              placeholder="you@email.com"
              autoComplete="email"
            />
          </div>
          <div>
            <label
              className="block font-semibold mb-1 text-gray-700"
              htmlFor="message"
            >
              Сообщение
            </label>
            <textarea
              className="border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 w-full p-3 rounded-lg transition outline-none placeholder-gray-400 resize-none"
              name="message"
              id="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              placeholder="Ваше сообщение..."
            />
          </div>
          <button
            className="bg-blue-600 hover:bg-blue-700 transition text-white py-3 px-6 rounded-lg font-semibold shadow-md w-full text-lg"
            type="submit"
          >
            Отправить
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
    </section>
  );
}
