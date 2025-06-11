import { SortOption } from "@/entity/filters";

// 메인페이지 정렬 옵션
// const mainSortOptions: SortOption[] = [
//   {
//     label: "마감 임박",
//     value: "closingSoon",
//     sortBy: "registrationEnd",
//     sortOrder: "asc",
//   },
//   {
//     label: "참여 인원 순",
//     value: "participants",
//     sortBy: "participantCount",
//     sortOrder: "desc",
//   },
// ];

// 리뷰페이지 정렬 옵션
export const reviewsSortOptions: SortOption[] = [
  {
    label: "최신 순",
    value: "createdAt",
    sortBy: "createdAt",
    sortOrder: "asc",
  },
  {
    label: "리뷰 높은 순",
    value: "score",
    sortBy: "score",
    sortOrder: "desc",
  },
  {
    label: "참여 인원 순",
    value: "participants",
    sortBy: "participantCount",
    sortOrder: "desc",
  },
];
