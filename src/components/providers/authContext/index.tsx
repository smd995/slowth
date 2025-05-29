"use client";

import { signIn } from "@/effect/auth/sign-in";
import { LoginFormInput, User } from "@/entity/user";
import { AuthContextType } from "@/types/auth";
import { createContext, useContext, useState } from "react";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (data: LoginFormInput) => {
    setIsLoading(true);
    try {
      const response = await signIn(data);
      setUser(response.user);
      localStorage.setItem("token", response.token);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
