"use client";

import { Tabs } from "@/components/atom/tabs";
import { useState } from "react";

export default function Home() {
  const [selectedTab, setSelectedTab] = useState({
    label: "전체",
    value: "all",
  });
  return (
    <>
      <Tabs
        tabs={[
          { label: "전체", value: "all" },
          { label: "공지", value: "notice" },
          { label: "자유글", value: "free" },
        ]}
        selectedTab={selectedTab}
        onChange={setSelectedTab}
      />
    </>
  );
}
