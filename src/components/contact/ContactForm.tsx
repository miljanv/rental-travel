"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { submitInquiry, type ContactState } from "@/app/kontakt/actions";
import { categories } from "@/lib/site";
import { cn } from "@/lib/cn";

const initialState: ContactState = { status: "idle", message: "" };

const fieldClass =
  "w-full border border-sand bg-white px-5 py-4 font-body text-[15px] text-ink placeholder:text-ink-mute/60 transition-colors focus:border-brand focus:outline-none";

const labelClass =
  "mb-2 block font-label text-[12px] tracking-[0.2em] text-ink uppercase";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="btn btn--brand disabled:opacity-60"
    >
      <span className="btn-text">
        {pending ? "Šalje se…" : "Pošaljite upit"}
      </span>
    </button>
  );
}

export function ContactForm() {
  const [state, formAction] = useActionState(submitInquiry, initialState);
  const errors = state.fieldErrors ?? {};

  return (
    <form action={formAction} className="grid gap-6 sm:grid-cols-2">
      <div>
        <label htmlFor="name" className={labelClass}>
          Ime i prezime *
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          autoComplete="name"
          placeholder="Vaše ime"
          aria-invalid={Boolean(errors.name)}
          className={cn(fieldClass, errors.name && "border-brand")}
        />
        {errors.name && (
          <p className="mt-2 text-[13px] text-brand">{errors.name}</p>
        )}
      </div>

      <div>
        <label htmlFor="phone" className={labelClass}>
          Telefon *
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          required
          autoComplete="tel"
          placeholder="06x xxx xxxx"
          aria-invalid={Boolean(errors.phone)}
          className={cn(fieldClass, errors.phone && "border-brand")}
        />
        {errors.phone && (
          <p className="mt-2 text-[13px] text-brand">{errors.phone}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className={labelClass}>
          E-mail *
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="vas@email.com"
          aria-invalid={Boolean(errors.email)}
          className={cn(fieldClass, errors.email && "border-brand")}
        />
        {errors.email && (
          <p className="mt-2 text-[13px] text-brand">{errors.email}</p>
        )}
      </div>

      <div>
        <label htmlFor="service" className={labelClass}>
          Usluga
        </label>
        <select id="service" name="service" className={fieldClass}>
          <option value="">Izaberite uslugu</option>
          {categories.map((category) => (
            <option key={category.slug} value={category.title}>
              {category.title}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="passengers" className={labelClass}>
          Broj putnika
        </label>
        <input
          id="passengers"
          name="passengers"
          type="number"
          min={1}
          max={200}
          placeholder="npr. 45"
          className={fieldClass}
        />
      </div>

      <div>
        <label htmlFor="date" className={labelClass}>
          Datum putovanja
        </label>
        <input id="date" name="date" type="date" className={fieldClass} />
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="message" className={labelClass}>
          Vaš upit *
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          placeholder="Relacija, datum, broj putnika i sve ostalo što je važno za ponudu…"
          aria-invalid={Boolean(errors.message)}
          className={cn(fieldClass, "resize-y", errors.message && "border-brand")}
        />
        {errors.message && (
          <p className="mt-2 text-[13px] text-brand">{errors.message}</p>
        )}
      </div>

      {state.status !== "idle" && state.message && (
        <p
          role="status"
          className={cn(
            "border-l-2 px-5 py-4 text-[15px] sm:col-span-2",
            state.status === "success"
              ? "border-sky bg-sky/5 text-ink"
              : "border-brand bg-brand/5 text-ink"
          )}
        >
          {state.message}
        </p>
      )}

      <div className="sm:col-span-2">
        <SubmitButton />
      </div>
    </form>
  );
}
