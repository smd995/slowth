import { create } from "zustand";
import { persist } from "zustand/middleware";

interface LikeStore {
  likeCount: number;
  likedGatheringIds: number[];
  toggleLike: (id: number) => void;
  isLikedCheck: (id: number) => boolean;
}

const useLikeStore = create<LikeStore>()(
  persist(
    (set, get) => ({
      likedGatheringIds: [],
      likeCount: 0,

      toggleLike: (id: number) => {
        const current = get().likedGatheringIds;
        const isLiked = current.includes(id);
        const updated = isLiked
          ? current.filter((likedId) => likedId !== id)
          : [...current, id];

        set({
          likedGatheringIds: updated,
          likeCount: updated.length,
        });
      },

      isLikedCheck: (id: number) => {
        return get().likedGatheringIds.includes(id);
      },
    }),
    {
      name: "likedGatheringIds",
    },
  ),
);

export default useLikeStore;
