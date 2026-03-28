import { NextRequest, NextResponse } from "next/server";

import {
  AUTH_COOKIE_NAME,
  backendFetch,
  getAuthCookieOptions,
} from "@/lib/backend";

export async function POST(request: NextRequest) {
  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;

  if (token) {
    try {
      await backendFetch("/api/auth/logout", {
        method: "POST",
        token,
      });
    } catch {
      // Ignore backend logout failures and still clear the frontend session.
    }
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(AUTH_COOKIE_NAME, "", {
    ...getAuthCookieOptions(),
    maxAge: 0,
  });
  return response;
}
