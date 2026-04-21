import React from 'react';
import { protocolColors, fonts } from '../styles/tokens';

export default function ProtoBadge({ protocol }) {
  const config = protocolColors[protocol] || { bg: '#F2F3F5', text: '#9EA7B4', dot: '#9EA7B4' };
  
  const style = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    backgroundColor: config.bg,
    color: config.text,
    padding: '2px 8px',
    borderRadius: '4px',
    fontSize: '11px',
    fontWeight: 'bold',
    fontFamily: fonts.mono,
  };

  const dotStyle = {
    width: '5px',
    height: '5px',
    borderRadius: '50%',
    backgroundColor: config.dot,
  };

  return (
    <div style={style}>
      <span style={dotStyle} />
      {protocol}
    </div>
  );
}
