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

export default function HomeServicesManagementPage() {
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    text: '',
    icon: null,
    iconName: '',
    order: 0,
  });

  // Популярные иконки для выбора
  const popularIcons = [
    { name: '💼', label: 'Портфель' },
    { name: '📊', label: 'График' },
    { name: '👥', label: 'Люди' },
    { name: '🏆', label: 'Награда' },
    { name: '💡', label: 'Идея' },
    { name: '🔧', label: 'Инструменты' },
    { name: '📈', label: 'Рост' },
    { name: '💻', label: 'Компьютер' },
    { name: '📱', label: 'Телефон' },
    { name: '🎯', label: 'Цель' },
    { name: '⚡', label: 'Энергия' },
    { name: '🔒', label: 'Безопасность' },
  ];
  const [editData, setEditData] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchServices = async () => {
    const q = query(collection(db, 'homeServices'), orderBy('order', 'asc'));
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map((d) => {
      const item = d.data();
      return {
        id: d.id,
        ...item,
      };
    });
    setServices(data);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const resetForm = () => {
    setFormData({ title: '', text: '', icon: null, iconName: '', order: 0 });
    setEditData(null);
  };

  const handleAddOrUpdate = async (e) => {
    e.preventDefault();
    const { title, text, icon, iconName, order } = formData;
    if (!title || !text) return alert('Заполните все обязательные поля');

    const saveToFirestore = async (iconBase64, iconFileName) => {
      if (editData) {
        const docRef = doc(db, 'homeServices', editData.id);
        const updateData = {
          title,
          text,
          order: Number(order) || 0,
        };
        if (iconBase64) {
          updateData.iconBase64 = iconBase64;
        }
        if (iconName) {
          updateData.iconName = iconName;
        }
        await updateDoc(docRef, updateData);
        alert('Услуга обновлена');
      } else {
        await addDoc(collection(db, 'homeServices'), {
          title,
          text,
          iconBase64: iconBase64 || '',
          iconName: iconName || '',
          order: Number(order) || 0,
        });
        alert('Услуга добавлена');
      }
      resetForm();
      fetchServices();
      setModalOpen(false);
    };

    if (icon) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        await saveToFirestore(reader.result, icon.name);
      };
      reader.readAsDataURL(icon);
    } else if (iconName) {
      await saveToFirestore('', iconName);
    } else if (editData && (editData.iconBase64 || editData.iconName)) {
      await saveToFirestore(
        editData.iconBase64 || '',
        editData.iconName || ''
      );
    } else {
      await saveToFirestore('', '');
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Удалить эту услугу?')) {
      await deleteDoc(doc(db, 'homeServices', id));
      fetchServices();
    }
  };

  const handleEdit = (item) => {
    setEditData(item);
    setFormData({
      title: item.title || '',
      text: item.text || '',
      icon: null,
      iconName: item.iconName || '',
      order: item.order || 0,
    });
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">
        УПРАВЛЕНИЕ УСЛУГАМИ (ГЛАВНАЯ СТРАНИЦА)
      </h1>
      <div className="flex justify-end mb-6">
        <button
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold shadow hover:bg-blue-700 transition-colors"
          onClick={() => {
            resetForm();
            setModalOpen(true);
          }}
        >
          + Добавить услугу
        </button>
      </div>

      {/* Модальное окно */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">
              {editData ? 'Редактировать услугу' : 'Добавить услугу'}
            </h2>
            <form onSubmit={handleAddOrUpdate} className="space-y-4">
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
                  Описание *
                </label>
                <textarea
                  value={formData.text}
                  onChange={(e) =>
                    setFormData({ ...formData, text: e.target.value })
                  }
                  className="w-full border p-2 rounded"
                  rows="4"
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
              <div>
                <label className="block text-sm font-medium mb-2">
                  Иконка (опционально)
                </label>
                
                {/* Выбор эмодзи иконки */}
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">
                    Выберите эмодзи иконку:
                  </p>
                  <div className="grid grid-cols-6 gap-2 p-3 border rounded bg-gray-50 max-h-40 overflow-y-auto">
                    {popularIcons.map((icon) => (
                      <button
                        key={icon.name}
                        type="button"
                        onClick={() =>
                          setFormData({
                            ...formData,
                            iconName: icon.name,
                            icon: null,
                          })
                        }
                        className={`p-2 text-2xl rounded hover:bg-blue-100 transition-colors ${
                          formData.iconName === icon.name
                            ? 'bg-blue-200 ring-2 ring-blue-500'
                            : ''
                        }`}
                        title={icon.label}
                      >
                        {icon.name}
                      </button>
                    ))}
                  </div>
                  {formData.iconName && (
                    <p className="text-sm text-gray-600 mt-2">
                      Выбрано: {formData.iconName}
                    </p>
                  )}
                </div>

                {/* Или загрузить свою иконку */}
                <div>
                  <p className="text-sm text-gray-600 mb-2">
                    Или загрузите свою иконку (SVG, PNG):
                  </p>
                  <input
                    type="file"
                    accept="image/svg+xml,image/png,image/jpeg"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        icon: e.target.files[0] || null,
                        iconName: '', // Сбрасываем эмодзи при загрузке файла
                      })
                    }
                    className="w-full border p-2 rounded"
                  />
                </div>

                {/* Превью текущей иконки */}
                {(editData?.iconBase64 || editData?.iconName) &&
                  !formData.icon &&
                  !formData.iconName && (
                    <div className="mt-4">
                      <p className="text-sm text-gray-600 mb-2">
                        Текущая иконка:
                      </p>
                      <div className="w-16 h-16 flex items-center justify-center bg-gradient-to-br from-cyan-400 to-indigo-600 rounded-xl">
                        {editData.iconBase64 ? (
                          <img
                            src={editData.iconBase64}
                            alt="Icon Preview"
                            className="w-10 h-10 object-contain filter brightness-0 invert"
                          />
                        ) : (
                          <span className="text-3xl text-white">
                            {editData.iconName}
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                {/* Превью выбранной иконки */}
                {(formData.iconName || formData.icon) && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-600 mb-2">
                      Превью новой иконки:
                    </p>
                    <div className="w-16 h-16 flex items-center justify-center bg-gradient-to-br from-cyan-400 to-indigo-600 rounded-xl">
                      {formData.icon ? (
                        <img
                          src={URL.createObjectURL(formData.icon)}
                          alt="Icon Preview"
                          className="w-10 h-10 object-contain filter brightness-0 invert"
                        />
                      ) : (
                        <span className="text-3xl text-white">
                          {formData.iconName}
                        </span>
                      )}
                    </div>
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

      <div className={modalOpen ? 'blur-sm transition-filter duration-300' : ''}>
        <h2 className="text-lg font-semibold mb-2">Список услуг</h2>
        <table className="w-full border bg-white">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2 border">Порядок</th>
              <th className="p-2 border">Заголовок</th>
              <th className="p-2 border">Описание</th>
              <th className="p-2 border">Иконка</th>
              <th className="p-2 border">Действия</th>
            </tr>
          </thead>
          <tbody>
            {services.map((item) => (
              <tr key={item.id} className="border-t align-top text-sm">
                <td className="p-2 border">{item.order || 0}</td>
                <td className="p-2 border max-w-[200px]">{item.title}</td>
                <td className="p-2 border max-w-[300px]">
                  {item.text?.substring(0, 100)}...
                </td>
                <td className="p-2 border">
                  {item.iconBase64 || item.iconName ? (
                    <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-cyan-400 to-indigo-600 rounded-lg">
                      {item.iconBase64 ? (
                        <img
                          src={item.iconBase64}
                          alt="Icon"
                          className="w-8 h-8 object-contain filter brightness-0 invert"
                        />
                      ) : (
                        <span className="text-xl text-white">
                          {item.iconName}
                        </span>
                      )}
                    </div>
                  ) : (
                    <span className="text-gray-400">Нет иконки</span>
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

