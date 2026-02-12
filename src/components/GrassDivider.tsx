import { cn } from "@/lib/cn";

export function GrassDivider({
  className,
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 1200 140"
      preserveAspectRatio="none"
      className={cn("block h-24 w-full", className)}
      aria-hidden="true"
      shapeRendering="geometricPrecision"
    >
      {/* Main grass body */}
      <path
        d="M0 0c90 50 170 62 240 36 70-26 140-26 210 0 70 26 140 26 210 0 70-26 140-26 210 0 70 26 150 14 330-36v140H0V0Z"
        fill="currentColor"
      />

      {/* Blades / highlights */}
      <path
        d="M0 18c96 42 178 52 246 30 68-22 134-22 202 0 68 22 134 22 202 0 68-22 134-22 202 0 68 22 152 12 346-30"
        fill="none"
        stroke="rgba(255,255,255,0.22)"
        strokeWidth="10"
        strokeLinecap="round"
      />
      <path
        d="M70 28c18 12 30 24 36 36M180 36c12 18 20 34 24 48M1020 28c-18 12-30 24-36 36M930 36c-12 18-20 34-24 48"
        fill="none"
        stroke="rgba(255,255,255,0.16)"
        strokeWidth="10"
        strokeLinecap="round"
      />
    </svg>
  );
}

