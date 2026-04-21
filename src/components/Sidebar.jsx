import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { colors, fonts } from '../styles/tokens';
import { Icon } from './Icon';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { name: '대시보드', path: '/dashboard', icon: 'dashboard' },
    { name: '인터페이스 관리', path: '/interface', icon: 'management' },
    { name: '모니터링', path: '/monitoring', icon: 'monitoring' },
    { name: '로그', path: '/log', icon: 'log' },
    { name: '재처리', path: '/reprocess', icon: 'reprocess', badge: 1 },
  ];

  const sidebarStyle = {
    width: isCollapsed ? '56px' : '200px',
    height: '100vh',
    backgroundColor: colors.sidebar,
    transition: 'width 0.2s ease',
    display: 'flex',
    flexDirection: 'column',
    borderRight: `1px solid ${colors.sidebarBorder}`,
    flexShrink: 0,
    zIndex: 100,
  };

  const logoContainerStyle = {
    height: '52px',
    display: 'flex',
    alignItems: 'center',
    padding: isCollapsed ? '0 16px' : '0 20px',
    gap: '12px',
    borderBottom: `1px solid ${colors.sidebarBorder}`,
  };

  const logoIconStyle = {
    width: '24px',
    height: '24px',
    backgroundColor: colors.primary,
    borderRadius: '6px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  };

  const navItemStyle = (isActive) => ({
    height: '48px',
    display: 'flex',
    alignItems: 'center',
    padding: isCollapsed ? '0 16px' : '0 20px',
    gap: '12px',
    textDecoration: 'none',
    backgroundColor: isActive ? colors.sidebarActive : 'transparent',
    color: isActive ? '#FFFFFF' : colors.sidebarText,
    transition: 'all 0.2s',
    position: 'relative',
    overflow: 'hidden',
  });

  return (
    <aside style={sidebarStyle}>
      <div style={logoContainerStyle}>
        <div style={logoIconStyle}>
          <Icon name="bolt" size={14} color="#FFFFFF" />
        </div>
        {!isCollapsed && (
          <span style={{ 
            color: '#FFFFFF', 
            fontWeight: '700', 
            fontSize: '15px', 
            whiteSpace: 'nowrap' 
          }}>
            IFM Portal
          </span>
        )}
      </div>

      <nav style={{ flex: 1, padding: '12px 0' }}>
        {menuItems.map((item) => (
          <NavLink key={item.path} to={item.path} style={({ isActive }) => navItemStyle(isActive)}>
            {({ isActive }) => (
              <>
                <Icon 
                  name={item.icon} 
                  size={20} 
                  color={isActive ? colors.primary : colors.sidebarText} 
                />
                {!isCollapsed && (
                  <span style={{ fontSize: '13px', fontWeight: '500', flex: 1 }}>
                    {item.name}
                  </span>
                )}
                {!isCollapsed && item.badge && (
                  <span style={{
                    backgroundColor: colors.error,
                    color: '#FFFFFF',
                    fontSize: '10px',
                    fontWeight: '700',
                    padding: '1px 6px',
                    borderRadius: '10px',
                    minWidth: '16px',
                    textAlign: 'center',
                  }}>
                    {item.badge}
                  </span>
                )}
                {isActive && (
                  <div style={{
                    position: 'absolute',
                    left: 0,
                    top: '12px',
                    bottom: '12px',
                    width: '3px',
                    backgroundColor: colors.primary,
                    borderRadius: '0 4px 4px 0',
                  }} />
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div 
        onClick={() => setIsCollapsed(!isCollapsed)}
        style={{
          height: '48px',
          display: 'flex',
          alignItems: 'center',
          padding: isCollapsed ? '0 16px' : '0 20px',
          cursor: 'pointer',
          borderTop: `1px solid ${colors.sidebarBorder}`,
          color: colors.sidebarText,
        }}
      >
        <Icon name={isCollapsed ? 'chevronRight' : 'chevronLeft'} size={20} />
        {!isCollapsed && <span style={{ marginLeft: '12px', fontSize: '12px' }}>접기</span>}
      </div>
    </aside>
  );
};

export default Sidebar;
