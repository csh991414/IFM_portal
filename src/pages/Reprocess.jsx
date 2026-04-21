import React, { useState } from 'react';
import { colors, fonts } from '../styles/tokens';
import { MOCK_REPROCESS } from '../data/mockData';
import { Icon } from '../components/Icon';
import ProtoBadge from '../components/ProtoBadge';

const Reprocess = () => {
  const [items, setItems] = useState(MOCK_REPROCESS.map(item => ({ ...item, isSelected: false })));
  const [processingIds, setProcessingIds] = useState([]);

  const toggleSelect = (id) => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, isSelected: !item.isSelected } : item));
  };

  const handleReprocess = (id) => {
    setProcessingIds(prev => [...prev, id]);
    setItems(prev => prev.map(item => item.id === id ? { ...item, status: 'processing' } : item));

    setTimeout(() => {
      setProcessingIds(prev => prev.filter(pid => pid !== id));
      setItems(prev => prev.map(item => item.id === id ? { ...item, status: 'done' } : item));
    }, 2000);
  };

  const selectedCount = items.filter(i => i.isSelected).length;

  const tableHeaderStyle = {
    textAlign: 'left',
    padding: '12px 16px',
    fontSize: '12px',
    fontWeight: '600',
    color: colors.textSecondary,
    backgroundColor: '#FAFBFC',
    borderBottom: `1px solid ${colors.border}`,
  };

  const tableCellStyle = {
    padding: '14px 16px',
    fontSize: '13px',
    color: colors.textPrimary,
    borderBottom: `1px solid ${colors.borderLight}`,
    transition: 'background-color 0.5s ease',
  };

  return (
    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button 
            disabled={selectedCount === 0}
            style={{
              padding: '10px 16px',
              backgroundColor: selectedCount > 0 ? colors.primary : '#F2F4F7',
              color: selectedCount > 0 ? '#FFFFFF' : colors.textMuted,
              borderRadius: '8px',
              border: 'none',
              fontSize: '13px',
              fontWeight: '600',
              cursor: selectedCount > 0 ? 'pointer' : 'default',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            선택 재처리 ({selectedCount})
          </button>
          <button style={{
            padding: '10px 16px',
            backgroundColor: '#FFFFFF',
            color: colors.error,
            borderRadius: '8px',
            border: `1px solid ${colors.error}`,
            fontSize: '13px',
            fontWeight: '600',
            cursor: 'pointer',
          }}>
            전체 재처리
          </button>
        </div>
        <div style={{ fontSize: '13px', color: colors.textSecondary }}>
          현재 재처리 대기: <strong>{items.filter(i => i.status === 'pending').length}</strong>건
        </div>
      </div>

      <div style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '10px',
        border: `1px solid ${colors.border}`,
        overflow: 'hidden',
        boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ ...tableHeaderStyle, width: '40px' }}><input type="checkbox" /></th>
              <th style={tableHeaderStyle}>TxID</th>
              <th style={tableHeaderStyle}>인터페이스</th>
              <th style={tableHeaderStyle}>프로토콜</th>
              <th style={tableHeaderStyle}>실패시각</th>
              <th style={tableHeaderStyle}>실패원인</th>
              <th style={tableHeaderStyle}>재시도</th>
              <th style={tableHeaderStyle}>상태</th>
              <th style={tableHeaderStyle}>작업</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} style={{ 
                backgroundColor: item.status === 'done' ? '#F0FFF8' : '#FFFFFF' 
              }}>
                <td style={tableCellStyle}>
                  <input 
                    type="checkbox" 
                    checked={item.isSelected} 
                    onChange={() => toggleSelect(item.id)} 
                  />
                </td>
                <td style={{ ...tableCellStyle, fontFamily: fonts.mono }}>{item.txId}</td>
                <td style={{ ...tableCellStyle, fontWeight: '600' }}>{item.ifName}</td>
                <td style={tableCellStyle}><ProtoBadge protocol={item.protocol} /></td>
                <td style={{ ...tableCellStyle, fontSize: '11px', color: colors.textMuted }}>{item.failedAt}</td>
                <td style={{ ...tableCellStyle, color: colors.error }}>{item.reason}</td>
                <td style={tableCellStyle}>{item.retries}</td>
                <td style={tableCellStyle}>
                  {item.status === 'pending' && (
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: colors.warning, fontWeight: '600' }}>
                      <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: colors.warning }} />
                      대기
                    </div>
                  )}
                  {item.status === 'processing' && (
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: colors.primary, fontWeight: '600' }}>
                      <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: colors.primary, animation: 'pulse 1s infinite' }} />
                      처리 중...
                    </div>
                  )}
                  {item.status === 'done' && (
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: colors.success, fontWeight: '600' }}>
                      <div style={{ width: '12px', height: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: colors.success, color: '#FFFFFF', borderRadius: '50%', fontSize: '8px' }}>✓</div>
                      완료
                    </div>
                  )}
                </td>
                <td style={tableCellStyle}>
                  <button 
                    onClick={() => handleReprocess(item.id)}
                    disabled={item.status !== 'pending'}
                    style={{
                      padding: '6px 12px',
                      backgroundColor: item.status === 'pending' ? colors.primaryBg : '#F2F4F7',
                      color: item.status === 'pending' ? colors.primary : colors.textMuted,
                      borderRadius: '4px',
                      border: 'none',
                      fontSize: '12px',
                      fontWeight: '700',
                      cursor: item.status === 'pending' ? 'pointer' : 'default',
                    }}
                  >
                    재시도
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reprocess;
