import { NextResponse } from "next/server";
import { Resend } from "resend";

type RateEntry = { count: number; resetAt: number };

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 min
const RATE_LIMIT_MAX = 5;
const rateLimit = new Map<string, RateEntry>();

type ContactPayload = {
  name?: string;
  email?: string;
  phone?: string;
  eventType?: string;
  theme?: string;
  duration?: string;
  date?: string;
  time?: string;
  guests?: string;
  childAge?: number | string;
  addons?: string[];
  location?: string;
  details?: string;
  company?: string; // honeypot
};

function getClientIp(req: Request) {
  const forwardedFor = req.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0]?.trim() || "unknown";
  return req.headers.get("x-real-ip") || "unknown";
}

function checkRateLimit(key: string) {
  const now = Date.now();
  const current = rateLimit.get(key);
  if (!current || current.resetAt <= now) {
    rateLimit.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return { ok: true } as const;
  }

  if (current.count >= RATE_LIMIT_MAX) {
    return {
      ok: false,
      retryAfterSeconds: Math.ceil((current.resetAt - now) / 1000),
    } as const;
  }

  current.count += 1;
  rateLimit.set(key, current);
  return { ok: true } as const;
}

function clampString(value: unknown, maxLen: number) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLen);
}

function parseNumber(value: unknown) {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const n = Number(value);
    if (Number.isFinite(n)) return n;
  }
  return undefined;
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function buildLeadText(input: {
  name: string;
  email: string;
  phone: string;
  eventType: string;
  theme: string;
  duration: string;
  childAge: number;
  date: string;
  time: string;
  guests: string;
  addons: string[];
  location: string;
  details: string;
  ip: string;
}) {
  const lines = [
    "Cerere nouă (site)",
    "",
    `Nume: ${input.name}`,
    `Email: ${input.email}`,
    `Telefon: ${input.phone || "-"}`,
    "",
    `Tip eveniment: ${input.eventType || "-"}`,
    `Temă/personaj: ${input.theme || "-"}`,
    `Durată: ${input.duration || "-"}`,
    `Vârstă copil: ${input.childAge}`,
    `Data: ${input.date || "-"}`,
    `Ora: ${input.time || "-"}`,
    `Copii (estimativ): ${input.guests || "-"}`,
    `Opționale: ${input.addons.length ? input.addons.join(", ") : "-"}`,
    `Locație: ${input.location || "-"}`,
    "",
    "Detalii:",
    input.details || "-",
    "",
    `IP: ${input.ip}`,
    `Timestamp: ${new Date().toISOString()}`,
  ];
  return lines.join("\n");
}

export async function POST(req: Request) {
  const ip = getClientIp(req);
  const rl = checkRateLimit(ip);
  if (!rl.ok) {
    return NextResponse.json(
      {
        ok: false,
        error: "Prea multe cereri. Te rugăm încearcă din nou puțin mai târziu.",
      },
      {
        status: 429,
        headers: {
          "Retry-After": String(rl.retryAfterSeconds),
        },
      }
    );
  }

  let body: ContactPayload;

  try {
    body = (await req.json()) as ContactPayload;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Body invalid." },
      { status: 400 }
    );
  }

  // honeypot: if filled, pretend success (anti-spam)
  if (typeof body.company === "string" && body.company.trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  const name = clampString(body.name, 120);
  const email = clampString(body.email, 180);
  const details = clampString(body.details, 4000);
  const childAge = parseNumber(body.childAge);

  if (name.length < 2) {
    return NextResponse.json(
      { ok: false, error: "Numele este prea scurt." },
      { status: 400 }
    );
  }
  if (!isValidEmail(email)) {
    return NextResponse.json(
      { ok: false, error: "Email invalid." },
      { status: 400 }
    );
  }
  if (childAge === undefined || childAge < 1 || childAge > 16) {
    return NextResponse.json(
      { ok: false, error: "Te rugăm introdu vârsta copilului (1–16)." },
      { status: 400 }
    );
  }
  if (details.length < 10) {
    return NextResponse.json(
      { ok: false, error: "Scrie câteva detalii (minim 10 caractere)." },
      { status: 400 }
    );
  }

  const phone = clampString(body.phone, 80);
  const eventType = clampString(body.eventType, 80);
  const theme = clampString(body.theme, 80);
  const duration = clampString(body.duration, 40);
  const date = clampString(body.date, 40);
  const time = clampString(body.time, 20);
  const guests = clampString(body.guests, 20);
  const addons = Array.isArray(body.addons)
    ? body.addons
        .filter((v) => typeof v === "string")
        .map((v) => clampString(v, 80))
        .filter(Boolean)
        .slice(0, 12)
    : [];
  const location = clampString(body.location, 140);

  // Always log server-side.
  console.log("[contact] new lead", {
    name,
    email,
    phone,
    eventType,
    theme,
    duration,
    childAge,
    date,
    time,
    guests,
    addons,
    location,
    details,
    ip,
    at: new Date().toISOString(),
  });

  // Optional email delivery via Resend.
  const resendKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;
  const fromEmail = process.env.CONTACT_FROM_EMAIL || "onboarding@resend.dev";

  if (resendKey && toEmail) {
    const resend = new Resend(resendKey);
    const subjectPrefix = process.env.CONTACT_SUBJECT_PREFIX || "[Cerere Site]";
    const subject = `${subjectPrefix} ${name}${date ? ` — ${date}` : ""}`;
    const text = buildLeadText({
      name,
      email,
      phone,
      eventType,
      theme,
      duration,
      childAge,
      date,
      time,
      guests,
      addons,
      location,
      details,
      ip,
    });

    try {
      await resend.emails.send({
        from: fromEmail,
        to: toEmail,
        subject,
        replyTo: email,
        text,
      });
    } catch (err) {
      console.error("[contact] Resend send failed", err);
      // Keep user-friendly response.
      return NextResponse.json(
        { ok: false, error: "Nu am reușit să trimitem emailul. Încearcă din nou." },
        { status: 500 }
      );
    }
  } else {
    if (!resendKey || !toEmail) {
      console.warn(
        "[contact] Email not configured. Set RESEND_API_KEY + CONTACT_TO_EMAIL to receive leads by email."
      );
    }
  }

  return NextResponse.json({ ok: true });
}
