import React from 'react';
import { protocolColors, fonts } from '../styles/tokens';

const ProtoBadge = ({ protocol }) => {
  const style = protocolColors[protocol] || protocolColors.REST;
  
  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '4px',
      padding: '2px 8px',
      borderRadius: '4px',
      backgroundColor: style.bg,
      color: style.text,
      fontSize: '11px',
      fontWeight: '700',
      fontFamily: fonts.mono,
      textTransform: 'uppercase',
    }}>
      <span style={{
        width: '4px',
        height: '4px',
        borderRadius: '50%',
        backgroundColor: style.dot,
      }} />
      {protocol}
    </div>
  );
};

export default ProtoBadge;
