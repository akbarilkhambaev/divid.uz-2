'use client';

import { useEffect, useState } from 'react';
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
  setDoc,
  getDoc,
} from 'firebase/firestore';
import { HiPencilAlt, HiTrash, HiPlus, HiX, HiSave } from 'react-icons/hi';

const TABS = [
  { id: 'hero', label: 'Hero', icon: '🏠' },
  { id: 'about', label: 'О нас', icon: '📖' },
  { id: 'audience', label: 'Аудитория', icon: '👥' },
  { id: 'why', label: 'Почему мы', icon: '❓' },
  { id: 'courses', label: 'Курсы', icon: '📚' },
  { id: 'diploma', label: 'Диплом', icon: '🎓' },
  { id: 'mentorship', label: 'Менторство', icon: '👨‍🏫' },
  { id: 'individual', label: 'Индивид. ментор', icon: '⭐' },
  { id: 'pricing', label: 'Цены', icon: '💰' },
  { id: 'team', label: 'Команда', icon: '👥' },
  { id: 'freeLesson', label: 'Бесплатный урок', icon: '🎁' },
  { id: 'contact', label: 'Контакты', icon: '📞' },
];

export default function AcademyAdminPage() {
  const [activeTab, setActiveTab] = useState('hero');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  // Hero Section
  const [heroData, setHeroData] = useState({
    title: '',
    subtitle: '',
    description: '',
    videoUrl: '',
    posterUrl: '',
  });

  // About Section Slides
  const [aboutSlides, setAboutSlides] = useState([]);
  const [aboutModalOpen, setAboutModalOpen] = useState(false);
  const [aboutEditData, setAboutEditData] = useState(null);
  const [aboutFormData, setAboutFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    videoUrl: '',
    order: 0,
  });

  // Target Audience
  const [audienceItems, setAudienceItems] = useState([]);
  const [audienceModalOpen, setAudienceModalOpen] = useState(false);
  const [audienceEditData, setAudienceEditData] = useState(null);
  const [audienceFormData, setAudienceFormData] = useState({
    title: '',
    description: '',
    animationPath: '',
    gradient: 'from-blue-500 to-cyan-500',
    order: 0,
  });

  // Why Academy
  const [whyItems, setWhyItems] = useState([]);
  const [whyModalOpen, setWhyModalOpen] = useState(false);
  const [whyEditData, setWhyEditData] = useState(null);
  const [whyFormData, setWhyFormData] = useState({
    title: '',
    order: 0,
  });

  // Mentorship Features
  const [mentorshipItems, setMentorshipItems] = useState([]);
  const [mentorshipModalOpen, setMentorshipModalOpen] = useState(false);
  const [mentorshipEditData, setMentorshipEditData] = useState(null);
  const [mentorshipFormData, setMentorshipFormData] = useState({
    title: '',
    order: 0,
  });
  const [mentorshipData, setMentorshipData] = useState({
    sectionTitle: '',
    sectionDescription: '',
  });

  // Individual Mentor
  const [individualItems, setIndividualItems] = useState([]);
  const [individualModalOpen, setIndividualModalOpen] = useState(false);
  const [individualEditData, setIndividualEditData] = useState(null);
  const [individualFormData, setIndividualFormData] = useState({
    title: '',
    order: 0,
  });
  const [individualData, setIndividualData] = useState({
    sectionTitle: '',
    sectionSubtitle: '',
    sectionDescription: '',
  });

  // Pricing
  const [pricingData, setPricingData] = useState({
    sectionTitle: '',
    beginnerPackageTitle: '',
    beginnerCourse1Title: '',
    beginnerCourse1Price: '',
    beginnerCourse2Title: '',
    beginnerCourse2Price: '',
    beginnerTotalPrice: '',
    beginnerTotalNote: '',
    additionalTitle: '',
    additionalCourse1Title: '',
    additionalCourse1Price: '',
    additionalCourse2Title: '',
    additionalCourse2Price: '',
    additionalResultNote: '',
    footerNote: '',
  });

  // Academy Team
  const [teamMembers, setTeamMembers] = useState([]);
  const [teamModalOpen, setTeamModalOpen] = useState(false);
  const [teamEditData, setTeamEditData] = useState(null);
  const [teamFormData, setTeamFormData] = useState({
    name: '',
    role: '',
    bio: '',
    photoBase64: '',
    photoName: '',
    order: 0,
  });

  // Free Lesson
  const [freeLessonData, setFreeLessonData] = useState({
    sectionTitle: '',
    topic: '',
    topicDescription: '',
    date: '',
    duration: '',
    seatsNote: '',
    registrationNote: '',
  });
  const [learningPoints, setLearningPoints] = useState([]);
  const [learningPointModalOpen, setLearningPointModalOpen] = useState(false);
  const [learningPointEditData, setLearningPointEditData] = useState(null);
  const [learningPointFormData, setLearningPointFormData] = useState({
    text: '',
    order: 0,
  });

  // Contact Info
  const [contactData, setContactData] = useState({
    sectionTitle: '',
    sectionDescription: '',
    formTitle: '',
    phone: '',
    phoneLink: '',
    telegram: '',
    telegramLink: '',
    facebook: '',
    facebookLink: '',
    whatsapp: '',
    whatsappLink: '',
  });

  // Diploma Section
  const [diplomaData, setDiplomaData] = useState({
    sectionTitle: '',
    sectionSubtitle: '',
    diplomaBlock1Title: '',
    diplomaBlock1Text: '',
    diplomaBlock2Title: '',
    diplomaBlock2Text: '',
  });

  // Courses Section
  const [coursesData, setCoursesData] = useState({
    sectionTitle: '',
    beginnerTitle: '',
    beginnerDuration: '',
    beginnerCourse1Title: '',
    beginnerCourse1Desc: '',
    beginnerCourse2Title: '',
    beginnerCourse2Desc: '',
    beginnerVideoUrl: '',
    professionalTitle: '',
    professionalDuration: '',
    professionalCourse1Title: '',
    professionalCourse1Desc: '',
    professionalCourse2Title: '',
    professionalCourse2Desc: '',
    professionalVideoUrl: '',
  });

  // Fetch functions
  const fetchHeroData = async () => {
    try {
      const docRef = doc(db, 'academySettings', 'hero');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setHeroData(docSnap.data());
      }
    } catch (error) {
      console.error('Error fetching hero:', error);
    }
  };

  const fetchAboutSlides = async () => {
    try {
      const q = query(
        collection(db, 'academyAboutSlides'),
        orderBy('order', 'asc'),
      );
      const snapshot = await getDocs(q);
      setAboutSlides(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
    } catch (error) {
      console.error('Error fetching about slides:', error);
    }
  };

  const fetchAudienceItems = async () => {
    try {
      const q = query(
        collection(db, 'academyAudience'),
        orderBy('order', 'asc'),
      );
      const snapshot = await getDocs(q);
      setAudienceItems(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
    } catch (error) {
      console.error('Error fetching audience:', error);
    }
  };

  const fetchWhyItems = async () => {
    try {
      const q = query(
        collection(db, 'academyWhyItems'),
        orderBy('order', 'asc'),
      );
      const snapshot = await getDocs(q);
      setWhyItems(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
    } catch (error) {
      console.error('Error fetching why items:', error);
    }
  };

  const fetchMentorshipData = async () => {
    try {
      const docRef = doc(db, 'academySettings', 'mentorship');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setMentorshipData(docSnap.data());
      }
      const q = query(
        collection(db, 'academyMentorshipFeatures'),
        orderBy('order', 'asc'),
      );
      const snapshot = await getDocs(q);
      setMentorshipItems(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
    } catch (error) {
      console.error('Error fetching mentorship:', error);
    }
  };

  const fetchIndividualData = async () => {
    try {
      const docRef = doc(db, 'academySettings', 'individual');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setIndividualData(docSnap.data());
      }
      const q = query(
        collection(db, 'academyIndividualFeatures'),
        orderBy('order', 'asc'),
      );
      const snapshot = await getDocs(q);
      setIndividualItems(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
    } catch (error) {
      console.error('Error fetching individual:', error);
    }
  };

  const fetchPricingData = async () => {
    try {
      const docRef = doc(db, 'academySettings', 'pricing');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setPricingData(docSnap.data());
      }
    } catch (error) {
      console.error('Error fetching pricing:', error);
    }
  };

  const fetchTeamMembers = async () => {
    try {
      const q = query(collection(db, 'academyTeam'), orderBy('order', 'asc'));
      const snapshot = await getDocs(q);
      setTeamMembers(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
    } catch (error) {
      console.error('Error fetching team:', error);
    }
  };

  const fetchFreeLessonData = async () => {
    try {
      const docRef = doc(db, 'academySettings', 'freeLesson');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setFreeLessonData(docSnap.data());
      }
      const q = query(
        collection(db, 'academyLearningPoints'),
        orderBy('order', 'asc'),
      );
      const snapshot = await getDocs(q);
      setLearningPoints(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
    } catch (error) {
      console.error('Error fetching free lesson:', error);
    }
  };

  const fetchContactData = async () => {
    try {
      const docRef = doc(db, 'academySettings', 'contact');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setContactData(docSnap.data());
      }
    } catch (error) {
      console.error('Error fetching contact:', error);
    }
  };

  const fetchDiplomaData = async () => {
    try {
      const docRef = doc(db, 'academySettings', 'diploma');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setDiplomaData(docSnap.data());
      }
    } catch (error) {
      console.error('Error fetching diploma:', error);
    }
  };

  const fetchCoursesData = async () => {
    try {
      const docRef = doc(db, 'academySettings', 'courses');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setCoursesData(docSnap.data());
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetchHeroData(),
      fetchAboutSlides(),
      fetchAudienceItems(),
      fetchWhyItems(),
      fetchMentorshipData(),
      fetchIndividualData(),
      fetchPricingData(),
      fetchTeamMembers(),
      fetchFreeLessonData(),
      fetchContactData(),
      fetchDiplomaData(),
      fetchCoursesData(),
    ]).finally(() => setLoading(false));
  }, []);

  // Save functions
  const saveHeroData = async () => {
    setSaving(true);
    try {
      await setDoc(doc(db, 'academySettings', 'hero'), heroData);
      alert('Hero сохранен!');
    } catch (error) {
      console.error('Error saving hero:', error);
      alert('Ошибка сохранения');
    } finally {
      setSaving(false);
    }
  };

  const saveMentorshipSettings = async () => {
    setSaving(true);
    try {
      await setDoc(doc(db, 'academySettings', 'mentorship'), mentorshipData);
      alert('Настройки менторства сохранены!');
    } catch (error) {
      console.error('Error saving mentorship:', error);
      alert('Ошибка сохранения');
    } finally {
      setSaving(false);
    }
  };

  const saveIndividualSettings = async () => {
    setSaving(true);
    try {
      await setDoc(doc(db, 'academySettings', 'individual'), individualData);
      alert('Настройки индивидуального ментора сохранены!');
    } catch (error) {
      console.error('Error saving individual:', error);
      alert('Ошибка сохранения');
    } finally {
      setSaving(false);
    }
  };

  const savePricingData = async () => {
    setSaving(true);
    try {
      await setDoc(doc(db, 'academySettings', 'pricing'), pricingData);
      alert('Цены сохранены!');
    } catch (error) {
      console.error('Error saving pricing:', error);
      alert('Ошибка сохранения');
    } finally {
      setSaving(false);
    }
  };

  const saveFreeLessonData = async () => {
    setSaving(true);
    try {
      await setDoc(doc(db, 'academySettings', 'freeLesson'), freeLessonData);
      alert('Бесплатный урок сохранен!');
    } catch (error) {
      console.error('Error saving free lesson:', error);
      alert('Ошибка сохранения');
    } finally {
      setSaving(false);
    }
  };

  const saveContactData = async () => {
    setSaving(true);
    try {
      await setDoc(doc(db, 'academySettings', 'contact'), contactData);
      alert('Контакты сохранены!');
    } catch (error) {
      console.error('Error saving contact:', error);
      alert('Ошибка сохранения');
    } finally {
      setSaving(false);
    }
  };

  const saveDiplomaData = async () => {
    setSaving(true);
    try {
      await setDoc(doc(db, 'academySettings', 'diploma'), diplomaData);
      alert('Диплом сохранен!');
    } catch (error) {
      console.error('Error saving diploma:', error);
      alert('Ошибка сохранения');
    } finally {
      setSaving(false);
    }
  };

  const saveCoursesData = async () => {
    setSaving(true);
    try {
      await setDoc(doc(db, 'academySettings', 'courses'), coursesData);
      alert('Курсы сохранены!');
    } catch (error) {
      console.error('Error saving courses:', error);
      alert('Ошибка сохранения');
    } finally {
      setSaving(false);
    }
  };

  // CRUD for About Slides
  const handleAboutAddOrUpdate = async (e) => {
    e.preventDefault();
    try {
      if (aboutEditData) {
        await updateDoc(
          doc(db, 'academyAboutSlides', aboutEditData.id),
          aboutFormData,
        );
      } else {
        await addDoc(collection(db, 'academyAboutSlides'), aboutFormData);
      }
      setAboutModalOpen(false);
      setAboutEditData(null);
      setAboutFormData({
        title: '',
        subtitle: '',
        description: '',
        videoUrl: '',
        order: 0,
      });
      fetchAboutSlides();
    } catch (error) {
      console.error('Error saving about slide:', error);
      alert('Ошибка сохранения');
    }
  };

  const handleAboutDelete = async (id) => {
    if (confirm('Удалить этот слайд?')) {
      await deleteDoc(doc(db, 'academyAboutSlides', id));
      fetchAboutSlides();
    }
  };

  // CRUD for Audience Items
  const handleAudienceAddOrUpdate = async (e) => {
    e.preventDefault();
    try {
      if (audienceEditData) {
        await updateDoc(
          doc(db, 'academyAudience', audienceEditData.id),
          audienceFormData,
        );
      } else {
        await addDoc(collection(db, 'academyAudience'), audienceFormData);
      }
      setAudienceModalOpen(false);
      setAudienceEditData(null);
      setAudienceFormData({
        title: '',
        description: '',
        animationPath: '',
        gradient: 'from-blue-500 to-cyan-500',
        order: 0,
      });
      fetchAudienceItems();
    } catch (error) {
      console.error('Error saving audience:', error);
      alert('Ошибка сохранения');
    }
  };

  const handleAudienceDelete = async (id) => {
    if (confirm('Удалить эту аудиторию?')) {
      await deleteDoc(doc(db, 'academyAudience', id));
      fetchAudienceItems();
    }
  };

  // CRUD for Why Items
  const handleWhyAddOrUpdate = async (e) => {
    e.preventDefault();
    try {
      if (whyEditData) {
        await updateDoc(
          doc(db, 'academyWhyItems', whyEditData.id),
          whyFormData,
        );
      } else {
        await addDoc(collection(db, 'academyWhyItems'), whyFormData);
      }
      setWhyModalOpen(false);
      setWhyEditData(null);
      setWhyFormData({ title: '', order: 0 });
      fetchWhyItems();
    } catch (error) {
      console.error('Error saving why item:', error);
      alert('Ошибка сохранения');
    }
  };

  const handleWhyDelete = async (id) => {
    if (confirm('Удалить этот пункт?')) {
      await deleteDoc(doc(db, 'academyWhyItems', id));
      fetchWhyItems();
    }
  };

  // CRUD for Mentorship Features
  const handleMentorshipAddOrUpdate = async (e) => {
    e.preventDefault();
    try {
      if (mentorshipEditData) {
        await updateDoc(
          doc(db, 'academyMentorshipFeatures', mentorshipEditData.id),
          mentorshipFormData,
        );
      } else {
        await addDoc(
          collection(db, 'academyMentorshipFeatures'),
          mentorshipFormData,
        );
      }
      setMentorshipModalOpen(false);
      setMentorshipEditData(null);
      setMentorshipFormData({ title: '', order: 0 });
      fetchMentorshipData();
    } catch (error) {
      console.error('Error saving mentorship feature:', error);
      alert('Ошибка сохранения');
    }
  };

  const handleMentorshipDelete = async (id) => {
    if (confirm('Удалить эту характеристику?')) {
      await deleteDoc(doc(db, 'academyMentorshipFeatures', id));
      fetchMentorshipData();
    }
  };

  // CRUD for Individual Features
  const handleIndividualAddOrUpdate = async (e) => {
    e.preventDefault();
    try {
      if (individualEditData) {
        await updateDoc(
          doc(db, 'academyIndividualFeatures', individualEditData.id),
          individualFormData,
        );
      } else {
        await addDoc(
          collection(db, 'academyIndividualFeatures'),
          individualFormData,
        );
      }
      setIndividualModalOpen(false);
      setIndividualEditData(null);
      setIndividualFormData({ title: '', order: 0 });
      fetchIndividualData();
    } catch (error) {
      console.error('Error saving individual feature:', error);
      alert('Ошибка сохранения');
    }
  };

  const handleIndividualDelete = async (id) => {
    if (confirm('Удалить эту характеристику?')) {
      await deleteDoc(doc(db, 'academyIndividualFeatures', id));
      fetchIndividualData();
    }
  };

  // CRUD for Team Members
  const handleTeamAddOrUpdate = async (e) => {
    e.preventDefault();
    try {
      const dataToSave = { ...teamFormData };
      if (teamEditData) {
        await updateDoc(doc(db, 'academyTeam', teamEditData.id), dataToSave);
      } else {
        await addDoc(collection(db, 'academyTeam'), dataToSave);
      }
      setTeamModalOpen(false);
      setTeamEditData(null);
      setTeamFormData({
        name: '',
        role: '',
        bio: '',
        photoBase64: '',
        photoName: '',
        order: 0,
      });
      fetchTeamMembers();
    } catch (error) {
      console.error('Error saving team member:', error);
      alert('Ошибка сохранения');
    }
  };

  const handleTeamDelete = async (id) => {
    if (confirm('Удалить члена команды?')) {
      await deleteDoc(doc(db, 'academyTeam', id));
      fetchTeamMembers();
    }
  };

  const handleTeamPhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTeamFormData({
          ...teamFormData,
          photoBase64: reader.result,
          photoName: file.name,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // CRUD for Learning Points
  const handleLearningPointAddOrUpdate = async (e) => {
    e.preventDefault();
    try {
      if (learningPointEditData) {
        await updateDoc(
          doc(db, 'academyLearningPoints', learningPointEditData.id),
          learningPointFormData,
        );
      } else {
        await addDoc(
          collection(db, 'academyLearningPoints'),
          learningPointFormData,
        );
      }
      setLearningPointModalOpen(false);
      setLearningPointEditData(null);
      setLearningPointFormData({ text: '', order: 0 });
      fetchFreeLessonData();
    } catch (error) {
      console.error('Error saving learning point:', error);
      alert('Ошибка сохранения');
    }
  };

  const handleLearningPointDelete = async (id) => {
    if (confirm('Удалить этот пункт?')) {
      await deleteDoc(doc(db, 'academyLearningPoints', id));
      fetchFreeLessonData();
    }
  };

  // Modal component
  const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">{title}</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <HiX className="w-6 h-6" />
            </button>
          </div>
          {children}
        </div>
      </div>
    );
  };

  // Render content based on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case 'hero':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Hero секция</h2>
            <div className="grid gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Заголовок (HTML)
                </label>
                <textarea
                  value={heroData.title}
                  onChange={(e) =>
                    setHeroData({ ...heroData, title: e.target.value })
                  }
                  className="w-full border p-3 rounded-lg"
                  rows="3"
                  placeholder="Билимга килинган инвестициядa —<br /><span>дивиденд кафолатланган</span>"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Описание
                </label>
                <textarea
                  value={heroData.description}
                  onChange={(e) =>
                    setHeroData({ ...heroData, description: e.target.value })
                  }
                  className="w-full border p-3 rounded-lg"
                  rows="3"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  URL видео (webm)
                </label>
                <input
                  type="text"
                  value={heroData.videoUrl}
                  onChange={(e) =>
                    setHeroData({ ...heroData, videoUrl: e.target.value })
                  }
                  className="w-full border p-3 rounded-lg"
                  placeholder="/academy/hero-bg.webm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  URL постера
                </label>
                <input
                  type="text"
                  value={heroData.posterUrl}
                  onChange={(e) =>
                    setHeroData({ ...heroData, posterUrl: e.target.value })
                  }
                  className="w-full border p-3 rounded-lg"
                  placeholder="/academy/hero-poster.avif"
                />
              </div>
              <button
                onClick={saveHeroData}
                disabled={saving}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 disabled:opacity-50"
              >
                <HiSave className="inline mr-2" />
                {saving ? 'Сохранение...' : 'Сохранить'}
              </button>
            </div>
          </div>
        );

      case 'about':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Слайды "О нас"</h2>
              <button
                onClick={() => {
                  setAboutEditData(null);
                  setAboutFormData({
                    title: '',
                    subtitle: '',
                    description: '',
                    videoUrl: '',
                    order: 0,
                  });
                  setAboutModalOpen(true);
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
              >
                <HiPlus /> Добавить слайд
              </button>
            </div>
            <div className="grid gap-4">
              {aboutSlides.map((slide) => (
                <div
                  key={slide.id}
                  className="bg-white p-4 rounded-lg shadow border flex justify-between items-start"
                >
                  <div>
                    <h3 className="font-bold">{slide.title}</h3>
                    <p className="text-sm text-gray-600">{slide.subtitle}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      Порядок: {slide.order}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setAboutEditData(slide);
                        setAboutFormData(slide);
                        setAboutModalOpen(true);
                      }}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <HiPencilAlt className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleAboutDelete(slide.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <HiTrash className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <Modal
              isOpen={aboutModalOpen}
              onClose={() => setAboutModalOpen(false)}
              title={aboutEditData ? 'Редактировать слайд' : 'Добавить слайд'}
            >
              <form
                onSubmit={handleAboutAddOrUpdate}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Заголовок *
                  </label>
                  <input
                    type="text"
                    value={aboutFormData.title}
                    onChange={(e) =>
                      setAboutFormData({
                        ...aboutFormData,
                        title: e.target.value,
                      })
                    }
                    className="w-full border p-2 rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Подзаголовок
                  </label>
                  <input
                    type="text"
                    value={aboutFormData.subtitle}
                    onChange={(e) =>
                      setAboutFormData({
                        ...aboutFormData,
                        subtitle: e.target.value,
                      })
                    }
                    className="w-full border p-2 rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Описание
                  </label>
                  <textarea
                    value={aboutFormData.description}
                    onChange={(e) =>
                      setAboutFormData({
                        ...aboutFormData,
                        description: e.target.value,
                      })
                    }
                    className="w-full border p-2 rounded"
                    rows="5"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    URL видео
                  </label>
                  <input
                    type="text"
                    value={aboutFormData.videoUrl}
                    onChange={(e) =>
                      setAboutFormData({
                        ...aboutFormData,
                        videoUrl: e.target.value,
                      })
                    }
                    className="w-full border p-2 rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Порядок
                  </label>
                  <input
                    type="number"
                    value={aboutFormData.order}
                    onChange={(e) =>
                      setAboutFormData({
                        ...aboutFormData,
                        order: Number(e.target.value),
                      })
                    }
                    className="w-full border p-2 rounded"
                  />
                </div>
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setAboutModalOpen(false)}
                    className="flex-1 bg-gray-200 py-2 rounded"
                  >
                    Отмена
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white py-2 rounded"
                  >
                    Сохранить
                  </button>
                </div>
              </form>
            </Modal>
          </div>
        );

      case 'audience':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Целевая аудитория</h2>
              <button
                onClick={() => {
                  setAudienceEditData(null);
                  setAudienceFormData({
                    title: '',
                    description: '',
                    animationPath: '',
                    gradient: 'from-blue-500 to-cyan-500',
                    order: 0,
                  });
                  setAudienceModalOpen(true);
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
              >
                <HiPlus /> Добавить
              </button>
            </div>
            <div className="grid gap-4">
              {audienceItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-4 rounded-lg shadow border flex justify-between items-start"
                >
                  <div>
                    <h3 className="font-bold">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.description}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      Порядок: {item.order}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setAudienceEditData(item);
                        setAudienceFormData(item);
                        setAudienceModalOpen(true);
                      }}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <HiPencilAlt className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleAudienceDelete(item.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <HiTrash className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <Modal
              isOpen={audienceModalOpen}
              onClose={() => setAudienceModalOpen(false)}
              title={audienceEditData ? 'Редактировать' : 'Добавить'}
            >
              <form
                onSubmit={handleAudienceAddOrUpdate}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Заголовок *
                  </label>
                  <input
                    type="text"
                    value={audienceFormData.title}
                    onChange={(e) =>
                      setAudienceFormData({
                        ...audienceFormData,
                        title: e.target.value,
                      })
                    }
                    className="w-full border p-2 rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Описание
                  </label>
                  <textarea
                    value={audienceFormData.description}
                    onChange={(e) =>
                      setAudienceFormData({
                        ...audienceFormData,
                        description: e.target.value,
                      })
                    }
                    className="w-full border p-2 rounded"
                    rows="3"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Путь к анимации (Lottie JSON)
                  </label>
                  <input
                    type="text"
                    value={audienceFormData.animationPath}
                    onChange={(e) =>
                      setAudienceFormData({
                        ...audienceFormData,
                        animationPath: e.target.value,
                      })
                    }
                    className="w-full border p-2 rounded"
                    placeholder="/academy/lottie-beginner.json"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Градиент
                  </label>
                  <select
                    value={audienceFormData.gradient}
                    onChange={(e) =>
                      setAudienceFormData({
                        ...audienceFormData,
                        gradient: e.target.value,
                      })
                    }
                    className="w-full border p-2 rounded"
                  >
                    <option value="from-blue-500 to-cyan-500">
                      Синий → Голубой
                    </option>
                    <option value="from-purple-500 to-pink-500">
                      Фиолетовый → Розовый
                    </option>
                    <option value="from-orange-500 to-red-500">
                      Оранжевый → Красный
                    </option>
                    <option value="from-green-500 to-teal-500">
                      Зеленый → Бирюзовый
                    </option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Порядок
                  </label>
                  <input
                    type="number"
                    value={audienceFormData.order}
                    onChange={(e) =>
                      setAudienceFormData({
                        ...audienceFormData,
                        order: Number(e.target.value),
                      })
                    }
                    className="w-full border p-2 rounded"
                  />
                </div>
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setAudienceModalOpen(false)}
                    className="flex-1 bg-gray-200 py-2 rounded"
                  >
                    Отмена
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white py-2 rounded"
                  >
                    Сохранить
                  </button>
                </div>
              </form>
            </Modal>
          </div>
        );

      case 'why':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Почему Дивиденд Академия</h2>
              <button
                onClick={() => {
                  setWhyEditData(null);
                  setWhyFormData({ title: '', order: 0 });
                  setWhyModalOpen(true);
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
              >
                <HiPlus /> Добавить преимущество
              </button>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {whyItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-4 rounded-lg shadow border flex justify-between items-start"
                >
                  <div>
                    <h3 className="font-bold">{item.title}</h3>
                    <p className="text-xs text-gray-400 mt-1">
                      Порядок: {item.order}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setWhyEditData(item);
                        setWhyFormData(item);
                        setWhyModalOpen(true);
                      }}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <HiPencilAlt className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleWhyDelete(item.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <HiTrash className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <Modal
              isOpen={whyModalOpen}
              onClose={() => setWhyModalOpen(false)}
              title={whyEditData ? 'Редактировать' : 'Добавить'}
            >
              <form
                onSubmit={handleWhyAddOrUpdate}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Текст преимущества *
                  </label>
                  <input
                    type="text"
                    value={whyFormData.title}
                    onChange={(e) =>
                      setWhyFormData({ ...whyFormData, title: e.target.value })
                    }
                    className="w-full border p-2 rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Порядок
                  </label>
                  <input
                    type="number"
                    value={whyFormData.order}
                    onChange={(e) =>
                      setWhyFormData({
                        ...whyFormData,
                        order: Number(e.target.value),
                      })
                    }
                    className="w-full border p-2 rounded"
                  />
                </div>
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setWhyModalOpen(false)}
                    className="flex-1 bg-gray-200 py-2 rounded"
                  >
                    Отмена
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white py-2 rounded"
                  >
                    Сохранить
                  </button>
                </div>
              </form>
            </Modal>
          </div>
        );

      case 'courses':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Структура курсов</h2>
            <div className="grid gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Заголовок секции
                </label>
                <input
                  type="text"
                  value={coursesData.sectionTitle}
                  onChange={(e) =>
                    setCoursesData({
                      ...coursesData,
                      sectionTitle: e.target.value,
                    })
                  }
                  className="w-full border p-3 rounded-lg"
                  placeholder="Курс тузилиши"
                />
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-bold mb-4 text-lg">Бошланғич дастур</h3>
                <div className="grid gap-4">
                  <input
                    type="text"
                    value={coursesData.beginnerTitle}
                    onChange={(e) =>
                      setCoursesData({
                        ...coursesData,
                        beginnerTitle: e.target.value,
                      })
                    }
                    className="w-full border p-2 rounded"
                    placeholder="Заголовок"
                  />
                  <input
                    type="text"
                    value={coursesData.beginnerDuration}
                    onChange={(e) =>
                      setCoursesData({
                        ...coursesData,
                        beginnerDuration: e.target.value,
                      })
                    }
                    className="w-full border p-2 rounded"
                    placeholder="Давомийлиги: 2 ой"
                  />
                  <input
                    type="text"
                    value={coursesData.beginnerCourse1Title}
                    onChange={(e) =>
                      setCoursesData({
                        ...coursesData,
                        beginnerCourse1Title: e.target.value,
                      })
                    }
                    className="w-full border p-2 rounded"
                    placeholder="1-курс: Корпоратив молияга кириш"
                  />
                  <input
                    type="text"
                    value={coursesData.beginnerCourse1Desc}
                    onChange={(e) =>
                      setCoursesData({
                        ...coursesData,
                        beginnerCourse1Desc: e.target.value,
                      })
                    }
                    className="w-full border p-2 rounded"
                    placeholder="Описание 1-курса"
                  />
                  <input
                    type="text"
                    value={coursesData.beginnerCourse2Title}
                    onChange={(e) =>
                      setCoursesData({
                        ...coursesData,
                        beginnerCourse2Title: e.target.value,
                      })
                    }
                    className="w-full border p-2 rounded"
                    placeholder="2-курс: Молиявий таҳлилчи"
                  />
                  <input
                    type="text"
                    value={coursesData.beginnerCourse2Desc}
                    onChange={(e) =>
                      setCoursesData({
                        ...coursesData,
                        beginnerCourse2Desc: e.target.value,
                      })
                    }
                    className="w-full border p-2 rounded"
                    placeholder="Описание 2-курса"
                  />
                  <input
                    type="text"
                    value={coursesData.beginnerVideoUrl}
                    onChange={(e) =>
                      setCoursesData({
                        ...coursesData,
                        beginnerVideoUrl: e.target.value,
                      })
                    }
                    className="w-full border p-2 rounded"
                    placeholder="URL видео"
                  />
                </div>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-bold mb-4 text-lg">Профессионал дастур</h3>
                <div className="grid gap-4">
                  <input
                    type="text"
                    value={coursesData.professionalTitle}
                    onChange={(e) =>
                      setCoursesData({
                        ...coursesData,
                        professionalTitle: e.target.value,
                      })
                    }
                    className="w-full border p-2 rounded"
                    placeholder="Заголовок"
                  />
                  <input
                    type="text"
                    value={coursesData.professionalDuration}
                    onChange={(e) =>
                      setCoursesData({
                        ...coursesData,
                        professionalDuration: e.target.value,
                      })
                    }
                    className="w-full border p-2 rounded"
                    placeholder="Давомийлиги: 5 ой"
                  />
                  <input
                    type="text"
                    value={coursesData.professionalCourse1Title}
                    onChange={(e) =>
                      setCoursesData({
                        ...coursesData,
                        professionalCourse1Title: e.target.value,
                      })
                    }
                    className="w-full border p-2 rounded"
                    placeholder="1-2 курс: Бошланғич пакет"
                  />
                  <input
                    type="text"
                    value={coursesData.professionalCourse1Desc}
                    onChange={(e) =>
                      setCoursesData({
                        ...coursesData,
                        professionalCourse1Desc: e.target.value,
                      })
                    }
                    className="w-full border p-2 rounded"
                    placeholder="Описание"
                  />
                  <input
                    type="text"
                    value={coursesData.professionalCourse2Title}
                    onChange={(e) =>
                      setCoursesData({
                        ...coursesData,
                        professionalCourse2Title: e.target.value,
                      })
                    }
                    className="w-full border p-2 rounded"
                    placeholder="3-курс"
                  />
                  <input
                    type="text"
                    value={coursesData.professionalCourse2Desc}
                    onChange={(e) =>
                      setCoursesData({
                        ...coursesData,
                        professionalCourse2Desc: e.target.value,
                      })
                    }
                    className="w-full border p-2 rounded"
                    placeholder="Описание"
                  />
                  <input
                    type="text"
                    value={coursesData.professionalVideoUrl}
                    onChange={(e) =>
                      setCoursesData({
                        ...coursesData,
                        professionalVideoUrl: e.target.value,
                      })
                    }
                    className="w-full border p-2 rounded"
                    placeholder="URL видео"
                  />
                </div>
              </div>

              <button
                onClick={saveCoursesData}
                disabled={saving}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 disabled:opacity-50"
              >
                <HiSave className="inline mr-2" />
                {saving ? 'Сохранение...' : 'Сохранить'}
              </button>
            </div>
          </div>
        );

      case 'diploma':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Секция "Диплом"</h2>
            <div className="grid gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Заголовок секции
                </label>
                <input
                  type="text"
                  value={diplomaData.sectionTitle}
                  onChange={(e) =>
                    setDiplomaData({
                      ...diplomaData,
                      sectionTitle: e.target.value,
                    })
                  }
                  className="w-full border p-3 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Подзаголовок
                </label>
                <input
                  type="text"
                  value={diplomaData.sectionSubtitle}
                  onChange={(e) =>
                    setDiplomaData({
                      ...diplomaData,
                      sectionSubtitle: e.target.value,
                    })
                  }
                  className="w-full border p-3 rounded-lg"
                />
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-bold mb-4">Блок 1</h3>
                <input
                  type="text"
                  value={diplomaData.diplomaBlock1Title}
                  onChange={(e) =>
                    setDiplomaData({
                      ...diplomaData,
                      diplomaBlock1Title: e.target.value,
                    })
                  }
                  className="w-full border p-2 rounded mb-2"
                  placeholder="Заголовок блока"
                />
                <textarea
                  value={diplomaData.diplomaBlock1Text}
                  onChange={(e) =>
                    setDiplomaData({
                      ...diplomaData,
                      diplomaBlock1Text: e.target.value,
                    })
                  }
                  className="w-full border p-2 rounded"
                  rows="3"
                  placeholder="Текст блока"
                />
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-bold mb-4">Блок 2</h3>
                <input
                  type="text"
                  value={diplomaData.diplomaBlock2Title}
                  onChange={(e) =>
                    setDiplomaData({
                      ...diplomaData,
                      diplomaBlock2Title: e.target.value,
                    })
                  }
                  className="w-full border p-2 rounded mb-2"
                  placeholder="Заголовок блока"
                />
                <textarea
                  value={diplomaData.diplomaBlock2Text}
                  onChange={(e) =>
                    setDiplomaData({
                      ...diplomaData,
                      diplomaBlock2Text: e.target.value,
                    })
                  }
                  className="w-full border p-2 rounded"
                  rows="3"
                  placeholder="Текст блока"
                />
              </div>
              <button
                onClick={saveDiplomaData}
                disabled={saving}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 disabled:opacity-50"
              >
                <HiSave className="inline mr-2" />
                {saving ? 'Сохранение...' : 'Сохранить'}
              </button>
            </div>
          </div>
        );

      case 'mentorship':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Менторство</h2>
            <div className="bg-gray-50 p-4 rounded-lg space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Заголовок секции
                </label>
                <input
                  type="text"
                  value={mentorshipData.sectionTitle}
                  onChange={(e) =>
                    setMentorshipData({
                      ...mentorshipData,
                      sectionTitle: e.target.value,
                    })
                  }
                  className="w-full border p-2 rounded"
                  placeholder="Ментор:"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Описание
                </label>
                <textarea
                  value={mentorshipData.sectionDescription}
                  onChange={(e) =>
                    setMentorshipData({
                      ...mentorshipData,
                      sectionDescription: e.target.value,
                    })
                  }
                  className="w-full border p-2 rounded"
                  rows="3"
                />
              </div>
              <button
                onClick={saveMentorshipSettings}
                disabled={saving}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Сохранить настройки
              </button>
            </div>

            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold">Характеристики ментора</h3>
              <button
                onClick={() => {
                  setMentorshipEditData(null);
                  setMentorshipFormData({ title: '', order: 0 });
                  setMentorshipModalOpen(true);
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
              >
                <HiPlus /> Добавить
              </button>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {mentorshipItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-4 rounded-lg shadow border flex justify-between items-start"
                >
                  <div>
                    <h3 className="font-bold">{item.title}</h3>
                    <p className="text-xs text-gray-400 mt-1">
                      Порядок: {item.order}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setMentorshipEditData(item);
                        setMentorshipFormData(item);
                        setMentorshipModalOpen(true);
                      }}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <HiPencilAlt className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleMentorshipDelete(item.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <HiTrash className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <Modal
              isOpen={mentorshipModalOpen}
              onClose={() => setMentorshipModalOpen(false)}
              title={mentorshipEditData ? 'Редактировать' : 'Добавить'}
            >
              <form
                onSubmit={handleMentorshipAddOrUpdate}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Характеристика *
                  </label>
                  <input
                    type="text"
                    value={mentorshipFormData.title}
                    onChange={(e) =>
                      setMentorshipFormData({
                        ...mentorshipFormData,
                        title: e.target.value,
                      })
                    }
                    className="w-full border p-2 rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Порядок
                  </label>
                  <input
                    type="number"
                    value={mentorshipFormData.order}
                    onChange={(e) =>
                      setMentorshipFormData({
                        ...mentorshipFormData,
                        order: Number(e.target.value),
                      })
                    }
                    className="w-full border p-2 rounded"
                  />
                </div>
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setMentorshipModalOpen(false)}
                    className="flex-1 bg-gray-200 py-2 rounded"
                  >
                    Отмена
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white py-2 rounded"
                  >
                    Сохранить
                  </button>
                </div>
              </form>
            </Modal>
          </div>
        );

      case 'individual':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">
              Индивидуальный ментор (Premium)
            </h2>
            <div className="bg-gray-50 p-4 rounded-lg space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Заголовок
                </label>
                <input
                  type="text"
                  value={individualData.sectionTitle}
                  onChange={(e) =>
                    setIndividualData({
                      ...individualData,
                      sectionTitle: e.target.value,
                    })
                  }
                  className="w-full border p-2 rounded"
                  placeholder="PREMIUM"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Подзаголовок
                </label>
                <input
                  type="text"
                  value={individualData.sectionSubtitle}
                  onChange={(e) =>
                    setIndividualData({
                      ...individualData,
                      sectionSubtitle: e.target.value,
                    })
                  }
                  className="w-full border p-2 rounded"
                  placeholder="INDIVIDUAL MENTOR"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Описание
                </label>
                <textarea
                  value={individualData.sectionDescription}
                  onChange={(e) =>
                    setIndividualData({
                      ...individualData,
                      sectionDescription: e.target.value,
                    })
                  }
                  className="w-full border p-2 rounded"
                  rows="3"
                />
              </div>
              <button
                onClick={saveIndividualSettings}
                disabled={saving}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Сохранить настройки
              </button>
            </div>

            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold">Преимущества Premium</h3>
              <button
                onClick={() => {
                  setIndividualEditData(null);
                  setIndividualFormData({ title: '', order: 0 });
                  setIndividualModalOpen(true);
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
              >
                <HiPlus /> Добавить
              </button>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {individualItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-4 rounded-lg shadow border flex justify-between items-start"
                >
                  <div>
                    <h3 className="font-bold">{item.title}</h3>
                    <p className="text-xs text-gray-400 mt-1">
                      Порядок: {item.order}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setIndividualEditData(item);
                        setIndividualFormData(item);
                        setIndividualModalOpen(true);
                      }}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <HiPencilAlt className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleIndividualDelete(item.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <HiTrash className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <Modal
              isOpen={individualModalOpen}
              onClose={() => setIndividualModalOpen(false)}
              title={individualEditData ? 'Редактировать' : 'Добавить'}
            >
              <form
                onSubmit={handleIndividualAddOrUpdate}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Преимущество *
                  </label>
                  <input
                    type="text"
                    value={individualFormData.title}
                    onChange={(e) =>
                      setIndividualFormData({
                        ...individualFormData,
                        title: e.target.value,
                      })
                    }
                    className="w-full border p-2 rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Порядок
                  </label>
                  <input
                    type="number"
                    value={individualFormData.order}
                    onChange={(e) =>
                      setIndividualFormData({
                        ...individualFormData,
                        order: Number(e.target.value),
                      })
                    }
                    className="w-full border p-2 rounded"
                  />
                </div>
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setIndividualModalOpen(false)}
                    className="flex-1 bg-gray-200 py-2 rounded"
                  >
                    Отмена
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white py-2 rounded"
                  >
                    Сохранить
                  </button>
                </div>
              </form>
            </Modal>
          </div>
        );

      case 'pricing':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Цены</h2>
            <div className="grid gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Заголовок секции
                </label>
                <input
                  type="text"
                  value={pricingData.sectionTitle}
                  onChange={(e) =>
                    setPricingData({
                      ...pricingData,
                      sectionTitle: e.target.value,
                    })
                  }
                  className="w-full border p-3 rounded-lg"
                />
              </div>

              <div className="bg-orange-50 p-4 rounded-lg">
                <h3 className="font-bold mb-4">Бошланғич пакет</h3>
                <div className="grid gap-4">
                  <input
                    type="text"
                    value={pricingData.beginnerPackageTitle}
                    onChange={(e) =>
                      setPricingData({
                        ...pricingData,
                        beginnerPackageTitle: e.target.value,
                      })
                    }
                    className="w-full border p-2 rounded"
                    placeholder="Бошланғич пакет (2 ой)"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      value={pricingData.beginnerCourse1Title}
                      onChange={(e) =>
                        setPricingData({
                          ...pricingData,
                          beginnerCourse1Title: e.target.value,
                        })
                      }
                      className="w-full border p-2 rounded"
                      placeholder="1-курс название"
                    />
                    <input
                      type="text"
                      value={pricingData.beginnerCourse1Price}
                      onChange={(e) =>
                        setPricingData({
                          ...pricingData,
                          beginnerCourse1Price: e.target.value,
                        })
                      }
                      className="w-full border p-2 rounded"
                      placeholder="8 МЛН"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      value={pricingData.beginnerCourse2Title}
                      onChange={(e) =>
                        setPricingData({
                          ...pricingData,
                          beginnerCourse2Title: e.target.value,
                        })
                      }
                      className="w-full border p-2 rounded"
                      placeholder="2-курс название"
                    />
                    <input
                      type="text"
                      value={pricingData.beginnerCourse2Price}
                      onChange={(e) =>
                        setPricingData({
                          ...pricingData,
                          beginnerCourse2Price: e.target.value,
                        })
                      }
                      className="w-full border p-2 rounded"
                      placeholder="12 МЛН"
                    />
                  </div>
                  <input
                    type="text"
                    value={pricingData.beginnerTotalPrice}
                    onChange={(e) =>
                      setPricingData({
                        ...pricingData,
                        beginnerTotalPrice: e.target.value,
                      })
                    }
                    className="w-full border p-2 rounded"
                    placeholder="Умумий қиймат: 20 МЛН со'м"
                  />
                  <input
                    type="text"
                    value={pricingData.beginnerTotalNote}
                    onChange={(e) =>
                      setPricingData({
                        ...pricingData,
                        beginnerTotalNote: e.target.value,
                      })
                    }
                    className="w-full border p-2 rounded"
                    placeholder="Примечание"
                  />
                </div>
              </div>

              <div className="bg-teal-50 p-4 rounded-lg">
                <h3 className="font-bold mb-4">Қўшимча имконият</h3>
                <div className="grid gap-4">
                  <input
                    type="text"
                    value={pricingData.additionalTitle}
                    onChange={(e) =>
                      setPricingData({
                        ...pricingData,
                        additionalTitle: e.target.value,
                      })
                    }
                    className="w-full border p-2 rounded"
                    placeholder="Қўшимча имкониат"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      value={pricingData.additionalCourse1Title}
                      onChange={(e) =>
                        setPricingData({
                          ...pricingData,
                          additionalCourse1Title: e.target.value,
                        })
                      }
                      className="w-full border p-2 rounded"
                      placeholder="1-курс Individual mentorlik"
                    />
                    <input
                      type="text"
                      value={pricingData.additionalCourse1Price}
                      onChange={(e) =>
                        setPricingData({
                          ...pricingData,
                          additionalCourse1Price: e.target.value,
                        })
                      }
                      className="w-full border p-2 rounded"
                      placeholder="4 МЛН"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      value={pricingData.additionalCourse2Title}
                      onChange={(e) =>
                        setPricingData({
                          ...pricingData,
                          additionalCourse2Title: e.target.value,
                        })
                      }
                      className="w-full border p-2 rounded"
                      placeholder="2-курс Individual mentorlik"
                    />
                    <input
                      type="text"
                      value={pricingData.additionalCourse2Price}
                      onChange={(e) =>
                        setPricingData({
                          ...pricingData,
                          additionalCourse2Price: e.target.value,
                        })
                      }
                      className="w-full border p-2 rounded"
                      placeholder="6 МЛН"
                    />
                  </div>
                  <input
                    type="text"
                    value={pricingData.additionalResultNote}
                    onChange={(e) =>
                      setPricingData({
                        ...pricingData,
                        additionalResultNote: e.target.value,
                      })
                    }
                    className="w-full border p-2 rounded"
                    placeholder="Натижа текст"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Футер примечание
                </label>
                <input
                  type="text"
                  value={pricingData.footerNote}
                  onChange={(e) =>
                    setPricingData({
                      ...pricingData,
                      footerNote: e.target.value,
                    })
                  }
                  className="w-full border p-2 rounded"
                />
              </div>

              <button
                onClick={savePricingData}
                disabled={saving}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 disabled:opacity-50"
              >
                <HiSave className="inline mr-2" />
                {saving ? 'Сохранение...' : 'Сохранить'}
              </button>
            </div>
          </div>
        );

      case 'team':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Команда Академии</h2>
              <button
                onClick={() => {
                  setTeamEditData(null);
                  setTeamFormData({
                    name: '',
                    role: '',
                    bio: '',
                    photoBase64: '',
                    photoName: '',
                    order: 0,
                  });
                  setTeamModalOpen(true);
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
              >
                <HiPlus /> Добавить члена команды
              </button>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {teamMembers.map((member) => (
                <div
                  key={member.id}
                  className="bg-white p-4 rounded-lg shadow border"
                >
                  <div className="flex gap-4">
                    {member.photoBase64 ? (
                      <img
                        src={member.photoBase64}
                        alt={member.name}
                        className="w-20 h-20 rounded-lg object-cover"
                      />
                    ) : (
                      <div className="w-20 h-20 rounded-lg bg-gray-200 flex items-center justify-center text-3xl">
                        👤
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="font-bold">{member.name}</h3>
                      <p className="text-sm text-blue-600">{member.role}</p>
                      {member.bio && (
                        <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                          {member.bio}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 mt-4">
                    <button
                      onClick={() => {
                        setTeamEditData(member);
                        setTeamFormData(member);
                        setTeamModalOpen(true);
                      }}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <HiPencilAlt className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleTeamDelete(member.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <HiTrash className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <Modal
              isOpen={teamModalOpen}
              onClose={() => setTeamModalOpen(false)}
              title={teamEditData ? 'Редактировать' : 'Добавить члена команды'}
            >
              <form
                onSubmit={handleTeamAddOrUpdate}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Имя *
                  </label>
                  <input
                    type="text"
                    value={teamFormData.name}
                    onChange={(e) =>
                      setTeamFormData({ ...teamFormData, name: e.target.value })
                    }
                    className="w-full border p-2 rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Должность *
                  </label>
                  <input
                    type="text"
                    value={teamFormData.role}
                    onChange={(e) =>
                      setTeamFormData({ ...teamFormData, role: e.target.value })
                    }
                    className="w-full border p-2 rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Биография
                  </label>
                  <textarea
                    value={teamFormData.bio}
                    onChange={(e) =>
                      setTeamFormData({ ...teamFormData, bio: e.target.value })
                    }
                    className="w-full border p-2 rounded"
                    rows="3"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Фото</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleTeamPhotoChange}
                    className="w-full border p-2 rounded"
                  />
                  {teamFormData.photoBase64 && (
                    <img
                      src={teamFormData.photoBase64}
                      alt="Preview"
                      className="mt-2 w-20 h-20 object-cover rounded"
                    />
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Порядок
                  </label>
                  <input
                    type="number"
                    value={teamFormData.order}
                    onChange={(e) =>
                      setTeamFormData({
                        ...teamFormData,
                        order: Number(e.target.value),
                      })
                    }
                    className="w-full border p-2 rounded"
                  />
                </div>
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setTeamModalOpen(false)}
                    className="flex-1 bg-gray-200 py-2 rounded"
                  >
                    Отмена
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white py-2 rounded"
                  >
                    Сохранить
                  </button>
                </div>
              </form>
            </Modal>
          </div>
        );

      case 'freeLesson':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Бесплатный урок</h2>
            <div className="bg-gray-50 p-4 rounded-lg space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Заголовок секции
                </label>
                <input
                  type="text"
                  value={freeLessonData.sectionTitle}
                  onChange={(e) =>
                    setFreeLessonData({
                      ...freeLessonData,
                      sectionTitle: e.target.value,
                    })
                  }
                  className="w-full border p-2 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Тема урока
                </label>
                <input
                  type="text"
                  value={freeLessonData.topic}
                  onChange={(e) =>
                    setFreeLessonData({
                      ...freeLessonData,
                      topic: e.target.value,
                    })
                  }
                  className="w-full border p-2 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Описание темы
                </label>
                <textarea
                  value={freeLessonData.topicDescription}
                  onChange={(e) =>
                    setFreeLessonData({
                      ...freeLessonData,
                      topicDescription: e.target.value,
                    })
                  }
                  className="w-full border p-2 rounded"
                  rows="3"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Дата</label>
                  <input
                    type="text"
                    value={freeLessonData.date}
                    onChange={(e) =>
                      setFreeLessonData({
                        ...freeLessonData,
                        date: e.target.value,
                      })
                    }
                    className="w-full border p-2 rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Продолжительность
                  </label>
                  <input
                    type="text"
                    value={freeLessonData.duration}
                    onChange={(e) =>
                      setFreeLessonData({
                        ...freeLessonData,
                        duration: e.target.value,
                      })
                    }
                    className="w-full border p-2 rounded"
                    placeholder="2 соат"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  О местах
                </label>
                <input
                  type="text"
                  value={freeLessonData.seatsNote}
                  onChange={(e) =>
                    setFreeLessonData({
                      ...freeLessonData,
                      seatsNote: e.target.value,
                    })
                  }
                  className="w-full border p-2 rounded"
                  placeholder="Жойлар сони чекланган"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  О регистрации
                </label>
                <input
                  type="text"
                  value={freeLessonData.registrationNote}
                  onChange={(e) =>
                    setFreeLessonData({
                      ...freeLessonData,
                      registrationNote: e.target.value,
                    })
                  }
                  className="w-full border p-2 rounded"
                  placeholder="Рўйхатдан ўтиш учун:"
                />
              </div>
              <button
                onClick={saveFreeLessonData}
                disabled={saving}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Сохранить настройки
              </button>
            </div>

            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold">Пункты "Что узнаете"</h3>
              <button
                onClick={() => {
                  setLearningPointEditData(null);
                  setLearningPointFormData({ text: '', order: 0 });
                  setLearningPointModalOpen(true);
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
              >
                <HiPlus /> Добавить
              </button>
            </div>
            <div className="grid gap-4">
              {learningPoints.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-4 rounded-lg shadow border flex justify-between items-start"
                >
                  <div>
                    <p>{item.text}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      Порядок: {item.order}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setLearningPointEditData(item);
                        setLearningPointFormData(item);
                        setLearningPointModalOpen(true);
                      }}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <HiPencilAlt className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleLearningPointDelete(item.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <HiTrash className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <Modal
              isOpen={learningPointModalOpen}
              onClose={() => setLearningPointModalOpen(false)}
              title={learningPointEditData ? 'Редактировать' : 'Добавить'}
            >
              <form
                onSubmit={handleLearningPointAddOrUpdate}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Текст *
                  </label>
                  <textarea
                    value={learningPointFormData.text}
                    onChange={(e) =>
                      setLearningPointFormData({
                        ...learningPointFormData,
                        text: e.target.value,
                      })
                    }
                    className="w-full border p-2 rounded"
                    rows="3"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Порядок
                  </label>
                  <input
                    type="number"
                    value={learningPointFormData.order}
                    onChange={(e) =>
                      setLearningPointFormData({
                        ...learningPointFormData,
                        order: Number(e.target.value),
                      })
                    }
                    className="w-full border p-2 rounded"
                  />
                </div>
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setLearningPointModalOpen(false)}
                    className="flex-1 bg-gray-200 py-2 rounded"
                  >
                    Отмена
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white py-2 rounded"
                  >
                    Сохранить
                  </button>
                </div>
              </form>
            </Modal>
          </div>
        );

      case 'contact':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Контактная информация</h2>
            <div className="grid gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Заголовок секции
                </label>
                <input
                  type="text"
                  value={contactData.sectionTitle}
                  onChange={(e) =>
                    setContactData({
                      ...contactData,
                      sectionTitle: e.target.value,
                    })
                  }
                  className="w-full border p-3 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Описание
                </label>
                <textarea
                  value={contactData.sectionDescription}
                  onChange={(e) =>
                    setContactData({
                      ...contactData,
                      sectionDescription: e.target.value,
                    })
                  }
                  className="w-full border p-3 rounded-lg"
                  rows="2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Заголовок формы
                </label>
                <input
                  type="text"
                  value={contactData.formTitle}
                  onChange={(e) =>
                    setContactData({
                      ...contactData,
                      formTitle: e.target.value,
                    })
                  }
                  className="w-full border p-3 rounded-lg"
                  placeholder="Қўнғироқ қолдиринг"
                />
              </div>

              <div className="bg-gray-50 p-4 rounded-lg grid gap-4">
                <h3 className="font-bold">Контакты</h3>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    value={contactData.phone}
                    onChange={(e) =>
                      setContactData({ ...contactData, phone: e.target.value })
                    }
                    className="w-full border p-2 rounded"
                    placeholder="Телефон текст"
                  />
                  <input
                    type="text"
                    value={contactData.phoneLink}
                    onChange={(e) =>
                      setContactData({
                        ...contactData,
                        phoneLink: e.target.value,
                      })
                    }
                    className="w-full border p-2 rounded"
                    placeholder="tel:+998901234567"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    value={contactData.telegram}
                    onChange={(e) =>
                      setContactData({
                        ...contactData,
                        telegram: e.target.value,
                      })
                    }
                    className="w-full border p-2 rounded"
                    placeholder="Telegram текст"
                  />
                  <input
                    type="text"
                    value={contactData.telegramLink}
                    onChange={(e) =>
                      setContactData({
                        ...contactData,
                        telegramLink: e.target.value,
                      })
                    }
                    className="w-full border p-2 rounded"
                    placeholder="https://t.me/..."
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    value={contactData.facebook}
                    onChange={(e) =>
                      setContactData({
                        ...contactData,
                        facebook: e.target.value,
                      })
                    }
                    className="w-full border p-2 rounded"
                    placeholder="Facebook текст"
                  />
                  <input
                    type="text"
                    value={contactData.facebookLink}
                    onChange={(e) =>
                      setContactData({
                        ...contactData,
                        facebookLink: e.target.value,
                      })
                    }
                    className="w-full border p-2 rounded"
                    placeholder="https://facebook.com/..."
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    value={contactData.whatsapp}
                    onChange={(e) =>
                      setContactData({
                        ...contactData,
                        whatsapp: e.target.value,
                      })
                    }
                    className="w-full border p-2 rounded"
                    placeholder="WhatsApp текст"
                  />
                  <input
                    type="text"
                    value={contactData.whatsappLink}
                    onChange={(e) =>
                      setContactData({
                        ...contactData,
                        whatsappLink: e.target.value,
                      })
                    }
                    className="w-full border p-2 rounded"
                    placeholder="https://wa.me/..."
                  />
                </div>
              </div>

              <button
                onClick={saveContactData}
                disabled={saving}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 disabled:opacity-50"
              >
                <HiSave className="inline mr-2" />
                {saving ? 'Сохранение...' : 'Сохранить'}
              </button>
            </div>
          </div>
        );

      default:
        return <div>Выберите вкладку</div>;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl">Загрузка...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="py-8 px-4">
        <h1 className="text-3xl font-bold text-center mb-8">
          УПРАВЛЕНИЕ АКАДЕМИЕЙ
        </h1>

        {/* Tabs */}
        <div className="max-w-7xl mx-auto mb-8">
          <div className="flex flex-wrap gap-2 bg-white p-4 rounded-lg shadow">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto bg-white p-6 rounded-lg shadow">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
}
