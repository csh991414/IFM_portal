import React, { useState } from 'react';
import { colors, fonts } from '../styles/tokens';
import { useInterfaces } from '../hooks/useInterfaces';
import { db } from '../firebase/config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import ProtoBadge from '../components/ProtoBadge';
import StatusBadge from '../components/StatusBadge';
import Icon from '../components/Icon';

export default function InterfaceManager() {
  const { interfaces, loading, error } = useInterfaces();
  const [filter, setFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [search, setSearch] = useState('');

  const handleAddInterface = async () => {
    try {
      const nextId = `IF-${String(interfaces.length + 1).padStart(3, '0')}`;
      const newInterface = {
        id: nextId,
        name: '신규 연계 서비스',
        system: '내부 시스템',
        protocol: 'REST',
        method: 'POST',
        status: 'active',
        tps: 0,
        errRate: 0,
        latency: 0,
        target: '/api/v1/new-service',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      await addDoc(collection(db, 'interfaces'), newInterface);
      alert('새로운 인터페이스가 등록되었습니다.');
    } catch (err) {
      console.error('인터페이스 등록 중 오류:', err);
      alert('등록 실패: ' + err.message);
    }
  };

  const containerStyle = {
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  };

  const toolbarStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: '12px 20px',
    borderRadius: '10px',
    border: `1px solid ${colors.border}`,
  };

  const inputStyle = {
    padding: '8px 12px',
    paddingLeft: '32px',
    borderRadius: '6px',
    border: `1px solid ${colors.border}`,
    fontSize: '12px',
    width: '240px',
    outline: 'none',
  };

  const filterButtonStyle = (active) => ({
    padding: '6px 12px',
    borderRadius: '6px',
    border: `1px solid ${active ? colors.primary : colors.border}`,
    backgroundColor: active ? colors.primaryBg : '#FFF',
    color: active ? colors.primary : colors.textSecondary,
    fontSize: '12px',
    cursor: 'pointer',
    fontWeight: active ? 'bold' : 'normal',
  });

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

  const tdStyle = {
    padding: '14px 16px',
    fontSize: '12px',
    borderBottom: `1px solid ${colors.borderLight}`,
  };

  const filteredData = interfaces.filter(item => {
    const matchProtocol = filter === 'ALL' || item.protocol === filter;
    const matchStatus = statusFilter === 'ALL' || item.status === statusFilter;
    const matchSearch = item.name.includes(search) || item.id.includes(search) || item.system.includes(search);
    return matchProtocol && matchStatus && matchSearch;
  });

  return (
    <div style={containerStyle}>
      <div style={toolbarStyle}>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <div style={{ position: 'relative' }}>
            <Icon name="search" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: colors.textMuted }} />
            <input 
              style={inputStyle} 
              placeholder="인터페이스명 / ID / 시스템 검색" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          
          <div style={{ display: 'flex', gap: '4px' }}>
            {['ALL', 'REST', 'SOAP', 'MQ', 'Batch', 'SFTP'].map(p => (
              <button key={p} style={filterButtonStyle(filter === p)} onClick={() => setFilter(p)}>
                {p}
              </button>
            ))}
          </div>
        </div>

        <button 
          onClick={handleAddInterface}
          style={{
            padding: '8px 16px',
            backgroundColor: colors.primary,
            color: '#FFF',
            border: 'none',
            borderRadius: '6px',
            fontSize: '12px',
            fontWeight: 'bold',
            cursor: 'pointer',
          }}
        >
          인터페이스 등록
        </button>
      </div>

      <div style={tableCardStyle}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>I/F ID</th>
              <th style={thStyle}>인터페이스명</th>
              <th style={thStyle}>대상시스템</th>
              <th style={thStyle}>프로토콜</th>
              <th style={thStyle}>메서드·큐</th>
              <th style={thStyle}>엔드포인트</th>
              <th style={thStyle}>상태</th>
              <th style={thStyle}>TPS</th>
              <th style={thStyle}>응답(ms)</th>
              <th style={thStyle}>작업</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="10" style={{ padding: '40px', textAlign: 'center', color: colors.textMuted }}>데이터 불러오는 중...</td></tr>
            ) : error ? (
              <tr><td colSpan="10" style={{ padding: '40px', textAlign: 'center', color: colors.error }}>연결 오류 발생</td></tr>
            ) : filteredData.map(item => (
              <tr key={item._id || item.id}>
                <td style={{ ...tdStyle, fontFamily: fonts.mono, fontWeight: 'bold' }}>{item.id}</td>
                <td style={{ ...tdStyle, fontWeight: '500' }}>{item.name}</td>
                <td style={tdStyle}>{item.system}</td>
                <td style={tdStyle}><ProtoBadge protocol={item.protocol} /></td>
                <td style={{ ...tdStyle, fontFamily: fonts.mono, fontSize: '11px' }}>{item.method}</td>
                <td style={{ ...tdStyle, color: colors.textLabel, fontSize: '11px' }}>{item.target}</td>
                <td style={tdStyle}><StatusBadge status={item.status} /></td>
                <td style={tdStyle}>{item.tps}</td>
                <td style={tdStyle}>{item.latency}</td>
                <td style={tdStyle}>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button style={{ border: `1px solid ${colors.border}`, padding: '4px', borderRadius: '4px', backgroundColor: '#FFF', cursor: 'pointer' }}>
                      <Icon name="bolt" style={{ color: colors.textSecondary, width: '12px', height: '12px' }} />
                    </button>
                    <button style={{ border: `1px solid ${colors.border}`, padding: '4px', borderRadius: '4px', backgroundColor: '#FFF', cursor: 'pointer' }}>
                      <Icon name="log" style={{ color: colors.textSecondary, width: '12px', height: '12px' }} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
