import React, { useState, useEffect } from 'react';
import { colors, fonts } from '../styles/tokens';
import { MOCK_INTERFACES } from '../data/mockData';
import { Icon } from '../components/Icon';
import ProtoBadge from '../components/ProtoBadge';

const Monitoring = () => {
  const [transactions, setTransactions] = useState([]);
  const [isLive, setIsLive] = useState(true);

  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      const iface = MOCK_INTERFACES[Math.floor(Math.random() * MOCK_INTERFACES.length)];
      const newTx = {
        id: `TX-${Math.floor(Math.random() * 1000000)}`,
        time: new Date().toLocaleTimeString('ko-KR', { hour12: false }),
        ifName: iface.name,
        protocol: iface.protocol,
        status: Math.random() > 0.95 ? 'error' : 'success',
        latency: Math.floor(Math.random() * 200) + 10,
        size: (Math.random() * 5).toFixed(1) + 'KB',
        isNew: true,
      };

      setTransactions(prev => [newTx, ...prev].slice(0, 50));

      // Remove "isNew" flag after 1 second
      setTimeout(() => {
        setTransactions(prev => prev.map(tx => tx.id === newTx.id ? { ...tx, isNew: false } : tx));
      }, 1000);
    }, 1800);

    return () => clearInterval(interval);
  }, [isLive]);

  const tableHeaderStyle = {
    textAlign: 'left',
    padding: '12px 16px',
    fontSize: '12px',
    fontWeight: '600',
    color: colors.textSecondary,
    backgroundColor: '#FAFBFC',
    borderBottom: `1px solid ${colors.border}`,
  };

  const tableCellStyle = (isError) => ({
    padding: '12px 16px',
    fontSize: '13px',
    color: isError ? colors.error : colors.textPrimary,
    borderBottom: `1px solid ${colors.borderLight}`,
  });

  return (
    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: '#FFFFFF',
            padding: '6px 12px',
            borderRadius: '20px',
            border: `1px solid ${colors.border}`,
          }}>
            <div style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: colors.success,
              animation: 'pulse 1.5s infinite',
            }} />
            <span style={{ fontSize: '12px', fontWeight: '700', color: colors.success }}>LIVE</span>
          </div>
          <span style={{ fontSize: '13px', color: colors.textSecondary }}>실시간 트랜잭션 스트림</span>
        </div>
        <button
          onClick={() => setIsLive(!isLive)}
          style={{
            padding: '8px 16px',
            borderRadius: '6px',
            border: `1px solid ${isLive ? colors.error : colors.primary}`,
            backgroundColor: '#FFFFFF',
            color: isLive ? colors.error : colors.primary,
            fontSize: '13px',
            fontWeight: '600',
            cursor: 'pointer',
          }}
        >
          {isLive ? '모니터링 중지' : '모니터링 시작'}
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 260px', gap: '24px' }}>
        {/* Stream Table */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '10px',
          border: `1px solid ${colors.border}`,
          overflow: 'hidden',
          boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
          minHeight: '600px',
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={tableHeaderStyle}>시각</th>
                <th style={tableHeaderStyle}>TxID</th>
                <th style={tableHeaderStyle}>인터페이스</th>
                <th style={tableHeaderStyle}>프로토콜</th>
                <th style={tableHeaderStyle}>상태</th>
                <th style={tableHeaderStyle}>응답(ms)</th>
                <th style={tableHeaderStyle}>크기</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr key={tx.id} style={{
                  backgroundColor: tx.isNew ? '#FFFBEB' : '#FFFFFF',
                  transition: 'background-color 1s ease',
                }}>
                  <td style={{ ...tableCellStyle(false), fontFamily: fonts.mono, color: colors.textMuted }}>{tx.time}</td>
                  <td style={{ ...tableCellStyle(false), fontFamily: fonts.mono }}>{tx.id}</td>
                  <td style={{ ...tableCellStyle(false), fontWeight: '600' }}>{tx.ifName}</td>
                  <td style={tableCellStyle(false)}><ProtoBadge protocol={tx.protocol} /></td>
                  <td style={tableCellStyle(tx.status === 'error')}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <div style={{ 
                        width: '6px', 
                        height: '6px', 
                        borderRadius: '50%', 
                        backgroundColor: tx.status === 'error' ? colors.error : colors.success 
                      }} />
                      {tx.status === 'error' ? 'FAIL' : 'SUCCESS'}
                    </div>
                  </td>
                  <td style={{ ...tableCellStyle(false), color: tx.latency > 150 ? colors.error : colors.textPrimary }}>{tx.latency}ms</td>
                  <td style={{ ...tableCellStyle(false), fontSize: '11px', color: colors.textSecondary }}>{tx.size}</td>
                </tr>
              ))}
              {transactions.length === 0 && (
                <tr>
                  <td colSpan="7" style={{ padding: '100px', textAlign: 'center', color: colors.textMuted }}>
                    트랜잭션을 대기 중입니다...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Sidebar Widgets */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '10px',
            border: `1px solid ${colors.border}`,
            padding: '20px',
          }}>
            <h3 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '16px' }}>프로토콜별 TPS</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                { label: 'REST', val: 45, color: colors.primary },
                { label: 'SOAP', val: 12, color: '#7B3FF2' },
                { label: 'MQ', val: 28, color: '#E67000' },
                { label: 'Batch', val: 2, color: '#1E8B4F' },
              ].map(p => (
                <div key={p.label}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '6px' }}>
                    <span style={{ fontWeight: '600' }}>{p.label}</span>
                    <span style={{ fontFamily: fonts.mono }}>{p.val} tps</span>
                  </div>
                  <div style={{ height: '8px', backgroundColor: '#F2F4F7', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: `${(p.val / 50) * 100}%`, height: '100%', backgroundColor: p.color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '10px',
            border: `1px solid ${colors.border}`,
            padding: '20px',
          }}>
            <h3 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '16px' }}>감시 대상 I/F</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {MOCK_INTERFACES.slice(0, 5).map(iface => (
                <div key={iface.id} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px' }}>
                  <div style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: colors.primary }} />
                  <span style={{ flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{iface.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Monitoring;
