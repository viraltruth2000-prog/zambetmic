import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const contentType = "image/png";
export const revalidate = 3600;

const size = {
  width: 1200,
  height: 630,
} as const;

type Theme = "default" | "services" | "characters" | "gallery" | "about" | "contact";

function getThemePalette(theme: Theme) {
  if (theme === "services") {
    return {
      bg: "linear-gradient(135deg, #7dd3fc 0%, #fde68a 48%, #fb923c 100%)",
      glow: "radial-gradient(circle at 16% 18%, rgba(255,255,255,0.58), rgba(255,255,255,0) 56%), radial-gradient(circle at 82% 74%, rgba(255,255,255,0.38), rgba(255,255,255,0) 56%)",
    };
  }
  if (theme === "characters") {
    return {
      bg: "linear-gradient(135deg, #93c5fd 0%, #f9a8d4 44%, #a78bfa 100%)",
      glow: "radial-gradient(circle at 22% 24%, rgba(255,255,255,0.56), rgba(255,255,255,0) 54%), radial-gradient(circle at 78% 76%, rgba(255,255,255,0.34), rgba(255,255,255,0) 52%)",
    };
  }
  if (theme === "gallery") {
    return {
      bg: "linear-gradient(135deg, #67e8f9 0%, #fde68a 42%, #f9a8d4 100%)",
      glow: "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.62), rgba(255,255,255,0) 56%), radial-gradient(circle at 84% 72%, rgba(255,255,255,0.36), rgba(255,255,255,0) 56%)",
    };
  }
  if (theme === "about") {
    return {
      bg: "linear-gradient(135deg, #bfdbfe 0%, #fde68a 52%, #fdba74 100%)",
      glow: "radial-gradient(circle at 24% 18%, rgba(255,255,255,0.54), rgba(255,255,255,0) 54%), radial-gradient(circle at 80% 70%, rgba(255,255,255,0.34), rgba(255,255,255,0) 56%)",
    };
  }
  if (theme === "contact") {
    return {
      bg: "linear-gradient(135deg, #86efac 0%, #7dd3fc 44%, #fbcfe8 100%)",
      glow: "radial-gradient(circle at 18% 24%, rgba(255,255,255,0.56), rgba(255,255,255,0) 56%), radial-gradient(circle at 82% 72%, rgba(255,255,255,0.34), rgba(255,255,255,0) 54%)",
    };
  }
  return {
    bg: "linear-gradient(135deg, #60A5FA 0%, #FDE047 45%, #FB7185 100%)",
    glow: "radial-gradient(circle at 25% 30%, rgba(255,255,255,0.55), rgba(255,255,255,0) 55%), radial-gradient(circle at 80% 70%, rgba(255,255,255,0.40), rgba(255,255,255,0) 55%)",
  };
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title")?.trim() || "Animatori pentru petreceri de copii";
  const subtitle = searchParams.get("subtitle")?.trim() || `${siteConfig.city} · WhatsApp + rezervare rapidă`;
  const theme = (searchParams.get("theme")?.trim() as Theme | null) ?? "default";

  const palette = getThemePalette(theme);

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: palette.bg,
          position: "relative",
          fontFamily: 'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial',
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            background: palette.glow,
          }}
        />

        <div
          style={{
            width: 980,
            display: "flex",
            flexDirection: "column",
            borderRadius: 56,
            background: "rgba(255,255,255,0.58)",
            border: "2px solid rgba(0,0,0,0.10)",
            padding: "56px 64px",
            boxShadow: "0 40px 120px rgba(0,0,0,0.18)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 18,
              marginBottom: 18,
            }}
          >
            <div
              style={{
                width: 56,
                height: 56,
                display: "flex",
                borderRadius: 18,
                background: "linear-gradient(135deg, #fb923c 0%, #f472b6 50%, #38bdf8 100%)",
                border: "2px solid rgba(0,0,0,0.10)",
              }}
            />
            <div
              style={{
                fontSize: 28,
                fontWeight: 900,
                display: "flex",
                color: "rgba(17,24,39,0.86)",
                letterSpacing: "-0.02em",
              }}
            >
              {siteConfig.name}
            </div>
          </div>

          <div
            style={{
              fontSize: 62,
              fontWeight: 950,
              display: "flex",
              lineHeight: 1.06,
              color: "rgba(17,24,39,0.88)",
              letterSpacing: "-0.03em",
            }}
          >
            {title}
          </div>

          <div
            style={{
              marginTop: 20,
              fontSize: 27,
              fontWeight: 700,
              display: "flex",
              color: "rgba(17,24,39,0.68)",
              lineHeight: 1.35,
            }}
          >
            {subtitle}
          </div>
        </div>
      </div>
    ),
    size
  );
}
