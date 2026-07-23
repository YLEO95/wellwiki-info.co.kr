export interface Municipality {
  id: string;
  category: string; // 구분 (특별/광역시, 특별자치시, 특별자치도, 경기도 등)
  province: string; // 광역시·도 (서울특별시, 부산광역시 등)
  name: string; // 시·군·구명 (서울특별시청, 종로구청 등)
  phone: string; // 민원실/대표 전화번호
  url: string; // 공식 홈페이지
}

export type RegionGroup = 
  | 'ALL' 
  | '수도권' 
  | '영남권' 
  | '충청권' 
  | '호남권' 
  | '강원·제주';

export interface QuickCallCenter {
  id: string;
  name: string;
  number: string;
  description: string;
  badge: string;
  badgeColor: string;
}

export interface UserMemo {
  municipalityId: string;
  memo: string;
  updatedAt: string;
}
