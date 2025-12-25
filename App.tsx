
import React, { useState, useEffect } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
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
import { 
  TrendingUp, 
  ShoppingCart, 
  LogOut, 
  ChevronRight, 
  Shield, 
  BellRing, 
  Smartphone, 
  Sparkles, 
  Mic, 
  Send, 
  Loader2,
  Key,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

// Define the interface for AIStudio to match environment expectations
interface AIStudio {
  hasSelectedApiKey: () => Promise<boolean>;
  openSelectKey: () => Promise<void>;
}

// Khai báo kiểu cho window.aistudio để TypeScript không báo lỗi
// Đảm bảo kiểu dữ liệu khớp chính xác với yêu cầu của hệ thống (AIStudio)
declare global {
  interface Window {
    aistudio?: AIStudio;
  }
}

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [aiInput, setAiInput] = useState('');
  const [aiDraft, setAiDraft] = useState<AIDraftOrder | null>(null);
  const [isAiProcessing, setIsAiProcessing] = useState(false);
  const [hasApiKey, setHasApiKey] = useState<boolean | null>(null);

  useEffect(() => {
    const authStatus = localStorage.getItem('isLoggedIn');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
    checkApiKey();
  }, []);

  const checkApiKey = async () => {
    if (window.aistudio) {
      const selected = await window.aistudio.hasSelectedApiKey();
      setHasApiKey(selected);
    }
  };

  const handleConnectAi = async () => {
    if (window.aistudio) {
      await window.aistudio.openSelectKey();
      // Giả định chọn thành công theo race condition rule
      setHasApiKey(true);
    }
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('isLoggedIn', 'true');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isLoggedIn');
    setActiveTab('overview');
  };

  const handleAiSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiInput.trim() || isAiProcessing) return;

    setIsAiProcessing(true);
    try {
      // Khởi tạo instance mới mỗi lần gọi để đảm bảo lấy key mới nhất
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Phân tích câu lệnh bán hàng sau và trích xuất thông tin đơn hàng: "${aiInput}"`,
        config: {
          systemInstruction: "Bạn là trợ lý bán hàng thông minh cho cửa hàng vật liệu xây dựng. Hãy trích xuất thông tin đơn hàng dưới dạng JSON chính xác. Nếu không rõ tên khách hãy để 'Khách vãng lai'. Nếu không rõ đơn vị, mặc định số lượng là số.",
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              customerName: { type: Type.STRING, description: "Tên khách hàng" },
              items: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING, description: "Tên sản phẩm" },
                    quantity: { type: Type.NUMBER, description: "Số lượng" }
                  },
                  required: ["name", "quantity"]
                }
              },
              isDebt: { type: Type.BOOLEAN, description: "Có phải ghi nợ không" }
            },
            required: ["customerName", "items", "isDebt"]
          }
        },
      });

      const result = JSON.parse(response.text || "{}");
      setAiDraft(result);
      setAiInput('');
    } catch (error: any) {
      console.error("AI Error:", error);
      if (error?.message?.includes("Requested entity was not found")) {
        setHasApiKey(false);
        alert("Lỗi xác thực API Key. Vui lòng kết nối lại trong phần Cài đặt.");
      } else {
        alert("AI không hiểu câu lệnh này hoặc có lỗi kết nối. Vui lòng thử lại!");
      }
    } finally {
      setIsAiProcessing(false);
    }
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
            <div className={`bg-white rounded-3xl border ${isAiProcessing ? 'border-blue-400' : 'border-blue-50'} p-2 shadow-xl shadow-blue-100/50 transition-all`}>
              <form onSubmit={handleAiSubmit} className="relative flex items-center">
                <div className="p-3 text-blue-600">
                  {isAiProcessing ? (
                    <Loader2 size={20} className="animate-spin" />
                  ) : (
                    <Sparkles size={20} className="animate-pulse" />
                  )}
                </div>
                <input 
                  type="text" 
                  placeholder={!hasApiKey ? "Vui lòng kết nối AI trong Cài đặt..." : (isAiProcessing ? "AI đang xử lý..." : "Bán 10 bao xi măng cho anh Hòa...")}
                  className="flex-1 py-3 text-sm font-medium outline-none bg-transparent placeholder-gray-400"
                  value={aiInput}
                  disabled={isAiProcessing || !hasApiKey}
                  onChange={(e) => setAiInput(e.target.value)}
                />
                <button 
                  type="submit" 
                  disabled={isAiProcessing || !aiInput.trim() || !hasApiKey}
                  className="p-3 text-blue-600 hover:bg-blue-50 rounded-2xl transition-colors disabled:opacity-30"
                >
                  <Send size={20} />
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

      case 'products': return <ProductsScreen />;
      case 'orders': return <OrdersScreen />;
      case 'customers': return <CustomersScreen />;
      case 'reports': return <ReportsScreen />;
      case 'settings':
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500 pb-10">
            <h2 className="text-2xl font-bold text-gray-900">Cấu hình</h2>
            
            {/* User Profile Card */}
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

            {/* AI Connection Section */}
            <div className="space-y-4">
               <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] px-1">Dịch vụ AI thông minh</h3>
               <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
                        <Sparkles size={20} />
                      </div>
                      <div>
                        <span className="block font-bold text-gray-900 text-sm">Trạng thái Gemini AI</span>
                        <div className="flex items-center gap-1 mt-0.5">
                          {hasApiKey ? (
                            <>
                              <CheckCircle2 size={12} className="text-green-500" />
                              <span className="text-[10px] text-green-600 font-bold uppercase">Đã kết nối</span>
                            </>
                          ) : (
                            <>
                              <AlertCircle size={12} className="text-amber-500" />
                              <span className="text-[10px] text-amber-600 font-bold uppercase">Chưa cấu hình</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    {!hasApiKey && (
                      <button 
                        onClick={handleConnectAi}
                        className="bg-indigo-600 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-lg shadow-indigo-100 active:scale-95 transition-all"
                      >
                        Kết nối ngay
                      </button>
                    )}
                  </div>
                  <p className="text-[10px] text-gray-400 leading-relaxed italic">
                    * Sử dụng công nghệ Gemini 3 Flash để tự động tạo đơn hàng từ lời nói và tin nhắn.
                    Bạn cần chọn một API Key từ Project đã bật Billing tại <a href="