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

export async function POST(request: NextRequest) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON payload." }, { status: 400 });
  }

  try {
    const response = await backendFetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await readPayload(response);
    const nextResponse = NextResponse.json(data, { status: response.status });

    if (response.ok && typeof data.token === "string" && data.token) {
      nextResponse.cookies.set(
        AUTH_COOKIE_NAME,
        data.token,
        getAuthCookieOptions(),
      );
    }

    return nextResponse;
  } catch {
    return NextResponse.json(
      { error: "Unable to reach the backend auth service." },
      { status: 502 },
    );
  }
}
