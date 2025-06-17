// lib/firebase.js

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyB-ML5qHfsXw9LEKNNB6k5JXC-hiSHaSo',
  authDomain: 'divid-d1d33.firebaseapp.com',
  projectId: 'divid-d1d33',
  storageBucket: 'divid-d1d33.appspot.com',
  messagingSenderId: '134046507388',
  appId: '1:134046507388:web:69fc0fbb30edc552be84f9',
  measurementId: 'G-40406YW57K',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
