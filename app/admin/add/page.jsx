// /admin/add/page.js
'use client';

import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import {
  collection,
  getDocs,
  doc,
  getDoc,
  updateDoc,
} from 'firebase/firestore';

export default function AddServicePage() {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [formData, setFormData] = useState({
    categoryId: '',
    subcategoryId: '',
    name: '',
    description: '',
  });

  useEffect(() => {
    const fetchCategories = async () => {
      const snapshot = await getDocs(collection(db, 'servicesTree'));
      const data = snapshot.docs.map((doc) => ({
        docId: doc.id,
        ...doc.data(),
      }));
      setCategories(data);
    };
    fetchCategories();
  }, []);

  const handleCategoryChange = (e) => {
    const selectedId = e.target.value;
    const selected = categories.find((cat) => cat.docId === selectedId);
    const subs = selected?.subcategories || [];
    setFormData({ ...formData, categoryId: selectedId, subcategoryId: '' });
    setSubcategories(subs);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { categoryId, subcategoryId, name, description } = formData;
    if (!categoryId || !subcategoryId || !name || !description)
      return alert('Заполни все поля');

    const categoryRef = doc(db, 'servicesTree', categoryId);
    const categorySnap = await getDoc(categoryRef);
    if (!categorySnap.exists()) return alert('Категория не найдена');

    const data = categorySnap.data();
    const updated = {
      ...data,
      subcategories: (data.subcategories || []).map((sub) => {
        if (String(sub.id) === subcategoryId) {
          const services = Array.isArray(sub.services) ? sub.services : [];
          const newId =
            services.length > 0
              ? Math.max(...services.map((s) => s.id)) + 1
              : 1;
          return {
            ...sub,
            services: [...services, { id: newId, name, description }],
          };
        }
        return sub;
      }),
    };

    await updateDoc(categoryRef, updated);
    alert('Услуга добавлена!');
    setFormData({
      categoryId: '',
      subcategoryId: '',
      name: '',
      description: '',
    });
    setSubcategories([]);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Добавить услугу</h1>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 "
      >
        <select
          value={formData.categoryId}
          onChange={handleCategoryChange}
          className="w-full border p-2 rounded"
        >
          <option value="">Выбери категорию</option>
          {categories.map((cat) => (
            <option
              key={cat.docId}
              value={cat.docId}
            >
              {cat.name}
            </option>
          ))}
        </select>

        <select
          value={formData.subcategoryId}
          onChange={(e) =>
            setFormData({ ...formData, subcategoryId: e.target.value })
          }
          className="w-full border p-2 rounded"
        >
          <option value="">Выбери подкатегорию</option>
          {subcategories.map((sub) => (
            <option
              key={sub.id}
              value={String(sub.id)}
            >
              {sub.name}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Название услуги"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full border p-2 rounded"
        />
        <textarea
          placeholder="Описание услуги"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          className="w-full border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Добавить
        </button>
      </form>
    </div>
  );
}
