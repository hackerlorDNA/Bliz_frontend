
import React from 'react';
import { BarChart3, TrendingUp, Calendar, ArrowUpRight, Download } from 'lucide-react';

const ReportsScreen: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Báo cáo</h2>
        <button className="p-2 bg-gray-100 text-gray-600 rounded-xl">
          <Calendar size={20} />
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden">
          <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">Doanh thu tháng này</p>
          <div className="flex items-baseline gap-2 mt-2">
            <p className="text-3xl font-black text-gray-900">452.8M</p>
            <span className="text-green-500 text-xs font-bold flex items-center">
              <ArrowUpRight size={14} /> +12.5%
            </span>
          </div>
          
          {/* Simulated Chart Bars */}
          <div className="flex items-end gap-2 h-24 mt-6">
            {[40, 70, 50, 90, 60, 80, 100].map((h, i) => (
              <div 
                key={i} 
                className={`flex-1 rounded-t-lg transition-all duration-1000 ${i === 6 ? 'bg-blue-600' : 'bg-blue-100'}`} 
                style={{ height: `${h}%` }}
              ></div>
            ))}
          </div>
        </div>

        <div className="bg-indigo-900 p-6 rounded-3xl text-white shadow-xl shadow-indigo-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-indigo-200 text-xs font-bold uppercase">Lợi nhuận gộp</p>
              <p className="text-2xl font-black mt-1">85.2M</p>
            </div>
            <div className="p-3 bg-white/10 rounded-2xl">
              <TrendingUp size={24} />
            </div>
          </div>
          <p className="text-[10px] text-indigo-300 mt-4 leading-relaxed">
            Hiệu suất bán hàng tăng mạnh nhờ nhóm vật liệu trang trí nội thất.
          </p>
        </div>
      </div>

      <button className="w-full bg-white border border-gray-100 py-4 rounded-2xl font-bold text-gray-700 flex items-center justify-center gap-2 active:bg-gray-50 transition-colors">
        <Download size={18} /> Xuất báo cáo Excel
      </button>
    </div>
  );
};

export default ReportsScreen;
