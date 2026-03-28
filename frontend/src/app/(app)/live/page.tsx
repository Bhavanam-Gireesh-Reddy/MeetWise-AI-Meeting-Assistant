import { EmbeddedWorkspace } from "@/components/app/embedded-workspace";

export default function LiveWorkspacePage() {
  return (
    <EmbeddedWorkspace
      description="The live transcription engine is now reachable from the Next.js app shell while preserving the existing microphone, upload, streaming, and AI post-processing behavior."
      eyebrow="Live"
      src="/embed/live"
      title="Live transcription workspace"
    />
  );
}
