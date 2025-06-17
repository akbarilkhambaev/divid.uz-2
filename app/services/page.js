'use client';

import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import AboutServicesSection from '@/components/content/AboutServicesSection';
import { db } from '@/lib/firebase';

export default function ServicesPage() {
  const [showServiceExplorer, setShowServiceExplorer] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState(null);
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [allServices, setAllServices] = useState([]);

  useEffect(() => {
    // Получаем servicesTree из Firestore
    getDocs(collection(db, 'servicesTree')).then((snapshot) => {
      const data = snapshot.docs.map((doc) => doc.data());
      // Категории
      const cats = data.map((cat) => ({ id: cat.id, name: cat.name }));
      setCategories(cats);
      // Подкатегории
      const subs = data.flatMap((cat) =>
        (cat.subcategories || []).map((sub) => ({
          id: sub.id,
          name: sub.name,
          category: cat.id,
        }))
      );
      setSubcategories(subs);
      // Все услуги (для быстрого доступа)
      const allServices = data.flatMap((cat) =>
        (cat.subcategories || []).flatMap((sub) =>
          (sub.services || []).map((service) => ({
            ...service,
            subcategory: sub.id,
            category: cat.id,
          }))
        )
      );
      // Если уже выбрана подкатегория, обновить услуги
      if (selectedSubcategoryId) {
        setServices(
          allServices.filter((s) => s.subcategory === selectedSubcategoryId)
        );
      }
      // Сохраняем все услуги для дальнейшей фильтрации
      setAllServices(allServices);
    });
  }, [selectedSubcategoryId]);

  useEffect(() => {
    if (selectedSubcategoryId) {
      setServices(
        allServices.filter((s) => s.subcategory === selectedSubcategoryId)
      );
    }
  }, [selectedSubcategoryId, allServices]);

  const handleServiceClick = (id) => {
    const found = allServices.find((s) => s.id === id);
    setSelectedService(found || null);
  };

  return (
    <>
      {!showServiceExplorer ? (
        <div className="bg-white min-h-screen py-2">
          <AboutServicesSection />
          <div className="text-center mt-10">
            <button
              onClick={() => setShowServiceExplorer(true)}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition"
            >
              Получить более подробную информацию
            </button>
          </div>
        </div>
      ) : (
        <div className="flex h-screen w-full p-2 overflow-hidden">
          {/* Левая панель с категориями и подкатегориями */}
          <aside className="w-80 h-full overflow-y-auto overflow-x-hidden break-words border-r p-3 bg-white">
            {categories.map((category) => (
              <div key={category.id}>
                <h3 className="font-bold mb-1">{category.name}</h3>
                <ul className="ml-4 mb-4">
                  {subcategories
                    .filter((sub) => sub.category === category.id)
                    .map((sub) => (
                      <li key={sub.id}>
                        <button
                          className="text-blue-600 hover:underline cursor-pointer text-sm text-left"
                          onClick={() => {
                            setSelectedSubcategoryId(sub.id);
                            setSelectedService(null);
                          }}
                        >
                          {sub.name}
                        </button>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </aside>

          {/* Правая панель */}
          <main className="flex-1 overflow-y-auto p-4 bg-gray-50">
            {/* Список услуг */}
            {selectedSubcategoryId && !selectedService && (
              <>
                {services.length > 0 ? (
                  services.map((service) => (
                    <div
                      key={service.id}
                      className="mb-6 border rounded-lg p-4 shadow-sm cursor-pointer hover:bg-gray-100"
                      onClick={() => handleServiceClick(service.id)}
                    >
                      <h2 className="text-xl font-bold mb-2">
                        {service.title}
                      </h2>
                      <p className="text-gray-600">
                        {service.description?.slice(0, 100)}...
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">Нет доступных услуг.</p>
                )}
              </>
            )}

            {/* Подробности услуги */}
            {selectedService && (
              <div className="border rounded-lg p-6 shadow-md bg-white">
                <h2 className="text-2xl font-bold mb-3">
                  {selectedService.title}
                </h2>
                {selectedService.youtube_url && (
                  <iframe
                    width="100%"
                    height="400"
                    src={selectedService.youtube_url.replace(
                      'watch?v=',
                      'embed/'
                    )}
                    title={selectedService.title}
                    allowFullScreen
                    className="mb-4"
                  />
                )}
                <p className="mb-4 text-gray-700">
                  {selectedService.description}
                </p>
                <button
                  className="bg-gray-200 text-gray-800 px-4 py-2 rounded"
                  onClick={() => setSelectedService(null)}
                >
                  ← Назад к списку
                </button>
              </div>
            )}
          </main>
        </div>
      )}
    </>
  );
}
