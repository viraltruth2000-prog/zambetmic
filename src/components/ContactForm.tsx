"use client";

import { memo, useCallback, useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
import { Button, ButtonAnchor } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { siteConfig } from "@/lib/site";
import { toWhatsAppLink } from "@/lib/whatsapp";
import { pushAnalyticsEvent } from "@/lib/analytics";

type Status = "idle" | "sending" | "success" | "error";
const CONTACT_DRAFT_KEY = "contact_form_draft_v1";
const CONTACT_SUCCESS_KEY = "contact_form_success_count_v1";

function createInitialForm() {
  return {
    name: "",
    email: "",
    phone: "",
    eventType: "Petrecere aniversară",
    date: "",
    time: "",
    guests: "",
    childAge: "",
    theme: "Super Erou",
    duration: "90 min",
    addons: [] as string[],
    location: "",
    details: "",
    company: "",
  };
}

const themeOptions = [
  "Super Erou",
  "Prințesă",
  "Unicorn",
  "Pirată",
  "Clovn simpatic",
  "Astronaut",
  "Curcubeu",
  "Altă temă",
] as const;

const durationOptions = ["60 min", "90 min", "120 min"] as const;
const eventTypeOptions = [
  "Petrecere aniversară",
  "Grădiniță / Școală",
  "Eveniment corporate (copii)",
  "Alt tip",
] as const;

const addonOptions = [
  "Face painting",
  "Baloane modelabile",
  "Piniata",
  "Bubble show",
  "Atelier (slime/brățări)",
  "Premii pentru concursuri",
] as const;
const stepOptions = [1, 2, 3] as const;

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-black/70">{label}</span>
      <div className="mt-2">{children}</div>
    </label>
  );
}

const StepTabButton = memo(function StepTabButton({
  value,
  active,
  onSelect,
}: {
  value: 1 | 2 | 3;
  active: boolean;
  onSelect: (step: 1 | 2 | 3) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(value)}
      data-track="contact_step_tab"
      data-track-label={`Contact form: tab step ${value}`}
      className={cn(
        "h-9 flex-1 rounded-full text-xs font-black uppercase tracking-wide transition",
        active ? "bg-white text-black/80 shadow-[0_2px_0_rgba(0,0,0,0.08)]" : "text-black/55 hover:bg-white/70"
      )}
    >
      Pasul {value}
    </button>
  );
});

const AddonOption = memo(function AddonOption({
  addon,
  checked,
  onToggle,
}: {
  addon: string;
  checked: boolean;
  onToggle: (addon: string) => void;
}) {
  return (
    <label
      className="flex cursor-pointer items-center gap-3 rounded-2xl bg-white px-4 py-3 text-sm text-black/75 ring-1 ring-black/10"
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={() => onToggle(addon)}
        className="h-4 w-4"
      />
      <span className="font-medium">{addon}</span>
    </label>
  );
});

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string>("");
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const abandonSentRef = useRef(false);
  const latestStepRef = useRef<1 | 2 | 3>(1);
  const latestStatusRef = useRef<Status>("idle");
  const latestProgressRef = useRef(0);
  const hasTrackedStepViewRef = useRef<Set<number>>(new Set());
  const hasTrackedSubmitSuccessRef = useRef(false);

  const pushEvent = useCallback((payload: Record<string, unknown>) => {
    const event = payload.event;
    if (typeof event !== "string") return;
    pushAnalyticsEvent(payload as { event: string; [key: string]: unknown });
  }, []);

  const [form, setForm] = useState(createInitialForm);
  const onStepSelect = useCallback((nextStep: 1 | 2 | 3) => {
    setStep((prev) => (prev === nextStep ? prev : nextStep));
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    let draftForm: ReturnType<typeof createInitialForm> | null = null;
    let draftStep: 1 | 2 | 3 = 1;

    try {
      const raw = window.sessionStorage.getItem(CONTACT_DRAFT_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as {
          form?: Partial<ReturnType<typeof createInitialForm>>;
          step?: number;
        };
        if (parsed.form && typeof parsed.form === "object") {
          draftForm = {
            ...createInitialForm(),
            ...parsed.form,
            addons: Array.isArray(parsed.form.addons) ? parsed.form.addons : [],
          };
        }
        if (parsed.step === 1 || parsed.step === 2 || parsed.step === 3) {
          draftStep = parsed.step;
        }
      }
    } catch {
      // no-op
    }

    const searchParams = new URLSearchParams(window.location.search);
    const date = searchParams.get("date") ?? "";
    const location = searchParams.get("location") ?? "";
    const childAge = searchParams.get("childAge") ?? "";
    const guests = searchParams.get("guests") ?? "";

    setForm((prev) => ({
      ...prev,
      ...(draftForm ?? {}),
      date: (draftForm?.date ?? prev.date) || date,
      location: (draftForm?.location ?? prev.location) || location,
      childAge: (draftForm?.childAge ?? prev.childAge) || childAge,
      guests: (draftForm?.guests ?? prev.guests) || guests,
    }));
    if (draftForm) {
      setStep(draftStep);
      pushEvent({
        event: "contact_form_resume",
        label: `Contact form: resumed at step ${draftStep}`,
        step: draftStep,
      });
    }
  }, [pushEvent]);

  const deferredForm = useDeferredValue(form);

  const isValidEmail = useMemo(
    () => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()),
    [form.email]
  );
  const isValidAge = useMemo(() => {
    const age = Number(form.childAge);
    return Number.isFinite(age) && age >= 1 && age <= 16;
  }, [form.childAge]);
  const canSend = useMemo(() => {
    const email = deferredForm.email.trim();
    const age = Number(deferredForm.childAge);
    return (
      deferredForm.name.trim().length >= 2 &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
      Number.isFinite(age) &&
      age >= 1 &&
      age <= 16 &&
      deferredForm.details.trim().length >= 10
    );
  }, [deferredForm]);
  const canGoStep2 = form.name.trim().length >= 2 && isValidEmail && isValidAge;
  const canGoStep3 = form.location.trim().length > 0 || form.date.trim().length > 0;

  const toggleAddon = useCallback((addon: string) => {
    setForm((f) => {
      const exists = f.addons.includes(addon);
      return {
        ...f,
        addons: exists ? f.addons.filter((a) => a !== addon) : [...f.addons, addon],
      };
    });
  }, []);

  const onFieldChange = useCallback(
    (
      e:
        | React.ChangeEvent<HTMLInputElement>
        | React.ChangeEvent<HTMLSelectElement>
        | React.ChangeEvent<HTMLTextAreaElement>
    ) => {
      const { name, value } = e.target;
      setForm((prev) => {
        if (!(name in prev)) return prev;
        if (prev[name as keyof typeof prev] === value) return prev;
        return { ...prev, [name]: value };
      });
    },
    []
  );
  const onFieldBlur = useCallback(
    (
      e:
        | React.ChangeEvent<HTMLInputElement>
        | React.ChangeEvent<HTMLSelectElement>
        | React.ChangeEvent<HTMLTextAreaElement>
        | React.FocusEvent<HTMLInputElement>
        | React.FocusEvent<HTMLSelectElement>
        | React.FocusEvent<HTMLTextAreaElement>
    ) => {
      const { name } = e.target;
      setTouched((prev) => (prev[name] ? prev : { ...prev, [name]: true }));
    },
    []
  );

  const nameError =
    touched.name && form.name.trim().length < 2
      ? "Numele trebuie să aibă cel puțin 2 caractere."
      : "";
  const emailError =
    touched.email && !isValidEmail
      ? "Introdu o adresă de email validă."
      : "";
  const ageError =
    touched.childAge && !isValidAge
      ? "Vârsta trebuie să fie între 1 și 16 ani."
      : "";
  const detailsError =
    touched.details && form.details.trim().length < 10
      ? "Adaugă cel puțin 10 caractere la detalii."
      : "";

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = (await res.json()) as { ok: boolean; error?: string };
      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Eroare la trimitere.");
      }

      setStatus("success");
      setMessage("Mulțumim! Am primit cererea ta și revenim curând.");
      setStep(1);
      setForm(createInitialForm());
      if (typeof window !== "undefined") {
        window.sessionStorage.removeItem(CONTACT_DRAFT_KEY);
        const prev = Number(window.localStorage.getItem(CONTACT_SUCCESS_KEY) ?? "0");
        window.localStorage.setItem(CONTACT_SUCCESS_KEY, String(Number.isFinite(prev) ? prev + 1 : 1));
      }
      if (!hasTrackedSubmitSuccessRef.current) {
        hasTrackedSubmitSuccessRef.current = true;
        pushEvent({
          event: "contact_form_submit_success",
          label: "Contact form: submit success",
          completion_score: latestProgressRef.current,
        });
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Eroare neașteptată.";
      setStatus("error");
      setMessage(msg);
      pushEvent({
        event: "contact_form_submit_error",
        label: "Contact form: submit error",
        step,
        error_message: msg,
      });
    }
  }

  const whatsAppHref = useMemo(() => {
    const text = `Bună! Vreau o rezervare pentru ${form.eventType}. Vârsta copilului: ${form.childAge}. Data: ${form.date || ""} ${form.time || ""}`.trim();
    return toWhatsAppLink(siteConfig.whatsapp, text);
  }, [form.childAge, form.date, form.eventType, form.time]);

  const selectedAddons = useMemo(() => new Set(form.addons), [form.addons]);
  const completionScore = useMemo(() => {
    let score = 0;
    if (deferredForm.name.trim()) score += 1;
    if (deferredForm.email.trim()) score += 1;
    if (deferredForm.phone.trim()) score += 1;
    if (deferredForm.childAge.trim()) score += 1;
    if (deferredForm.date.trim()) score += 1;
    if (deferredForm.location.trim()) score += 1;
    if (deferredForm.details.trim()) score += 1;
    if (deferredForm.addons.length > 0) score += 1;
    return score;
  }, [deferredForm]);

  useEffect(() => {
    latestStepRef.current = step;
    latestStatusRef.current = status;
    latestProgressRef.current = completionScore;
  }, [completionScore, status, step]);

  useEffect(() => {
    function sendAbandon() {
      if (abandonSentRef.current) return;
      if (latestStatusRef.current === "success") return;
      if (latestProgressRef.current === 0) return;
      abandonSentRef.current = true;
      try {
        (window as Window & { dataLayer?: Array<Record<string, unknown>> }).dataLayer ??= [];
        (window as Window & { dataLayer?: Array<Record<string, unknown>> }).dataLayer?.push({
          event: "contact_form_abandon",
          label: `Contact form: abandon at step ${latestStepRef.current}`,
          step: latestStepRef.current,
          completion_score: latestProgressRef.current,
          ts: Date.now(),
        });
      } catch {
        // no-op
      }
    }

    function onVisibilityChange() {
      if (document.visibilityState === "hidden") sendAbandon();
    }

    window.addEventListener("pagehide", sendAbandon);
    window.addEventListener("beforeunload", sendAbandon);
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      sendAbandon();
      window.removeEventListener("pagehide", sendAbandon);
      window.removeEventListener("beforeunload", sendAbandon);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  useEffect(() => {
    if (hasTrackedStepViewRef.current.has(step)) return;
    hasTrackedStepViewRef.current.add(step);
    pushEvent({
      event: "contact_form_step_view",
      label: `Contact form: step ${step} viewed`,
      step,
    });
  }, [pushEvent, step]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (status === "success") return;
    const id = window.setTimeout(() => {
      try {
        window.sessionStorage.setItem(
          CONTACT_DRAFT_KEY,
          JSON.stringify({
            step,
            form: deferredForm,
            ts: Date.now(),
          })
        );
      } catch {
        // no-op
      }
    }, 400);

    return () => window.clearTimeout(id);
  }, [deferredForm, status, step]);

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-3xl border border-black/10 bg-white p-7 shadow-sm"
    >
      {status === "success" ? (
        <div className="mb-6 rounded-3xl border border-emerald-200 bg-gradient-to-br from-emerald-50 via-yellow-50 to-sky-50 p-6">
          <div className="flex flex-col gap-2">
            <p className="inline-flex w-fit items-center rounded-full bg-emerald-500 px-3 py-1 text-xs font-semibold text-white">
              Trimisa cu succes
            </p>
            <h3 className="text-xl font-semibold tracking-tight">
              Super! Am primit cererea ta.
            </h3>
            <p className="text-sm text-black/70">
              Revenim cât de repede putem. Dacă vrei confirmare rapidă, scrie-ne pe
              WhatsApp.
            </p>
          </div>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <ButtonAnchor
              href={whatsAppHref}
              target="_blank"
              rel="noreferrer"
              variant="secondary"
              className="justify-center"
            >
              WhatsApp (rapid)
            </ButtonAnchor>
            <Button
              type="button"
              variant="outline"
              className="justify-center"
              onClick={() => {
                setStatus("idle");
                setMessage("");
              }}
            >
              Trimite încă o cerere
            </Button>
          </div>
        </div>
      ) : null}

      <div className="mb-5 flex items-center gap-2 rounded-full border border-black/10 bg-zinc-50 p-1">
        {stepOptions.map((s) => (
          <StepTabButton
            key={s}
            value={s}
            active={step === s}
            onSelect={onStepSelect}
          />
        ))}
      </div>

      {step === 1 ? (
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Nume *">
            <input
              name="name"
              className={cn(
                "h-11 w-full rounded-2xl border border-black/15 px-4 text-sm outline-none focus:border-black/35",
                nameError ? "border-rose-400 focus:border-rose-500" : ""
              )}
              value={form.name}
              onChange={onFieldChange}
              onBlur={onFieldBlur}
              autoComplete="name"
              required
            />
            {nameError ? <p className="mt-1 text-xs font-semibold text-rose-700">{nameError}</p> : null}
          </Field>
          <Field label="Email *">
            <input
              name="email"
              type="email"
              className={cn(
                "h-11 w-full rounded-2xl border border-black/15 px-4 text-sm outline-none focus:border-black/35",
                emailError ? "border-rose-400 focus:border-rose-500" : ""
              )}
              value={form.email}
              onChange={onFieldChange}
              onBlur={onFieldBlur}
              autoComplete="email"
              required
            />
            {emailError ? <p className="mt-1 text-xs font-semibold text-rose-700">{emailError}</p> : null}
          </Field>
          <Field label="Telefon">
            <input
              name="phone"
              className="h-11 w-full rounded-2xl border border-black/15 px-4 text-sm outline-none focus:border-black/35"
              value={form.phone}
              onChange={onFieldChange}
              onBlur={onFieldBlur}
              autoComplete="tel"
            />
          </Field>
          <Field label="Vârsta copilului *">
            <input
              name="childAge"
              inputMode="numeric"
              placeholder="ex: 6"
              className={cn(
                "h-11 w-full rounded-2xl border border-black/15 px-4 text-sm outline-none focus:border-black/35",
                ageError ? "border-rose-400 focus:border-rose-500" : ""
              )}
              value={form.childAge}
              onChange={onFieldChange}
              onBlur={onFieldBlur}
              required
            />
            {ageError ? <p className="mt-1 text-xs font-semibold text-rose-700">{ageError}</p> : null}
          </Field>
        </div>
      ) : null}

      {step === 2 ? (
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Tip eveniment">
            <select
              name="eventType"
              className="h-11 w-full rounded-2xl border border-black/15 bg-white px-4 text-sm outline-none focus:border-black/35"
              value={form.eventType}
              onChange={onFieldChange}
              onBlur={onFieldBlur}
            >
              {eventTypeOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Temă / personaj">
            <select
              name="theme"
              className="h-11 w-full rounded-2xl border border-black/15 bg-white px-4 text-sm outline-none focus:border-black/35"
              value={form.theme}
              onChange={onFieldChange}
              onBlur={onFieldBlur}
            >
              {themeOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Data">
            <input
              name="date"
              type="date"
              className="h-11 w-full rounded-2xl border border-black/15 px-4 text-sm outline-none focus:border-black/35"
              value={form.date}
              onChange={onFieldChange}
              onBlur={onFieldBlur}
            />
          </Field>
          <Field label="Ora (opțional)">
            <input
              name="time"
              type="time"
              className="h-11 w-full rounded-2xl border border-black/15 px-4 text-sm outline-none focus:border-black/35"
              value={form.time}
              onChange={onFieldChange}
              onBlur={onFieldBlur}
            />
          </Field>
          <Field label="Copii (număr estimativ)">
            <input
              name="guests"
              inputMode="numeric"
              placeholder="ex: 12"
              className="h-11 w-full rounded-2xl border border-black/15 px-4 text-sm outline-none focus:border-black/35"
              value={form.guests}
              onChange={onFieldChange}
              onBlur={onFieldBlur}
            />
          </Field>
          <Field label="Durată">
            <select
              name="duration"
              className="h-11 w-full rounded-2xl border border-black/15 bg-white px-4 text-sm outline-none focus:border-black/35"
              value={form.duration}
              onChange={onFieldChange}
              onBlur={onFieldBlur}
            >
              {durationOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </Field>
          <div className="sm:col-span-2">
            <Field label="Locație">
              <input
                name="location"
                placeholder="București/Ilfov sau link locație (Google Maps ajută)"
                className="h-11 w-full rounded-2xl border border-black/15 px-4 text-sm outline-none focus:border-black/35"
                value={form.location}
                onChange={onFieldChange}
                onBlur={onFieldBlur}
              />
            </Field>
          </div>
        </div>
      ) : null}

      {step === 3 ? (
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Field label="Opționale (bifează ce îți dorești)">
              <div className="grid gap-3 rounded-3xl border border-black/10 bg-zinc-50 p-4 sm:grid-cols-2">
                {addonOptions.map((addon) => (
                  <AddonOption
                    key={addon}
                    addon={addon}
                    checked={selectedAddons.has(addon)}
                    onToggle={toggleAddon}
                  />
                ))}
              </div>
            </Field>
          </div>
          <div className="sm:col-span-2">
            <Field label="Detalii *">
              <textarea
                name="details"
                placeholder="Orice detaliu util: spațiu (acasă/loc de joacă), număr adulți, muzică, preferințe, alergii etc."
                className="min-h-[140px] w-full resize-y rounded-2xl border border-black/15 px-4 py-3 text-sm outline-none focus:border-black/35"
                value={form.details}
                onChange={onFieldChange}
                onBlur={onFieldBlur}
                required
              />
              {detailsError ? <p className="mt-1 text-xs font-semibold text-rose-700">{detailsError}</p> : null}
            </Field>
          </div>
        </div>
      ) : null}

      {/* honeypot */}
      <div className="hidden">
        <label>
          Company
          <input
            name="company"
            value={form.company}
            onChange={onFieldChange}
            tabIndex={-1}
            autoComplete="off"
          />
        </label>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p
          className={cn(
            "text-sm",
            status === "success"
              ? "text-emerald-700"
              : status === "error"
                ? "text-rose-700"
                : "text-black/60"
          )}
        >
          {message ||
            (step === 1
              ? "Completează datele de bază ca să mergi la pasul următor."
              : step === 2
                ? "Adaugă cel puțin data sau locația pentru recomandări mai bune."
                : "Completează detaliile obligatorii (*) ca să trimitem.")}
        </p>
        <div className="flex items-center gap-2">
          {step > 1 ? (
            <Button
              type="button"
              variant="outline"
              data-track="contact_step_prev"
              data-track-label={`Contact form: back from step ${step}`}
              onClick={() => setStep((s) => (s > 1 ? ((s - 1) as 1 | 2 | 3) : s))}
            >
              Înapoi
            </Button>
          ) : null}
          {step < 3 ? (
            <Button
              type="button"
              disabled={(step === 1 && !canGoStep2) || (step === 2 && !canGoStep3)}
              data-track="contact_step_next"
              data-track-label={`Contact form: next from step ${step}`}
              onClick={() => {
                if (step === 1 && !canGoStep2) {
                  setTouched((prev) => ({
                    ...prev,
                    name: true,
                    email: true,
                    childAge: true,
                  }));
                  pushEvent({
                    event: "contact_form_step_blocked",
                    label: "Contact form: step 1 blocked",
                    step: 1,
                  });
                  return;
                }
                if (step === 2 && !canGoStep3) {
                  setTouched((prev) => ({
                    ...prev,
                    date: true,
                    location: true,
                  }));
                  pushEvent({
                    event: "contact_form_step_blocked",
                    label: "Contact form: step 2 blocked",
                    step: 2,
                  });
                  return;
                }
                setStep((s) => (s < 3 ? ((s + 1) as 1 | 2 | 3) : s));
              }}
            >
              Continuă
            </Button>
          ) : (
            <Button
              type="submit"
              disabled={!canSend || status === "sending"}
              data-track="submit_contact"
              data-track-label="Contact form submit step 3"
            >
              {status === "sending" ? "Se trimite..." : "Trimite"}
            </Button>
          )}
        </div>
      </div>
    </form>
  );
}
