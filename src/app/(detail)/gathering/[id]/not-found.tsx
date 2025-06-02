"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/atom/button";

export default function DetailNotFound() {
  const router = useRouter();

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      <h2 className="text-primary-600 text-2xl font-bold">
        모임을 찾을 수 없습니다.
      </h2>
      <p className="text-gray-600">
        요청하신 모임이 존재하지 않거나 삭제되었어요.
      </p>
      <div className="mt-4 flex gap-2">
        <Button onClick={() => router.push("/")}>메인으로</Button>
        <Button variant="outline" onClick={() => router.back()}>
          이전 페이지
        </Button>
      </div>
    </div>
  );
}
