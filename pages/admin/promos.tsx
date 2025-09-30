import { useEffect, useMemo, useState } from "react";
import type { GetServerSideProps } from "next";
import Head from "next/head";
import { createClient } from "@supabase/supabase-js";
import AdminLayout from "@/components/layouts/AdminLayout";
import { getSupabaseClient } from "@/lib/supabaseClient";

const supabase = getSupabaseClient();

type PromoRecord = {
  id: string;
  title: string;
  subtitle: string | null;
  cta_label: string | null;
  cta_href: string | null;
  is_active: boolean;
  created_at: string;
};

type Props = {
  initialPromos: PromoRecord[];
};

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || "";

const decodeBase64Url = (input: string) => {
  const base64 = input.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), "=");
  return Buffer.from(padded, "base64").toString("utf8");
};

const extractAccessToken = (headers: any, cookies: Record<string, string>) => {
  const auth = headers.authorization as string | undefined;
  if (auth?.startsWith("Bearer ")) return auth.slice(7);

  const cookieCandidates = [
    cookies["sb-access-token"],
    cookies["sb:token"],
    cookies["supabase-access-token"],
    cookies["supabase-auth-token"],
    cookies["access_token"],
  ].filter(Boolean);

  for (const raw of cookieCandidates) {
    if (!raw) continue;
    if (raw.startsWith("[")) {
      try {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed[0]) return parsed[0] as string;
      } catch (err) {
        console.warn("Failed to parse Supabase auth cookie", err);
      }
    } else {
      return raw;
    }
  }
  return null;
};

const roleFromToken = (token: string | null) => {
  if (!token) return null;
  try {
    const [, payload] = token.split(".");
    if (!payload) return null;
    const json = JSON.parse(decodeBase64Url(payload));
    return json?.user_role || json?.role || null;
  } catch (err) {
    console.warn("Unable to decode JWT", err);
    return null;
  }
};

export const getServerSideProps: GetServerSideProps<Props> = async ({ req }) => {
  const accessToken = extractAccessToken(req.headers, req.cookies as Record<string, string>);
  const role = roleFromToken(accessToken);

  if (role !== "admin") {
    return { redirect: { destination: "/", permanent: false } } as any;
  }

  if (!SUPABASE_SERVICE_KEY) {
    throw new Error("Missing SUPABASE_SERVICE_KEY or SUPABASE_SERVICE_ROLE_KEY environment variable");
  }

  const adminClient = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);
  const { data, error } = await adminClient
    .from("promos")
    .select("id,title,subtitle,cta_label,cta_href,is_active,created_at")
    .order("created_at", { ascending: false });

  if (error) throw error;

  return {
    props: {
      initialPromos: data ?? [],
    },
  };
};

const toNullable = (value: string) => {
  const trimmed = value.trim();
  return trimmed.length ? trimmed : null;
};

const formatDateTime = (value: string) => new Date(value).toLocaleString();

export default function AdminPromos({ initialPromos }: Props) {
  const [promos, setPromos] = useState(initialPromos);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [createDraft, setCreateDraft] = useState({
    title: "",
    subtitle: "",
    cta_label: "",
    cta_href: "",
    is_active: false,
  });
  const [creating, setCreating] = useState(false);
  const [createSuccess, setCreateSuccess] = useState(false);

  const [editingId, setEditingId] = useState<string | null>(null);
  const editingPromo = useMemo(() => promos.find((promo) => promo.id === editingId) || null, [editingId, promos]);
  const [editDraft, setEditDraft] = useState({
    title: "",
    subtitle: "",
    cta_label: "",
    cta_href: "",
    is_active: false,
  });
  const [savingEdit, setSavingEdit] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setAccessToken(data.session?.access_token ?? null);
    });

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setAccessToken(session?.access_token ?? null);
    });

    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (editingPromo) {
      setEditDraft({
        title: editingPromo.title,
        subtitle: editingPromo.subtitle ?? "",
        cta_label: editingPromo.cta_label ?? "",
        cta_href: editingPromo.cta_href ?? "",
        is_active: editingPromo.is_active,
      });
    }
  }, [editingPromo]);

  const authedFetch = async (url: string, init?: RequestInit) => {
    let token = accessToken;
    if (!token) {
      const { data } = await supabase.auth.getSession();
      token = data.session?.access_token ?? null;
      setAccessToken(token ?? null);
    }

    const headers = {
      "Content-Type": "application/json",
      ...(init?.headers || {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    } as HeadersInit;

    return fetch(url, { ...init, headers });
  };

  const refreshPromos = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/promos");
      const json = await response.json();
      if (!response.ok) throw new Error(json.error || "Failed to load promos");
      setPromos(json.data as PromoRecord[]);
    } catch (err: any) {
      setError(err.message || "Failed to load promos");
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!createDraft.title.trim()) {
      setError("Title is required for new promos");
      return;
    }

    setCreating(true);
    setError(null);
    setCreateSuccess(false);

    try {
      const response = await authedFetch("/api/promos", {
        method: "POST",
        body: JSON.stringify({
          title: createDraft.title.trim(),
          subtitle: toNullable(createDraft.subtitle),
          cta_label: toNullable(createDraft.cta_label),
          cta_href: toNullable(createDraft.cta_href),
          is_active: createDraft.is_active,
        }),
      });
      const json = await response.json();
      if (!response.ok) throw new Error(json.error || "Failed to create promo");
      setCreateDraft({ title: "", subtitle: "", cta_label: "", cta_href: "", is_active: false });
      setCreateSuccess(true);
      await refreshPromos();
    } catch (err: any) {
      setError(err.message || "Failed to create promo");
    } finally {
      setCreating(false);
    }
  };

  const handleEditSave = async () => {
    if (!editingId) return;
    if (!editDraft.title.trim()) {
      setError("Title cannot be empty");
      return;
    }
    setSavingEdit(true);
    setError(null);

    try {
      const response = await authedFetch("/api/promos", {
        method: "PUT",
        body: JSON.stringify({
          id: editingId,
          title: editDraft.title.trim(),
          subtitle: toNullable(editDraft.subtitle),
          cta_label: toNullable(editDraft.cta_label),
          cta_href: toNullable(editDraft.cta_href),
          is_active: editDraft.is_active,
        }),
      });
      const json = await response.json();
      if (!response.ok) throw new Error(json.error || "Failed to update promo");
      setEditingId(null);
      await refreshPromos();
    } catch (err: any) {
      setError(err.message || "Failed to update promo");
    } finally {
      setSavingEdit(false);
    }
  };

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm("Delete this promo? This cannot be undone.");
    if (!confirmed) return;
    setError(null);

    try {
      const response = await authedFetch(`/api/promos?id=${encodeURIComponent(id)}`, { method: "DELETE" });
      const json = await response.json();
      if (!response.ok) throw new Error(json.error || "Failed to delete promo");
      if (editingId === id) setEditingId(null);
      await refreshPromos();
    } catch (err: any) {
      setError(err.message || "Failed to delete promo");
    }
  };

  const handleToggleActive = async (promo: PromoRecord) => {
    setError(null);
    try {
      const response = await authedFetch("/api/promos", {
        method: "PUT",
        body: JSON.stringify({ id: promo.id, is_active: !promo.is_active }),
      });
      const json = await response.json();
      if (!response.ok) throw new Error(json.error || "Failed to update promo status");
      await refreshPromos();
    } catch (err: any) {
      setError(err.message || "Failed to toggle promo");
    }
  };

  return (
    <>
      <Head>
        <title>SPL@T Admin – Promos</title>
      </Head>
      <AdminLayout>
        <div className="min-h-screen bg-gradient-to-br from-black via-[#20030a] to-black text-white p-10">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
        <header className="flex flex-col gap-2">
          <h1 className="text-4xl font-extrabold tracking-tight text-crimson">Promo Control Center</h1>
          <p className="text-base text-gray-300">
            Manage live promos across the SPL@T experience. Only admins can access this page.
          </p>
        </header>

        <section className="rounded-2xl border border-gray-800 bg-black/80 p-6 shadow-xl">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-xl font-semibold text-crimson">Create Promo</h2>
            <button
              onClick={refreshPromos}
              className="rounded-full border border-gray-700 px-4 py-1 text-sm text-gray-200 hover:bg-gray-800"
            >
              {loading ? "Refreshing…" : "Refresh"}
            </button>
          </div>
          <form onSubmit={handleCreate} className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            <label className="flex flex-col text-xs uppercase tracking-wide text-gray-400">
              Title
              <input
                value={createDraft.title}
                onChange={(e) => setCreateDraft((prev) => ({ ...prev, title: e.target.value }))}
                className="mt-1 rounded-lg border border-gray-700 bg-black px-3 py-2 text-white focus:border-crimson focus:outline-none"
                placeholder="SPL@T Premium Launch"
                maxLength={120}
                required
              />
            </label>
            <label className="flex flex-col text-xs uppercase tracking-wide text-gray-400">
              Subtitle
              <input
                value={createDraft.subtitle}
                onChange={(e) => setCreateDraft((prev) => ({ ...prev, subtitle: e.target.value }))}
                className="mt-1 rounded-lg border border-gray-700 bg-black px-3 py-2 text-white focus:border-crimson focus:outline-none"
                placeholder="Steamy perks unlocked for early birds"
                maxLength={160}
              />
            </label>
            <label className="flex flex-col text-xs uppercase tracking-wide text-gray-400">
              CTA Label
              <input
                value={createDraft.cta_label}
                onChange={(e) => setCreateDraft((prev) => ({ ...prev, cta_label: e.target.value }))}
                className="mt-1 rounded-lg border border-gray-700 bg-black px-3 py-2 text-white focus:border-crimson focus:outline-none"
                placeholder="Join Now"
                maxLength={60}
              />
            </label>
            <label className="flex flex-col text-xs uppercase tracking-wide text-gray-400">
              CTA URL
              <input
                value={createDraft.cta_href}
                onChange={(e) => setCreateDraft((prev) => ({ ...prev, cta_href: e.target.value }))}
                className="mt-1 rounded-lg border border-gray-700 bg-black px-3 py-2 text-white focus:border-crimson focus:outline-none"
                placeholder="https://usesplat.com/signup"
              />
            </label>
            <label className="inline-flex items-center gap-2 text-sm text-gray-200">
              <input
                type="checkbox"
                checked={createDraft.is_active}
                onChange={(e) => setCreateDraft((prev) => ({ ...prev, is_active: e.target.checked }))}
                className="h-4 w-4 rounded border-gray-500 bg-black text-crimson focus:ring-crimson"
              />
              Set live immediately
            </label>
            <div className="flex items-end justify-end gap-3">
              {createSuccess && <span className="text-sm text-green-400">Promo created</span>}
              <button
                type="submit"
                disabled={creating}
                className="ml-auto rounded-full bg-crimson px-6 py-2 text-sm font-semibold text-white transition hover:bg-crimson-hover disabled:cursor-not-allowed disabled:opacity-50"
              >
                {creating ? "Creating…" : "Create"}
              </button>
            </div>
          </form>
        </section>

        {error && (
          <div className="rounded-xl border border-red-700 bg-red-900/30 p-4 text-sm text-red-200">{error}</div>
        )}

        <section className="rounded-2xl border border-gray-800 bg-black/70 p-6 shadow-xl">
          <h2 className="text-2xl font-semibold text-crimson mb-4">Existing Promos</h2>
          {promos.length === 0 ? (
            <p className="rounded-xl border border-dashed border-gray-700 bg-black/60 p-6 text-center text-gray-400">
              No promos yet. Craft something irresistible.
            </p>
          ) : (
            <div className="overflow-auto rounded-xl border border-gray-800">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-900 text-gray-200 uppercase tracking-wide text-xs">
                  <tr>
                    <th className="px-4 py-3 text-left">Title</th>
                    <th className="px-4 py-3 text-left">Subtitle</th>
                    <th className="px-4 py-3 text-left">CTA Label</th>
                    <th className="px-4 py-3 text-left">CTA URL</th>
                    <th className="px-4 py-3 text-left">Active</th>
                    <th className="px-4 py-3 text-left">Created</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {promos.map((promo) => (
                    <tr key={promo.id} className="border-t border-gray-800 bg-black/40 hover:bg-black/60">
                      <td className="px-4 py-3 font-semibold text-white">{promo.title}</td>
                      <td className="px-4 py-3 text-gray-300">{promo.subtitle || "—"}</td>
                      <td className="px-4 py-3 text-gray-300">{promo.cta_label || "—"}</td>
                      <td className="px-4 py-3 text-gray-300">
                        {promo.cta_href ? (
                          <a href={promo.cta_href} target="_blank" rel="noreferrer" className="underline text-crimson">
                            {promo.cta_href}
                          </a>
                        ) : (
                          "—"
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <span className={promo.is_active ? "text-green-400" : "text-gray-500"}>
                          {promo.is_active ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-400">{formatDateTime(promo.created_at)}</td>
                      <td className="px-4 py-3">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleToggleActive(promo)}
                            className="rounded-full border border-gray-700 px-3 py-1 text-xs text-gray-200 hover:bg-gray-800"
                          >
                            {promo.is_active ? "Set Inactive" : "Set Active"}
                          </button>
                          <button
                            onClick={() => setEditingId(promo.id)}
                            className="rounded-full border border-crimson px-3 py-1 text-xs text-crimson hover:bg-crimson/10"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(promo.id)}
                            className="rounded-full border border-red-600 px-3 py-1 text-xs text-red-400 hover:bg-red-600/10"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {editingPromo && (
          <section className="rounded-2xl border border-gray-800 bg-black/70 p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-crimson">Edit Promo</h2>
              <button
                onClick={() => setEditingId(null)}
                className="rounded-full border border-gray-700 px-4 py-1 text-sm text-gray-200 hover:bg-gray-800"
              >
                Cancel
              </button>
            </div>
            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
              <label className="flex flex-col text-xs uppercase tracking-wide text-gray-400">
                Title
                <input
                  value={editDraft.title}
                  onChange={(e) => setEditDraft((prev) => ({ ...prev, title: e.target.value }))}
                  className="mt-1 rounded-lg border border-gray-700 bg-black px-3 py-2 text-white focus:border-crimson focus:outline-none"
                  maxLength={120}
                  required
                />
              </label>
              <label className="flex flex-col text-xs uppercase tracking-wide text-gray-400">
                Subtitle
                <input
                  value={editDraft.subtitle}
                  onChange={(e) => setEditDraft((prev) => ({ ...prev, subtitle: e.target.value }))}
                  className="mt-1 rounded-lg border border-gray-700 bg-black px-3 py-2 text-white focus:border-crimson focus:outline-none"
                  maxLength={160}
                />
              </label>
              <label className="flex flex-col text-xs uppercase tracking-wide text-gray-400">
                CTA Label
                <input
                  value={editDraft.cta_label}
                  onChange={(e) => setEditDraft((prev) => ({ ...prev, cta_label: e.target.value }))}
                  className="mt-1 rounded-lg border border-gray-700 bg-black px-3 py-2 text-white focus:border-crimson focus:outline-none"
                  maxLength={60}
                />
              </label>
              <label className="flex flex-col text-xs uppercase tracking-wide text-gray-400">
                CTA URL
                <input
                  value={editDraft.cta_href}
                  onChange={(e) => setEditDraft((prev) => ({ ...prev, cta_href: e.target.value }))}
                  className="mt-1 rounded-lg border border-gray-700 bg-black px-3 py-2 text-white focus:border-crimson focus:outline-none"
                  placeholder="https://"
                />
              </label>
              <label className="inline-flex items-center gap-2 text-sm text-gray-200">
                <input
                  type="checkbox"
                  checked={editDraft.is_active}
                  onChange={(e) => setEditDraft((prev) => ({ ...prev, is_active: e.target.checked }))}
                  className="h-4 w-4 rounded border-gray-500 bg-black text-crimson focus:ring-crimson"
                />
                Active
              </label>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={handleEditSave}
                disabled={savingEdit}
                className="rounded-full bg-crimson px-6 py-2 text-sm font-semibold text-white transition hover:bg-crimson-hover disabled:cursor-not-allowed disabled:opacity-50"
              >
                {savingEdit ? "Saving…" : "Save Changes"}
              </button>
            </div>
          </section>
        )}
          </div>
        </div>
      </AdminLayout>
    </>
  );
}
