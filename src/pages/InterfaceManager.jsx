import React, { useState } from 'react';
import { colors, fonts } from '../styles/tokens';
import { MOCK_INTERFACES } from '../data/mockData';
import { Icon } from '../components/Icon';
import ProtoBadge from '../components/ProtoBadge';
import StatusBadge from '../components/StatusBadge';

const InterfaceManager = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [protocolFilter, setProtocolFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const protocols = ['ALL', 'REST', 'SOAP', 'MQ', 'Batch', 'SFTP'];
  const statuses = ['ALL', 'active', 'error', 'warning', 'inactive'];

  const filteredInterfaces = MOCK_INTERFACES.filter(iface => {
    const matchesSearch = iface.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         iface.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         iface.system.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesProtocol = protocolFilter === 'ALL' || iface.protocol === protocolFilter;
    const matchesStatus = statusFilter === 'ALL' || iface.status === statusFilter;
    return matchesSearch && matchesProtocol && matchesStatus;
  });

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
  };

  const filterButtonStyle = (isActive) => ({
    padding: '6px 12px',
    borderRadius: '6px',
    fontSize: '12px',
    fontWeight: '600',
    cursor: 'pointer',
    border: `1px solid ${isActive ? colors.primary : colors.border}`,
    backgroundColor: isActive ? colors.primaryBg : '#FFFFFF',
    color: isActive ? colors.primary : colors.textSecondary,
    transition: 'all 0.2s',
  });

  return (
    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Toolbar */}
      <div style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '10px',
        border: `1px solid ${colors.border}`,
        padding: '16px 20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ position: 'relative', width: '320px' }}>
            <div style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }}>
              <Icon name="search" size={16} color={colors.textMuted} />
            </div>
            <input
              type="text"
              placeholder="인터페이스명, 시스템, ID 검색"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 12px 10px 36px',
                borderRadius: '8px',
                border: `1px solid ${colors.border}`,
                fontSize: '13px',
                outline: 'none',
                backgroundColor: colors.bg,
              }}
            />
          </div>
          <button style={{
            padding: '10px 20px',
            backgroundColor: colors.primary,
            color: '#FFFFFF',
            borderRadius: '8px',
            border: 'none',
            fontSize: '13px',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}>
            <Icon name="bolt" size={14} color="#FFFFFF" />
            인터페이스 등록
          </button>
        </div>

        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '12px', fontWeight: '700', color: colors.textLabel }}>프로토콜</span>
            <div style={{ display: 'flex', gap: '6px' }}>
              {protocols.map(p => (
                <button
                  key={p}
                  onClick={() => setProtocolFilter(p)}
                  style={filterButtonStyle(protocolFilter === p)}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
          <div style={{ width: '1px', height: '24px', backgroundColor: colors.border }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '12px', fontWeight: '700', color: colors.textLabel }}>상태</span>
            <div style={{ display: 'flex', gap: '6px' }}>
              {statuses.map(s => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  style={filterButtonStyle(statusFilter === s)}
                >
                  {s === 'ALL' ? '전체' : s}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
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
              <th style={tableHeaderStyle}>I/F ID</th>
              <th style={tableHeaderStyle}>인터페이스명</th>
              <th style={tableHeaderStyle}>대상시스템</th>
              <th style={tableHeaderStyle}>프로토콜</th>
              <th style={tableHeaderStyle}>메서드·큐</th>
              <th style={tableHeaderStyle}>엔드포인트</th>
              <th style={tableHeaderStyle}>상태</th>
              <th style={tableHeaderStyle}>TPS</th>
              <th style={tableHeaderStyle}>응답(ms)</th>
              <th style={tableHeaderStyle}>작업</th>
            </tr>
          </thead>
          <tbody>
            {filteredInterfaces.map((iface, i) => (
              <tr key={iface.id} style={{ backgroundColor: i % 2 === 1 ? '#FAFAFA' : '#FFFFFF' }}>
                <td style={{ ...tableCellStyle, fontFamily: fonts.mono, fontSize: '12px' }}>{iface.id}</td>
                <td style={{ ...tableCellStyle, fontWeight: '600' }}>{iface.name}</td>
                <td style={tableCellStyle}>{iface.system}</td>
                <td style={tableCellStyle}><ProtoBadge protocol={iface.protocol} /></td>
                <td style={{ ...tableCellStyle, fontFamily: fonts.mono, fontSize: '12px' }}>{iface.method}</td>
                <td style={{ ...tableCellStyle, fontFamily: fonts.mono, fontSize: '11px', color: colors.textSecondary }}>{iface.target}</td>
                <td style={tableCellStyle}><StatusBadge status={iface.status} /></td>
                <td style={tableCellStyle}>{iface.tps}</td>
                <td style={tableCellStyle}>{iface.latency}ms</td>
                <td style={tableCellStyle}>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button style={{ border: 'none', background: 'none', cursor: 'pointer', color: colors.primary }}>
                      <Icon name="settings" size={16} />
                    </button>
                    <button style={{ border: 'none', background: 'none', cursor: 'pointer', color: colors.textMuted }}>
                      <Icon name="log" size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredInterfaces.length === 0 && (
          <div style={{ padding: '60px', textAlign: 'center', color: colors.textMuted }}>
            검색 결과가 없습니다.
          </div>
        )}
      </div>
    </div>
  );
};

export default InterfaceManager;
