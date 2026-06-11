import nodemailer from "nodemailer";

export const runtime = "nodejs";

type ContactPayload = {
  fullName: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  website?: string;
};

const SERVICE_LABELS: Record<string, string> = {
  publishing: "Full Publishing Package",
  editing: "Editing & Proofreading",
  design: "Cover Design & Formatting",
  marketing: "Book Marketing",
  ghostwriting: "Ghostwriting",
  other: "Other / Not Sure",
};

function clean(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(request: Request) {
  let body: Partial<ContactPayload>;

  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const payload: ContactPayload = {
    fullName: clean(body.fullName),
    email: clean(body.email),
    phone: clean(body.phone),
    service: clean(body.service),
    message: clean(body.message),
    website: clean(body.website),
  };

  if (payload.website) {
    return Response.json({ ok: true });
  }

  if (
    !payload.fullName ||
    !isValidEmail(payload.email) ||
    !payload.phone ||
    !payload.service ||
    !payload.message
  ) {
    return Response.json(
      { error: "Please complete all required fields." },
      { status: 400 }
    );
  }

  const host = process.env.ZOHO_SMTP_HOST;
  const port = Number(process.env.ZOHO_SMTP_PORT || 465);
  const user = process.env.ZOHO_SMTP_USER;
  const pass = process.env.ZOHO_SMTP_PASS;
  const from = process.env.ZOHO_SMTP_FROM || user;
  const to = process.env.CONTACT_TO || user;

  if (!host || !user || !pass || !from || !to) {
    return Response.json(
      { error: "Contact email is not configured." },
      { status: 500 }
    );
  }

  const serviceLabel = SERVICE_LABELS[payload.service] || payload.service;

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  try {
    await transporter.sendMail({
      from: `"Ebook Visionary Publishing" <${from}>`,
      to,
      replyTo: payload.email,
      subject: `New contact form submission from ${payload.fullName}`,
      text: [
        "New contact form submission",
        "",
        `Name: ${payload.fullName}`,
        `Email: ${payload.email}`,
        `Phone: ${payload.phone}`,
        `Service: ${serviceLabel}`,
        "",
        "Message:",
        payload.message,
      ].join("\n"),
      html: `
        <div style="font-family:Arial,sans-serif;color:#0f172a;line-height:1.6">
          <h2 style="margin:0 0 16px">New contact form submission</h2>
          <p><strong>Name:</strong> ${escapeHtml(payload.fullName)}</p>
          <p><strong>Email:</strong> ${escapeHtml(payload.email)}</p>
          <p><strong>Phone:</strong> ${escapeHtml(payload.phone)}</p>
          <p><strong>Service:</strong> ${escapeHtml(serviceLabel)}</p>
          <p><strong>Message:</strong></p>
          <p>${escapeHtml(payload.message).replace(/\n/g, "<br />")}</p>
        </div>
      `,
    });

    return Response.json({ ok: true });
  } catch (error) {
    console.error("Contact form email failed:", error);
    return Response.json(
      { error: "Message could not be sent right now." },
      { status: 500 }
    );
  }
}
