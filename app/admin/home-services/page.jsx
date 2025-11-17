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

export default function HomeServicesManagementPage() {
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    text: '',
    order: 0,
    imageFile: null,
    imagePreview: '',
  });
  const [editData, setEditData] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchServices = async () => {
    const q = query(collection(db, 'homeServices'), orderBy('order', 'asc'));
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map((d) => {
      const item = d.data();
      return {
        id: d.id,
        ...item,
      };
    });
    setServices(data);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const resetForm = () => {
    setFormData({
      title: '',
      text: '',
      order: 0,
      imageFile: null,
      imagePreview: '',
    });
    setEditData(null);
  };

  const handleAddOrUpdate = async (e) => {
    e.preventDefault();
    const { title, text, order, imageFile, imagePreview } = formData;
    if (!title || !text) {
      alert('Заполните все обязательные поля');
      return;
    }

    const saveToFirestore = async (imageBase64) => {
      if (editData) {
        const docRef = doc(db, 'homeServices', editData.id);
        const updateData = {
          title,
          text,
          order: Number(order) || 0,
        };
        if (typeof imageBase64 === 'string') {
          updateData.imageBase64 = imageBase64;
        }
        await updateDoc(docRef, updateData);
        alert('Услуга обновлена');
      } else {
        await addDoc(collection(db, 'homeServices'), {
          title,
          text,
          order: Number(order) || 0,
          imageBase64: imageBase64 || '',
        });
        alert('Услуга добавлена');
      }
      resetForm();
      fetchServices();
      setModalOpen(false);
    };

    if (imageFile) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        await saveToFirestore(reader.result);
      };
      reader.readAsDataURL(imageFile);
    } else if (imagePreview) {
      await saveToFirestore(imagePreview);
    } else {
      await saveToFirestore('');
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Удалить эту услугу?')) {
      await deleteDoc(doc(db, 'homeServices', id));
      fetchServices();
    }
  };

  const handleEdit = (item) => {
    setEditData(item);
    setFormData({
      title: item.title || '',
      text: item.text || '',
      order: item.order || 0,
      imageFile: null,
      imagePreview: item.imageBase64 || item.image || '',
    });
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">
        УПРАВЛЕНИЕ УСЛУГАМИ (ГЛАВНАЯ СТРАНИЦА)
      </h1>
      <div className="flex justify-end mb-6">
        <button
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold shadow hover:bg-blue-700 transition-colors"
          onClick={() => {
            resetForm();
            setModalOpen(true);
          }}
        >
          + Добавить услугу
        </button>
      </div>

      {/* Модальное окно */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">
              {editData ? 'Редактировать услугу' : 'Добавить услугу'}
            </h2>
            <form
              onSubmit={handleAddOrUpdate}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium mb-2">
                  Заголовок *
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
                  Описание *
                </label>
                <textarea
                  value={formData.text}
                  onChange={(e) =>
                    setFormData({ ...formData, text: e.target.value })
                  }
                  className="w-full border p-2 rounded"
                  rows="4"
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
              <div>
                <label className="block text-sm font-medium mb-2">
                  Обложка услуги (JPEG/PNG)
                </label>
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp,image/avif"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      imageFile: e.target.files?.[0] || null,
                      imagePreview: e.target.files?.[0]
                        ? URL.createObjectURL(e.target.files[0])
                        : formData.imagePreview,
                    })
                  }
                  className="w-full border p-2 rounded"
                />
                {formData.imagePreview && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-600 mb-2">Превью:</p>
                    <img
                      src={formData.imagePreview}
                      alt="Превью услуги"
                      className="w-full max-h-48 object-cover rounded"
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
        <h2 className="text-lg font-semibold mb-2">Список услуг</h2>
        <table className="w-full border bg-white">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2 border">Порядок</th>
              <th className="p-2 border">Заголовок</th>
              <th className="p-2 border">Описание</th>
              <th className="p-2 border">Обложка</th>
              <th className="p-2 border">Действия</th>
            </tr>
          </thead>
          <tbody>
            {services.map((item) => (
              <tr
                key={item.id}
                className="border-t align-top text-sm"
              >
                <td className="p-2 border">{item.order || 0}</td>
                <td className="p-2 border max-w-[200px]">{item.title}</td>
                <td className="p-2 border max-w-[300px]">
                  {item.text?.substring(0, 100)}...
                </td>
                <td className="p-2 border">
                  {item.imageBase64 || item.image ? (
                    <img
                      src={item.imageBase64 || item.image}
                      alt={item.title}
                      className="w-20 h-16 object-cover rounded"
                    />
                  ) : (
                    <span className="text-gray-400">Нет изображения</span>
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
