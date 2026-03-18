'use client';
// DOMPurify must be imported dynamically on the client to avoid "window is not defined" during SSR
let DOMPurify = null;
import { useEffect, useState } from 'react';
import RichEditor from '@/components/admin/RichEditor';
import { db } from '@/lib/firebase';
import { HiPencilAlt } from 'react-icons/hi';
import { HiOutlineTrash } from 'react-icons/hi2';
import {
  collection,
  getDocs,
  doc,
  getDoc,
  updateDoc,
} from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';

export default function AddServicePage() {
  // ...existing code...
  // Модальное окно для добавления/редактирования услуги
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' или 'edit'
  const [modalData, setModalData] = useState({
    id: '',
    categoryId: '',
    subcategoryId: '',
    name: '',
    description: '',
  });
  const [modalSubcategories, setModalSubcategories] = useState([]);

  function openAddModal() {
    setModalMode('add');
    setModalData({
      id: '',
      categoryId: '',
      subcategoryId: '',
      name: '',
      description: '',
    });
    setModalSubcategories([]);
    setModalOpen(true);
  }

  function openEditModal(service) {
    setModalMode('edit');
    setModalData({
      id: service.id,
      categoryId:
        categories.find((cat) => cat.name === service.categoryName)?.docId ||
        '',
      subcategoryId:
        subcategories.find((sub) => sub.name === service.subcategoryName)?.id ||
        '',
      name: service.name,
      description: service.description,
    });
    // Найти подкатегории для выбранной категории
    const cat = categories.find((c) => c.name === service.categoryName);
    setModalSubcategories(cat?.subcategories || []);
    setModalOpen(true);
  }

  function handleModalCategoryChange(e) {
    const categoryId = e.target.value;
    const cat = categories.find((c) => c.docId === categoryId);
    setModalSubcategories(cat?.subcategories || []);
    setModalData({ ...modalData, categoryId, subcategoryId: '' });
  }

  function handleModalSubcategoryChange(e) {
    setModalData({ ...modalData, subcategoryId: e.target.value });
  }

  async function handleModalSave(e) {
    e.preventDefault();
    if (
      !modalData.categoryId ||
      !modalData.subcategoryId ||
      !modalData.name.trim() ||
      !modalData.description.trim()
    )
      return alert('Заполните все поля');
    const categoryRef = doc(db, 'servicesTree', modalData.categoryId);
    const categorySnap = await getDoc(categoryRef);
    if (!categorySnap.exists()) return alert('Категория не найдена');
    const data = categorySnap.data();
    if (modalMode === 'add') {
      const newService = {
        id: uuidv4(),
        name: modalData.name,
        description: modalData.description,
      };
      const updated = {
        ...data,
        subcategories: (data.subcategories || []).map((sub) => {
          if (String(sub.id) === String(modalData.subcategoryId)) {
            const services = Array.isArray(sub.services) ? sub.services : [];
            return {
              ...sub,
              services: [...services, newService],
            };
          }
          return sub;
        }),
      };
      await updateDoc(categoryRef, updated);
    } else {
      // edit
      const updated = {
        ...data,
        subcategories: (data.subcategories || []).map((sub) => {
          if (String(sub.id) === String(modalData.subcategoryId)) {
            const services = Array.isArray(sub.services) ? sub.services : [];
            return {
              ...sub,
              services: services.map((s) =>
                s.id === modalData.id
                  ? {
                      ...s,
                      name: modalData.name,
                      description: modalData.description,
                    }
                  : s,
              ),
            };
          }
          return sub;
        }),
      };
      await updateDoc(categoryRef, updated);
    }
    setModalOpen(false);
    setModalData({
      id: '',
      categoryId: '',
      subcategoryId: '',
      name: '',
      description: '',
    });
    setFormData({
      categoryId: '',
      subcategoryId: '',
      name: '',
      description: '',
    });
    setSubcategories([]);
  }
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [formData, setFormData] = useState({
    categoryId: '',
    subcategoryId: '',
    name: '',
    description: '',
  });
  // RichEditor component (loads CKEditor client-side)

  // Simple fallback sanitizer for SSR before DOMPurify is ready
  function stripScripts(html) {
    return String(html).replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '');
  }

  useEffect(() => {
    // Dynamic import of DOMPurify only on client
    (async () => {
      if (typeof window !== 'undefined') {
        if (!DOMPurify) {
          const mod = await import('dompurify');
          DOMPurify = mod.default || mod;
        }
      }
    })();

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
    const newService = {
      id: uuidv4(),
      name: formData.name,
      description: formData.description,
    };
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
            services: [...services, newService],
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

  // Собираем все услуги для таблицы
  const [allServices, setAllServices] = useState([]);
  useEffect(() => {
    async function fetchAllServices() {
      const snap = await getDocs(collection(db, 'servicesTree'));
      const cats = snap.docs.map((doc) => ({ docId: doc.id, ...doc.data() }));
      const result = [];
      cats.forEach((cat) => {
        (cat.subcategories || []).forEach((sub) => {
          (sub.services || []).forEach((service) => {
            result.push({
              ...service,
              categoryName: cat.name,
              subcategoryName: sub.name,
            });
          });
        });
      });
      setAllServices(result);
    }
    fetchAllServices();
  }, [formData]);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Услуги</h1>
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
        onClick={openAddModal}
      >
        + Добавить услугу
      </button>

      {/* Модальное окно для добавления/редактирования услуги */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 min-w-[1024px] max-w-lg w-full h-[90%] overflow-y-auto">
            <h3 className="text-lg font-bold mb-4">
              {modalMode === 'add' ? 'Добавить услугу' : 'Редактировать услугу'}
            </h3>
            <form
              onSubmit={handleModalSave}
              className="space-y-4"
            >
              <select
                value={modalData.categoryId}
                onChange={handleModalCategoryChange}
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
                value={modalData.subcategoryId}
                onChange={handleModalSubcategoryChange}
                className="w-full border p-2 rounded"
              >
                <option value="">Выбери подкатегорию</option>
                {modalSubcategories.map((sub) => (
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
                value={modalData.name}
                onChange={(e) =>
                  setModalData({ ...modalData, name: e.target.value })
                }
                className="w-full border p-2 rounded"
              />
              <div className="w-full mb-4">
                <RichEditor
                  data={modalData.description}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setModalData({ ...modalData, description: data });
                  }}
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                  {modalMode === 'add' ? 'Добавить' : 'Сохранить'}
                </button>
                <button
                  type="button"
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded"
                  onClick={() => setModalOpen(false)}
                >
                  Отмена
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <h2 className="text-lg font-bold mt-8 mb-4">Все услуги</h2>
      <div className="overflow-x-auto">
        <table className="w-full border text-left">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">№</th>
              <th className="p-2 border">Категория</th>
              <th className="p-2 border">Подкатегория</th>
              <th className="p-2 border">Название</th>
              <th className="p-2 border">Описание</th>

              <th className="p-2 border">Действия</th>
            </tr>
          </thead>
          <tbody>
            {allServices.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="p-2 border text-center text-gray-400"
                >
                  Нет услуг
                </td>
              </tr>
            ) : (
              allServices.map((service, idx) => (
                <tr
                  key={service.id}
                  className="hover:bg-gray-50"
                >
                  <td className="p-2 border">{idx + 1}</td>
                  <td className="p-2 border">{service.categoryName}</td>
                  <td className="p-2 border">{service.subcategoryName}</td>
                  <td className="p-2 border">{service.name}</td>
                  <td className="p-2 border">
                    <div
                      className="ck-content min-w-[300px]"
                      dangerouslySetInnerHTML={{
                        __html: (function () {
                          const raw = service.description || '';
                          if (DOMPurify) return DOMPurify.sanitize(raw);
                          return stripScripts(raw);
                        })(),
                      }}
                    />
                  </td>
                  <td className="p-2 border space-x-2">
                    <button
                      className="bg-cs-blue text-white px-2 py-1 rounded"
                      onClick={() => openEditModal(service)}
                    >
                      <HiPencilAlt />
                    </button>
                    <button
                      className="bg-red-600 text-white px-2 py-1 rounded"
                      onClick={() => handleDelete(service)}
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
    </div>
  );
}
