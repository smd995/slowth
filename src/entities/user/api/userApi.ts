import { client } from "@/shared/api";
import { SignUpFormInput } from "../model/types";

export const signUp = async (data: SignUpFormInput) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { passwordCheck, ...signUpData } = data;
  const response = await client.post(`/auths/signup`, signUpData);
  return response.data;
};

export const fetchUser = async () => {
  const response = await client.get(`/auths/user`);
  const data = await response.data;

  return data;
};

export const updateUser = async (user: {
  image: FileList | null;
  companyName: string;
}) => {
  try {
    const formData = new FormData();

    if (user.image && user.image.length > 0) {
      formData.append("image", user.image[0]);
    }

    formData.append("companyName", user.companyName);

    const response = await client.put(`/auths/user`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("유저 수정 중 오류:", error);
    throw error;
  }
};
