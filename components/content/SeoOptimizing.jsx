'use client';

import { useEffect, useState } from 'react';
import Marquee from 'react-fast-marquee';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
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
    <section className="w-screen max-w-none h-[110px] bg-gradient-to-r from-gray-100 via-white to-gray-100 relative z-20 my-6 overflow-x-hidden">
      <div className="w-full h-full flex items-center">
        <Marquee
          speed={60}
          gradient={true}
          gradientColor={[255, 255, 255]}
          gradientWidth={120}
        >
          {sections.map((sect) => (
            <div
              className="px-6 py-2 mx-2 tracking-normal text-6xl font-black rounded-lg bg-white/90 shadow-lg uppercase flex gap-5 border border-gray-200 text-shadow"
              style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.18)' }}
              key={sect.id}
            >
              #{sect.title}
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
