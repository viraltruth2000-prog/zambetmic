"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/Button";
import { ButtonLink } from "@/components/ui/Button";
import { siteConfig } from "@/lib/site";
import { toWhatsAppLink } from "@/lib/whatsapp";

export function QuickQuoteForm() {
  const [eventDate, setEventDate] = useState("");
  const [location, setLocation] = useState("");
  const [childAge, setChildAge] = useState("");
  const [guests, setGuests] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const prefillHref = `/contact?date=${encodeURIComponent(eventDate)}&location=${encodeURIComponent(
    location
  )}&childAge=${encodeURIComponent(childAge)}&guests=${encodeURIComponent(guests)}`;

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!eventDate.trim() || !location.trim()) {
      setError("Completează data și locația pentru a primi oferta rapidă.");
      return;
    }

    setIsSubmitting(true);

    const message =
      "Buna! Vreau oferta rapida pentru petrecere.\n" +
      `Data: ${eventDate || "-"}\n` +
      `Locatie: ${location || "-"}\n` +
      `Varsta copil: ${childAge || "-"}\n` +
      `Numar invitati: ${guests || "-"}`;

    window.location.href = toWhatsAppLink(siteConfig.whatsapp, message);
  };

  return (
    <form onSubmit={onSubmit} className="mt-6 grid gap-3 sm:grid-cols-2">
      <label className="text-left">
        <span className="mb-1 block text-xs font-black uppercase tracking-wide text-black/65">
          Data
        </span>
        <input
          type="date"
          value={eventDate}
          onChange={(e) => setEventDate(e.target.value)}
          required
          className="h-11 w-full rounded-2xl border-2 border-black/10 bg-white px-3 text-sm font-semibold text-black/80 outline-none focus:border-sky-400"
        />
      </label>

      <label className="text-left">
        <span className="mb-1 block text-xs font-black uppercase tracking-wide text-black/65">
          Locatie
        </span>
        <input
          type="text"
          placeholder="Ex: Sector 3"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
          className="h-11 w-full rounded-2xl border-2 border-black/10 bg-white px-3 text-sm font-semibold text-black/80 outline-none focus:border-sky-400"
        />
      </label>

      <label className="text-left">
        <span className="mb-1 block text-xs font-black uppercase tracking-wide text-black/65">
          Varsta copil
        </span>
        <input
          type="text"
          placeholder="Ex: 6 ani"
          value={childAge}
          onChange={(e) => setChildAge(e.target.value)}
          className="h-11 w-full rounded-2xl border-2 border-black/10 bg-white px-3 text-sm font-semibold text-black/80 outline-none focus:border-sky-400"
        />
      </label>

      <label className="text-left">
        <span className="mb-1 block text-xs font-black uppercase tracking-wide text-black/65">
          Invitati
        </span>
        <input
          type="text"
          placeholder="Ex: 12 copii"
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
          className="h-11 w-full rounded-2xl border-2 border-black/10 bg-white px-3 text-sm font-semibold text-black/80 outline-none focus:border-sky-400"
        />
      </label>

      <div className="sm:col-span-2 space-y-2">
        <Button
          type="submit"
          size="lg"
          className="w-full justify-center"
          disabled={isSubmitting}
          data-track="open_whatsapp"
          data-track-label="Quick quote submit"
        >
          {isSubmitting ? "Se deschide WhatsApp..." : "Trimite pe WhatsApp"}
        </Button>
        <ButtonLink
          href={prefillHref}
          variant="outline"
          size="lg"
          className="w-full justify-center"
          data-track="open_contact_prefill"
          data-track-label="Quick quote to contact"
        >
          Continuă în formularul complet
        </ButtonLink>
        {error ? (
          <p className="mt-2 text-left text-xs font-bold text-rose-600">{error}</p>
        ) : null}
      </div>
    </form>
  );
}
