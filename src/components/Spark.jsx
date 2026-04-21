import React, { useMemo } from 'react';
import { colors } from '../styles/tokens';

export default function Spark({ status }) {
  const points = useMemo(() => {
    return Array.from({ length: 12 }).map((_, i) => ({
      x: i * 5,
      y: Math.random() * 20,
    }));
  }, []);

  const pathData = useMemo(() => {
    return `M ${points.map(p => `${p.x},${p.y}`).join(' L ')}`;
  }, [points]);

  const color = status === 'error' ? colors.error : colors.primary;

  return (
    <svg width="60" height="20" viewBox="0 0 55 20" style={{ display: 'block' }}>
      <path
        d={pathData}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
