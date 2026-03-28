import { notFound } from "next/navigation";

import { buildBackendUrl } from "@/lib/backend";
import { SharedTranscriptView } from "@/components/share/shared-transcript-view";
import type { SessionRecord } from "@/lib/session-types";

export default async function SharedTranscriptPage({
  params,
}: {
  params: { token: string };
}) {
  const response = await fetch(
    buildBackendUrl(`/api/public/share/${params.token}`),
    {
      cache: "no-store",
    },
  );

  if (response.status === 404) {
    notFound();
  }

  if (!response.ok) {
    throw new Error("Unable to load shared transcript.");
  }

  const session = (await response.json()) as SessionRecord;

  return <SharedTranscriptView session={session} />;
}
