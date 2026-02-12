import { cn } from "@/lib/cn";

export function CloudPuffDivider({
  className,
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="-20 0 1240 120"
      preserveAspectRatio="none"
      className={cn("block h-20 w-full", className)}
      aria-hidden="true"
      shapeRendering="geometricPrecision"
    >
      <path
        d="M-20 0v70Q30 40 80 70T180 70T280 70T380 70T480 70T580 70T680 70T780 70T880 70T980 70T1080 70T1180 70T1220 70V0Z"
        fill="currentColor"
      />
    </svg>
  );
}

