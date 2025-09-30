import { resend } from "@/lib/resendClient";

const DEFAULT_FROM = "no-reply@usesplat.com";
const UNKNOWN_ERROR = "Unknown Resend error";

type SendEmailParams = {
  to: string;
  subject: string;
  html: string;
};

type SendEmailResult =
  | { success: true; id: string }
  | { success: false; error: string };

/**
 * Sends an email using Resend while normalising the response shape.
 * Always resolves with a deterministic result so callers can trust the outcome.
 */
export async function sendEmail({ to, subject, html }: SendEmailParams): Promise<SendEmailResult> {
  try {
    const { data, error } = await resend.emails.send({
      from: DEFAULT_FROM,
      to,
      subject,
      html,
    });

    if (error) {
      const message =
        typeof error === "object" && error !== null && "message" in error &&
        typeof (error as { message?: unknown }).message === "string"
          ? (error as { message: string }).message
          : UNKNOWN_ERROR;

      return { success: false, error: message };
    }

    const id =
      typeof data === "object" && data !== null && "id" in data &&
      typeof (data as { id?: unknown }).id === "string"
        ? (data as { id: string }).id
        : "";

    return { success: true, id };
  } catch (error: unknown) {
    const message =
      typeof error === "object" && error !== null && "message" in error &&
      typeof (error as { message?: unknown }).message === "string"
        ? (error as { message: string }).message
        : UNKNOWN_ERROR;

    return { success: false, error: message };
  }
}
