"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";

import { useAuth } from "@/components/providers/auth-provider";

export function LoginForm() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!email.trim() || !password) {
      setError("Please fill in both your email and password.");
      return;
    }

    setError("");
    setIsSubmitting(true);

    try {
      await login({
        email: email.trim(),
        password,
      });
      router.push("/dashboard");
      router.refresh();
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Unable to sign in right now.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-700">
          Sign In
        </p>
        <div className="space-y-2">
          <h2 className="text-3xl font-semibold tracking-[-0.03em] text-slate-950">
            Welcome back
          </h2>
          <p className="text-sm leading-6 text-slate-600">
            Access your transcription workspace, account settings, and session
            history from one clean control center.
          </p>
        </div>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <label
            className="text-sm font-medium text-slate-700"
            htmlFor="login-email"
          >
            Email
          </label>
          <input
            autoComplete="email"
            className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-100"
            id="login-email"
            name="email"
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            type="email"
            value={email}
          />
        </div>

        <div className="space-y-2">
          <label
            className="text-sm font-medium text-slate-700"
            htmlFor="login-password"
          >
            Password
          </label>
          <input
            autoComplete="current-password"
            className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-100"
            id="login-password"
            name="password"
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Enter your password"
            type="password"
            value={password}
          />
        </div>

        {error ? (
          <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {error}
          </div>
        ) : null}

        <button
          className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 px-4 text-sm font-semibold text-white shadow-[0_18px_35px_rgba(15,23,42,0.18)] transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
          disabled={isSubmitting}
          type="submit"
        >
          {isSubmitting ? (
            <>
              <LoaderCircle className="h-4 w-4 animate-spin" />
              Signing in...
            </>
          ) : (
            "Sign In"
          )}
        </button>
      </form>

      <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
        New to MeetWise AI?{" "}
        <Link className="font-semibold text-sky-700 hover:text-sky-900" href="/register">
          Create your account
        </Link>
      </div>
    </div>
  );
}
