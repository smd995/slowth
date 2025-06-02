// 서버 컴포넌트: 초기 모임 리스트(SSR) Fetch
// 클라이언트 컴포넌트(GatheringListPage)로 데이터를 props로 전달합니다.

import { getGatheringList } from "@/effect/gatherings/getGatheringList";
import { GatheringListPage } from "./GatheringListPage";

export default async function Page() {
  const initialData = await getGatheringList(0, 10); // offset=0, limit=10
  return <GatheringListPage initialGatherings={initialData} />;
}
