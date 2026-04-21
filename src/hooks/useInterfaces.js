import { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { MOCK_INTERFACES } from '../data/mockData';

export const useInterfaces = () => {
  const [interfaces, setInterfaces] = useState(MOCK_INTERFACES);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const interfacesRef = collection(db, 'interfaces');
    const q = query(interfacesRef, orderBy('id', 'asc'));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          ...doc.data(),
          _id: doc.id, // Firestore 문서 ID (수정/삭제 시 필요)
        }));
        
        // 데이터가 비어있으면 mockData 유지, 있으면 Firestore 데이터로 교체
        if (data.length > 0) {
          setInterfaces(data);
        }
        setLoading(false);
      },
      (err) => {
        console.error('Firestore 데이터 구독 오류:', err);
        setError(err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return { interfaces, loading, error };
};
