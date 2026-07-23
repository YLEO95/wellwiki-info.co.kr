import React from 'react';
import { PhoneCall, Building2, Bookmark, Info, Search } from 'lucide-react';

interface HeaderProps {
  totalCount: number;
  filteredCount: number;
  favoritesCount: number;
  showFavoritesOnly: boolean;
  setShowFavoritesOnly: (val: boolean) => void;
  onOpenQuickInfo: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  totalCount,
  filteredCount,
  favoritesCount,
  showFavoritesOnly,
  setShowFavoritesOnly,
  onOpenQuickInfo,
}) => {
  return (
    <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-30 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          {/* Logo & Main Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white shadow-inner flex-shrink-0">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-bold tracking-tight text-white">
                  전국 지자체 연락처 안내
                </h1>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  공공 데이터
                </span>
              </div>
              <p className="text-xs text-slate-400">
                광역시·도 및 시·군·구청 민원실 대표전화와 공식 홈페이지
              </p>
            </div>
          </div>

          {/* Header Action Buttons & Stats */}
          <div className="flex items-center gap-2.5 flex-wrap sm:flex-nowrap justify-between md:justify-end">
            <div className="text-xs text-slate-300 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700/60 flex items-center gap-2">
              <span className="text-slate-400">조회:</span>
              <span className="font-bold text-blue-400">{filteredCount}</span>
              <span className="text-slate-500">/</span>
              <span className="text-slate-400">{totalCount}개 지자체</span>
            </div>

            {/* Favorite Filter Toggle Button */}
            <button
              onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
              className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg transition-all border ${
                showFavoritesOnly
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-sm'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
              }`}
              title="즐겨찾기한 지자체만 모아보기"
            >
              <Bookmark className={`w-3.5 h-3.5 ${showFavoritesOnly ? 'fill-amber-400 text-amber-400' : 'text-slate-400'}`} />
              <span>즐겨찾기</span>
              <span className={`ml-0.5 px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                showFavoritesOnly ? 'bg-amber-400 text-slate-950' : 'bg-slate-700 text-slate-300'
              }`}>
                {favoritesCount}
              </span>
            </button>

            {/* Info modal trigger */}
            <button
              onClick={onOpenQuickInfo}
              className="flex items-center gap-1 text-xs font-medium px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
              title="도움말 및 민원안내"
            >
              <Info className="w-3.5 h-3.5 text-blue-400" />
              <span className="hidden sm:inline">민원 팁</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
