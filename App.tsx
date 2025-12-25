
import React, { useState, useEffect } from 'react';
import MobileLayout from './components/MobileLayout';
import StatsCard from './components/StatsCard';
import StaffSection from './components/StaffSection';
import LoginScreen from './components/LoginScreen';
import ProductsScreen from './components/ProductsScreen';
import OrdersScreen from './components/OrdersScreen';
import CustomersScreen from './components/CustomersScreen';
import ReportsScreen from './components/ReportsScreen';
import AIDraftCard from './components/AIDraftCard';
import { TabType, AIDraftOrder } from './types';
import { NAVIGATION_TABS } from './constants';
import { TrendingUp, Package, ShoppingCart, UserPlus, LogOut, ChevronRight, Shield, BellRing, Smartphone, Sparkles, Mic, Send } from 'lucide-react';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [aiInput, setAiInput] = useState('');
  const [aiDraft, setAiDraft] = useState<AIDraftOrder | null>(null);

  useEffect(() => {
    const authStatus = localStorage.getItem('isLoggedIn');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('isLoggedIn', 'true');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isLoggedIn');
    setActiveTab('overview');
  };

  const handleAiSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiInput.trim()) return;

    // Giả lập AI xử lý câu lệnh
    // "bán 10 bao xi măng cho anh Hòa, ghi nợ nha"
    const isDebt = aiInput.toLowerCase().includes('nợ');
    const hasHoa = aiInput.toLowerCase().includes('hòa');
    
    setAiDraft({
      customerName: hasHoa ? 'Anh Hòa' : 'Khách vãng lai',
      items: [{ name: 'Xi măng Hà Tiên', quantity: 10 }],
      isDebt: isDebt
    });
    setAiInput('');
  };

  if (!isAuthenticated) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="mb-2">
              <h2 className="text-2xl font-bold text-gray-900">Trang quản trị</h2>
              <p className="text-gray-500 text-sm">Chào mừng quay trở lại, Phúc!</p>
            </div>

            {/* AI Command Input */}
            <div className="bg-white rounded-3xl border border-blue-50 p-2 shadow-xl shadow-blue-100/50">
              <form onSubmit={handleAiSubmit} className="relative flex items-center">
                <div className="p-3 text-blue-600">
                  <Sparkles size={20} className="animate-pulse" />
                </div>
                <input 
                  type="text" 
                  placeholder="Thử: 'Bán 10 bao xi măng cho anh Hòa...'"
                  className="flex-1 py-3 text-sm font-medium outline-none bg-transparent placeholder-gray-400"
                  value={aiInput}
                  onChange={(e) => setAiInput(e.target.value)}
                />
                <button type="submit" className="p-3 text-blue-600 hover:bg-blue-50 rounded-2xl transition-colors">
                  <Send size={20} />
                </button>
                <button type="button" className="p-3 text-gray-400">
                  <Mic size={20} />
                </button>
              </form>
            </div>

            {aiDraft && (
              <AIDraftCard 
                draft={aiDraft} 
                onConfirm={() => {
                  setAiDraft(null);
                  setActiveTab('orders');
                }}
                onCancel={() => setAiDraft(null)}
              />
            )}

            <div className="grid grid-cols-1 gap-4">
              <StatsCard 
                title="Doanh thu hôm nay" 
                value="2.450.000đ" 
                trend={8} 
              />
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                  <div className="w-8 h-8 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center mb-3">
                    <ShoppingCart size={18} />
                  </div>
                  <p className="text-gray-500 text-xs font-medium">Đơn hàng</p>
                  <p className="text-xl font-bold text-gray-900 mt-1">12</p>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                  <div className="w-8 h-8 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mb-3">
                    <TrendingUp size={18} />
                  </div>
                  <p className="text-gray-500 text-xs font-medium">Lợi nhuận</p>
                  <p className="text-xl font-bold text-gray-900 mt-1">850k</p>
                </div>
              </div>
            </div>

            <StaffSection />
          </div>
        );

      case 'products':
        return <ProductsScreen />;
      
      case 'orders':
        return <OrdersScreen />;

      case 'customers':
        return <CustomersScreen />;
      
      case 'reports':
        return <ReportsScreen />;

      case 'settings':
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            <h2 className="text-2xl font-bold text-gray-900">Cấu hình</h2>
            
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-6 flex items-center gap-4 bg-gradient-to-br from-blue-50 to-white">
                 <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-white shadow-md">
                    <img src="https://picsum.photos/seed/user123/150/150" alt="Profile" className="w-full h-full object-cover" />
                 </div>
                 <div className="flex-1">
                    <h3 className="font-bold text-gray-900">Lê Trọng Phúc</h3>
                    <p className="text-xs text-blue-600 font-bold uppercase tracking-wider">Chủ cửa hàng</p>
                 </div>
              </div>
            </div>

            <div className="space-y-4">
               <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] px-1">Tùy chỉnh hệ thống</h3>
               <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden divide-y divide-gray-50">
                  <div className="p-4 flex items-center justify-between active:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center"><Shield size={20} /></div>
                      <div>
                        <span className="block font-bold text-gray-900 text-sm">Bảo mật & Quyền hạn</span>
                        <span className="text-[10px] text-gray-400">Thiết lập 2FA, phân quyền nhân viên</span>
                      </div>
                    </div>
                    <ChevronRight size={18} className="text-gray-300" />
                  </div>
                  <div className="p-4 flex items-center justify-between active:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center"><BellRing size={20} /></div>
                      <div>
                        <span className="block font-bold text-gray-900 text-sm">Thông báo & Sự kiện</span>
                        <span className="text-[10px] text-gray-400">Quản lý cảnh báo tồn kho, công nợ</span>
                      </div>
                    </div>
                    <ChevronRight size={18} className="text-gray-300" />
                  </div>
                  <div className="p-4 flex items-center justify-between active:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-50 text-green-600 rounded-xl flex items-center justify-center"><Smartphone size={20} /></div>
                      <div>
                        <span className="block font-bold text-gray-900 text-sm">Kết nối máy in</span>
                        <span className="text-[10px] text-gray-400">Kết nối máy in nhiệt Bluetooth/Wifi</span>
                      </div>
                    </div>
                    <ChevronRight size={18} className="text-gray-300" />
                  </div>
               </div>
            </div>

            <button 
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 p-4 bg-red-50 text-red-600 rounded-2xl font-bold active:scale-[0.98] transition-all"
            >
              <LogOut size={20} />
              Đăng xuất tài khoản
            </button>
          </div>
        );
      
      default:
        return (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <h2 className="text-xl font-bold text-gray-800 capitalize">{activeTab}</h2>
            <button onClick={() => setActiveTab('overview')} className="mt-4 text-blue-600 font-bold">Quay về</button>
          </div>
        );
    }
  };

  return (
    <MobileLayout activeTab={activeTab} setActiveTab={setActiveTab}>
      {renderContent()}
    </MobileLayout>
  );
};

export default App;
