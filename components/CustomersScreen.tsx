
import React from 'react';
import { Users, Search, Phone, ChevronRight, UserPlus, CircleDollarSign } from 'lucide-react';
import { Customer } from '../types';

const MOCK_CUSTOMERS: Customer[] = [
  { id: '1', name: 'Anh Hòa (Thầu)', phone: '0901234xxx', debt: 15400000, lastOrder: '2 giờ trước' },
  { id: '2', name: 'Chị Lan - Quận 7', phone: '0933444xxx', debt: 0, lastOrder: 'Hôm qua' },
  { id: '3', name: 'Chú Tư (Hóc Môn)', phone: '0988777xxx', debt: 2100000, lastOrder: '3 ngày trước' },
];

const CustomersScreen: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Khách hàng</h2>
        <button className="p-2 bg-blue-600 text-white rounded-xl">
          <UserPlus size={24} />
        </button>
      </div>

      <div className="bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl p-5 text-white shadow-lg shadow-red-100">
        <div className="flex items-center gap-2 mb-1">
          <CircleDollarSign size={16} className="text-red-100" />
          <h3 className="text-red-100 text-xs font-bold uppercase">Tổng nợ phải thu</h3>
        </div>
        <p className="text-3xl font-black">17.500.000đ</p>
        <p className="text-[10px] text-red-100 mt-2 italic">* Đã bao gồm lãi chậm trả (nếu có)</p>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <input 
          type="text" 
          placeholder="Tên khách, số điện thoại..." 
          className="w-full pl-12 pr-4 py-4 bg-white border border-gray-100 rounded-2xl shadow-sm outline-none"
        />
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 divide-y divide-gray-50 overflow-hidden shadow-sm">
        {MOCK_CUSTOMERS.map(c => (
          <div key={c.id} className="p-4 flex items-center gap-4 active:bg-gray-50 transition-colors">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center font-bold text-lg">
              {c.name.charAt(0)}
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-gray-900">{c.name}</h4>
              <div className="flex items-center gap-1 text-gray-400 text-[10px] mt-0.5">
                <Phone size={10} /> <span>{c.phone}</span>
              </div>
              {c.debt > 0 && (
                <p className="text-xs font-bold text-red-600 mt-1">Nợ: {c.debt.toLocaleString()}đ</p>
              )}
            </div>
            <ChevronRight size={20} className="text-gray-300" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomersScreen;
