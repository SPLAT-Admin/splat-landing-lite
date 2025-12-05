'use client';
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Download, Mail, Send, Search } from 'lucide-react';
import LayoutWrapper from './_layoutWrapper';
import Button from '@/components/ui/Button';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface Signup {
  id: string;
  email: string;
  source?: string;
  created_at: string;
}

export default function EmailCommand() {
  const [signups, setSignups] = useState<Signup[]>([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState('');
  const [filter, setFilter] = useState('');

  async function fetchSignups() {
    setLoading(true);
    const { data, error } = await supabase
      .from('marketing.email_signups')
      .select('id,email,metadata,signup_source,updated_at,created_at')
      .order('updated_at', { ascending: false });

    if (!error && data) {
      const normalized = data.map((row: any) => ({
        id: row.id,
        email: row.email,
        source: row.metadata?.last_signup_source || row.signup_source || 'website',
        created_at: row.updated_at || row.created_at,
      }));
      setSignups(normalized);
    }
    setLoading(false);
  }

  useEffect(() => { fetchSignups(); }, []);

  const filtered = signups.filter((s) =>
    s.email.toLowerCase().includes(filter.toLowerCase())
  );

  async function exportCSV() {
    const csv = [
      ['email', 'source', 'created_at'],
      ...filtered.map((s) => [s.email, s.source || '', s.created_at]),
    ].map((r) => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'splat_email_signups.csv';
    a.click();
  }

  async function sendCampaign() {
    setSending(true);
    setMessage('Sending preview campaign...');
    await new Promise((r) => setTimeout(r, 1500));
    setMessage('✅ Campaign sent (mock)');
    setSending(false);
  }

  const total = signups.length;
  const today = new Date().toISOString().slice(0, 10);
  const todayCount = signups.filter((s) => s.created_at.startsWith(today)).length;

  return (
    <LayoutWrapper>
      <div className='min-h-screen bg-neutral-950 text-acid-white p-8 space-y-6'>
        <div className='flex items-center justify-between'>
          <h1 className='text-3xl font-bold'>📧 Email Command</h1>
          <div className='flex gap-3'>
            <Button onClick={fetchSignups} className='bg-neutral-800 hover:bg-neutral-700'>Refresh</Button>
            <Button onClick={exportCSV} className='bg-acid-white text-black flex items-center gap-2'>
              <Download className='w-4 h-4' /> Export
            </Button>
          </div>
        </div>

        <p className='opacity-70'>Total: <b>{total}</b> • Today: <b>{todayCount}</b></p>
        {message && <p className='text-acid-white/80'>{message}</p>}

        <div className='flex items-center gap-2 mb-4'>
          <Search className='w-4 h-4 opacity-60' />
          <input
            placeholder='Filter by email...'
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className='bg-neutral-900 text-acid-white px-3 py-2 rounded-md outline-none w-64 border border-neutral-700 focus:border-acid-white'
          />
        </div>

        <div className='bg-neutral-900 border border-neutral-800 rounded-2xl p-6 space-y-4'>
          <h2 className='text-2xl font-bold flex items-center gap-2'>
            <Mail className='w-6 h-6' /> Send Campaign
          </h2>
          <p className='text-sm opacity-70'>
            Sends test email preview. (Integration with Resend or SMTP coming soon.)
          </p>
          <Button onClick={sendCampaign} disabled={sending} className='bg-acid-white text-black flex items-center gap-2'>
            <Send className='w-4 h-4' /> {sending ? 'Sending...' : 'Send Test'}
          </Button>
        </div>

        <div className='overflow-auto border border-neutral-800 rounded-2xl'>
          <table className='w-full text-left text-sm'>
            <thead className='bg-neutral-900'>
              <tr>
                <th className='p-3'>Email</th>
                <th className='p-3'>Source</th>
                <th className='p-3'>Signup Date</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={3} className='p-4 text-center'>Loading...</td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={3} className='p-4 text-center opacity-70'>No results.</td></tr>
              ) : (
                filtered.map((s) => (
                  <tr key={s.id} className='border-t border-neutral-800 hover:bg-neutral-900/50'>
                    <td className='p-3'>{s.email}</td>
                    <td className='p-3 opacity-70'>{s.source || 'unknown'}</td>
                    <td className='p-3 opacity-70'>{new Date(s.created_at).toLocaleString()}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </LayoutWrapper>
  );
}
