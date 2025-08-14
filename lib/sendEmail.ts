import { Resend } from "resend";

export type EmailParams = {
  to: string | string[];
  subject: string;
  html: string;
  cc?: string | string[];
  bcc?: string | string[];
  from?: string; // optional override
};

const resend = new Resend(process.env.RESEND_API_KEY!);
const DEFAULT_FROM = "SPL@T <noreply@usesplat.com>"; // your requested from address

export async function sendEmail(params: EmailParams): Promise<{ success: true; id?: string } | { success: false; error: string }>{
  try {
    const { data, error } = await resend.emails.send({
      from: params.from ?? DEFAULT_FROM,
      to: params.to,
      subject: params.subject,
      html: params.html,
      cc: params.cc,
      bcc: params.bcc,
    } as any);

    if (error) {
      console.error("Resend error:", error);
      return { success: false, error: (error as any)?.message || "send failed" };
    }
    return { success: true, id: (data as any)?.id };
  } catch (e: any) {
    console.error("Resend exception:", e);
    return { success: false, error: e?.message || "send exception" };
  }
}