"use client";

import { useState } from "react";
import type { JoinedGathering } from "@/entity/gathering";
import { VerticalCreatedGatheringCard } from "../verticalCreatedGatheringCard";
import { HorizontalCreatedGatheringCard } from "../horizontalCreatedGatheringCard";

// 임시 모임 데이터
const mockUpcomingGatherings: JoinedGathering[] = [
  {
    teamId: 1,
    id: 1,
    type: "DALLAEMFIT",
    name: "달램핏 오피스 스트레칭",
    dateTime: "2025-06-21T10:00:00",
    registrationEnd: "2025-06-20T10:00:00",
    location: "을지로 3가",
    participantCount: 5,
    capacity: 10,
    image: "/image/alt-place.jpg",
    createdBy: 2,
    canceledAt: null,
    joinedAt: "2024-12-20T15:30:00",
    isCompleted: false,
    isReviewed: false,
  },
  {
    teamId: 1,
    id: 2,
    type: "DALLAEMFIT",
    name: "달램핏 오피스 스트레칭",
    dateTime: "2025-06-21T10:00:00",
    registrationEnd: "2025-06-20T10:00:00",
    location: "을지로 3가",
    participantCount: 5,
    capacity: 10,
    image: "/image/alt-place.jpg",
    createdBy: 2,
    canceledAt: null,
    joinedAt: "2024-12-20T15:30:00",
    isCompleted: false,
    isReviewed: false,
  },
  {
    teamId: 1,
    id: 3,
    type: "DALLAEMFIT",
    name: "달램핏 오피스 스트레칭",
    dateTime: "2025-06-21T10:00:00",
    registrationEnd: "2025-06-20T10:00:00",
    location: "을지로 3가",
    participantCount: 4,
    capacity: 10,
    image: "/image/alt-place.jpg",
    createdBy: 2,
    canceledAt: null,
    joinedAt: "2024-12-20T15:30:00",
    isCompleted: false,
    isReviewed: false,
  },
  {
    teamId: 1,
    id: 4,
    type: "DALLAEMFIT",
    name: "달램핏 오피스 스트레칭",
    dateTime: "2025-06-21T10:00:00",
    registrationEnd: "2025-06-20T10:00:00",
    location: "을지로 3가",
    participantCount: 1,
    capacity: 10,
    image: "/image/alt-place.jpg",
    createdBy: 2,
    canceledAt: null,
    joinedAt: "2024-12-20T15:30:00",
    isCompleted: false,
    isReviewed: false,
  },
  {
    teamId: 1,
    id: 5,
    type: "DALLAEMFIT",
    name: "달램핏 오피스 스트레칭",
    dateTime: "2024-06-07T10:00:00",
    registrationEnd: "2024-06-04T10:00:00",
    location: "을지로 3가",
    participantCount: 1,
    capacity: 10,
    image: "/image/alt-place.jpg",
    createdBy: 2,
    canceledAt: null,
    joinedAt: "2024-12-20T15:30:00",
    isCompleted: true,
    isReviewed: false,
  },
  {
    teamId: 1,
    id: 6,
    type: "DALLAEMFIT",
    name: "달램핏 오피스 스트레칭",
    dateTime: "2024-06-07T10:00:00",
    registrationEnd: "2024-06-04T10:00:00",
    location: "을지로 3가",
    participantCount: 1,
    capacity: 10,
    image: "/image/alt-place.jpg",
    createdBy: 2,
    canceledAt: "2024-06-04T10:00:00",
    joinedAt: "2024-12-20T15:30:00",
    isCompleted: true,
    isReviewed: false,
  },
  {
    teamId: 1,
    id: 7,
    type: "DALLAEMFIT",
    name: "달램핏 오피스 스트레칭",
    dateTime: "2024-06-07T10:00:00",
    registrationEnd: "2024-06-04T10:00:00",
    location: "을지로 3가",
    participantCount: 1,
    capacity: 10,
    image: "/image/alt-place.jpg",
    createdBy: 2,
    canceledAt: "2024-06-04T10:00:00",
    joinedAt: "2024-12-20T15:30:00",
    isCompleted: true,
    isReviewed: false,
  },
];

export const CreatedGatherings = () => {
  const [upcomingGatherings] = useState<JoinedGathering[]>(
    mockUpcomingGatherings,
  );

  return (
    <div className="space-y-6">
      {/* 예정된 모임 */}
      {upcomingGatherings.length > 0 && (
        <section>
          <div className="space-y-6">
            {upcomingGatherings.map((gathering: JoinedGathering) => (
              <div key={gathering.id}>
                {/* Mobile: Vertical card */}
                <div className="border-b-secondary-200 block w-full border-b-2 border-dashed pb-6 sm:hidden">
                  <VerticalCreatedGatheringCard gathering={gathering} />
                </div>

                {/* Desktop: Horizontal card */}
                <div className="border-b-secondary-200 hidden w-full border-b-2 border-dashed pb-6 sm:block">
                  <HorizontalCreatedGatheringCard gathering={gathering} />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 빈 상태 */}
      {upcomingGatherings.length === 0 && (
        <div className="flex min-h-screen items-center justify-center text-center">
          <p className="text-secondary-500">신청한 모임이 아직 없어요.</p>
        </div>
      )}

      {/* 리뷰 작성 모달
      {selectedGathering && (
        <ReviewModal
          isOpen={reviewModalOpen}
          onClose={() => {
            setReviewModalOpen(false);
            setSelectedGathering(null);
          }}
          gathering={selectedGathering}
          onSubmit={handleSubmitReview}
        />
      )} */}
    </div>
  );
};
