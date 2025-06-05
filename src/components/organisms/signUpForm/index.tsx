"use client";

import { Button } from "@/components/atom/button";
import { Input } from "@/components/atom/input";
import { signUp } from "@/effect/user";
import { SignUpFormInput } from "@/entity/user";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export const SignUpForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, isValid },
  } = useForm<SignUpFormInput>({
    mode: "onChange",
    delayError: 1000,
  });

  const password = watch("password");

  const onSubmit = async (data: SignUpFormInput) => {
    try {
      const response = await signUp(data);
      if (response.message) {

        toast.success("회원가입에 성공했습니다");

        router.push("/login");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message || "회원가입에 실패했습니다");
      } else {
        toast.error("회원가입에 실패했습니다");
      }
    }
  };

  return (
    <div className="mt-8 flex min-h-screen items-center justify-center">
      <form
        className="w-[343px] rounded-3xl bg-white px-4 py-8 sm:w-[608px] sm:px-16 sm:py-8 lg:w-[510px] lg:px-13 lg:py-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="mb-8 text-center text-2xl font-bold">회원가입</h2>

        <Input
          label="이름"
          type="text"
          placeholder="이름을 입력해주세요"
          autoComplete="name"
          error={errors.name?.message}
          {...register("name", {
            required: "이름을 입력해주세요",
            minLength: {
              value: 2,
              message: "이름은 2글자 이상이어야 합니다",
            },
          })}
        />

        <Input
          label="이메일"
          type="email"
          placeholder="이메일을 입력해주세요"
          autoComplete="email"
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
          label="회사명"
          type="text"
          placeholder="회사명을 입력해주세요"
          autoComplete="organization"
          error={errors.companyName?.message}
          {...register("companyName", {
            required: "회사명을 입력해주세요",
          })}
        />

        <Input
          label="비밀번호"
          type="password"
          placeholder="비밀번호를 입력해주세요"
          autoComplete="new-password"
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

        <Input
          label="비밀번호 확인"
          type="password"
          placeholder="비밀번호를 다시 한 번 입력해주세요"
          autoComplete="new-password"
          error={errors.passwordCheck?.message}
          {...register("passwordCheck", {
            required: "비밀번호 확인을 입력해주세요",
            validate: (value) =>
              value === password || "비밀번호가 일치하지 않습니다",
          })}
        />


        <Button
          size="md"
          className="mt-4 w-full"
          disabled={isSubmitting || !isValid}
        >
          {isSubmitting && (
            <svg
              className="mr-2 h-4 w-4 animate-spin text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          )}
          회원가입
        </Button>

        <div className="mt-6 flex items-center justify-center gap-2">
          <p className="text-gray-600">이미 회원이신가요?</p>
          <Link
            href="/login"
            className="text-primary-600 hover:text-primary-700 underline"
          >
            로그인
          </Link>
        </div>
      </form>
    </div>
  );
};
