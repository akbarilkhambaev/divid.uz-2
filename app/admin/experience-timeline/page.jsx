'use client';

import { useEffect, useState } from 'react';
import { HiPencilAlt } from 'react-icons/hi';
import { HiOutlineTrash } from 'react-icons/hi2';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

const initialFormState = {
  title: '',
  description: '',
  href: '',
  order: 0,
  imageFile: null,
  imagePreview: '',
};

export default function ExperienceTimelineAdminPage() {
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState(initialFormState);
  const [editData, setEditData] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchItems = async () => {
    const q = query(
      collection(db, 'experienceTimeline'),
      orderBy('order', 'asc')
    );
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map((document) => {
      const payload = document.data();
      return {
        id: document.id,
        ...payload,
      };
    });
    setItems(data);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const resetForm = () => {
    setFormData(initialFormState);
    setEditData(null);
  };

  const handleAddOrUpdate = async (event) => {
    event.preventDefault();
    const { title, description, href, order, imageFile, imagePreview } =
      formData;

    if (!title || !description) {
      alert('Заполните обязательные поля');
      return;
    }

    const saveToFirestore = async (imageBase64) => {
      const payload = {
        title,
        description,
        href,
        order: Number(order) || 0,
      };

      if (typeof imageBase64 === 'string') {
        payload.imageBase64 = imageBase64;
      }

      if (editData) {
        const docRef = doc(db, 'experienceTimeline', editData.id);
        await updateDoc(docRef, payload);
        alert('Карточка обновлена');
      } else {
        await addDoc(collection(db, 'experienceTimeline'), payload);
        alert('Карточка добавлена');
      }

      resetForm();
      setModalOpen(false);
      fetchItems();
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
      await saveToFirestore(editData?.imageBase64 || '');
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Удалить эту карточку?')) {
      await deleteDoc(doc(db, 'experienceTimeline', id));
      fetchItems();
    }
  };

  const handleEdit = (item) => {
    setEditData(item);
    setFormData({
      title: item.title || '',
      description: item.description || '',
      href: item.href || '',
      order: item.order || 0,
      imageFile: null,
      imagePreview: item.imageBase64 || item.image || '',
    });
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <h1 className="mb-8 text-center text-3xl font-bold">
        УПРАВЛЕНИЕ СФЕРЫ ОПЫТА
      </h1>

      <div className="mb-6 flex justify-end">
        <button
          className="rounded-lg bg-blue-600 px-6 py-3 font-bold text-white shadow transition-colors hover:bg-blue-700"
          onClick={() => {
            resetForm();
            setModalOpen(true);
          }}
        >
          + Добавить карточку
        </button>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="mx-4 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-lg bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-2xl font-bold">
              {editData ? 'Редактировать карточку' : 'Добавить карточку'}
            </h2>
            <form
              onSubmit={handleAddOrUpdate}
              className="space-y-4"
            >
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Заголовок *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(event) =>
                    setFormData({ ...formData, title: event.target.value })
                  }
                  className="w-full rounded border p-2"
                  required
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Описание *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      description: event.target.value,
                    })
                  }
                  className="w-full rounded border p-2"
                  rows={4}
                  required
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Ссылка (необязательно)
                </label>
                <input
                  type="text"
                  value={formData.href}
                  onChange={(event) =>
                    setFormData({ ...formData, href: event.target.value })
                  }
                  className="w-full rounded border p-2"
                  placeholder="Например: /services"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Порядок отображения
                </label>
                <input
                  type="number"
                  value={formData.order}
                  onChange={(event) =>
                    setFormData({ ...formData, order: event.target.value })
                  }
                  className="w-full rounded border p-2"
                  min={0}
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Обложка (JPEG/PNG/WebP/AVIF)
                </label>
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp,image/avif"
                  onChange={(event) => {
                    const file = event.target.files?.[0] || null;
                    setFormData({
                      ...formData,
                      imageFile: file,
                      imagePreview: file
                        ? URL.createObjectURL(file)
                        : formData.imagePreview,
                    });
                  }}
                  className="w-full rounded border p-2"
                />
                {formData.imagePreview && (
                  <div className="mt-4">
                    <p className="mb-2 text-sm text-gray-600">Превью:</p>
                    <img
                      src={formData.imagePreview}
                      alt="Превью карточки"
                      className="h-48 w-full rounded object-cover"
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
                  className="rounded bg-gray-300 px-4 py-2 text-gray-800"
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  className="rounded bg-blue-600 px-4 py-2 text-white"
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
        <h2 className="mb-2 text-lg font-semibold">Список карточек</h2>
        <table className="w-full border bg-white">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="border p-2">Порядок</th>
              <th className="border p-2">Заголовок</th>
              <th className="border p-2">Описание</th>
              <th className="border p-2">Ссылка</th>
              <th className="border p-2">Изображение</th>
              <th className="border p-2">Действия</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr
                key={item.id}
                className="border-t align-top text-sm"
              >
                <td className="border p-2">{item.order ?? 0}</td>
                <td className="border p-2">{item.title}</td>
                <td className="border p-2">
                  {item.description?.length > 120
                    ? `${item.description.slice(0, 117)}...`
                    : item.description}
                </td>
                <td className="border p-2 text-blue-600">
                  {item.href || <span className="text-gray-400">Нет</span>}
                </td>
                <td className="border p-2">
                  {item.imageBase64 || item.image ? (
                    <img
                      src={item.imageBase64 || item.image}
                      alt={item.title}
                      className="h-16 w-24 rounded object-cover"
                    />
                  ) : (
                    <span className="text-gray-400">Нет изображения</span>
                  )}
                </td>
                <td className="border p-2 space-x-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="rounded bg-cs-blue px-2 py-1 text-white"
                  >
                    <HiPencilAlt />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="rounded bg-red-600 px-2 py-1 text-white"
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
