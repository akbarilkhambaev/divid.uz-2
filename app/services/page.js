'use client';
// Преобразует <oembed> YouTube в <iframe> для корректного отображения видео
function renderDescription(html) {
  if (!html) return '';
  if (typeof window === 'undefined') return html; // SSR fallback
  const temp = document.createElement('div');
  temp.innerHTML = html;
  // YouTube <oembed> to <iframe>
  temp
    .querySelectorAll('oembed[url*="youtube.com"], oembed[url*="youtu.be"]')
    .forEach((el) => {
      const url = el.getAttribute('url');
      let videoId = '';
      if (url.includes('youtube.com')) {
        const match = url.match(/v=([\w-]+)/);
        videoId = match ? match[1] : '';
      } else if (url.includes('youtu.be')) {
        const match = url.match(/youtu.be\/([\w-]+)/);
        videoId = match ? match[1] : '';
      }
      if (videoId) {
        const iframe = document.createElement('iframe');
        iframe.width = '560';
        iframe.height = '315';
        iframe.src = `https://www.youtube.com/embed/${videoId}`;
        iframe.frameBorder = '0';
        iframe.allow =
          'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
        iframe.allowFullscreen = true;
        el.parentNode.replaceChild(iframe, el);
      }
    });
  // <video> support: ensure controls and responsive style
  temp.querySelectorAll('video').forEach((video) => {
    video.setAttribute('controls', 'true');
    video.style.maxWidth = '100%';
    video.style.height = '100%';
  });
  return temp.innerHTML;
}
import DOMPurify from 'dompurify';

import { useEffect, useState } from 'react';
import './ck-content.css';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function ServicesPage() {
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState(null);
  const [services, setServices] = useState([]);

  useEffect(() => {
    // Загружаем данные из Firestore
    const fetchData = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'servicesTree'));
        const data = snapshot.docs.map((doc) => doc.data());

        console.log('RAW Firestore data:', data);

        // Нормализуем категории
        const cats = data.map((cat) => ({
          id: cat.id,
          name: cat.name,
          subcategories: Array.isArray(cat.subcategories)
            ? cat.subcategories
            : [],
        }));

        setCategories(cats);
      } catch (error) {
        console.error('Ошибка при загрузке категорий:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (selectedCategoryId) {
      const cat = categories.find((c) => c.id === selectedCategoryId);
      setSubcategories(cat?.subcategories || []);
      setSelectedSubcategoryId(null);
      setServices([]);
      console.log('Подкатегории:', cat?.subcategories || []);
    }
  }, [selectedCategoryId, categories]);

  useEffect(() => {
    if (selectedSubcategoryId) {
      const sub = subcategories.find((s) => s.id === selectedSubcategoryId);
      setServices(sub?.services || []);
      console.log('Выбрана подкатегория:', selectedSubcategoryId);
      console.log('Услуги:', sub?.services || []);
    }
  }, [selectedSubcategoryId, subcategories]);

  return (
    <div className="flex h-screen w-full bg-gray-50">
      {/* Левая панель */}
      <aside className="w-80 h-full overflow-y-auto border-r bg-white p-6">
        <h2 className="text-2xl font-bold mb-6">Разделы</h2>
        <ul>
          {categories.map((cat) => (
            <li key={cat.id}>
              {/* Кнопка выбора категории */}
              <button
                className={`w-full py-2 px-3 mb-2 font-semibold text-left rounded ${
                  selectedCategoryId === cat.id
                    ? 'bg-blue-200 text-blue-900'
                    : 'text-gray-800 hover:bg-blue-50'
                }`}
                onClick={() => setSelectedCategoryId(cat.id)}
              >
                {cat.name}
              </button>

              {/* Подкатегории */}
              {selectedCategoryId === cat.id && (
                <ul className="ml-4 mt-2">
                  {cat.subcategories.map((sub) => (
                    <li key={sub.id}>
                      <button
                        className={`w-full text-left py-1 px-2 rounded transition ${
                          selectedSubcategoryId === sub.id
                            ? 'bg-blue-200 text-blue-900'
                            : 'text-gray-600 hover:bg-blue-50'
                        }`}
                        onClick={() => setSelectedSubcategoryId(sub.id)}
                      >
                        {sub.name}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </aside>

      {/* Правая панель */}
      <main className="flex-1 w-full h-auto min-h-0 overflow-y-auto overflow-x-hidden p-2 flex flex-col items-center bg-gray-100">
        {!selectedSubcategoryId ? (
          <div className="text-gray-400 text-xl">
            Выберите категорию и пункт слева для просмотра информации
          </div>
        ) : services.length > 0 ? (
          <div className="w-full h-full flex flex-col items-start justify-start">
            {services.map((service) => (
              <div
                key={service.id}
                className="w-full flex flex-col justify-start items-start rounded-lg bg-white p-6 mb-6 shadow"
                style={{ boxSizing: 'border-box' }}
              >
                <h1 className="text-4xl font-extrabold mb-6 text-blue-700 w-full text-left">
                  {service.title || service.name}
                </h1>
                <div
                  className="ck-content text-lg text-gray-700 w-full text-left"
                  style={{ width: '100%', height: 'auto', minHeight: 0 }}
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(
                      renderDescription(service.description || 'Нет описания.'),
                      {
                        ADD_TAGS: ['iframe', 'video'],
                        ADD_ATTR: [
                          'allow',
                          'allowfullscreen',
                          'frameborder',
                          'src',
                          'width',
                          'height',
                          'controls',
                          'poster',
                          'preload',
                        ],
                      }
                    ),
                  }}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-gray-400 text-lg">
            Нет услуг для выбранного пункта.
          </div>
        )}
      </main>
    </div>
  );
}
