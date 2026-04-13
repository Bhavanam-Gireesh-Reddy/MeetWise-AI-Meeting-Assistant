import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Brain,
  FileText,
  Globe2,
  Headphones,
  LayoutDashboard,
  MessageSquare,
  Mic2,
  Network,
  Play,
  ScrollText,
  Sparkles,
  Users,
  Video,
  Wand2,
  Zap,
} from "lucide-react";

type LandingPageProps = {
  isLoggedIn: boolean;
};

const FEATURE_PILLS = [
  "Live Transcription",
  "11 Languages",
  "AI Studio",
  "Flashcards",
  "Mind Maps",
  "YouTube Import",
  "OCR Notes",
  "Sentiment Analysis",
  "Speaker Detection",
  "Podcast Scripts",
  "Transcript Chat",
  "Session History",
];

const CARDS = [
  {
    icon: Mic2,
    label: "Live",
    title: "Sub-150ms latency",
    description: "Stream 16kHz PCM audio over WebSocket. See words appear as you speak — no buffering, no delay.",
    gradient: "from-sky-500/20 to-cyan-500/5",
    iconColor: "text-sky-400",
    iconBg: "bg-sky-500/10",
    border: "border-sky-500/20",
  },
  {
    icon: Globe2,
    label: "Languages",
    title: "11 Indian languages",
    description: "Hindi, Tamil, Telugu, Kannada, Malayalam, Marathi, Bengali, Gujarati, Odia, Punjabi & more.",
    gradient: "from-emerald-500/20 to-teal-500/5",
    iconColor: "text-emerald-400",
    iconBg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
  },
  {
    icon: Brain,
    label: "AI",
    title: "Studio AI tools",
    description: "Flashcards, quizzes, mind maps, podcast scripts, and rich study notes — all from one session.",
    gradient: "from-violet-500/20 to-purple-500/5",
    iconColor: "text-violet-400",
    iconBg: "bg-violet-500/10",
    border: "border-violet-500/20",
  },
  {
    icon: MessageSquare,
    label: "Chat",
    title: "Chat with transcripts",
    description: "Ask anything about your session. Grounded answers from Groq LLM — no hallucinations.",
    gradient: "from-rose-500/20 to-pink-500/5",
    iconColor: "text-rose-400",
    iconBg: "bg-rose-500/10",
    border: "border-rose-500/20",
  },
];

const STUDIO_TOOLS = [
  { icon: Brain, label: "Flashcards", color: "text-violet-400", bg: "bg-violet-500/10" },
  { icon: ScrollText, label: "Study Notes", color: "text-sky-400", bg: "bg-sky-500/10" },
  { icon: Network, label: "Mind Maps", color: "text-emerald-400", bg: "bg-emerald-500/10" },
  { icon: MessageSquare, label: "Transcript Chat", color: "text-rose-400", bg: "bg-rose-500/10" },
  { icon: Headphones, label: "Podcast Script", color: "text-amber-400", bg: "bg-amber-500/10" },
  { icon: FileText, label: "Quiz Deck", color: "text-cyan-400", bg: "bg-cyan-500/10" },
  { icon: Video, label: "YouTube Import", color: "text-pink-400", bg: "bg-pink-500/10" },
  { icon: Wand2, label: "OCR Notes", color: "text-teal-400", bg: "bg-teal-500/10" },
];

const HOW_STEPS = [
  {
    number: "01",
    title: "Open Live workspace",
    body: "Select your language, pick a mode — translate, transcribe, codemix, or verbatim — then hit Start.",
    icon: Mic2,
  },
  {
    number: "02",
    title: "Speak naturally",
    body: "Your words appear in under 150ms. VAD detects silence, waveform pulses in real time.",
    icon: Zap,
  },
  {
    number: "03",
    title: "Get AI insights",
    body: "Session ends → Groq generates a title, summary, keywords, and full study notes automatically.",
    icon: Sparkles,
  },
  {
    number: "04",
    title: "Explore in Studio",
    body: "Turn any saved session into flashcards, mind maps, quizzes, podcast scripts, or chat with it.",
    icon: BookOpen,
  },
];

export function LandingPage({ isLoggedIn }: LandingPageProps) {
  return (
    <div
      className="min-h-screen overflow-x-hidden"
      style={{ background: "#07070f", color: "#fff", fontFamily: "var(--font-geist-sans), sans-serif" }}
    >
      {/* ── Navbar ──────────────────────────────────────────── */}
      <header
        className="sticky top-0 z-50 flex items-center justify-between px-5 py-4 sm:px-8 md:px-12 lg:px-16"
        style={{
          background: "rgba(7,7,15,0.75)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <span
            className="flex h-8 w-8 items-center justify-center rounded-xl"
            style={{ background: "linear-gradient(135deg,#7c3aed,#0ea5e9)" }}
          >
            <Sparkles className="h-4 w-4 text-white" />
          </span>
          <span className="text-sm font-bold tracking-tight text-white">MeetWise AI</span>
        </div>

        {/* Nav links */}
        <nav className="hidden items-center gap-1 md:flex">
          {[
            { label: "Features", href: "#features" },
            { label: "Studio", href: "#studio" },
            { label: "How it works", href: "#how" },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="rounded-lg px-4 py-2 text-sm transition"
              style={{ color: "rgba(255,255,255,0.55)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.55)")}
            >
              {label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        {isLoggedIn ? (
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition"
            style={{ background: "linear-gradient(135deg,#7c3aed,#0ea5e9)", color: "#fff" }}
          >
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </Link>
        ) : (
          <div className="flex items-center gap-2">
            <Link
              href="/login"
              className="hidden rounded-xl px-4 py-2 text-sm transition sm:block"
              style={{ color: "rgba(255,255,255,0.55)" }}
            >
              Sign in
            </Link>
            <Link
              href="/register"
              className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold"
              style={{ background: "linear-gradient(135deg,#7c3aed,#0ea5e9)", color: "#fff" }}
            >
              Get started
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        )}
      </header>

      {/* ── Hero ────────────────────────────────────────────── */}
      <section className="relative flex min-h-[92vh] flex-col items-center justify-center overflow-hidden px-4 pb-20 pt-16 text-center">
        {/* Ambient glow blobs */}
        <div
          className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2"
          style={{
            width: "900px",
            height: "600px",
            background:
              "radial-gradient(ellipse 60% 55% at 50% 0%, rgba(124,58,237,0.28) 0%, transparent 70%)",
          }}
        />
        <div
          className="pointer-events-none absolute left-1/4 top-1/3"
          style={{
            width: "400px",
            height: "400px",
            background: "radial-gradient(circle, rgba(14,165,233,0.12) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
        <div
          className="pointer-events-none absolute right-1/4 top-1/4"
          style={{
            width: "350px",
            height: "350px",
            background: "radial-gradient(circle, rgba(168,85,247,0.1) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />

        {/* Dot grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* Badge */}
        <div
          className="relative mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest"
          style={{
            background: "rgba(124,58,237,0.12)",
            border: "1px solid rgba(124,58,237,0.3)",
            color: "#a78bfa",
          }}
        >
          <Zap className="h-3 w-3" />
          Powered by Sarvam AI · Groq LLM
        </div>

        {/* Headline */}
        <h1 className="relative mx-auto max-w-4xl text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          <span style={{ color: "#fff" }}>Transcribe. Translate.</span>
          <br />
          <span
            style={{
              background: "linear-gradient(90deg, #a78bfa 0%, #38bdf8 50%, #a78bfa 100%)",
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              animation: "gradientShift 4s linear infinite",
            }}
          >
            Understand.
          </span>
        </h1>

        <p
          className="relative mx-auto mt-6 max-w-xl text-base leading-relaxed sm:text-lg"
          style={{ color: "rgba(255,255,255,0.5)" }}
        >
          Real-time AI meeting assistant for every Indian voice. Sub-150ms
          speech-to-text, 11 languages, and a full AI Studio to turn sessions
          into study gold.
        </p>

        {/* CTAs */}
        <div className="relative mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link
            href={isLoggedIn ? "/live" : "/register"}
            className="inline-flex items-center gap-2.5 rounded-2xl px-7 py-3.5 text-sm font-bold transition hover:opacity-90"
            style={{
              background: "linear-gradient(135deg,#7c3aed,#0ea5e9)",
              color: "#fff",
              boxShadow: "0 0 40px rgba(124,58,237,0.4)",
            }}
          >
            <Play className="h-4 w-4" />
            {isLoggedIn ? "Start transcribing" : "Start for free"}
          </Link>
          <Link
            href={isLoggedIn ? "/studio" : "/login"}
            className="inline-flex items-center gap-2.5 rounded-2xl px-7 py-3.5 text-sm font-semibold transition"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.12)",
              color: "rgba(255,255,255,0.8)",
            }}
          >
            <Sparkles className="h-4 w-4" />
            Explore AI Studio
          </Link>
        </div>

        {/* Glowing orb + waveform */}
        <div className="relative mt-20 flex flex-col items-center">
          {/* Orb */}
          <div className="relative flex items-center justify-center">
            {/* Outer glow ring */}
            <div
              className="absolute rounded-full"
              style={{
                width: "280px",
                height: "280px",
                background:
                  "radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)",
                animation: "pulse 3s ease-in-out infinite",
              }}
            />
            {/* Middle ring */}
            <div
              className="absolute rounded-full"
              style={{
                width: "200px",
                height: "200px",
                border: "1px solid rgba(124,58,237,0.2)",
                animation: "spin 12s linear infinite",
              }}
            />
            <div
              className="absolute rounded-full"
              style={{
                width: "150px",
                height: "150px",
                border: "1px solid rgba(14,165,233,0.15)",
                animation: "spin 8s linear infinite reverse",
              }}
            />
            {/* Core orb */}
            <div
              className="relative flex h-24 w-24 items-center justify-center rounded-full"
              style={{
                background:
                  "radial-gradient(circle at 35% 35%, rgba(167,139,250,0.9), rgba(124,58,237,0.6) 50%, rgba(7,7,15,0.8))",
                boxShadow:
                  "0 0 60px rgba(124,58,237,0.5), 0 0 120px rgba(124,58,237,0.2), inset 0 1px 1px rgba(255,255,255,0.3)",
              }}
            >
              <Mic2 className="h-10 w-10 text-white" style={{ filter: "drop-shadow(0 0 8px rgba(255,255,255,0.6))" }} />
            </div>

            {/* Bokeh dots */}
            {[
              { size: 8, top: "10%", left: "15%", color: "#38bdf8", delay: "0s" },
              { size: 6, top: "20%", right: "18%", color: "#a78bfa", delay: "0.5s" },
              { size: 5, bottom: "22%", left: "10%", color: "#34d399", delay: "1s" },
              { size: 7, bottom: "15%", right: "14%", color: "#f472b6", delay: "1.5s" },
              { size: 4, top: "50%", left: "3%", color: "#fbbf24", delay: "0.8s" },
              { size: 5, top: "45%", right: "3%", color: "#38bdf8", delay: "0.3s" },
            ].map((dot, i) => (
              <div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: `${dot.size}px`,
                  height: `${dot.size}px`,
                  background: dot.color,
                  top: dot.top,
                  left: (dot as { left?: string }).left,
                  right: (dot as { right?: string }).right,
                  bottom: (dot as { bottom?: string }).bottom,
                  boxShadow: `0 0 ${dot.size * 3}px ${dot.color}`,
                  animation: `float ${2 + i * 0.4}s ease-in-out infinite alternate`,
                  animationDelay: dot.delay,
                }}
              />
            ))}
          </div>

          {/* Waveform bars below orb */}
          <div className="mt-8 flex items-end justify-center gap-1">
            {[30,45,65,50,80,60,90,70,55,85,40,75,95,60,45,70,55,85,40,65,80,50,70,45,60].map(
              (h, i) => (
                <div
                  key={i}
                  className="w-1.5 rounded-full"
                  style={{
                    height: `${h * 0.5}px`,
                    background: `linear-gradient(to top, #7c3aed, #38bdf8)`,
                    opacity: 0.5 + (h / 95) * 0.5,
                    animation: `waveform ${0.7 + (i % 6) * 0.1}s ease-in-out infinite alternate`,
                    animationDelay: `${i * 0.06}s`,
                  }}
                />
              ),
            )}
          </div>
          <p className="mt-3 text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>
            16kHz PCM · Voice Activity Detection · Real-time stream
          </p>
        </div>
      </section>

      {/* ── Feature pills marquee ────────────────────────────── */}
      <section
        className="overflow-hidden py-10"
        style={{ borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}
      >
        <div
          className="flex gap-3"
          style={{ animation: "marquee 25s linear infinite", width: "max-content" }}
        >
          {[...FEATURE_PILLS, ...FEATURE_PILLS].map((pill, i) => (
            <span
              key={i}
              className="inline-flex shrink-0 items-center gap-2 rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-widest"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "rgba(255,255,255,0.45)",
              }}
            >
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: i % 3 === 0 ? "#a78bfa" : i % 3 === 1 ? "#38bdf8" : "#34d399" }}
              />
              {pill}
            </span>
          ))}
        </div>
      </section>

      {/* ── Feature cards ───────────────────────────────────── */}
      <section id="features" className="px-4 py-24 sm:px-8 md:px-12 lg:px-16">
        <div className="mx-auto max-w-6xl">
          {/* Section label */}
          <div className="mb-4 flex items-center gap-3">
            <span
              className="h-px flex-1"
              style={{ background: "linear-gradient(to right, transparent, rgba(255,255,255,0.1))" }}
            />
            <span
              className="text-xs font-bold uppercase tracking-[0.25em]"
              style={{ color: "rgba(255,255,255,0.3)" }}
            >
              Core capabilities
            </span>
            <span
              className="h-px flex-1"
              style={{ background: "linear-gradient(to left, transparent, rgba(255,255,255,0.1))" }}
            />
          </div>
          <h2 className="mb-16 text-center text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Everything in one place
          </h2>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {CARDS.map(({ icon: Icon, label, title, description, gradient, iconColor, iconBg, border }) => (
              <div
                key={title}
                className="group relative overflow-hidden rounded-2xl p-6 transition-transform duration-300 hover:-translate-y-1"
                style={{
                  background: `linear-gradient(145deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))`,
                  border: `1px solid rgba(255,255,255,0.07)`,
                }}
              >
                {/* inner glow */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{ background: `radial-gradient(ellipse at 50% 0%, ${gradient.includes("sky") ? "rgba(14,165,233,0.08)" : gradient.includes("emerald") ? "rgba(52,211,153,0.08)" : gradient.includes("violet") ? "rgba(124,58,237,0.1)" : "rgba(244,63,94,0.08)"} 0%, transparent 70%)` }}
                />
                <span
                  className={`mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl ${iconBg} ${iconColor}`}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <p
                  className="mb-1 text-[10px] font-bold uppercase tracking-[0.2em]"
                  style={{ color: "rgba(255,255,255,0.25)" }}
                >
                  {label}
                </p>
                <h3 className="mb-2 text-base font-semibold text-white">{title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
                  {description}
                </p>
              </div>
            ))}
          </div>

          {/* Big stat row */}
          <div
            className="mt-6 grid grid-cols-2 overflow-hidden rounded-2xl lg:grid-cols-4"
            style={{ border: "1px solid rgba(255,255,255,0.07)" }}
          >
            {[
              { val: "<150ms", label: "Transcription latency" },
              { val: "11", label: "Indian languages" },
              { val: "4", label: "Transcription modes" },
              { val: "8+", label: "AI Studio tools" },
            ].map(({ val, label }, i) => (
              <div
                key={label}
                className="px-8 py-8 text-center"
                style={{
                  borderRight: i < 3 ? "1px solid rgba(255,255,255,0.07)" : undefined,
                  borderBottom: i < 2 ? "1px solid rgba(255,255,255,0.07)" : undefined,
                  background: "rgba(255,255,255,0.015)",
                }}
              >
                <p
                  className="text-3xl font-bold tracking-tight"
                  style={{
                    background: "linear-gradient(90deg,#a78bfa,#38bdf8)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {val}
                </p>
                <p className="mt-1 text-xs uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.3)" }}>
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AI Studio section ────────────────────────────────── */}
      <section id="studio" className="px-4 py-24 sm:px-8 md:px-12 lg:px-16">
        <div className="mx-auto max-w-6xl">
          <div
            className="relative overflow-hidden rounded-3xl p-8 sm:p-12 lg:p-16"
            style={{
              background: "linear-gradient(145deg, rgba(124,58,237,0.12), rgba(14,165,233,0.06))",
              border: "1px solid rgba(124,58,237,0.2)",
            }}
          >
            {/* Background glow */}
            <div
              className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full"
              style={{
                background: "radial-gradient(circle, rgba(124,58,237,0.2) 0%, transparent 70%)",
                filter: "blur(40px)",
              }}
            />
            <div
              className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full"
              style={{
                background: "radial-gradient(circle, rgba(14,165,233,0.15) 0%, transparent 70%)",
                filter: "blur(40px)",
              }}
            />

            <div className="relative grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
              {/* Left text */}
              <div>
                <div
                  className="mb-5 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest"
                  style={{
                    background: "rgba(124,58,237,0.15)",
                    border: "1px solid rgba(124,58,237,0.3)",
                    color: "#a78bfa",
                  }}
                >
                  <Sparkles className="h-3 w-3" />
                  AI Studio
                </div>
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                  One session.
                  <br />
                  <span
                    style={{
                      background: "linear-gradient(90deg,#a78bfa,#38bdf8)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    Infinite outputs.
                  </span>
                </h2>
                <p className="mt-4 text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
                  Every saved transcript becomes a launchpad. AI Studio turns
                  what was said into flashcards, mind maps, quizzes, podcast
                  scripts, and rich study notes — all grounded in your actual
                  content.
                </p>
                <Link
                  href={isLoggedIn ? "/studio" : "/register"}
                  className="mt-8 inline-flex items-center gap-2 rounded-2xl px-6 py-3 text-sm font-bold transition hover:opacity-90"
                  style={{
                    background: "linear-gradient(135deg,#7c3aed,#0ea5e9)",
                    color: "#fff",
                    boxShadow: "0 0 30px rgba(124,58,237,0.35)",
                  }}
                >
                  {isLoggedIn ? "Open Studio" : "Try AI Studio"}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              {/* Right tool grid */}
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
                {STUDIO_TOOLS.map(({ icon: Icon, label, color, bg }) => (
                  <div
                    key={label}
                    className="group flex flex-col items-center gap-3 rounded-2xl p-4 text-center transition hover:-translate-y-0.5"
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.07)",
                    }}
                  >
                    <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${bg} ${color}`}>
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.6)" }}>
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── How it works ─────────────────────────────────────── */}
      <section id="how" className="px-4 py-24 sm:px-8 md:px-12 lg:px-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-4 flex items-center gap-3">
            <span className="h-px flex-1" style={{ background: "linear-gradient(to right, transparent, rgba(255,255,255,0.1))" }} />
            <span className="text-xs font-bold uppercase tracking-[0.25em]" style={{ color: "rgba(255,255,255,0.3)" }}>
              How it works
            </span>
            <span className="h-px flex-1" style={{ background: "linear-gradient(to left, transparent, rgba(255,255,255,0.1))" }} />
          </div>
          <h2 className="mb-16 text-center text-3xl font-bold tracking-tight sm:text-4xl">
            From voice to insight in minutes
          </h2>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {HOW_STEPS.map(({ number, title, body, icon: Icon }, i) => (
              <div key={number} className="relative">
                {/* Connector */}
                {i < HOW_STEPS.length - 1 && (
                  <div
                    className="absolute right-0 top-8 hidden h-px w-1/2 translate-x-full lg:block"
                    style={{ background: "linear-gradient(to right, rgba(124,58,237,0.4), rgba(14,165,233,0.2))" }}
                  />
                )}
                <div
                  className="h-full rounded-2xl p-6"
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <div className="mb-5 flex items-center gap-3">
                    <span
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-xs font-bold"
                      style={{
                        background: "linear-gradient(135deg,rgba(124,58,237,0.3),rgba(14,165,233,0.3))",
                        border: "1px solid rgba(124,58,237,0.3)",
                        color: "#a78bfa",
                      }}
                    >
                      {number}
                    </span>
                    <span
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
                      style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.5)" }}
                    >
                      <Icon className="h-4 w-4" />
                    </span>
                  </div>
                  <h3 className="mb-2 text-base font-semibold text-white">{title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.4)" }}>
                    {body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Modes showcase ───────────────────────────────────── */}
      <section className="px-4 py-24 sm:px-8 md:px-12 lg:px-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-3 text-center text-3xl font-bold tracking-tight sm:text-4xl">
            Four ways to capture speech
          </h2>
          <p className="mb-12 text-center text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
            Pick the output format that fits your workflow
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { mode: "Translate", desc: "Any Indian language → clean English output", color: "#38bdf8" },
              { mode: "Transcribe", desc: "Exact original language, as spoken", color: "#a78bfa" },
              { mode: "Codemix", desc: "Natural Hinglish / mixed-language speech", color: "#34d399" },
              { mode: "Verbatim", desc: "Every word including fillers — uh, um, hmm", color: "#f472b6" },
            ].map(({ mode, desc, color }) => (
              <div
                key={mode}
                className="group rounded-2xl p-6 transition hover:-translate-y-0.5"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <div
                  className="mb-4 h-1 w-10 rounded-full"
                  style={{ background: color, boxShadow: `0 0 12px ${color}` }}
                />
                <h3 className="mb-2 text-lg font-bold text-white">{mode}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.4)" }}>
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="px-4 py-24 sm:px-8 md:px-12 lg:px-16">
        <div className="relative mx-auto max-w-3xl overflow-hidden rounded-3xl px-8 py-20 text-center">
          {/* Glow */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background: "radial-gradient(ellipse at 50% 0%, rgba(124,58,237,0.25) 0%, transparent 65%)",
            }}
          />
          <div
            className="pointer-events-none absolute inset-0 rounded-3xl"
            style={{ border: "1px solid rgba(124,58,237,0.2)" }}
          />

          <div className="relative">
            <div
              className="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest"
              style={{
                background: "rgba(124,58,237,0.12)",
                border: "1px solid rgba(124,58,237,0.25)",
                color: "#a78bfa",
              }}
            >
              <Users className="h-3 w-3" />
              Start today
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Every word captured.
              <br />
              Every insight unlocked.
            </h2>
            <p className="mx-auto mt-5 max-w-md text-base" style={{ color: "rgba(255,255,255,0.45)" }}>
              No downloads. Works in your browser. Free to start. Start
              transcribing in under 30 seconds.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              {isLoggedIn ? (
                <Link
                  href="/live"
                  className="inline-flex items-center gap-2.5 rounded-2xl px-8 py-4 text-sm font-bold transition hover:opacity-90"
                  style={{
                    background: "linear-gradient(135deg,#7c3aed,#0ea5e9)",
                    color: "#fff",
                    boxShadow: "0 0 40px rgba(124,58,237,0.4)",
                  }}
                >
                  <Play className="h-4 w-4" />
                  Start a session
                </Link>
              ) : (
                <>
                  <Link
                    href="/register"
                    className="inline-flex items-center gap-2.5 rounded-2xl px-8 py-4 text-sm font-bold transition hover:opacity-90"
                    style={{
                      background: "linear-gradient(135deg,#7c3aed,#0ea5e9)",
                      color: "#fff",
                      boxShadow: "0 0 40px rgba(124,58,237,0.4)",
                    }}
                  >
                    Create free account
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/login"
                    className="inline-flex items-center gap-2.5 rounded-2xl px-8 py-4 text-sm font-semibold"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      color: "rgba(255,255,255,0.7)",
                    }}
                  >
                    Sign in
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────── */}
      <footer
        className="px-4 py-10 sm:px-8 md:px-12 lg:px-16"
        style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
      >
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 sm:flex-row">
          <div className="flex items-center gap-2.5">
            <span
              className="flex h-7 w-7 items-center justify-center rounded-lg"
              style={{ background: "linear-gradient(135deg,#7c3aed,#0ea5e9)" }}
            >
              <Sparkles className="h-3.5 w-3.5 text-white" />
            </span>
            <span className="text-sm font-bold text-white">MeetWise AI</span>
          </div>
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.2)" }}>
            Sarvam AI · Groq LLM · MongoDB · FastAPI · Next.js
          </p>
          <div className="flex gap-5 text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
            <Link href="/login" className="transition hover:text-white">Sign in</Link>
            <Link href="/register" className="transition hover:text-white">Register</Link>
          </div>
        </div>
      </footer>

      {/* ── Global keyframes ─────────────────────────────────── */}
      <style>{`
        @keyframes gradientShift {
          0%   { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
        @keyframes waveform {
          from { transform: scaleY(0.35); }
          to   { transform: scaleY(1); }
        }
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50%       { transform: scale(1.12); opacity: 1; }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes float {
          from { transform: translateY(0px); }
          to   { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
}
