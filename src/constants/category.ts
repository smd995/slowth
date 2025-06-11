import { type Tab } from "@/components/atom/tabs";

// 상위 탭
export const TOP_CATEGORY: Tab[] = [
  { label: "마인드풀니스", value: "DALLAEMFIT", icon: "meditation" },
  { label: "원데이클래스", value: "WORKATION", icon: "vacation" },
];

// 하위 탭
export const SUB_CATEGORY: Record<string, { label: string; value: string }[]> =
  {
    DALLAEMFIT: [
      { label: "전체", value: "DALLAEMFIT" },
      { label: "요가", value: "OFFICE_STRETCHING" },
      { label: "명상", value: "MINDFULNESS" },
    ],
    WORKATION: [], // 워케이션은 하위 카테고리 없음
  };

export const DEFAULT_TYPE = SUB_CATEGORY[TOP_CATEGORY[0].value][0].value;
