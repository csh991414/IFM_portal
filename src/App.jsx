import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import Dashboard from './pages/Dashboard';
import InterfaceManager from './pages/InterfaceManager';
import Monitoring from './pages/Monitoring';
import LogViewer from './pages/LogViewer';
import Reprocess from './pages/Reprocess';
import { colors } from './styles/tokens';
import { seedFirestore } from './firebase/seed';

function Layout({ children }) {
  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: colors.bg, overflow: 'hidden' }}>
      <Sidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <TopBar />
        <main style={{ flex: 1, overflowY: 'auto' }}>
          {children}
        </main>
      </div>
    </div>
  );
}

function App() {
    useEffect(() => {
    seedFirestore();
  }, []);
 

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
        <Route path="/interface" element={<Layout><InterfaceManager /></Layout>} />
        <Route path="/monitoring" element={<Layout><Monitoring /></Layout>} />
        <Route path="/log" element={<Layout><LogViewer /></Layout>} />
        <Route path="/reprocess" element={<Layout><Reprocess /></Layout>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
