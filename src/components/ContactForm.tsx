"use client";

import { useMemo, useState } from "react";
import { Button, ButtonAnchor } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { siteConfig } from "@/lib/site";
import { toWhatsAppLink } from "@/lib/whatsapp";

type Status = "idle" | "sending" | "success" | "error";

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

const addonOptions = [
  "Face painting",
  "Baloane modelabile",
  "Piniata",
  "Bubble show",
  "Atelier (slime/brățări)",
  "Premii pentru concursuri",
] as const;

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

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string>("");

  const [form, setForm] = useState({
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
    company: "", // honeypot
  });

  const canSend = useMemo(() => {
    const email = form.email.trim();
    const age = Number(form.childAge);
    return (
      form.name.trim().length >= 2 &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
      Number.isFinite(age) &&
      age >= 1 &&
      age <= 16 &&
      form.details.trim().length >= 10
    );
  }, [form]);

  function toggleAddon(addon: string) {
    setForm((f) => {
      const exists = f.addons.includes(addon);
      return {
        ...f,
        addons: exists ? f.addons.filter((a) => a !== addon) : [...f.addons, addon],
      };
    });
  }

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
      setForm({
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
        addons: [],
        location: "",
        details: "",
        company: "",
      });
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Eroare neașteptată.");
    }
  }

  const whatsAppHref = useMemo(() => {
    const text = `Bună! Vreau o rezervare pentru ${form.eventType}. Vârsta copilului: ${form.childAge}. Data: ${form.date || ""} ${form.time || ""}`.trim();
    return toWhatsAppLink(siteConfig.whatsapp, text);
  }, [form.childAge, form.date, form.eventType, form.time]);

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

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Nume *">
          <input
            className="h-11 w-full rounded-2xl border border-black/15 px-4 text-sm outline-none focus:border-black/35"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            autoComplete="name"
            required
          />
        </Field>
        <Field label="Email *">
          <input
            type="email"
            className="h-11 w-full rounded-2xl border border-black/15 px-4 text-sm outline-none focus:border-black/35"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            autoComplete="email"
            required
          />
        </Field>
        <Field label="Telefon">
          <input
            className="h-11 w-full rounded-2xl border border-black/15 px-4 text-sm outline-none focus:border-black/35"
            value={form.phone}
            onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
            autoComplete="tel"
          />
        </Field>

        <Field label="Vârsta copilului *">
          <input
            inputMode="numeric"
            placeholder="ex: 6"
            className="h-11 w-full rounded-2xl border border-black/15 px-4 text-sm outline-none focus:border-black/35"
            value={form.childAge}
            onChange={(e) =>
              setForm((f) => ({ ...f, childAge: e.target.value }))
            }
            required
          />
        </Field>

        <Field label="Tip eveniment">
          <select
            className="h-11 w-full rounded-2xl border border-black/15 bg-white px-4 text-sm outline-none focus:border-black/35"
            value={form.eventType}
            onChange={(e) =>
              setForm((f) => ({ ...f, eventType: e.target.value }))
            }
          >
            {[
              "Petrecere aniversară",
              "Grădiniță / Școală",
              "Eveniment corporate (copii)",
              "Alt tip",
            ].map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Temă / personaj">
          <select
            className="h-11 w-full rounded-2xl border border-black/15 bg-white px-4 text-sm outline-none focus:border-black/35"
            value={form.theme}
            onChange={(e) => setForm((f) => ({ ...f, theme: e.target.value }))}
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
            type="date"
            className="h-11 w-full rounded-2xl border border-black/15 px-4 text-sm outline-none focus:border-black/35"
            value={form.date}
            onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
          />
        </Field>

        <Field label="Ora (opțional)">
          <input
            type="time"
            className="h-11 w-full rounded-2xl border border-black/15 px-4 text-sm outline-none focus:border-black/35"
            value={form.time}
            onChange={(e) => setForm((f) => ({ ...f, time: e.target.value }))}
          />
        </Field>

        <Field label="Copii (număr estimativ)">
          <input
            inputMode="numeric"
            placeholder="ex: 12"
            className="h-11 w-full rounded-2xl border border-black/15 px-4 text-sm outline-none focus:border-black/35"
            value={form.guests}
            onChange={(e) =>
              setForm((f) => ({ ...f, guests: e.target.value }))
            }
          />
        </Field>

        <Field label="Durată">
          <select
            className="h-11 w-full rounded-2xl border border-black/15 bg-white px-4 text-sm outline-none focus:border-black/35"
            value={form.duration}
            onChange={(e) =>
              setForm((f) => ({ ...f, duration: e.target.value }))
            }
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
              placeholder="București/Ilfov sau link locație (Google Maps ajută)"
              className="h-11 w-full rounded-2xl border border-black/15 px-4 text-sm outline-none focus:border-black/35"
              value={form.location}
              onChange={(e) =>
                setForm((f) => ({ ...f, location: e.target.value }))
              }
            />
          </Field>
        </div>

        <div className="sm:col-span-2">
          <Field label="Opționale (bifează ce îți dorești)">
            <div className="grid gap-3 rounded-3xl border border-black/10 bg-zinc-50 p-4 sm:grid-cols-2">
              {addonOptions.map((addon) => (
                <label
                  key={addon}
                  className="flex cursor-pointer items-center gap-3 rounded-2xl bg-white px-4 py-3 text-sm text-black/75 ring-1 ring-black/10"
                >
                  <input
                    type="checkbox"
                    checked={form.addons.includes(addon)}
                    onChange={() => toggleAddon(addon)}
                    className="h-4 w-4"
                  />
                  <span className="font-medium">{addon}</span>
                </label>
              ))}
            </div>
          </Field>
        </div>
        <div className="sm:col-span-2">
          <Field label="Detalii *">
            <textarea
              placeholder="Orice detaliu util: spațiu (acasă/loc de joacă), număr adulți, muzică, preferințe, alergii etc."
              className="min-h-[140px] w-full resize-y rounded-2xl border border-black/15 px-4 py-3 text-sm outline-none focus:border-black/35"
              value={form.details}
              onChange={(e) =>
                setForm((f) => ({ ...f, details: e.target.value }))
              }
              required
            />
          </Field>
        </div>
      </div>

      {/* honeypot */}
      <div className="hidden">
        <label>
          Company
          <input
            value={form.company}
            onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
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
          {message || "Completează câmpurile obligatorii (*) ca să trimitem."}
        </p>
        <Button type="submit" disabled={!canSend || status === "sending"}>
          {status === "sending" ? "Se trimite..." : "Trimite"}
        </Button>
      </div>
    </form>
  );
}
