import { TEAM_ID } from "@/constant/test";

export const fetchUser = async () => {
  const response = await fetch(
    process.env.NEXT_PUBLIC_API_URL + `/${TEAM_ID}/auths/user`,
  );
  const data = await response.json();

  return data;
};
