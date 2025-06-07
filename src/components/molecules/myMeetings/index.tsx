"use client";

import { useState } from "react";
import type { JoinedGathering } from "@/entity/gathering";
import { VerticalMeetingCard } from "@/components/molecules/verticalMeetingCard";
import { HorizontalMeetingCard } from "@/components/molecules/horizontalMeetingCard";

// 임시 모임 데이터
const mockUpcomingMeetings: JoinedGathering[] = [
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

export const MyMeetings = () => {
  const [upcomingMeetings] = useState<JoinedGathering[]>(mockUpcomingMeetings);

  const handleCancelMeeting = (meetingId: number) => {
    // 실제로는 API 호출 로직이 들어갈 예정
    console.log("모임 취소:", meetingId);
  };

  return (
    <div className="space-y-6">
      {/* 예정된 모임 */}
      {upcomingMeetings.length > 0 && (
        <section>
          <div className="space-y-6">
            {upcomingMeetings.map((meeting: JoinedGathering) => (
              <div key={meeting.id}>
                {/* Mobile: Vertical card */}
                <div className="block sm:hidden">
                  <VerticalMeetingCard
                    meeting={meeting}
                    onCancel={() => handleCancelMeeting(meeting.id)}
                    onReview={() => {}}
                  />
                </div>

                {/* Desktop: Horizontal card */}
                <div className="hidden sm:block">
                  <HorizontalMeetingCard
                    meeting={meeting}
                    onCancel={() => handleCancelMeeting(meeting.id)}
                    onReview={() => {}}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 빈 상태 */}
      {upcomingMeetings.length === 0 && (
        <div className="flex min-h-screen items-center justify-center text-center">
          <p className="text-secondary-500">신청한 모임이 아직 없어요.</p>
        </div>
      )}

      {/* 리뷰 작성 모달
      {selectedMeeting && (
        <ReviewModal
          isOpen={reviewModalOpen}
          onClose={() => {
            setReviewModalOpen(false);
            setSelectedMeeting(null);
          }}
          meeting={selectedMeeting}
          onSubmit={handleSubmitReview}
        />
      )} */}
    </div>
  );
};
