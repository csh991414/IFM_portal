import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { colors, fonts } from '../styles/tokens';
import Icon from './Icon';

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  const sidebarStyle = {
    width: collapsed ? '56px' : '200px',
    height: '100vh',
    backgroundColor: colors.sidebar,
    transition: 'width 0.2s ease',
    display: 'flex',
    flexDirection: 'column',
    flexShrink: 0,
    borderRight: `1px solid ${colors.sidebarBorder}`,
    overflowX: 'hidden',
  };

  const logoContainerStyle = {
    height: '52px',
    padding: '0 16px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
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
    color: '#FFF',
    flexShrink: 0,
  };

  const logoTextStyle = {
    color: '#FFF',
    fontSize: '15px',
    fontWeight: 'bold',
    opacity: collapsed ? 0 : 1,
    transition: 'opacity 0.2s ease',
    whiteSpace: 'nowrap',
  };

  const navStyle = {
    padding: '16px 8px',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  };

  const navItemStyle = ({ isActive }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '10px',
    borderRadius: '6px',
    textDecoration: 'none',
    color: isActive ? '#FFF' : colors.sidebarText,
    backgroundColor: isActive ? colors.sidebarActive : 'transparent',
    transition: 'all 0.2s ease',
    whiteSpace: 'nowrap',
  });

  const footerStyle = {
    padding: '12px 8px',
    borderTop: `1px solid ${colors.sidebarBorder}`,
  };

  const collapseButtonStyle = {
    width: '100%',
    padding: '8px',
    backgroundColor: 'transparent',
    border: 'none',
    color: colors.sidebarText,
    cursor: 'pointer',
    display: 'flex',
    justifyContent: collapsed ? 'center' : 'flex-end',
    borderRadius: '6px',
  };

  const menuItems = [
    { name: '대시보드', path: '/dashboard', icon: 'dashboard' },
    { name: '인터페이스 관리', path: '/interface', icon: 'manager' },
    { name: '모니터링', path: '/monitoring', icon: 'monitoring' },
    { name: '로그', path: '/log', icon: 'log' },
    { name: '재처리', path: '/reprocess', icon: 'reprocess', badge: 1 },
  ];

  return (
    <div style={sidebarStyle}>
      <div style={logoContainerStyle}>
        <div style={logoIconStyle}>
          <Icon name="bolt" />
        </div>
        <span style={logoTextStyle}>IFM Portal</span>
      </div>

      <nav style={navStyle}>
        {menuItems.map((item) => (
          <NavLink key={item.path} to={item.path} style={navItemStyle}>
            <Icon name={item.icon} style={{ flexShrink: 0 }} />
            {!collapsed && <span style={{ flex: 1 }}>{item.name}</span>}
            {!collapsed && item.badge && (
              <span style={{ 
                backgroundColor: colors.error, 
                color: '#FFF', 
                fontSize: '10px', 
                padding: '1px 6px', 
                borderRadius: '10px' 
              }}>
                {item.badge}
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      <div style={footerStyle}>
        <button style={collapseButtonStyle} onClick={() => setCollapsed(!collapsed)}>
          <Icon name={collapsed ? 'chevronRight' : 'chevronLeft'} />
        </button>
      </div>
    </div>
  );
}
