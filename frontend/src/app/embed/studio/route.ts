import { NextResponse } from "next/server";

import { buildLegacyStudioHtml } from "@/lib/legacy-template";

export const dynamic = "force-dynamic";

export async function GET() {
  const html = await buildLegacyStudioHtml();

  return new NextResponse(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
