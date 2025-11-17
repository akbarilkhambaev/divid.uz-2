'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import Image from 'next/image';
import { RxFileText, RxPencil2 } from 'react-icons/rx';
import { GiPapers } from 'react-icons/gi';
import { HiCog } from 'react-icons/hi';

export default function Sidebar() {
  const pathname = usePathname();

  const navLinks = [
    {
      label: 'Все услуги',
      href: '/admin',
      icon: <RxFileText className="inline-flex mb-1" />,
    },

    {
      label: 'Добавить категорию',
      href: '/admin/categories',
      icon: <RxPencil2 className="inline-flex mb-1" />,
    },
    {
      label: 'Добавить подкатегорию',
      href: '/admin/subcategories',
      icon: <RxPencil2 className="inline-flex mb-1" />,
    },
    {
      label: 'Добавить услугу',
      href: '/admin/add',
      icon: <RxPencil2 className="inline-flex mb-1" />,
    },
    {
      label: 'Новости',
      href: '/admin/news',
      icon: <GiPapers className="inline-flex mb-1" />,
    },
    {
      label: 'Слайдер',
      href: '/admin/slider',
      icon: <RxPencil2 className="inline-flex mb-1" />,
    },
    {
      label: 'Команда',
      href: '/admin/team',
      icon: <RxPencil2 className="inline-flex mb-1" />,
    },
    {
      label: 'Отзывы',
      href: '/admin/reviews',
      icon: <RxPencil2 className="inline-flex mb-1" />,
    },
    {
      label: 'Партнеры',
      href: '/admin/partners',
      icon: <RxPencil2 className="inline-flex mb-1" />,
    },
    {
      label: 'Таймлайн опыта',
      href: '/admin/experience-timeline',
      icon: <RxPencil2 className="inline-flex mb-1" />,
    },
    {
      label: 'FAQ',
      href: '/admin/faq',
      icon: <RxPencil2 className="inline-flex mb-1" />,
    },
    {
      label: 'SEO Секции',
      href: '/admin/seo-sections',
      icon: <RxPencil2 className="inline-flex mb-1" />,
    },
    {
      label: 'Услуги (Главная)',
      href: '/admin/home-services',
      icon: <RxPencil2 className="inline-flex mb-1" />,
    },
    {
      label: 'CRM - Заявки',
      href: '/admin/crm',
      icon: <GiPapers className="inline-flex mb-1" />,
    },
    {
      label: 'Настройки',
      href: '/admin/settings',
      icon: <HiCog className="inline-flex mb-1" />,
    },
  ];

  return (
    <aside className="w-64 bg-white shadow-md p-4">
      <Image
        width={377}
        height={402}
        src="/DIVIDEND 1.svg"
        alt="feedback"
        className="pb-10 w-100"
      />
      <h2 className="text-xl font-bold mb-6">Админ-панель</h2>
      <nav className="space-y-2 row justify-center items-center">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={clsx(
              'block px-2 py-1 rounded hover:bg-gray-200',
              pathname === link.href && 'bg-gray-200 font-semibold'
            )}
          >
            {link.icon && <span className="mr-2">{link.icon}</span>}
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
