"use client";

import { Copy, Printer } from "lucide-react";
import { useState } from "react";

import type { SessionRecord } from "@/lib/session-types";
import {
  getLanguageLabel,
  getModeLabel,
  getSessionDateLabel,
} from "@/lib/session-utils";

export function SharedTranscriptView({
  session,
}: {
  session: SessionRecord;
}) {
  const [copied, setCopied] = useState(false);
  const transcript =
    session.corrected_transcript || session.transcript || "";

  async function handleCopy() {
    await navigator.clipboard.writeText(transcript);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f8fbff_0%,#eef4ff_100%)] px-6 py-10">
      <div className="mx-auto max-w-4xl">
        <div className="rounded-full border border-sky-200 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-sky-700 shadow-sm">
          Shared transcript
        </div>

        <section className="mt-6 rounded-[32px] border border-white/70 bg-white/90 p-8 shadow-[0_30px_70px_rgba(15,23,42,0.08)] backdrop-blur sm:p-10">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
            <div className="space-y-3">
              <h1 className="text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl">
                {session.title || "Shared transcript"}
              </h1>
              <div className="flex flex-wrap gap-2 text-xs text-slate-500">
                <span className="rounded-full bg-slate-100 px-3 py-1">
                  {getSessionDateLabel(session.started_at)}
                </span>
                <span className="rounded-full bg-slate-100 px-3 py-1">
                  {getLanguageLabel(session.language)}
                </span>
                <span className="rounded-full bg-slate-100 px-3 py-1">
                  {getModeLabel(session.mode)}
                </span>
                <span className="rounded-full bg-slate-100 px-3 py-1">
                  {(session.word_count || 0).toLocaleString()} words
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                className="inline-flex h-11 items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
                onClick={() => void handleCopy()}
                type="button"
              >
                <Copy className="h-4 w-4" />
                {copied ? "Copied" : "Copy"}
              </button>
              <button
                className="inline-flex h-11 items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
                onClick={() => window.print()}
                type="button"
              >
                <Printer className="h-4 w-4" />
                Print / PDF
              </button>
            </div>
          </div>

          {session.summary ? (
            <div className="mt-8 rounded-3xl border border-violet-200 bg-violet-50 p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-700">
                Summary
              </p>
              <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-slate-700">
                {session.summary}
              </p>
            </div>
          ) : null}

          {session.notes ? (
            <div className="mt-4 rounded-3xl border border-sky-200 bg-sky-50 p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">
                Notes
              </p>
              <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-slate-700">
                {session.notes}
              </p>
            </div>
          ) : null}

          <div className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              Transcript
            </p>
            <p className="mt-4 whitespace-pre-wrap text-sm leading-8 text-slate-700">
              {transcript || "No transcript available."}
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
