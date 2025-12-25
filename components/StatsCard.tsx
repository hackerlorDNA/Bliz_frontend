
import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  trend?: number;
  color?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, trend, color = 'bg-blue-600' }) => {
  return (
    <div className={`${color} rounded-2xl p-5 text-white shadow-lg shadow-blue-200/50 relative overflow-hidden`}>
      <div className="relative z-10">
        <h3 className="text-blue-100 text-sm font-medium mb-1">{title}</h3>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold">{value}</span>
          {trend !== undefined && (
            <div className={`flex items-center text-[10px] font-bold px-1.5 py-0.5 rounded-full ${trend >= 0 ? 'bg-white/20 text-white' : 'bg-red-500/20 text-red-100'}`}>
              {trend >= 0 ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
              {Math.abs(trend)}%
            </div>
          )}
        </div>
      </div>
      
      {/* Abstract background shape */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
    </div>
  );
};

export default StatsCard;
