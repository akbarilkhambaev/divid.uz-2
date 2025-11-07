# 🏢 Divid.uz - Корпоративный сайт консалтинговой компании

Современный веб-сайт с полноценной CMS системой для управления контентом, построенный на Next.js 15 и Firebase.

## 🚀 Быстрый старт

### Установка зависимостей:

```bash
npm install
```

### Запуск development сервера:

```bash
npm run dev
# или
yarn dev
# или
pnpm dev
```

Откройте [http://localhost:3000](http://localhost:3000) в браузере.

### 🔐 Первый вход в админ-панель:

1. Перейдите на `/admin/setup` для создания первого администратора
2. Заполните форму регистрации
3. Войдите через `/admin/login`

📖 **Подробная инструкция**: см. [QUICK_START.md](./QUICK_START.md)

## 📦 Технологический стек

### Frontend:
- **Next.js 15.2.4** - React фреймворк с App Router
- **React 19** - UI библиотека
- **Tailwind CSS 4.0** - утилитарный CSS фреймворк
- **Framer Motion** - библиотека анимаций
- **Swiper** - современные слайдеры
- **CKEditor 5** - WYSIWYG редактор
- **React IMask** - маски для форм

### Backend & Database:
- **Firebase Firestore** - NoSQL база данных
- **Firebase Storage** - хранилище файлов
- **Firebase Auth** - (планируется) аутентификация

### UI & Иконки:
- **React Icons** - коллекция иконок
- **Animate.css** - CSS анимации
- **Lottie** - векторные анимации

## 📁 Структура проекта

```
divid.uz_with_django_backend/
├── app/                          # Next.js App Router
│   ├── admin/                    # 🔐 Админ-панель
│   │   ├── login/               # Страница входа
│   │   ├── setup/               # Первоначальная настройка
│   │   ├── settings/            # Управление администраторами
│   │   ├── add/                 # Добавление услуг
│   │   ├── categories/          # Категории
│   │   ├── subcategories/       # Подкатегории
│   │   ├── news/                # Новости
│   │   ├── slider/              # Главный слайдер
│   │   ├── team/                # Команда
│   │   ├── reviews/             # Отзывы
│   │   ├── partners/            # Партнеры
│   │   ├── faq/                 # FAQ
│   │   ├── seo-sections/        # SEO секции
│   │   ├── home-services/       # Услуги на главной
│   │   └── crm/                 # CRM - заявки
│   ├── allservices/             # Страница всех услуг
│   ├── contacts/                # Контакты
│   ├── media/                   # Медиа/новости
│   └── services/                # Отдельные услуги
├── components/                   # React компоненты
│   ├── admin/                   # Компоненты админки
│   │   ├── AdminAuthCheck.jsx  # Middleware авторизации
│   │   ├── CategoryForm.jsx    # Форма категорий
│   │   ├── RichEditor.jsx      # CKEditor обертка
│   │   └── ...
│   ├── content/                 # Контентные секции
│   │   ├── AboutServicesSection.jsx
│   │   ├── Services.jsx
│   │   ├── Reviews.jsx
│   │   ├── OurTeam.jsx
│   │   └── ...
│   ├── Header.jsx              # Шапка сайта
│   ├── Footer.jsx              # Подвал сайта
│   ├── Layout.jsx              # Главный layout
│   └── Sidebar.jsx             # Сайдбар админки
├── lib/
│   └── firebase.js             # Firebase конфигурация
├── public/                      # Статические файлы
│   ├── ourpartners/
│   ├── Reviews/
│   ├── slider/
│   └── team/
└── scripts/                     # Утилиты и скрипты

```

## ✨ Основные функции

### 🌐 Публичная часть:
- ✅ Главная страница с анимациями
- ✅ Каталог услуг
- ✅ Страницы новостей
- ✅ Информация о команде
- ✅ Отзывы клиентов
- ✅ Блок партнеров
- ✅ Формы обратной связи
- ✅ SEO оптимизация

### 🔐 Админ-панель:
- ✅ Система авторизации
- ✅ Управление администраторами
- ✅ Роли (Admin / Super Admin)
- ✅ CRUD операции для всех сущностей
- ✅ CRM система для заявок
- ✅ Загрузка изображений
- ✅ WYSIWYG редактор для контента
- ✅ Управление FAQ
- ✅ Настройка SEO секций

## 🔒 Система авторизации

### Роли администраторов:

**Administrator (admin)**
- Управление контентом
- Просмотр и обработка заявок
- Редактирование услуг, новостей, отзывов

**Super Administrator (superadmin)**
- Все права администратора
- Управление другими администраторами
- Доступ к системным настройкам

### Безопасность:
- Проверка авторизации на всех страницах админки
- Сессии с ограниченным временем (24 часа)
- Защита маршрутов через middleware
- Валидация форм

📖 **Подробнее**: см. [ADMIN_AUTH_README.md](./ADMIN_AUTH_README.md)

## 🗄️ Firebase Collections

### Основные коллекции Firestore:

```javascript
// Администраторы
administrators: {
  username: string,
  email: string,
  password: string,
  role: 'admin' | 'superadmin',
  isActive: boolean,
  createdAt: timestamp
}

// Заявки из форм
leads: {
  formType: string,
  name: string,
  phone: string,
  message?: string,
  topic?: string,
  status: 'new' | 'processing' | 'completed',
  createdAt: timestamp
}

// Дерево услуг
servicesTree: {
  name: string,
  subcategories: [{
    name: string,
    services: [{
      id: string,
      name: string,
      description: string
    }]
  }]
}

// ... другие коллекции
```

## 🛠️ Разработка

### Команды:

```bash
# Разработка
npm run dev

# Сборка для production
npm run build

# Запуск production сервера
npm start

# Линтинг
npm run lint
```

### Переменные окружения:

Создайте файл `.env.local`:

```env
# Firebase конфигурация (уже настроена в lib/firebase.js)
# Добавьте другие переменные по необходимости
```

## 🎨 Кастомизация

### Цвета (tailwind.config.js):

```javascript
colors: {
  'cs-blue': '#3b82f6',    // Основной синий
  'cs-white': '#ffffff',   // Белый
  // ... другие цвета
}
```

### Шрифты:
Проект использует системные шрифты для оптимальной производительности.

## 📱 Адаптивность

Сайт полностью адаптивен и протестирован на:
- 📱 Мобильных устройствах (320px+)
- 📱 Планшетах (768px+)
- 💻 Десктопах (1024px+)
- 🖥️ Больших экранах (1920px+)

## 🚀 Деплой

### Vercel (рекомендуется):

```bash
# Установите Vercel CLI
npm i -g vercel

# Деплой
vercel
```

### Другие платформы:
Проект совместим с любой платформой, поддерживающей Next.js:
- Netlify
- Railway
- Render
- AWS Amplify

## 📄 Лицензия

Проект создан для Divid.uz - Консалтинговая компания

---

## 📞 Контакты

- **Website**: [divid.uz](https://divid.uz)
- **Email**: info@divid.uz
- **Phone**: +998 90 123 45 67

---

## 🙏 Благодарности

Спасибо всем open-source проектам, которые сделали эту разработку возможной:
- Next.js Team
- React Team
- Firebase Team
- Tailwind CSS Team
- И всем остальным!

---

**Сделано с ❤️ в Ташкенте, Узбекистан**
