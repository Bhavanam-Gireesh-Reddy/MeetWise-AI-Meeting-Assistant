import { NextRequest, NextResponse } from "next/server";

import {
  AUTH_COOKIE_NAME,
  backendFetch,
  getAuthCookieOptions,
} from "@/lib/backend";

async function readPayload(response: Response) {
  try {
    return (await response.json()) as Record<string, unknown>;
  } catch {
    return {
      error: "Unexpected response from the backend auth service.",
    };
  }
}

export async function GET(request: NextRequest) {
  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const response = await backendFetch("/api/auth/me", { token });
    const data = await readPayload(response);
    const nextResponse = NextResponse.json(data, { status: response.status });

    if (response.status === 401 || response.status === 404) {
      nextResponse.cookies.set(AUTH_COOKIE_NAME, "", {
        ...getAuthCookieOptions(),
        maxAge: 0,
      });
    }

    return nextResponse;
  } catch {
    return NextResponse.json(
      { error: "Unable to verify your session." },
      { status: 502 },
    );
  }
}
