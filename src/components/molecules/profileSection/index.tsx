"use client";

import { useState } from "react";
import Image from "next/image";
import type { User } from "@/entity/user";
import { Avatar } from "@/components/atom/avatar";

// 임시 사용자 데이터 (실제로는 props나 훅으로 가져올 예정)
const mockUser: User = {
  teamId: 1,
  id: 1,
  name: "홍길동",
  email: "codeit@codeit.kr",
  companyName: "코드잇",
  image: "/image/alt-profile.png",
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const ProfileSection = () => {
  const [user] = useState<User>(mockUser);

  return (
    <>
      <div className="border-secondary-200 relative overflow-hidden rounded-3xl border-2 bg-white">
        {/* 프로필 이미지 - absolute positioning으로 띄움 */}
        <div className="absolute top-16 left-6 z-10">
          <Avatar
            src={user.image || "/image/alt-profile.png"}
            username={user.name}
            className="!h-14 !w-14"
          />
        </div>

        {/* 헤더 */}
        <div
          className="-m-0.5 flex items-center justify-between bg-cover bg-no-repeat px-6 py-5"
          style={{
            backgroundImage: "url('/image/profile-section.svg')",
            backgroundSize: "cover",
            backgroundPosition: "83% center", // 모바일: 30% 지점 (중요 모형 보호)
            backgroundClip: "border-box",
            backgroundOrigin: "border-box",
            margin: "-2px",
            marginBottom: "0",
          }}
        >
          <h2 className="text-white">내 프로필</h2>
          <button
            onClick={() => {}}
            className="bg-primary-50 text-primary-600 hover:bg-primary-100 rounded-full text-sm font-medium transition-colors"
          >
            <Image
              src="/image/btn_edit.svg"
              alt="프로필 수정"
              width={32}
              height={32}
            />
          </button>
        </div>

        {/* 프로필 정보 */}
        <div className="flex items-center space-x-4 px-6 py-5 pl-23">
          <div className="flex-1">
            <h3 className="mb-1 text-lg font-semibold text-gray-900">
              {user.name}
            </h3>
            <div className="space-y-1 text-sm text-gray-600">
              <div className="flex items-center gap-1.5">
                <p className="text-gray-800">company.</p>
                <p className="text-gray-700">{user.companyName}</p>
              </div>
              <div className="flex items-center gap-6">
                <p className="text-gray-800">E-mail.</p>
                <p className="text-gray-700">{user.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 프로필 수정 모달
      <ProfileEditModal
        // isOpen={isEditModalOpen}
        // onClose={() => setIsEditModalOpen(false)}
        user={user}
        onSubmit={handleProfileUpdate}
      /> */}
    </>
  );
};
