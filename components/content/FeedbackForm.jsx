import React from 'react';

export default function FeedbackForm() {
  return (
    <section className="relative bg-gray-50 py-12">
      {/* Фоновая карта */}
      <div className="">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2244.283602839457!2d37.6173!3d55.7558!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTXCsDQ1JzIwLjgiTiAzN8KwMzcnMDYuOCJF!5e0!3m2!1sen!2sru!4v1683123456789!5m2!1sen!2sru"
          width="0%"
          height="0%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-0 h-0 object-cover"
        ></iframe>
      </div>
    </section>
  );
}
