import { TEAM_ID } from "@/constant/test";
import { LoginFormInput } from "@/entity/user";

export const login = async (data: LoginFormInput) => {
  const response = await fetch(
    process.env.NEXT_PUBLIC_API_URL + `/${TEAM_ID}/auths/signin`,
    {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    },
  );
  return response.json();
};
