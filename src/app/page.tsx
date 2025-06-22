// 클라이언트 렌더링 전용 페이지
// CSR에서 필터링과 자동 재로딩으로 유효한 모임만 표시합니다.

import { GatheringListPage } from "@/components/molecules/gatheringListPage";

export default function Page() {
  // CSR에서만 데이터 로딩 (필터링 + 자동 재로딩)
  return <GatheringListPage initialGatherings={[]} />;
}
