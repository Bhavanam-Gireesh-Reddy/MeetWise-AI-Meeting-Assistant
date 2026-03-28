import "server-only";

import { cookies } from "next/headers";

import type { AuthUser } from "@/lib/auth-types";
import { AUTH_COOKIE_NAME, backendFetch } from "@/lib/backend";

export async function getServerAuthUser(): Promise<AuthUser | null> {
  const token = cookies().get(AUTH_COOKIE_NAME)?.value;

  if (!token) {
    return null;
  }

  try {
    const response = await backendFetch("/api/auth/me", { token });

    if (!response.ok) {
      return null;
    }

    return (await response.json()) as AuthUser;
  } catch {
    return null;
  }
}
