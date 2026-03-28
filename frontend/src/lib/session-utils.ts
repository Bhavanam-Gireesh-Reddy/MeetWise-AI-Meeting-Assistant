import type { SessionRecord } from "@/lib/session-types";

export const LANGUAGE_LABELS: Record<string, string> = {
  "hi-IN": "Hindi",
  "en-IN": "English",
  "ta-IN": "Tamil",
  "te-IN": "Telugu",
  "kn-IN": "Kannada",
  "ml-IN": "Malayalam",
  "bn-IN": "Bengali",
  "mr-IN": "Marathi",
  "gu-IN": "Gujarati",
  "pa-IN": "Punjabi",
  "or-IN": "Odia",
};

export const FOLDER_COLORS = [
  "#0ea5e9",
  "#10b981",
  "#8b5cf6",
  "#f97316",
  "#ef4444",
];

export function getLanguageLabel(code?: string) {
  if (!code) {
    return "Unknown";
  }

  return LANGUAGE_LABELS[code] ?? code;
}

export function getModeLabel(mode?: string) {
  if (!mode) {
    return "Unknown";
  }

  return mode.charAt(0).toUpperCase() + mode.slice(1);
}

export function getSessionDateLabel(value?: string) {
  if (!value) {
    return "Unknown";
  }

  return new Date(value).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function getDurationMinutes(session: SessionRecord) {
  if (!session.started_at || !session.ended_at) {
    return 0;
  }

  const started = new Date(session.started_at).getTime();
  const ended = new Date(session.ended_at).getTime();

  if (!Number.isFinite(started) || !Number.isFinite(ended) || ended <= started) {
    return 0;
  }

  return (ended - started) / 60000;
}

export function getDurationLabel(session: SessionRecord) {
  const minutes = getDurationMinutes(session);

  if (!minutes) {
    return "—";
  }

  if (minutes < 1) {
    return `${Math.round(minutes * 60)} sec`;
  }

  const roundedMinutes = Math.floor(minutes);
  const seconds = Math.round((minutes - roundedMinutes) * 60);

  if (!seconds) {
    return `${roundedMinutes} min`;
  }

  return `${roundedMinutes} min ${seconds} sec`;
}

export function getTranscriptForType(
  session: SessionRecord,
  type: "raw" | "corrected" | "filtered",
) {
  if (type === "filtered") {
    return session.filtered_transcript || session.transcript || "";
  }

  if (type === "corrected") {
    return session.corrected_transcript || session.transcript || "";
  }

  return session.transcript || "";
}

export function getPrimaryTranscript(session: SessionRecord) {
  return (
    session.corrected_transcript ||
    session.filtered_transcript ||
    session.transcript ||
    ""
  );
}

export function downloadTextFile(filename: string, content: string) {
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}

export function buildDayBuckets(sessions: SessionRecord[], windowSize = 14) {
  const buckets = new Map<string, number>();

  for (let index = windowSize - 1; index >= 0; index -= 1) {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() - index);
    buckets.set(date.toISOString().slice(0, 10), 0);
  }

  sessions.forEach((session) => {
    const key = session.started_at?.slice(0, 10);

    if (key && buckets.has(key)) {
      buckets.set(key, (buckets.get(key) ?? 0) + 1);
    }
  });

  return Array.from(buckets.entries()).map(([date, count]) => ({
    date,
    label: date.slice(5),
    count,
  }));
}
