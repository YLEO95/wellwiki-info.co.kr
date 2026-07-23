import React from 'react';
import { Phone, ChevronRight, ShieldAlert } from 'lucide-react';
import { QUICK_CALL_CENTERS } from '../data/quickCallCenters';

export const QuickCallCenterBar: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-b border-slate-700/80 py-3">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 mb-2">
          <ShieldAlert className="w-4 h-4 text-amber-400" />
          <span className="text-xs font-semibold text-slate-200 tracking-wide uppercase">
            주요 정부 및 긴급 민원 콜센터
          </span>
          <span className="text-[11px] text-slate-400 hidden sm:inline">
            (번호 클릭 시 즉시 전화연결)
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
          {QUICK_CALL_CENTERS.map((center) => (
            <a
              key={center.id}
              href={`tel:${center.number}`}
              className="group bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700/80 hover:border-blue-500/50 rounded-lg p-2.5 transition-all flex flex-col justify-between shadow-xs hover:shadow-md"
            >
              <div className="flex items-center justify-between gap-1 mb-1">
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${center.badgeColor}`}>
                  {center.badge}
                </span>
                <Phone className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-400 transition-colors" />
              </div>

              <div>
                <div className="flex items-baseline justify-between">
                  <span className="text-base font-extrabold text-blue-400 group-hover:text-blue-300 transition-colors tracking-tight">
                    {center.number}
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:translate-x-0.5 transition-transform" />
                </div>
                <div className="text-xs font-medium text-slate-200 truncate mt-0.5">
                  {center.name}
                </div>
                <div className="text-[11px] text-slate-400 truncate mt-0.5">
                  {center.description}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
