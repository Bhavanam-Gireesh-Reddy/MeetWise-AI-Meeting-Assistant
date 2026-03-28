export type AuthUser = {
  user_id: string;
  email: string;
  name: string;
  is_admin: boolean;
};

export type AuthStatus = "loading" | "authenticated" | "unauthenticated";

export type LoginInput = {
  email: string;
  password: string;
};

export type RegisterInput = {
  name: string;
  email: string;
  password: string;
};
