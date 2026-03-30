import Link from "next/link";
import { ArrowRight, AudioWaveform, ShieldCheck, Sparkles } from "lucide-react";

type AuthShellProps = {
  alternateHref: string;
  alternateLabel: string;
  alternateText: string;
  description: string;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
};

const highlights = [
  {
    icon: AudioWaveform,
    title: "Reliable speech workflows",
    description:
      "Modernize transcription access without changing your backend contract.",
  },
  {
    icon: ShieldCheck,
    title: "Stable auth foundation",
    description:
      "JWTs stay in first-party cookies so local development remains predictable.",
  },
  {
    icon: Sparkles,
    title: "Production-grade polish",
    description:
      "A premium light interface designed to feel credible from day one.",
  },
];

export function AuthShell({
  alternateHref,
  alternateLabel,
  alternateText,
  children,
  description,
  eyebrow,
  title,
}: AuthShellProps) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(14,165,233,0.16),_transparent_30%),linear-gradient(180deg,#f8fbff_0%,#eef4ff_45%,#f8fafc_100%)]">
      <div className="absolute inset-x-0 top-0 h-64 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.18),_transparent_55%)]" />
      <div className="absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 bg-slate-200/70 lg:block" />

      <div className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-8 lg:flex-row lg:px-10 lg:py-10">
        <section className="flex w-full flex-col justify-between rounded-[32px] border border-white/70 bg-white/60 p-8 shadow-[0_30px_80px_rgba(15,23,42,0.08)] backdrop-blur md:p-10 lg:w-[54%]">
          <div className="space-y-8">
            <div className="inline-flex w-fit items-center gap-3 rounded-full border border-sky-200 bg-white/80 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-950 text-white">
                <AudioWaveform className="h-4 w-4" />
              </span>
              MeetWise AI
            </div>

            <div className="space-y-5">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-700">
                {eyebrow}
              </p>
              <div className="space-y-4">
                <h1 className="max-w-xl text-4xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-5xl">
                  {title}
                </h1>
                <p className="max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
                  {description}
                </p>
              </div>
            </div>

            <div className="grid gap-4">
              {highlights.map(
                ({ description: itemDescription, icon: Icon, title: itemTitle }) => (
                  <div
                    key={itemTitle}
                    className="rounded-3xl border border-slate-200/80 bg-white/80 p-5 shadow-[0_18px_40px_rgba(15,23,42,0.06)]"
                  >
                    <div className="flex items-start gap-4">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-sky-100 text-sky-700">
                        <Icon className="h-5 w-5" />
                      </span>
                      <div className="space-y-1">
                        <h2 className="text-base font-semibold text-slate-900">
                          {itemTitle}
                        </h2>
                        <p className="text-sm leading-6 text-slate-600">
                          {itemDescription}
                        </p>
                      </div>
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-4 rounded-3xl border border-slate-200/80 bg-white/80 px-5 py-4 text-sm text-slate-600 shadow-[0_14px_34px_rgba(15,23,42,0.05)]">
            <span className="font-medium text-slate-900">{alternateText}</span>
            <Link
              className="inline-flex items-center gap-2 font-semibold text-sky-700 transition hover:text-sky-900"
              href={alternateHref}
            >
              {alternateLabel}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        <section className="flex w-full items-center justify-center py-10 lg:w-[46%] lg:py-0">
          <div className="w-full max-w-lg rounded-[32px] border border-slate-200/70 bg-white p-8 shadow-[0_28px_70px_rgba(15,23,42,0.1)] sm:p-10">
            {children}
          </div>
        </section>
      </div>
    </div>
  );
}
