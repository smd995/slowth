import { Chip } from "@/components/atom/chip";
import { MyReviewList } from "@/components/organisms/myReviewList";
import { ReviewDetail } from "@/entity/review";
import clsx from "clsx";
import { useState } from "react";
import { VerticalWritableReviewCard } from "../verticalWritableReviewCard";
import { JoinedGathering } from "@/entity/gathering";
import { HorizontalWritableReviewCard } from "../horizontalWritableReviewCard";

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

interface MyReviewsProps {
  className?: string;
  reviewsData: ReviewDetail[];
}

export const MyReviews = ({ className, reviewsData }: MyReviewsProps) => {
  const [selectedTab, setSelectedTab] = useState<"writable" | "written">(
    "writable",
  );

  // 작성한 리뷰만 currentData로 사용 (MyReviewList에서 사용)
  const currentData = reviewsData;

  return (
    <div className={clsx(className)}>
      {/* 탭 */}
      <div className="flex gap-2">
        <Chip
          label={"작성가능한 리뷰"}
          selected={selectedTab === "writable"}
          onClick={() => setSelectedTab("writable")}
        />
        <Chip
          label={"작성한 리뷰"}
          selected={selectedTab === "written"}
          onClick={() => setSelectedTab("written")}
        />
      </div>

      {/* 탭에 따른 컨텐츠 */}
      <div className="mt-6">
        {selectedTab === "writable" ? (
          // 작성 가능한 리뷰 리스트
          <div className="space-y-6">
            {mockUpcomingGatherings.map((gathering) => (
              <div
                className="border-b-secondary-200 block w-full border-b-2 border-dashed pb-6 sm:hidden"
                key={gathering.id}
              >
                <VerticalWritableReviewCard
                  key={gathering.id}
                  onReview={() => {}}
                  gathering={gathering}
                />
              </div>
            ))}

            {mockUpcomingGatherings.map((gathering) => (
              <div
                className="border-b-secondary-200 hidden w-full border-b-2 border-dashed pb-6 sm:block"
                key={gathering.id}
              >
                <HorizontalWritableReviewCard
                  key={gathering.id}
                  onReview={() => {}}
                  gathering={gathering}
                />
              </div>
            ))}
          </div>
        ) : (
          // 작성한 리뷰 리스트
          <MyReviewList showImage={true} reviewList={currentData} />
        )}
      </div>
    </div>
  );
};
