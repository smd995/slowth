import { create } from "zustand";
import { JoinedGathering } from "@/entity/gathering";
import { getMyGatherings } from "@/effect/gatherings/getMyGatherings";

interface GatheringStore {
  upcomingGatherings: JoinedGathering[];
  setUpcomingGatherings: (gatherings: JoinedGathering[]) => void;
  fetchUpcomingGatherings: (userId: number) => Promise<void>;
}

export const useGatheringStore = create<GatheringStore>((set) => ({
  upcomingGatherings: [],
  setUpcomingGatherings: (gatherings) =>
    set({ upcomingGatherings: gatherings }),
  fetchUpcomingGatherings: async (userId) => {
    try {
      const data = await getMyGatherings(100, 0, userId);
      set({ upcomingGatherings: data });
    } catch (error) {
      console.error("Failed to fetch gatherings:", error);
    }
  },
}));
