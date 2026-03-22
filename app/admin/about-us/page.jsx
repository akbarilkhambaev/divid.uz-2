'use client';

import { useState, useEffect } from 'react';
import { HiPencilAlt } from 'react-icons/hi';
import { HiOutlineTrash, HiOutlinePlus } from 'react-icons/hi2';
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';

const DEFAULT_DATA = {
  description:
    'DIVIDEND — стратегик консалтинг компанияси бўлиб, бизнесининг ривожланиши ва рақобатбардошлигини таъминлашга ихтисослашган. Бизнесингизни ривожлантириш учун инновацион ечимларни таклиф этувчи консалтинг компанияси. Биз шунчаки маслаҳатчи эмасмиз — мижозларимизнинг ҳақиқий ҳамкоримиз ва ҳар бир босқичда амалий ечимлар билан ёрдам берамиз.',
  quote:
    'Нега айнан DIVIDEND? Чунки ҳар бир тавсиямиз амалиётда синалган ва натижага йўналтирилган — жорий этиш жараёнида ҳамиша ёнингиздамиз.',
  directions: [
    {
      id: '1',
      title: 'Молиявий аудит ва оптималлаштириш',
      description:
        'Жараёнларни чуқур таҳлил қилиб, хатоларни аниқлаймиз ва харажатларни қисқартириш стратегиясини ишлаб чиқамиз. Мақсад — молиявий соғлиқни сақлаш.',
    },
    {
      id: '2',
      title: 'Стратегик молия бошқаруви',
      description:
        'Даромадларни режалаштириш, инвестицияларни бошқариш ва рискларни минималлаштириш бўйича амалий йўриқномалар тайёрлаймиз.',
    },
    {
      id: '3',
      title: 'Кадрлар бошқаруви ва HR-тизимлар',
      description:
        'Жамоани танлаш, баҳолаш ва мотивациялаш бўйича ечимлар, корпоратив маданиятни ривожлантириш режалари билан таъминлаймиз.',
    },
    {
      id: '4',
      title: 'Бизнес-жараёнларни рақамлаштириш',
      description:
        'CRM, ERP ва автоматлаштириш тизимларини жорий этиб, стратегияга кўпроқ, рутинага камроқ вақт ажратиш имконини берамиз.',
    },
    {
      id: '5',
      title: 'Бизнес-стратегия ва масштаблаш',
      description:
        'Янги бозорларга чиқиш, маҳсулот ривожи ва ўсиш сценарийлари бўйича амалий йўл хариталарини ишлаб чиқамиз.',
    },
  ],
  stats: [
    {
      id: '1',
      icon: 'briefcase',
      value: 120,
      suffix: '+',
      label: 'Якунланган лойиҳалар',
    },
    {
      id: '2',
      icon: 'users',
      value: 80,
      suffix: '+',
      label: 'Мамнун мижозлар',
    },
    {
      id: '3',
      icon: 'chart',
      value: 10,
      suffix: ' йил',
      label: 'жамоа тажрибаси',
    },
    {
      id: '4',
      icon: 'award',
      value: 95,
      suffix: '%',
      label: 'мижозлар сақланиш даражаси',
    },
  ],
};

export default function AboutUsAdminPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Modal state
  const [modal, setModal] = useState(null); // null | 'description' | 'quote' | 'direction' | 'stat'
  const [editDirection, setEditDirection] = useState(null);
  const [editStat, setEditStat] = useState(null);

  // Form fields
  const [formDescription, setFormDescription] = useState('');
  const [formQuote, setFormQuote] = useState('');
  const [formDirTitle, setFormDirTitle] = useState('');
  const [formDirDesc, setFormDirDesc] = useState('');
  const [formStatIcon, setFormStatIcon] = useState('briefcase');
  const [formStatValue, setFormStatValue] = useState('');
  const [formStatSuffix, setFormStatSuffix] = useState('');
  const [formStatLabel, setFormStatLabel] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ref = doc(db, 'aboutUs', 'main');
        const snap = await getDoc(ref);
        if (snap.exists()) {
          setData(snap.data());
        } else {
          // Инициализируем Firestore данными по умолчанию
          await setDoc(ref, DEFAULT_DATA);
          setData(DEFAULT_DATA);
        }
      } catch (err) {
        console.error('Ошибка загрузки:', err);
        setData(DEFAULT_DATA);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const saveToFirestore = async (newData) => {
    setSaving(true);
    try {
      await setDoc(doc(db, 'aboutUs', 'main'), newData);
      setData(newData);
    } catch (err) {
      alert('Ошибка сохранения: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  // --- Description ---
  const openDescriptionModal = () => {
    setFormDescription(data.description);
    setModal('description');
  };
  const saveDescription = async () => {
    if (!formDescription.trim()) return;
    await saveToFirestore({ ...data, description: formDescription.trim() });
    setModal(null);
  };

  // --- Quote ---
  const openQuoteModal = () => {
    setFormQuote(data.quote);
    setModal('quote');
  };
  const saveQuote = async () => {
    if (!formQuote.trim()) return;
    await saveToFirestore({ ...data, quote: formQuote.trim() });
    setModal(null);
  };

  // --- Directions ---
  const openAddDirection = () => {
    setFormDirTitle('');
    setFormDirDesc('');
    setEditDirection(null);
    setModal('direction');
  };
  const openEditDirection = (dir) => {
    setFormDirTitle(dir.title);
    setFormDirDesc(dir.description);
    setEditDirection(dir);
    setModal('direction');
  };
  const saveDirection = async () => {
    if (!formDirTitle.trim() || !formDirDesc.trim())
      return alert('Заполните все поля');
    let updatedDirections;
    if (editDirection) {
      updatedDirections = data.directions.map((d) =>
        d.id === editDirection.id
          ? {
              ...d,
              title: formDirTitle.trim(),
              description: formDirDesc.trim(),
            }
          : d,
      );
    } else {
      updatedDirections = [
        ...data.directions,
        {
          id: uuidv4(),
          title: formDirTitle.trim(),
          description: formDirDesc.trim(),
        },
      ];
    }
    await saveToFirestore({ ...data, directions: updatedDirections });
    setModal(null);
    setEditDirection(null);
  };
  const deleteDirection = async (id) => {
    if (!confirm('Удалить это направление?')) return;
    const updatedDirections = data.directions.filter((d) => d.id !== id);
    await saveToFirestore({ ...data, directions: updatedDirections });
  };

  // --- Stats ---
  const openAddStat = () => {
    setFormStatIcon('briefcase');
    setFormStatValue('');
    setFormStatSuffix('+');
    setFormStatLabel('');
    setEditStat(null);
    setModal('stat');
  };
  const openEditStat = (stat) => {
    setFormStatIcon(stat.icon || 'briefcase');
    setFormStatValue(String(stat.value));
    setFormStatSuffix(stat.suffix || '');
    setFormStatLabel(stat.label || '');
    setEditStat(stat);
    setModal('stat');
  };
  const saveStat = async () => {
    if (!formStatValue || !formStatLabel.trim())
      return alert('Заполните все поля');
    const currentStats = Array.isArray(data.stats) ? data.stats : [];
    let updatedStats;
    if (editStat) {
      updatedStats = currentStats.map((s) =>
        s.id === editStat.id
          ? {
              ...s,
              icon: formStatIcon,
              value: Number(formStatValue),
              suffix: formStatSuffix,
              label: formStatLabel.trim(),
            }
          : s,
      );
    } else {
      updatedStats = [
        ...currentStats,
        {
          id: uuidv4(),
          icon: formStatIcon,
          value: Number(formStatValue),
          suffix: formStatSuffix,
          label: formStatLabel.trim(),
        },
      ];
    }
    await saveToFirestore({ ...data, stats: updatedStats });
    setModal(null);
    setEditStat(null);
  };
  const deleteStat = async (id) => {
    if (!confirm('Удалить эту статистику?')) return;
    const updatedStats = (data.stats || []).filter((s) => s.id !== id);
    await saveToFirestore({ ...data, stats: updatedStats });
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-gray-500">Загрузка...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-10">
        БИЗ ҲАҚИМИЗДА — Редактирование
      </h1>

      {/* Описание компании */}
      <div className="bg-white rounded-xl shadow p-6 mb-6 max-w-4xl mx-auto">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold mb-2">Описание компании</h2>
            <p className="text-gray-700 text-sm whitespace-pre-wrap">
              {data.description}
            </p>
          </div>
          <button
            onClick={openDescriptionModal}
            className="flex-shrink-0 text-blue-600 hover:text-blue-800"
            title="Редактировать"
          >
            <HiPencilAlt size={22} />
          </button>
        </div>
      </div>

      {/* Цитата */}
      <div className="bg-white rounded-xl shadow p-6 mb-6 max-w-4xl mx-auto">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold mb-2">Цитата (блок-цитата)</h2>
            <p className="text-gray-700 text-sm italic">"{data.quote}"</p>
          </div>
          <button
            onClick={openQuoteModal}
            className="flex-shrink-0 text-blue-600 hover:text-blue-800"
            title="Редактировать"
          >
            <HiPencilAlt size={22} />
          </button>
        </div>
      </div>

      {/* Направления */}
      <div className="bg-white rounded-xl shadow p-6 max-w-4xl mx-auto mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Направления деятельности</h2>
          <button
            onClick={openAddDirection}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm"
          >
            <HiOutlinePlus size={18} />
            Добавить
          </button>
        </div>

        <div className="space-y-3">
          {data.directions.map((dir) => (
            <div
              key={dir.id}
              className="flex items-start justify-between gap-4 rounded-lg border border-gray-200 p-4"
            >
              <div>
                <p className="font-semibold text-sm text-gray-900 uppercase tracking-wide">
                  {dir.title}
                </p>
                <p className="text-sm text-gray-600 mt-1">{dir.description}</p>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button
                  onClick={() => openEditDirection(dir)}
                  className="text-blue-600 hover:text-blue-800"
                  title="Редактировать"
                >
                  <HiPencilAlt size={19} />
                </button>
                <button
                  onClick={() => deleteDirection(dir.id)}
                  className="text-red-500 hover:text-red-700"
                  title="Удалить"
                >
                  <HiOutlineTrash size={19} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Инфографика (статистика) */}
      <div className="bg-white rounded-xl shadow p-6 max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Инфографика (статистика)</h2>
          <button
            onClick={openAddStat}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm"
          >
            <HiOutlinePlus size={18} />
            Добавить
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {(data.stats || []).map((stat) => (
            <div
              key={stat.id}
              className="flex items-center justify-between gap-4 rounded-lg border border-gray-200 p-4"
            >
              <div className="flex items-center gap-3">
                <span className="text-xs bg-gray-100 rounded px-2 py-1 font-mono text-gray-600">
                  {stat.icon}
                </span>
                <div>
                  <p className="font-bold text-2xl text-blue-600">
                    {stat.value}
                    {stat.suffix}
                  </p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </div>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button
                  onClick={() => openEditStat(stat)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <HiPencilAlt size={19} />
                </button>
                <button
                  onClick={() => deleteStat(stat.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <HiOutlineTrash size={19} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {modal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {modal === 'description' && (
              <>
                <h2 className="text-xl font-bold mb-4">
                  Редактировать описание
                </h2>
                <textarea
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  className="w-full border rounded-lg p-3 text-sm"
                  rows={8}
                />
                <div className="flex justify-end gap-3 mt-4">
                  <button
                    onClick={() => setModal(null)}
                    className="px-4 py-2 rounded-lg border text-gray-600 hover:bg-gray-50"
                  >
                    Отмена
                  </button>
                  <button
                    onClick={saveDescription}
                    disabled={saving}
                    className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 disabled:opacity-60"
                  >
                    {saving ? 'Сохранение...' : 'Сохранить'}
                  </button>
                </div>
              </>
            )}

            {modal === 'quote' && (
              <>
                <h2 className="text-xl font-bold mb-4">Редактировать цитату</h2>
                <textarea
                  value={formQuote}
                  onChange={(e) => setFormQuote(e.target.value)}
                  className="w-full border rounded-lg p-3 text-sm"
                  rows={5}
                />
                <div className="flex justify-end gap-3 mt-4">
                  <button
                    onClick={() => setModal(null)}
                    className="px-4 py-2 rounded-lg border text-gray-600 hover:bg-gray-50"
                  >
                    Отмена
                  </button>
                  <button
                    onClick={saveQuote}
                    disabled={saving}
                    className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 disabled:opacity-60"
                  >
                    {saving ? 'Сохранение...' : 'Сохранить'}
                  </button>
                </div>
              </>
            )}

            {modal === 'direction' && (
              <>
                <h2 className="text-xl font-bold mb-4">
                  {editDirection
                    ? 'Редактировать направление'
                    : 'Добавить направление'}
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Заголовок *
                    </label>
                    <input
                      type="text"
                      value={formDirTitle}
                      onChange={(e) => setFormDirTitle(e.target.value)}
                      className="w-full border rounded-lg p-2 text-sm"
                      placeholder="Название направления"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Описание *
                    </label>
                    <textarea
                      value={formDirDesc}
                      onChange={(e) => setFormDirDesc(e.target.value)}
                      className="w-full border rounded-lg p-2 text-sm"
                      rows={4}
                      placeholder="Краткое описание направления"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-3 mt-4">
                  <button
                    onClick={() => {
                      setModal(null);
                      setEditDirection(null);
                    }}
                    className="px-4 py-2 rounded-lg border text-gray-600 hover:bg-gray-50"
                  >
                    Отмена
                  </button>
                  <button
                    onClick={saveDirection}
                    disabled={saving}
                    className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 disabled:opacity-60"
                  >
                    {saving ? 'Сохранение...' : 'Сохранить'}
                  </button>
                </div>
              </>
            )}

            {modal === 'stat' && (
              <>
                <h2 className="text-xl font-bold mb-4">
                  {editStat
                    ? 'Редактировать статистику'
                    : 'Добавить статистику'}
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Иконка *
                    </label>
                    <select
                      value={formStatIcon}
                      onChange={(e) => setFormStatIcon(e.target.value)}
                      className="w-full border rounded-lg p-2 text-sm"
                    >
                      <option value="briefcase">briefcase — Портфель</option>
                      <option value="users">users — Пользователи</option>
                      <option value="chart">chart — График</option>
                      <option value="award">award — Награда</option>
                      <option value="star">star — Звезда</option>
                      <option value="handshake">handshake — Рукопожатие</option>
                      <option value="trophy">trophy — Трофей</option>
                      <option value="rocket">rocket — Ракета</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Число *
                    </label>
                    <input
                      type="number"
                      value={formStatValue}
                      onChange={(e) => setFormStatValue(e.target.value)}
                      className="w-full border rounded-lg p-2 text-sm"
                      placeholder="например: 120"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Суффикс (после числа)
                    </label>
                    <input
                      type="text"
                      value={formStatSuffix}
                      onChange={(e) => setFormStatSuffix(e.target.value)}
                      className="w-full border rounded-lg p-2 text-sm"
                      placeholder="например: + или % или ' йил'"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Подпись *
                    </label>
                    <input
                      type="text"
                      value={formStatLabel}
                      onChange={(e) => setFormStatLabel(e.target.value)}
                      className="w-full border rounded-lg p-2 text-sm"
                      placeholder="например: Якунланган лойиҳалар"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-3 mt-4">
                  <button
                    onClick={() => {
                      setModal(null);
                      setEditStat(null);
                    }}
                    className="px-4 py-2 rounded-lg border text-gray-600 hover:bg-gray-50"
                  >
                    Отмена
                  </button>
                  <button
                    onClick={saveStat}
                    disabled={saving}
                    className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 disabled:opacity-60"
                  >
                    {saving ? 'Сохранение...' : 'Сохранить'}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
