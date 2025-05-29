// header에 Authorization 헤더를 추가하여 토큰을 포함하여 요청
export const fetchUser = async () => {
  const response = await fetch(
    process.env.NEXT_PUBLIC_API_URL +
      `/${process.env.NEXT_PUBLIC_TEAM_ID}/auths/user`,
  );
  const data = await response.json();

  return data;
};
