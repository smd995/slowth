import { http, HttpResponse } from "msw";
import {
  canceledGatheringFixture,
  gatheringFixture,
  reviewListResponseFixture,
} from "../../fixtures/detail-fixture";
import { participantFixture } from "../../fixtures/participants-fixture";
export const detailHandlers = [
  // 모임 상세 조회
  http.get(
    "https://fe-adv-project-together-dallaem.vercel.app/slotest/gatherings/:id",
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

  // 특정 모임의 참가자 목록 조회
  http.get(
    "https://fe-adv-project-together-dallaem.vercel.app/slotest/gatherings/:id/participants",
    () => {
      return HttpResponse.json(participantFixture.slice(0, 5));
    },
  ),

  // 모임 취소하기 (주최자)
  http.put(
    "https://fe-adv-project-together-dallaem.vercel.app/:teamId/gatherings/:id/cancel",
    ({ params, request }) => {
      const { teamId, id } = params;
      const authHeader = request.headers.get("Authorization");

      // 인증 체크 (토큰 없으면 실패 처리)
      if (!authHeader) {
        return HttpResponse.json(
          {
            code: "UNAUTHORIZED",
            message: "Authorization 헤더가 필요합니다",
          },
          { status: 401 },
        );
      }

      console.log(`✅ 모임 취소됨: teamId=${teamId}, gatheringId=${id}`);
      return HttpResponse.json(canceledGatheringFixture, { status: 200 });
    },
  ),

  // 모임 참여하기
  http.post(
    "https://fe-adv-project-together-dallaem.vercel.app/:teamId/gatherings/:id/join",
    ({ params, request }) => {
      const { teamId, id } = params;
      const authHeader = request.headers.get("Authorization");

      // 인증 체크 (토큰 없으면 실패 처리)
      if (!authHeader) {
        return HttpResponse.json(
          {
            code: "UNAUTHORIZED",
            message: "Authorization 헤더가 필요합니다",
          },
          { status: 401 },
        );
      }

      console.log(`✅ 모임 참여완료: teamId=${teamId}, gatheringId=${id}`);
      return HttpResponse.json(
        {
          message: "모임에 참여했습니다",
        },
        { status: 200 },
      );
    },
  ),

  // 모임 참여 취소하기
  http.delete(
    "https://fe-adv-project-together-dallaem.vercel.app/:teamId/gatherings/:id/leave",
    ({ params, request }) => {
      const { teamId, id } = params;
      const authHeader = request.headers.get("Authorization");

      // 인증 체크 (토큰 없으면 실패 처리)
      if (!authHeader) {
        return HttpResponse.json(
          {
            code: "UNAUTHORIZED",
            message: "Authorization 헤더가 필요합니다",
          },
          { status: 401 },
        );
      }

      console.log(
        `✅ 모임 참여 취소하기 완료: teamId=${teamId}, gatheringId=${id}`,
      );
      return HttpResponse.json(
        {
          message: "모임을 참여 취소했습니다",
        },
        { status: 200 },
      );
    },
  ),
];
