'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function FeedbackForm() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-16 md:py-24 text-white">
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <div className="animate-pulse absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-cs-blue/30 blur-3xl" />
        <div className="animate-pulse absolute bottom-10 right-12 h-64 w-64 rounded-full bg-fuchsia-500/25 blur-3xl" />
        <div className="animate-pulse absolute top-1/3 right-1/2 h-56 w-56 rounded-full bg-emerald-500/20 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-[90%] flex-col items-center gap-10 px-4 text-center md:px-6">
        <motion.div
          initial={{ opacity: 0, y: -24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          className="space-y-5"
        >
          <h2 className="text-3xl font-bold leading-tight tracking-tight md:text-4xl lg:text-5xl">
            <span className="relative inline-block before:absolute before:-inset-2 before:block before:-skew-y-2 before:bg-white/90 before:blur-[2px]">
              <span className="relative text-slate-950">BIZNING</span>
            </span>
            <span className="ml-2 md:ml-3">MANZIL XARITADA</span>
          </h2>
          <p className="mx-auto max-w-2xl text-base text-slate-300 md:text-lg">
            Batafsil ma'lumot olish uchun ofisimizga tashrif buyuring, yoki
            xarita orqali qulay yo‘nalishni to‘g‘ridan-to‘g‘ri rejallashtiring.
          </p>

          <div className="mx-auto flex max-w-md flex-wrap items-center justify-center gap-3 text-xs uppercase tracking-[0.35em] text-slate-400">
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-slate-200">
              ish kuni • dushanba — shanba
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-slate-200">
              09:00 — 18:00
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.65, ease: [0.34, 1.56, 0.64, 1] }}
          className="relative w-full overflow-hidden rounded-[32px] border border-white/10 bg-white/5 shadow-[0_45px_90px_-45px_rgба(15,23,42,0.85)] backdrop-blur-xl"
          style={{ minHeight: 360 }}
        >
          <span className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-cs-blue/20 via-transparent to-transparent" />
          <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(148,163,184,0.15),transparent_55%)]" />
          <span className="pointer-events-none absolute inset-0 border border-white/10" />

          <iframe
            src="https://maps.google.com/maps?q=41.351512,69.273897&ll=41.351512,69.273897&z=16&output=embed"
            className="relative z-10 h-[420px] w-full rounded-[32px] object-cover md:h-[500px]"
            style={{
              filter: 'grayscale(0.25) contrast(1.1) saturate(1.2)',
              mixBlendMode: 'luminosity',
            }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Bizning manzil xaritada"
          />

          <div className="pointer-events-none absolute bottom-6 left-6 flex w-fit flex-col gap-2 rounded-2xl border border-white/15 bg-white/15 px-6 py-4 text-left text-xs uppercase tracking-[0.35em] text-white backdrop-blur">
            <span className="text-[11px] font-semibold text-slate-100">
              ofisimiz
            </span>
            <span className="text-[10px] text-slate-200">
              Toshkent sh., Yunusobod tumani, 12-uy
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
