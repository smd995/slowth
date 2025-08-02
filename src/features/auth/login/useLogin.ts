"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";
import { signIn } from "@/effect/auth";
import { LoginFormInput, useUserStore } from "@/entities/user";

export const useLogin = () => {
  const router = useRouter();
  const { setUser } = useUserStore();

  const form = useForm<LoginFormInput>({
    mode: "onChange",
    delayError: 1000,
  });

  const onSubmit = async (data: LoginFormInput) => {
    try {
      const response = await signIn(data);

      if (response.token) {
        toast.success("로그인 성공");

        const user = localStorage.getItem("user");
        if (user) {
          setUser(JSON.parse(user));
        }

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

  return {
    ...form,
    onSubmit: form.handleSubmit(onSubmit),
  };
};
