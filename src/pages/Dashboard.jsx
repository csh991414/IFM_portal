import React from 'react';
import { colors, fonts } from '../styles/tokens';
import { MOCK_INTERFACES } from '../data/mockData';
import ProtoBadge from '../components/ProtoBadge';
import StatusBadge from '../components/StatusBadge';
import Spark from '../components/Spark';
import Icon from '../components/Icon';

export default function Dashboard() {
  const containerStyle = {
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    overflowY: 'auto',
  };

  const kpiGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '20px',
  };

  const kpiCardStyle = (color) => ({
    backgroundColor: '#FFF',
    border: `1px solid ${colors.border}`,
    borderRadius: '10px',
    padding: '16px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  });

  const mainGridStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr 280px',
    gap: '24px',
  };

  const cardStyle = {
    backgroundColor: '#FFF',
    border: `1px solid ${colors.border}`,
    borderRadius: '10px',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    textAlign: 'left',
  };

  const thStyle = {
    padding: '12px 10px',
    fontSize: '11px',
    color: colors.textMuted,
    fontWeight: 'bold',
    borderBottom: `1px solid ${colors.borderLight}`,
    textTransform: 'uppercase',
  };

  const tdStyle = (idx) => ({
    padding: '14px 10px',
    fontSize: '12px',
    color: colors.textPrimary,
    borderBottom: `1px solid ${colors.borderLight}`,
    backgroundColor: idx % 2 === 0 ? '#FFF' : colors.surfaceAlt,
  });

  const kpis = [
    { label: '전체 인터페이스', value: '10', color: colors.primary, icon: 'manager' },
    { label: '정상 운영', value: '7', color: colors.success, icon: 'bolt' },
    { label: '오류 발생', value: '1', color: colors.error, icon: 'reprocess' },
    { label: '현재 TPS', value: '107', color: '#7B3FF2', icon: 'monitoring' },
  ];

  return (
    <div style={containerStyle}>
      {/* KPI Cards */}
      <div style={kpiGridStyle}>
        {kpis.map((kpi, idx) => (
          <div key={idx} style={kpiCardStyle(kpi.color)}>
            <div>
              <div style={{ fontSize: '12px', color: colors.textSecondary, marginBottom: '4px' }}>{kpi.label}</div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: kpi.color }}>{kpi.value}</div>
            </div>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: `${kpi.color}2E`, // 18% opacity
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: kpi.color,
            }}>
              <Icon name={kpi.icon} />
            </div>
          </div>
        ))}
      </div>

      <div style={mainGridStyle}>
        {/* Main Table */}
        <div style={cardStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '15px', color: colors.textPrimary }}>인터페이스 운영 현황</h3>
            <span style={{ fontSize: '11px', color: colors.textMuted }}>실시간 갱신 중</span>
          </div>
          
          <div style={{ overflowX: 'auto' }}>
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={thStyle}>I/F ID</th>
                  <th style={thStyle}>인터페이스명</th>
                  <th style={thStyle}>대상시스템</th>
                  <th style={thStyle}>프로토콜</th>
                  <th style={thStyle}>상태</th>
                  <th style={thStyle}>TPS</th>
                  <th style={thStyle}>오류율</th>
                  <th style={thStyle}>응답(ms)</th>
                  <th style={thStyle}>추이</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_INTERFACES.map((item, idx) => (
                  <tr key={item.id}>
                    <td style={{ ...tdStyle(idx), fontFamily: fonts.mono, fontWeight: 'bold' }}>{item.id}</td>
                    <td style={{ ...tdStyle(idx), fontWeight: '500' }}>{item.name}</td>
                    <td style={tdStyle(idx)}>{item.system}</td>
                    <td style={tdStyle(idx)}><ProtoBadge protocol={item.protocol} /></td>
                    <td style={tdStyle(idx)}><StatusBadge status={item.status} /></td>
                    <td style={{ ...tdStyle(idx), color: item.tps > 20 ? colors.primary : colors.textPrimary }}>{item.tps}</td>
                    <td style={{ ...tdStyle(idx), color: item.errRate > 1 ? colors.error : colors.textPrimary }}>{item.errRate}%</td>
                    <td style={{ ...tdStyle(idx), color: item.latency > 100 ? colors.error : colors.textPrimary }}>{item.latency}</td>
                    <td style={tdStyle(idx)}><Spark status={item.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Columns */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Protocol Stats */}
          <div style={cardStyle}>
            <h3 style={{ fontSize: '13px', fontWeight: 'bold' }}>프로토콜 분포</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {['REST', 'SOAP', 'MQ', 'Batch', 'SFTP'].map(p => (
                <div key={p}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '4px' }}>
                    <span style={{ color: colors.textSecondary }}>{p}</span>
                    <span style={{ fontWeight: 'bold' }}>{MOCK_INTERFACES.filter(i => i.protocol === p).length} 건</span>
                  </div>
                  <div style={{ height: '6px', backgroundColor: colors.borderLight, borderRadius: '3px' }}>
                    <div style={{
                      height: '100%',
                      width: `${(MOCK_INTERFACES.filter(i => i.protocol === p).length / MOCK_INTERFACES.length) * 100}%`,
                      backgroundColor: colors.primary,
                      borderRadius: '3px'
                    }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Status Summary */}
          <div style={cardStyle}>
            <h3 style={{ fontSize: '13px', fontWeight: 'bold' }}>상태 요약</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              {['active', 'error', 'warning', 'inactive'].map(s => (
                <div key={s} style={{ 
                  backgroundColor: colors.surfaceAlt, 
                  padding: '10px', 
                  borderRadius: '6px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px'
                }}>
                  <StatusBadge status={s} />
                  <span style={{ fontSize: '16px', fontWeight: 'bold', color: colors.textPrimary }}>
                    {MOCK_INTERFACES.filter(i => i.status === s).length}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Recent Alerts */}
          <div style={cardStyle}>
            <h3 style={{ fontSize: '13px', fontWeight: 'bold' }}>최근 알림</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { time: '14:20:01', msg: '재보험사 데이터 전송 오류', color: colors.error },
                { time: '14:15:33', msg: '손해사정 연계 지연 (320ms)', color: colors.warning },
                { time: '13:58:12', msg: '보험료 청구 배치 완료', color: colors.success },
              ].map((alert, i) => (
                <div key={i} style={{ display: 'flex', gap: '8px', fontSize: '11px' }}>
                  <span style={{ color: colors.textMuted, flexShrink: 0 }}>{alert.time}</span>
                  <span style={{ color: alert.color, fontWeight: '500' }}>{alert.msg}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
