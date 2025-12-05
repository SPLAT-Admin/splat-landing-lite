"use client";
import { useEffect, useState, useCallback } from "react";
import { createClient } from "@supabase/supabase-js";
import Button from "@/components/ui/Button";
import Image from "next/image";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface Promo {
  id: string;
  title: string;
  subtitle?: string;
  cta_text?: string;
  cta_link?: string;
  bg_image_url?: string;
  visible?: boolean;
  updated_at?: string;
}

export default function HeroPromoEditor() {
  const [livePromo, setLivePromo] = useState<Promo | null>(null);
  const [draftPromo, setDraftPromo] = useState<Promo | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [preview, setPreview] = useState<"live" | "draft" | null>(null);

  async function fetchPromos() {
    const { data: live } = await supabase
      .from("promos")
      .select("*")
      .eq("id", "hero-main")
      .single();
    const { data: draft } = await supabase
      .from("promos")
      .select("*")
      .eq("id", "hero-next")
      .single();
    setLivePromo(live);
    setDraftPromo(draft);
  }

  useEffect(() => {
    fetchPromos();
  }, []);

  const updateField = useCallback(
    async (promo: Promo, field: keyof Promo, value: any) => {
      if (!promo) return;
      setSaving(true);
      setMessage("Saving...");
      const { error } = await supabase
        .from("promos")
        .update({ [field]: value, updated_at: new Date().toISOString() })
        .eq("id", promo.id);
      if (error) {
        console.error("❌ Save error:", error);
        setMessage("⚠️ Error saving changes");
      } else {
        setMessage("✅ Saved");
        if (promo.id === "hero-main") {
          setLivePromo({ ...promo, [field]: value });
        } else {
          setDraftPromo({ ...promo, [field]: value });
        }
      }
      setSaving(false);
      setTimeout(() => setMessage(""), 1500);
    },
    []
  );

  async function promoteDraftToLive() {
    if (!draftPromo || !livePromo) return;
    setMessage("🚀 Promoting draft...");

    const { error } = await supabase
      .from("promos")
      .update({
        title: draftPromo.title,
        subtitle: draftPromo.subtitle,
        cta_text: draftPromo.cta_text,
        cta_link: draftPromo.cta_link,
        bg_image_url: draftPromo.bg_image_url,
        visible: true,
        updated_at: new Date().toISOString(),
      })
      .eq("id", "hero-main");

    if (error) {
      console.error("❌ Promotion error:", error);
      setMessage("⚠️ Error promoting draft");
      return;
    }

    setMessage("✅ Draft promoted to live");
    setLivePromo(draftPromo);
    setDraftPromo(livePromo);
    setTimeout(() => setMessage(""), 2000);
  }

  const renderEditor = (promo: Promo | null, label: string) => {
    if (!promo) return <p>No {label} found.</p>;
    return (
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 flex flex-col gap-4">
        <h2 className="text-2xl font-semibold mb-2">{label}</h2>
        <label className="text-sm opacity-80">Title</label>
        <input
          type="text"
          value={promo.title || ""}
          onChange={(e) => updateField(promo, "title", e.target.value)}
          className="p-2 bg-neutral-800 rounded-md text-acid-white"
        />
        <label className="text-sm opacity-80">Subtitle</label>
        <textarea
          value={promo.subtitle || ""}
          onChange={(e) => updateField(promo, "subtitle", e.target.value)}
          className="p-2 bg-neutral-800 rounded-md text-acid-white min-h-[100px]"
        />
        <label className="text-sm opacity-80">CTA Text</label>
        <input
          type="text"
          value={promo.cta_text || ""}
          onChange={(e) => updateField(promo, "cta_text", e.target.value)}
          className="p-2 bg-neutral-800 rounded-md text-acid-white"
        />
        <label className="text-sm opacity-80">CTA Link</label>
        <input
          type="text"
          value={promo.cta_link || ""}
          onChange={(e) => updateField(promo, "cta_link", e.target.value)}
          className="p-2 bg-neutral-800 rounded-md text-acid-white"
        />
        <label className="text-sm opacity-80">Background Image URL</label>
        <input
          type="text"
          value={promo.bg_image_url || ""}
          onChange={(e) => updateField(promo, "bg_image_url", e.target.value)}
          className="p-2 bg-neutral-800 rounded-md text-acid-white"
        />
        <div className="flex items-center gap-3 mt-4">
          <label className="text-sm opacity-80">Visible</label>
          <input
            type="checkbox"
            checked={promo.visible ?? false}
            onChange={(e) => updateField(promo, "visible", e.target.checked)}
            className="w-5 h-5 accent-acid-white cursor-pointer"
          />
        </div>
        <div className="flex gap-3">
          <Button
            onClick={() => setPreview(promo.id === "hero-main" ? "live" : "draft")}
            className="mt-4 bg-acid-white text-black font-semibold"
          >
            👀 Preview {label}
          </Button>
        </div>
      </div>
    );
  };

  const renderPreview = (promo: Promo) => (
    <div className="relative min-h-[500px] border border-neutral-800 rounded-2xl overflow-hidden">
      {promo.bg_image_url && (
        <Image
          src={promo.bg_image_url}
          alt="Hero preview"
          fill
          className="object-cover opacity-90"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30 flex flex-col justify-center items-center text-center p-10">
        <h1 className="text-5xl font-bold mb-3">{promo.title}</h1>
        <p className="text-lg opacity-90 mb-5 max-w-2xl">{promo.subtitle}</p>
        {promo.cta_text && (
          <a
            href={promo.cta_link || "#"}
            className="inline-block px-6 py-3 bg-acid-white text-black rounded-full font-semibold hover:scale-[1.03] transition"
          >
            {promo.cta_text}
          </a>
        )}
      </div>
    </div>
  );

  if (preview && (preview === "live" ? livePromo : draftPromo)) {
    const promo = preview === "live" ? livePromo! : draftPromo!;
    return (
      <div className="min-h-screen bg-neutral-950 text-acid-white p-8">
        <Button
          onClick={() => setPreview(null)}
          className="mb-4 bg-acid-white text-black font-semibold"
        >
          ← Back to Editor
        </Button>
        {renderPreview(promo)}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-acid-white p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">🎨 Hero Promo Editor</h1>
        <Button
          onClick={promoteDraftToLive}
          className="bg-acid-white text-black font-semibold"
        >
          🚀 Promote Draft to Live
        </Button>
      </div>
      {message && <p className="mbียว
