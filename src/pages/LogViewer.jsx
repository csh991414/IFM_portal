import React, { useState } from 'react';
import { colors, fonts } from '../styles/tokens';
import { MOCK_LOGS } from '../data/mockData';
import { Icon } from '../components/Icon';

const LogViewer = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [levelFilter, setLevelFilter] = useState('ALL');

  const levels = ['ALL', 'INFO', 'WARN', 'ERROR', 'DEBUG'];

  const filteredLogs = MOCK_LOGS.filter(log => {
    const matchesSearch = log.msg.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         log.txId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.ifName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = levelFilter === 'ALL' || log.level === levelFilter;
    return matchesSearch && matchesLevel;
  });

  const levelColors = {
    INFO: colors.primary,
    WARN: colors.warning,
    ERROR: colors.error,
    DEBUG: colors.textMuted,
  };

  const terminalStyle = {
    backgroundColor: '#0D1B2A',
    borderRadius: '10px',
    padding: '20px',
    height: 'calc(100vh - 200px)',
    overflowY: 'auto',
    fontFamily: fonts.mono,
    fontSize: '13px',
    lineHeight: '1.6',
    boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.5)',
  };

  return (
    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Toolbar */}
      <div style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '10px',
        border: `1px solid ${colors.border}`,
        padding: '16px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <div style={{ position: 'relative', width: '300px' }}>
            <div style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }}>
              <Icon name="search" size={16} color={colors.textMuted} />
            </div>
            <input
              type="text"
              placeholder="로그 메시지, TxID 검색"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px 8px 36px',
                borderRadius: '6px',
                border: `1px solid ${colors.border}`,
                fontSize: '13px',
                outline: 'none',
              }}
            />
          </div>
          <div style={{ display: 'flex', gap: '4px' }}>
            {levels.map(l => (
              <button
                key={l}
                onClick={() => setLevelFilter(l)}
                style={{
                  padding: '6px 12px',
                  borderRadius: '6px',
                  border: `1px solid ${levelFilter === l ? colors.primary : colors.border}`,
                  backgroundColor: levelFilter === l ? colors.primaryBg : '#FFFFFF',
                  color: levelFilter === l ? colors.primary : colors.textSecondary,
                  fontSize: '11px',
                  fontWeight: '700',
                  fontFamily: fonts.mono,
                  cursor: 'pointer',
                }}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '12px', color: colors.textMuted }}>
            Total: <strong>{filteredLogs.length}</strong> lines
          </span>
          <button style={{
            padding: '8px 16px',
            borderRadius: '6px',
            border: `1px solid ${colors.border}`,
            backgroundColor: '#FFFFFF',
            fontSize: '12px',
            fontWeight: '600',
            cursor: 'pointer',
          }}>
            내보내기
          </button>
        </div>
      </div>

      {/* Terminal */}
      <div style={terminalStyle}>
        {filteredLogs.map((log) => (
          <div key={log.id} style={{ display: 'flex', gap: '12px', marginBottom: '4px', whiteSpace: 'nowrap' }}>
            <span style={{ color: '#5C6773' }}>[{new Date(log.createdAt).toLocaleTimeString('ko-KR', { hour12: false })}]</span>
            <span style={{ color: levelColors[log.level], fontWeight: '700', minWidth: '50px' }}>{log.level}</span>
            <span style={{ color: '#4A90E2' }}>{log.txId}</span>
            <span style={{ color: '#9EA7B4' }}>[{log.ifName}]</span>
            <span style={{ color: '#D1D5DB', whiteSpace: 'normal', flex: 1 }}>{log.msg}</span>
            <span style={{ color: '#6B7684' }}>{log.duration}ms</span>
          </div>
        ))}
        {filteredLogs.length === 0 && (
          <div style={{ color: '#5C6773', textAlign: 'center', padding: '100px' }}>
            No logs found matching your criteria.
          </div>
        )}
      </div>
    </div>
  );
};

export default LogViewer;
