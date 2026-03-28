import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { AUTH_COOKIE_NAME } from "@/lib/backend";
import { buildLegacyLiveHtml } from "@/lib/legacy-template";

export const dynamic = "force-dynamic";

export async function GET() {
  const token = cookies().get(AUTH_COOKIE_NAME)?.value ?? "";
  const html = await buildLegacyLiveHtml(token);

  return new NextResponse(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
