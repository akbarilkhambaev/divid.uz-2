// /admin/news/page.js
'use client';

import { useEffect, useMemo, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import Image from 'next/image';
import Link from 'next/link';

export default function NewsTablePage() {
  const [newsList, setNewsList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    const fetchNews = async () => {
      const snapshot = await getDocs(collection(db, 'news'));
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setNewsList(data);
    };
    fetchNews();
  }, []);

  const filteredAndSortedNews = useMemo(() => {
    return newsList
      .filter((item) =>
        item.title?.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .sort((a, b) => {
        if (sortOrder === 'asc') {
          return a.title.localeCompare(b.title);
        }
        return b.title.localeCompare(a.title);
      });
  }, [newsList, searchQuery, sortOrder]);

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 pb-24 pt-28 text-white">
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <span className="absolute -top-24 left-[12%] h-72 w-72 rounded-full bg-cs-blue/30 blur-3xl" />
        <span className="absolute bottom-8 right-[18%] h-64 w-64 rounded-full bg-fuchsia-400/25 blur-3xl" />
        <span className="absolute top-1/2 right-10 h-56 w-56 -translate-y-1/2 rounded-full bg-emerald-400/20 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 sm:px-6 lg:px-8">
        <header className="space-y-4 text-center sm:text-left">
          <p className="text-xs uppercase tracking-[0.4em] text-slate-400">
            Медиа
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
            Янгиликлар ва медиа контент
          </h1>
          <p className="max-w-2xl text-sm text-slate-300">
            Янгиликларни фильтрлаб, васият учун қизиқарли мавзуни танланг. Барча
            мақолалар замонавий форматда тақдим этилган.
          </p>
        </header>

        <div className="rounded-[26px] border border-white/10 bg-white/5 p-6 shadow-[0_45px_95px_-60px_rgba(15,23,42,0.9)] backdrop-blur-xl">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="flex-1">
              <label className="block text-xs uppercase tracking-[0.3em] text-slate-400">
                Қидириш
              </label>
              <input
                type="text"
                placeholder="Янгиликларни қидириш..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-slate-400 focus:border-cs-blue/40 focus:outline-none focus:ring-2 focus:ring-cs-blue/30"
              />
            </div>

            <div className="md:w-56">
              <label className="block text-xs uppercase tracking-[0.3em] text-slate-400">
                Тартиблаш
              </label>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white focus:border-cs-blue/40 focus:outline-none focus:ring-2 focus:ring-cs-blue/30"
              >
                <option
                  className="text-slate-900"
                  value="asc"
                >
                  Усиш тартибида
                </option>
                <option
                  className="text-slate-900"
                  value="desc"
                >
                  Камайиш тартибида
                </option>
              </select>
            </div>
          </div>
        </div>

        {filteredAndSortedNews.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
            {filteredAndSortedNews.map((item) => (
              <article
                key={item.id}
                className="group relative flex h-full flex-col overflow-hidden rounded-[26px] border border-white/10 bg-white/5 shadow-[0_45px_95px_-60px_rgba(15,23,42,0.9)] backdrop-blur-xl transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="relative h-48 w-full overflow-hidden">
                  {item.imageBase64 ? (
                    <Image
                      src={item.imageBase64}
                      alt={item.title}
                      width={640}
                      height={360}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      unoptimized
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-slate-800/40 text-sm text-slate-400">
                      Нет изображения
                    </div>
                  )}
                </div>

                <div className="flex flex-1 flex-col gap-4 p-6">
                  <header className="space-y-2">
                    <p className="text-xs uppercase tracking-[0.35em] text-slate-400">
                      Янгилик
                    </p>
                    <h2 className="text-xl font-semibold text-white line-clamp-2">
                      {item.title}
                    </h2>
                  </header>

                  <p className="line-clamp-3 text-sm text-slate-300">
                    {item.description || 'Описание недоступно.'}
                  </p>

                  <div className="mt-auto space-y-3 text-sm text-slate-300">
                    <Link
                      href={`/media/${item.id}`}
                      className="inline-flex items-center justify-center rounded-2xl border border-cs-blue/40 bg-cs-blue/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white transition-colors duration-200 hover:bg-cs-blue/30"
                    >
                      Батафсил
                    </Link>
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
                      {item.createdAt
                        ? new Date(
                            item.createdAt.seconds * 1000
                          ).toLocaleDateString()
                        : 'Дата неизвестна'}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-[26px] border border-dashed border-white/15 bg-white/5 p-12 text-center text-slate-300 backdrop-blur-xl">
            Новостей не найдено.
          </div>
        )}
      </div>
    </section>
  );
}
