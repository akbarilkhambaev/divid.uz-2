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

export default function FAQManagementPage() {
  const [faqs, setFaqs] = useState([]);
  const [formData, setFormData] = useState({
    question: '',
    answer: '',
    order: 0,
  });
  const [editData, setEditData] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchFAQs = async () => {
    const q = query(collection(db, 'faq'), orderBy('order', 'asc'));
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map((d) => {
      const item = d.data();
      return {
        id: d.id,
        ...item,
      };
    });
    setFaqs(data);
  };

  useEffect(() => {
    fetchFAQs();
  }, []);

  const resetForm = () => {
    setFormData({ question: '', answer: '', order: 0 });
    setEditData(null);
  };

  const handleAddOrUpdate = async (e) => {
    e.preventDefault();
    const { question, answer, order } = formData;
    if (!question || !answer)
      return alert('Заполните все обязательные поля');

    if (editData) {
      const docRef = doc(db, 'faq', editData.id);
      await updateDoc(docRef, {
        question,
        answer,
        order: Number(order) || 0,
      });
      alert('Вопрос обновлен');
    } else {
      await addDoc(collection(db, 'faq'), {
        question,
        answer,
        order: Number(order) || 0,
      });
      alert('Вопрос добавлен');
    }
    resetForm();
    fetchFAQs();
    setModalOpen(false);
  };

  const handleDelete = async (id) => {
    if (confirm('Удалить этот вопрос?')) {
      await deleteDoc(doc(db, 'faq', id));
      fetchFAQs();
    }
  };

  const handleEdit = (item) => {
    setEditData(item);
    setFormData({
      question: item.question || '',
      answer: item.answer || '',
      order: item.order || 0,
    });
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">
        УПРАВЛЕНИЕ FAQ
      </h1>
      <div className="flex justify-end mb-6">
        <button
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold shadow hover:bg-blue-700 transition-colors"
          onClick={() => {
            resetForm();
            setModalOpen(true);
          }}
        >
          + Добавить вопрос
        </button>
      </div>

      {/* Модальное окно */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">
              {editData ? 'Редактировать вопрос' : 'Добавить вопрос'}
            </h2>
            <form onSubmit={handleAddOrUpdate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Вопрос *
                </label>
                <input
                  type="text"
                  value={formData.question}
                  onChange={(e) =>
                    setFormData({ ...formData, question: e.target.value })
                  }
                  className="w-full border p-2 rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Ответ *
                </label>
                <textarea
                  value={formData.answer}
                  onChange={(e) =>
                    setFormData({ ...formData, answer: e.target.value })
                  }
                  className="w-full border p-2 rounded"
                  rows="6"
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
        <h2 className="text-lg font-semibold mb-2">Список вопросов</h2>
        <table className="w-full border bg-white">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2 border">Порядок</th>
              <th className="p-2 border">Вопрос</th>
              <th className="p-2 border">Ответ</th>
              <th className="p-2 border">Действия</th>
            </tr>
          </thead>
          <tbody>
            {faqs.map((item) => (
              <tr key={item.id} className="border-t align-top text-sm">
                <td className="p-2 border">{item.order || 0}</td>
                <td className="p-2 border max-w-[300px]">{item.question}</td>
                <td className="p-2 border max-w-[400px]">
                  {item.answer?.substring(0, 150)}...
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

