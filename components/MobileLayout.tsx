
import React from 'react';
import { NAVIGATION_TABS } from '../constants';
import { TabType } from '../types';
import { Bell, Search, User } from 'lucide-react';

interface MobileLayoutProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  children: React.ReactNode;
}

const MobileLayout: React.FC<MobileLayoutProps> = ({ activeTab, setActiveTab, children }) => {
  return (
    <div className="flex flex-col min-h-screen pb-20">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 px-4 py-3 safe-top flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">B</span>
          </div>
          <div>
            <h1 className="text-lg font-bold text-blue-900 leading-none">BizFlow</h1>
            <p className="text-[10px] text-gray-500 uppercase tracking-wider">Quản lý kinh doanh</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full">
            <Search size={20} />
          </button>
          <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full relative">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
          <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-200">
            <img src="https://picsum.photos/seed/user123/100/100" alt="Avatar" className="w-full h-full object-cover" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto px-4 py-6">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 safe-bottom px-2 py-1 flex justify-around items-center z-50">
        {NAVIGATION_TABS.slice(0, 5).map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as TabType)}
            className={`flex flex-col items-center justify-center py-2 px-1 rounded-xl transition-colors min-w-[64px] ${
              activeTab === tab.id ? 'text-blue-600' : 'text-gray-400'
            }`}
          >
            <div className={`p-1.5 rounded-lg mb-1 ${activeTab === tab.id ? 'bg-blue-50' : ''}`}>
              {tab.icon}
            </div>
            <span className="text-[10px] font-medium">{tab.label}</span>
          </button>
        ))}
        {/* More button for the 6th tab if needed, or just Settings */}
        <button
          onClick={() => setActiveTab('settings')}
          className={`flex flex-col items-center justify-center py-2 px-1 rounded-xl transition-colors min-w-[64px] ${
            activeTab === 'settings' ? 'text-blue-600' : 'text-gray-400'
          }`}
        >
          <div className={`p-1.5 rounded-lg mb-1 ${activeTab === 'settings' ? 'bg-blue-50' : ''}`}>
            <User size={20} />
          </div>
          <span className="text-[10px] font-medium">Cấu hình</span>
        </button>
      </nav>
    </div>
  );
};

export default MobileLayout;
