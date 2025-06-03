import { User } from "@/entity/user";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface UserStore {
  user: User | null;
  setUser: (user: User | null) => void;
}

const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user: User | null) => set({ user }),
    }),
    {
      name: "user",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useUserStore;
