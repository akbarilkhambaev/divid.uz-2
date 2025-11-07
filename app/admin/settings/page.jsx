'use client';

import { useState, useEffect } from 'react';
import { 
  collection, 
  getDocs, 
  addDoc, 
  deleteDoc, 
  doc,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { HiOutlineTrash, HiPlus, HiKey, HiUser } from 'react-icons/hi';
import { FiMail } from 'react-icons/fi';

export default function SettingsPage() {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'admin',
  });

  // Загрузка списка администраторов
  const fetchAdmins = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'administrators'));
      const adminsList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAdmins(adminsList);
    } catch (error) {
      console.error('Ошибка загрузки администраторов:', error);
      alert('Ошибка загрузки данных');
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  // Добавление нового администратора
  const handleAddAdmin = async (e) => {
    e.preventDefault();
    
    // Валидация
    if (formData.password !== formData.confirmPassword) {
      alert('Пароли не совпадают!');
      return;
    }

    if (formData.password.length < 6) {
      alert('Пароль должен содержать минимум 6 символов');
      return;
    }

    setLoading(true);

    try {
      // Проверка на существующего пользователя
      const existingAdmin = admins.find(
        (admin) => admin.username === formData.username || admin.email === formData.email
      );

      if (existingAdmin) {
        alert('Администратор с таким именем или email уже существует');
        setLoading(false);
        return;
      }

      // Добавление в Firestore
      await addDoc(collection(db, 'administrators'), {
        username: formData.username,
        email: formData.email,
        password: formData.password, // В реальном проекте используйте хеширование!
        role: formData.role,
        createdAt: serverTimestamp(),
        isActive: true,
      });

      alert('Администратор успешно добавлен!');
      setShowAddModal(false);
      setFormData({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'admin',
      });
      fetchAdmins();
    } catch (error) {
      console.error('Ошибка добавления администратора:', error);
      alert('Ошибка добавления администратора');
    } finally {
      setLoading(false);
    }
  };

  // Удаление администратора
  const handleDeleteAdmin = async (adminId, username) => {
    if (!confirm(`Вы уверены, что хотите удалить администратора "${username}"?`)) {
      return;
    }

    try {
      await deleteDoc(doc(db, 'administrators', adminId));
      alert('Администратор удален');
      fetchAdmins();
    } catch (error) {
      console.error('Ошибка удаления:', error);
      alert('Ошибка удаления администратора');
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Настройки</h1>
          <p className="text-gray-600 mt-2">Управление администраторами системы</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-cs-blue text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          <HiPlus className="text-xl" />
          Добавить администратора
        </button>
      </div>

      {/* Статистика */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Всего администраторов</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{admins.length}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <HiUser className="text-3xl text-cs-blue" />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Активные</p>
              <p className="text-3xl font-bold text-green-600 mt-1">
                {admins.filter(a => a.isActive).length}
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <HiKey className="text-3xl text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Супер-админы</p>
              <p className="text-3xl font-bold text-purple-600 mt-1">
                {admins.filter(a => a.role === 'superadmin').length}
              </p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <HiKey className="text-3xl text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Таблица администраторов */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Пользователь
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Роль
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Статус
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Дата создания
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Действия
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {admins.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                  Нет добавленных администраторов
                </td>
              </tr>
            ) : (
              admins.map((admin) => (
                <tr key={admin.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-cs-blue rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold">
                          {admin.username.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {admin.username}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-900">
                      <FiMail className="mr-2 text-gray-400" />
                      {admin.email}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      admin.role === 'superadmin' 
                        ? 'bg-purple-100 text-purple-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {admin.role === 'superadmin' ? 'Супер-админ' : 'Администратор'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      admin.isActive 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {admin.isActive ? 'Активен' : 'Неактивен'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {admin.createdAt?.toDate ? 
                      new Date(admin.createdAt.toDate()).toLocaleDateString('ru-RU') 
                      : 'Н/Д'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleDeleteAdmin(admin.id, admin.username)}
                      className="text-red-600 hover:text-red-900 transition"
                    >
                      <HiOutlineTrash className="text-xl" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Модальное окно добавления администратора */}
      {showAddModal && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setShowAddModal(false)}
          />
          
          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative">
              {/* Кнопка закрытия */}
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-black text-2xl font-bold"
              >
                ×
              </button>

              <h2 className="text-2xl font-bold mb-6">Добавить администратора</h2>

              <form onSubmit={handleAddAdmin} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Имя пользователя *
                  </label>
                  <input
                    type="text"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cs-blue"
                    placeholder="admin123"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cs-blue"
                    placeholder="admin@example.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Роль *
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cs-blue"
                  >
                    <option value="admin">Администратор</option>
                    <option value="superadmin">Супер-администратор</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Пароль *
                  </label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cs-blue"
                    placeholder="Минимум 6 символов"
                    required
                    minLength={6}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Подтвердите пароль *
                  </label>
                  <input
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cs-blue"
                    placeholder="Повторите пароль"
                    required
                    minLength={6}
                  />
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-cs-blue text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Добавление...' : 'Добавить'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-300 transition"
                  >
                    Отмена
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
