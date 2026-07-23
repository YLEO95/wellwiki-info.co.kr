import React from 'react';
import { X, HelpCircle, PhoneCall, ShieldCheck, Clock, FileText } from 'lucide-react';

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InfoModal: React.FC<InfoModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-lg w-full overflow-hidden flex flex-col max-h-[85vh]">
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-blue-400" />
            <h3 className="text-lg font-bold">민원전화 사용 가이드</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4 overflow-y-auto text-xs sm:text-sm text-slate-700">
          <div className="flex items-start gap-3 p-3.5 bg-blue-50/70 border border-blue-200/80 rounded-2xl">
            <PhoneCall className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-slate-900 mb-0.5">지역번호 + 120 (다산콜/민원콜)</h4>
              <p className="text-slate-600 leading-relaxed">
                해당 지역의 광역시·도 대표 민원 상담을 통화하고 싶으실 때는 타지역 이용 시 해당 지역번호(예: 서울 02-120, 경기 031-120)를 입력하세요.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3.5 bg-slate-50 border border-slate-200 rounded-2xl">
            <Clock className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-slate-900 mb-0.5">민원실 운영시간 안내</h4>
              <p className="text-slate-600 leading-relaxed">
                일반 민원업무 상담 시간은 평일 09:00 ~ 18:00입니다. 120 민원콜센터 등은 야간 및 주말 긴급 민원안내 서비스를 제공합니다.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3.5 bg-slate-50 border border-slate-200 rounded-2xl">
            <FileText className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-slate-900 mb-0.5">온라인 서류 발급 (정부24)</h4>
              <p className="text-slate-600 leading-relaxed">
                주민등록등본, 건축물대장, 지방세 증명서 등 각종 공공 서류는 정부24(gov.kr) 또는 각 지자체 공식 홈페이지에서 무료 또는 저렴하게 발급받으실 수 있습니다.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3.5 bg-slate-50 border border-slate-200 rounded-2xl">
            <ShieldCheck className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-slate-900 mb-0.5">즐겨찾기 및 메모 저장</h4>
              <p className="text-slate-600 leading-relaxed">
                자주 찾는 주민센터 및 구청은 별표(북마크)를 눌러 등록하고, 나만의 메모 기능을 이용해 담당 부서 연락처를 기록하세요. (브라우저 로컬 저장)
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 bg-slate-50 border-t border-slate-200 text-right">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs transition-colors"
          >
            확인하였습니다
          </button>
        </div>
      </div>
    </div>
  );
};
