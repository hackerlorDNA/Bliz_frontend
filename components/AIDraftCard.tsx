
import React from 'react';
import { Sparkles, Check, X, FileText } from 'lucide-react';
import { AIDraftOrder } from '../types';

interface AIDraftCardProps {
  draft: AIDraftOrder;
  onConfirm: () => void;
  onCancel: () => void;
}

const AIDraftCard: React.FC<AIDraftCardProps> = ({ draft, onConfirm, onCancel }) => {
  return (
    <div className="bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-100 rounded-2xl p-4 shadow-sm animate-in zoom-in-95 duration-300">
      <div className="flex items-center gap-2 mb-3">
        <div className="bg-indigo-600 p-1.5 rounded-lg text-white">
          <Sparkles size={16} />
        </div>
        <h4 className="text-sm font-bold text-indigo-900">Đơn hàng AI gợi ý</h4>
      </div>
      
      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Khách hàng:</span>
          <span className="font-bold text-gray-900">{draft.customerName}</span>
        </div>
        <div className="space-y-1">
          {draft.items.map((item, idx) => (
            <div key={idx} className="flex justify-between text-sm bg-white/50 px-2 py-1 rounded">
              <span>{item.name}</span>
              <span className="font-medium">x{item.quantity}</span>
            </div>
          ))}
        </div>
        {draft.isDebt && (
          <div className="inline-flex items-center gap-1 text-[10px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-full">
            GHI NỢ
          </div>
        )}
      </div>

      <div className="flex gap-2">
        <button 
          onClick={onConfirm}
          className="flex-1 bg-indigo-600 text-white py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1 active:scale-95 transition-transform"
        >
          <Check size={14} /> Xác nhận
        </button>
        <button 
          onClick={onCancel}
          className="px-4 py-2 border border-indigo-200 text-indigo-600 rounded-xl text-xs font-bold active:scale-95 transition-transform"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
};

export default AIDraftCard;
