'use client';

import { useEffect, useState } from 'react';
import {
  collection,
  getDocs,
  doc,
  getDoc,
  updateDoc,
} from 'firebase/firestore';
import { HiPencilAlt } from 'react-icons/hi';
import { HiOutlineTrash } from 'react-icons/hi2';
import { db } from '@/lib/firebase';
import RichEditor from '@/components/admin/RichEditor';

export default function AdminPage() {
  const [services, setServices] = useState([]);
  const [editingService, setEditingService] = useState(null);
  const [formData, setFormData] = useState({ title: '', description: '' });
  const [saving, setSaving] = useState(false);

  const fetchServices = async () => {
    const snapshot = await getDocs(collection(db, 'servicesTree'));

    const flatServices = snapshot.docs.flatMap((docSnap) => {
      const data = docSnap.data();
      if (!Array.isArray(data.subcategories)) return [];
      return data.subcategories.flatMap((sub) => {
        if (!Array.isArray(sub.services)) return [];
        return sub.services.map((service) => ({
          ...service,
          _categoryDocId: docSnap.id,
          _categoryName: data.name,
          _subcategoryId: sub.id,
          _subcategoryName: sub.name,
        }));
      });
    });

    setServices(flatServices);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const openEditDrawer = (service) => {
    setEditingService(service);
    setFormData({
      title: service.name,
      description: service.description || '',
    });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return alert('Введите название');
    setSaving(true);
    try {
      const categoryRef = doc(
        db,
        'servicesTree',
        editingService._categoryDocId,
      );
      const snap = await getDoc(categoryRef);
      if (!snap.exists()) throw new Error('Документ не найден');
      const data = snap.data();
      const updated = {
        ...data,
        subcategories: data.subcategories.map((sub) => {
          if (String(sub.id) !== String(editingService._subcategoryId))
            return sub;
          return {
            ...sub,
            services: (sub.services || []).map((s) =>
              s.id === editingService.id
                ? {
                    ...s,
                    name: formData.title,
                    description: formData.description,
                  }
                : s,
            ),
          };
        }),
      };
      await updateDoc(categoryRef, updated);
      setEditingService(null);
      await fetchServices();
    } catch (err) {
      console.error(err);
      alert('Ошибка при сохранении: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (service) => {
    if (!confirm(`Удалить услугу "${service.name}"?`)) return;
    try {
      const categoryRef = doc(db, 'servicesTree', service._categoryDocId);
      const snap = await getDoc(categoryRef);
      if (!snap.exists()) throw new Error('Документ не найден');
      const data = snap.data();
      const updated = {
        ...data,
        subcategories: data.subcategories.map((sub) => {
          if (String(sub.id) !== String(service._subcategoryId)) return sub;
          return {
            ...sub,
            services: (sub.services || []).filter((s) => s.id !== service.id),
          };
        }),
      };
      await updateDoc(categoryRef, updated);
      await fetchServices();
    } catch (err) {
      console.error(err);
      alert('Ошибка при удалении: ' + err.message);
    }
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
                <td className="px-4 py-2 border text-xs text-gray-500">
                  {service.id}
                </td>
                <td className="px-4 py-2 border">{service.name}</td>
                <td className="px-4 py-2 border">
                  {service._categoryName} / {service._subcategoryName}
                </td>
                <td className="px-4 py-2 border space-x-2 ">
                  <button
                    onClick={() => openEditDrawer(service)}
                    className="bg-cs-blue text-white px-2 py-1 rounded"
                  >
                    <HiPencilAlt />
                  </button>
                  <button
                    onClick={() => handleDelete(service)}
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
              <p className="text-sm text-gray-500 mb-4">
                {editingService._categoryName} /{' '}
                {editingService._subcategoryName}
              </p>
              <form
                onSubmit={handleEditSubmit}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Название
                  </label>
                  <input
                    value={formData.title}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, title: e.target.value }))
                    }
                    placeholder="Название"
                    className="w-full border p-2 rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Описание
                  </label>
                  <RichEditor
                    value={formData.description}
                    onChange={(_e, editor) =>
                      setFormData((p) => ({
                        ...p,
                        description: editor.getData(),
                      }))
                    }
                  />
                </div>
                <div className="flex justify-between pt-2">
                  <button
                    type="submit"
                    disabled={saving}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
                  >
                    {saving ? 'Сохранение...' : 'Сохранить'}
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
