'use client';

import { useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';

export default function AddCategoryPage() {
  const [formData, setFormData] = useState({ name: '' });

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
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Добавить категорию</h1>
      <form
        onSubmit={handleSubmit}
        className="space-y-4"
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
    </div>
  );
}
