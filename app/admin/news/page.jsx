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
import AddNewsModal from '@/components/admin/AddNewsModal';

export default function NewsTablePage() {
  const [newsList, setNewsList] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: null,
  });
  const [editData, setEditData] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

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
    setEditData(null);
  };

  const handleAddOrUpdate = async (e) => {
    e.preventDefault();
    const { title, description, image } = formData;
    if (!title || !description) return alert('Заполните все поля');

    // Helper to save data
    const saveToFirestore = async (imageBase64, imageName) => {
      if (editData) {
        const docRef = doc(db, 'news', editData.id);
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
    setEditData(item);
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">ЯНГИЛИКЛАР</h1>
      <div className="flex justify-end mb-6">
        <button
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold shadow hover:bg-blue-700 transition-colors"
          onClick={() => setModalOpen(true)}
        >
          + Добавить новость
        </button>
      </div>
      <AddNewsModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditData(null);
        }}
        onAdded={fetchNews}
        editData={editData}
      />
      <div className={editData ? 'blur-sm transition-filter duration-300' : ''}>
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
    </div>
  );
}
