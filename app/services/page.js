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
// DOMPurify is DOM-dependent and must be loaded only on the client.
let DOMPurify = null;

// Minimal fallback sanitizer for initial render before DOMPurify loads.
function stripScripts(html) {
  return String(html).replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '');
}

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
    // Dynamically load DOMPurify on the client to avoid SSR issues
    (async () => {
      if (typeof window !== 'undefined' && !DOMPurify) {
        const mod = await import('dompurify');
        DOMPurify = mod.default || mod;
      }
    })();

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

  // Sidebar becomes fixed on wide layouts so navigation stays in view.
  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 pb-20 pt-24 text-white md:pt-28">
      <div className="pointer-events-none absolute inset-0 opacity-50">
        <span className="absolute -top-24 left-[10%] h-72 w-72 rounded-full bg-cs-blue/30 blur-3xl" />
        <span className="absolute bottom-0 right-[18%] h-60 w-60 rounded-full bg-fuchsia-400/25 blur-3xl" />
        <span className="absolute top-1/2 right-6 h-56 w-56 -translate-y-1/2 rounded-full bg-emerald-400/20 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto flex w-full flex-col gap-12 px-4 xl:gap-0 xl:px-16">
        <aside className="relative mx-auto flex w-full flex-col gap-6 rounded-[26px] border border-white/10 bg-white/5 p-6 shadow-[0_35px_65px_-40px_rgba(15,23,42,0.9)] backdrop-blur-xl xl:fixed xl:left-16 xl:top-28 xl:mx-0 xl:h-[calc(100vh-7rem)] xl:w-[320px] xl:flex-shrink-0 xl:self-start xl:overflow-y-auto">
          <div className="">
            <div className="pb-5">
              <h2 className="text-lg font-semibold uppercase tracking-[0.35em] text-slate-200">
                Разделы
              </h2>
            </div>

            <ul className="space-y-3">
              {categories.map((cat) => (
                <li
                  key={cat.id}
                  className="space-y-2"
                >
                  <button
                    className={`group flex w-full items-center justify-between rounded-2xl border border-transparent px-4 py-3 text-left text-sm font-semibold uppercase tracking-[0.35em] transition-all duration-200 ${
                      selectedCategoryId === cat.id
                        ? 'bg-cs-blue/25 text-white'
                        : 'bg-white/5 text-slate-200 hover:bg-cs-blue/10 hover:text-white'
                    }`}
                    onClick={() => setSelectedCategoryId(cat.id)}
                  >
                    <span>{cat.name}</span>
                    <span className="text-xs text-slate-400">
                      {Array.isArray(cat.subcategories)
                        ? cat.subcategories.length
                        : 0}
                    </span>
                  </button>

                  {selectedCategoryId === cat.id && (
                    <ul className="space-y-2 pl-3">
                      {cat.subcategories.map((sub) => (
                        <li key={sub.id}>
                          <button
                            className={`w-full rounded-xl px-3 py-2 text-left text-xs uppercase tracking-[0.3em] transition-all duration-200 ${
                              selectedSubcategoryId === sub.id
                                ? 'bg-white/15 text-white'
                                : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white'
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
          </div>
        </aside>

        <main className="flex-1 xl:fixed xl:top-28 xl:right-16 xl:bottom-8 xl:left-[420px] xl:overflow-y-auto xl:rounded-[28px] xl:border xl:h-[calc(100vh-7rem) xl:border-white/10 xl:bg-white/5 xl:shadow-[0_45px_95px_-60px_rgba(15,23,42,0.9)] xl:backdrop-blur-xl">
          <div className=" sm:px-4">
            {!selectedSubcategoryId ? (
              <div className="flex h-full min-h-[360px] w-full items-center justify-center rounded-[28px] border border-dashed border-white/15 bg-white/5 text-center text-slate-300 backdrop-blur-lg">
                <div className="max-w-full">
                  <p className="text-xs uppercase tracking-[0.4em] text-slate-400">
                    Навигация
                  </p>
                  <p className="text-lg font-medium text-slate-200 md:text-xl">
                    Аввало категория ва подкатегория танланг. Кейин ҳар бир
                    хизмат ҳақида кенг маълумотлар очилади.
                  </p>
                </div>
              </div>
            ) : services.length > 0 ? (
              <div className="grid gap-6 [grid-template-columns:repeat(auto-fit,minmax(320px,1fr))] xl:gap-8">
                {services.map((service) => (
                  <article
                    key={service.id}
                    className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/10 p-8 shadow-[0_45px_95px_-60px_rgba(15,23,42,0.9)] backdrop-blur-xl transition-transform duration-300 hover:-translate-y-1"
                  >
                    <span className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-cs-blue/20 opacity-0 transition-opacity duration-300 hover:opacity-100" />
                    <div className="relative z-10 space-y-6">
                      <header className="space-y-2">
                        <p className="text-xs uppercase tracking-[0.4em] text-slate-300">
                          Хизмат
                        </p>
                        <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
                          {service.title || service.name}
                        </h2>
                      </header>

                      <div
                        className="ck-content prose prose-invert max-w-none text-base text-slate-200"
                        dangerouslySetInnerHTML={{
                          __html: (function () {
                            const raw = renderDescription(
                              service.description || 'Нет описания.'
                            );
                            if (DOMPurify) {
                              return DOMPurify.sanitize(raw, {
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
                              });
                            }
                            return stripScripts(raw);
                          })(),
                        }}
                      />
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="flex h-full min-h-[360px] w-full items-center justify-center rounded-[28px] border border-white/10 bg-white/5 p-10 text-center text-slate-300 backdrop-blur-lg">
                <div className="space-y-3">
                  <p className="text-xs uppercase tracking-[0.4em] text-slate-400">
                    Мавжуд эмас
                  </p>
                  <p className="text-lg font-medium text-slate-200 md:text-xl">
                    Бу йўналиш бўйича ҳозирча хизматлар қўшилмаган. Илтимос,
                    бошқа подкатегорияни танлаб кўринг.
                  </p>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </section>
  );
}
