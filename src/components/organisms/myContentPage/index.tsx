// app/mypage/components/MyPageContent.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { ProfileSection } from "@/components/molecules/profileSection";
import { Tab, Tabs } from "@/components/atom/tabs";
import { TabContent } from "@/components/molecules/tabContent";
import useUserStore from "@/stores/userStore";
import { fetchUser } from "@/effect/user";

const tabs = [
  { label: "나의 모임", value: "gatherings" },
  { label: "나의 리뷰", value: "reviews" },
  { label: "내가 만든 모임", value: "created-gatherings" },
];

export default function MyPageContent() {
  const [activeTab, setActiveTab] = useState<Tab>({
    label: "나의 모임",
    value: "gatherings",
  });

  const { user } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("로그인이 필요합니다.");
      router.push("/login");
      return;
    }

    if (token && !user) {
      fetchUser();
    }
  }, [user, router]);

  return (
    <>
      <ProfileSection user={user} />

      <div className="border-secondary-900 mt-7 min-h-dvh border-t-2 bg-white px-4 py-6 sm:px-6">
        <Tabs tabs={tabs} selectedTab={activeTab} onChange={setActiveTab} />

        <TabContent activeTab={activeTab} />
      </div>
    </>
  );
}
