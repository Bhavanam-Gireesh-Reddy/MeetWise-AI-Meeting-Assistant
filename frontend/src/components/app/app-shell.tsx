import { ShieldCheck, Sparkles, UserRound } from "lucide-react";

import { NavigationLinks } from "@/components/app/navigation-links";
import { LogoutButton } from "@/components/app/logout-button";
import type { AuthUser } from "@/lib/auth-types";

type AppShellProps = {
  user: AuthUser;
  children: React.ReactNode;
};

export function AppShell({ children, user }: AppShellProps) {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f8fbff_0%,#f1f5f9_100%)]">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col gap-6 px-6 py-6 lg:flex-row lg:px-8">
        <aside className="w-full rounded-[28px] border border-white/70 bg-white/85 p-6 shadow-[0_30px_70px_rgba(15,23,42,0.08)] backdrop-blur lg:min-h-[calc(100vh-3rem)] lg:w-[290px]">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-white">
              <Sparkles className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-700">
                Sarvam AI
              </p>
              <h1 className="text-xl font-semibold tracking-[-0.03em] text-slate-950">
                Next.js Workspace
              </h1>
            </div>
          </div>

          <div className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
              Signed in as
            </p>
            <p className="mt-3 text-base font-semibold text-slate-950">{user.name}</p>
            <p className="mt-1 text-sm text-slate-600">{user.email}</p>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
              <ShieldCheck className="h-3.5 w-3.5" />
              {user.is_admin ? "Administrator" : "Workspace Member"}
            </div>
          </div>

          <NavigationLinks isAdmin={Boolean(user.is_admin)} />
        </aside>

        <div className="flex flex-1 flex-col gap-6">
          <header className="flex flex-col gap-4 rounded-[28px] border border-white/70 bg-white/90 p-5 shadow-[0_26px_60px_rgba(15,23,42,0.08)] backdrop-blur sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-700">
                Workspace
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-slate-950">
                Sessions, analytics, and admin controls
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                Your Next.js frontend now sits on top of the existing FastAPI
                backend with protected routes, shared navigation, and
                authenticated data access.
              </p>
            </div>

            <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-sky-100 text-sky-700">
                <UserRound className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-slate-950">
                  {user.name}
                </p>
                <p className="truncate text-xs text-slate-500">{user.email}</p>
              </div>
            </div>

            <LogoutButton />
          </header>

          <main>{children}</main>
        </div>
      </div>
    </div>
  );
}
