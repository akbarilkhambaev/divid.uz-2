'use client';

import { useEffect, useState } from 'react';
import { HiPencilAlt } from 'react-icons/hi';
import { HiOutlineTrash } from 'react-icons/hi2';
import RichEditor from '@/components/admin/RichEditor';
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

export default function SliderManagementPage() {
  const [slides, setSlides] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    text: '',
    image: null,
    order: 0,
  });
  const [editData, setEditData] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchSlides = async () => {
    const q = query(collection(db, 'homeSlider'), orderBy('order', 'asc'));
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map((d) => {
      const item = d.data();
      return {
        id: d.id,
        ...item,
      };
    });
    setSlides(data);
  };

  useEffect(() => {
    fetchSlides();
  }, []);

  const resetForm = () => {
    setFormData({ title: '', text: '', image: null, order: 0 });
    setEditData(null);
  };

  const handleAddOrUpdate = async (e) => {
    e.preventDefault();
    const { title, text, image, order } = formData;
    if (!title || !text) return alert('Заполните все обязательные поля');

    const saveToFirestore = async (imageBase64, imageName) => {
      if (editData) {
        const docRef = doc(db, 'homeSlider', editData.id);
        const updateData = { title, text, order: Number(order) || 0 };
        if (imageBase64) {
          updateData.imageBase64 = imageBase64;
          updateData.imageName = imageName;
        }
        await updateDoc(docRef, updateData);
        alert('Слайд обновлен');
      } else {
        await addDoc(collection(db, 'homeSlider'), {
          title,
          text,
          imageBase64: imageBase64 || '',
          imageName: imageName || '',
          order: Number(order) || 0,
        });
        alert('Слайд добавлен');
      }
      resetForm();
      fetchSlides();
      setModalOpen(false);
    };

    if (image) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        await saveToFirestore(reader.result, image.name);
      };
      reader.readAsDataURL(image);
    } else if (editData && editData.imageBase64) {
      // Сохраняем существующее изображение
      await saveToFirestore(editData.imageBase64, editData.imageName || '');
    } else {
      await saveToFirestore('', '');
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Удалить этот слайд?')) {
      await deleteDoc(doc(db, 'homeSlider', id));
      fetchSlides();
    }
  };

  const handleEdit = (item) => {
    setEditData(item);
    setFormData({
      title: item.title || '',
      text: item.text || '',
      image: null,
      order: item.order || 0,
    });
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">
        УПРАВЛЕНИЕ СЛАЙДЕРОМ
      </h1>
      <div className="flex justify-end mb-6">
        <button
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold shadow hover:bg-blue-700 transition-colors"
          onClick={() => {
            resetForm();
            setModalOpen(true);
          }}
        >
          + Добавить слайд
        </button>
      </div>

      {/* Модальное окно */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">
              {editData ? 'Редактировать слайд' : 'Добавить слайд'}
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
                  Текст *
                </label>
                <RichEditor
                  data={formData.text}
                  onChange={(_event, editor) =>
                    setFormData({ ...formData, text: editor.getData() })
                  }
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
                  Изображение
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
                      Текущее изображение:
                    </p>
                    <img
                      src={editData.imageBase64}
                      alt="Preview"
                      className="max-w-xs max-h-32 object-cover rounded"
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
        <h2 className="text-lg font-semibold mb-2">Список слайдов</h2>
        <table className="w-full border bg-white">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2 border">Порядок</th>
              <th className="p-2 border">Заголовок</th>
              <th className="p-2 border">Текст</th>
              <th className="p-2 border">Изображение</th>
              <th className="p-2 border">Действия</th>
            </tr>
          </thead>
          <tbody>
            {slides.map((item) => (
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
                  {item.imageBase64 ? (
                    <img
                      src={item.imageBase64}
                      alt="Preview"
                      className="w-20 h-12 object-cover rounded"
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
