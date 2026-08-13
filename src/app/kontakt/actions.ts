"use server";

import { headers } from "next/headers";
import nodemailer, { type Transporter } from "nodemailer";
import { site } from "@/lib/site";

export type ContactState = {
  status: "idle" | "success" | "error";
  message: string;
  fieldErrors?: Partial<Record<"name" | "email" | "phone" | "message", string>>;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const SUCCESS_MESSAGE =
  "Hvala! Vaš upit je poslat — odgovaramo u najkraćem roku.";

/** Name of the decoy field that only bots fill in. */
const HONEYPOT_FIELD = "website";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 3;

/**
 * Per-IP throttle. Every serverless instance keeps its own map, so this slows
 * bots down rather than guaranteeing a limit — enough for a contact form.
 */
const attempts = new Map<string, number[]>();

function tooManyAttempts(ip: string): boolean {
  const now = Date.now();

  for (const [key, stamps] of attempts) {
    const fresh = stamps.filter((stamp) => now - stamp < WINDOW_MS);
    if (fresh.length === 0) attempts.delete(key);
    else attempts.set(key, fresh);
  }

  const recent = attempts.get(ip) ?? [];
  if (recent.length >= MAX_PER_WINDOW) return true;

  attempts.set(ip, [...recent, now]);
  return false;
}

async function clientIp(): Promise<string | null> {
  const list = await headers();
  const forwarded = list.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || list.get("x-real-ip") || null;
}

/** Reused between warm invocations so we skip the SMTP handshake when possible. */
let transporter: Transporter | null = null;

function mailer(): Transporter | null {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASSWORD;

  if (!host || !user || !pass) return null;

  if (!transporter) {
    const port = Number(process.env.SMTP_PORT ?? 465);
    transporter = nodemailer.createTransport({
      host,
      port,
      // 465 speaks TLS from the first byte; 587 upgrades through STARTTLS.
      secure: port === 465,
      auth: { user, pass },
      // Without these a silent mail server would hold the function open.
      connectionTimeout: 10_000,
      greetingTimeout: 10_000,
      socketTimeout: 15_000,
    });
  }

  return transporter;
}

const HTML_ESCAPES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (char) => HTML_ESCAPES[char] ?? char);
}

export async function submitInquiry(
  _prev: ContactState,
  formData: FormData
): Promise<ContactState> {
  // Answer bots with the success screen so they do not retry with new payloads.
  if (String(formData.get(HONEYPOT_FIELD) ?? "").trim()) {
    return { status: "success", message: SUCCESS_MESSAGE };
  }

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const service = String(formData.get("service") ?? "").trim();
  const passengers = String(formData.get("passengers") ?? "").trim();
  const date = String(formData.get("date") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  const fieldErrors: ContactState["fieldErrors"] = {};
  if (name.length < 2) fieldErrors.name = "Unesite Vaše ime i prezime.";
  if (!EMAIL_PATTERN.test(email))
    fieldErrors.email = "Unesite ispravnu e-mail adresu.";
  if (phone.replace(/\D/g, "").length < 6)
    fieldErrors.phone = "Unesite ispravan broj telefona.";
  if (message.length < 10)
    fieldErrors.message = "Opišite Vaš upit u nekoliko reči.";

  if (Object.keys(fieldErrors).length > 0) {
    return {
      status: "error",
      message: "Molimo ispravite označena polja.",
      fieldErrors,
    };
  }

  // Without an address we would share one bucket between all visitors, so we
  // rather let the request through than block real customers.
  const ip = await clientIp();
  if (ip && tooManyAttempts(ip)) {
    return {
      status: "error",
      message: `Primili smo više upita sa ove adrese. Sačekajte nekoliko minuta ili nas pozovite na ${site.phone}.`,
    };
  }

  const mail = mailer();

  // Without SMTP credentials the form cannot deliver anything, so we tell the
  // visitor to reach us directly instead of pretending it was sent.
  if (!mail) {
    console.error(
      "[kontakt] SMTP_HOST, SMTP_USER ili SMTP_PASSWORD nisu podešeni — upit nije poslat."
    );
    return {
      status: "error",
      message: `Slanje forme trenutno nije aktivno. Pozovite nas na ${site.phone} ili pišite na ${site.email}.`,
    };
  }

  const rows: [string, string][] = [
    ["Ime i prezime", name],
    ["E-mail", email],
    ["Telefon", phone],
  ];
  if (service) rows.push(["Usluga", service]);
  if (passengers) rows.push(["Broj putnika", passengers]);
  if (date) rows.push(["Datum", date]);

  const text = [
    ...rows.map(([label, value]) => `${label}: ${value}`),
    "",
    message,
  ].join("\n");

  const html = `<div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;color:#0c1315">
  <h2 style="margin:0 0 16px;font-size:18px">Novi upit sa sajta</h2>
  <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin-bottom:20px">
    ${rows
      .map(
        ([label, value]) =>
          `<tr><td style="padding:4px 16px 4px 0;color:#6b7280">${escapeHtml(label)}</td><td style="padding:4px 0"><strong>${escapeHtml(value)}</strong></td></tr>`
      )
      .join("")}
  </table>
  <div style="border-left:3px solid #e8112d;padding-left:14px;white-space:pre-wrap">${escapeHtml(message)}</div>
</div>`;

  try {
    await mail.sendMail({
      // Always the authenticated mailbox: Gmail and most providers reject any
      // other sender, so this is not worth making configurable.
      from: `${site.name} <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_TO_EMAIL || site.email,
      replyTo: email,
      subject: service
        ? `Novi upit — ${service} — ${name}`
        : `Novi upit sa sajta — ${name}`,
      text,
      html,
    });
  } catch (error) {
    console.error("[kontakt] SMTP slanje nije uspelo:", error);
    return {
      status: "error",
      message: `Došlo je do greške pri slanju. Pozovite nas na ${site.phone}.`,
    };
  }

  return { status: "success", message: SUCCESS_MESSAGE };
}
