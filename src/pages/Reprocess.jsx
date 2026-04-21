import React, { useState } from 'react';
import { colors, fonts } from '../styles/tokens';
import { MOCK_REPROCESS } from '../data/mockData';
import ProtoBadge from '../components/ProtoBadge';
import Icon from '../components/Icon';

export default function Reprocess() {
  const [items, setItems] = useState(MOCK_REPROCESS);
  const [selected, setSelected] = useState([]);

  const containerStyle = {
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  };

  const actionBarStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: '16px 20px',
    borderRadius: '10px',
    border: `1px solid ${colors.border}`,
  };

  const tableCardStyle = {
    backgroundColor: '#FFF',
    borderRadius: '10px',
    border: `1px solid ${colors.border}`,
    overflow: 'hidden',
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    textAlign: 'left',
  };

  const thStyle = {
    padding: '12px 16px',
    fontSize: '11px',
    color: colors.textMuted,
    fontWeight: 'bold',
    borderBottom: `1px solid ${colors.borderLight}`,
    backgroundColor: colors.surfaceAlt,
  };

  const tdStyle = (status) => ({
    padding: '14px 16px',
    fontSize: '12px',
    borderBottom: `1px solid ${colors.borderLight}`,
    backgroundColor: status === 'done' ? '#F0FFF8' : 'transparent',
    transition: 'background-color 0.3s',
  });

  const handleReprocess = (id) => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, status: 'processing' } : item));
    
    setTimeout(() => {
      setItems(prev => prev.map(item => item.id === id ? { ...item, status: 'done', retries: item.retries + 1 } : item));
    }, 2000);
  };

  const handleToggleSelect = (id) => {
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  return (
    <div style={containerStyle}>
      <div style={actionBarStyle}>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <h3 style={{ fontSize: '15px' }}>재처리 대기열</h3>
          <span style={{ fontSize: '12px', color: colors.textMuted }}>{items.filter(i => i.status === 'pending').length} 건 대기 중</span>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            disabled={selected.length === 0}
            style={{
              padding: '8px 16px',
              backgroundColor: selected.length === 0 ? colors.border : colors.primaryBg,
              color: selected.length === 0 ? colors.textMuted : colors.primary,
              border: `1px solid ${selected.length === 0 ? colors.border : colors.primary}`,
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: 'bold',
              cursor: selected.length === 0 ? 'default' : 'pointer',
            }}
          >
            선택 재처리 ({selected.length})
          </button>
          <button style={{
            padding: '8px 16px',
            backgroundColor: '#FFF',
            color: colors.error,
            border: `1px solid ${colors.error}`,
            borderRadius: '6px',
            fontSize: '12px',
            fontWeight: 'bold',
            cursor: 'pointer',
          }}>
            전체 재처리
          </button>
        </div>
      </div>

      <div style={tableCardStyle}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={{ ...thStyle, width: '40px' }}>
                <input type="checkbox" />
              </th>
              <th style={thStyle}>TxID</th>
              <th style={thStyle}>인터페이스</th>
              <th style={thStyle}>프로토콜</th>
              <th style={thStyle}>실패시각</th>
              <th style={thStyle}>실패원인</th>
              <th style={thStyle}>재시도</th>
              <th style={thStyle}>상태</th>
              <th style={thStyle}>작업</th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item.id}>
                <td style={tdStyle(item.status)}>
                  <input 
                    type="checkbox" 
                    checked={selected.includes(item.id)}
                    onChange={() => handleToggleSelect(item.id)}
                  />
                </td>
                <td style={{ ...tdStyle(item.status), fontFamily: fonts.mono, fontWeight: 'bold' }}>{item.txId}</td>
                <td style={{ ...tdStyle(item.status), fontWeight: '500' }}>{item.ifName}</td>
                <td style={tdStyle(item.status)}><ProtoBadge protocol={item.protocol} /></td>
                <td style={tdStyle(item.status)}>{new Date(item.failedAt).toLocaleString()}</td>
                <td style={{ ...tdStyle(item.status), color: colors.error }}>{item.reason}</td>
                <td style={tdStyle(item.status)}>{item.retries}</td>
                <td style={tdStyle(item.status)}>
                  {item.status === 'pending' && <span style={{ color: colors.warning, fontWeight: 'bold' }}>● 대기</span>}
                  {item.status === 'processing' && <span style={{ color: colors.primary, fontWeight: 'bold' }}>● 처리 중...</span>}
                  {item.status === 'done' && <span style={{ color: colors.success, fontWeight: 'bold' }}>✓ 완료</span>}
                </td>
                <td style={tdStyle(item.status)}>
                  <button 
                    disabled={item.status !== 'pending'}
                    onClick={() => handleReprocess(item.id)}
                    style={{
                      padding: '4px 10px',
                      backgroundColor: item.status === 'pending' ? colors.primary : colors.inactiveBg,
                      color: item.status === 'pending' ? '#FFF' : colors.inactive,
                      border: 'none',
                      borderRadius: '4px',
                      fontSize: '11px',
                      cursor: item.status === 'pending' ? 'pointer' : 'default',
                    }}
                  >
                    재처리 실행
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
