"use client";

import Link from "next/link";
import { Badge } from "@/components/atom/badge";
import { NavItem } from "@/components/atom/navItem";
import { Logo } from "@/components/atom/logo";
import { Dropdown } from "@/components/atom/dropdown";
import { Avatar } from "@/components/atom/avatar";

interface GNBProps {
  favoriteCount?: number;
  username: string;
  avatarSrc?: string;
  onSelectMenu?: (value: string) => void;
}

export const GNB = ({
  favoriteCount = 0,
  username,
  avatarSrc = "/image/alt-profile.png",
  onSelectMenu = (val) => console.log(`${val} 선택됨`),
}: GNBProps) => {
  return (
    <header className="bg-primary-500 flex h-[60px] items-center">
      <div className="mx-auto flex h-[60px] w-[1198px] items-center justify-between px-1">
        {/* 왼쪽: 로고 + 네비 */}
        <div className="flex items-center gap-7">
          <Link href="/">
            <Logo className="cursor-pointer" />
          </Link>
          <nav className="flex items-center gap-[24px]">
            <Link href="/">
              <NavItem>모임 찾기</NavItem>
            </Link>
            <Link href="/">
              <NavItem>
                <span>찜한 모임</span>
                <Badge count={favoriteCount} />
              </NavItem>
            </Link>
            <Link href="/">
              <NavItem>모든 리뷰</NavItem>
            </Link>
          </nav>
        </div>

        {/* 오른쪽: 유틸 드롭다운 */}
        <Dropdown
          openType="list"
          selectBehavior="action"
          options={[
            { label: "마이페이지", value: "mypage" },
            { label: "로그아웃", value: "logout" },
          ]}
          size="lg"
          onSelect={onSelectMenu}
          customListClassName="right-0"
        >
          <Avatar src={avatarSrc} username={username} className="!h-10 !w-10" />
        </Dropdown>
      </div>
    </header>
  );
};
