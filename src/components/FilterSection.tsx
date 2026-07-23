import React from 'react';
import {
  Search,
  X,
  MapPin,
  SlidersHorizontal,
  LayoutGrid,
  ListFilter,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { RegionGroup } from '../types';
import { ALL_PROVINCES, REGION_GROUP_MAP } from '../data/municipalities';

interface FilterSectionProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedRegionGroup: RegionGroup;
  setSelectedRegionGroup: (group: RegionGroup) => void;
  selectedProvince: string;
  setSelectedProvince: (prov: string) => void;
  sortBy: 'default' | 'name' | 'province';
  setSortBy: (sort: 'default' | 'name' | 'province') => void;
  viewMode: 'grid' | 'table';
  setViewMode: (mode: 'grid' | 'table') => void;
  onReset: () => void;
}

const REGION_GROUPS: { key: RegionGroup; label: string; countHint?: string }[] = [
  { key: 'ALL', label: '전체 지자체' },
  { key: '수도권', label: '수도권', countHint: '서울·경기·인천' },
  { key: '영남권', label: '영남권', countHint: '부산·대구·울산·경북·경남' },
  { key: '충청권', label: '충청권', countHint: '대전·세종·충북·충남' },
  { key: '호남권', label: '호남권', countHint: '광주·전북·전남' },
  { key: '강원·제주', label: '강원·제주', countHint: '강원·제주' },
];

export const FilterSection: React.FC<FilterSectionProps> = ({
  searchTerm,
  setSearchTerm,
  selectedRegionGroup,
  setSelectedRegionGroup,
  selectedProvince,
  setSelectedProvince,
  sortBy,
  setSortBy,
  viewMode,
  setViewMode,
  onReset,
}) => {
  const isFilterActive =
    searchTerm.trim() !== '' ||
    selectedRegionGroup !== 'ALL' ||
    selectedProvince !== 'ALL' ||
    sortBy !== 'default';

  // Available provinces based on current region group selection
  const availableProvinces = React.useMemo(() => {
    if (selectedRegionGroup === 'ALL') return ALL_PROVINCES;
    const allowedProvinces = REGION_GROUP_MAP[selectedRegionGroup] || [];
    return ALL_PROVINCES.filter((p) => allowedProvinces.includes(p));
  }, [selectedRegionGroup]);

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-4 sm:p-5 mb-6 space-y-4">
      {/* Search Input Bar */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
          <Search className="w-5 h-5 text-blue-600" />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="지자체명(예: 종로구, 수원시, 해운대), 광역시·도, 또는 전화번호 검색..."
          className="w-full pl-11 pr-10 py-3 text-sm sm:text-base bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-slate-900 placeholder-slate-400 font-medium"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
            title="검색어 지우기"
          >
            <X className="w-5 h-5 bg-slate-200 hover:bg-slate-300 rounded-full p-0.5" />
          </button>
        )}
      </div>

      {/* Region Group Category Filter Tabs */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5 uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5 text-blue-600" /> 권역별 카테고리
          </span>
          {isFilterActive && (
            <button
              onClick={onReset}
              className="text-xs text-rose-600 hover:text-rose-700 font-medium flex items-center gap-1 transition-colors"
            >
              <RotateCcw className="w-3 h-3" /> 필터 초기화
            </button>
          )}
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
          {REGION_GROUPS.map((group) => {
            const isSelected = selectedRegionGroup === group.key;
            return (
              <button
                key={group.key}
                onClick={() => {
                  setSelectedRegionGroup(group.key);
                  // Reset specific province if not in new region group
                  if (
                    group.key !== 'ALL' &&
                    selectedProvince !== 'ALL' &&
                    !REGION_GROUP_MAP[group.key]?.includes(selectedProvince)
                  ) {
                    setSelectedProvince('ALL');
                  }
                }}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap flex flex-col items-center justify-center border ${
                  isSelected
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                }`}
              >
                <span>{group.label}</span>
                {group.countHint && (
                  <span
                    className={`text-[10px] font-normal ${
                      isSelected ? 'text-blue-100' : 'text-slate-400'
                    }`}
                  >
                    {group.countHint}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Secondary Controls: Specific Province Dropdown, Sorting & View Switch */}
      <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Specific Province Dropdown Select */}
        <div className="flex items-center gap-2 flex-1 max-w-md">
          <label className="text-xs font-semibold text-slate-600 whitespace-nowrap">
            세부 광역시·도:
          </label>
          <select
            value={selectedProvince}
            onChange={(e) => setSelectedProvince(e.target.value)}
            className="w-full text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all cursor-pointer"
          >
            <option value="ALL">전체 광역시·도 ({availableProvinces.length}개)</option>
            {availableProvinces.map((prov) => (
              <option key={prov} value={prov}>
                {prov}
              </option>
            ))}
          </select>
        </div>

        {/* Right side: Sorting & Grid/Table Toggle */}
        <div className="flex items-center gap-3 justify-end flex-wrap">
          {/* Sorting */}
          <div className="flex items-center gap-1.5 text-xs text-slate-600">
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500" />
            <span className="font-semibold hidden sm:inline">정렬:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'default' | 'name' | 'province')}
              className="text-xs bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="default">기본 순서</option>
              <option value="name">지자체명 순</option>
              <option value="province">광역시·도 순</option>
            </select>
          </div>

          {/* View Mode Toggle Button Group */}
          <div className="bg-slate-100 p-1 rounded-lg flex items-center border border-slate-200">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-2.5 py-1 rounded-md text-xs font-medium flex items-center gap-1 transition-all ${
                viewMode === 'grid'
                  ? 'bg-white text-blue-700 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="카드 격자 보기"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">카드</span>
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`px-2.5 py-1 rounded-md text-xs font-medium flex items-center gap-1 transition-all ${
                viewMode === 'table'
                  ? 'bg-white text-blue-700 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="목록 표 보기"
            >
              <ListFilter className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">목록표</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
