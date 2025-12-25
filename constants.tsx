
import React from 'react';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  BarChart3, 
  Settings,
  Plus,
  Bell,
  Search,
  MoreVertical
} from 'lucide-react';

export const NAVIGATION_TABS = [
  { id: 'overview', label: 'Tổng quan', icon: <LayoutDashboard size={20} /> },
  { id: 'products', label: 'Sản phẩm', icon: <Package size={20} /> },
  { id: 'orders', label: 'Đơn hàng', icon: <ShoppingCart size={20} /> },
  { id: 'customers', label: 'Khách hàng', icon: <Users size={20} /> },
  { id: 'reports', label: 'Báo cáo', icon: <BarChart3 size={20} /> },
  { id: 'settings', label: 'Cấu hình', icon: <Settings size={20} /> },
] as const;
