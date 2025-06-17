// /admin/news/page.js
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
  serverTimestamp,
} from 'firebase/firestore';

export default function NewsTablePage() {
  const [newsList, setNewsList] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: null,
  });
  const [editId, setEditId] = useState(null);

  const fetchNews = async () => {
    const snapshot = await getDocs(collection(db, 'news'));
    const data = snapshot.docs.map((d) => {
      const item = d.data();
      return {
        id: d.id,
        ...item,
        createdAt: item.createdAt?.toDate(),
      };
    });
    data.sort((a, b) => b.createdAt - a.createdAt);
    setNewsList(data);
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const resetForm = () => {
    setFormData({ title: '', description: '', image: null });
    setEditId(null);
  };

  const handleAddOrUpdate = async (e) => {
    e.preventDefault();
    const { title, description, image } = formData;
    if (!title || !description) return alert('Заполните все поля');

    // Helper to save data
    const saveToFirestore = async (imageBase64, imageName) => {
      if (editId) {
        const docRef = doc(db, 'news', editId);
        const updateData = { title, description };
        if (imageBase64) {
          updateData.imageBase64 = imageBase64;
          updateData.imageName = imageName;
        }
        await updateDoc(docRef, updateData);
        alert('Новость обновлена');
      } else {
        await addDoc(collection(db, 'news'), {
          title,
          description,
          imageBase64: imageBase64 || '',
          imageName: imageName || '',
          createdAt: serverTimestamp(),
        });
        alert('Новость добавлена');
      }
      resetForm();
      fetchNews();
    };

    if (image) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        await saveToFirestore(reader.result, image.name);
      };
      reader.readAsDataURL(image);
    } else {
      await saveToFirestore('', '');
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Удалить эту новость?')) {
      await deleteDoc(doc(db, 'news', id));
      fetchNews();
    }
  };

  const handleEdit = (item) => {
    setFormData({
      title: item.title,
      description: item.description,
      image: null,
    });
    setEditId(item.id);
  };

  return (
    <div className="relative p-4">
      {/* Main content: blur when editing */}
      <div className={editId ? 'blur-sm transition-filter duration-300' : ''}>
        <h1 className="text-xl font-bold mb-4">
          {editId ? 'Редактировать новость' : 'Добавить новость'}
        </h1>
        <form
          onSubmit={handleAddOrUpdate}
          className="space-y-4 max-w-lg mb-10"
        >
          <input
            type="text"
            placeholder="Заголовок"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className="w-full border p-2 rounded"
          />
          <textarea
            placeholder="Описание"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="w-full border p-2 rounded"
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setFormData({ ...formData, image: e.target.files[0] })
            }
            className="w-full"
          />
          <div className="flex space-x-2">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              {editId ? 'Сохранить' : 'Добавить'}
            </button>
            {editId && (
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-400 text-white px-4 py-2 rounded"
              >
                Отменить
              </button>
            )}
          </div>
        </form>

        <h2 className="text-lg font-semibold mb-2">Список новостей</h2>
        <table className="w-full border bg-white">
          <thead>
            <tr className="bg-gray-100 text-left ">
              <th className="p-2 border">Заголовок</th>
              <th className="p-2 border">Описание</th>
              <th className="p-2 border">Имя файла</th>
              <th className="p-2 border">Дата создания</th>
              <th className="p-2 border">Действия</th>
            </tr>
          </thead>
          <tbody>
            {newsList.map((item) => (
              <tr
                key={item.id}
                className="border-t align-top text-sm lowercase"
              >
                <td className="p-2 border">{item.title}</td>
                <td className="p-2 border max-w-[400px]">{item.description}</td>
                <td className="p-2 border">
                  {item.imageName ? (
                    item.imageName
                  ) : (
                    <span className="text-gray-400">Нет файла</span>
                  )}
                </td>
                <td className="p-2 border">
                  {item.createdAt ? item.createdAt.toLocaleString() : '—'}
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

      {/* Edit drawer */}
      <div
        className={`fixed inset-0 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          editId ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={resetForm}
      />
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-xl p-6 z-50 overflow-auto transform transition-transform duration-300 ease-in-out ${
          editId ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {editId && (
          <>
            <h2 className="text-xl font-bold mb-4">Редактировать новость</h2>
            <form
              onSubmit={handleAddOrUpdate}
              className="space-y-4"
            >
              <input
                type="text"
                placeholder="Заголовок"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full border p-2 rounded"
              />
              <textarea
                placeholder="Описание"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full border p-2 rounded"
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setFormData({ ...formData, image: e.target.files[0] })
                }
                className="w-full"
              />
              <div className="flex space-x-2">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Сохранить
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-gray-400 text-white px-4 py-2 rounded"
                >
                  Отменить
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
