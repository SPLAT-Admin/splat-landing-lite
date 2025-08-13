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
  const ok = auth === `Bearer ${token}`;
  if (!ok) {
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
    .select("id,email,first_name,last_name,marketing_consent,signup_source,referral_code,created_at", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) throw error;

  return { props: { rows: data as Row[], page, total: count || 0 } };
};

export default function AdminSignups({ rows, page, total }: Props) {
  const pages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  return (
    <main className="min-h-screen bg-black text-white p-6">
      <Head><title>SPL@T — Admin Signups</title></Head>
      <div className="max-w-5xl mx-auto">
        <header className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Email Signups</h1>
          <Link href={{ pathname: "/api/admin/signups/export" }} legacyBehavior>
            <a className="px-3 py-2 rounded bg-white text-black font-semibold" target="_blank" rel="noreferrer"
               onClick={(e) => {
                 // attach bearer token via prompt for quick use; replace with cookie in prod
                 const t = prompt("Admin token?");
                 if (t) (e.currentTarget as HTMLAnchorElement).href = `/api/admin/signups/export?token=${encodeURIComponent(t)}`;
                 else e.preventDefault();
               }}
            >Download CSV</a>
          </Link>
        </header>

        <div className="overflow-auto rounded-xl border border-white/10">
          <table className="min-w-full text-sm">
            <thead className="bg-white/10">
              <tr>
                <th className="px-3 py-2 text-left">Created</th>
                <th className="px-3 py-2 text-left">Email</th>
                <th className="px-3 py-2 text-left">First</th>
                <th className="px-3 py-2 text-left">Last</th>
                <th className="px-3 py-2 text-left">Consent</th>
                <th className="px-3 py-2 text-left">Source</th>
                <th className="px-3 py-2 text-left">Referral</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="odd:bg-white/5">
                  <td className="px-3 py-2 whitespace-nowrap">{new Date(r.created_at).toLocaleString()}</td>
                  <td className="px-3 py-2">{r.email}</td>
                  <td className="px-3 py-2">{r.first_name ?? ""}</td>
                  <td className="px-3 py-2">{r.last_name ?? ""}</td>
                  <td className="px-3 py-2">{r.marketing_consent ? "yes" : "no"}</td>
                  <td className="px-3 py-2">{r.signup_source}</td>
                  <td className="px-3 py-2">{r.referral_code ?? ""}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <nav className="mt-4 flex items-center gap-2">
          {Array.from({ length: pages }).map((_, i) => {
            const n = i + 1;
            const active = n === page;
            return (
              <a key={n} href={`?p=${n}`} className={`px-3 py-2 rounded ${active ? "bg-white text-black" : "bg-white/10"}`}>{n}</a>
            );
          })}
        </nav>
      </div>
    </main>
  );
}