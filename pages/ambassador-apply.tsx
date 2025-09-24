import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import SplatCaptcha from "../components/SplatCaptcha";
import { AmbassadorForm } from "../types";

export default function AmbassadorApply() {
  const [formData, setFormData] = useState<AmbassadorForm>({
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
    captchaToken: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (loading) return;

    setLoading(true);

    if (!formData.captchaToken) {
      setError("Please complete the CAPTCHA.");
      setLoading(false);
      return;
    }

    try {
      const payload: AmbassadorForm = {
        ...formData,
        number_of_followers: Number(
          typeof formData.number_of_followers === 'string'
            ? formData.number_of_followers.replace(/,/g, '').trim()
            : formData.number_of_followers
        ),
      };

      const response = await fetch("/api/ambassador", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errJson = await response.json().catch(() => null);
        setError(errJson?.error || `Submission failed (${response.status})`);
        setFormData((prev) => ({ ...prev, captchaToken: "" }));
        setLoading(false);
        return;
      }
      const json = await response.json().catch(() => ({ success: true }));
      const redirect = json?.redirectTo || json?.data?.redirectTo;
      if (redirect) {
        await router.push(redirect);
        return;
      }
      setSubmitted(true);
    } catch (err) {
      setError(`Something went wrong: ${err}`);
      setFormData((prev) => ({ ...prev, captchaToken: "" }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Apply to be a SPL@T Ambassador</title>
      </Head>
      <section className="bg-gradient-to-b from-black via-[#110207] to-black text-white px-6 py-20">
        <div className="mx-auto flex w-full max-w-5xl flex-col items-center justify-center space-y-10">
          <header className="text-center space-y-3 fade-up">
            <h1 className="text-[44pt] font-extrabold tracking-tight text-[#851825] drop-shadow-lg">
              Become a SPL@T Ambassador
            </h1>
            <p className="mx-auto max-w-2xl text-[18pt] leading-relaxed text-white/85">
              Bring the SPL@TVerse to your city. We are searching for bold connectors, promoters, and community leaders
              who live for unapologetic energy.
            </p>
          </header>

          {!submitted ? (
            <div className="w-full fade-up-delay">
              <div className="gradient-frame crimson-glow">
                <div className="gradient-content p-8 sm:p-10">
                  <form onSubmit={handleSubmit} className="space-y-7 text-[14pt]">
                    <div className="grid gap-5 sm:grid-cols-2">
                      {[
                        { id: "first_name", label: "First Name", required: true },
                        { id: "last_name", label: "Last Name", required: true },
                        { id: "preferred_name", label: "Preferred Name" },
                        { id: "dob", label: "Date of Birth", type: "date", required: true },
                        { id: "email", label: "Email", type: "email", required: true },
                        { id: "city", label: "City", required: true },
                      ].map(({ id, label, type = "text", required }) => (
                        <div key={id} className="flex flex-col">
                          <label htmlFor={id} className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
                            {label}
                          </label>
                          <input
                            id={id}
                            name={id}
                            type={type}
                            required={required}
                            value={(formData as Record<string, string | number>)[id] ?? ""}
                            onChange={handleChange}
                            className="mt-2 w-full rounded-2xl border border-white/10 bg-black/70 px-4 py-3 text-white placeholder-white/40 transition focus:border-[#851825] focus:outline-none focus:ring-2 focus:ring-[#851825]/60"
                          />
                        </div>
                      ))}
                    </div>

                    <div className="grid gap-5 lg:grid-cols-2">
                      <div className="flex flex-col">
                        <label htmlFor="state" className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
                          State
                        </label>
                        <select
                          id="state"
                          name="state"
                          required
                          value={formData.state}
                          onChange={handleChange}
                          className="mt-2 w-full rounded-2xl border border-white/10 bg-black/70 px-4 py-3 text-white transition focus:border-[#851825] focus:outline-none focus:ring-2 focus:ring-[#851825]/60"
                        >
                          <option value="">Select State</option>
                          {[
                            "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY",
                          ].map((state) => (
                            <option key={state} value={state}>
                              {state}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="flex flex-col">
                        <label
                          htmlFor="social_media_handles"
                          className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70"
                        >
                          Social Media Handles
                        </label>
                        <input
                          id="social_media_handles"
                          name="social_media_handles"
                          required
                          value={formData.social_media_handles}
                          onChange={handleChange}
                          placeholder="@usesplat / links"
                          className="mt-2 w-full rounded-2xl border border-white/10 bg-black/70 px-4 py-3 text-white placeholder-white/40 transition focus:border-[#851825] focus:outline-none focus:ring-2 focus:ring-[#851825]/60"
                        />
                      </div>
                    </div>

                    <div className="grid gap-5 lg:grid-cols-2">
                      <div className="flex flex-col">
                        <label
                          htmlFor="number_of_followers"
                          className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70"
                        >
                          Number of Followers
                        </label>
                        <input
                          id="number_of_followers"
                          name="number_of_followers"
                          required
                          inputMode="numeric"
                          value={formData.number_of_followers}
                          onChange={handleChange}
                          placeholder="2500"
                          className="mt-2 w-full rounded-2xl border border-white/10 bg-black/70 px-4 py-3 text-white placeholder-white/40 transition focus:border-[#851825] focus:outline-none focus:ring-2 focus:ring-[#851825]/60"
                        />
                        <p className="mt-2 text-xs text-white/50">Include combined followers if you manage multiple channels.</p>
                      </div>

                      <div className="flex flex-col">
                        <label htmlFor="referral" className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
                          Referral (optional)
                        </label>
                        <input
                          id="referral"
                          name="referral"
                          value={formData.referral ?? ""}
                          onChange={handleChange}
                          placeholder="Who sent you?"
                          className="mt-2 w-full rounded-2xl border border-white/10 bg-black/70 px-4 py-3 text-white placeholder-white/40 transition focus:border-[#851825] focus:outline-none focus:ring-2 focus:ring-[#851825]/60"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col">
                      <label
                        htmlFor="qualifications_why"
                        className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70"
                      >
                        Why do you want to be an Ambassador?
                      </label>
                      <textarea
                        id="qualifications_why"
                        name="qualifications_why"
                        required
                        rows={5}
                        value={formData.qualifications_why}
                        onChange={handleChange}
                        className="mt-2 w-full rounded-2xl border border-white/10 bg-black/70 px-4 py-3 text-white placeholder-white/40 transition focus:border-[#851825] focus:outline-none focus:ring-2 focus:ring-[#851825]/60"
                        placeholder="Brag about your community, events, or hustle."
                      />
                    </div>

                    <SplatCaptcha
                      containerId="cf-turnstile-ambassador"
                      className="my-4 flex justify-center"
                      onVerify={(token) => setFormData((prev: AmbassadorForm) => ({ ...prev, captchaToken: token }))}
                      onExpire={() => setFormData((prev) => ({ ...prev, captchaToken: "" }))}
                      onError={() => setFormData((prev) => ({ ...prev, captchaToken: "" }))}
                    />

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full rounded-full bg-[#851825] py-3 font-bold text-white transition-all duration-300 hover:scale-[1.01] hover:bg-[#6f1320] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#851825]/60 disabled:scale-100 disabled:opacity-60"
                    >
                      {loading ? "Submitting…" : "Submit Application"}
                    </button>

                    {error && <p className="text-center text-red-400">{error}</p>}
                  </form>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full fade-up-delay">
              <div className="gradient-frame">
                <div className="gradient-content p-8 text-center">
                  <h2 className="text-3xl font-extrabold text-[#851825]">Thank you for applying!</h2>
                  <p className="mt-4 text-white/80">We’ll review your application and get back to you soon. 💦</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
