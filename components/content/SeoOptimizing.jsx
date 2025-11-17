'use client';

import { useEffect, useState } from 'react';
import Marquee from 'react-fast-marquee';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function SeoOptimizing() {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const q = query(collection(db, 'seoSections'), orderBy('order', 'asc'));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setSections(data);
      } catch (error) {
        console.error('Ошибка загрузки секций SEO:', error);
        setSections([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSections();
  }, []);

  if (loading || sections.length === 0) {
    return null;
  }

  return (
    <section className="relative w-full overflow-hidden border border-white/10 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 py-10 shadow-[0_40px_60px_-35px_rgba(15,23,42,0.8)]">
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <span className="absolute -left-10 top-0 h-48 w-48 rounded-full bg-cs-blue/30 blur-3xl" />
        <span className="absolute bottom-0 right-10 h-56 w-56 rounded-full bg-fuchsia-500/20 blur-3xl" />
        <span className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-400/15 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-full flex-col gap-6 px-6">
        <div className="overflow-hidden">
          <Marquee
            speed={45}
            gradient
            gradientWidth={120}
            gradientColor={[12, 15, 29]}
          >
            {sections.map((sect) => (
              <div
                key={sect.id}
                className="group relative mx-3 flex items-center gap-4 rounded-[18px] border border-white/10 bg-white/10 px-6 py-4 text-4xl font-semibold uppercase tracking-[0.35em] text-slate-50 shadow-[0_10px_40px_-25px_rgba(59,130,246,0.85)] transition-transform duration-300 hover:-translate-y-1"
              >
                <span className="pointer-events-none absolute inset-0 rounded-[18px] bg-gradient-to-br from-cs-blue/30 via-transparent to-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="relative z-10 text-cs-blue/90">#</span>
                <span className="relative z-10 text-white">{sect.title}</span>
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}
