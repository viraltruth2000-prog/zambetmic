export function SectionHeading({
  eyebrow,
  title,
  description,
  as = "h2",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  as?: "h1" | "h2";
}) {
  const HeadingTag = as;

  return (
    <div>
      <div className="sb-pill inline-flex items-center gap-2 px-4 py-2">
        <span className="h-2 w-2 rounded-full bg-orange-500" />
        <p className="text-sm font-semibold text-black/70">{eyebrow}</p>
      </div>
      <HeadingTag className="cartoon-title mt-4 text-pretty text-3xl font-extrabold tracking-tight text-black/85 sm:text-4xl">
        {title}
      </HeadingTag>
      <div className="mt-3 h-1 w-24 rounded-full bg-gradient-to-r from-orange-500 via-pink-500 to-sky-500" />
      {description ? (
        <p className="mt-4 max-w-2xl text-pretty text-base leading-7 text-black/70">
          {description}
        </p>
      ) : null}
    </div>
  );
}
