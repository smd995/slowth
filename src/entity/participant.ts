import { User } from "./user";

export interface Participant {
  teamId: number;
  userId: number;
  gatheringId: number;
  joinedAt: string;
  User: Pick<User, "id" | "email" | "name" | "companyName" | "image">;
}
