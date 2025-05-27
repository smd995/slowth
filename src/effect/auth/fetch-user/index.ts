export const fetchUser = async () => {
  const response = await fetch(
    process.env.NEXT_PUBLIC_API_URL +
      `/${process.env.NEXT_PUBLIC_TEAM_ID}/auths/user`,
  );
  const data = await response.json();

  return data;
};
