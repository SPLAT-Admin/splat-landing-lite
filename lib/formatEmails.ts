export const EmailTemplates = {
  adminSignup: (email: string) => `
    <h2>🆕 New SPL@T Signup</h2>
    <p><b>Email:</b> ${email}</p>
    <p>Saved to marketing.email_signups</p>
  `,
  adminContact: (data: { name: string; email: string; message: string }) => `
    <h2>📩 New Contact Message</h2>
    <p><b>Name:</b> ${data.name}</p>
    <p><b>Email:</b> ${data.email}</p>
    <p><b>Message:</b></p>
    <blockquote>${data.message}</blockquote>
  `,
  adminAmbassador: (data: { first_name: string; last_name: string; email: string; qualifications_why: string }) => `
    <h2>🌟 New Ambassador Application</h2>
    <p><b>Name:</b> ${data.first_name} ${data.last_name}</p>
    <p><b>Email:</b> ${data.email}</p>
    <p><b>Why:</b></p>
    <blockquote>${data.qualifications_why}</blockquote>
  `,
  userThanks: (context: "signup" | "contact" | "ambassador") => {
    const titles = {
      signup: "Welcome to SPL@T 💦",
      contact: "We got your message 💌",
      ambassador: "Thanks for applying to the SPL@T Ambassador Program 🌈",
    } as const;
    const messages = {
      signup: "You’re officially on the list! Expect updates and special perks soon.",
      contact: "Our team will reach out shortly — thanks for connecting with SPL@T.",
      ambassador: "We’re reviewing your application. Expect to hear back within a few days.",
    } as const;
    return `
      <div style="font-family:Inter,system-ui,sans-serif;color:#111">
        <h2 style="color:#b10000;margin-bottom:8px;">${titles[context]}</h2>
        <p style="margin-bottom:12px;">${messages[context]}</p>
        <p style="font-size:12px;color:#555;">Love,<br>The SPL@T Team</p>
      </div>
    `;
  },
};
