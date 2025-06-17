// /admin/subcategories/page.js
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

export default function AddSubcategoryPage() {
  const [formData, setFormData] = useState({
    categoryId: '',
    name: '',
  });
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const snapshot = await getDocs(collection(db, 'servicesTree'));
      const data = snapshot.docs.map((doc) => ({
        docId: doc.id,
        ...doc.data(),
      }));
      console.log(
        'Firebase categories:',
        data.map((c) => ({ id: c.id, name: c.name }))
      );
      setCategories(data);
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { categoryId, name } = formData;
    if (!categoryId || !name) return alert('Заполни все поля');

    console.log('Trying to use categoryId:', categoryId);
    const categoryRef = doc(db, 'servicesTree', categoryId);
    const categorySnap = await getDoc(categoryRef);

    if (!categorySnap.exists()) {
      console.error('Категория не найдена. ID:', categoryId);
      return alert('Категория не найдена');
    }

    const data = categorySnap.data();
    const subcategories = data.subcategories || [];
    const newId =
      subcategories.length > 0
        ? Math.max(...subcategories.map((s) => s.id)) + 1
        : 1;

    const updated = {
      ...data,
      subcategories: [
        ...subcategories,
        {
          id: newId,
          name,
          services: [],
        },
      ],
    };

    await updateDoc(categoryRef, updated);
    alert('Подкатегория добавлена!');
    setFormData({ categoryId: '', name: '' });
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Добавить подкатегорию</h1>
      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <select
          value={formData.categoryId}
          onChange={(e) =>
            setFormData({ ...formData, categoryId: e.target.value })
          }
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
        <input
          name="name"
          placeholder="Название подкатегории"
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
    </div>
  );
}
