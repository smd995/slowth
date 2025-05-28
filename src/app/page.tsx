"use client";

import { PageHeader } from "@/components/molecules/pageHeader";

export default function Home() {
  return (
    <main className="flex flex-col bg-gray-100">
      {/* 페이지 타이틀 */}
      <h2 className="sr-only">모임 찾기</h2>

      {/* 콘텐츠 영역 */}
      <section
        style={{ minHeight: "calc(100vh - 60px)" }}
        className="mx-auto w-full max-w-[1200px] bg-white px-[100px] py-[40px]"
      >
        <PageHeader />
      </section>
    </main>
  );
}
