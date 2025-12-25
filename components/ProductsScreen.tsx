
import React, { useState } from 'react';
import { Search, Plus, Package, MoreVertical, AlertTriangle } from 'lucide-react';
import { Product } from '../types';

const MOCK_PRODUCTS: Product[] = [
  { id: '1', name: 'Xi măng Hà Tiên', price: 85000, stock: 150, unit: 'Bao', category: 'Vật liệu xây dựng' },
  { id: '2', name: 'Thép Pomina Φ10', price: 185000, stock: 5, unit: 'Cây', category: 'Sắt thép' },
  { id: '3', name: 'Gạch ống 4 lỗ', price: 1200, stock: 5000, unit: 'Viên', category: 'Vật liệu xây dựng' },
  { id: '4', name: 'Sơn Dulux 5L', price: 450000, stock: 12, unit: 'Thùng', category: 'Sơn' },
];

const ProductsScreen: React.FC = () => {
  const [search, setSearch] = useState('');
  
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Sản phẩm</h2>
        <button className="p-2 bg-blue-600 text-white rounded-xl shadow-lg shadow-blue-200">
          <Plus size={24} />
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <input 
          type="text" 
          placeholder="Tìm sản phẩm, mã vạch..." 
          className="w-full pl-12 pr-4 py-4 bg-white border border-gray-100 rounded-2xl shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100">
          <p className="text-blue-600 text-[10px] font-bold uppercase">Tổng mã hàng</p>
          <p className="text-2xl font-black text-blue-900 mt-1">428</p>
        </div>
        <div className="bg-red-50 p-4 rounded-2xl border border-red-100">
          <p className="text-red-600 text-[10px] font-bold uppercase">Sắp hết hàng</p>
          <p className="text-2xl font-black text-red-900 mt-1">12</p>
        </div>
      </div>

      <div className="space-y-3">
        {MOCK_PRODUCTS.map(p => (
          <div key={p.id} className="bg-white p-4 rounded-2xl border border-gray-100 flex items-center gap-4">
            <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400">
              <Package size={24} />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-gray-900">{p.name}</h4>
              <p className="text-xs text-gray-500">{p.category} • {p.unit}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm font-bold text-blue-600">{p.price.toLocaleString()}đ</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${p.stock <= 10 ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                  Kho: {p.stock}
                </span>
              </div>
            </div>
            <button className="text-gray-300">
              <MoreVertical size={20} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsScreen;
