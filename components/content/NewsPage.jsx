import React, { useEffect, useState } from 'react';
import StoryModal from './StoryModal';
import { motion } from 'framer-motion';
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import Image from 'next/image';

export default function NewsPageSlider() {
  const [storyOpen, setStoryOpen] = useState(false);
  const [storyIndex, setStoryIndex] = useState(0);
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      const snapshot = await getDocs(collection(db, 'news'));
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      // Сортировка по дате (новые первыми)
      data.sort((a, b) => {
        if (a.createdAt && b.createdAt) {
          return b.createdAt.seconds - a.createdAt.seconds;
        }
        return 0;
      });
      setNews(data);
    };
    fetchNews();
  }, []);

  return (
    <>
      <section className="min-h-[500px] md:min-h-[720px] h-full py-8 md:py-16 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
        <h2 className="text-3xl md:text-4xl lg:text-5xl uppercase font-bold mb-6 md:mb-8 pb-4 md:pb-5 text-center px-4">
          <span className="relative inline-block before:absolute before:-inset-2 before:block before:-skew-y-2 before:bg-cs-blue">
            <span className="relative text-white">YANGILIKLAR</span>
          </span>
        </h2>
        <div className="w-full overflow-x-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
          <motion.div
            className="flex gap-3 md:gap-4 px-2 md:px-4"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.12,
                },
              },
            }}
          >
            {news.map((item) => (
              <motion.div
                key={item.id}
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  visible: { opacity: 1, y: 0 },
                }}
                whileHover={{ scale: 1.04 }}
                className="relative w-[200px] sm:w-[220px] md:w-[240px] lg:w-[260px] h-[380px] sm:h-[400px] md:h-[420px] rounded-2xl overflow-hidden shadow-xl flex items-end justify-center group bg-gray-900 flex-shrink-0 cursor-pointer"
                style={{
                  background: item.imageBase64
                    ? `url(${item.imageBase64}) center/cover no-repeat`
                    : undefined,
                }}
                onClick={() => {
                  setStoryIndex(news.findIndex((n) => n.id === item.id));
                  setStoryOpen(true);
                }}
              >
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent group-hover:from-black/90 transition duration-300" />
                {/* Content */}
                <div className="relative z-10 w-full px-4 md:px-6 pb-6 md:pb-8 pt-8 md:pt-10 flex flex-col justify-end h-full">
                  <h3 className="text-white text-base sm:text-lg md:text-xl font-bold mb-2 leading-tight drop-shadow-lg line-clamp-4">
                    {item.title}
                  </h3>
                  <div className="flex items-center justify-between w-full">
                    <span className="text-[10px] sm:text-xs text-gray-200 font-mono tracking-wide">
                      DIVID.UZ
                    </span>
                    <span className="text-[10px] sm:text-xs text-gray-300">
                      {item.createdAt
                        ? new Date(
                            item.createdAt.seconds * 1000,
                          ).toLocaleDateString()
                        : 'nomaʼlum'}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      <StoryModal
        open={storyOpen}
        news={news.map((n) => ({
          image: n.imageBase64,
          title: n.title,
          text: n.text || n.description || '',
        }))}
        currentIndex={storyIndex}
        onClose={() => setStoryOpen(false)}
        onPrev={() => setStoryIndex((i) => Math.max(0, i - 1))}
        onNext={() => setStoryIndex((i) => Math.min(news.length - 1, i + 1))}
      />
    </>
  );
}
