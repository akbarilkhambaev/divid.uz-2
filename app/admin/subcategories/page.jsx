'use client';
import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import {
  collection,
  getDocs,
  doc,
  getDoc,
  updateDoc,
} from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { HiPencilAlt } from 'react-icons/hi';
import { HiOutlineTrash } from 'react-icons/hi2';

export default function SubcategoriesAdmin() {
  const [categories, setCategories] = useState([]);
  const [allSubcategories, setAllSubcategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // "add" or "edit"
  const [modalData, setModalData] = useState({
    id: '',
    name: '',
    categoryId: '',
  });

  // Fetch categories and all subcategories on mount
  useEffect(() => {
    async function fetchAll() {
      setLoading(true);
      const snap = await getDocs(collection(db, 'servicesTree'));
      const cats = snap.docs.map((doc) => ({ docId: doc.id, ...doc.data() }));
      setCategories(cats);
      // Собираем все подкатегории с категорией
      const allSubs = [];
      cats.forEach((cat) => {
        (cat.subcategories || []).forEach((sub) => {
          allSubs.push({
            ...sub,
            categoryId: cat.docId,
            categoryName: cat.name,
          });
        });
      });
      setAllSubcategories(allSubs);
      setLoading(false);
    }
    fetchAll();
  }, []);

  // Открыть модальное окно для добавления/редактирования
  function openModal(mode, subcat = { id: '', name: '', categoryId: '' }) {
    setModalMode(mode);
    setModalData(subcat);
    setModalOpen(true);
  }

  // Добавить или изменить подкатегорию
  async function handleModalSave() {
    if (!modalData.name.trim() || !modalData.categoryId)
      return alert('Заполните все поля');
    const ref = doc(db, 'servicesTree', modalData.categoryId);
    const snap = await getDoc(ref);
    if (!snap.exists()) return alert('Категория не найдена');
    const data = snap.data();
    let updatedSubs = data.subcategories || [];
    if (modalMode === 'add') {
      const newSub = { id: uuidv4(), name: modalData.name, services: [] };
      updatedSubs = [...updatedSubs, newSub];
    } else {
      // Если категория изменилась, нужно удалить из старой и добавить в новую
      const oldCatId = allSubcategories.find(
        (s) => s.id === modalData.id
      )?.categoryId;
      if (oldCatId && oldCatId !== modalData.categoryId) {
        // Удалить из старой категории
        const oldRef = doc(db, 'servicesTree', oldCatId);
        const oldSnap = await getDoc(oldRef);
        if (oldSnap.exists()) {
          const oldData = oldSnap.data();
          const filtered = (oldData.subcategories || []).filter(
            (s) => s.id !== modalData.id
          );
          await updateDoc(oldRef, { ...oldData, subcategories: filtered });
        }
        // Добавить в новую
        updatedSubs = [
          ...updatedSubs,
          { id: modalData.id, name: modalData.name, services: [] },
        ];
      } else {
        updatedSubs = updatedSubs.map((s) =>
          s.id === modalData.id ? { ...s, name: modalData.name } : s
        );
      }
    }
    await updateDoc(ref, { ...data, subcategories: updatedSubs });
    // Обновить все подкатегории
    const snapAll = await getDocs(collection(db, 'servicesTree'));
    const cats = snapAll.docs.map((doc) => ({ docId: doc.id, ...doc.data() }));
    const allSubs = [];
    cats.forEach((cat) => {
      (cat.subcategories || []).forEach((sub) => {
        allSubs.push({
          ...sub,
          categoryId: cat.docId,
          categoryName: cat.name,
        });
      });
    });
    setAllSubcategories(allSubs);
    setModalOpen(false);
    setModalData({ id: '', name: '', categoryId: '' });
  }

  // Удалить подкатегорию
  async function handleDelete(sub) {
    if (!window.confirm('Удалить подкатегорию?')) return;
    const ref = doc(db, 'servicesTree', sub.categoryId);
    const snap = await getDoc(ref);
    if (!snap.exists()) return;
    const data = snap.data();
    const updatedSubs = (data.subcategories || []).filter(
      (s) => s.id !== sub.id
    );
    await updateDoc(ref, { ...data, subcategories: updatedSubs });
    setAllSubcategories(allSubcategories.filter((s) => s.id !== sub.id));
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        Все подкатегории всех категорий
      </h1>
      <div className="mb-4 flex gap-4 items-center">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={() => openModal('add')}
        >
          + Добавить подкатегорию
        </button>
      </div>

      {loading ? (
        <div>Загрузка...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border text-left">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border">№</th>
                <th className="p-2 border">Категория</th>
                <th className="p-2 border">Подкатегория</th>
                <th className="p-2 border">Действия</th>
              </tr>
            </thead>
            <tbody>
              {allSubcategories.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="p-2 border text-center text-gray-400"
                  >
                    Нет подкатегорий
                  </td>
                </tr>
              ) : (
                allSubcategories.map((sub, idx) => (
                  <tr
                    key={sub.id}
                    className="hover:bg-gray-50"
                  >
                    <td className="p-2 border">{idx + 1}</td>
                    <td className="p-2 border">{sub.categoryName}</td>
                    <td className="p-2 border">{sub.name}</td>
                    <td className="p-2 border space-x-2">
                      <button
                        className="bg-cs-blue text-white px-2 py-1 rounded"
                        onClick={() => openModal('edit', sub)}
                      >
                        <HiPencilAlt />
                      </button>
                      <button
                        className="bg-red-600 text-white px-2 py-1 rounded"
                        onClick={() => handleDelete(sub)}
                      >
                        <HiOutlineTrash />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Модальное окно */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 min-w-[320px]">
            <h3 className="text-lg font-bold mb-4">
              {modalMode === 'add'
                ? 'Добавить подкатегорию'
                : 'Редактировать подкатегорию'}
            </h3>
            <select
              value={modalData.categoryId}
              onChange={(e) =>
                setModalData({ ...modalData, categoryId: e.target.value })
              }
              className="w-full border p-2 rounded mb-4"
            >
              <option value="">Выберите категорию</option>
              {categories.map((cat) => (
                <option
                  key={cat.docId}
                  value={cat.docId}
                >
                  {cat.name}
                </option>
              ))}
            </select>
            <input
              type="text"
              value={modalData.name}
              onChange={(e) =>
                setModalData({ ...modalData, name: e.target.value })
              }
              className="w-full border p-2 rounded mb-4"
              placeholder="Название подкатегории"
              autoFocus
            />
            <div className="flex justify-end space-x-2">
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded"
                onClick={handleModalSave}
              >
                {modalMode === 'add' ? 'Добавить' : 'Сохранить'}
              </button>
              <button
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded"
                onClick={() => setModalOpen(false)}
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
