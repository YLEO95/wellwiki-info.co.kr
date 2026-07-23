import React, { useState, useEffect } from 'react';
import {
  X,
  Phone,
  ExternalLink,
  Bookmark,
  Copy,
  Check,
  Building,
  StickyNote,
  Share2,
  Globe,
  MapPin,
  Calendar,
  Save,
} from 'lucide-react';
import { Municipality } from '../types';
import { extractTelNumber } from '../utils/phoneUtils';

interface MunicipalityDetailModalProps {
  item: Municipality | null;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  memo: string;
  onSaveMemo: (id: string, text: string) => void;
}

export const MunicipalityDetailModal: React.FC<MunicipalityDetailModalProps> = ({
  item,
  onClose,
  isFavorite,
  onToggleFavorite,
  memo,
  onSaveMemo,
}) => {
  const [copied, setCopied] = useState(false);
  const [memoText, setMemoText] = useState(memo || '');
  const [memoSaved, setMemoSaved] = useState(false);

  useEffect(() => {
    setMemoText(memo || '');
  }, [memo, item]);

  if (!item) return null;

  const telNumber = extractTelNumber(item.phone);

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(item.phone);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveNote = () => {
    onSaveMemo(item.id, memoText);
    setMemoSaved(true);
    setTimeout(() => setMemoSaved(false), 2000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${item.name} 연락처`,
        text: `[${item.province}] ${item.name} 대표전화: ${item.phone}\n홈페이지: ${item.url}`,
        url: item.url,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(
        `[${item.province}] ${item.name} 대표전화: ${item.phone} (${item.url})`
      );
      alert('연락처 정보가 클립보드에 복사되었습니다.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-lg w-full overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header Modal Bar */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white">
              <Building className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs text-blue-300 font-semibold">{item.province}</span>
              <h2 className="text-xl font-bold tracking-tight text-white">{item.name}</h2>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => onToggleFavorite(item.id)}
              className={`p-2 rounded-xl transition-colors ${
                isFavorite
                  ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
              title="즐겨찾기"
            >
              <Bookmark className={`w-5 h-5 ${isFavorite ? 'fill-amber-400' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title="닫기"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-5 overflow-y-auto">
          {/* Main Telephone Box */}
          <div className="bg-blue-50/70 border border-blue-200/80 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-bold text-blue-900 uppercase tracking-wider flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-blue-600" /> 민원실 / 대표 전화번호
              </span>
              <button
                onClick={handleCopyPhone}
                className={`text-xs px-2.5 py-1 rounded-lg font-medium transition-all flex items-center gap-1 ${
                  copied
                    ? 'bg-emerald-600 text-white'
                    : 'bg-white hover:bg-blue-100 text-blue-800 border border-blue-200'
                }`}
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? '복사완료' : '전화번호 복사'}</span>
              </button>
            </div>
            <div className="text-2xl font-black text-slate-900 font-mono tracking-tight my-1">
              {item.phone}
            </div>
            <p className="text-xs text-blue-700/80">
              * 모바일 기기에서 아래 &lsquo;전화 걸기&rsquo; 버튼을 누르시면 즉시 다이얼로 연결됩니다.
            </p>
          </div>

          {/* Quick Actions Bar */}
          <div className="grid grid-cols-2 gap-3">
            <a
              href={`tel:${telNumber}`}
              className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl text-sm shadow-sm transition-all"
            >
              <Phone className="w-4 h-4" />
              <span>즉시 전화걸기</span>
            </a>

            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-3 px-4 rounded-xl text-sm border border-slate-300 transition-colors"
            >
              <Globe className="w-4 h-4 text-blue-600" />
              <span>공식 홈페이지</span>
            </a>
          </div>

          {/* Location details summary */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2 text-xs text-slate-700">
            <div className="flex items-center justify-between py-1 border-b border-slate-200/60">
              <span className="font-semibold text-slate-500 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" /> 지자체 구분
              </span>
              <span className="font-bold text-slate-900">{item.category}</span>
            </div>
            <div className="flex items-center justify-between py-1 border-b border-slate-200/60">
              <span className="font-semibold text-slate-500 flex items-center gap-1">
                <Globe className="w-3.5 h-3.5 text-slate-400" /> 광역시·도
              </span>
              <span className="font-bold text-slate-900">{item.province}</span>
            </div>
            <div className="flex items-center justify-between py-1">
              <span className="font-semibold text-slate-500 flex items-center gap-1">
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" /> 홈페이지 주소
              </span>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-blue-600 hover:underline truncate max-w-[200px]"
              >
                {item.url}
              </a>
            </div>
          </div>

          {/* User Memo / Note section */}
          <div className="border border-amber-200 bg-amber-50/50 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                <StickyNote className="w-4 h-4 text-amber-600" /> 개인 민원 메모
              </span>
              <button
                onClick={handleSaveNote}
                className={`text-xs px-2.5 py-1 rounded-lg font-bold transition-all flex items-center gap-1 ${
                  memoSaved
                    ? 'bg-emerald-600 text-white'
                    : 'bg-amber-600 hover:bg-amber-700 text-white shadow-xs'
                }`}
              >
                {memoSaved ? <Check className="w-3 h-3" /> : <Save className="w-3 h-3" />}
                <span>{memoSaved ? '저장완료' : '메모 저장'}</span>
              </button>
            </div>
            <textarea
              value={memoText}
              onChange={(e) => setMemoText(e.target.value)}
              placeholder="예: 주민등록등본 담당 부서, 내 방문 예정시간, 참고사항 메모 작성..."
              className="w-full text-xs sm:text-sm p-3 bg-white border border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 text-slate-800 font-medium resize-none h-20"
            />
          </div>
        </div>

        {/* Footer Share button */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-blue-600 transition-colors"
          >
            <Share2 className="w-4 h-4 text-blue-600" />
            <span>연락처 정보 공유하기</span>
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-xl text-xs transition-colors"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};
