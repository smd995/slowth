import { SignUpFormInput } from "@/entity/user";
import client from "../client/client";

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
