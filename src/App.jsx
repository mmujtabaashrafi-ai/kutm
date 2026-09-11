import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import OverviewPage from './pages/OverviewPage';
import ChatPage from './pages/ChatPage';
import DocumentsPage from './pages/DocumentsPage';
import AgentsPage from './pages/AgentsPage';
import KnowledgePage from './pages/KnowledgePage';
import ModelsPage from './pages/ModelsPage';
import MonitoringPage from './pages/MonitoringPage';
import AuditLogsPage from './pages/AuditLogsPage';
import SettingsPage from './pages/SettingsPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<OverviewPage />} />
          <Route path="chat" element={<ChatPage />} />
          <Route path="documents" element={<DocumentsPage />} />
          <Route path="agents" element={<AgentsPage />} />
          <Route path="knowledge" element={<KnowledgePage />} />
          <Route path="models" element={<ModelsPage />} />
          <Route path="monitoring" element={<MonitoringPage />} />
          <Route path="audit-logs" element={<AuditLogsPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
