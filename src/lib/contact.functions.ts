import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const OWNER_EMAIL = "shlokvyas9999@gmail.com";
const MAX_FILES = 3;
const MAX_FILE_BYTES = 4 * 1024 * 1024;

const fileSchema = z.object({
  name: z.string().min(1).max(200),
  type: z.string().max(100),
  base64: z.string().max(Math.ceil((MAX_FILE_BYTES * 4) / 3) + 8),
});

export const contactSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(30).regex(/^[0-9+\-\s()]*$/).optional().default(""),
  service: z.string().trim().min(1).max(100),
  message: z.string().trim().min(10).max(2000),
  files: z.array(fileSchema).max(MAX_FILES).default([]),
});

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export const submitContact = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => contactSchema.parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const id = crypto.randomUUID();

    // 1. Upload files
    const stored: { name: string; path: string; url: string | null }[] = [];
    for (const [i, f] of data.files.entries()) {
      const bytes = Uint8Array.from(atob(f.base64), (c) => c.charCodeAt(0));
      if (bytes.byteLength > MAX_FILE_BYTES) throw new Error("File too large");
      const safe = f.name.replace(/[^a-zA-Z0-9._-]/g, "_");
      const path = `${id}/${i}-${safe}`;
      const { error } = await supabaseAdmin.storage
        .from("contact-uploads")
        .upload(path, bytes, { contentType: f.type || "application/octet-stream" });
      if (error) throw new Error("Could not upload file");
      const { data: signed } = await supabaseAdmin.storage
        .from("contact-uploads")
        .createSignedUrl(path, 60 * 60 * 24 * 30);
      stored.push({ name: f.name, path, url: signed?.signedUrl ?? null });
    }

    // 2. Save submission
    const { error: insertError } = await supabaseAdmin.from("contact_submissions").insert({
      id,
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      service: data.service,
      message: data.message,
      files: stored.map(({ name, path }) => ({ name, path })),
    });
    if (insertError) {
      console.error("Insert failed", insertError);
      throw new Error("Could not save submission");
    }

    // 3. Notify owner via Resend
    let emailSent = false;
    const LOVABLE_API_KEY = process.env["LOVABLE_API_KEY"];
    const RESEND_API_KEY = process.env["RESEND_API_KEY"];
    if (LOVABLE_API_KEY && RESEND_API_KEY) {
      const filesHtml = stored.length
        ? `<ul>${stored.map((f) => `<li>${f.url ? `<a href="${esc(f.url)}">${esc(f.name)}</a>` : esc(f.name)}</li>`).join("")}</ul>`
        : "<p>None</p>";
      const html = `<h2>New project enquiry — SHLOFLOW AI</h2>
<p><b>Name:</b> ${esc(data.name)}<br/><b>Email:</b> ${esc(data.email)}<br/><b>Phone:</b> ${esc(data.phone || "—")}<br/><b>Service:</b> ${esc(data.service)}</p>
<p><b>Project details:</b></p><p style="white-space:pre-wrap">${esc(data.message)}</p>
<p><b>Files:</b></p>${filesHtml}`;
      const res = await fetch("https://connector-gateway.lovable.dev/resend/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "X-Connection-Api-Key": RESEND_API_KEY,
        },
        body: JSON.stringify({
          from: "SHLOFLOW AI Website <onboarding@resend.dev>",
          to: [OWNER_EMAIL],
          reply_to: data.email,
          subject: `New enquiry: ${data.service} — ${data.name}`,
          html,
          attachments: data.files.map((f) => ({ filename: f.name, content: f.base64 })),
        }),
      });
      if (res.ok) {
        emailSent = true;
        await supabaseAdmin.from("contact_submissions").update({ email_sent: true }).eq("id", id);
      } else {
        console.error(`Resend failed [${res.status}]: ${await res.text()}`);
      }
    } else {
      console.error("Resend not configured; submission saved without email");
    }

    return { ok: true as const, id, emailSent };
  });
