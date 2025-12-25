
import React, { useState } from 'react';
import { ShoppingCart, Plus, Filter, ChevronRight, ReceiptText, Clock } from 'lucide-react';
import { Order, Product, Customer } from '../types';
import POSModal from './POSModal';

const MOCK_ORDERS: Order[] = [
  { id: 'ORD-8821', customerName: 'Anh Hòa', total: 850000, status: 'debt', date: '10:30 Hôm nay', items: [] },
  { id: 'ORD-8820', customerName: 'Chị Lan', total: 120000, status: 'completed', date: '09:15 Hôm nay', items: [] },
  { id: 'ORD-8819', customerName: 'Khách lẻ', total: 45000, status: 'completed', date: 'Hôm qua', items: [] },
];

const MOCK_PRODUCTS: Product[] = [
  { id: '1', name: 'Xi măng Hà Tiên', price: 85000, stock: 150, unit: 'Bao', category: 'Vật liệu xây dựng' },
  { id: '2', name: 'Thép Pomina Φ10', price: 185000, stock: 5, unit: 'Cây', category: 'Sắt thép' },
  { id: '3', name: 'Gạch ống 4 lỗ', price: 1200, stock: 5000, unit: 'Viên', category: 'Vật liệu xây dựng' },
  { id: '4', name: 'Sơn Dulux 5L', price: 450000, stock: 12, unit: 'Thùng', category: 'Sơn' },
];

const MOCK_CUSTOMERS: Customer[] = [
  { id: '1', name: 'Anh Hòa (Thầu)', phone: '0901234xxx', debt: 15400000, lastOrder: '2 giờ trước' },
  { id: '2', name: 'Chị Lan - Quận 7', phone: '0933444xxx', debt: 0, lastOrder: 'Hôm qua' },
  { id: '3', name: 'Chú Tư (Hóc Môn)', phone: '0988777xxx', debt: 2100000, lastOrder: '3 ngày trước' },
];

const OrdersScreen: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);
  const [isPOSOpen, setIsPOSOpen] = useState(false);

  const handleNewOrder = (newOrder: Order) => {
    setOrders([newOrder, ...orders]);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500 pb-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Đơn hàng</h2>
        <div className="flex gap-2">
          <button className="p-2 bg-gray-100 text-gray-600 rounded-xl">
            <Filter size={20} />
          </button>
          <button 
            onClick={() => setIsPOSOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl shadow-lg shadow-blue-200 font-bold text-sm"
          >
            <Plus size={18} /> Bán hàng
          </button>
        </div>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {['Tất cả', 'Hoàn thành', 'Ghi nợ', 'Đang xử lý'].map((tab, idx) => (
          <button key={idx} className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold ${idx === 0 ? 'bg-blue-600 text-white shadow-md shadow-blue-100' : 'bg-white text-gray-500 border border-gray-100'}`}>
            {tab}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {orders.map(order => (
          <div key={order.id} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm active:bg-gray-50 transition-colors">
            <div className="flex justify-between items-start mb-3">
              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{order.id}</span>
                <h4 className="font-bold text-gray-900">{order.customerName}</h4>
              </div>
              <span className={`text-[10px] px-2 py-1 rounded-lg font-bold uppercase ${
                order.status === 'completed' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
              }`}>
                {order.status === 'completed' ? 'Thành công' : 'Ghi nợ'}
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 text-gray-400 text-xs">
                <Clock size={12} />
                <span>{order.date}</span>
              </div>
              <p className="text-lg font-black text-gray-900">{order.total.toLocaleString()}đ</p>
            </div>

            <div className="mt-4 pt-4 border-t border-dashed border-gray-100 flex gap-2">
              <button className="flex-1 py-2 bg-gray-50 rounded-xl text-gray-600 text-xs font-bold flex items-center justify-center gap-2">
                <ReceiptText size={14} /> In hóa đơn
              </button>
              <button className="w-10 h-10 bg-blue-50 rounded-xl text-blue-600 flex items-center justify-center">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {isPOSOpen && (
        <POSModal 
          products={MOCK_PRODUCTS}
          customers={MOCK_CUSTOMERS}
          onClose={() => setIsPOSOpen(false)}
          onComplete={handleNewOrder}
        />
      )}
    </div>
  );
};

export default OrdersScreen;
