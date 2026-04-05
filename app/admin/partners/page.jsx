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

export default function PartnersManagementPage() {
  const [partners, setPartners] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    image: null,
    order: 0,
    category: '',
  });
  const [editData, setEditData] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchPartners = async () => {
    const q = query(collection(db, 'partners'), orderBy('order', 'asc'));
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map((d) => {
      const item = d.data();
      return {
        id: d.id,
        ...item,
      };
    });
    setPartners(data);
  };

  useEffect(() => {
    fetchPartners();
  }, []);

  const resetForm = () => {
    setFormData({ name: '', image: null, order: 0, category: '' });
    setEditData(null);
  };

  const handleAddOrUpdate = async (e) => {
    e.preventDefault();
    const { name, image, order } = formData;
    if (!name) return alert('Заполните название партнера');

    const saveToFirestore = async (imageBase64, imageName) => {
      if (editData) {
        const docRef = doc(db, 'partners', editData.id);
        const updateData = {
          name,
          order: Number(order) || 0,
          category: formData.category || '',
        };
        if (imageBase64) {
          updateData.imageBase64 = imageBase64;
          updateData.imageName = imageName;
        }
        await updateDoc(docRef, updateData);
        alert('Партнер обновлен');
      } else {
        await addDoc(collection(db, 'partners'), {
          name,
          imageBase64: imageBase64 || '',
          imageName: imageName || '',
          order: Number(order) || 0,
          category: formData.category || '',
        });
        alert('Партнер добавлен');
      }
      resetForm();
      fetchPartners();
      setModalOpen(false);
    };

    if (image) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        await saveToFirestore(reader.result, image.name);
      };
      reader.readAsDataURL(image);
    } else if (editData && editData.imageBase64) {
      await saveToFirestore(editData.imageBase64, editData.imageName || '');
    } else {
      await saveToFirestore('', '');
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Удалить этого партнера?')) {
      await deleteDoc(doc(db, 'partners', id));
      fetchPartners();
    }
  };

  const handleEdit = (item) => {
    setEditData(item);
    setFormData({
      name: item.name || '',
      image: null,
      order: item.order || 0,
      category: item.category || '',
    });
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">
        УПРАВЛЕНИЕ ПАРТНЕРАМИ
      </h1>
      <div className="flex justify-end mb-6">
        <button
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold shadow hover:bg-blue-700 transition-colors"
          onClick={() => {
            resetForm();
            setModalOpen(true);
          }}
        >
          + Добавить партнера
        </button>
      </div>

      {/* Модальное окно */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">
              {editData ? 'Редактировать партнера' : 'Добавить партнера'}
            </h2>
            <form
              onSubmit={handleAddOrUpdate}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium mb-2">
                  Название партнера *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full border p-2 rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Категория (для группировки на главной)
                </label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  placeholder="Например: Mebel ishlab chiqarish"
                  className="w-full border p-2 rounded"
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
              <div>
                <label className="block text-sm font-medium mb-2">
                  Логотип партнера
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      image: e.target.files[0] || null,
                    })
                  }
                  className="w-full border p-2 rounded"
                />
                {editData?.imageBase64 && !formData.image && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-600 mb-2">
                      Текущий логотип:
                    </p>
                    <img
                      src={editData.imageBase64}
                      alt="Preview"
                      className="max-w-xs max-h-32 object-contain rounded"
                    />
                  </div>
                )}
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

      <div
        className={modalOpen ? 'blur-sm transition-filter duration-300' : ''}
      >
        <h2 className="text-lg font-semibold mb-2">Список партнеров</h2>
        <table className="w-full border bg-white">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2 border">Порядок</th>
              <th className="p-2 border">Название</th>
              <th className="p-2 border">Категория</th>
              <th className="p-2 border">Логотип</th>
              <th className="p-2 border">Действия</th>
            </tr>
          </thead>
          <tbody>
            {partners.map((item) => (
              <tr
                key={item.id}
                className="border-t align-top text-sm"
              >
                <td className="p-2 border">{item.order || 0}</td>
                <td className="p-2 border">{item.name}</td>
                <td className="p-2 border text-sm text-gray-600">
                  {item.category || '—'}
                </td>
                <td className="p-2 border">
                  {item.imageBase64 ? (
                    <img
                      src={item.imageBase64}
                      alt="Preview"
                      className="w-20 h-20 object-contain rounded"
                    />
                  ) : (
                    <span className="text-gray-400">Нет логотипа</span>
                  )}
                </td>
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
