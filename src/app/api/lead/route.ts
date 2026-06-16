import { NextRequest } from "next/server";

// Receives a lead from the contact form and forwards it to the Google Sheet
// webhook (a Google Apps Script Web App). Set LEADS_WEBHOOK_URL in your
// environment to the deployed Apps Script URL — see LEADS_SETUP.md.

export const runtime = "nodejs";

type LeadPayload = {
  name?: string;
  email?: string;
  phone?: string;
  city?: string;
  // honeypot — real users never fill this
  company?: string;
};

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

export async function POST(request: NextRequest) {
  let body: LeadPayload;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Bot trap: pretend success but drop the lead.
  if (body.company && body.company.trim() !== "") {
    return Response.json({ ok: true });
  }

  const name = (body.name || "").trim();
  const email = (body.email || "").trim();
  const phone = (body.phone || "").trim();
  const city = (body.city || "").trim();

  if (!name || !email || !phone || !city) {
    return Response.json(
      { ok: false, error: "Please fill in all fields." },
      { status: 400 }
    );
  }
  if (!isEmail(email)) {
    return Response.json(
      { ok: false, error: "Please enter a valid email." },
      { status: 400 }
    );
  }

  const webhook = process.env.LEADS_WEBHOOK_URL;
  if (!webhook) {
    // Fail loudly rather than show a false "thank you" while silently losing
    // the lead. Configure LEADS_WEBHOOK_URL to enable delivery.
    console.error(
      "[lead] LEADS_WEBHOOK_URL is not set — lead NOT saved:",
      { name, email, phone, city }
    );
    return Response.json(
      { ok: false, error: "Lead capture is not configured yet." },
      { status: 503 }
    );
  }

  const lead = {
    name,
    email,
    phone,
    city,
    source: request.headers.get("referer") || "website",
    userAgent: request.headers.get("user-agent") || "",
    // Timestamp is added on the Sheet side so we don't depend on server clock.
  };

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lead),
      // Apps Script can be slow on cold start; give it room.
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) {
      throw new Error(`Webhook responded ${res.status}`);
    }
  } catch (err) {
    console.error("[lead] failed to forward to sheet:", err, { name, email, phone });
    return Response.json(
      { ok: false, error: "Could not submit right now. Please try again or call us." },
      { status: 502 }
    );
  }

  return Response.json({ ok: true });
}
