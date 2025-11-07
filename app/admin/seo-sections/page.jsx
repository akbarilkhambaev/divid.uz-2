'use client';

import { useEffect, useState } from 'react';
import { HiPencilAlt } from 'react-icons/hi';
import { HiOutlineTrash } from 'react-icons/hi2';
import { db } from '@/lib/firebase';
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
} from 'firebase/firestore';

export default function SEOSectionsManagementPage() {
  const [sections, setSections] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    order: 0,
  });
  const [editData, setEditData] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchSections = async () => {
    const q = query(collection(db, 'seoSections'), orderBy('order', 'asc'));
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map((d) => {
      const item = d.data();
      return {
        id: d.id,
        ...item,
      };
    });
    setSections(data);
  };

  useEffect(() => {
    fetchSections();
  }, []);

  const resetForm = () => {
    setFormData({ title: '', order: 0 });
    setEditData(null);
  };

  const handleAddOrUpdate = async (e) => {
    e.preventDefault();
    const { title, order } = formData;
    if (!title) return alert('Заполните заголовок секции');

    if (editData) {
      const docRef = doc(db, 'seoSections', editData.id);
      await updateDoc(docRef, {
        title,
        order: Number(order) || 0,
      });
      alert('Секция обновлена');
    } else {
      await addDoc(collection(db, 'seoSections'), {
        title,
        order: Number(order) || 0,
      });
      alert('Секция добавлена');
    }
    resetForm();
    fetchSections();
    setModalOpen(false);
  };

  const handleDelete = async (id) => {
    if (confirm('Удалить эту секцию?')) {
      await deleteDoc(doc(db, 'seoSections', id));
      fetchSections();
    }
  };

  const handleEdit = (item) => {
    setEditData(item);
    setFormData({
      title: item.title || '',
      order: item.order || 0,
    });
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">
        УПРАВЛЕНИЕ SEO СЕКЦИЯМИ
      </h1>
      <div className="flex justify-end mb-6">
        <button
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold shadow hover:bg-blue-700 transition-colors"
          onClick={() => {
            resetForm();
            setModalOpen(true);
          }}
        >
          + Добавить секцию
        </button>
      </div>

      {/* Модальное окно */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">
              {editData ? 'Редактировать секцию' : 'Добавить секцию'}
            </h2>
            <form onSubmit={handleAddOrUpdate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Заголовок секции *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full border p-2 rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Порядок отображения
                </label>
                <input
                  type="number"
                  value={formData.order}
                  onChange={(e) =>
                    setFormData({ ...formData, order: e.target.value })
                  }
                  className="w-full border p-2 rounded"
                  min="0"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => {
                    setModalOpen(false);
                    resetForm();
                  }}
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded"
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                  {editData ? 'Сохранить' : 'Добавить'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className={modalOpen ? 'blur-sm transition-filter duration-300' : ''}>
        <h2 className="text-lg font-semibold mb-2">Список секций</h2>
        <table className="w-full border bg-white">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2 border">Порядок</th>
              <th className="p-2 border">Заголовок</th>
              <th className="p-2 border">Действия</th>
            </tr>
          </thead>
          <tbody>
            {sections.map((item) => (
              <tr key={item.id} className="border-t align-top text-sm">
                <td className="p-2 border">{item.order || 0}</td>
                <td className="p-2 border">{item.title}</td>
                <td className="p-2 border space-x-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="bg-cs-blue text-white px-2 py-1 rounded"
                  >
                    <HiPencilAlt />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
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
    </div>
  );
}

