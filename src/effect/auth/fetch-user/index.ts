const BASE_URL = "https://fe-adv-project-together-dallaem.vercel.app";

const teamId = "slotest";

export const fetchUser = async () => {
  const response = await fetch(BASE_URL + `/${teamId}/auths/user`);
  const data = await response.json();

  return data;
};
