import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Sends dynamic confirmation emails via Resend for any form type
 * @param type - 'signup' | 'contact' | 'ambassador'
 * @param email - Recipient email
 * @param name - Optional name for personalization
 */
export async function sendConfirmationEmail(
  type: "signup" | "contact" | "ambassador",
  email: string,
  name?: string
) {
  const subjects = {
    signup: "Welcome to SPL@T 💋 You're on the list!",
    contact: "Thanks for reaching out to SPL@T 💌",
    ambassador: "We got your SPL@T Ambassador application 🌟",
  } as const;

  const bodies = {
    signup: `
      <h2>Hey ${name || "there"} 💦</h2>
      <p>You’re officially on the SPL@T list. We’ll be sliding updates, launches, and special drops your way soon.</p>
      <p>In the meantime, explore our <a href="https://www.usesplat.com/merch" target="_blank">merch shop</a> for exclusive pieces.</p>
      <br><p>Stay wet, stay ready — <strong>SPL@T Team 💋</strong></p>
    `,
    contact: `
      <h2>Hey ${name || "gorgeous"} 👋</h2>
      <p>We’ve received your message — our crew will be in touch soon.</p>
      <p>If it’s urgent, hit us up directly on <a href="https://www.instagram.com/usesplat" target="_blank">@usesplat</a>.</p>
      <br><p>With love, <strong>The SPL@T Team 💌</strong></p>
    `,
    ambassador: `
      <h2>Hey ${name || "superstar"} 🌟</h2>
      <p>Your SPL@T Ambassador application was received and is being reviewed by our team.</p>
      <p>We’ll reach out if you’re selected to represent the brand — and trust us, you’ll want that call.</p>
      <br><p>Keep it bold — <strong>The SPL@T Team 💅</strong></p>
    `,
  } as const;

  try {
    const result = await resend.emails.send({
      from: "SPL@T <noreply@usesplat.com>",
      to: [email],
      subject: subjects[type],
      html: bodies[type],
      tags: [
        { name: "form_type", value: type },
        { name: "environment", value: process.env.NODE_ENV || "development" },
      ],
    });

    console.log(`✅ Resend: ${type} email sent → ${email}`);
    return result;
  } catch (error) {
    console.error("🚨 Resend email error:", error);
    throw new Error("Failed to send email");
  }
}
