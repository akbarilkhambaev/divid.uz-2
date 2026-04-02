'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaLongArrowAltRight } from 'react-icons/fa';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import ThreeParticlesBg from '@/components/ThreeParticlesBg';

const DEFAULT_DATA = {
  description:
    'DIVIDEND — strategik konsalting kompaniyasi bo‘lib, biznesining rivojlanishi va raqobatbardoshligini ta‘minlashga ixtisoslashgan. Biznesingizni rivojlantirish uchun innovatsion yechimlarni taklif etuvchi konsalting kompaniyasi. Biz shunchaki maslahatchi emasmiz — mijozlarimizning haqiqiy hamkorimiz va har bir bosqichda amaliy yechimlar bilan yordam beramiz.',
  quote:
    'Nega aynan DIVIDEND? Chunki har bir tavsiyamiz amaliyotda sinallgan va natijaga yo‘naltirilgan — joriy etish jarayonida hamisha yoningizda‘miz.',
  directions: [
    {
      id: '1',
      title: 'Moliyaviy audit va optimallashtirish',
      description:
        'Jarayonlarni chuqur tahlil qilib, xatolarni aniqlaymiz va xarajatlarni qisqartirish strategiyasini ishlab chiqamiz. Maqsad — moliyaviy sog‘liqni saqlash.',
    },
    {
      id: '2',
      title: 'Strategik moliya boshqaruvi',
      description:
        'Daromadlarni rejallashtirish, investitsiyalarni boshqarish va risklarni minimallashtirilish bo‘yicha amaliy yo‘riqnomalar tayyorlaymiz.',
    },
    {
      id: '3',
      title: 'Kadrlar boshqaruvi va HR-tizimlar',
      description:
        'Jamoani tanlash, baholash va motivatsiyalash bo‘yicha yechimlar, korporativ madaniyatni rivojlantirish rejalari bilan ta‘minlaymiz.',
    },
    {
      id: '4',
      title: 'Biznes jarayonlarni raqamlashtirish',
      description:
        'CRM, ERP va avtomatlashtirish tizimlarini joriy etib, strategiyaga ko‘proq, rutinaga kamroq vaqt ajratish imkonini beramiz.',
    },
    {
      id: '5',
      title: 'Biznes strategiya va masshtablash',
      description:
        'Yangi bozorlarga chiqish, mahsulot rivoji va o‘sish stsenariyalari bo‘yicha amaliy yo‘l xaritalarini ishlab chiqamiz.',
    },
  ],
};

export default function ExampleWorksInfo() {
  const [pageData, setPageData] = useState(DEFAULT_DATA);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const snap = await getDoc(doc(db, 'aboutUs', 'main'));
        if (snap.exists()) {
          setPageData(snap.data());
        }
      } catch (err) {
        console.error('Ошибка загрузки aboutUs:', err);
      }
    };
    fetchData();
  }, []);

  const { description, quote, directions } = pageData;

  return (
    <section
      id="about_us"
      className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-12 md:py-20 text-white"
    >
      <ThreeParticlesBg />
      <div className="relative z-10 mx-auto flex w-full max-w-full flex-col gap-10 px-6 md:px-12">
        <motion.h2
          className="text-center text-2xl font-bold leading-tight tracking-tight md:text-4xl lg:text-5xl"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <span className="relative inline-block before:absolute before:-inset-2 before:block before:-skew-y-2 before:bg-white/90 before:blur-[2px]">
            <span className="relative text-slate-950">BIZ</span>
          </span>
          <span className="ml-2 md:ml-3">HAQIMIZDA</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.75, ease: [0.25, 0.1, 0.25, 1] }}
          className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16 lg:items-start"
        >
          <div className="flex flex-col gap-6">
            <span className="w-fit text-[11px] font-semibold uppercase tracking-[0.4em] text-cs-blue">
              Konsalting kompaniyasi
            </span>

            <p className="text-base leading-relaxed text-slate-200 md:text-xl lg:text-2xl">
              <span className="text-xl font-bold text-white md:text-2xl lg:text-3xl">
                DIVIDEND
              </span>{' '}
              {description.replace(/^DIVIDEND\s*[—-]\s*/i, '')}
            </p>

            <div className="h-px w-16 bg-cs-blue/60" />

            <blockquote className="border-l-4 border-cs-blue pl-4 text-sm italic text-slate-300 md:text-base lg:text-lg">
              &ldquo;{quote}&rdquo;
            </blockquote>

            <Link
              href="/contacts"
              className="mt-2 inline-flex w-fit items-center gap-2 rounded-full border border-cs-blue/60 bg-cs-blue/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-cs-blue transition duration-300 hover:border-white/50 hover:bg-white/15 hover:text-white sm:px-6 sm:py-3 sm:text-sm sm:tracking-[0.35em] sm:gap-3"
            >
              Biz bilan bog‘lanish
              <FaLongArrowAltRight />
            </Link>
          </div>

          <div className="overflow-hidden rounded-2xl">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="bg-cs-blue/20">
                  <th className="px-3 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-cs-blue w-[40%] md:px-6 md:py-4 md:text-xs md:tracking-[0.3em]">
                    Yo‘nalish
                  </th>
                  <th className="px-3 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-cs-blue md:px-6 md:py-4 md:text-xs md:tracking-[0.3em]">
                    Ta'rif
                  </th>
                </tr>
              </thead>
              <tbody>
                {directions.map((item, index) => (
                  <tr
                    key={item.id || item.title}
                    className={`border-t border-white/10 transition-colors duration-200 hover:bg-white/5 ${index % 2 === 0 ? 'bg-white/[0.03]' : 'bg-transparent'}`}
                  >
                    <td className="px-3 py-3 align-top md:px-6 md:py-5">
                      <span className="text-xs font-bold uppercase tracking-[0.15em] text-white md:text-sm md:tracking-[0.25em]">
                        {item.title}
                      </span>
                    </td>
                    <td className="px-3 py-3 align-top md:px-6 md:py-5">
                      <span className="text-xs leading-relaxed text-slate-300 md:text-base">
                        {item.description}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
