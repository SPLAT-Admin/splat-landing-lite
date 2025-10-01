import { useCallback, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import AdminLayout from "@/components/layouts/AdminLayout";
import { getSupabaseClient } from "@/lib/supabaseClient";

const supabase = getSupabaseClient();

const brand = {
  background: "bg-[#070709]",
  panel: "bg-[#101015]/95",
  border: "border-[#2f0f15]/70",
  crimson: "#851825",
  crimsonHover: "#6f1320",
};

interface Ambassador {
  id: string;
  first_name: string;
  last_name: string;
  preferred_name: string | null;
  email: string;
  city: string;
  state: string;
  social_media_handles: string;
  number_of_followers: number;
  qualifications_why: string;
  referral: string | null;
  status: string;
  created_at: string;
}

interface Contact {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
}

interface EmailSignup {
  id: string;
  email: string;
  signup_source: string;
  created_at: string;
}

interface FounderPurchase {
  id: string;
  email: string;
  purchase_amount: number;
  tier: string;
  status: string;
  purchase_date: string;
}

interface Promo {
  id: string;
  title: string;
  subtitle: string | null;
  cta_label: string | null;
  cta_href: string | null;
  is_active: boolean;
  created_at: string;
}

interface Product {
  id: string;
  name: string;
  price: number;
  is_active: boolean;
  created_at: string;
  description?: string | null;
  image_url?: string | null;
  featured?: boolean;
}

interface Order {
  id: string;
  customer_email: string;
  product_name: string;
  quantity: number;
  total_amount: number;
  status: string;
  created_at: string;
}

type ProductDraft = {
  name: string;
  price: string;
  is_active: boolean;
};

type OrderStatusDraft = Record<string, string>;

export default function AdminDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);

  const [ambassadors, setAmbassadors] = useState<Ambassador[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [emailSignups, setEmailSignups] = useState<EmailSignup[]>([]);
  const [founderPurchases, setFounderPurchases] = useState<FounderPurchase[]>([]);
  const [promos, setPromos] = useState<Promo[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  const [createPromoDraft, setCreatePromoDraft] = useState({
    title: "",
    subtitle: "",
    cta_label: "",
    cta_href: "",
    is_active: false,
  });
  const [creatingPromo, setCreatingPromo] = useState(false);

  const [productDraft, setProductDraft] = useState<ProductDraft>({ name: "", price: "", is_active: true });
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [productSaving, setProductSaving] = useState(false);
  const [productTogglePending, setProductTogglePending] = useState<Record<string, boolean>>({});

  const [promoDeletingId, setPromoDeletingId] = useState<string | null>(null);
  const [orderStatusDraft, setOrderStatusDraft] = useState<OrderStatusDraft>({});
  const [orderSavingId, setOrderSavingId] = useState<string | null>(null);

  const formatDateTime = useMemo(
    () => (value: string) => new Date(value).toLocaleString(),
    []
  );

  const fetchAll = useCallback(async () => {
    const [ambassadorRes, contactRes, emailRes, founderRes, promoRes, productRes, orderRes] = await Promise.all([
      supabase.from("ambassador").select("*").order("created_at", { ascending: false }),
      supabase.from("contacts").select("*").order("created_at", { ascending: false }),
      supabase.from("email_signups").select("id,email,signup_source,created_at").order("created_at", { ascending: false }),
      supabase.from("founder_purchases").select("id,email,purchase_amount,tier,status,purchase_date").order("purchase_date", { ascending: false }),
      supabase.from("promos").select("*").order("created_at", { ascending: false }),
      supabase.from("products").select("*").order("created_at", { ascending: false }),
      supabase.from("orders").select("id,customer_email,product_name,quantity,total_amount,status,created_at").order("created_at", { ascending: false }),
    ]);

    if (!ambassadorRes.error && ambassadorRes.data) setAmbassadors(ambassadorRes.data as Ambassador[]);
    if (!contactRes.error && contactRes.data) setContacts(contactRes.data as Contact[]);
    if (!emailRes.error && emailRes.data) setEmailSignups(emailRes.data as EmailSignup[]);
    if (!founderRes.error && founderRes.data) setFounderPurchases(founderRes.data as FounderPurchase[]);
    if (!promoRes.error && promoRes.data) setPromos(promoRes.data as Promo[]);
    if (!productRes.error && productRes.data) setProducts(productRes.data as Product[]);
    if (!orderRes.error && orderRes.data) setOrders(orderRes.data as Order[]);
  }, []);

  useEffect(() => {
    const init = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        setAuthError(error.message);
        setLoading(false);
        return;
      }

      if (!data.session) {
        router.replace("/login");
        return;
      }

      await fetchAll();
      setLoading(false);
    };

    void init();
  }, [fetchAll, router]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.replace("/login");
  };

  const handleAmbassadorStatus = async (id: string, status: string) => {
    setAmbassadors((prev) => prev.map((amb) => (amb.id === id ? { ...amb, status } : amb)));
    const { error } = await supabase.from("ambassador").update({ status }).eq("id", id);
    if (error) await fetchAll();
  };

  const handlePromoCreate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!createPromoDraft.title.trim()) return;
    setCreatingPromo(true);
    const payload = {
      title: createPromoDraft.title.trim(),
      subtitle: createPromoDraft.subtitle.trim() || null,
      cta_label: createPromoDraft.cta_label.trim() || null,
      cta_href: createPromoDraft.cta_href.trim() || null,
      is_active: createPromoDraft.is_active,
    };
    const { error } = await supabase.from("promos").insert([payload]);
    setCreatingPromo(false);
    if (!error) {
      setCreatePromoDraft({ title: "", subtitle: "", cta_label: "", cta_href: "", is_active: false });
      await fetchAll();
    }
  };

  const handlePromoDelete = async (id: string) => {
    setPromoDeletingId(id);
    const { error } = await supabase.from("promos").delete().eq("id", id);
    setPromoDeletingId(null);
    if (!error) await fetchAll();
  };

  const resetProductDraft = () => {
    setProductDraft({ name: "", price: "", is_active: true });
    setEditingProductId(null);
  };

  const handleProductSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!productDraft.name.trim()) return;
    const priceValue = parseFloat(productDraft.price);
    if (Number.isNaN(priceValue) || priceValue < 0) {
      setToast({ message: "Price must be a positive number.", type: "error" });
      return;
    }

    setProductSaving(true);

    if (editingProductId) {
      const { error } = await supabase
        .from("products")
        .update({
          name: productDraft.name.trim(),
          price: priceValue,
          is_active: productDraft.is_active,
        })
        .eq("id", editingProductId);
      setProductSaving(false);
      if (!error) {
        resetProductDraft();
        await fetchAll();
      }
    } else {
      const { error } = await supabase.from("products").insert([
        {
          name: productDraft.name.trim(),
          price: priceValue,
          is_active: productDraft.is_active,
        },
      ]);
      setProductSaving(false);
      if (!error) {
        resetProductDraft();
        await fetchAll();
      }
    }
  };

  const handleProductEdit = (product: Product) => {
    setEditingProductId(product.id);
    setProductDraft({
      name: product.name,
      price: product.price.toString(),
      is_active: product.is_active,
    });
  };

  const handleProductDelete = async (id: string) => {
    setProductSaving(true);
    const { error } = await supabase.from("products").delete().eq("id", id);
    setProductSaving(false);
    if (!error) {
      if (editingProductId === id) resetProductDraft();
      await fetchAll();
    }
  };

  const handleProductToggle = async (product: Product, nextActive: boolean) => {
    setProducts((prev) => prev.map((p) => (p.id === product.id ? { ...p, is_active: nextActive } : p)));
    setProductTogglePending((prev) => ({ ...prev, [product.id]: true }));

    try {
      const response = await fetch(`/api/products/${product.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_active: nextActive }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.error || "Failed to update product.");
      }

      setToast({
        message: nextActive ? "Product published to storefront." : "Product hidden from storefront.",
        type: "success",
      });
    } catch (error) {
      console.error("product toggle error", error);
      setProducts((prev) => prev.map((p) => (p.id === product.id ? { ...p, is_active: !nextActive } : p)));
      setToast({
        message: error instanceof Error ? error.message : "Failed to update product.",
        type: "error",
      });
    } finally {
      setProductTogglePending((prev) => {
        const next = { ...prev };
        delete next[product.id];
        return next;
      });
    }
  };

  const handleOrderStatusChange = (id: string, status: string) => {
    setOrderStatusDraft((prev) => ({ ...prev, [id]: status }));
  };

  const handleOrderStatusSave = async (id: string) => {
    const nextStatus = orderStatusDraft[id];
    if (!nextStatus) return;
    setOrderSavingId(id);
    const { error } = await supabase.from("orders").update({ status: nextStatus }).eq("id", id);
    setOrderSavingId(null);
    if (!error) {
      await fetchAll();
    }
  };

  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  useEffect(() => {
    if (!toast) return;
    const timeout = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(timeout);
  }, [toast]);

  if (loading) {
    return (
      <AdminLayout>
        <div className={`${brand.background} flex min-h-[60vh] items-center justify-center rounded-3xl border border-white/10 text-white`}>
          <p className="animate-pulse tracking-[0.4em] uppercase text-xs text-white/60">Loading SPL@T admin…</p>
        </div>
      </AdminLayout>
    );
  }

  if (authError) {
    return (
      <AdminLayout>
        <div className={`${brand.background} flex min-h-[60vh] items-center justify-center rounded-3xl border border-white/10 p-12 text-white`}>
          <div className="max-w-md space-y-4 text-center">
            <h1 className="text-3xl font-bold text-[#851825]">Access Error</h1>
            <p className="text-white/80">{authError}</p>
            <Link href="/login" className="inline-flex items-center justify-center rounded-full bg-[#851825] px-6 py-2 font-semibold shadow hover:bg-[#6f1320]">
              Go to Login
            </Link>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <>
      <Head>
        <title>SPL@T Admin Dashboard</title>
      </Head>
      <AdminLayout>
        <div className={`${brand.background} min-h-screen text-white`}>
        <header className="sticky top-0 z-40 border-b border-white/10 bg-black/80 backdrop-blur">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
            <h1 className="text-xl font-extrabold uppercase tracking-[0.35em]">SPL@T Admin</h1>
            <div className="flex items-center gap-3">
              <button
                onClick={() => fetchAll()}
                className="rounded-full border border-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white hover:bg-white/10"
              >
                Refresh
              </button>
              <button
                onClick={handleSignOut}
                className="rounded-full bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white hover:bg-white/20"
              >
                Sign Out
              </button>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-7xl space-y-10 px-6 py-10">
          <Section title="Ambassador Applications" subtitle="Approve or reject incoming applications.">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-white/10 text-sm">
                <thead className="bg-white/5 uppercase tracking-[0.3em] text-white/60">
                  <tr>
                    <th className="px-4 py-3 text-left">Name</th>
                    <th className="px-4 py-3 text-left">Location</th>
                    <th className="px-4 py-3 text-left">Followers</th>
                    <th className="px-4 py-3 text-left">Status</th>
                    <th className="px-4 py-3 text-left">Applied</th>
                    <th className="px-4 py-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {ambassadors.map((amb) => (
                    <tr key={amb.id} className="transition hover:bg-white/5">
                      <td className="px-4 py-3">
                        <p className="font-semibold text-white">
                          {amb.first_name} {amb.last_name}
                          {amb.preferred_name ? <span className="ml-2 text-xs text-white/60">({amb.preferred_name})</span> : null}
                        </p>
                        <p className="text-xs text-white/50">{amb.email}</p>
                      </td>
                      <td className="px-4 py-3 text-white/75">{amb.city}, {amb.state}</td>
                      <td className="px-4 py-3 text-white/75">{Number(amb.number_of_followers).toLocaleString()}</td>
                      <td className="px-4 py-3 capitalize text-white/75">{amb.status}</td>
                      <td className="px-4 py-3 text-white/60">{formatDateTime(amb.created_at)}</td>
                      <td className="px-4 py-3 space-x-2">
                        <button
                          onClick={() => handleAmbassadorStatus(amb.id, "approved")}
                          className="rounded-full bg-[#851825] px-3 py-1 text-xs font-semibold hover:bg-[#6f1320]"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleAmbassadorStatus(amb.id, "rejected")}
                          className="rounded-full border border-white/20 px-3 py-1 text-xs font-semibold text-white hover:bg-white/10"
                        >
                          Reject
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>

          <Section title="Contact Messages" subtitle="Latest submissions from the crew.">
            <div className="grid gap-4 md:grid-cols-2">
              {contacts.map((contact) => (
                <article key={contact.id} className="rounded-2xl border border-white/10 bg-black/65 p-5">
                  <div className="flex items-center justify-between text-xs text-white/50">
                    <span>{formatDateTime(contact.created_at)}</span>
                  </div>
                  <h3 className="mt-2 text-lg font-semibold text-white">{contact.name}</h3>
                  <a href={`mailto:${contact.email}`} className="text-xs text-[#e04a5f] hover:text-white">
                    {contact.email}
                  </a>
                  <p className="mt-3 text-sm text-white/80 whitespace-pre-line">{contact.message}</p>
                </article>
              ))}
              {!contacts.length && <EmptyState message="No contact messages yet." />}
            </div>
          </Section>

          <Section title="Email Signups" subtitle="Waitlist and marketing leads.">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <p className="text-white/60 text-sm">Export includes timestamp, email, and source.</p>
              <Link
                href="/api/admin/signups/export"
                className="rounded-full bg-[#851825] px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white shadow hover:bg-[#6f1320]"
              >
                Export CSV
              </Link>
            </div>
            <div className="mt-6 overflow-x-auto">
              <table className="min-w-full divide-y divide-white/10 text-sm">
                <thead className="bg-white/5 uppercase tracking-[0.3em] text-white/60">
                  <tr>
                    <th className="px-4 py-3 text-left">Email</th>
                    <th className="px-4 py-3 text-left">Source</th>
                    <th className="px-4 py-3 text-left">Signed Up</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {emailSignups.map((signup) => (
                    <tr key={signup.id} className="transition hover:bg-white/5">
                      <td className="px-4 py-3 text-white">{signup.email}</td>
                      <td className="px-4 py-3 text-white/70 capitalize">{signup.signup_source}</td>
                      <td className="px-4 py-3 text-white/60">{formatDateTime(signup.created_at)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>

          <Section title="Founder Purchases" subtitle="Stripe founder-tier purchases.">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-white/10 text-sm">
                <thead className="bg-white/5 uppercase tracking-[0.3em] text-white/60">
                  <tr>
                    <th className="px-4 py-3 text-left">Email</th>
                    <th className="px-4 py-3 text-left">Tier</th>
                    <th className="px-4 py-3 text-left">Amount</th>
                    <th className="px-4 py-3 text-left">Status</th>
                    <th className="px-4 py-3 text-left">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {founderPurchases.map((purchase) => (
                    <tr key={purchase.id} className="transition hover:bg-white/5">
                      <td className="px-4 py-3 text-white">{purchase.email}</td>
                      <td className="px-4 py-3 text-white/70 uppercase">{purchase.tier}</td>
                      <td className="px-4 py-3 text-white/80">${purchase.purchase_amount.toFixed(2)}</td>
                      <td className="px-4 py-3 capitalize text-white/70">{purchase.status}</td>
                      <td className="px-4 py-3 text-white/60">{formatDateTime(purchase.purchase_date)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>

          <Section title="Promos" subtitle="Manage hero promo blocks.">
            <form onSubmit={handlePromoCreate} className="grid gap-4 rounded-2xl border border-white/10 bg-black/60 p-6 md:grid-cols-2">
              <TextField
                label="Title"
                value={createPromoDraft.title}
                onChange={(value) => setCreatePromoDraft((prev) => ({ ...prev, title: value }))}
                required
              />
              <TextField
                label="Subtitle"
                value={createPromoDraft.subtitle}
                onChange={(value) => setCreatePromoDraft((prev) => ({ ...prev, subtitle: value }))}
              />
              <TextField
                label="CTA Label"
                value={createPromoDraft.cta_label}
                onChange={(value) => setCreatePromoDraft((prev) => ({ ...prev, cta_label: value }))}
              />
              <TextField
                label="CTA URL"
                value={createPromoDraft.cta_href}
                onChange={(value) => setCreatePromoDraft((prev) => ({ ...prev, cta_href: value }))}
                placeholder="https://"
              />
              <label className="inline-flex items-center gap-3 text-sm text-white/80">
                <input
                  type="checkbox"
                  checked={createPromoDraft.is_active}
                  onChange={(event) =>
                    setCreatePromoDraft((prev) => ({ ...prev, is_active: event.target.checked }))
                  }
                  className="h-4 w-4 rounded border-white/30 bg-white/10 accent-[#851825]"
                />
                Active
              </label>
              <div className="flex items-end">
                <button
                  type="submit"
                  disabled={creatingPromo}
                  className="w-full rounded-full bg-[#851825] py-3 font-bold uppercase tracking-[0.3em] text-white transition hover:scale-[1.01] hover:bg-[#6f1320] disabled:scale-100 disabled:opacity-60"
                >
                  {creatingPromo ? "Creating…" : "Create Promo"}
                </button>
              </div>
            </form>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {promos.map((promo) => (
                <article key={promo.id} className="rounded-2xl border border-white/10 bg-black/65 p-5">
                  <div className="flex items-center justify-between text-xs text-white/50">
                    <span>{formatDateTime(promo.created_at)}</span>
                    <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${promo.is_active ? "bg-[#851825]/80" : "bg-white/15"}`}>
                      {promo.is_active ? "Active" : "Draft"}
                    </span>
                  </div>
                  <h3 className="mt-2 text-lg font-semibold text-white">{promo.title}</h3>
                  {promo.subtitle && <p className="mt-2 text-sm text-white/70">{promo.subtitle}</p>}
                  <div className="mt-4 flex items-center justify-between text-xs text-white/60">
                    <div>
                      <p>{promo.cta_label || "No CTA"}</p>
                      {promo.cta_href && (
                        <a href={promo.cta_href} target="_blank" rel="noreferrer" className="text-[#e04a5f] hover:text-white">
                          {promo.cta_href}
                        </a>
                      )}
                    </div>
                    <button
                      onClick={() => handlePromoDelete(promo.id)}
                      disabled={promoDeletingId === promo.id}
                      className="rounded-full border border-white/20 px-3 py-1 font-semibold text-white hover:bg-white/10 disabled:opacity-50"
                    >
                      {promoDeletingId === promo.id ? "Deleting…" : "Delete"}
                    </button>
                  </div>
                </article>
              ))}
              {!promos.length && <EmptyState message="No promos yet." />}
            </div>
          </Section>

          <Section title="Products" subtitle="Manage storefront items.">
            <form onSubmit={handleProductSubmit} className="grid gap-4 rounded-2xl border border-white/10 bg-black/60 p-6 md:grid-cols-4">
              <div className="md:col-span-2">
                <TextField
                  label="Product Name"
                  value={productDraft.name}
                  onChange={(value) => setProductDraft((prev) => ({ ...prev, name: value }))}
                  required
                />
              </div>
              <div>
                <TextField
                  label="Price"
                  value={productDraft.price}
                  onChange={(value) => setProductDraft((prev) => ({ ...prev, price: value }))}
                  placeholder="49.00"
                  required
                />
              </div>
              <div className="flex items-end">
                <label className="inline-flex w-full items-center justify-between rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white/80">
                  Active
                  <input
                    type="checkbox"
                    checked={productDraft.is_active}
                    onChange={(event) => setProductDraft((prev) => ({ ...prev, is_active: event.target.checked }))}
                    className="h-4 w-4 rounded border-white/30 bg-white/10 accent-[#851825]"
                  />
                </label>
              </div>
              <div className="md:col-span-4 flex flex-wrap items-center gap-3">
                <button
                  type="submit"
                  disabled={productSaving}
                  className="rounded-full bg-[#851825] px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:scale-[1.01] hover:bg-[#6f1320] disabled:scale-100 disabled:opacity-60"
                >
                  {editingProductId ? (productSaving ? "Saving…" : "Save Changes") : productSaving ? "Creating…" : "Add Product"}
                </button>
                {editingProductId && (
                  <button
                    type="button"
                    onClick={resetProductDraft}
                    className="rounded-full border border-white/20 px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-white hover:bg-white/10"
                  >
                    Cancel Edit
                  </button>
                )}
              </div>
            </form>

            <div className="mt-6 overflow-x-auto">
              <table className="min-w-full divide-y divide-white/10 text-sm">
                <thead className="bg-white/5 uppercase tracking-[0.3em] text-white/60">
                  <tr>
                    <th className="px-4 py-3 text-left">Product</th>
                    <th className="px-4 py-3 text-left">Price</th>
                    <th className="px-4 py-3 text-left">Visibility</th>
                    <th className="px-4 py-3 text-left">Created</th>
                    <th className="px-4 py-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {products.map((product) => {
                    const togglePending = Boolean(productTogglePending[product.id]);
                    return (
                      <tr key={product.id} className="transition hover:bg-white/5">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-4">
                            <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-black/40">
                              {product.image_url ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img src={product.image_url} alt={product.name} className="h-full w-full object-cover" />
                              ) : (
                                <span className="text-3xl">🛍️</span>
                              )}
                            </div>
                            <div className="space-y-1">
                              <p className="text-sm font-semibold text-white">{product.name}</p>
                              {product.description ? (
                                <p className="text-xs text-white/60 overflow-hidden">{product.description}</p>
                              ) : null}
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-white/80">${product.price.toFixed(2)}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <span className={`text-xs uppercase tracking-[0.3em] ${product.is_active ? "text-emerald-300" : "text-white/50"}`}>
                              {product.is_active ? "Active" : "Hidden"}
                            </span>
                            <button
                              type="button"
                              role="switch"
                              aria-checked={product.is_active}
                              onClick={() => handleProductToggle(product, !product.is_active)}
                              disabled={togglePending}
                              className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${product.is_active ? "bg-[#851825]" : "bg-white/20"} ${togglePending ? "opacity-60" : ""}`}
                            >
                              <span className={`inline-block h-5 w-5 transform rounded-full bg-acid-white transition ${product.is_active ? "translate-x-5" : "translate-x-1"}`} />
                            </button>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-white/60">{formatDateTime(product.created_at)}</td>
                        <td className="px-4 py-3 space-x-2">
                          <button
                            onClick={() => handleProductEdit(product)}
                            className="rounded-full border border-white/20 px-3 py-1 text-xs font-semibold text-white hover:bg-white/10"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleProductDelete(product.id)}
                            disabled={productSaving}
                            className="rounded-full border border-red-400/40 px-3 py-1 text-xs font-semibold text-red-300 hover:bg-red-500/10 disabled:opacity-50"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Section>

          <Section title="Orders" subtitle="Manage merch order flow.">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-white/10 text-sm">
                <thead className="bg-white/5 uppercase tracking-[0.3em] text-white/60">
                  <tr>
                    <th className="px-4 py-3 text-left">Customer</th>
                    <th className="px-4 py-3 text-left">Product</th>
                    <th className="px-4 py-3 text-left">Qty</th>
                    <th className="px-4 py-3 text-left">Total</th>
                    <th className="px-4 py-3 text-left">Status</th>
                    <th className="px-4 py-3 text-left">Created</th>
                    <th className="px-4 py-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {orders.map((order) => (
                    <tr key={order.id} className="transition hover:bg-white/5">
                      <td className="px-4 py-3 text-white">{order.customer_email}</td>
                      <td className="px-4 py-3 text-white/75">{order.product_name}</td>
                      <td className="px-4 py-3 text-white/75">{order.quantity}</td>
                      <td className="px-4 py-3 text-white/80">${order.total_amount.toFixed(2)}</td>
                      <td className="px-4 py-3 text-white/70 capitalize">{order.status}</td>
                      <td className="px-4 py-3 text-white/60">{formatDateTime(order.created_at)}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <select
                            value={orderStatusDraft[order.id] ?? order.status}
                            onChange={(event) => handleOrderStatusChange(order.id, event.target.value)}
                            className="rounded-full border border-white/20 bg-black/60 px-3 py-1 text-xs text-white focus:border-[#851825] focus:outline-none focus:ring-1 focus:ring-[#851825]/60"
                          >
                            {['pending','processing','fulfilled','cancelled'].map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                          <button
                            onClick={() => handleOrderStatusSave(order.id)}
                            disabled={orderSavingId === order.id}
                            className="rounded-full bg-[#851825] px-3 py-1 text-xs font-semibold text-white hover:bg-[#6f1320] disabled:opacity-60"
                          >
                            {orderSavingId === order.id ? "Saving…" : "Update"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {!orders.length && <EmptyState message="No orders yet." />}
          </Section>
        </main>

        {toast && (
          <div
            className={`fixed bottom-6 right-6 rounded-2xl px-5 py-3 text-sm shadow-xl ${
              toast.type === "error"
                ? "border border-red-500/40 bg-red-500/20 text-red-200"
                : "border border-emerald-400/40 bg-emerald-500/20 text-emerald-200"
            }`}
          >
            {toast.message}
          </div>
        )}
        </div>
      </AdminLayout>
    </>
  );
}

type SectionProps = {
  title: string;
  subtitle?: string;
  children: ReactNode;
};

function Section({ title, subtitle, children }: SectionProps) {
  return (
    <section className={`${brand.panel} rounded-3xl border ${brand.border} p-6 shadow-[0_25px_55px_rgba(133,23,37,0.25)]`}>
      <header className="mb-6 space-y-2">
        <h2 className="text-xl font-bold text-white">{title}</h2>
        {subtitle ? <p className="text-sm text-white/60">{subtitle}</p> : null}
      </header>
      {children}
    </section>
  );
}

type TextFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  placeholder?: string;
};

function TextField({ label, value, onChange, required, placeholder }: TextFieldProps) {
  return (
    <label className="flex flex-col text-sm text-white/70">
      <span className="text-xs font-semibold uppercase tracking-[0.3em] text-white/50">{label}</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        required={required}
        placeholder={placeholder}
        className="mt-2 w-full rounded-2xl border border-white/10 bg-black/70 px-4 py-3 text-white placeholder-white/40 focus:border-[#851825] focus:outline-none focus:ring-2 focus:ring-[#851825]/60"
      />
    </label>
  );
}

type EmptyStateProps = {
  message: string;
};

function EmptyState({ message }: EmptyStateProps) {
  return (
    <div className="rounded-2xl border border-dashed border-white/20 bg-black/40 px-4 py-8 text-center text-sm text-white/60">
      {message}
    </div>
  );
}
