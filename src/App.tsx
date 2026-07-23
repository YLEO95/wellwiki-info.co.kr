import React, { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { QuickCallCenterBar } from './components/QuickCallCenterBar';
import { FilterSection } from './components/FilterSection';
import { MunicipalityCard } from './components/MunicipalityCard';
import { MunicipalityTable } from './components/MunicipalityTable';
import { MunicipalityDetailModal } from './components/MunicipalityDetailModal';
import { InfoModal } from './components/InfoModal';
import { Footer } from './components/Footer';

import { MUNICIPALITIES, REGION_GROUP_MAP } from './data/municipalities';
import { Municipality, RegionGroup } from './types';
import { normalizeSearchTerm } from './utils/phoneUtils';
import { Search, Building, Bookmark, Sparkles, FilterX } from 'lucide-react';

const FAVORITES_STORAGE_KEY = 'korea_municipal_favorites_v1';
const MEMO_STORAGE_KEY = 'korea_municipal_memos_v1';

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegionGroup, setSelectedRegionGroup] = useState<RegionGroup>('ALL');
  const [selectedProvince, setSelectedProvince] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<'default' | 'name' | 'province'>('default');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  // Favorites state stored in localStorage
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(FAVORITES_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Memos state stored in localStorage (id -> note string)
  const [memos, setMemos] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem(MEMO_STORAGE_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Selected item for detail modal
  const [selectedItem, setSelectedItem] = useState<Municipality | null>(null);
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  // Sync favorites with localStorage
  useEffect(() => {
    try {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
    } catch (err) {
      console.error('Failed to save favorites to localStorage:', err);
    }
  }, [favorites]);

  // Sync memos with localStorage
  useEffect(() => {
    try {
      localStorage.setItem(MEMO_STORAGE_KEY, JSON.stringify(memos));
    } catch (err) {
      console.error('Failed to save memos to localStorage:', err);
    }
  }, [memos]);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSaveMemo = (id: string, text: string) => {
    setMemos((prev) => ({
      ...prev,
      [id]: text,
    }));
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedRegionGroup('ALL');
    setSelectedProvince('ALL');
    setSortBy('default');
    setShowFavoritesOnly(false);
  };

  // Filtered and Sorted list
  const filteredAndSortedList = useMemo(() => {
    let list = [...MUNICIPALITIES];

    // Filter by favorites
    if (showFavoritesOnly) {
      list = list.filter((item) => favorites.includes(item.id));
    }

    // Filter by Region Group (수도권, 영남권, 등)
    if (selectedRegionGroup !== 'ALL') {
      const allowedProvinces = REGION_GROUP_MAP[selectedRegionGroup] || [];
      list = list.filter((item) => allowedProvinces.includes(item.province));
    }

    // Filter by specific province
    if (selectedProvince !== 'ALL') {
      list = list.filter((item) => item.province === selectedProvince);
    }

    // Filter by search term
    if (searchTerm.trim() !== '') {
      const normalizedQuery = normalizeSearchTerm(searchTerm);
      list = list.filter((item) => {
        const normName = normalizeSearchTerm(item.name);
        const normProv = normalizeSearchTerm(item.province);
        const normCat = normalizeSearchTerm(item.category);
        const normPhone = normalizeSearchTerm(item.phone);

        return (
          normName.includes(normalizedQuery) ||
          normProv.includes(normalizedQuery) ||
          normCat.includes(normalizedQuery) ||
          normPhone.includes(normalizedQuery)
        );
      });
    }

    // Sorting
    if (sortBy === 'name') {
      list.sort((a, b) => a.name.localeCompare(b.name, 'ko'));
    } else if (sortBy === 'province') {
      list.sort((a, b) => a.province.localeCompare(b.province, 'ko'));
    }

    return list;
  }, [
    showFavoritesOnly,
    favorites,
    selectedRegionGroup,
    selectedProvince,
    searchTerm,
    sortBy,
  ]);

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-900 font-sans flex flex-col">
      {/* Top Header */}
      <Header
        totalCount={MUNICIPALITIES.length}
        filteredCount={filteredAndSortedList.length}
        favoritesCount={favorites.length}
        showFavoritesOnly={showFavoritesOnly}
        setShowFavoritesOnly={setShowFavoritesOnly}
        onOpenQuickInfo={() => setIsInfoOpen(true)}
      />

      {/* Quick Emergency / Helpline Bar */}
      <QuickCallCenterBar />

      {/* Main App Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 w-full">
        {/* Filter & Search Bar */}
        <FilterSection
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedRegionGroup={selectedRegionGroup}
          setSelectedRegionGroup={setSelectedRegionGroup}
          selectedProvince={selectedProvince}
          setSelectedProvince={setSelectedProvince}
          sortBy={sortBy}
          setSortBy={setSortBy}
          viewMode={viewMode}
          setViewMode={setViewMode}
          onReset={handleResetFilters}
        />

        {/* Active Filter Chips / Status bar */}
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2 text-xs">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-bold text-slate-700">검색 결과:</span>
            <span className="font-extrabold text-blue-600 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-md">
              총 {filteredAndSortedList.length}개 지자체
            </span>

            {showFavoritesOnly && (
              <span className="bg-amber-100 text-amber-900 border border-amber-300 px-2 py-0.5 rounded-md font-semibold flex items-center gap-1">
                <Bookmark className="w-3 h-3 fill-amber-500" /> 즐겨찾기 목록만 보기 중
              </span>
            )}

            {selectedRegionGroup !== 'ALL' && (
              <span className="bg-slate-200 text-slate-800 px-2 py-0.5 rounded-md font-medium">
                권역: {selectedRegionGroup}
              </span>
            )}

            {selectedProvince !== 'ALL' && (
              <span className="bg-slate-200 text-slate-800 px-2 py-0.5 rounded-md font-medium">
                {selectedProvince}
              </span>
            )}
          </div>

          {(searchTerm || selectedRegionGroup !== 'ALL' || selectedProvince !== 'ALL' || showFavoritesOnly) && (
            <button
              onClick={handleResetFilters}
              className="text-slate-500 hover:text-slate-800 font-medium underline transition-colors"
            >
              전체 목록으로 되돌리기
            </button>
          )}
        </div>

        {/* List Content Display */}
        {filteredAndSortedList.length > 0 ? (
          viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredAndSortedList.map((item) => (
                <MunicipalityCard
                  key={item.id}
                  item={item}
                  isFavorite={favorites.includes(item.id)}
                  onToggleFavorite={toggleFavorite}
                  onSelectDetail={setSelectedItem}
                  hasMemo={!!memos[item.id]}
                />
              ))}
            </div>
          ) : (
            <MunicipalityTable
              items={filteredAndSortedList}
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
              onSelectDetail={setSelectedItem}
              memos={memos}
            />
          )
        ) : (
          /* Empty State when no results found */
          <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center my-8 shadow-xs">
            <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FilterX className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-1">
              검색 조건에 맞는 지자체가 없습니다
            </h3>
            <p className="text-slate-500 text-sm max-w-md mx-auto mb-6">
              {showFavoritesOnly
                ? '등록된 즐겨찾기가 없거나 검색어와 일치하는 즐겨찾기 항목이 없습니다.'
                : '검색어나 지역 필터를 확인하고 다시 시도해 주세요.'}
            </p>
            <button
              onClick={handleResetFilters}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs transition-colors shadow-xs"
            >
              전체 지자체 목록보기
            </button>
          </div>
        )}
      </main>

      {/* Detail Modal */}
      <MunicipalityDetailModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        isFavorite={selectedItem ? favorites.includes(selectedItem.id) : false}
        onToggleFavorite={toggleFavorite}
        memo={selectedItem ? memos[selectedItem.id] || '' : ''}
        onSaveMemo={handleSaveMemo}
      />

      {/* Info Help Modal */}
      <InfoModal isOpen={isInfoOpen} onClose={() => setIsInfoOpen(false)} />

      {/* Footer */}
      <Footer />
    </div>
  );
}
