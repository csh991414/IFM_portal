import React from 'react';
import { statusMap } from '../styles/tokens';

const StatusBadge = ({ status }) => {
  const config = statusMap[status] || statusMap.inactive;
  
  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
      padding: '2px 8px',
      borderRadius: '4px',
      backgroundColor: config.bg,
      color: config.color,
      fontSize: '11px',
      fontWeight: '600',
    }}>
      <span style={{
        width: '6px',
        height: '6px',
        borderRadius: '50%',
        backgroundColor: config.color,
      }} />
      {config.label}
    </div>
  );
};

export default StatusBadge;
