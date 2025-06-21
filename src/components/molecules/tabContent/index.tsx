"use client";

import { Tab } from "@/components/atom/tabs";
import { MyGatherings } from "../myGatherings";
import { MyReviews } from "../myReviews";
import { CreatedGatherings } from "../createdGatherings";
import { useMyGatherings } from "@/hooks/api/useMyGatherings";
import { useCreatedGatherings } from "@/hooks/api/useCreatedGatherings";
import useUserStore from "@/stores/userStore";

interface TabContentProps {
  activeTab: Tab;
}

export const TabContent = ({ activeTab }: TabContentProps) => {
  const { user } = useUserStore();

  // SWR hooks for data fetching
  const { gatherings: upcomingGatherings } = useMyGatherings();
  const { gatherings: createdGatherings } = useCreatedGatherings(user?.id);

  return (
    <div className="mt-6">
      {activeTab.value === "gatherings" && (
        <div
          role="tabpanel"
          id="panel-gatherings"
          aria-labelledby="tab-gatherings"
        >
          <MyGatherings upcomingGatherings={upcomingGatherings} />
        </div>
      )}

      {activeTab.value === "reviews" && (
        <div role="tabpanel" id="panel-reviews" aria-labelledby="tab-reviews">
          <MyReviews />
        </div>
      )}

      {activeTab.value === "created-gatherings" && (
        <div
          role="tabpanel"
          id="panel-created-gatherings"
          aria-labelledby="tab-created-gatherings"
        >
          <CreatedGatherings createdGatherings={createdGatherings} />
        </div>
      )}
    </div>
  );
};
