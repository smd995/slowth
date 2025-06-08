"use client";

import { useEffect, useRef } from "react";

interface TimeColumnProps {
  items: string[]; // 시간 항목들(시간, 분, AM/PM)
  selected: string; // 현재 선택된 항목
  onSelect: (value: string) => void; // 항목을 클릭했을 때 실행할 함수
}

export function TimeColumn({ items, selected, onSelect }: TimeColumnProps) {
  // 화면에 그려진 항목들을 기억하기 위한 Ref
  // key: item 값, value: 그 항목의 HTML 요소를 저장
  const itemRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // 선택된 항목이 바뀔 때마다 자동으로 스크롤
  useEffect(() => {
    if (itemRefs.current[selected]) {
      itemRefs.current[selected]?.scrollIntoView({
        block: "center", // 항목을 화면 중앙에 위치시킴
        behavior: "smooth", // 부드럽게 스크롤
      });
    }
  }, [selected]); // selected 값이 변경될 때마다 실행

  return (
    <div
      // 항목들을 위에서 아래로 세로 방향으로 쌓고, 세로로 스크롤 가능하도록 설정
      className="scroll-snap-y mandatory flex w-[62px] flex-col items-center gap-2 overflow-y-auto p-2.5"
    >
      {/* 항목들(items 배열)을 순회하며 각 항목을 div로 생성 */}
      {items.map((item) => (
        <div
          key={item} // 각 항목의 고유한 키로 사용
          ref={(el) => void (itemRefs.current[item] = el)} // 해당 항목의 HTML 요소를 itemRefs에 저장
          onClick={() => onSelect(item)} // 항목을 클릭하면 onSelect 함수에 item 값을 넘겨 호출
          className={`scroll-snap-align-center flex h-[33px] w-full cursor-pointer items-center justify-center rounded-lg text-sm ${selected === item ? "bg-primary-500 font-medium text-white" : "text-secondary-900"} `}
        >
          {item}
        </div>
      ))}
    </div>
  );
}
