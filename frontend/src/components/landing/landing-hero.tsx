"use client";

import { Play, Sparkles } from "lucide-react";

export function LandingHero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 px-6 overflow-hidden bg-[#0A0A0B]">
      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-sky-500/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-500/10 blur-[120px] rounded-full" />
      
      <div className="relative z-10 text-center max-w-4xl mx-auto space-y-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sky-400 text-xs font-bold uppercase tracking-widest animate-pulse">
          <Sparkles className="h-3 w-3" />
          The future of meetings is here
        </div>
        
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white leading-[0.9]">
          Your Intelligent <br />
          <span className="bg-gradient-to-r from-sky-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Meeting Engine
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed">
          Unlock the true potential of every conversation. Automate transcriptions, 
          generate smart summaries, and transform meetings into actionable insights.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-black font-extrabold text-lg hover:scale-105 transition-transform shadow-xl shadow-white/10">
            Start free trial
          </button>
          <button className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white font-bold text-lg hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
            <Play className="h-5 w-5 fill-current" />
            Watch Demo
          </button>
        </div>
      </div>

      {/* Video Showcase Container */}
      <div id="demo" className="relative mt-20 w-full max-w-5xl mx-auto group">
        <div className="absolute -inset-1 bg-gradient-to-r from-sky-500 to-indigo-600 rounded-[32px] blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
        <div className="relative aspect-video rounded-[28px] overflow-hidden border border-white/10 bg-black shadow-2xl">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full h-full object-cover opacity-80"
          >
            <source src="/demo.mp4" type="video/mp4" />
          </video>
          
          {/* Video Overlay Overlay Elements */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-8 left-8 p-6 backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl max-w-sm hidden md:block">
            <h3 className="text-white font-bold text-lg">Real-time Intelligence</h3>
            <p className="text-slate-400 text-sm mt-1">Watch MeetWise AI capture and analyze a live certification lecture in real-time.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
