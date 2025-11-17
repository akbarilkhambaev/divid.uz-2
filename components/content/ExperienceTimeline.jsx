'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '@/lib/firebase';

const timelineItems = [
  {
    title: 'Мебел ишлаб чиқариш',
    description:
      'Индивидуаллаштирилган ечимлар ва серияли ишлаб чиқариш учун тўлиқ хизматлар цикли.',
    image:
      'https://images.unsplash.com/photo-1523419409543-0c1df022bdd1?auto=format&fit=crop&w=1200&q=80',
    href: '/services',
  },
  {
    title: 'Омборхона ва логистика',
    description:
      'Сақлаш, инвентаризация ва етказиб бериш жараёнларини оптималлаштириш бўйича консультациялар.',
    image:
      'https://images.unsplash.com/photo-1585079542156-2755d9c8a094?auto=format&fit=crop&w=1200&q=80',
    href: '/services',
  },
  {
    title: 'Ўқув марказлари',
    description:
      'Корхона ичидаги таълим марказларини яратиш ва уларни рақамлаштириш бўйича тажриба.',
    image:
      'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1200&q=80',
    href: '/academy',
  },
  {
    title: 'Озиқ-овқат ишлаб чиқариш',
    description:
      'Гигиена стандартлари ва ишлаб чиқариш линияларининг узлуксизлигини таъминлаш.',
    image:
      'https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=1200&q=80',
    href: '/services',
  },
  {
    title: 'Автотранспорт ва савдо',
    description:
      'Автосалонлар, савдо заллари ва чакана тармоқлар учун автоматлаштирилган CRM жараёнлари.',
    image:
      'https://images.unsplash.com/photo-1549921296-3cc26f510d04?auto=format&fit=crop&w=1200&q=80',
    href: '/services',
  },
  {
    title: 'Технологик стартаплар',
    description:
      'Маҳаллий бозорга мос маҳсулот кашф этиш, MVP ва масштаблаш ёндашувлари.',
    image:
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80',
    href: '/services',
  },
];

const cardVariants = {
  hidden: { opacity: 0, scale: 0.94, y: 24 },
  visible: { opacity: 1, scale: 1, y: 0 },
};

export default function ExperienceTimeline({
  items: fallbackItems = timelineItems,
}) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const q = query(
          collection(db, 'experienceTimeline'),
          orderBy('order', 'asc')
        );
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => {
          const payload = doc.data();
          return {
            id: doc.id,
            title: payload.title || '',
            description: payload.description || '',
            href: payload.href || '',
            order: payload.order ?? 0,
            imageBase64: payload.imageBase64 || '',
            image: payload.image || '',
          };
        });
        setItems(data);
      } catch (error) {
        console.error('Failed to load experience timeline items', error);
        setItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const list = items.length > 0 ? items : fallbackItems;

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-16 md:py-24">
      <div className="relative z-10 mx-auto flex w-full max-w-full flex-col gap-6 px-4 text-white md:px-6">
        <motion.h2
          className="text-center text-3xl font-bold leading-tight tracking-tight md:text-4xl lg:text-5xl"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <span className="relative inline-block before:absolute before:-inset-2 before:block before:-skew-y-2 before:bg-white/90 before:blur-[2px]">
            <span className="relative text-slate-950">СОХАЛАР</span>
          </span>
          <span className="ml-2 md:ml-3">БУЙИЧА ТАЖРИБАМИЗ</span>
        </motion.h2>
        <motion.p
          className="mx-auto max-w-3xl text-center text-base text-slate-300 md:text-lg"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 0.6,
            delay: 0.15,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        >
          Хар бир лойиҳа учун соҳа хусусиятларини инобатга олиб, операцион
          жараёнлар, рақамли ечимлар ва бошқарув амалиётларини мослаштирамиз.
        </motion.p>

        <div className="relative mt-12 lg:mt-16">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
            {list.map((item, idx) => {
              const hasLink = Boolean(item.href);
              const Wrapper = hasLink ? Link : 'div';
              const wrapperProps = hasLink
                ? { href: item.href, className: 'group block h-full' }
                : { className: 'group block h-full cursor-default' };

              return (
                <Wrapper
                  key={item.id || item.title || idx}
                  {...wrapperProps}
                >
                  <motion.article
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{
                      duration: 0.6,
                      delay: idx * 0.06,
                      ease: [0.43, 0.13, 0.23, 0.96],
                    }}
                    className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl transition-all duration-300 group-hover:border-cs-blue/60 group-hover:shadow-[0_35px_80px_-40px_rgba(59,130,246,0.8)]"
                  >
                    <div className="absolute inset-0">
                      {(item.imageBase64 || item.image) && (
                        <img
                          src={item.imageBase64 || item.image}
                          alt={item.title}
                          className="h-full w-full object-cover opacity-80 transition-transform duration-[750ms] ease-out group-hover:scale-105"
                          loading="lazy"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-br from-slate-950/80 via-slate-950/70 to-slate-900/60" />
                      <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <div className="absolute inset-0 bg-gradient-to-tr from-cs-blue/30 via-transparent to-transparent" />
                      </div>
                    </div>

                    <div className="relative z-10 flex h-full flex-col justify-between p-6 md:p-7">
                      <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-slate-300">
                        <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 font-semibold text-slate-200">
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                        <span className="hidden rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold text-slate-200 sm:inline">
                          тажриба соҳаси
                        </span>
                      </div>

                      <div className="mt-12 space-y-4">
                        <h3 className="text-2xl font-semibold text-white transition-colors duration-300 group-hover:text-cs-blue md:text-xl lg:text-2xl">
                          {item.title}
                        </h3>
                        <p className="text-sm text-slate-200 md:text-base">
                          {item.description}
                        </p>
                      </div>

                      {hasLink ? (
                        <div className="mt-8 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-cs-blue transition group-hover:text-white">
                          Батафсил маълумот
                          <FaArrowRight className="text-xs" />
                        </div>
                      ) : (
                        <div className="mt-8 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-cs-blue/70">
                          Ko'proq ma'lumot tez orada
                        </div>
                      )}
                    </div>
                  </motion.article>
                </Wrapper>
              );
            })}
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="animate-pulse absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-cs-blue/30 blur-3xl" />
        <div className="animate-pulse absolute bottom-10 left-16 h-60 w-60 rounded-full bg-fuchsia-500/20 blur-3xl" />
      </div>
    </section>
  );
}
