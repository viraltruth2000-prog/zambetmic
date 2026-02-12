import { cn } from "@/lib/cn";

type IconProps = {
  className?: string;
  title?: string;
};

function Svg({
  className,
  title,
  children,
  viewBox = "0 0 24 24",
}: {
  className?: string;
  title?: string;
  viewBox?: string;
  children: React.ReactNode;
}) {
  return (
    <svg
      viewBox={viewBox}
      className={cn("h-6 w-6", className)}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role={title ? "img" : "presentation"}
      aria-hidden={title ? undefined : true}
    >
      {title ? <title>{title}</title> : null}
      {children}
    </svg>
  );
}

export function IconPartyHat({ className, title }: IconProps) {
  return (
    <Svg className={className} title={title}>
      <path
        d="M6 20h12"
        stroke="currentColor"
        strokeOpacity="0.55"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M12 3c-3.2 4.3-5.5 8.7-6.7 13.2a1 1 0 0 0 .97 1.23h11.46a1 1 0 0 0 .97-1.23C17.5 11.7 15.2 7.3 12 3Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M9 12l3-2 3 2"
        stroke="currentColor"
        strokeOpacity="0.6"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="2.75" r="1.1" fill="currentColor" />
    </Svg>
  );
}

export function IconSparkles({ className, title }: IconProps) {
  return (
    <Svg className={className} title={title}>
      <path
        d="M12 2l1.1 4.1L17 7.2l-3.9 1.1L12 12l-1.1-3.7L7 7.2l3.9-1.1L12 2Z"
        fill="currentColor"
        fillOpacity="0.85"
      />
      <path
        d="M19 12l.7 2.6L22 15.3l-2.3.7L19 18l-.7-2-2.3-.7 2.3-.7L19 12Z"
        fill="currentColor"
        fillOpacity="0.65"
      />
      <path
        d="M4.8 12.5l.6 2.1 2 .6-2 .6-.6 2-.6-2-2-.6 2-.6.6-2.1Z"
        fill="currentColor"
        fillOpacity="0.55"
      />
    </Svg>
  );
}

export function IconBalloon({ className, title }: IconProps) {
  return (
    <Svg className={className} title={title}>
      <path
        d="M12 3c-3.3 0-6 2.8-6 6.4C6 13.5 9 16 12 16s6-2.5 6-6.6C18 5.8 15.3 3 12 3Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M12 16c0 2.5-1.3 4.2-3.2 5.2"
        stroke="currentColor"
        strokeOpacity="0.7"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M10.7 16.2l1.3 1.8 1.3-1.8"
        stroke="currentColor"
        strokeOpacity="0.8"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export function IconMusic({ className, title }: IconProps) {
  return (
    <Svg className={className} title={title}>
      <path
        d="M14 3v12.2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M14 3c3.3 1.1 5.6 1.7 7 1.8v4.2c-1.6-.1-3.9-.7-7-1.8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M9.8 19.6c-1.6 0-2.8-1-2.8-2.3 0-1.3 1.2-2.3 2.8-2.3 1.6 0 2.8 1 2.8 2.3 0 1.3-1.2 2.3-2.8 2.3Z"
        fill="currentColor"
        fillOpacity="0.85"
      />
      <path
        d="M14 16.2c0 1.9-1.9 3.4-4.2 3.4"
        stroke="currentColor"
        strokeOpacity="0.6"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </Svg>
  );
}

export function IconPaint({ className, title }: IconProps) {
  return (
    <Svg className={className} title={title}>
      <path
        d="M12 3c4.7 0 8 3.2 8 7.2S16.7 18 12 18c-.9 0-1.6.7-1.6 1.6 0 1.1-.9 2-2 2-2.1 0-3.9-1.6-3.9-4.1C4.5 10.3 7.4 3 12 3Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <circle cx="16.2" cy="9" r="1" fill="currentColor" />
      <circle cx="12.6" cy="7.2" r="1" fill="currentColor" fillOpacity="0.85" />
      <circle cx="9" cy="8.5" r="1" fill="currentColor" fillOpacity="0.7" />
      <circle cx="8" cy="12" r="1" fill="currentColor" fillOpacity="0.6" />
    </Svg>
  );
}

export function IconGift({ className, title }: IconProps) {
  return (
    <Svg className={className} title={title}>
      <path
        d="M4 11h16v10H4V11Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M12 11v10"
        stroke="currentColor"
        strokeOpacity="0.65"
        strokeWidth="2"
      />
      <path
        d="M4 11V7h16v4H4Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M12 7c-1.8 0-3-1-3-2.3C9 3.6 10 3 11.2 3c1.2 0 2.2 1.3 2.8 4Zm0 0c1.8 0 3-1 3-2.3C15 3.6 14 3 12.8 3c-1.2 0-2.2 1.3-2.8 4Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
