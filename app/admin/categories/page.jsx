'use client';

import { useState, useEffect } from 'react';
import { HiPencilAlt } from 'react-icons/hi';
import { HiOutlineTrash } from 'react-icons/hi2';
import { db } from '@/lib/firebase';
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from 'firebase/firestore';

export default function AddCategoryPage() {
  const [formData, setFormData] = useState({ name: '' });
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editModal, setEditModal] = useState(false);
  const [editService, setEditService] = useState(null);
  const [editName, setEditName] = useState('');

  // Загрузка всех услуг
  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      const snapshot = await getDocs(collection(db, 'servicesTree'));
      const data = snapshot.docs.map((doc) => ({
        ...doc.data(),
        docId: doc.id,
      }));
      setServices(data);
      setLoading(false);
    };
    fetchServices();
  }, []);

  // Добавление категории
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name } = formData;
    if (!name) return alert('Заполни все поля');

    const snapshot = await getDocs(collection(db, 'servicesTree'));
    const newId = snapshot.size + 1;

    await addDoc(collection(db, 'servicesTree'), {
      id: newId,
      name,
      subcategories: [],
    });
    alert('Категория добавлена!');
    setFormData({ name: '' });
    // Обновить список услуг
    const updatedSnapshot = await getDocs(collection(db, 'servicesTree'));
    const updatedData = updatedSnapshot.docs.map((doc) => ({
      ...doc.data(),
      docId: doc.id,
    }));
    setServices(updatedData);
  };

  // Удаление услуги
  const handleDelete = async (docId) => {
    if (!window.confirm('Удалить услугу?')) return;
    await deleteDoc(doc(db, 'servicesTree', docId));
    setServices((prev) => prev.filter((s) => s.docId !== docId));
  };

  // Открыть окно редактирования
  const openEditModal = (service) => {
    setEditService(service);
    setEditName(service.name);
    setEditModal(true);
  };

  // Сохранить изменения
  const handleEditSave = async () => {
    if (!editName) return alert('Название не может быть пустым');
    await updateDoc(doc(db, 'servicesTree', editService.docId), {
      name: editName,
    });
    setServices((prev) =>
      prev.map((s) =>
        s.docId === editService.docId ? { ...s, name: editName } : s
      )
    );
    setEditModal(false);
    setEditService(null);
    setEditName('');
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Добавить категорию</h1>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 mb-8"
      >
        <input
          name="name"
          placeholder="Название"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Добавить
        </button>
      </form>

      <h2 className="text-lg font-bold mb-4">Все услуги</h2>
      {loading ? (
        <div>Загрузка...</div>
      ) : (
        <table className="w-full border text-left">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Название</th>
              <th className="p-2 border">Действия</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr
                key={service.docId}
                className="hover:bg-gray-50"
              >
                <td className="p-2 border">{service.id}</td>
                <td className="p-2 border">{service.name}</td>
                <td className="p-2 border space-x-2">
                  <button
                    className="bg-cs-blue text-white px-2 py-1 rounded"
                    onClick={() => openEditModal(service)}
                  >
                    <HiPencilAlt />
                  </button>
                  <button
                    className="bg-red-600 text-white px-2 py-1 rounded"
                    onClick={() => handleDelete(service.docId)}
                  >
                    <HiOutlineTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Модальное окно для редактирования */}
      {editModal && (
        <div className="fixed inset-0 backdrop-blur-sm bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 min-w-[320px]">
            <h3 className="text-lg font-bold mb-4">Редактировать услугу</h3>
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              className="w-full border p-2 rounded mb-4"
              placeholder="Название"
            />
            <div className="flex justify-end space-x-2">
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded"
                onClick={handleEditSave}
              >
                Сохранить
              </button>
              <button
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded"
                onClick={() => setEditModal(false)}
              >
                Отмена
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
