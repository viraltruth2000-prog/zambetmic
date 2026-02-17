"use client";

import { useEffect, useMemo, useState } from "react";

type DataLayerEvent = {
  event?: string;
  label?: string;
  ts?: number;
  path?: string;
  session_id?: string;
};

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

export function DevAnalyticsPanel() {
  const [open, setOpen] = useState(false);
  const [events, setEvents] = useState<DataLayerEvent[]>([]);
  const [localSuccessTotal, setLocalSuccessTotal] = useState(0);
  const [selectedPath, setSelectedPath] = useState("all");
  const [selectedSession, setSelectedSession] = useState("all");

  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;

    const id = window.setInterval(() => {
      const raw = (window.dataLayer ?? []) as DataLayerEvent[];
      setEvents(raw.slice(-30));
      setLocalSuccessTotal(Number(window.localStorage.getItem("contact_form_success_count_v1") ?? "0"));
    }, 600);

    return () => window.clearInterval(id);
  }, []);

  const paths = useMemo(() => {
    const unique = new Set<string>();
    for (const e of events) {
      if (e.path) unique.add(e.path);
    }
    return Array.from(unique).sort();
  }, [events]);

  const sessions = useMemo(() => {
    const unique = new Set<string>();
    for (const e of events) {
      if (e.session_id) unique.add(e.session_id);
    }
    return Array.from(unique).sort((a, b) => b.localeCompare(a));
  }, [events]);

  const activePath = selectedPath === "all" || paths.includes(selectedPath) ? selectedPath : "all";
  const activeSession =
    selectedSession === "all" || sessions.includes(selectedSession) ? selectedSession : "all";

  const filteredEvents = useMemo(
    () =>
      events.filter((e) => {
        if (activePath !== "all" && e.path !== activePath) return false;
        if (activeSession !== "all" && e.session_id !== activeSession) return false;
        return true;
      }),
    [events, activePath, activeSession],
  );

  const counts = useMemo(() => {
    const byEvent = new Map<string, number>();
    for (const e of filteredEvents) {
      const key = e.event ?? "unknown";
      byEvent.set(key, (byEvent.get(key) ?? 0) + 1);
    }
    return Array.from(byEvent.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6);
  }, [filteredEvents]);

  const funnel = useMemo(() => {
    const hasEvent = (name: string, predicate?: (e: DataLayerEvent) => boolean) =>
      filteredEvents.filter((e) => e.event === name && (predicate ? predicate(e) : true)).length;

    const step1Viewed = hasEvent("contact_form_step_view", (e) => String(e.label ?? "").includes("step 1"));
    const step2Viewed = hasEvent("contact_form_step_view", (e) => String(e.label ?? "").includes("step 2"));
    const step3Viewed = hasEvent("contact_form_step_view", (e) => String(e.label ?? "").includes("step 3"));
    const submitClicks = hasEvent("submit_contact");
    const submitSuccess = hasEvent("contact_form_submit_success");
    const resume = hasEvent("contact_form_resume");
    const abandon = hasEvent("contact_form_abandon");
    const conv = step1Viewed > 0 ? Math.round((submitSuccess / step1Viewed) * 100) : 0;

    return {
      step1Viewed,
      step2Viewed,
      step3Viewed,
      submitClicks,
      submitSuccess,
      resume,
      abandon,
      conv,
    };
  }, [filteredEvents]);

  const exportCsv = () => {
    if (!filteredEvents.length) return;
    const rows = [
      ["event", "label", "path", "session_id", "ts_iso", "ts_epoch"],
      ...filteredEvents.map((e) => [
        String(e.event ?? ""),
        String(e.label ?? ""),
        String(e.path ?? ""),
        String(e.session_id ?? ""),
        e.ts ? new Date(e.ts).toISOString() : "",
        String(e.ts ?? ""),
      ]),
    ];
    const escape = (v: string) => `"${v.replace(/"/g, '""')}"`;
    const csv = rows.map((r) => r.map(escape).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `analytics-dev-${Date.now()}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const resetLocal = () => {
    window.localStorage.removeItem("contact_form_success_count_v1");
    window.dataLayer = [];
    setEvents([]);
  };

  if (process.env.NODE_ENV !== "development") return null;

  return (
    <div className="fixed bottom-3 left-3 z-[120] max-w-[90vw]">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="rounded-full border border-black/20 bg-white/92 px-4 py-2 text-xs font-black text-black/75 shadow-[0_8px_18px_rgba(0,0,0,0.18)]"
      >
        Analytics Dev ({events.length})
      </button>

      {open ? (
        <div className="mt-2 w-[360px] max-w-[90vw] rounded-2xl border border-black/15 bg-white/96 p-3 shadow-[0_14px_34px_rgba(0,0,0,0.22)]">
          <p className="text-xs font-black uppercase tracking-wide text-black/55">Top events</p>
          <div className="mt-2 space-y-1.5 text-xs">
            {counts.length ? (
              counts.map(([name, count]) => (
                <div key={name} className="flex items-center justify-between rounded-lg bg-zinc-50 px-2 py-1">
                  <span className="font-semibold text-black/70">{name}</span>
                  <span className="font-black text-black/75">{count}</span>
                </div>
              ))
            ) : (
              <p className="text-black/55">Nicio interacțiune încă.</p>
            )}
          </div>

          <p className="mt-3 text-xs font-black uppercase tracking-wide text-black/55">Filtre</p>
          <div className="mt-2 grid grid-cols-1 gap-1.5 text-xs">
            <label className="flex items-center gap-2 rounded-lg bg-zinc-50 px-2 py-1.5">
              <span className="font-semibold text-black/65">Path</span>
              <select
                value={activePath}
                onChange={(e) => setSelectedPath(e.target.value)}
                className="min-w-0 flex-1 rounded-md border border-black/15 bg-white px-2 py-1 text-black/75"
              >
                <option value="all">Toate paginile</option>
                {paths.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex items-center gap-2 rounded-lg bg-zinc-50 px-2 py-1.5">
              <span className="font-semibold text-black/65">Session</span>
              <select
                value={activeSession}
                onChange={(e) => setSelectedSession(e.target.value)}
                className="min-w-0 flex-1 rounded-md border border-black/15 bg-white px-2 py-1 text-black/75"
              >
                <option value="all">Toate sesiunile</option>
                {sessions.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <p className="mt-2 text-xs text-black/55">
            Vizibile: <b>{filteredEvents.length}</b> / {events.length}
          </p>

          <p className="mt-3 text-xs font-black uppercase tracking-wide text-black/55">Latest</p>
          <div className="mt-2 max-h-48 space-y-1 overflow-y-auto rounded-lg bg-zinc-50 p-2 text-xs">
            {filteredEvents.length ? (
              [...filteredEvents].reverse().slice(0, 12).map((e, i) => (
                <div key={`${e.event ?? "unknown"}-${e.ts ?? i}-${i}`} className="rounded-md bg-white px-2 py-1">
                  <p className="font-black text-black/75">{e.event ?? "unknown"}</p>
                  {e.label ? <p className="text-black/60">{e.label}</p> : null}
                  <p className="text-[10px] text-black/45">{e.path ?? "-"}</p>
                </div>
              ))
            ) : (
              <p className="text-black/55">Niciun eveniment pe filtrul curent.</p>
            )}
          </div>

          <p className="mt-3 text-xs font-black uppercase tracking-wide text-black/55">Funnel</p>
          <div className="mt-2 grid grid-cols-2 gap-1.5 text-xs">
            <div className="rounded-lg bg-zinc-50 px-2 py-1">Step1: <b>{funnel.step1Viewed}</b></div>
            <div className="rounded-lg bg-zinc-50 px-2 py-1">Step2: <b>{funnel.step2Viewed}</b></div>
            <div className="rounded-lg bg-zinc-50 px-2 py-1">Step3: <b>{funnel.step3Viewed}</b></div>
            <div className="rounded-lg bg-zinc-50 px-2 py-1">Submit: <b>{funnel.submitClicks}</b></div>
            <div className="rounded-lg bg-emerald-50 px-2 py-1">Success: <b>{funnel.submitSuccess}</b></div>
            <div className="rounded-lg bg-amber-50 px-2 py-1">Resume: <b>{funnel.resume}</b></div>
            <div className="rounded-lg bg-rose-50 px-2 py-1">Abandon: <b>{funnel.abandon}</b></div>
            <div className="rounded-lg bg-sky-50 px-2 py-1">Conv: <b>{funnel.conv}%</b></div>
          </div>
          <p className="mt-2 text-xs text-black/55">Local total success: <b>{localSuccessTotal}</b></p>
          <div className="mt-3 flex items-center gap-2">
            <button
              type="button"
              onClick={exportCsv}
              className="rounded-full border border-black/15 bg-white px-3 py-1 text-xs font-black text-black/70"
            >
              Export CSV
            </button>
            <button
              type="button"
              onClick={resetLocal}
              className="rounded-full border border-black/15 bg-zinc-100 px-3 py-1 text-xs font-black text-black/65"
            >
              Reset Local
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
