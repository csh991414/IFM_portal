import React from 'react';
import { colors } from '../styles/tokens';

const Spark = ({ color = colors.primary, points = 12 }) => {
  // Generate random points for sparkline
  const data = Array.from({ length: points }, () => Math.floor(Math.random() * 20));
  
  const width = 60;
  const height = 20;
  const max = Math.max(...data, 1);
  
  const pathData = data.map((val, i) => {
    const x = (i / (points - 1)) * width;
    const y = height - (val / max) * height;
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={pathData}
      />
    </svg>
  );
};

export default Spark;
