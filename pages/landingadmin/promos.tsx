'use client';
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Eye, EyeOff, Plus, Trash2, Save, Monitor } from 'lucide-react';
import LayoutWrapper from './_layoutWrapper';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface Promo {
  id: string;
  title: string;
  subtitle?: string;
  cta_label?: string;
  cta_href?: string;
  image_url?: string;
  visible?: boolean;
  is_active?: boolean;
  scheduled_start?: string | null;
  scheduled_end?: string | null;
  created_at: string;
}

export default function PromoEditorDashboard() {
  const [promos, setPromos] = useState<Promo[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [previewPromo, setPreviewPromo] = useState<Promo | null>(null);

  async function fetchPromos() {
    setLoading(true);
    const { data, error } = await supabase
      .from('promos')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) {
      console.error('Fetch error:', error);
      setMessage('⚠️ Error loading promos');
    } else {
      setPromos(data || []);
    }
    setLoading(false);
  }

  useEffect(() => { fetchPromos(); }, []);

  async function handleSave(promo: Promo) {
    setSaving(true);
    const { error } = await supabase.from('promos').update(promo).eq('id', promo.id);
    if (error) {
      console.error('Save error:', error);
      setMessage('⚠️ Error saving changes');
    } else {
      setMessage('✅ Promo updated successfully');
      await fetchPromos();
    }
    setSaving(false);
  }

  async function toggleVisible(id: string, current: boolean) {
    setSaving(true);
    const { error } = await supabase.from('promos').update({ visible: !current }).eq('id', id);
    if (error) setMessage('⚠️ Error updating visibility');
    else {
      setMessage('✅ Visibility updated');
      await fetchPromos();
    }
    setSaving(false);
  }

  async function createPromo() {
    const { error } = await supabase.from('promos').insert([{ title: 'New Promo', visible: false }]);
    if (error) {
      console.error('Create error:', error);
      setMessage('⚠️ Error creating promo');
    } else {
      setMessage('✅ New promo created');
      fetchPromos();
    }
  }

  async function deletePromo(id: string) {
    if (!confirm('Delete this promo?')) return;
    const { error } = await supabase.from('promos').delete().eq('id', id);
    if (error) {
      console.error('Delete error:', error);
      setMessage('⚠️ Error deleting promo');
    } else {
      setMessage('✅ Promo deleted');
      fetchPromos();
    }
  }

  return (
    <LayoutWrapper>
      <div className="min-h-screen bg-neutral-950 text-acid-white p-8 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">🎛 Promo Editor Dashboard</h1>
          <div className="flex gap-3">
            <Button onClick={fetchPromos} className="bg-neutral-800 hover:bg-neutral-700">Refresh</Button>
            <Button onClick={createPromo} className="bg-acid-white text-black flex items-center gap-2">
              <Plus className="w-4 h-4" /> New
            </Button>
          </div>
        </div>

        {message && <p className="text-acid-white/70">{message}</p>}
        {saving && <p className="opacity-50">Saving...</p>}

        {loading ? (
          <p>Loading promos...</p>
        ) : (
          <div className="overflow-auto border border-neutral-800 rounded-2xl">
            <table className="w-full text-left text-sm">
              <thead className="bg-neutral-900">
                <tr>
                  <th className="p-3 w-[12%]">Title</th>
                  <th className="p-3 w-[12%]">Subtitle</th>
                  <th className="p-3 w-[8%]">CTA Label</th>
                  <th className="p-3 w-[12%]">CTA Link</th>
                  <th className="p-3 w-[12%]">Image URL</th>
                  <th className="p-3 w-[15%]">Schedule</th>
                  <th className="p-3">Visible</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {promos.map((p) => (
                  <tr key={p.id} className="border-t border-neutral-800 hover:bg-neutral-900/50">
                    <td className="p-3">
                      <input
                        className="bg-transparent border-b border-neutral-700 focus:border-acid-white outline-none w-full"
                        defaultValue={p.title}
                        onBlur={(e) => handleSave({ ...p, title: e.target.value })}
                      />
                    </td>
                    <td className="p-3">
                      <input
                        className="bg-transparent border-b border-neutral-700 focus:border-acid-white outline-none w-full"
                        defaultValue={p.subtitle || ''}
                        onBlur={(e) => handleSave({ ...p, subtitle: e.target.value })}
                      />
                    </td>
                    <td className="p-3">
                      <input
                        className="bg-transparent border-b border-neutral-700 focus:border-acid-white outline-none w-full"
                        defaultValue={p.cta_label || ''}
                        onBlur={(e) => handleSave({ ...p, cta_label: e.target.value })}
                      />
                    </td>
                    <td className="p-3">
                      <input
                        className="bg-transparent border-b border-neutral-700 focus:border-acid-white outline-none w-full"
                        defaultValue={p.cta_href || ''}
                        onBlur={(e) => handleSave({ ...p, cta_href: e.target.value })}
                      />
                    </td>
                    <td className="p-3">
                      <input
                        className="bg-transparent border-b border-neutral-700 focus:border-acid-white outline-none w-full"
                        defaultValue={p.image_url || ''}
                        onBlur={(e) => handleSave({ ...p, image_url: e.target.value })}
                      />
                    </td>
                    <td className="p-3">
                      <div className="flex flex-col gap-1">
                        <input
                          type="datetime-local"
                          className="bg-transparent border-b border-neutral-700 text-xs"
                          defaultValue={p.scheduled_start?.slice(0, 16) || ''}
                          onBlur={(e) => handleSave({ ...p, scheduled_start: e.target.value })}
                        />
                        <input
                          type="datetime-local"
                          className="bg-transparent border-b border-neutral-700 text-xs"
                          defaultValue={p.scheduled_end?.slice(0, 16) || ''}
                          onBlur={(e) => handleSave({ ...p, scheduled_end: e.target.value })}
                        />
                      </div>
                    </td>
                    <td className="p-3 text-center">
                      <button onClick={() => toggleVisible(p.id, p.visible ?? false)}>
                        {p.visible ? (
                          <Eye className="text-green-400 w-5 h-5" />
                        ) : (
                          <EyeOff className="text-red-400 w-5 h-5" />
                        )}
                      </button>
                    </td>
                    <td className="p-3 text-right flex gap-2 justify-end">
                      <Button
                        onClick={() => setPreviewPromo(p)}
                        className="bg-neutral-700 hover:bg-neutral-600 px-3 py-1 text-xs flex items-center gap-1"
                      >
                        <Monitor className="w-3 h-3" /> Preview
                      </Button>
                      <Button
                        onClick={() => handleSave(p)}
                        className="bg-acid-white text-black px-3 py-1 text-xs flex items-center gap-1"
                      >
                        <Save className="w-3 h-3" /> Save
                      </Button>
                      <Button
                        onClick={() => deletePromo(p.id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 text-xs flex items-center gap-1"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* === PREVIEW MODAL === */}
        <AnimatePresence>
          {previewPromo && (
            <motion.div
              className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setPreviewPromo(null)}
            >
              <motion.div
                className="relative w-full max-w-4xl bg-neutral-950 rounded-2xl overflow-hidden shadow-2xl border border-neutral-800"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                {previewPromo.image_url && (
                  <Image
                    src={previewPromo.image_url}
                    alt={previewPromo.title}
                    fill
                    className="object-cover opacity-25"
                  />
                )}

                <div className="relative z-10 text-center py-20 px-8">
                  <h2 className="text-4xl font-extrabold text-deep-crimson drop-shadow mb-4">
                    {previewPromo.title}
                  </h2>
                  <p className="text-lg text-acid-white/80 mb-10">
                    {previewPromo.subtitle}
                  </p>
                  <Link
                    href={previewPromo.cta_href || '#'}
                    className="inline-block bg-deep-crimson hover:bg-red-700 text-white font-semibold px-8 py-3 rounded-full transition"
                    target="_blank"
                  >
                    {previewPromo.cta_label || 'Learn More'}
                  </Link>
                </div>

                <button
                  onClick={() => setPreviewPromo(null)}
                  className="absolute top-3 right-4 text-white/70 hover:text-white text-xl"
                >
                  ✕
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </LayoutWrapper>
  );
}
