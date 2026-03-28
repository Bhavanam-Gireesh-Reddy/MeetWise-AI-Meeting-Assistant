import { EmbeddedWorkspace } from "@/components/app/embedded-workspace";

export default function StudioWorkspacePage() {
  return (
    <EmbeddedWorkspace
      description="The AI study studio now runs inside the new frontend shell with the existing flashcards, quiz, chat, mind map, rich notes, and YouTube workflows preserved."
      eyebrow="Studio"
      src="/embed/studio"
      title="AI study studio"
    />
  );
}
