"use client";

import { useState } from "react";
import Image from "next/image";
import type { User } from "@/entities/user";
import { Avatar } from "@/shared/ui";
import { ProfileEditModal } from "../profileEditModal";

export const ProfileSection = ({ user }: { user: User | null }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  return (
    <>
      <div className="border-secondary-200 relative overflow-hidden rounded-3xl border-2 bg-white">
        <div className="absolute top-16 left-6 z-10">
          <Avatar
            src={user?.image || "/image/alt-profile.png"}
            username={user?.name || ""}
            className="!h-14 !w-14"
          />
        </div>

        {/* 헤더 */}
        <div
          className="-m-0.5 flex items-center justify-between bg-cover bg-no-repeat px-6 py-5"
          style={{
            backgroundImage: "url('/image/profile-section.svg')",
            backgroundSize: "cover",
            backgroundPosition: "83% center",
            backgroundClip: "border-box",
            backgroundOrigin: "border-box",
            margin: "-2px",
            marginBottom: "0",
          }}
        >
          <h3 className="text-lg font-semibold text-white">내 프로필</h3>
          <button
            onClick={() => setIsEditModalOpen(true)}
            className="rounded-full transition-colors"
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
              {user?.name || "아이디"}
            </h3>
            <div className="space-y-1 text-sm text-gray-600">
              <div className="flex items-center gap-1.5">
                <p className="text-gray-800">company.</p>
                <p className="text-gray-700">{user?.companyName || "회사"}</p>
              </div>
              <div className="flex items-center gap-6">
                <p className="text-gray-800">E-mail.</p>
                <p className="text-gray-700">{user?.email || "이메일"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 프로필 수정 모달 */}
      <ProfileEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        user={user}
      />
    </>
  );
};
