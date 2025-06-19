// 서버 컴포넌트: 초기 모임 리스트(SSR) Fetch
// 클라이언트 컴포넌트(gatheringListPage)로 데이터를 props로 전달합니다.

import { getGatheringList } from "@/effect/gatherings/getGatheringList";
import { GatheringListPage } from "@/components/molecules/gatheringListPage";
import { mainSortOptions } from "@/constants/sortOptions";
import { DEFAULT_TYPE } from "@/constants/category";

export default async function Page() {
  // 미리 데이터 가져오기
  const initialData = await getGatheringList(0, 10, {
    sortBy: mainSortOptions[0].sortBy, // "registrationEnd" (마감 임박)
    sortOrder: mainSortOptions[0].sortOrder, // "asc" (오름차순)
    type: DEFAULT_TYPE, // "DALLAEMFIT" (기본 타입)
  });
  return <GatheringListPage initialGatherings={initialData} />;
}
