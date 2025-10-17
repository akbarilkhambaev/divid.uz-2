import React, { useState } from 'react';

export default function FAQAccordion() {
  const [activeIndex, setActiveIndex] = useState(null);
  const faqs = [
    {
      question: 'Лойиҳани бажариш қанча вақт олади?',
      answer:
        'Лойиҳанинг мураккаблигига қараб бажариш муддати ўзгаради. Оддатда бу 2 ҳафтадан 6 ҳафтагача давом этади.',
    },
    {
      question: 'Қандай хизматларни тақдим этасиз?',
      answer:
        'Биз ишлаб чиқиш, дизайн, SEO оптимизацияси ва техник қўллаб-қувватлаш хизматларини тақдим этамиз.',
    },
    {
      question: 'Сиз билан қандай боғланишим мумкин?',
      answer:
        'Биз билан сайтимиздаги алоқа шакли орқали ёки кўрсатилган контактлар орқали боғланишингиз мумкин.',
    },
    {
      question: 'Хизматларингизга кафолат берасизми?',
      answer:
        'Ҳа, биз барча хизматларимизга кафолат берамиз ва муаммолар юзага келганда ёрдам беришга тайёрмиз.',
    },
  ];

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="min-h-[720px] h-full mx-auto px-4 py-16 bg-radial from-gray-600 via-gray-60% to-gray-900 text-white">
      <h2 className="text-5xl uppercase font-bold mb-6 text-center">
        <span className="relative inline-block before:absolute before:-inset-2 before:block before:-skew-y-2 before:bg-cs-blue">
          <span className="relative text-white">КОПИНЧА</span>
        </span>{' '}
        <span className="ml-2 text-cs-blue">БЕРИЛАДИГАН САВОЛЛАР</span>
      </h2>
      <div className="space-y-4 pt-6">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`border ${
              activeIndex === index ? 'border-cs-blue' : 'border-gray-600'
            } rounded-lg shadow-lg overflow-hidden transition-all duration-500 bg-gray-700`}
          >
            <button
              onClick={() => toggleAccordion(index)}
              className={`w-full flex justify-between items-center p-6 text-left ${
                activeIndex === index ? 'text-cs-blue' : 'text-white'
              } font-semibold text-xl uppercase focus:outline-none`}
            >
              <span>{faq.question}</span>
              <span
                className={`transform transition-transform duration-300 ${
                  activeIndex === index
                    ? 'rotate-180 text-cs-blue'
                    : 'text-white'
                }`}
              >
                ▼
              </span>
            </button>
            <div
              className={`transition-all duration-300 ease-in-out ${
                activeIndex === index ? 'max-h-screen p-6' : 'max-h-0 p-0'
              } overflow-hidden bg-gray-800`}
            >
              <p className="text-gray-300 text-base">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
