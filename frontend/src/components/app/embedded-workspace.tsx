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
    <div className="grid gap-3 sm:gap-4 md:gap-6">
      <section className="rounded-lg sm:rounded-2xl md:rounded-[28px] border border-white/70 bg-white/90 p-3 sm:p-4 md:p-6 lg:p-7 shadow-[0_8px_16px_rgba(15,23,42,0.06)] sm:shadow-[0_16px_40px_rgba(15,23,42,0.08)] md:shadow-[0_26px_60px_rgba(15,23,42,0.08)] backdrop-blur">
        <p className="text-xs sm:text-xs md:text-sm font-semibold uppercase tracking-[0.16em] sm:tracking-[0.2em] md:tracking-[0.24em] text-sky-700">
          {eyebrow}
        </p>
        <h3 className="mt-1 sm:mt-2 md:mt-2 text-lg sm:text-2xl md:text-3xl font-semibold tracking-[-0.02em] sm:tracking-[-0.03em] md:tracking-[-0.04em] text-slate-950">
          {title}
        </h3>
        <p className="mt-2 sm:mt-2 md:mt-3 max-w-3xl text-xs sm:text-sm leading-5 sm:leading-6 md:leading-6 text-slate-600">
          {description}
        </p>
      </section>

      <section className="overflow-hidden rounded-lg sm:rounded-2xl md:rounded-[32px] border border-white/70 bg-white/90 shadow-[0_8px_16px_rgba(15,23,42,0.06)] sm:shadow-[0_16px_40px_rgba(15,23,42,0.08)] md:shadow-[0_30px_70px_rgba(15,23,42,0.08)]">
        <iframe
          className="w-full border-0 aspect-video sm:aspect-video md:aspect-auto md:h-[calc(100vh-15rem)] md:min-h-[900px]"
          src={src}
          title={title}
        />
      </section>
    </div>
  );
}
