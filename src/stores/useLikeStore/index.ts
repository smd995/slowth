import { create } from "zustand";
import { persist } from "zustand/middleware";

interface LikeStore {
  likeCount: number;
  likedGattheringIds: number[];
  toggleLike: (id: number) => void;
  isLikedCheck: (id: number) => boolean;
}

const useLikeStore = create<LikeStore>()(
  persist(
    (set, get) => ({
      likedGattheringIds: [],
      likeCount: 0,

      toggleLike: (id: number) => {
        const current = get().likedGattheringIds;
        const isLiked = current.includes(id);
        const updated = isLiked
          ? current.filter((likedId) => likedId !== id)
          : [...current, id];

        set({
          likedGattheringIds: updated,
          likeCount: updated.length,
        });
      },

      isLikedCheck: (id: number) => {
        return get().likedGattheringIds.includes(id);
      },
    }),
    {
      name: "likedGattheringIds",
    },
  ),
);

export default useLikeStore;
