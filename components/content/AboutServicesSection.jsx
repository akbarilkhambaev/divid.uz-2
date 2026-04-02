'use client';

import { useEffect, useRef, useState } from 'react';
import ThreeParticlesBg from '@/components/ThreeParticlesBg';
import {
  FaBriefcase,
  FaUsers,
  FaChartLine,
  FaAward,
  FaStar,
  FaHandshake,
  FaTrophy,
  FaRocket,
} from 'react-icons/fa';
import CountUp from 'react-countup';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

const ICON_MAP = {
  briefcase: FaBriefcase,
  users: FaUsers,
  chart: FaChartLine,
  award: FaAward,
  star: FaStar,
  handshake: FaHandshake,
  trophy: FaTrophy,
  rocket: FaRocket,
};

const DEFAULT_STATS = [
  {
    id: '1',
    icon: 'briefcase',
    value: 120,
    suffix: '+',
    label: 'Yakunlangan loyihalar',
  },
  { id: '2', icon: 'users', value: 80, suffix: '+', label: 'Mamnun mijozlar' },
  {
    id: '3',
    icon: 'chart',
    value: 10,
    suffix: ' yil',
    label: 'jamoa tajribasi',
  },
  {
    id: '4',
    icon: 'award',
    value: 95,
    suffix: '%',
    label: 'mijozlar saqlanish darajasi',
  },
];

export default function AboutServicesSection() {
  const [stats, setStats] = useState(DEFAULT_STATS);
  const sectionRef = useRef(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const snap = await getDoc(doc(db, 'aboutUs', 'main'));
        if (snap.exists() && Array.isArray(snap.data().stats)) {
          setStats(snap.data().stats);
        }
      } catch (err) {
        console.error('Ошибка загрузки статистики:', err);
      }
    };
    fetchStats();
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from('.about-stat-card', {
        opacity: 0,
        y: 40,
        duration: 0.7,
        ease: 'power2.out',
        stagger: 0.12,
        scrollTrigger: {
          trigger: '.about-stat-grid',
          start: 'top 80%',
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [stats]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden w-full bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white pb-12 px-3 md:pb-20 md:px-4"
    >
      <ThreeParticlesBg />
      <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-10 w-full about-stat-grid">
        {stats.map((stat) => {
          const IconComponent = ICON_MAP[stat.icon] || FaBriefcase;
          return (
            <div
              key={stat.id}
              className="about-stat-card flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-6 md:p-12 text-center shadow-[0_25px_55px_-20px_rgba(15,23,42,0.8)] backdrop-blur-xl transition-transform duration-300 hover:-translate-y-1"
            >
              <IconComponent className="text-3xl sm:text-4xl md:text-6xl text-cs-blue mb-2 md:mb-4" />
              <p className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-white leading-none">
                <CountUp
                  end={Number(stat.value)}
                  duration={2}
                />
                <span>{stat.suffix}</span>
              </p>
              <p className="mt-1 text-[11px] sm:text-sm md:mt-3 md:text-lg text-slate-300 font-medium leading-tight">
                {stat.label}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
