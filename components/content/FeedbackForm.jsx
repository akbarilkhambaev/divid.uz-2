import React from 'react';

export default function FeedbackForm() {
  return (
    <section className="w-full py-2 px-4 md:px-0 flex flex-col items-center justify-center">
      <div className="w-full max-w-2xl mx-auto mb-8 text-center">
        <h2 className="text-5xl md:text-5xl font-bold text-gray-900 mb-3 uppercase">
          <span className="text-blue-500">Бизнинг </span>манзил харитада
        </h2>
        <p className="text-gray-700 text-md md:text-lg mb-0">
          Батафсил маълумот олиш учун офисимизга ташриф буюришингиз мумкин
        </p>
      </div>
      <div
        className="w-full max-w-full mx-auto rounded-xl overflow-hidden shadow-lg"
        style={{ minHeight: '400px', height: '500px' }}
      >
        <iframe
          src="https://maps.google.com/maps?q=41.351512,69.273897&ll=41.351512,69.273897&z=16&output=embed"
          width="100%"
          height="100%"
          style={{ border: 0, width: '100%', height: '100%' }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Наш адрес на карте"
        />
      </div>
    </section>
  );
}
