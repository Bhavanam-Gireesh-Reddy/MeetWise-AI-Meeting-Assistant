import { 
  Mic2, 
  FileText, 
  BrainCircuit, 
  Languages, 
  Library, 
  Zap 
} from "lucide-react";

const features = [
  {
    icon: Mic2,
    title: "Live Transcription",
    description: "Capture every word with industry-leading accuracy. Real-time processing ensures you never miss a beat.",
    color: "text-sky-400",
    bg: "bg-sky-500/10"
  },
  {
    icon: BrainCircuit,
    title: "AI Summaries",
    description: "Transform hours of audio into concise, actionable summaries and key takeaways automatically.",
    color: "text-indigo-400",
    bg: "bg-indigo-500/10"
  },
  {
    icon: Library,
    title: "Personal Studio",
    description: "Your session history reimagined. Search, filter, and organize transcripts with a powerful AI studio.",
    color: "text-purple-400",
    bg: "bg-purple-500/10"
  },
  {
    icon: Languages,
    title: "Multi-language",
    description: "Record in one language, translate to another. Seamlessly bridge communication gaps globally.",
    color: "text-rose-400",
    bg: "bg-rose-500/10"
  },
  {
    icon: FileText,
    title: "Smart Artifacts",
    description: "Generate flashcards, quizzes, and mind maps directly from your meeting transcripts.",
    color: "text-amber-400",
    bg: "bg-amber-500/10"
  },
  {
    icon: Zap,
    title: "Instant Export",
    description: "Export to TXT, SRT, or PDF. Deliver meeting notes to your team with a single click.",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10"
  }
];

export function FeatureGrid() {
  return (
    <section id="features" className="bg-[#0A0A0B] py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24 space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-sky-500">
            Platform Capabilities
          </h2>
          <p className="text-4xl md:text-5xl font-black text-white tracking-tight">
            Engineered for <br className="md:hidden" /> High-Performance Teams
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-white/10 hover:bg-white/[0.04] transition-all duration-300"
            >
              <div className={`w-14 h-14 rounded-2xl ${feature.bg} ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
                <feature.icon className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-slate-400 leading-relaxed text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Call to Action Footer */}
        <div className="mt-32 p-1 bg-gradient-to-r from-sky-500 via-indigo-600 to-purple-600 rounded-[40px]">
          <div className="bg-[#0A0A0B] rounded-[38px] px-12 py-20 text-center space-y-8">
            <h2 className="text-3xl md:text-5xl font-black text-white px-2">
              Ready to automate your meeting workflow?
            </h2>
            <div className="flex justify-center flex-wrap gap-4">
              <button className="px-10 py-4 rounded-full bg-white text-black font-extrabold hover:scale-105 transition-transform">
                Join Waitlist
              </button>
              <button className="px-10 py-4 rounded-full bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition-colors">
                Contact Sales
              </button>
            </div>
            <p className="text-slate-500 text-xs font-semibold tracking-widest uppercase">
              © 2026 MeetWise AI. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
