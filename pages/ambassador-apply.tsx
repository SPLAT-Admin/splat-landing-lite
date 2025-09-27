/* SPL@T block-style form layout */
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import {
  FormShell,
  FormField,
  FormSelect,
  FormTextArea,
  FormButton,
  FormCaptcha,
  formStatusMessageClass,
  formHeadingClass,
} from "@/components/Form";

const stateOptions = [
  "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY",
];

type Status = "idle" | "loading" | "success" | "error";

type FormData = {
  first_name: string;
  last_name: string;
  preferred_name: string;
  dob: string;
  email: string;
  city: string;
  state: string;
  social_media_handles: string;
  number_of_followers: string;
  qualifications_why: string;
  referral: string;
};

const initialForm: FormData = {
  first_name: "",
  last_name: "",
  preferred_name: "",
  dob: "",
  email: "",
  city: "",
  state: "",
  social_media_handles: "",
  number_of_followers: "",
  qualifications_why: "",
  referral: "",
};

export default function AmbassadorApplyPage() {
  const router = useRouter();
  const [form, setForm] = useState<FormData>(initialForm);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [captchaKey, setCaptchaKey] = useState(0);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const resetCaptcha = () => {
    setCaptchaToken(null);
    setCaptchaKey((prev) => prev + 1);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!captchaToken) {
      setStatus("error");
      setError("Please complete the CAPTCHA before submitting.");
      return;
    }

    setStatus("loading");
    setError(null);

    try {
      const payload = {
        ...form,
        number_of_followers: Number(
          form.number_of_followers.replace(/,/g, "").trim() || "0"
        ),
        captchaToken,
      };

      const response = await fetch("/api/ambassador-apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.error || "Submission failed. Try again soon.");
      }

      setStatus("success");
      setForm(initialForm);
      resetCaptcha();

      setTimeout(() => {
        void router.push("/thankyou");
      }, 1500);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unexpected error. Please try again.";
      setStatus("error");
      setError(message);
      resetCaptcha();
    }
  };

  return (
    <>
      <Head>
        <title>Apply to Be a SPL@T Ambassador</title>
        <meta
          name="description"
          content="Submit your SPL@T Ambassador application and unlock beta access, perks, and referral rewards."
        />
      </Head>

      <main className="min-h-screen bg-gradient-to-b from-black via-[#0b0104] to-black px-6 py-24 text-white">
        <div className="mx-auto flex max-w-3xl flex-col gap-10">
          <header className="space-y-4 text-center">
            <span className="text-xs uppercase tracking-[0.5em] text-white/45">
              Ambassador Program
            </span>
            <h1 className="text-2xl font-extrabold uppercase tracking-[0.35em] text-[#851825]">
              SPL@T AMBASSADOR
            </h1>
            <p className="text-lg text-white/80">
              Ignite the SPL@TVerse in your city. We’re recruiting bold connectors, promoters, and event hosts who can
              mobilize community energy fast.
            </p>
            <ul className="space-y-1 text-left text-sm text-white/70">
              <li>• Early access to beta features, merch drops, and collabs.</li>
              <li>• Revenue opportunities with custom referral codes and events.</li>
              <li>• Direct line to the SPL@T core team for feedback and spotlights.</li>
            </ul>
          </header>

          <FormShell>
            <form onSubmit={handleSubmit} className="space-y-8">
              <h2 className={`${formHeadingClass} text-center`}>Apply Now</h2>
              <div className="grid gap-5 sm:grid-cols-2">
                <FormField
                  label="First Name"
                  name="first_name"
                  value={form.first_name}
                  onChange={handleChange}
                  required
                  autoComplete="given-name"
                />
                <FormField
                  label="Last Name"
                  name="last_name"
                  value={form.last_name}
                  onChange={handleChange}
                  required
                  autoComplete="family-name"
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <FormField
                  label="Preferred Name"
                  name="preferred_name"
                  value={form.preferred_name}
                  onChange={handleChange}
                  placeholder="What should we call you?"
                />
                <FormField
                  label="Date of Birth"
                  name="dob"
                  type="date"
                  value={form.dob}
                  onChange={handleChange}
                  required
                  max={new Date().toISOString().split("T")[0]}
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <FormField
                  label="Email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  autoComplete="email"
                />
                <FormField
                  label="Social Handles"
                  name="social_media_handles"
                  value={form.social_media_handles}
                  onChange={handleChange}
                  placeholder="@usesplat"
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <FormField
                  label="City"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  required
                  autoComplete="address-level2"
                />
                <FormSelect
                  label="State"
                  name="state"
                  value={form.state}
                  onChange={handleChange}
                  required
                  options={stateOptions.map((value) => ({ value, label: value }))}
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <FormField
                  label="Followers"
                  name="number_of_followers"
                  type="number"
                  min="0"
                  value={form.number_of_followers}
                  onChange={handleChange}
                  placeholder="2500"
                  hint="Approximate reach across socials"
                />
                <FormField
                  label="Referral (optional)"
                  name="referral"
                  value={form.referral}
                  onChange={handleChange}
                  placeholder="Who told you about SPL@T?"
                />
              </div>

              <FormTextArea
                label="Why do you want to be a SPL@T Ambassador?"
                name="qualifications_why"
                value={form.qualifications_why}
                onChange={handleChange}
                required
                rows={5}
                placeholder="Tell us about your community, events, and how you plan to make SPL@T pop."
              />

              <FormCaptcha
                key={captchaKey}
                containerId={`ambassador-turnstile-${captchaKey}`}
                onVerify={(token) => setCaptchaToken(token)}
                onExpire={resetCaptcha}
                onError={resetCaptcha}
              />

              <FormButton type="submit" disabled={status === "loading"}>
                {status === "loading" ? "Submitting…" : "Submit Application"}
              </FormButton>

              {status === "success" ? (
                <p className={`${formStatusMessageClass} border-emerald-400/30 bg-emerald-500/15 text-emerald-300`}>
                  Application received! We will review and follow up shortly.
                </p>
              ) : null}

              {status === "error" && error ? (
                <p className={`${formStatusMessageClass} border-red-400/30 bg-red-500/10 text-red-300`}>
                  {error}
                </p>
              ) : null}

              <p className="text-center text-xs text-white/50">
                SPL@T uses your information solely for ambassador review. We will never sell your data.
              </p>
            </form>
          </FormShell>
        </div>
      </main>
    </>
  );
}
