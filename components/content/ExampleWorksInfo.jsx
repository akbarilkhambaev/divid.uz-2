'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const focusDirections = [
  {
    title: 'Молиявий аудит ва оптималлаштириш',
    description:
      'Жараёнларни чуқур таҳлил қилиб, хатоларни аниқлаймиз ва харажатларни қисқартириш стратегиясини ишлаб чиқамиз. Мақсад — молиявий соғлиқни сақлаш.',
  },
  {
    title: 'Стратегик молия бошқаруви',
    description:
      'Даромадларни режалаштириш, инвестицияларни бошқариш ва рискларни минималлаштириш бўйича амалий йўриқномалар тайёрлаймиз.',
  },
  {
    title: 'Кадрлар бошқаруви ва HR-тизимлар',
    description:
      'Жамоани танлаш, баҳолаш ва мотивациялаш бўйича ечимлар, корпоратив маданиятни ривожлантириш режалари билан таъминлаймиз.',
  },
  {
    title: 'Бизнес-жараёнларни рақамлаштириш',
    description:
      'CRM, ERP ва автоматлаштириш тизимларини жорий этиб, стратегияга кўпроқ, рутинага камроқ вақт ажратиш имконини берамиз.',
  },
  {
    title: 'Бизнес-стратегия ва масштаблаш',
    description:
      'Янги бозорларга чиқиш, маҳсулот ривожи ва ўсиш сценарийлари бўйича амалий йўл хариталарини ишлаб чиқамиз.',
  },
];

export default function ExampleWorksInfo() {
  return (
    <section
      id="about_us"
      className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-16 pt-24 md:py-24 text-white"
    >
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="animate-pulse absolute -top-24 left-1/5 h-72 w-72 rounded-full bg-cs-blue/30 blur-3xl" />
        <div className="animate-pulse absolute bottom-10 right-16 h-64 w-64 rounded-full bg-fuchsia-500/25 blur-3xl" />
        <div className="animate-pulse absolute top-1/2 right-1/3 h-56 w-56 rounded-full bg-emerald-500/20 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-full flex-col gap-10 px-4 md:px-6">
        <motion.h2
          className="text-center text-3xl font-bold leading-tight tracking-tight md:text-4xl lg:text-5xl"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <span className="relative inline-block before:absolute before:-inset-2 before:block before:-skew-y-2 before:bg-white/90 before:blur-[2px]">
            <span className="relative text-slate-950">БИЗ</span>
          </span>
          <span className="ml-2 md:ml-3">ҲАҚИМИЗДА</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.75, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/10 p-6 shadow-[0_45px_90px_-45px_rgba(15,23,42,0.85)] backdrop-blur-xl md:p-10"
        >
          <Image
            src="/team.avif"
            alt="Dividend командаси"
            fill
            priority
            className="absolute inset-0 h-full w-full object-cover opacity-25"
          />
          <span className="pointer-events-none absolute inset-0 bg-gradient-to-br from-slate-900/80 via-slate-900/60 to-slate-950/85" />

          <div className="relative z-10 grid w-full grid-cols-1 gap-10 md:grid-cols-[1.05fr_0.95fr]">
            <div className="flex flex-col justify-center gap-6">
              <div className="rounded-3xl border border-white/10 bg-slate-950/75 p-5 shadow-[inset_0_0_35px_-18px_rgba(148,163,184,0.35)] backdrop-blur-xl">
                <span className="mb-4 block text-[11px] font-semibold uppercase tracking-[0.35em] text-slate-200/80">
                  Асосий хизмат йўналишлари
                </span>
                <ul className="grid list-none grid-cols-1 gap-4 xl:grid-cols-2">
                  {focusDirections.map((item, index) => (
                    <li
                      key={item.title}
                      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-slate-950/80 p-5 transition duration-300 hover:border-cs-blue/40 hover:bg-cs-blue/25 backdrop-blur"
                    >
                      <span className="pointer-events-none absolute inset-0 bg-gradient-to-br from-cs-blue/20 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                      <div className="relative flex gap-4">
                        <div className="space-y-2 text-left">
                          <h3 className="text-sm font-semibold uppercase tracking-[0.4em] text-slate-50">
                            {item.title}
                          </h3>
                          <p className="text-[16px] leading-relaxed text-slate-200">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex flex-col gap-8 text-left">
              <div className="rounded-3xl border border-white/10 bg-slate-950/75 p-6 shadow-[0_25px_50px_-25px_rgba(15,23,42,0.9)] backdrop-blur-xl">
                <p className="text-lg leading-relaxed text-slate-100 md:text-xl lg:text-2xl">
                  <span className="text-2xl font-semibold text-white md:text-3xl">
                    DIVIDEND
                  </span>{' '}
                  — стратегик консалтинг компанияси бўлиб, бизнесининг
                  ривожланиши ва рақобатбардошлигини таъминлашга ихтисослашган.
                  Бизнесингизни ривожлантириш учун инновацион ечимларни таклиф
                  этувчи консалтинг компанияси. Биз шунчаки маслаҳатчи эмасмиз —
                  мижозларимизнинг ҳақиқий ҳамкоримиз ва ҳар бир босқичда амалий
                  ечимлар билан ёрдам берамиз.
                </p>

                <blockquote className="relative mt-6 overflow-hidden rounded-2xl border border-white/10 bg-white/10 p-6 text-base italic leading-relaxed text-slate-100 shadow-inner backdrop-blur">
                  <span className="pointer-events-none absolute -left-10 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full bg-cs-blue/20 blur-3xl" />
                  <span className="pointer-events-none absolute right-4 top-4 text-6xl font-bold text-cs-blue/40">
                    “
                  </span>
                  <p className="relative z-10 text-sm uppercase tracking-[0.35em] text-slate-100">
                    Нега айнан DIVIDEND? Чунки ҳар бир тавсиямиз амалиётда
                    синалган ва натижага йўналтирилган — жорий этиш жараёнида
                    ҳамиша ёнингиздамиз.
                  </p>
                </blockquote>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
