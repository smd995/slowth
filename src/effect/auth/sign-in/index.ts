import { LoginFormInput } from "@/entity/user";

export const signIn = async (data: LoginFormInput) => {
  const response = await fetch(
    process.env.NEXT_PUBLIC_API_URL +
      `/${process.env.NEXT_PUBLIC_TEAM_ID}/auths/signin`,
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
