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
  const [promo, setPromo] = useState<Promo | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [preview, setPreview] = useState(false);

  async function fetchPromo() {
    const { data } = await supabase
      .from("promos")
      .select("*")
      .eq("id", "hero-main")
      .single();
    setPromo(data);
  }

  useEffect(() => {
    fetchPromo();
  }, []);

  const updateField = useCallback(
    async (field: keyof Promo, value: any) => {
      if (!promo) return;
      setPromo({ ...promo, [field]: value });
      setSaving(true);
      setMessage("Saving...");
      const { error } = await supabase
        .from("promos")
        .update({ [field]: value, updated_at: new Date().toISOString() })
        .eq("id", "hero-main");
      if (error) {
        console.error("❌ Save error:", error);
        setMessage("⚠️ Error saving changes");
      } else {
        setMessage("✅ Saved");
      }
      setSaving(false);
      setTimeout(() => setMessage(""), 1500);
    },
    [promo]
  );

  if (!promo) {
    return (
      <div className="min-h-screen bg-neutral-950 text-acid-white flex items-center justify-center">
        <p>Loading hero promo...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-acid-white p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">🎨 Hero Promo Editor</h1>
        <Button
          onClick={() => setPreview(!preview)}
          className="bg-acid-white text-black font-semibold"
        >
          {preview ? "← Back to Editor" : "👀 Preview"}
        </Button>
      </div>
      {message && <p className="mb-4 opacity-80">{message}</p>}

      {!preview ? (
        <div className="grid gap-6 md:grid-cols-2">
          <div className="flex flex-col gap-4">
            <label className="text-sm opacity-80">Title</label>
            <input
              type="text"
              value={promo.title || ""}
              onChange={(e) => updateField("title", e.target.value)}
              className="p-2 bg-neutral-800 rounded-md text-acid-white"
            />

            <label className="text-sm opacity-80">Subtitle</label>
            <textarea
              value={promo.subtitle || ""}
              onChange={(e) => updateField("subtitle", e.target.value)}
              className="p-2 bg-neutral-800 rounded-md text-acid-white min-h-[100px]"
            />

            <label className="text-sm opacity-80">CTA Text</label>
            <input
              type="text"
              value={promo.cta_text || ""}
              onChange={(e) => updateField("cta_text", e.target.value)}
              className="p-2 bg-neutral-800 rounded-md text-acid-white"
            />

            <label className="text-sm opacity-80">CTA Link</label>
            <input
              type="text"
              value={promo.cta_link || ""}
              onChange={(e) => updateField("cta_link", e.target.value)}
              className="p-2 bg-neutral-800 rounded-md text-acid-white"
            />

            <label className="text-sm opacity-80">Background Image URL</label>
            <input
              type="text"
              value={promo.bg_image_url || ""}
              onChange={(e) => updateField("bg_image_url", e.target.value)}
              className="p-2 bg-neutral-800 rounded-md text-acid-white"
            />

            <div className="flex items-center gap-3 mt-4">
              <label className="text-sm opacity-80">Visible</label>
              <input
                type="checkbox"
                checked={promo.visible ?? false}
                onChange={(e) => updateField("visible", e.target.checked)}
                className="w-5 h-5 accent-acid-white cursor-pointer"
              />
            </div>

            {saving && <p className="text-yellow-400 mt-2 animate-pulse">Saving...</p>}
          </div>

          <div className="relative border border-neutral-800 rounded-xl overflow-hidden min-h-[320px] bg-neutral-900">
            {promo.bg_image_url ? (
              <Image
                src={promo.bg_image_url}
                alt="Hero background"
                fill
                className="object-cover opacity-80"
              />
            ) : (
              <div className="flex items-center justify-center h-full opacity-60 text-sm">
                No image set
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 flex flex-col justify-center p-8 text-left">
              <h2 className="text-3xl font-bold">{promo.title || "Hero Title"}</h2>
              <p className="text-lg opacity-80 mt-2">
                {promo.subtitle || "Hero subtitle or tagline."}
              </p>
              {promo.cta_text && (
                <a
                  href={promo.cta_link || "#"}
                  className="inline-block mt-4 px-5 py-2 bg-acid-white text-black rounded-full font-semibold hover:scale-[1.03] transition"
                >
                  {promo.cta_text}
                </a>
              )}
            </div>
          </div>
        </div>
      ) : (
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
      )}
    </div>
  );
}
