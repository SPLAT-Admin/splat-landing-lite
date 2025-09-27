import Head from "next/head";
import EmailSignupForm from "@/components/EmailSignupForm";

export default function EmailSignupPage() {
  return (
    <>
      <Head>
        <title>Join the SPL@T Waitlist</title>
        <meta
          name="description"
          content="Drop your email to get early access to SPL@T updates and private beta drops."
        />
      </Head>

      <main className="min-h-screen bg-gradient-to-b from-black via-[#120207] to-black px-6 py-24 text-white">
        <EmailSignupForm />
      </main>
    </>
  );
}
