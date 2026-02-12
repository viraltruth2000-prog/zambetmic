export function ConfettiBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -top-24 left-1/2 h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-orange-400/30 via-pink-500/22 to-sky-400/25 blur-3xl" />
      <div className="absolute -bottom-40 right-[-140px] h-[560px] w-[560px] rounded-full bg-gradient-to-tr from-emerald-400/20 via-yellow-300/20 to-violet-500/20 blur-3xl" />
      <div className="absolute -bottom-48 left-[-220px] h-[620px] w-[620px] rounded-full bg-gradient-to-tr from-sky-400/18 via-cyan-300/18 to-fuchsia-500/18 blur-3xl" />

      {/* confetti dots */}
      <div className="absolute left-10 top-14 h-2 w-2 rounded-full bg-orange-400" />
      <div className="absolute left-28 top-24 h-3 w-3 rounded-full bg-sky-400" />
      <div className="absolute left-16 top-48 h-2 w-2 rounded-full bg-emerald-400" />
      <div className="absolute right-20 top-24 h-2.5 w-2.5 rounded-full bg-fuchsia-400" />
      <div className="absolute right-40 top-52 h-2 w-2 rounded-full bg-yellow-300" />
      <div className="absolute right-24 bottom-24 h-3 w-3 rounded-full bg-violet-400" />
      <div className="absolute left-40 bottom-20 h-2.5 w-2.5 rounded-full bg-rose-400" />

      {/* streamers */}
      <div className="absolute right-[-40px] top-20 h-40 w-40 rotate-12 rounded-[48px] bg-gradient-to-br from-orange-400/20 to-pink-500/20 blur-xl" />
      <div className="absolute left-[-60px] bottom-12 h-48 w-48 -rotate-12 rounded-[56px] bg-gradient-to-br from-sky-400/18 to-emerald-400/18 blur-xl" />
    </div>
  );
}
