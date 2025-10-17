'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { db } from '@/lib/firebase';
import { doc, getDoc, updateDoc, increment } from 'firebase/firestore';
import { FaRegEye } from 'react-icons/fa6';

export default function MediaDetailPage() {
  const { id } = useParams();
  const [media, setMedia] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const fetchMedia = async () => {
      const docRef = doc(db, 'news', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setMedia(docSnap.data());
        // Увеличиваем счетчик просмотров
        await updateDoc(docRef, {
          views: increment(1),
        });
      }
      setLoading(false);
    };
    fetchMedia();
  }, [id]);

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-xl text-gray-500">
        Загрузка...
      </div>
    );
  }
  if (!media) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-xl text-red-500">
        Медиа не найдено
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 py-16 px-4 flex flex-col items-center">
      <a
        href="/media"
        className="absolute top-6 left-6 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors text-sm font-semibold"
      >
        ← К списку
      </a>
      <div className="max-w-full w-full bg-white rounded-3xl shadow-2xl p-8 relative flex flex-col md:flex-row gap-8 items-start">
        {/* Правая часть: фото и заголовок */}
        <div className="md:w-1/2 w-full flex flex-col items-center justify-start">
          {media.imageBase64 && (
            <div className="w-full h-96 mb-6 overflow-hidden rounded-2xl group">
              <img
                src={media.imageBase64}
                alt={media.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 shadow-lg"
              />
            </div>
          )}
          <h1 className="text-4xl font-extrabold text-blue-700 mb-4 border-b-2 border-blue-200 pb-2 text-left w-full">
            {media.title}
          </h1>
          <div className="flex items-center gap-4 text-sm text-gray-400 mb-6 w-full">
            <span className="inline-block w-2 h-2 bg-blue-400 rounded-full" />
            {media.createdAt
              ? new Date(media.createdAt.seconds * 1000).toLocaleDateString()
              : ''}
            {typeof media.views === 'number' && (
              <span className="flex items-center gap-1 text-gray-500">
                <FaRegEye className="inline-block" />
                <span>{media.views}</span>
              </span>
            )}
          </div>
        </div>
        {/* Левая часть: содержимое */}
        <div className="md:w-1/2 w-full text-lg text-gray-800 whitespace-pre-line leading-relaxed">
          {/* Описание как подзаголовок */}
          {media.description && (
            <div className="text-xl font-semibold text-gray-900 mb-4">
              {media.description}
            </div>
          )}
          {/* Отображение полного описания с HTML разметкой */}
          {media.full_description ? (
            <div
              className="ck-content prose prose-base max-w-none text-gray-800 leading-relaxed p-6"
              dangerouslySetInnerHTML={{ __html: media.full_description }}
            />
          ) : (
            media.text || ''
          )}
        </div>
      </div>
    </main>
  );
}
