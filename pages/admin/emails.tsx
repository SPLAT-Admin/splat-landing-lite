"use client";
import { useEffect, useState } from "react";
import AdminLayout from "@/components/layouts/AdminLayout";
import { withAdminAuth } from "@/components/withAdminAuth";
import { supabase } from "@/lib/supabaseClient";

interface EmailSignup {
  id: string;
  email: string;
  signup_source?: string;
  created_at: string;
}

function EmailsPage() {
  const [emails, setEmails] = useState<EmailSignup[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const { data, error } = await supabase
        .from("email_signups")
        .select("id,email,signup_source,created_at")
        .order("created_at", { ascending: false })
        .limit(500);
      if (error) {
        console.error("Failed to load email signups", error.message);
        setEmails([]);
      } else {
        setEmails(data || []);
      }
      setLoading(false);
    }

    load();
  }, []);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-white">Email Signups</h1>
        {loading ? (
          <p className="text-gray-400">Loading subscribers…</p>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-white/5 bg-black/70">
            <table className="w-full text-left text-sm text-gray-200">
              <thead className="bg-white/5 uppercase text-xs tracking-wider text-acid-white/70">
                <tr>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Source</th>
                  <th className="px-4 py-3">Joined</th>
                </tr>
              </thead>
              <tbody>
                {emails.map((signup) => (
                  <tr key={signup.id} className="border-t border-white/10">
                    <td className="px-4 py-3 font-semibold">{signup.email}</td>
                    <td className="px-4 py-3">{signup.signup_source || "—"}</td>
                    <td className="px-4 py-3">
                      {signup.created_at ? new Date(signup.created_at).toLocaleString() : "—"}
                    </td>
                  </tr>
                ))}
                {emails.length === 0 && (
                  <tr>
                    <td className="px-4 py-6 text-center text-gray-500" colSpan={3}>
                      No email signups yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

export default withAdminAuth(EmailsPage);
