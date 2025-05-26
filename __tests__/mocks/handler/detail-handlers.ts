import { http, HttpResponse } from "msw";
import {
  gatheringFixture,
  reviewListResponseFixture,
} from "../../fixtures/detail-fixture";
export const detailHandlers = [
  // 모임 상세 조회
  http.get(
    "https://fe-adv-project-together-dallaem.vercel.app/slotest/gatherings/123",
    () => {
      return HttpResponse.json(gatheringFixture);
    },
  ),

  // 특정 모임 리뷰 목록 조회
  http.get(
    "https://fe-adv-project-together-dallaem.vercel.app/slotest/reviews",
    ({ request }) => {
      const url = new URL(request.url);
      const offsetString = url.searchParams.get("offset");
      const offset: number = offsetString ? parseInt(offsetString) : 0;
      return HttpResponse.json(reviewListResponseFixture(offset));
    },
  ),
];
