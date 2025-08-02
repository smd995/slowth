"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";
import { signUp, SignUpFormInput } from "@/entities/user";

export const useSignUp = () => {
  const router = useRouter();

  const form = useForm<SignUpFormInput>({
    mode: "onChange",
    delayError: 1000,
  });

  const { watch } = form;
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

  return {
    ...form,
    password,
    onSubmit: form.handleSubmit(onSubmit),
  };
};
