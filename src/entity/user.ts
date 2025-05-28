export interface User {
  teamId: number;
  id: number;
  email: string;
  name: string;
  companyName: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface SignUpFormInput
  extends Pick<User, "name" | "email" | "companyName"> {
  password: string;
  passwordCheck: string;
}

export interface LoginFormInput extends Pick<User, "email"> {
  password: string;
}
