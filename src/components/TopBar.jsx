import React from 'react';
import { useLocation } from 'react-router-dom';
import { colors } from '../styles/tokens';
import { Icon } from './Icon';

const TopBar = () => {
  const location = useLocation();
  
  const pageTitleMap = {
    '/dashboard': '대시보드',
    '/interface': '인터페이스 관리',
    '/monitoring': '실시간 모니터링',
    '/log': '로그 조회',
    '/reprocess': '재처리 관리',
  };

  const currentTitle = pageTitleMap[location.pathname] || 'IFM Portal';

  const headerStyle = {
    height: '52px',
    backgroundColor: '#FFFFFF',
    borderBottom: `1px solid ${colors.border}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 24px',
    flexShrink: 0,
  };

  return (
    <header style={headerStyle}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <h1 style={{ fontSize: '15px', fontWeight: '700', color: colors.textPrimary }}>
          {currentTitle}
        </h1>
        <span style={{ fontSize: '11px', color: colors.textMuted, fontWeight: '500' }}>
          IFMS v2.4.1
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: colors.success }} />
          <span style={{ fontSize: '12px', fontWeight: '600', color: colors.textSecondary }}>System Online</span>
        </div>

        <div style={{ position: 'relative', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
          <Icon name="bell" size={20} color={colors.textSecondary} />
          <span style={{
            position: 'absolute',
            top: '-2px',
            right: '-2px',
            backgroundColor: colors.error,
            color: '#FFFFFF',
            fontSize: '9px',
            fontWeight: '700',
            width: '14px',
            height: '14px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px solid #FFFFFF',
          }}>
            3
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '12px', fontWeight: '700', color: colors.textPrimary }}>김관리 대리</div>
            <div style={{ fontSize: '11px', color: colors.textMuted }}>admin@ifm.com</div>
          </div>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            backgroundColor: '#F2F4F7',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}>
            <Icon name="user" size={20} color={colors.textMuted} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
