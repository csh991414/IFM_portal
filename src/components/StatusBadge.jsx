import React from 'react';
import { statusMap } from '../styles/tokens';

export default function StatusBadge({ status }) {
  const config = statusMap[status] || statusMap.inactive;
  
  const style = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    backgroundColor: config.bg,
    color: config.color,
    padding: '2px 8px',
    borderRadius: '4px',
    fontSize: '11px',
    fontWeight: 'bold',
  };

  const dotStyle = {
    width: '5px',
    height: '5px',
    borderRadius: '50%',
    backgroundColor: config.color,
  };

  return (
    <div style={style}>
      <span style={dotStyle} />
      {config.label}
    </div>
  );
}
