const BASE_URL = "https://fe-adv-project-together-dallaem.vercel.app";

const teamId = "slotest";

export const signUp = async (data = {}) => {
  const response = await fetch(BASE_URL + `/${teamId}/auths/signup`, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
};
