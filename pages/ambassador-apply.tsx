import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";

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

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");
    setError(null);

    try {
      const payload = {
        ...form,
        number_of_followers: Number(
          form.number_of_followers.replace(/,/g, "").trim() || "0"
        ),
        captchaToken: "client-bypass",
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
      setTimeout(() => {
        void router.push("/thankyou");
      }, 1400);
    } catch (err: any) {
      setStatus("error");
      setError(err?.message || "Unexpected error. Please try again.");
    }
  };

  return (
    <>
      <Head>
        <title>SPL@T Ambassador Application</title>
      </Head>
      <main className="min-h-screen bg-gradient-to-b from-black via-[#110107] to-black px-6 py-20 text-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-16 lg:flex-row">
          <section className="flex-1 space-y-6">
            <span className="text-xs uppercase tracking-[0.6em] text-white/50">SPL@T Ambassador</span>
            <h1 className="text-[44pt] font-extrabold tracking-tight text-[#851825] drop-shadow-lg">
              Amplify the SPL@TVerse
            </h1>
            <p className="text-lg text-white/75">
              We are recruiting unapologetic connectors, promoters, event hosts, and bold humans who can ignite the
              SPL@T vibe in their city. Apply below and we will reach out with next steps.
            </p>
            <ul className="space-y-3 text-sm text-white/70">
              <li>• Early access to beta features, SPL@T merch, and ambassador-only drops.</li>
              <li>• Revenue opportunities through referral codes &amp; event collaborations.</li>
              <li>• Direct line to the SPL@T core team for shaping the product &amp; community.</li>
            </ul>
          </section>

          <section className="w-full max-w-3xl">
            <div className="rounded-3xl border border-[#2f0f15]/80 bg-black/70 p-[1px] shadow-[0_25px_55px_rgba(133,23,37,0.35)]">
              <div className="rounded-[calc(1.5rem-1px)] bg-black/85 p-8 sm:p-10">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field
                      label="First Name"
                      name="first_name"
                      value={form.first_name}
                      onChange={handleChange}
                      required
                    />
                    <Field
                      label="Last Name"
                      name="last_name"
                      value={form.last_name}
                      onChange={handleChange}
                      required
                    />
                    <Field
                      label="Preferred Name"
                      name="preferred_name"
                      value={form.preferred_name}
                      onChange={handleChange}
                    />
                    <Field
                      label="Date of Birth"
                      name="dob"
                      type="date"
                      value={form.dob}
                      onChange={handleChange}
                      required
                    />
                    <Field
                      label="Email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />
                    <Field
                      label="City"
                      name="city"
                      value={form.city}
                      onChange={handleChange}
                      required
                    />
                    <SelectField
                      label="State"
                      name="state"
                      value={form.state}
                      onChange={handleChange}
                      options={stateOptions}
                      required
                    />
                    <Field
                      label="Social Handles"
                      name="social_media_handles"
                      placeholder="@splathype / links"
                      value={form.social_media_handles}
                      onChange={handleChange}
                      required
                    />
                    <Field
                      label="Followers"
                      name="number_of_followers"
                      type="number"
                      placeholder="2500"
                      min="0"
                      value={form.number_of_followers}
                      onChange={handleChange}
                      required
                    />
                    <Field
                      label="Referral (optional)"
                      name="referral"
                      value={form.referral}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="text-xs font-semibold uppercase tracking-[0.3em] text-white/60">
                      Why do you want to be a SPL@T Ambassador?
                    </label>
                    <textarea
                      name="qualifications_why"
                      required
                      rows={5}
                      value={form.qualifications_why}
                      onChange={handleChange}
                      placeholder="Tell us about your community, events, and how you plan to make SPL@T pop."
                      className="mt-3 w-full rounded-2xl border border-white/10 bg-black px-4 py-4 text-white placeholder-white/40 focus:border-[#851825] focus:outline-none focus:ring-2 focus:ring-[#851825]/60"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full rounded-full bg-[#851825] py-4 text-lg font-bold uppercase tracking-widest text-white shadow-[0_0_35px_rgba(133,23,37,0.45)] transition hover:scale-[1.01] hover:bg-[#6f1320] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#851825]/50 disabled:scale-100 disabled:opacity-60"
                  >
                    {status === "loading" ? "Submitting…" : "Submit Application"}
                  </button>

                  {status === "success" ? (
                    <p className="rounded-2xl border border-emerald-400/30 bg-emerald-500/15 px-4 py-3 text-center text-sm text-emerald-300">
                      Application received! We will review and follow up shortly.
                    </p>
                  ) : null}

                  {status === "error" && error ? (
                    <p className="rounded-2xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-center text-sm text-red-300">
                      {error}
                    </p>
                  ) : null}

                  <p className="text-center text-xs text-white/50">
                    SPL@T uses your information solely for ambassador program review and will never sell your data.
                  </p>
                </form>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

type FieldProps = {
  label: string;
  name: keyof FormData;
  value: string;
  onChange: FieldChangeHandler;
  type?: string;
  required?: boolean;
  placeholder?: string;
  min?: string;
};

type FieldChangeHandler = (
  event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
) => void;

function Field({ label, name, value, onChange, type = "text", required, placeholder, min }: FieldProps) {
  return (
    <div className="flex flex-col">
      <label className="text-xs font-semibold uppercase tracking-[0.3em] text-white/60">{label}</label>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        min={min}
        className="mt-3 w-full rounded-2xl border border-white/10 bg-black px-4 py-4 text-white placeholder-white/35 focus:border-[#851825] focus:outline-none focus:ring-2 focus:ring-[#851825]/60"
      />
    </div>
  );
}

type SelectFieldProps = {
  label: string;
  name: keyof FormData;
  value: string;
  onChange: FieldChangeHandler;
  options: string[];
  required?: boolean;
};

function SelectField({ label, name, value, onChange, options, required }: SelectFieldProps) {
  return (
    <div className="flex flex-col">
      <label className="text-xs font-semibold uppercase tracking-[0.3em] text-white/60">{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="mt-3 w-full rounded-2xl border border-white/10 bg-black px-4 py-4 text-white focus:border-[#851825] focus:outline-none focus:ring-2 focus:ring-[#851825]/60"
      >
        <option value="">Select</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
