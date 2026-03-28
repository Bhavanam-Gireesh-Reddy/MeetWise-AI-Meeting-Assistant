type EmbeddedWorkspaceProps = {
  description: string;
  eyebrow: string;
  src: string;
  title: string;
};

export function EmbeddedWorkspace({
  description,
  eyebrow,
  src,
  title,
}: EmbeddedWorkspaceProps) {
  return (
    <div className="grid gap-6">
      <section className="rounded-[28px] border border-white/70 bg-white/90 p-7 shadow-[0_26px_60px_rgba(15,23,42,0.08)] backdrop-blur">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-700">
          {eyebrow}
        </p>
        <h3 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-slate-950">
          {title}
        </h3>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
          {description}
        </p>
      </section>

      <section className="overflow-hidden rounded-[32px] border border-white/70 bg-white/90 shadow-[0_30px_70px_rgba(15,23,42,0.08)]">
        <iframe
          className="h-[calc(100vh-15rem)] min-h-[900px] w-full border-0"
          src={src}
          title={title}
        />
      </section>
    </div>
  );
}
