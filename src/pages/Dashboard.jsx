import React from 'react';
import { colors, fonts } from '../styles/tokens';
import { MOCK_INTERFACES } from '../data/mockData';
import { Icon } from '../components/Icon';
import ProtoBadge from '../components/ProtoBadge';
import StatusBadge from '../components/StatusBadge';
import Spark from '../components/Spark';

const Dashboard = () => {
  const kpis = [
    { label: '전체 인터페이스', value: 10, color: colors.primary, icon: 'management' },
    { label: '정상 운영', value: 7, color: colors.success, icon: 'bolt' },
    { label: '오류 발생', value: 1, color: colors.error, icon: 'reprocess' },
    { label: '현재 TPS', value: 107, color: '#7B3FF2', icon: 'monitoring' },
  ];

  const cardStyle = {
    backgroundColor: '#FFFFFF',
    borderRadius: '10px',
    border: `1px solid ${colors.border}`,
    padding: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
  };

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

  return (
    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
        {kpis.map((kpi, i) => (
          <div key={i} style={cardStyle}>
            <div>
              <div style={{ fontSize: '13px', fontWeight: '500', color: colors.textSecondary, marginBottom: '4px' }}>
                {kpi.label}
              </div>
              <div style={{ fontSize: '24px', fontWeight: '700', color: colors.textPrimary }}>
                {kpi.value}
              </div>
            </div>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: `${kpi.color}15`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Icon name={kpi.icon} size={20} color={kpi.color} />
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '24px' }}>
        {/* Main Table */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '10px',
          border: `1px solid ${colors.border}`,
          overflow: 'hidden',
          boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
        }}>
          <div style={{ padding: '20px', borderBottom: `1px solid ${colors.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '15px', fontWeight: '700' }}>인터페이스 운영 현황</h3>
            <span style={{ fontSize: '12px', color: colors.primary, fontWeight: '600', cursor: 'pointer' }}>전체보기</span>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={tableHeaderStyle}>I/F ID</th>
                <th style={tableHeaderStyle}>인터페이스명</th>
                <th style={tableHeaderStyle}>대상시스템</th>
                <th style={tableHeaderStyle}>프로토콜</th>
                <th style={tableHeaderStyle}>상태</th>
                <th style={tableHeaderStyle}>TPS</th>
                <th style={tableHeaderStyle}>오류율</th>
                <th style={tableHeaderStyle}>응답(ms)</th>
                <th style={tableHeaderStyle}>추이</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_INTERFACES.slice(0, 8).map((iface, i) => (
                <tr key={iface.id} style={{ backgroundColor: i % 2 === 1 ? '#FAFAFA' : '#FFFFFF' }}>
                  <td style={{ ...tableCellStyle, fontFamily: fonts.mono, fontSize: '12px' }}>{iface.id}</td>
                  <td style={{ ...tableCellStyle, fontWeight: '600' }}>{iface.name}</td>
                  <td style={tableCellStyle}>{iface.system}</td>
                  <td style={tableCellStyle}><ProtoBadge protocol={iface.protocol} /></td>
                  <td style={tableCellStyle}><StatusBadge status={iface.status} /></td>
                  <td style={{ ...tableCellStyle, color: iface.tps > 20 ? colors.primary : colors.textPrimary, fontWeight: '600' }}>{iface.tps}</td>
                  <td style={{ ...tableCellStyle, color: iface.errRate > 1 ? colors.error : colors.textPrimary }}>{iface.errRate}%</td>
                  <td style={tableCellStyle}>{iface.latency}ms</td>
                  <td style={tableCellStyle}><Spark color={iface.status === 'error' ? colors.error : colors.primary} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Sidebar Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ ...cardStyle, flexDirection: 'column', alignItems: 'flex-start', gap: '16px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: '700' }}>프로토콜 분포</h3>
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {['REST', 'SOAP', 'MQ', 'Batch'].map(p => (
                <div key={p} style={{ width: '100%' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '4px', fontWeight: '600' }}>
                    <span>{p}</span>
                    <span>{p === 'REST' ? '40%' : p === 'SOAP' ? '25%' : '15%'}</span>
                  </div>
                  <div style={{ height: '6px', backgroundColor: '#F2F4F7', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ 
                      height: '100%', 
                      width: p === 'REST' ? '40%' : p === 'SOAP' ? '25%' : '15%', 
                      backgroundColor: colors.primary 
                    }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ ...cardStyle, flexDirection: 'column', alignItems: 'flex-start', gap: '16px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: '700' }}>상태 요약</h3>
            <div style={{ width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div style={{ padding: '12px', borderRadius: '8px', backgroundColor: colors.successBg }}>
                <div style={{ fontSize: '11px', color: colors.success, fontWeight: '600' }}>정상</div>
                <div style={{ fontSize: '18px', fontWeight: '700', color: colors.success }}>7</div>
              </div>
              <div style={{ padding: '12px', borderRadius: '8px', backgroundColor: colors.errorBg }}>
                <div style={{ fontSize: '11px', color: colors.error, fontWeight: '600' }}>오류</div>
                <div style={{ fontSize: '18px', fontWeight: '700', color: colors.error }}>1</div>
              </div>
              <div style={{ padding: '12px', borderRadius: '8px', backgroundColor: colors.warningBg }}>
                <div style={{ fontSize: '11px', color: colors.warning, fontWeight: '600' }}>경고</div>
                <div style={{ fontSize: '18px', fontWeight: '700', color: colors.warning }}>1</div>
              </div>
              <div style={{ padding: '12px', borderRadius: '8px', backgroundColor: colors.inactiveBg }}>
                <div style={{ fontSize: '11px', color: colors.textMuted, fontWeight: '600' }}>비활성</div>
                <div style={{ fontSize: '18px', fontWeight: '700', color: colors.textMuted }}>1</div>
              </div>
            </div>
          </div>

          <div style={{ ...cardStyle, flexDirection: 'column', alignItems: 'flex-start', gap: '16px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: '700' }}>최근 알림</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' }}>
              {[
                { time: '10:24', msg: '재보험사 데이터 전송 오류 발생', level: 'error' },
                { time: '09:15', msg: '국세청 연계 세션 재연결 성공', level: 'success' },
                { time: '08:40', msg: '손해사정 연계 지연 시간 증가', level: 'warning' },
              ].map((n, i) => (
                <div key={i} style={{ display: 'flex', gap: '10px' }}>
                  <div style={{ 
                    fontSize: '11px', 
                    color: colors.textMuted, 
                    fontFamily: fonts.mono,
                    marginTop: '2px'
                  }}>{n.time}</div>
                  <div style={{ fontSize: '12px', color: colors.textPrimary, fontWeight: '500' }}>{n.msg}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
