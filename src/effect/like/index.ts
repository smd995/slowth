const STORAGE_KEY = "likedGatherings";

// 특정 모임이 찜되어 있는지 확인
export const isLikedCheck = (gatheringId: number) => {
  const stored = localStorage.getItem(STORAGE_KEY);
  const likedIds = stored ? JSON.parse(stored) : [];
  return likedIds.includes(gatheringId);
};

// 찜하기 버튼 클릭 시 저장 또는 제거
export const toggleLike = (gatheringId: number) => {
  const stored = localStorage.getItem(STORAGE_KEY);
  const likedIds = stored ? JSON.parse(stored) : [];

  let updatedLikes;
  if (likedIds.includes(gatheringId)) {
    // 이미 찜한 경우 → 제거
    updatedLikes = likedIds.filter((id: number) => id !== gatheringId);
  } else {
    // 찜하지 않은 경우 → 추가
    updatedLikes = [...likedIds, gatheringId];
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedLikes));
};
