
export interface Staff {
  id: string;
  name: string;
  role: string;
  status: 'active' | 'inactive';
  avatar: string;
  phone: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  unit: string;
  category: string;
}

export interface Order {
  id: string;
  customerName: string;
  total: number;
  status: 'pending' | 'completed' | 'debt';
  date: string;
  items: { name: string; quantity: number; price: number }[];
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  debt: number;
  lastOrder: string;
}

export interface AIDraftOrder {
  customerName: string;
  items: { name: string; quantity: number }[];
  isDebt: boolean;
}

export type TabType = 'overview' | 'products' | 'orders' | 'customers' | 'reports' | 'settings';
