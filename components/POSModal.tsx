
import React, { useState } from 'react';
import { X, Search, Plus, Minus, User, CreditCard, Receipt, CheckCircle2 } from 'lucide-react';
import { Product, Customer, Order } from '../types';

interface POSModalProps {
  products: Product[];
  customers: Customer[];
  onClose: () => void;
  onComplete: (order: Order) => void;
}

const POSModal: React.FC<POSModalProps> = ({ products, customers, onClose, onComplete }) => {
  const [cart, setCart] = useState<{ product: Product; quantity: number }[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isDebt, setIsDebt] = useState(false);
  const [step, setStep] = useState<'pick' | 'checkout' | 'receipt'>('pick');
  const [lastOrder, setLastOrder] = useState<Order | null>(null);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.product.id === id) {
        const newQty = Math.max(0, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const handleFinish = () => {
    const newOrder: Order = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName: selectedCustomer?.name || 'Khách lẻ',
      total: total,
      status: isDebt ? 'debt' : 'completed',
      date: 'Vừa xong',
      items: cart.map(item => ({ name: item.product.name, quantity: item.quantity, price: item.product.price }))
    };
    setLastOrder(newOrder);
    setStep('receipt');
  };

  const renderPick = () => (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-gray-100 flex items-center justify-between">
        <h3 className="font-bold text-lg">Chọn sản phẩm</h3>
        <button onClick={onClose} className="p-2 text-gray-400"><X size={24} /></button>
      </div>
      <div className="p-4 bg-gray-50 border-b border-gray-100">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input type="text" placeholder="Tìm tên hoặc mã..." className="w-full pl-10 pr-4 py-2 bg-white rounded-xl border border-gray-200 outline-none" />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {products.map(p => (
          <div key={p.id} className="bg-white p-3 rounded-xl border border-gray-100 flex items-center justify-between shadow-sm">
            <div>
              <p className="font-bold text-gray-900">{p.name}</p>
              <p className="text-xs text-blue-600 font-bold">{p.price.toLocaleString()}đ / {p.unit}</p>
            </div>
            <button onClick={() => addToCart(p)} className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center active:scale-90 transition-transform">
              <Plus size={20} />
            </button>
          </div>
        ))}
      </div>
      {cart.length > 0 && (
        <div className="p-4 bg-white border-t border-gray-100 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="text-xs text-gray-400 uppercase font-bold">Tổng tiền ({cart.length} món)</p>
              <p className="text-xl font-black text-blue-900">{total.toLocaleString()}đ</p>
            </div>
            <button onClick={() => setStep('checkout')} className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-blue-100">
              Tiếp tục <CreditCard size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );

  const renderCheckout = () => (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-gray-100 flex items-center gap-4">
        <button onClick={() => setStep('pick')} className="p-1"><X size={24} className="rotate-90" /></button>
        <h3 className="font-bold text-lg">Thanh toán</h3>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <section className="space-y-3">
          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">Đơn hàng của bạn</h4>
          <div className="bg-white rounded-2xl border border-gray-100 divide-y divide-gray-50 overflow-hidden">
            {cart.map(item => (
              <div key={item.product.id} className="p-4 flex items-center justify-between">
                <div className="flex-1">
                  <p className="font-bold text-sm text-gray-900">{item.product.name}</p>
                  <p className="text-xs text-gray-400">{item.product.price.toLocaleString()}đ x {item.quantity}</p>
                </div>
                <div className="flex items-center gap-3">
                  <button onClick={() => updateQuantity(item.product.id, -1)} className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center"><Minus size={14} /></button>
                  <span className="font-bold w-4 text-center">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.product.id, 1)} className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center"><Plus size={14} /></button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-3">
          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">Khách hàng</h4>
          <div className="bg-white rounded-2xl border border-gray-100 p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-400">
              <User size={20} />
            </div>
            <select 
              className="flex-1 bg-transparent font-bold text-sm outline-none appearance-none"
              onChange={(e) => setSelectedCustomer(customers.find(c => c.id === e.target.value) || null)}
            >
              <option value="">Khách lẻ (Mặc định)</option>
              {customers.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
        </section>

        <section className="bg-white rounded-2xl border border-gray-100 p-4 flex items-center justify-between">
          <div>
            <h4 className="font-bold text-gray-900 text-sm">Ghi nợ khách hàng</h4>
            <p className="text-[10px] text-gray-400">Số tiền sẽ được cộng vào công nợ</p>
          </div>
          <button 
            onClick={() => setIsDebt(!isDebt)}
            className={`w-12 h-6 rounded-full transition-colors relative ${isDebt ? 'bg-red-500' : 'bg-gray-200'}`}
          >
            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${isDebt ? 'left-7' : 'left-1'}`} />
          </button>
        </section>
      </div>
      <div className="p-4">
        <button onClick={handleFinish} className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black text-lg shadow-xl shadow-blue-100 active:scale-[0.98] transition-all">
          XÁC NHẬN {total.toLocaleString()}đ
        </button>
      </div>
    </div>
  );

  const renderReceipt = () => (
    <div className="flex flex-col h-full bg-gray-100">
      <div className="flex-1 p-6 flex items-center justify-center">
        <div className="bg-white w-full max-w-sm rounded-lg shadow-xl p-6 relative overflow-hidden">
          {/* Receipt Aesthetic */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-black text-blue-600 tracking-tighter">BIZFLOW</h2>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Cửa hàng vật liệu xây dựng</p>
            <p className="text-[10px] text-gray-400 mt-1">Đ/c: 123 Đường Số 1, Quận 7, HCM</p>
          </div>

          <div className="border-t border-b border-dashed border-gray-200 py-4 my-4 space-y-2">
            <div className="flex justify-between text-[10px]">
              <span className="text-gray-400 font-bold uppercase">Mã HD</span>
              <span className="font-bold text-gray-900">{lastOrder?.id}</span>
            </div>
            <div className="flex justify-between text-[10px]">
              <span className="text-gray-400 font-bold uppercase">Thời gian</span>
              <span className="font-bold text-gray-900">10/10/2024 14:30</span>
            </div>
            <div className="flex justify-between text-[10px]">
              <span className="text-gray-400 font-bold uppercase">Khách hàng</span>
              <span className="font-bold text-gray-900">{lastOrder?.customerName}</span>
            </div>
          </div>

          <div className="space-y-3 mb-6">
            {lastOrder?.items.map((item, idx) => (
              <div key={idx} className="flex justify-between text-sm">
                <span className="text-gray-600">{item.name} x{item.quantity}</span>
                <span className="font-bold">{(item.price * item.quantity).toLocaleString()}đ</span>
              </div>
            ))}
          </div>

          <div className="border-t-2 border-gray-900 pt-4 flex justify-between items-baseline">
            <span className="font-black text-sm uppercase">Tổng cộng</span>
            <span className="font-black text-xl">{lastOrder?.total.toLocaleString()}đ</span>
          </div>

          <div className="mt-4 text-center">
            <div className={`inline-block px-4 py-1 rounded-full text-[10px] font-black uppercase ${lastOrder?.status === 'debt' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
              {lastOrder?.status === 'debt' ? 'Ghi nợ công ty' : 'Đã thanh toán'}
            </div>
          </div>

          <div className="mt-8 text-center text-[10px] text-gray-400 italic">
            Cảm ơn quý khách. Hẹn gặp lại!
          </div>

          {/* Zigzag bottom edge sim */}
          <div className="absolute bottom-0 left-0 right-0 h-2 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5"></div>
        </div>
      </div>
      <div className="p-6 space-y-3 bg-white border-t border-gray-200">
        <button 
          onClick={() => {
            if (lastOrder) onComplete(lastOrder);
            onClose();
          }}
          className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2"
        >
          <Receipt size={20} /> In hóa đơn & Xong
        </button>
        <button 
          onClick={() => {
            if (lastOrder) onComplete(lastOrder);
            onClose();
          }}
          className="w-full py-4 text-gray-400 font-bold"
        >
          Đóng mà không in
        </button>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-[60] bg-white animate-in slide-in-from-bottom duration-300">
      {step === 'pick' && renderPick()}
      {step === 'checkout' && renderCheckout()}
      {step === 'receipt' && renderReceipt()}
    </div>
  );
};

export default POSModal;
