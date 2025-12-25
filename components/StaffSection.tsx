
import React, { useState, useEffect } from 'react';
import { Plus, Search, MoreVertical, Phone, Mail } from 'lucide-react';
import { Staff } from '../types';

const MOCK_STAFF: Staff[] = [
  { id: '1', name: 'Lê Trọng Phúc', role: 'Chủ cửa hàng', status: 'active', avatar: 'https://picsum.photos/seed/p1/100/100', phone: '0987654321' },
  { id: '2', name: 'Nguyễn Văn An', role: 'Quản lý', status: 'active', avatar: 'https://picsum.photos/seed/p2/100/100', phone: '0123456789' },
  { id: '3', name: 'Trần Thị Bình', role: 'Nhân viên bán hàng', status: 'inactive', avatar: 'https://picsum.photos/seed/p3/100/100', phone: '0909090909' },
];

const StaffSection: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [staffList, setStaffList] = useState<Staff[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStaffList(MOCK_STAFF);
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-800">Danh sách nhân viên</h2>
        <button className="flex items-center gap-1.5 bg-blue-600 text-white px-3 py-1.5 rounded-lg text-sm font-semibold shadow-md active:scale-95 transition-transform">
          <Plus size={16} />
          <span>Thêm mới</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 flex flex-col items-center justify-center space-y-3">
            <div className="w-8 h-8 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin"></div>
            <p className="text-gray-400 text-sm italic font-medium">Đang tải dữ liệu...</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {staffList.map((staff) => (
              <div key={staff.id} className="p-4 flex items-center gap-4 active:bg-gray-50 transition-colors">
                <div className="relative">
                  <img src={staff.avatar} alt={staff.name} className="w-12 h-12 rounded-full object-cover border border-gray-200" />
                  <span className={`absolute bottom-0 right-0 w-3 h-3 border-2 border-white rounded-full ${staff.status === 'active' ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                </div>
                
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-gray-900 truncate">{staff.name}</h4>
                  <p className="text-xs text-gray-500">{staff.role}</p>
                  <div className="flex items-center gap-3 mt-1 text-[10px] text-gray-400">
                    <span className="flex items-center gap-1"><Phone size={10} /> {staff.phone}</span>
                  </div>
                </div>

                <button className="p-2 text-gray-400">
                  <MoreVertical size={18} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {!loading && staffList.length > 0 && (
        <p className="mt-4 text-center text-xs text-gray-400">
          Hiển thị {staffList.length} nhân viên
        </p>
      )}
    </div>
  );
};

export default StaffSection;
