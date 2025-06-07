"use client";

import { useState } from "react";
import { ProfileSection } from "@/components/molecules/profileSection";
import { Tab, Tabs } from "@/components/atom/tabs";
import { TabContent } from "@/components/molecules/tabContent";

export const tabs = [
  { label: "나의 모임", value: "meetings" },
  { label: "나의 리뷰", value: "reviews" },
  { label: "내가 만든 모임", value: "created-meetings" },
];

export default function MyPage() {
  const [activeTab, setActiveTab] = useState<Tab>({
    label: "나의 모임",
    value: "meetings",
  });

  return (
    <div className="bg-secondary-100 flex min-h-screen justify-center">
      <div className="bg-secondary-50 w-full max-w-[1200px]">
        <div className="mx-4 my-6 flex flex-col items-center">
          {/* 헤더 */}
          <div className="w-full">
            <h2>마이 페이지</h2>
          </div>

          {/* 메인 컨텐츠 */}
          <div className="mt-6 w-full">
            <ProfileSection />

            <div className="border-secondary-900 mt-7 min-h-dvh border-t-2 bg-white px-4 py-6">
              <Tabs
                tabs={tabs}
                selectedTab={activeTab}
                onChange={setActiveTab}
              />

              <TabContent activeTab={activeTab} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
