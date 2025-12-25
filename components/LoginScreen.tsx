
import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';

interface LoginScreenProps {
  onLogin: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Giả lập quá trình đăng nhập
    setTimeout(() => {
      setLoading(false);
      onLogin();
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col px-6 py-12 safe-top">
      {/* Brand Header */}
      <div className="flex flex-col items-center mb-12">
        <div className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center shadow-xl shadow-blue-200 mb-6 rotate-3">
          <span className="text-white font-black text-4xl">B</span>
        </div>
        <h1 className="text-3xl font-bold text-blue-900 tracking-tight">BizFlow</h1>
        <p className="text-gray-400 mt-2 font-medium">Giải pháp quản lý thông minh</p>
      </div>

      {/* Login Form */}
      <form onSubmit={handleSubmit} className="flex-1 space-y-5">
        <div className="space-y-1">
          <label className="text-sm font-semibold text-gray-700 ml-1">Email / Số điện thoại</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
              <Mail size={20} />
            </div>
            <input
              type="text"
              required
              className="block w-full pl-11 pr-4 py-4 bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-blue-500 transition-all text-gray-900 placeholder-gray-400"
              placeholder="ten@congty.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-semibold text-gray-700 ml-1">Mật khẩu</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
              <Lock size={20} />
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              required
              className="block w-full pl-11 pr-12 py-4 bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-blue-500 transition-all text-gray-900 placeholder-gray-400"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        <div className="flex justify-end">
          <button type="button" className="text-sm font-semibold text-blue-600">
            Quên mật khẩu?
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-blue-200 flex items-center justify-center gap-2 active:scale-[0.98] transition-all disabled:opacity-70"
        >
          {loading ? (
            <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
          ) : (
            <>
              Đăng nhập
              <ArrowRight size={20} />
            </>
          )}
        </button>
      </form>

      {/* Footer */}
      <div className="mt-8 text-center">
        <p className="text-gray-500">
          Chưa có tài khoản?{' '}
          <button type="button" className="text-blue-600 font-bold">
            Đăng ký ngay
          </button>
        </p>
      </div>
      
      <div className="mt-auto pt-8 text-center text-[10px] text-gray-400 uppercase tracking-widest font-bold">
        BizFlow v2.0 • 2024
      </div>
    </div>
  );
};

export default LoginScreen;
