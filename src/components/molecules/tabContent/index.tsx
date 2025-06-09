import { Tab } from "@/components/atom/tabs";
import { MyMeetings } from "../myMeetings";

interface TabContentProps {
  activeTab: Tab;
}

export const TabContent = ({ activeTab }: TabContentProps) => {
  return (
    <div className="mt-6">
      {activeTab.value === "meetings" && (
        <div role="tabpanel" id="panel-meetings" aria-labelledby="tab-meetings">
          <MyMeetings />
        </div>
      )}

      {activeTab.value === "reviews" && (
        <div role="tabpanel" id="panel-reviews" aria-labelledby="tab-reviews">
          {/* <MyReviews /> */}
        </div>
      )}

      {activeTab.value === "created-meetings" && (
        <div
          role="tabpanel"
          id="panel-created-meetings"
          aria-labelledby="tab-created-meetings"
        >
          {/* <CreatedMeetings /> */}
        </div>
      )}
    </div>
  );
};
