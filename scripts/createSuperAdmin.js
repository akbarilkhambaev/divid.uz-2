/**
 * Скрипт для создания суперадмина в Firestore
 * Запуск: node scripts/createSuperAdmin.js
 */

const { initializeApp } = require('firebase/app');
const {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
} = require('firebase/firestore');

// Firebase конфигурация
const firebaseConfig = {
  apiKey: 'AIzaSyB-ML5qHfsXw9LEKNNB6k5JXC-hiSHaSo',
  authDomain: 'divid-d1d33.firebaseapp.com',
  projectId: 'divid-d1d33',
  storageBucket: 'divid-d1d33.appspot.com',
  messagingSenderId: '134046507388',
  appId: '1:134046507388:web:69fc0fbb30edc552be84f9',
  measurementId: 'G-40406YW57K',
};

// Инициализация Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Функция создания суперадмина
async function createSuperAdmin() {
  try {
    console.log('🚀 Создание суперадмина...\n');

    // Данные суперадмина (можно изменить)
    const adminData = {
      username: 'admin',
      email: 'admin@divid.uz',
      password: 'admin123', // ⚠️ В production используйте хеширование!
      role: 'superadmin',
      isActive: true,
      createdAt: serverTimestamp(),
    };

    // Добавление в Firestore
    const docRef = await addDoc(collection(db, 'administrators'), adminData);

    console.log('✅ Суперадмин успешно создан!\n');
    console.log('📋 Данные для входа:');
    console.log('   Username: ' + adminData.username);
    console.log('   Password: ' + adminData.password);
    console.log('   Email: ' + adminData.email);
    console.log('   Role: ' + adminData.role);
    console.log('\n🔗 Войти: http://localhost:3000/admin/login\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Ошибка создания администратора:', error);
    process.exit(1);
  }
}

// Запуск
createSuperAdmin();
