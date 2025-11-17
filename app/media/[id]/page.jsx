'use client';

import { useEffect, useMemo, useState } from 'react';
import '../ckeditor-excerpt.css';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import {
  collection,
  doc,
  getDoc,
  getDocs,
  increment,
  limit,
  orderBy,
  query,
  updateDoc,
} from 'firebase/firestore';
import { FaArrowLeft, FaRegEye, FaTelegram, FaXTwitter } from 'react-icons/fa6';
import { db } from '@/lib/firebase';

let DOMPurify = null;

function sanitizeHtml(html) {
  if (!html) return '';
  if (typeof window === 'undefined') return html;
  if (DOMPurify) {
    return DOMPurify.sanitize(html, {
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
  return String(html).replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '');
}

function getExcerptHtml(entry) {
  const source =
    entry?.description || entry?.text || entry?.full_description || '';
  if (!source) return '';
  // Обрезаем до ~140 символов, но сохраняем базовые теги CKEditor
  let html = String(source)
    .replace(/\n/g, ' ')
    .replace(/(<br\s*\/?\s*>)+/gi, ' ');
  // Разрешаем только базовые теги CKEditor
  if (typeof window !== 'undefined' && DOMPurify) {
    html = DOMPurify.sanitize(html, {
      ALLOWED_TAGS: ['b', 'strong', 'i', 'em', 'ul', 'ol', 'li', 'blockquote'],
      ALLOWED_ATTR: [],
    });
  } else {
    html = html.replace(
      /<(?!\/?(b|strong|i|em|ul|ol|li|blockquote)\b)[^>]*>/gi,
      ''
    );
  }
  // Обрезаем текст до 140 символов без учета тегов
  const temp = document?.createElement ? document.createElement('div') : null;
  if (temp) {
    temp.innerHTML = html;
    let text = temp.textContent || temp.innerText || '';
    if (text.length > 140) {
      text = text.slice(0, 137) + '...';
      // Восстанавливаем html только для видимой части
      html = text;
    }
  }
  return html;
}

export default function MediaDetailPage() {
  const { id } = useParams();
  const [media, setMedia] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedNews, setRelatedNews] = useState([]);
  const [currentUrl, setCurrentUrl] = useState('');

  useEffect(() => {
    if (typeof window === 'undefined' || DOMPurify) return;
    (async () => {
      const mod = await import('dompurify');
      DOMPurify = mod.default || mod;
    })();
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    setCurrentUrl(window.location.href);
  }, []);

  useEffect(() => {
    if (!id) return;
    let isMounted = true;

    const fetchMedia = async () => {
      try {
        const docRef = doc(db, 'news', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const payload = { id: docSnap.id, ...docSnap.data() };
          if (isMounted) setMedia(payload);
          await updateDoc(docRef, { views: increment(1) });
        }
      } catch (error) {
        console.error('Ошибка при загрузке новости:', error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchMedia();

    return () => {
      isMounted = false;
    };
  }, [id]);

  useEffect(() => {
    if (!media) return;
    let isMounted = true;

    const fetchRelated = async () => {
      try {
        const relatedSnap = await getDocs(
          query(collection(db, 'news'), orderBy('createdAt', 'desc'), limit(5))
        );
        if (!isMounted) return;
        const items = relatedSnap.docs
          .filter((docItem) => docItem.id !== media.id)
          .map((docItem) => ({ id: docItem.id, ...docItem.data() }))
          .slice(0, 3);
        setRelatedNews(items);
      } catch (error) {
        console.error('Ошибка при загрузке похожих новостей:', error);
      }
    };

    fetchRelated();

    return () => {
      isMounted = false;
    };
  }, [media]);

  const formattedDate = useMemo(() => {
    if (!media?.createdAt?.seconds) return 'Дата неизвестна';
    try {
      return new Date(media.createdAt.seconds * 1000).toLocaleString();
    } catch (error) {
      return 'Дата неизвестна';
    }
  }, [media?.createdAt]);

  const shareText = encodeURIComponent(media?.title || '');
  const shareUrl = encodeURIComponent(currentUrl || '');
  const telegramShare = `https://t.me/share/url?url=${shareUrl}&text=${shareText}`;
  const twitterShare = `https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareText}`;

  if (loading) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-300">
        Загрузка...
      </section>
    );
  }

  if (!media) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-slate-950 text-red-400">
        Медиа не найдено
      </section>
    );
  }

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 pb-24 pt-28 text-white">
      <div className="pointer-events-none absolute inset-0 opacity-40">
        <span className="absolute -top-24 left-[12%] h-72 w-72 rounded-full bg-cs-blue/30 blur-3xl" />
        <span className="absolute bottom-10 right-[18%] h-64 w-64 rounded-full bg-fuchsia-400/25 blur-3xl" />
        <span className="absolute top-1/2 right-12 h-56 w-56 -translate-y-1/2 rounded-full bg-emerald-400/20 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 sm:px-6 lg:px-8">
        <article className="rounded-[32px] border border-white/10 bg-white/5 p-6 shadow-[0_45px_95px_-60px_rgba(15,23,42,0.9)] backdrop-blur-xl sm:p-8">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,120px)_1fr]">
            <aside className="order-2 flex flex-col gap-4 lg:order-1 lg:sticky lg:top-32">
              <Link
                href="/media"
                className="inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-slate-200 transition-colors duration-200 hover:border-cs-blue/40 hover:bg-cs-blue/20"
              >
                <FaArrowLeft /> Орқага
              </Link>
              <div className="flex flex-row flex-wrap gap-3 lg:flex-col">
                <a
                  href={media.telegramUrl || telegramShare}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-cs-blue/25 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white transition-colors duration-200 hover:bg-cs-blue/35"
                >
                  <FaTelegram /> Telegram
                </a>
                <a
                  href={media.twitterUrl || twitterShare}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-slate-200 transition-colors duration-200 hover:bg-white/20"
                >
                  <FaXTwitter />
                  Twitter
                </a>
              </div>
            </aside>

            <div className="order-1 space-y-8 lg:order-2">
              <header className="space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-3 text-xs uppercase tracking-[0.35em] text-slate-400">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="inline-flex items-center rounded-full bg-cs-blue/20 px-3 py-1 text-xs font-medium uppercase tracking-[0.35em] text-cs-blue">
                      {media.category || 'Янгилик'}
                    </span>
                    <span>{formattedDate}</span>
                  </div>
                  {typeof media.views === 'number' && (
                    <span className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.3em] text-slate-300">
                      <FaRegEye /> {media.views}
                    </span>
                  )}
                </div>

                <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
                  {media.title}
                </h1>

                {media.description && (
                  <p className="text-base font-medium text-slate-200">
                    {media.description}
                  </p>
                )}
              </header>

              {media.imageBase64 ? (
                <figure className="space-y-3">
                  <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-slate-900/40 shadow-[0_35px_65px_-40px_rgba(15,23,42,0.9)]">
                    <div className="aspect-[16/9] w-full">
                      <Image
                        src={media.imageBase64}
                        alt={media.title}
                        width={960}
                        height={540}
                        className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                        unoptimized
                      />
                    </div>
                  </div>
                  {media.imageCaption && (
                    <figcaption className="text-xs uppercase tracking-[0.3em] text-slate-500">
                      {media.imageCaption}
                    </figcaption>
                  )}
                </figure>
              ) : (
                <div className="flex h-64 w-full items-center justify-center rounded-[28px] border border-dashed border-white/15 bg-white/10 text-sm text-slate-400">
                  Изображение отсутствует
                </div>
              )}

              <div className="space-y-6 text-sm leading-relaxed text-slate-200">
                {media.full_description ? (
                  <div
                    className="ckeditorExcerpt prose prose-invert max-w-none text-slate-100"
                    dangerouslySetInnerHTML={{
                      __html: sanitizeHtml(media.full_description),
                    }}
                  />
                ) : (
                  <p className="whitespace-pre-line">{media.text || ''}</p>
                )}
              </div>

              {relatedNews.length > 0 && (
                <section className="space-y-4 rounded-[26px] border border-white/10 bg-white/5 p-6 shadow-[0_35px_65px_-40px_rgba(15,23,42,0.9)] backdrop-blur-xl">
                  <h2 className="text-lg font-semibold uppercase tracking-[0.3em] text-slate-200">
                    Бошқа янгиликлар
                  </h2>
                  <div
                    className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent"
                    style={{ scrollSnapType: 'x mandatory' }}
                  >
                    {relatedNews.map((item) => (
                      <Link
                        key={item.id}
                        href={`/media/${item.id}`}
                        className="group min-w-[270px] max-w-xs flex-1 snap-start border border-white/10 bg-white/5 text-sm text-slate-200 transition-transform duration-200 hover:-translate-y-1 hover:border-cs-blue/40 hover:bg-cs-blue/10 relative overflow-hidden p-0 m-0"
                        style={{
                          scrollSnapAlign: 'start',
                          background: item.imageBase64
                            ? `url('${item.imageBase64}') center/cover no-repeat`
                            : undefined,
                        }}
                      >
                        <div className="absolute inset-0 bg-slate-900/70 group-hover:bg-slate-900/60 transition-colors duration-200" />
                        <div className="relative z-10 flex flex-col h-full justify-between px-4 py-3 space-y-3">
                          <div>
                            <p className="text-xs uppercase tracking-[0.3em] text-slate-300">
                              {item.category || 'Янгилик'}
                            </p>
                            <h3 className="mt-1 text-base font-semibold text-white line-clamp-3">
                              {item.title}
                            </h3>
                            {getExcerptHtml(item) && (
                              <div
                                className="ckeditorExcerpt"
                                style={{ marginTop: '0.5rem' }}
                                dangerouslySetInnerHTML={{
                                  __html: getExcerptHtml(item),
                                }}
                              />
                            )}
                          </div>
                          {item.createdAt?.seconds && (
                            <p className="text-xs uppercase tracking-[0.3em] text-slate-400 mt-4">
                              {new Date(
                                item.createdAt.seconds * 1000
                              ).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              )}
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
