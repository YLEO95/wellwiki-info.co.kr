import { QuickCallCenter } from '../types';

export const QUICK_CALL_CENTERS: QuickCallCenter[] = [
  {
    id: 'dasan-120',
    name: '120 다산콜센터 / 민원콜센터',
    number: '120',
    description: '지역별 시·도 민원 종합 안내',
    badge: '민원 종합',
    badgeColor: 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300'
  },
  {
    id: 'gov-110',
    name: '정부민원안내 콜센터',
    number: '110',
    description: '국민권익위원회 정부 통합 민원',
    badge: '정부 통합',
    badgeColor: 'bg-teal-100 text-teal-800 dark:bg-teal-900/40 dark:text-teal-300'
  },
  {
    id: 'welfare-129',
    name: '보건복지상담센터',
    number: '129',
    description: '긴급복지 및 복지제도 안내',
    badge: '복지·보건',
    badgeColor: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-300'
  },
  {
    id: 'police-112',
    name: '경찰청 긴급신고',
    number: '112',
    description: '범죄신고 및 긴급출동',
    badge: '긴급 범죄',
    badgeColor: 'bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300'
  },
  {
    id: 'fire-119',
    name: '소방 재난응급신고',
    number: '119',
    description: '화재, 구조, 구급, 재난신고',
    badge: '재난·구급',
    badgeColor: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300'
  }
];
