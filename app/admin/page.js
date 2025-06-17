'use client';

import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { HiPencilAlt } from 'react-icons/hi';
import { HiOutlineTrash } from 'react-icons/hi2';
import { db } from '@/lib/firebase';

export default function AdminPage() {
  const [services, setServices] = useState([]);
  const [editingService, setEditingService] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    subcategory: '',
  });

  const fetchServices = async () => {
    const snapshot = await getDocs(collection(db, 'servicesTree'));
    const data = snapshot.docs.map((doc) => doc.data());

    console.log('Firestore RAW data:', data);

    const flatServices = data.flatMap((category) => {
      if (!Array.isArray(category.subcategories)) return [];

      return category.subcategories.flatMap((sub) => {
        if (!Array.isArray(sub.services)) return [];

        return sub.services.map((service) => ({
          ...service,
          subcategory: sub.name,
          category: category.name,
        }));
      });
    });

    console.log('Parsed services:', flatServices);
    setServices(flatServices);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const openEditDrawer = (service) => {
    setEditingService(service);
    setFormData({
      title: service.name,
      description: service.description,
      subcategory: service.subcategory,
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    alert('Редактирование через Firebase пока не реализовано.');
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Услуги</h1>

      <div className="overflow-x-auto">
        <table className="w-full table-auto border border-gray-200 bg-white shadow">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">ID</th>
              <th className="px-4 py-2 border">Название</th>
              <th className="px-4 py-2 border">Категория / Подкатегория</th>
              <th className="px-4 py-2 border">Действия</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr
                key={service.id}
                className="text-center hover:bg-gray-50"
              >
                <td className="px-4 py-2 border">{service.id}</td>
                <td className="px-4 py-2 border">{service.name}</td>
                <td className="px-4 py-2 border">
                  {service.category} / {service.subcategory}
                </td>
                <td className="px-4 py-2 border space-x-2 ">
                  <button
                    onClick={() => openEditDrawer(service)}
                    className="bg-cs-blue text-white px-2 py-1 rounded"
                  >
                    <HiPencilAlt />
                  </button>
                  <button
                    onClick={() => alert('Удаление пока не реализовано')}
                    className="bg-red-600 text-white px-2 py-1 rounded"
                  >
                    <HiOutlineTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Drawer & Backdrop (always rendered for smooth transition) */}
      <div
        className={`fixed inset-0 z-40 flex justify-end pointer-events-none`}
        aria-modal="true"
        role="dialog"
      >
        {/* Backdrop */}
        <div
          className={`fixed inset-0 bg-opacity-20 transition-all duration-300 ${
            editingService
              ? 'backdrop-blur-sm pointer-events-auto'
              : 'backdrop-blur-0 pointer-events-none'
          }`}
          onClick={() => setEditingService(null)}
        />
        {/* Drawer */}
        <div
          className={`relative w-96 max-w-full h-full bg-white shadow-lg p-6 overflow-y-auto transition-transform duration-300 ease-in-out transform ${
            editingService ? 'translate-x-0' : 'translate-x-full'
          } pointer-events-auto`}
        >
          <button
            type="button"
            onClick={() => setEditingService(null)}
            className="absolute top-4 right-4 text-gray-400 hover:text-black text-2xl font-bold"
            aria-label="Закрыть"
          >
            ×
          </button>
          {editingService && (
            <>
              <h2 className="text-xl font-bold mb-4">Редактирование услуги</h2>
              <form
                onSubmit={handleEditSubmit}
                className="space-y-4"
              >
                <input
                  name="title"
                  value={formData.title}
                  onChange={handleEditChange}
                  placeholder="Название"
                  className="w-full border p-2 rounded"
                />
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleEditChange}
                  placeholder="Описание"
                  className="w-full border p-2 rounded"
                />
                <input
                  name="subcategory"
                  value={formData.subcategory}
                  onChange={handleEditChange}
                  placeholder="Подкатегория"
                  className="w-full border p-2 rounded"
                />
                <div className="flex justify-between">
                  <button
                    type="submit"
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                  >
                    Сохранить
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingService(null)}
                    className="text-gray-500 hover:text-black"
                  >
                    Закрыть
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
