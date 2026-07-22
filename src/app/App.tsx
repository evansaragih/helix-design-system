import { useState } from 'react';
import { Agentation } from 'agentation';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { MainContent } from './components/MainContent';
import { LoginPage } from '@/pages/auth/LoginPage';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');
  const [isCollapsed, setIsCollapsed] = useState(false);

  if (!isAuthenticated) {
    return <LoginPage onAuthenticated={() => setIsAuthenticated(true)} />;
  }

  return (
    <>
      <div className="min-h-screen" style={{ backgroundColor: 'var(--color-bg-secondary)' }}>
        <Sidebar
          activeSection={activeSection}
          onSectionChange={setActiveSection}
          isCollapsed={isCollapsed}
        />
        <Header
          isCollapsed={isCollapsed}
          onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
          onSectionChange={setActiveSection}
        />
        <MainContent
          activeSection={activeSection}
          isCollapsed={isCollapsed}
        />
      </div>
      {import.meta.env.DEV && <Agentation />}
    </>
  );
}