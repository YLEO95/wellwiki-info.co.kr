import React, { useState } from 'react';
import {
  Phone,
  ExternalLink,
  Bookmark,
  Copy,
  Check,
  Building,
  StickyNote,
} from 'lucide-react';
import { Municipality } from '../types';
import { extractTelNumber } from '../utils/phoneUtils';

interface MunicipalityTableProps {
  items: Municipality[];
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onSelectDetail: (item: Municipality) => void;
  memos: Record<string, string>;
}

export const MunicipalityTable: React.FC<MunicipalityTableProps> = ({
  items,
  favorites,
  onToggleFavorite,
  onSelectDetail,
  memos,
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyPhone = (id: string, phone: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(phone);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-6">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs sm:text-sm text-slate-800">
          <thead className="bg-slate-900 text-white font-semibold text-xs uppercase tracking-wider">
            <tr>
              <th className="py-3 px-3 text-center w-10">즐겨찾기</th>
              <th className="py-3 px-3 w-28">광역시·도</th>
              <th className="py-3 px-4">지자체명</th>
              <th className="py-3 px-4">민원실 / 대표 전화번호</th>
              <th className="py-3 px-4 text-center w-36">주요 기능</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {items.map((item) => {
              const isFav = favorites.includes(item.id);
              const telNumber = extractTelNumber(item.phone);
              const hasMemo = !!memos[item.id];

              return (
                <tr
                  key={item.id}
                  onClick={() => onSelectDetail(item)}
                  className="hover:bg-blue-50/50 transition-colors cursor-pointer group"
                >
                  {/* Bookmark button */}
                  <td className="py-3 px-3 text-center" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => onToggleFavorite(item.id)}
                      className="p-1 text-slate-300 hover:text-amber-500 transition-colors"
                      title={isFav ? '즐겨찾기 해제' : '즐겨찾기 추가'}
                    >
                      <Bookmark className={`w-4 h-4 ${isFav ? 'fill-amber-400 text-amber-500' : ''}`} />
                    </button>
                  </td>

                  {/* Province Badge */}
                  <td className="py-3 px-3">
                    <span className="inline-flex items-center text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                      {item.province}
                    </span>
                  </td>

                  {/* Municipality Name */}
                  <td className="py-3 px-4 font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    <div className="flex items-center gap-2">
                      <Building className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-500" />
                      <span>{item.name}</span>
                      {hasMemo && (
                        <span title="메모 있음">
                          <StickyNote className="w-3.5 h-3.5 text-amber-500 fill-amber-100" />
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Phone number */}
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold font-mono text-slate-900">
                        {item.phone}
                      </span>
                      <button
                        onClick={(e) => handleCopyPhone(item.id, item.phone, e)}
                        className={`p-1 rounded transition-colors text-[11px] font-medium ${
                          copiedId === item.id
                            ? 'bg-emerald-100 text-emerald-700 font-bold'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                        }`}
                        title="전화번호 복사"
                      >
                        {copiedId === item.id ? (
                          <Check className="w-3.5 h-3.5 text-emerald-600 inline" />
                        ) : (
                          <Copy className="w-3.5 h-3.5 text-slate-500 inline" />
                        )}
                      </button>
                    </div>
                  </td>

                  {/* Action buttons */}
                  <td className="py-3 px-4 text-center" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-center gap-1.5">
                      <a
                        href={`tel:${telNumber}`}
                        className="inline-flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white font-medium px-2.5 py-1 rounded-lg text-xs transition-colors"
                        title="전화걸기"
                      >
                        <Phone className="w-3 h-3" />
                        <span>통화</span>
                      </a>
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 font-medium px-2.5 py-1 rounded-lg text-xs transition-colors"
                        title="공식 홈페이지 방문"
                      >
                        <ExternalLink className="w-3 h-3 text-slate-500" />
                        <span>홈피</span>
                      </a>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
