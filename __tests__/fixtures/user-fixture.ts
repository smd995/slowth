import { User } from "@/entity/user";

export const TEAM_ID_MAP: Record<string, number> = {
  slotest: 0,
  teamalpha: 1,
  teambravo: 2,
};

export const userFixtures: User[] = [
  {
    teamId: 0,
    id: 0,
    email: "Sporer@gmail.com",
    name: "Jocelyn",
    companyName: "Prosacco, Botsford and Gutmann",
    image: "/vercel.svg",
    createdAt: new Date("2025-05-09T10:30:26.828Z"),
    updatedAt: new Date("2024-06-10T17:51:45.251Z"),
  },
];
