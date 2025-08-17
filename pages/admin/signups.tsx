// pages/admin/signups.tsx
import type { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

const PAGE_SIZE = 50;

type Row = {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  marketing_consent: boolean;
  signup_source: string;
  referral_code: string | null;
  created_at: string;
};

type Props = { rows: Row[]; page: number; total: number };

export const getServerSideProps: GetServerSideProps<Props> = async ({ req, query }) => {
  const token = process.env.ADMIN_DASH_TOKEN!;
  const auth = req.headers.authorization || "";
  if (auth !== `Bearer ${token}`) {
    return { redirect: { destination: "/", permanent: false } } as any;
  }

  const page = Math.max(1, parseInt(String(query.p || "1"), 10));
  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_KEY!
  );

  const { data, error, count } = await supabase
    .from("email_signups")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) throw error;

  return { props: { rows: data as Row[], page, total: count || 0 } };
};

export default function AdminSignups({ rows, page, total }: Props) {
  const pages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <main className="min-h-screen bg-background text-foreground p-6">
      <Head><title>SPL@T Admin – Email Signups</title></Head>

      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header & Export */}
        <header className="flex flex-wrap justify-between items-center gap-4 ">
          <h1 className="text-3xl font-extrabold">Email Signups</h1>
          <Link href="#" legacyBehavior>
            <a
              className="px-4 py-2 rounded-full bg-crimson text-white font-semibold hover:bg-crimson-hover transition"
              onClick={(e) => {
                const t = prompt("Enter Admin Token");
                if (t) e.currentTarget.href = `/api/admin/signups/export?token=${encodeURIComponent(t)}`;
                else e.preventDefault();
              }}
            >
              Download CSV
            </a>
          </Link>
        </header>

        {/* Signup Table */}
        <div className="overflow-auto rounded-lg border border-gray-800">
          <table className="min-w-full text-sm table-auto">
            <thead className="bg-gray-900">
              <tr>
                {["Created", "Email", "First", "Last", "Consent", "Source", "Referral"].map(header => (
                  <th key={header} className="px-4 py-2 text-left font-semibold">{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map(r => (
                <tr key={r.id} className="odd:bg-gray-800">
                  <td className="px-4 py-2">{new Date(r.created_at).toLocaleString()}</td>
                  <td className="px-4 py-2">{r.email}</td>
                  <td className="px-4 py-2">{r.first_name || ''}</td>
                  <td className="px-4 py-2">{r.last_name || ''}</td>
                  <td className="px-4 py-2">{r.marketing_consent ? "Yes" : "No"}</td>
                  <td className="px-4 py-2">{r.signup_source}</td>
                  <td className="px-4 py-2">{r.referral_code || ''}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <nav className="flex flex-wrap justify-center gap-2">
          {Array.from({ length: pages }).map((_, i) => {
            const n = i + 1;
            const active = n === page;
            return (
              <Link
                key={n}
                href={`?p=${n}`}
                className={`px-3 py-1 rounded-full ${active ? "bg-crimson text-black" : "bg-gray-800 text-gray-400 hover:bg-gray-700"}`}
              >
                {n}
              </Link>
            );
          })}
        </nav>
      </div>
    </main>
  );
}
