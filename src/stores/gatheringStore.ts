import { create } from "zustand";
import { JoinedGathering } from "@/entity/gathering";
import { getMyGatherings } from "@/effect/gatherings/getMyGatherings";
import { getCreatedGatherings } from "@/effect/gatherings/getCreatedGatherings";

interface GatheringStore {
  upcomingGatherings: JoinedGathering[];
  setUpcomingGatherings: (gatherings: JoinedGathering[]) => void;
  fetchUpcomingGatherings: () => Promise<void>;
  createdGatherings: JoinedGathering[];
  setCreatedGatherings: (gatherings: JoinedGathering[]) => void;
  fetchCreatedGatherings: (userId: number) => Promise<void>;
}

export const useGatheringStore = create<GatheringStore>((set) => ({
  upcomingGatherings: [],
  createdGatherings: [],
  setUpcomingGatherings: (gatherings) =>
    set({ upcomingGatherings: gatherings }),
  setCreatedGatherings: (gatherings) => set({ createdGatherings: gatherings }),
  fetchUpcomingGatherings: async () => {
    try {
      const data = await getMyGatherings(100, 0);
      set({ upcomingGatherings: data });
    } catch (error) {
      console.error("Failed to fetch gatherings:", error);
    }
  },
  fetchCreatedGatherings: async (userId: number) => {
    try {
      const data = await getCreatedGatherings(100, 0, userId);
      set({ createdGatherings: data });
    } catch (error) {
      console.error("Failed to fetch gatherings:", error);
    }
  },
}));
