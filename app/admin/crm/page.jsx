'use client';

import { useEffect, useState } from 'react';
import { HiPencilAlt } from 'react-icons/hi';
import { HiOutlineTrash } from 'react-icons/hi2';
import { db } from '@/lib/firebase';
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  query,
  orderBy,
} from 'firebase/firestore';

export default function CRMPage() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, new, contacted, closed
  const [selectedLead, setSelectedLead] = useState(null);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'leads'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((d) => {
        const item = d.data();
        return {
          id: d.id,
          ...item,
          createdAt: item.createdAt?.toDate(),
        };
      });
      setLeads(data);
    } catch (error) {
      console.error('Ошибка загрузки заявок:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateDoc(doc(db, 'leads', id), { status: newStatus });
      fetchLeads();
    } catch (error) {
      console.error('Ошибка обновления статуса:', error);
      alert('Ошибка обновления статуса');
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Удалить эту заявку?')) {
      try {
        await deleteDoc(doc(db, 'leads', id));
        fetchLeads();
      } catch (error) {
        console.error('Ошибка удаления:', error);
        alert('Ошибка удаления');
      }
    }
  };

  const filteredLeads =
    filter === 'all'
      ? leads
      : leads.filter((lead) => lead.status === filter);

  const getStatusColor = (status) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-800';
      case 'contacted':
        return 'bg-yellow-100 text-yellow-800';
      case 'closed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'new':
        return 'Новая';
      case 'contacted':
        return 'Связались';
      case 'closed':
        return 'Закрыта';
      default:
        return 'Неизвестно';
    }
  };

  const getFormTypeLabel = (formType) => {
    switch (formType) {
      case 'ads':
        return 'Форма на главной';
      case 'callback':
        return 'Обратный звонок';
      case 'footer':
        return 'Форма в футере';
      case 'contacts':
        return 'Страница контактов';
      default:
        return formType || 'Неизвестно';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 flex items-center justify-center">
        <div className="text-xl">Загрузка...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">CRM - ЗАЯВКИ</h1>

      {/* Фильтры */}
      <div className="mb-6 flex gap-2 justify-center">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded ${
            filter === 'all'
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          Все ({leads.length})
        </button>
        <button
          onClick={() => setFilter('new')}
          className={`px-4 py-2 rounded ${
            filter === 'new'
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          Новые ({leads.filter((l) => l.status === 'new').length})
        </button>
        <button
          onClick={() => setFilter('contacted')}
          className={`px-4 py-2 rounded ${
            filter === 'contacted'
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          Связались ({leads.filter((l) => l.status === 'contacted').length})
        </button>
        <button
          onClick={() => setFilter('closed')}
          className={`px-4 py-2 rounded ${
            filter === 'closed'
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          Закрыты ({leads.filter((l) => l.status === 'closed').length})
        </button>
      </div>

      {/* Таблица заявок */}
      <div className="overflow-x-auto">
        <table className="w-full border bg-white">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2 border">Дата</th>
              <th className="p-2 border">Тип формы</th>
              <th className="p-2 border">Имя</th>
              <th className="p-2 border">Контакты</th>
              <th className="p-2 border">Тема/Сообщение</th>
              <th className="p-2 border">Статус</th>
              <th className="p-2 border">Действия</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeads.length === 0 ? (
              <tr>
                <td
                  colSpan="7"
                  className="p-8 text-center text-gray-500"
                >
                  Нет заявок
                </td>
              </tr>
            ) : (
              filteredLeads.map((lead) => (
                <tr
                  key={lead.id}
                  className="border-t align-top text-sm hover:bg-gray-50"
                >
                  <td className="p-2 border">
                    {lead.createdAt
                      ? lead.createdAt.toLocaleString('ru-RU')
                      : '—'}
                  </td>
                  <td className="p-2 border">
                    {getFormTypeLabel(lead.formType)}
                  </td>
                  <td className="p-2 border font-semibold">{lead.name}</td>
                  <td className="p-2 border">
                    <div className="space-y-1">
                      {lead.phone && (
                        <div>
                          <span className="text-gray-600">Тел:</span>{' '}
                          <a
                            href={`tel:${lead.phone}`}
                            className="text-blue-600 hover:underline"
                          >
                            {lead.phone}
                          </a>
                        </div>
                      )}
                      {lead.email && (
                        <div>
                          <span className="text-gray-600">Email:</span>{' '}
                          <a
                            href={`mailto:${lead.email}`}
                            className="text-blue-600 hover:underline"
                          >
                            {lead.email}
                          </a>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="p-2 border max-w-[300px]">
                    {lead.topic && (
                      <div className="mb-1">
                        <span className="text-gray-600">Тема:</span>{' '}
                        {lead.topic}
                      </div>
                    )}
                    {lead.message && (
                      <div className="text-gray-700">
                        {lead.message.length > 100
                          ? `${lead.message.substring(0, 100)}...`
                          : lead.message}
                      </div>
                    )}
                  </td>
                  <td className="p-2 border">
                    <select
                      value={lead.status || 'new'}
                      onChange={(e) =>
                        handleStatusChange(lead.id, e.target.value)
                      }
                      className={`px-2 py-1 rounded text-xs font-semibold ${getStatusColor(
                        lead.status || 'new'
                      )}`}
                    >
                      <option value="new">Новая</option>
                      <option value="contacted">Связались</option>
                      <option value="closed">Закрыта</option>
                    </select>
                  </td>
                  <td className="p-2 border space-x-2">
                    <button
                      onClick={() => setSelectedLead(lead)}
                      className="bg-cs-blue text-white px-2 py-1 rounded text-xs"
                      title="Просмотр"
                    >
                      👁️
                    </button>
                    <button
                      onClick={() => handleDelete(lead.id)}
                      className="bg-red-600 text-white px-2 py-1 rounded text-xs"
                      title="Удалить"
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

      {/* Модальное окно просмотра заявки */}
      {selectedLead && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">Детали заявки</h2>
            <div className="space-y-3">
              <div>
                <span className="font-semibold">Дата:</span>{' '}
                {selectedLead.createdAt
                  ? selectedLead.createdAt.toLocaleString('ru-RU')
                  : '—'}
              </div>
              <div>
                <span className="font-semibold">Тип формы:</span>{' '}
                {getFormTypeLabel(selectedLead.formType)}
              </div>
              <div>
                <span className="font-semibold">Имя:</span> {selectedLead.name}
              </div>
              {selectedLead.phone && (
                <div>
                  <span className="font-semibold">Телефон:</span>{' '}
                  <a
                    href={`tel:${selectedLead.phone}`}
                    className="text-blue-600 hover:underline"
                  >
                    {selectedLead.phone}
                  </a>
                </div>
              )}
              {selectedLead.email && (
                <div>
                  <span className="font-semibold">Email:</span>{' '}
                  <a
                    href={`mailto:${selectedLead.email}`}
                    className="text-blue-600 hover:underline"
                  >
                    {selectedLead.email}
                  </a>
                </div>
              )}
              {selectedLead.topic && (
                <div>
                  <span className="font-semibold">Тема:</span>{' '}
                  {selectedLead.topic}
                </div>
              )}
              {selectedLead.message && (
                <div>
                  <span className="font-semibold">Сообщение:</span>
                  <p className="mt-1 text-gray-700 whitespace-pre-wrap">
                    {selectedLead.message}
                  </p>
                </div>
              )}
              <div>
                <span className="font-semibold">Статус:</span>{' '}
                <span
                  className={`px-2 py-1 rounded text-xs font-semibold ${getStatusColor(
                    selectedLead.status || 'new'
                  )}`}
                >
                  {getStatusLabel(selectedLead.status || 'new')}
                </span>
              </div>
            </div>
            <div className="flex justify-end mt-6 space-x-2">
              <button
                onClick={() => setSelectedLead(null)}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded"
              >
                Закрыть
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

