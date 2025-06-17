// /admin/news/page.js
'use client';

import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import Image from 'next/image';

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

  const filteredAndSortedNews = newsList
    .filter((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.title.localeCompare(b.title);
      } else {
        return b.title.localeCompare(a.title);
      }
    });

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">Новости</h1>

      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
          <input
            type="text"
            placeholder="Поиск новостей..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="w-1/3 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="asc">Сортировать по возрастанию</option>
            <option value="desc">Сортировать по убыванию</option>
          </select>
        </div>

        {filteredAndSortedNews.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAndSortedNews.map((item) => (
              <div
                key={item.id}
                className="bg-white shadow-lg rounded-lg overflow-hidden"
              >
                {item.imageBase64 ? (
                  <Image
                    src={item.imageBase64}
                    alt={item.title}
                    width={500}
                    height={300}
                    className="w-full h-48 object-cover"
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500">Нет изображения</span>
                  </div>
                )}
                <div className="p-4">
                  <h2 className="text-xl font-bold mb-2">{item.title}</h2>
                  <p className="text-gray-600 mb-4 line-clamp-2 whitespace-pre-line">
                    {item.description || 'Описание недоступно.'}
                  </p>
                  <p className="text-sm text-gray-400">
                    Дата публикации:{' '}
                    {item.createdAt
                      ? new Date(
                          item.createdAt.seconds * 1000
                        ).toLocaleDateString()
                      : 'неизвестна'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">Новостей не найдено.</p>
        )}
      </div>
    </div>
  );
}
