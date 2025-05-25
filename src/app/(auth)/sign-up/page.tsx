"use client";

import { Button } from "@/components/atom/button";
import { Input } from "@/components/atom/input";
import Image from "next/image";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center space-x-22">
      <Image
        src="/image/login-image.png"
        alt="login-image"
        width={588}
        height={574}
        objectFit="cover"
      />
      <div className="rounded-3xl bg-white px-14 py-8">
        <h2 className="mb-8 text-center">회원가입</h2>
        <Input
          label="이름"
          value={""}
          onChange={() => {}}
          placeholder={"이름을 입력해주세요"}
        />
        <Input
          label="아이디"
          value={""}
          onChange={() => {}}
          placeholder={"이메일을 입력해주세요"}
        />

        <Input
          label="회사명"
          value={""}
          onChange={() => {}}
          placeholder={"회사명을 입력해주세요"}
        />
        <Input
          label="비밀번호"
          value={""}
          onChange={() => {}}
          placeholder={"비밀번호를 입력해주세요"}
        />
        <Input
          label="비밀번호 확인"
          value={""}
          onChange={() => {}}
          placeholder={"비밀번호를 다시 한 번 입력해주세요"}
        />

        <Button onClick={() => {}} size="lg" disabled>
          확인
        </Button>
        <div className="mt-6 flex justify-center">
          <p>이미 회원이신가요?</p>
          <Link href={"/login"}>
            <p className="text-primary-600 underline">로그인</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
