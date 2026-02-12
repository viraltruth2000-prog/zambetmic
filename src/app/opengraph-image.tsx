import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const runtime = "edge";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #60A5FA 0%, #FDE047 45%, #FB7185 100%)",
          position: "relative",
          fontFamily:
            'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial',
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 25% 30%, rgba(255,255,255,0.55), rgba(255,255,255,0) 55%), radial-gradient(circle at 80% 70%, rgba(255,255,255,0.40), rgba(255,255,255,0) 55%)",
          }}
        />

        <div
          style={{
            width: 980,
            borderRadius: 56,
            background: "rgba(255,255,255,0.55)",
            border: "2px solid rgba(0,0,0,0.10)",
            padding: "56px 64px",
            boxShadow: "0 40px 120px rgba(0,0,0,0.18)",
            backdropFilter: "blur(10px)",
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
                borderRadius: 18,
                background:
                  "linear-gradient(135deg, #fb923c 0%, #f472b6 50%, #38bdf8 100%)",
                border: "2px solid rgba(0,0,0,0.10)",
              }}
            />
            <div
              style={{
                fontSize: 28,
                fontWeight: 900,
                color: "rgba(17,24,39,0.86)",
                letterSpacing: "-0.02em",
              }}
            >
              {siteConfig.name}
            </div>
          </div>

          <div
            style={{
              fontSize: 64,
              fontWeight: 950,
              lineHeight: 1.05,
              color: "rgba(17,24,39,0.88)",
              letterSpacing: "-0.03em",
            }}
          >
            Animatori pentru petreceri de copii
          </div>

          <div
            style={{
              marginTop: 22,
              fontSize: 28,
              fontWeight: 700,
              color: "rgba(17,24,39,0.68)",
              lineHeight: 1.35,
            }}
          >
            {siteConfig.city} · WhatsApp + rezervare rapidă
          </div>
        </div>
      </div>
    ),
    size
  );
}

