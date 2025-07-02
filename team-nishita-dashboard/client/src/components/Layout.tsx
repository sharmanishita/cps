// components/Layout.tsx
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const sidebarWidth = collapsed ? 64 : 220;

  return (
    <div className="flex h-screen">
      {/* Sidebar container */}
      <div
        className="transition-all duration-300"
        style={{ width: `${sidebarWidth}px`, minWidth: `${sidebarWidth}px` }}
      >
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      </div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="p-6 overflow-auto bg-white dark:bg-gray-950 text-black dark:text-white">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
