import Image from "next/image";
import { cn } from "@/lib/cn";

export function CloudDividerImage({
  className,
}: {
  className?: string;
}) {
  return (
    <div className={cn("relative h-24 w-full", className)} aria-hidden="true">
      <Image
        src="/dividers/cloud-divider.png"
        alt=""
        fill
        className="object-cover object-top"
        sizes="100vw"
        priority={false}
      />
    </div>
  );
}

