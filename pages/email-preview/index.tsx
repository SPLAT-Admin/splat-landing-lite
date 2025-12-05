import { useRouter } from "next/router";
import Head from "next/head";
import { useState } from "react";

const templates: Record<string, { subject: string; html: string }> = {
  signup: {
    subject: "Welcome to SPL@T 💋 You're on the list!",
    html: `
      <h2 style="color:#e11d48">Hey there 💦</h2>
      <p>You’re officially on the SPL@T list. Expect spicy updates and exclusive drops.</p>
      <a href="https://www.usesplat.com/merch" style="color:#e11d48;">→ Explore Merch</a>
      <br><p style="opacity:0.8">Stay wet, stay ready — The SPL@T Team 💋</p>
    `,
  },
  contact: {
    subject: "Thanks for reaching out 💌",
    html: `
      <h2 style="color:#e11d48">Hey gorgeous 👋</h2>
      <p>We’ve got your message and will reply soon. In the meantime, follow us on <a href="https://www.instagram.com/usesplat" target="_blank">@usesplat</a>.</p>
      <br><p style="opacity:0.8">With love, The SPL@T Team 💌</p>
    `,
  },
  ambassador: {
    subject: "We got your SPL@T Ambassador application 🌟",
    html: `
      <h2 style="color:#e11d48">Hey superstar 🌟</h2>
      <p>Your application’s in! We’ll reach out if you’re a match for the SPL@T Squad.</p>
      <p>Meanwhile, grab your official <a href="https://www.usesplat.com/merch" style="color:#e11d48;">SPL@T merch</a> look.</p>
      <br><p style="opacity:0.8">Keep it bold — The SPL@T Team 💅</p>
    `,
  },
};

export default function EmailPreview() {
  const router = useRouter();
  const { type = "signup" } = router.query;
  const template = templates[type as string] || templates.signup;

  const [dark, setDark] = useState(true);
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  async function sendTestEmail() {
    if (!email) return setStatus("Please enter an email address.");
    setSending(true);
    setStatus(null);
    try {
      const res = await fetch("/api/test-send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ to: email, type }),
      });
      if (res.ok) setStatus("✅ Test email sent!");
      else setStatus("❌ Failed to send test email. Check console.");
    } catch (err) {
      console.error(err);
      setStatus("❌ Error sending test email.");
    } finally {
      setSending(false);
    }
  }

  return (
    <div
      className={`min-h-screen transition-all duration-300 ${
        dark ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <Head>
        <title>Preview: {template.subject}</title>
      </Head>

      <div className="p-8 flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-4">💌 SPL@T Email Preview</h1>

        <div className="flex gap-4 mb-6">
          <button
            onClick={() => router.push("/email-preview?type=signup")}
            className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white"
          >
            Signup
          </button>
          <button
            onClick={() => router.push("/email-preview?type=contact")}
            className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white"
          >
            Contact
          </button>
          <button
            onClick={() => router.push("/email-preview?type=ambassador")}
            className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white"
          >
            Ambassador
          </button>
        </div>

        <div className="flex items-center gap-3 mb-8">
          <button
            onClick={() => setDark((d) => !d)}
            className="border border-gray-500 px-3 py-1 rounded-lg text-sm"
          >
            {dark ? "Switch to Light Mode 🌞" : "Switch to Dark Mode 🌚"}
          </button>
          <input
            type="email"
            placeholder="Enter email for test send"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border px-3 py-2 rounded-lg text-black"
          />
          <button
            disabled={sending}
            onClick={sendTestEmail}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl"
          >
            {sending ? "Sending..." : "Send Test"}
          </button>
        </div>

        {status && <p className="mb-6 text-sm">{status}</p>}

        <div
          className={`w-full max-w-2xl rounded-2xl shadow-xl p-8 ${
            dark ? "bg-white text-black" : "bg-gray-100 text-black"
          }`}
        >
          <div dangerouslySetInnerHTML={{ __html: template.html }} />
        </div>
      </div>
    </div>
  );
}
