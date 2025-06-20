"use client";

import Link from "next/link";
import { Badge } from "@/components/atom/badge";
import { NavItem } from "@/components/atom/navItem";
import { Logo } from "@/components/atom/logo";
import { Dropdown } from "@/components/atom/dropdown";
import { Avatar } from "@/components/atom/avatar";
import useUserStore from "@/stores/userStore";
import { usePathname, useRouter } from "next/navigation";
import useLikeStore from "@/stores/useLikeStore";

export const GNB = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { user, setUser } = useUserStore();
  const { likeCount } = useLikeStore();
  const isLoggined = user !== null;

  const handleSelectMenu = (value: string) => {
    if (value === "mypage") {
      router.push("/mypage");
      return;
    }

    if (value === "logout") {
      setUser(null);
      localStorage.removeItem("token");
      router.push("/");
      return;
    }
  };
  return (
    <header className="bg-primary-500 flex h-[60px] items-center">
      <div className="mx-auto flex h-[60px] w-full max-w-[1200px] items-center justify-between px-4">
        {/* 왼쪽: 로고 + 네비 */}
        <div className="flex items-center gap-3.5 sm:gap-7">
          <Link href="/">
            <Logo className="cursor-pointer" />
          </Link>
          <nav className="flex items-center gap-3 sm:gap-6">
            <Link href="/">
              <NavItem active={pathname === "/"} ariaLabel="모임 찾기 메뉴">
                모임 찾기
              </NavItem>
            </Link>
            <Link href="/liked">
              <NavItem
                active={pathname === "/liked"}
                ariaLabel={`찜한 모임 메뉴, 찜한 항목 ${likeCount}개`}
              >
                <span>찜한 모임</span>
                <Badge count={likeCount} />
              </NavItem>
            </Link>
            <Link href="/reviews">
              <NavItem
                active={pathname === "/reviews"}
                ariaLabel="모든 리뷰 메뉴"
              >
                모든 리뷰
              </NavItem>
            </Link>
          </nav>
        </div>

        {!isLoggined ? (
          <Link href="/login">
            <NavItem ariaLabel="로그인 메뉴">로그인</NavItem>
          </Link>
        ) : (
          <Dropdown
            selectBehavior="action"
            options={[
              { label: "마이페이지", value: "mypage" },
              { label: "로그아웃", value: "logout" },
            ]}
            size="lg"
            onSelect={handleSelectMenu}
            customListClassName="right-0"
          >
            <Avatar
              src={user.image || "/image/alt-profile.png"}
              username={user.name}
              className="!h-10 !w-10"
            />
          </Dropdown>
        )}
      </div>
    </header>
  );
};
