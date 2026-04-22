import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCf2XGyLKKqgFmGn8XC0QLEEgseveiSkFY",
  authDomain: "ifm-portal.firebaseapp.com",
  projectId: "ifm-portal",
  storageBucket: "ifm-portal.firebasestorage.app",
  messagingSenderId: "569318005429",
  appId: "1:569318005429:web:289dc49b16276dc649fcfc"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
