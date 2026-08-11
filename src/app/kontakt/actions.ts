"use server";

import { site } from "@/lib/site";

export type ContactState = {
  status: "idle" | "success" | "error";
  message: string;
  fieldErrors?: Partial<Record<"name" | "email" | "phone" | "message", string>>;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function submitInquiry(
  _prev: ContactState,
  formData: FormData
): Promise<ContactState> {
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

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;

  // Without a configured mail provider the form cannot deliver anything, so we
  // tell the visitor to reach us directly instead of pretending it was sent.
  if (!apiKey || !from) {
    return {
      status: "error",
      message: `Slanje forme trenutno nije aktivno. Pozovite nas na ${site.phone} ili pišite na ${site.email}.`,
    };
  }

  const lines = [
    `Ime i prezime: ${name}`,
    `E-mail: ${email}`,
    `Telefon: ${phone}`,
    service ? `Usluga: ${service}` : null,
    passengers ? `Broj putnika: ${passengers}` : null,
    date ? `Datum: ${date}` : null,
    "",
    message,
  ].filter(Boolean);

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [site.email],
        reply_to: email,
        subject: `Novi upit sa sajta — ${name}`,
        text: lines.join("\n"),
      }),
    });

    if (!response.ok) {
      throw new Error(`Resend responded with ${response.status}`);
    }
  } catch {
    return {
      status: "error",
      message: `Došlo je do greške pri slanju. Pozovite nas na ${site.phone}.`,
    };
  }

  return {
    status: "success",
    message: "Hvala! Vaš upit je poslat — odgovaramo u najkraćem roku.",
  };
}
