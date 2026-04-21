import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import Dashboard from './pages/Dashboard';
import InterfaceManager from './pages/InterfaceManager';
import Monitoring from './pages/Monitoring';
import LogViewer from './pages/LogViewer';
import Reprocess from './pages/Reprocess';
import { colors } from './styles/tokens';

function App() {
  return (
    <BrowserRouter>
      <div style={{ display: 'flex', height: '100vh', backgroundColor: colors.bg, overflow: 'hidden' }}>
        <Sidebar />
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
          <TopBar />
          <main style={{ flex: 1, overflowY: 'auto' }}>
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/interface" element={<InterfaceManager />} />
              <Route path="/monitoring" element={<Monitoring />} />
              <Route path="/log" element={<LogViewer />} />
              <Route path="/reprocess" element={<Reprocess />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
