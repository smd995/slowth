import { LoginFormInput, User } from "@/entities/user";

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (data: LoginFormInput) => Promise<void>;
  logout: () => void;
}
