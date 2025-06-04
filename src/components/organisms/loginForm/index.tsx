"use client";

import { Button } from "@/components/atom/button";
import { Input } from "@/components/atom/input";
import { signIn } from "@/effect/auth";
import { LoginFormInput } from "@/entity/user";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export const LoginForm = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInput>({
    mode: "all",
    delayError: 1000,
  });

  const onSubmit = async (data: LoginFormInput) => {
    try {
      const response = await signIn(data);

      console.log(response);

      if (response.token) {
        toast.success("로그인 성공");
        router.push("/");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message || "로그인에 실패했습니다");
      } else {
        toast.error("로그인에 실패했습니다");
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <form
        className="w-full max-w-md space-y-2 rounded-3xl bg-white px-14 py-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="mb-8 text-center text-2xl font-bold">로그인</h2>

        <Input
          label="이메일"
          type="email"
          placeholder="이메일을 입력해주세요"
          error={errors.email?.message}
          {...register("email", {
            required: "이메일을 입력해주세요",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "올바른 이메일 형식이 아닙니다",
            },
          })}
        />

        <Input
          label="비밀번호"
          type="password"
          placeholder="비밀번호를 입력해주세요"
          error={errors.password?.message}
          {...register("password", {
            required: "비밀번호를 입력해주세요",
            minLength: {
              value: 8,
              message: "비밀번호는 8자 이상이어야 합니다",
            },
            pattern: {
              value: /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
              message: "비밀번호는 영어, 숫자, 특수문자를 포함해야 합니다",
            },
          })}
        />

        <Button size="lg" className="mt-8 w-full" type="submit">
          로그인
        </Button>

        <div className="mt-6 flex items-center justify-center gap-2">
          <p className="text-gray-600">같이달램이 처음이신가요?</p>
          <Link
            href="/sign-up"
            className="text-primary-600 hover:text-primary-700 underline"
          >
            회원가입
          </Link>
        </div>
      </form>
    </div>
  );
};
