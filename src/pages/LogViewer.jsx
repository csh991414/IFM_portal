import React, { useState } from 'react';
import { colors, fonts } from '../styles/tokens';
import { MOCK_LOGS } from '../data/mockData';
import Icon from '../components/Icon';

const LEVEL_COLORS = {
  INFO: colors.primary,
  WARN: colors.warning,
  ERROR: colors.error,
  DEBUG: colors.textMuted,
};

export default function LogViewer() {
  const [levelFilter, setLevelFilter] = useState('ALL');
  const [search, setSearch] = useState('');

  const containerStyle = {
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    height: '100%',
  };

  const toolbarStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const terminalStyle = {
    flex: 1,
    backgroundColor: '#0D1B2A',
    borderRadius: '10px',
    padding: '20px',
    overflowY: 'auto',
    fontFamily: fonts.mono,
    fontSize: '12px',
    lineHeight: '1.6',
    boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.5)',
  };

  const logRowStyle = {
    display: 'flex',
    gap: '12px',
    marginBottom: '4px',
    whiteSpace: 'pre-wrap',
  };

  const filteredLogs = MOCK_LOGS.filter(log => {
    const matchLevel = levelFilter === 'ALL' || log.level === levelFilter;
    const matchSearch = log.msg.toLowerCase().includes(search.toLowerCase()) || 
                      log.txId.toLowerCase().includes(search.toLowerCase()) ||
                      log.ifName.toLowerCase().includes(search.toLowerCase());
    return matchLevel && matchSearch;
  });

  return (
    <div style={containerStyle}>
      <div style={toolbarStyle}>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <div style={{ position: 'relative' }}>
            <Icon name="search" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: colors.textMuted }} />
            <input 
              style={{
                padding: '8px 12px',
                paddingLeft: '32px',
                borderRadius: '6px',
                border: `1px solid ${colors.border}`,
                fontSize: '12px',
                width: '240px',
                outline: 'none',
              }} 
              placeholder="TxID / 인터페이스 / 메시지 검색" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          
          <div style={{ display: 'flex', gap: '4px' }}>
            {['ALL', 'INFO', 'WARN', 'ERROR', 'DEBUG'].map(lvl => (
              <button 
                key={lvl} 
                onClick={() => setLevelFilter(lvl)}
                style={{
                  padding: '6px 10px',
                  borderRadius: '4px',
                  border: `1px solid ${levelFilter === lvl ? colors.primary : colors.border}`,
                  backgroundColor: levelFilter === lvl ? colors.primaryBg : '#FFF',
                  color: levelFilter === lvl ? colors.primary : colors.textSecondary,
                  fontSize: '11px',
                  fontFamily: fonts.mono,
                  cursor: 'pointer',
                }}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '12px', color: colors.textMuted }}>{filteredLogs.length} 건 조회됨</span>
          <button style={{
            padding: '6px 12px',
            borderRadius: '6px',
            border: `1px solid ${colors.border}`,
            backgroundColor: '#FFF',
            fontSize: '12px',
            cursor: 'pointer',
          }}>
            내보내기
          </button>
        </div>
      </div>

      <div style={terminalStyle}>
        {filteredLogs.map(log => (
          <div key={log.id} style={logRowStyle}>
            <span style={{ color: '#5C6370', flexShrink: 0 }}>[{new Date(log.createdAt).toLocaleTimeString('ko-KR', { hour12: false })}]</span>
            <span style={{ color: LEVEL_COLORS[log.level], fontWeight: 'bold', width: '50px', flexShrink: 0 }}>{log.level}</span>
            <span style={{ color: '#61AFEF', flexShrink: 0 }}>{log.txId}</span>
            <span style={{ color: '#ABB2BF', flexShrink: 0 }}>[{log.ifName}]</span>
            <span style={{ color: '#DCDFE4' }}>{log.msg}</span>
            <span style={{ color: '#98C379', marginLeft: 'auto', flexShrink: 0 }}>{log.duration}ms</span>
          </div>
        ))}
        {filteredLogs.length === 0 && (
          <div style={{ color: colors.textMuted, textAlign: 'center', marginTop: '40px' }}>조회된 로그가 없습니다.</div>
        )}
      </div>
    </div>
  );
}
