"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const WhatsAppFloatingButton = dynamic(
  () => import("@/components/WhatsAppFloatingButton").then((m) => m.WhatsAppFloatingButton),
  { ssr: false }
);

const AnalyticsEvents = dynamic(
  () => import("@/components/AnalyticsEvents").then((m) => m.AnalyticsEvents),
  { ssr: false }
);

const DevAnalyticsPanel = dynamic(
  () => import("@/components/DevAnalyticsPanel").then((m) => m.DevAnalyticsPanel),
  { ssr: false }
);

export function ClientGlobalWidgets() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    let idleId: number | null = null;
    const w = window as Window & {
      requestIdleCallback?: (cb: () => void) => number;
      cancelIdleCallback?: (id: number) => void;
    };

    const onReady = () => setReady(true);

    if (typeof w.requestIdleCallback === "function") {
      idleId = w.requestIdleCallback(onReady);
    } else {
      timeoutId = setTimeout(onReady, 700);
    }

    return () => {
      if (timeoutId !== null) clearTimeout(timeoutId);
      if (idleId !== null && typeof w.cancelIdleCallback === "function") {
        w.cancelIdleCallback(idleId);
      }
    };
  }, []);

  if (!ready) return null;

  return (
    <>
      <WhatsAppFloatingButton />
      <AnalyticsEvents />
      {process.env.NODE_ENV === "development" ? <DevAnalyticsPanel /> : null}
    </>
  );
}

