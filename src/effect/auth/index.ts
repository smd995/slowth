import { LoginFormInput } from "@/entity/user";
import { client } from "@/shared/api";
import { fetchUser } from "../user";

export const signIn = async (data: LoginFormInput) => {
  const response = await client.post(`/auths/signin`, data);
  localStorage.setItem("token", response.data.token);

  const responseUser = await fetchUser();
  localStorage.setItem("user", JSON.stringify(responseUser));
  return response.data;
};
