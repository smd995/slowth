import { LoginFormInput, User } from "@/entity/user";

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (data: LoginFormInput) => Promise<void>;
  logout: () => void;
}
