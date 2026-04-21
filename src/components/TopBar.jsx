import React from 'react';
import { useLocation } from 'react-router-dom';
import { colors } from '../styles/tokens';
import Icon from './Icon';

const pageNames = {
  '/dashboard': '대시보드',
  '/interface': '인터페이스 관리',
  '/monitoring': '실시간 모니터링',
  '/log': '로그 조회',
  '/reprocess': '재처리 관리',
};

export default function TopBar() {
  const location = useLocation();
  const pageName = pageNames[location.pathname] || 'IFM Portal';

  const containerStyle = {
    height: '52px',
    backgroundColor: '#FFF',
    borderBottom: `1px solid ${colors.border}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 24px',
    flexShrink: 0,
  };

  const leftStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  };

  const titleStyle = {
    fontSize: '15px',
    fontWeight: 'bold',
    color: colors.textPrimary,
  };

  const versionStyle = {
    fontSize: '12px',
    color: colors.textMuted,
    marginLeft: '8px',
  };

  const rightStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  };

  const statusStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '12px',
    color: colors.textSecondary,
  };

  const dotStyle = {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    backgroundColor: colors.success,
  };

  const userStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  };

  const avatarStyle = {
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    backgroundColor: colors.primaryBg,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: '12px',
  };

  return (
    <div style={containerStyle}>
      <div style={leftStyle}>
        <span style={titleStyle}>{pageName}</span>
        <span style={versionStyle}>IFMS v2.4.1</span>
      </div>

      <div style={rightStyle}>
        <div style={statusStyle}>
          <span style={dotStyle} />
          시스템 정상
        </div>

        <div style={{ position: 'relative', color: colors.textSecondary }}>
          <Icon name="bell" />
          <span style={{
            position: 'absolute',
            top: '-2px',
            right: '-2px',
            width: '12px',
            height: '12px',
            backgroundColor: colors.error,
            borderRadius: '50%',
            border: '2px solid #FFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '8px',
            color: '#FFF',
            fontWeight: 'bold',
          }}>3</span>
        </div>

        <div style={userStyle}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '12px', fontWeight: 'bold', color: colors.textPrimary }}>김관리 대리</div>
            <div style={{ fontSize: '10px', color: colors.textMuted }}>admin@ifm.com</div>
          </div>
          <div style={avatarStyle}>K</div>
        </div>
      </div>
    </div>
  );
}
