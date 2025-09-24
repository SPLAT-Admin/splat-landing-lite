import type { NextApiRequest, NextApiResponse } from "next";
import { supabaseService } from "@/lib/supabaseClient";

type PromoPayload = {
  id?: string;
  title?: string;
  subtitle?: string | null;
  cta_label?: string | null;
  cta_href?: string | null;
  is_active?: boolean;
};

const decodeBase64Url = (input: string) => {
  const base64 = input.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), "=");
  return Buffer.from(padded, "base64").toString("utf8");
};

const extractAccessToken = (req: NextApiRequest): string | null => {
  const header = req.headers.authorization;
  if (header?.startsWith("Bearer ")) return header.slice(7);

  const candidates = [
    req.cookies["sb-access-token"],
    req.cookies["sb:token"],
    req.cookies["supabase-access-token"],
    req.cookies["supabase-auth-token"],
    req.cookies["access_token"],
  ].filter(Boolean) as string[];

  for (const candidate of candidates) {
    if (candidate.startsWith("[")) {
      try {
        const parsed = JSON.parse(candidate);
        if (Array.isArray(parsed) && parsed[0]) return parsed[0];
      } catch (err) {
        console.warn("Failed to parse Supabase cookie", err);
      }
    } else {
      return candidate;
    }
  }

  return null;
};

const isAdmin = (token: string | null) => {
  if (!token) return false;
  try {
    const [, payload] = token.split(".");
    if (!payload) return false;
    const json = JSON.parse(decodeBase64Url(payload));
    return json?.user_role === "admin" || json?.role === "admin";
  } catch (err) {
    console.warn("Unable to decode JWT", err);
    return false;
  }
};

const requireAdmin = (req: NextApiRequest, res: NextApiResponse): string | null => {
  const token = extractAccessToken(req);
  if (!isAdmin(token)) {
    res.status(401).json({ data: null, error: "Unauthorized" });
    return null;
  }
  return token;
};

const toNullable = (value: unknown) => {
  if (typeof value !== "string") return value ?? null;
  const trimmed = value.trim();
  return trimmed.length ? trimmed : null;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const { data, error } = await supabaseService
      .from("promos")
      .select("id,title,subtitle,cta_label,cta_href,is_active,created_at")
      .order("created_at", { ascending: false });

    if (error) return res.status(500).json({ data: null, error: error.message });
    return res.status(200).json({ data, error: null });
  }

  if (req.method === "POST") {
    if (!requireAdmin(req, res)) return;

    const payload = req.body as PromoPayload;
    const title = payload.title?.trim();
    if (!title) {
      return res.status(400).json({ data: null, error: "Title is required" });
    }

    const { is_active = false } = payload;

    if (is_active) {
      await supabaseService.from("promos").update({ is_active: false }).eq("is_active", true);
    }

    const { data, error } = await supabaseService
      .from("promos")
      .insert([
        {
          title,
          subtitle: toNullable(payload.subtitle),
          cta_label: toNullable(payload.cta_label),
          cta_href: toNullable(payload.cta_href),
          is_active,
        },
      ])
      .select("id,title,subtitle,cta_label,cta_href,is_active,created_at")
      .single();

    if (error) return res.status(500).json({ data: null, error: error.message });
    return res.status(200).json({ data, error: null });
  }

  if (req.method === "PUT") {
    if (!requireAdmin(req, res)) return;

    const payload = req.body as PromoPayload;
    if (!payload.id) return res.status(400).json({ data: null, error: "Promo id is required" });

    const updates: Record<string, unknown> = {};
    if (payload.title !== undefined) {
      if (!payload.title.trim()) {
        return res.status(400).json({ data: null, error: "Title cannot be empty" });
      }
      updates.title = payload.title.trim();
    }
    if (payload.subtitle !== undefined) updates.subtitle = toNullable(payload.subtitle ?? null);
    if (payload.cta_label !== undefined) updates.cta_label = toNullable(payload.cta_label ?? null);
    if (payload.cta_href !== undefined) updates.cta_href = toNullable(payload.cta_href ?? null);
    if (payload.is_active !== undefined) updates.is_active = payload.is_active;

    if (payload.is_active) {
      await supabaseService
        .from("promos")
        .update({ is_active: false })
        .eq("is_active", true)
        .neq("id", payload.id);
    }

    const { data, error } = await supabaseService
      .from("promos")
      .update(updates)
      .eq("id", payload.id)
      .select("id,title,subtitle,cta_label,cta_href,is_active,created_at")
      .single();

    if (error) return res.status(500).json({ data: null, error: error.message });
    return res.status(200).json({ data, error: null });
  }

  if (req.method === "DELETE") {
    if (!requireAdmin(req, res)) return;

    const { id } = req.query;
    const promoId = Array.isArray(id) ? id[0] : id;
    if (!promoId) return res.status(400).json({ data: null, error: "Promo id is required" });

    const { data, error } = await supabaseService
      .from("promos")
      .delete()
      .eq("id", promoId)
      .select("id")
      .single();

    if (error) return res.status(500).json({ data: null, error: error.message });
    return res.status(200).json({ data, error: null });
  }

  res.setHeader("Allow", "GET,POST,PUT,DELETE");
  return res.status(405).json({ data: null, error: "Method Not Allowed" });
}
