import React, { useState } from 'react';
import {
  Phone,
  ExternalLink,
  Bookmark,
  Copy,
  Check,
  Building,
  StickyNote,
  Maximize2,
} from 'lucide-react';
import { Municipality } from '../types';
import { extractTelNumber } from '../utils/phoneUtils';

interface MunicipalityCardProps {
  item: Municipality;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onSelectDetail: (item: Municipality) => void;
  hasMemo: boolean;
}

export const MunicipalityCard: React.FC<MunicipalityCardProps> = ({
  item,
  isFavorite,
  onToggleFavorite,
  onSelectDetail,
  hasMemo,
}) => {
  const [copied, setCopied] = useState(false);

  const telNumber = extractTelNumber(item.phone);

  const handleCopyPhone = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(item.phone);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      onClick={() => onSelectDetail(item)}
      className="group bg-white rounded-2xl border border-slate-200 hover:border-blue-400 p-4 shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between relative overflow-hidden"
    >
      {/* Top Bar: Province badge, Favorite button */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="inline-flex items-center text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
              {item.province}
            </span>
            <span className="inline-flex items-center text-[10px] font-medium px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
              {item.category}
            </span>
            {hasMemo && (
              <span
                className="inline-flex items-center gap-0.5 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200"
                title="메모가 저장된 지자체입니다"
              >
                <StickyNote className="w-2.5 h-2.5" /> 메모
              </span>
            )}
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(item.id);
            }}
            className={`p-1.5 rounded-xl transition-colors ${
              isFavorite
                ? 'bg-amber-50 text-amber-500 hover:bg-amber-100'
                : 'text-slate-300 hover:text-slate-500 hover:bg-slate-100'
            }`}
            title={isFavorite ? '즐겨찾기 해제' : '즐겨찾기 추가'}
          >
            <Bookmark className={`w-4 h-4 ${isFavorite ? 'fill-amber-400' : ''}`} />
          </button>
        </div>

        {/* Municipality Name */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors flex items-center gap-2">
            <Building className="w-4 h-4 text-slate-400 flex-shrink-0 group-hover:text-blue-500" />
            <span>{item.name}</span>
          </h3>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelectDetail(item);
            }}
            className="text-slate-400 group-hover:text-blue-500 p-1 opacity-60 group-hover:opacity-100 transition-opacity"
            title="상세보기 및 메모 작성"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Contact Phone Section */}
        <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3 mb-3">
          <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
            민원실 / 대표 전화번호
          </div>
          <div className="flex items-center justify-between gap-2">
            <div className="text-sm sm:text-base font-extrabold text-slate-900 tracking-tight font-mono select-all">
              {item.phone}
            </div>
            <button
              onClick={handleCopyPhone}
              className={`p-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1 ${
                copied
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-white hover:bg-slate-200 text-slate-600 border border-slate-200'
              }`}
              title="전화번호 복사"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-[10px] font-bold text-emerald-700">복사됨</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-500" />
                  <span className="text-[10px] text-slate-600">복사</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Action Buttons: Direct Call, Website Link */}
      <div className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-2 mt-auto">
        <a
          href={`tel:${telNumber}`}
          onClick={(e) => e.stopPropagation()}
          className="flex items-center justify-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-3 rounded-xl text-xs shadow-xs hover:shadow transition-all"
        >
          <Phone className="w-3.5 h-3.5" />
          <span>전화 걸기</span>
        </a>

        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="flex items-center justify-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold py-2 px-3 rounded-xl text-xs border border-slate-200 transition-colors"
        >
          <ExternalLink className="w-3.5 h-3.5 text-slate-600" />
          <span>홈페이지</span>
        </a>
      </div>
    </div>
  );
};
