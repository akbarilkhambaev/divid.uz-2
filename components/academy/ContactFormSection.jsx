'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  getDoc,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { sendToTelegram } from '@/lib/telegram';
import {
  FaPhone,
  FaTelegram,
  FaFacebook,
  FaWhatsapp,
  FaMapMarkerAlt,
  FaClock,
} from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

const defaultSettings = {
  sectionTitle: 'Биз билан алоқага чиқинг',
  sectionSubtitle: 'Саволларингиз борми? Биз сизга ёрдам беришга тайёрмиз!',
  formTitle: 'Қўнғироқ қолдиринг',
  contactInfoTitle: 'Алоқа маълумотлари',
  workHoursTitle: 'Ишчи соатлар',
  addressTitle: 'Манзил',
  address: 'Тошкент шаҳри, Мирзо Улуғбек тумани, Буюк Турон кўчаси, 1-уй',
  mondayFriday: '9:00 - 18:00',
  saturday: '10:00 - 15:00',
  sunday: 'Дам олиш',
  phone: '+998 90 123 45 67',
  telegram: '@dividend_academy',
  telegramLink: 'https://t.me/dividend_academy',
  facebook: 'Dividend Academy',
  facebookLink: 'https://facebook.com/dividend.academy',
  whatsapp: '+998 90 123 45 67',
  whatsappLink: 'https://wa.me/998901234567',
  socialFooter: 'Ижтимоий тармоқларда биз билан боғланинг',
};

export default function ContactFormSection() {
  const [settings, setSettings] = useState(defaultSettings);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const docRef = doc(db, 'academySettings', 'contact');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setSettings((prev) => ({ ...prev, ...docSnap.data() }));
        }
      } catch (error) {
        console.error('Error fetching contact settings:', error);
      }
    };
    fetchSettings();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addDoc(collection(db, 'leads'), {
        formType: 'academy_contact',
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        message: formData.message,
        createdAt: serverTimestamp(),
        status: 'new',
      });

      // Отправляем в Telegram
      await sendToTelegram({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        message: formData.message,
        formType: 'academy_contact',
      });

      setSubmitted(true);
      setFormData({ name: '', phone: '', email: '', message: '' });
    } catch (error) {
      console.error('Ошибка отправки формы:', error);
      alert('Хатолик юз берди. Илтимос, қайта уриниб кўринг.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfo = [
    {
      icon: FaPhone,
      label: 'Телефон',
      value: settings.phone,
      link: `tel:${settings.phone?.replace(/\s/g, '')}`,
      color: 'text-blue-400',
    },
    {
      icon: FaTelegram,
      label: 'Telegram',
      value: settings.telegram,
      link: settings.telegramLink,
      color: 'text-blue-500',
    },
    {
      icon: FaFacebook,
      label: 'Facebook',
      value: settings.facebook,
      link: settings.facebookLink,
      color: 'text-blue-600',
    },
    {
      icon: FaWhatsapp,
      label: 'WhatsApp',
      value: settings.whatsapp,
      link: settings.whatsappLink,
      color: 'text-green-500',
    },
  ];

  return (
    <section
      id="contact"
      className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex items-center justify-center relative px-4 md:px-8 py-16 scroll-mt-18"
    >
      <div className="absolute top-8 right-8 text-white/10 text-6xl md:text-8xl font-bold">
        12
      </div>

      <div className="max-w-7xl w-full">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-white uppercase">
            {settings.sectionTitle}
          </h2>
          <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto">
            {settings.sectionSubtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Форма слева */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl"
          >
            <h3 className="text-3xl font-bold text-white mb-6">
              {settings.formTitle}
            </h3>
            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <div>
                <label className="block text-white/80 mb-2 font-semibold">
                  Исм
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-cs-blue focus:ring-2 focus:ring-cs-blue/50 transition-all"
                  placeholder="Исмингизни киритинг"
                />
              </div>

              <div>
                <label className="block text-white/80 mb-2 font-semibold">
                  Телефон рақам
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-cs-blue focus:ring-2 focus:ring-cs-blue/50 transition-all"
                  placeholder="+998 90 123 45 67"
                />
              </div>

              <div>
                <label className="block text-white/80 mb-2 font-semibold">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-cs-blue focus:ring-2 focus:ring-cs-blue/50 transition-all"
                  placeholder="email@example.com"
                />
              </div>

              <div>
                <label className="block text-white/80 mb-2 font-semibold">
                  Хабар
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-cs-blue focus:ring-2 focus:ring-cs-blue/50 transition-all resize-none"
                  placeholder="Савол ёки изоҳингизни ёзинг..."
                ></textarea>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-cs-blue to-blue-600 text-white font-bold py-4 px-8 rounded-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Юборилмоқда...' : 'Юбориш'}
              </motion.button>
            </form>
          </motion.div>

          {/* Контактная информация справа */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl">
              <h3 className="text-3xl font-bold text-white mb-6">
                {settings.contactInfoTitle}
              </h3>
              <div className="space-y-4">
                {contactInfo.map((contact, idx) => {
                  const IconComponent = contact.icon;
                  return (
                    <motion.a
                      key={idx}
                      href={contact.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: idx * 0.1 }}
                      className="flex items-center gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 hover:scale-105 transition-all duration-300 group"
                    >
                      <div
                        className={`w-12 h-12 flex items-center justify-center group-hover:scale-110 transition-transform ${contact.color}`}
                      >
                        <IconComponent size={32} />
                      </div>
                      <div>
                        <p className="text-white/60 text-sm font-semibold">
                          {contact.label}
                        </p>
                        <p className="text-white text-lg font-bold">
                          {contact.value}
                        </p>
                      </div>
                    </motion.a>
                  );
                })}
              </div>
            </div>

            {/* Дополнительная информация */}
            <div className="bg-gradient-to-r from-cs-blue to-blue-600 p-8 rounded-3xl">
              <div className="flex items-center gap-3 mb-4">
                <FaClock className="text-white text-2xl" />
                <h4 className="text-2xl font-bold text-white">
                  {settings.workHoursTitle}
                </h4>
              </div>
              <div className="space-y-2 text-white/90">
                <p className="flex justify-between">
                  <span>Душанба - Жума:</span>
                  <span className="font-bold">{settings.mondayFriday}</span>
                </p>
                <p className="flex justify-between">
                  <span>Шанба:</span>
                  <span className="font-bold">{settings.saturday}</span>
                </p>
                <p className="flex justify-between">
                  <span>Якшанба:</span>
                  <span className="font-bold">{settings.sunday}</span>
                </p>
              </div>
            </div>

            {/* Адрес */}
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl">
              <div className="flex items-center gap-3 mb-4">
                <FaMapMarkerAlt className="text-cs-blue text-2xl" />
                <h4 className="text-2xl font-bold text-white">
                  {settings.addressTitle}
                </h4>
              </div>
              <p className="text-white/90 text-lg">{settings.address}</p>
            </div>
          </motion.div>
        </div>

        {/* Социальные сети внизу */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 text-center"
        >
          <p className="text-white/60 text-lg mb-6">{settings.socialFooter}</p>
          <div className="flex justify-center gap-6">
            <motion.a
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              href={settings.telegramLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center hover:shadow-xl transition-all"
            >
              <FaTelegram
                size={32}
                className="text-white"
              />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.1, rotate: -5 }}
              whileTap={{ scale: 0.9 }}
              href={settings.facebookLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center hover:shadow-xl transition-all"
            >
              <FaFacebook
                size={32}
                className="text-white"
              />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              href={settings.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center hover:shadow-xl transition-all"
            >
              <FaWhatsapp
                size={32}
                className="text-white"
              />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.1, rotate: -5 }}
              whileTap={{ scale: 0.9 }}
              href={`tel:${settings.phone?.replace(/\s/g, '')}`}
              className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center hover:shadow-xl transition-all"
            >
              <FaPhone
                size={28}
                className="text-white"
              />
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* Модальное окно успешной отправки */}
      <AnimatePresence>
        {submitted && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSubmitted(false)}
              className="fixed inset-0 bg-black/50 z-[60]"
            />
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed inset-0 z-[60] flex items-center justify-center p-4"
            >
              <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center relative">
                {/* Кнопка закрытия */}
                <button
                  onClick={() => setSubmitted(false)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>

                {/* Иконка успеха */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                  className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <svg
                    className="w-12 h-12 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </motion.div>

                {/* Текст */}
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Хабар юборилди!
                </h3>
                <p className="text-gray-600 mb-6">
                  Сизнинг заявкангиз қабул қилинди. Тез орада сиз билан
                  боғланамиз.
                </p>

                {/* Кнопка */}
                <button
                  onClick={() => setSubmitted(false)}
                  className="w-full bg-cs-blue text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
                >
                  Яхши
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
