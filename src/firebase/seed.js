import { db } from './config';
import { collection, addDoc, serverTimestamp, getDocs, query, limit } from 'firebase/firestore';
import { MOCK_INTERFACES } from '../data/mockData';

export const seedFirestore = async () => {
  try {
    // 중복 방지를 위해 데이터가 이미 있는지 확인
    const q = query(collection(db, 'interfaces'), limit(1));
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      console.log('Firestore에 이미 데이터가 존재합니다. 시드를 건너뜁니다.');
      return;
    }

    console.log('Firestore 시드 시작...');
    const interfacesRef = collection(db, 'interfaces');

    for (const item of MOCK_INTERFACES) {
      await addDoc(interfacesRef, {
        ...item,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    }

    console.log('Firestore 시드 완료');
  } catch (error) {
    console.error('Firestore 시드 중 오류 발생:', error);
  }
};
