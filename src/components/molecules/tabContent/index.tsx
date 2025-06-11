"use client";

import { Tab } from "@/components/atom/tabs";
import { MyGatherings } from "../myGatherings";
import { MyReviews } from "../myReviews";
import { useState } from "react";
import { useEffect } from "react";
import { getReviews } from "@/effect/reviews/getReviews";
import { ReviewDetail } from "@/entity/review";
import { CreatedGatherings } from "../createdGatherings";

interface TabContentProps {
  activeTab: Tab;
}

export const TabContent = ({ activeTab }: TabContentProps) => {
  const [reviewsData, setReviewsData] = useState<ReviewDetail[]>([]);

  useEffect(() => {
    const fetchReviews = async () => {
      const reviews = await getReviews({ limit: 5 });
      setReviewsData(reviews.data);
    };
    fetchReviews();
  }, []);

  return (
    <div className="mt-6">
      {activeTab.value === "gatherings" && (
        <div
          role="tabpanel"
          id="panel-gatherings"
          aria-labelledby="tab-gatherings"
        >
          <MyGatherings />
        </div>
      )}

      {activeTab.value === "reviews" && (
        <div role="tabpanel" id="panel-reviews" aria-labelledby="tab-reviews">
          <MyReviews reviewsData={reviewsData} />
        </div>
      )}

      {activeTab.value === "created-gatherings" && (
        <div
          role="tabpanel"
          id="panel-created-gatherings"
          aria-labelledby="tab-created-gatherings"
        >
          <CreatedGatherings />
        </div>
      )}
    </div>
  );
};
