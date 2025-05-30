import { SignUpFormInput } from "@/entity/user";

export const signUp = async (data: SignUpFormInput) => {
  const response = await fetch(
    process.env.NEXT_PUBLIC_API_URL +
      `/${process.env.NEXT_PUBLIC_TEAM_ID}/auths/signup`,
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
