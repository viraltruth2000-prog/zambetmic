export type AnalyticsPayload = {
  event: string;
  label?: string;
  href?: string;
  [key: string]: unknown;
};

const SESSION_KEY = "analytics_session_id_v1";

function getSessionId() {
  try {
    if (typeof window === "undefined") return "server";
    const existing = window.sessionStorage.getItem(SESSION_KEY);
    if (existing) return existing;
    const next =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `sess_${Math.random().toString(36).slice(2, 10)}_${Date.now()}`;
    window.sessionStorage.setItem(SESSION_KEY, next);
    return next;
  } catch {
    return "unknown";
  }
}

export function pushAnalyticsEvent(payload: AnalyticsPayload) {
  try {
    if (typeof window === "undefined") return;
    const base = {
      ts: Date.now(),
      session_id: getSessionId(),
      path: window.location.pathname,
    };
    const enriched = { ...base, ...payload };
    const w = window as Window & { dataLayer?: Array<Record<string, unknown>> };
    w.dataLayer = w.dataLayer ?? [];
    w.dataLayer.push(enriched);
  } catch {
    // no-op
  }
}

