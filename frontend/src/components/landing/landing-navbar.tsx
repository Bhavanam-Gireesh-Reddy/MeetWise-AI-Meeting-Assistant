"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react";

export function LandingNavbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 backdrop-blur-md bg-black/20 border-b border-white/10">
      <div className="flex items-center gap-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-indigo-600 text-white shadow-lg shadow-sky-500/20">
          <Sparkles className="h-5 w-5" />
        </div>
        <span className="text-xl font-bold tracking-tight text-white">
          MeetWise <span className="text-sky-400">AI</span>
        </span>
      </div>
      
      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
        <Link href="#features" className="hover:text-white transition-colors">Features</Link>
        <Link href="#demo" className="hover:text-white transition-colors">Demo</Link>
        <Link href="#about" className="hover:text-white transition-colors">About</Link>
      </div>

      <div className="flex items-center gap-4">
        <Link 
          href="/login" 
          className="text-sm font-semibold text-white hover:text-sky-400 transition-colors"
        >
          Sign In
        </Link>
        <Link 
          href="/login" 
          className="rounded-full bg-white px-5 py-2 text-sm font-bold text-black transition-transform hover:scale-105 active:scale-95"
        >
          Get Started
        </Link>
      </div>
    </nav>
  );
}
