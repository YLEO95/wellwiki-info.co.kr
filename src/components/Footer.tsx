import React from 'react';
import { Building2, ArrowUp, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 mt-12 py-8 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-white text-sm">전국 지자체 민원 연락처 안내</div>
              <div className="text-[11px] text-slate-500">
                대한민국 광역시·도 및 시·군·구청 민원실 대표 전화번호 모음
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <span className="flex items-center gap-1 text-[11px] text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" /> 공공데이터포털 연계 정보
            </span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg border border-slate-700 transition-colors"
            >
              <span>맨 위로</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="pt-4 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-2 text-[11px] text-slate-500">
          <p>
            ※ 본 서비스의 전화번호 및 웹사이트 주소는 각 지자체의 공시 정보를 바탕으로 제공되며, 사정에 따라 변경될 수 있습니다.
          </p>
          <p>© {new Date().getFullYear()} 대한민국 지자체 민원안내. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
