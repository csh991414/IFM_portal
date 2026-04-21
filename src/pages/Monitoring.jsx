import React, { useState, useEffect, useRef } from 'react';
import { colors, fonts } from '../styles/tokens';
import { MOCK_INTERFACES } from '../data/mockData';
import ProtoBadge from '../components/ProtoBadge';
import StatusBadge from '../components/StatusBadge';

export default function Monitoring() {
  const [transactions, setTransactions] = useState([]);
  const [isLive, setIsLive] = useState(true);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      const iface = MOCK_INTERFACES[Math.floor(Math.random() * MOCK_INTERFACES.length)];
      const newTx = {
        id: `TX-${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
        time: new Date().toLocaleTimeString('ko-KR', { hour12: false }),
        ifName: iface.name,
        protocol: iface.protocol,
        status: Math.random() > 0.95 ? 'error' : (Math.random() > 0.9 ? 'warning' : 'active'),
        latency: Math.floor(Math.random() * 200),
        size: (Math.random() * 5).toFixed(1) + 'KB',
        isNew: true,
      };

      setTransactions(prev => [newTx, ...prev].slice(0, 50));

      // Remove "isNew" flag after 1s for animation
      setTimeout(() => {
        setTransactions(prev => prev.map(tx => tx.id === newTx.id ? { ...tx, isNew: false } : tx));
      }, 1000);
    }, 1800);

    return () => clearInterval(interval);
  }, [isLive]);

  const containerStyle = {
    padding: '24px',
    display: 'flex',
    gap: '24px',
    height: '100%',
    overflow: 'hidden',
  };

  const mainStyle = {
    flex: 1,
    backgroundColor: '#FFF',
    borderRadius: '10px',
    border: `1px solid ${colors.border}`,
    display: 'flex',
    flexDirection: 'column',
  };

  const headerStyle = {
    padding: '16px 20px',
    borderBottom: `1px solid ${colors.border}`,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const liveBadgeStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '12px',
    fontWeight: 'bold',
    color: colors.success,
  };

  const pulseStyle = {
    width: '8px',
    height: '8px',
    backgroundColor: colors.success,
    borderRadius: '50%',
    animation: 'pulse 1.5s infinite',
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    textAlign: 'left',
  };

  const thStyle = {
    padding: '12px 20px',
    fontSize: '11px',
    color: colors.textMuted,
    borderBottom: `1px solid ${colors.borderLight}`,
    backgroundColor: colors.surfaceAlt,
    position: 'sticky',
    top: 0,
  };

  const tdStyle = (isNew) => ({
    padding: '12px 20px',
    fontSize: '12px',
    borderBottom: `1px solid ${colors.borderLight}`,
    animation: isNew ? 'flash 1s' : 'none',
    transition: 'background-color 0.5s',
  });

  const sideStyle = {
    width: '260px',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  };

  const cardStyle = {
    backgroundColor: '#FFF',
    borderRadius: '10px',
    border: `1px solid ${colors.border}`,
    padding: '20px',
  };

  return (
    <div style={containerStyle}>
      <div style={mainStyle}>
        <div style={headerStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <h3 style={{ fontSize: '15px' }}>실시간 트랜잭션 스트림</h3>
            <div style={liveBadgeStyle}>
              <div style={pulseStyle} />
              LIVE
            </div>
          </div>
          <button 
            onClick={() => setIsLive(!isLive)}
            style={{
              padding: '6px 12px',
              borderRadius: '6px',
              border: `1px solid ${colors.border}`,
              backgroundColor: '#FFF',
              fontSize: '12px',
              cursor: 'pointer',
            }}
          >
            {isLive ? '중지' : '시작'}
          </button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto' }}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>시각</th>
                <th style={thStyle}>TxID</th>
                <th style={thStyle}>인터페이스</th>
                <th style={thStyle}>프로토콜</th>
                <th style={thStyle}>상태</th>
                <th style={thStyle}>응답(ms)</th>
                <th style={thStyle}>크기</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map(tx => (
                <tr key={tx.id}>
                  <td style={tdStyle(tx.isNew)}>{tx.time}</td>
                  <td style={{ ...tdStyle(tx.isNew), fontFamily: fonts.mono, fontWeight: 'bold' }}>{tx.id}</td>
                  <td style={{ ...tdStyle(tx.isNew), fontWeight: '500' }}>{tx.ifName}</td>
                  <td style={tdStyle(tx.isNew)}><ProtoBadge protocol={tx.protocol} /></td>
                  <td style={tdStyle(tx.isNew)}><StatusBadge status={tx.status} /></td>
                  <td style={{ ...tdStyle(tx.isNew), color: tx.latency > 150 ? colors.error : colors.textPrimary }}>{tx.latency}</td>
                  <td style={tdStyle(tx.isNew)}>{tx.size}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div style={sideStyle}>
        <div style={cardStyle}>
          <h4 style={{ fontSize: '13px', marginBottom: '16px' }}>프로토콜별 TPS</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {['REST', 'SOAP', 'MQ', 'Batch', 'SFTP'].map(p => {
              const val = Math.floor(Math.random() * 50);
              return (
                <div key={p}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '4px' }}>
                    <span>{p}</span>
                    <span style={{ fontWeight: 'bold' }}>{val} TPS</span>
                  </div>
                  <div style={{ height: '4px', backgroundColor: colors.borderLight, borderRadius: '2px' }}>
                    <div style={{ width: `${val * 2}%`, height: '100%', backgroundColor: colors.primary, borderRadius: '2px' }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div style={cardStyle}>
          <h4 style={{ fontSize: '13px', marginBottom: '12px' }}>모니터링 대상 I/F</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {MOCK_INTERFACES.slice(0, 8).map(i => (
              <div key={i.id} style={{ fontSize: '11px', display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: colors.textSecondary }}>{i.name}</span>
                <span style={{ color: colors.success }}>ON</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
