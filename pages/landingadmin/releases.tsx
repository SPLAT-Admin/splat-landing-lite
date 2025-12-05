'use client';
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import {
  Clock,
  GitBranch,
  GitCommit,
  ExternalLink,
  RefreshCcw,
  RotateCcw
} from 'lucide-react';
import LayoutWrapper from './_layoutWrapper';
import Button from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import toast from 'react-hot-toast';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface Release {
  id: string;
  tag: string;
  commit_hash: string;
  author: string;
  branch: string;
  deployed_at: string;
  vercel_url?: string;
  notes?: string;
}

export default function ReleasesDashboard() {
  const [releases, setReleases] = useState<Release[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBranch, setFilterBranch] = useState('all');
  const [rollbackLoading, setRollbackLoading] = useState<string | null>(null);

  async function fetchReleases() {
    setLoading(true);
    const { data, error } = await supabase
      .from('release_history')
      .select('*')
      .order('deployed_at', { ascending: false })
      .limit(50);

    if (error) setMessage('⚠️ Error fetching releases');
    else setReleases(data || []);
    setLoading(false);
  }

  async function handleRollback(tag: string) {
    if (!confirm(`⚠️ Are you sure you want to rollback to ${tag}?`)) return;

    try {
      setRollbackLoading(tag);
      toast.loading(`Rolling back to ${tag}...`, { id: 'rollback' });

      const res = await fetch('/api/trigger-rollback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-key': process.env.NEXT_PUBLIC_ADMIN_API_KEY || ''
        }
      });

      const data = await res.json();
      if (res.ok) {
        toast.success('Rollback successful 🚀', { id: 'rollback' });
        console.log('Rollback output:', data.output);
        fetchReleases();
      } else {
        toast.error(`Rollback failed: ${data.error || 'Unknown error'}`, { id: 'rollback' });
      }
    } catch (err) {
      console.error(err);
      toast.error('Rollback request failed 💀', { id: 'rollback' });
    } finally {
      setRollbackLoading(null);
    }
  }

  useEffect(() => {
    fetchReleases();
  }, []);

  // Filter + search logic
  const filteredReleases = releases.filter((r) => {
    const matchesSearch =
      r.tag.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.commit_hash.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBranch =
      filterBranch === 'all' || r.branch.toLowerCase() === filterBranch.toLowerCase();
    return matchesSearch && matchesBranch;
  });

  // Unique branch list for filter dropdown
  const branches = Array.from(new Set(releases.map((r) => r.branch)));

  return (
    <LayoutWrapper>
      <div className="min-h-screen bg-neutral-950 text-acid-white p-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <GitBranch className="w-6 h-6 text-deep-crimson" /> Release History
          </h1>
          <Button
            onClick={fetchReleases}
            className="bg-neutral-800 hover:bg-neutral-700 flex items-center gap-2"
          >
            <RefreshCcw className="w-4 h-4" /> Refresh
          </Button>
        </div>

        {/* Search + Filter Controls */}
        <div className="flex flex-wrap gap-3 items-center">
          <Input
            placeholder="Search by tag, author, or commit..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-neutral-900 border-neutral-800 text-acid-white w-72"
          />
          <Select
            value={filterBranch}
            onChange={(e) => setFilterBranch(e.target.value)}
            className="bg-neutral-900 border-neutral-800 text-acid-white w-48 p-2 rounded-lg"
          >
            <option value="all">All Branches</option>
            {branches.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </Select>
        </div>

        {message && <p className="text-acid-white/70">{message}</p>}
        {loading ? (
          <p>Loading release data...</p>
        ) : filteredReleases.length === 0 ? (
          <p className="text-acid-white/60">No releases match your filters.</p>
        ) : (
          <div className="overflow-auto border border-neutral-800 rounded-2xl">
            <table className="w-full text-left text-sm">
              <thead className="bg-neutral-900">
                <tr>
                  <th className="p-3 w-1/6">Tag</th>
                  <th className="p-3 w-1/5">Commit</th>
                  <th className="p-3 w-1/5">Author</th>
                  <th className="p-3 w-1/6">Branch</th>
                  <th className="p-3 w-1/5">Deployed</th>
                  <th className="p-3 text-right w-1/5">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredReleases.map((r) => (
                  <tr
                    key={r.id}
                    className="border-t border-neutral-800 hover:bg-neutral-900/50 transition"
                  >
                    <td className="p-3 font-semibold text-acid-white">{r.tag}</td>
                    <td className="p-3 text-acid-white/70 flex items-center gap-2">
                      <GitCommit className="w-4 h-4 text-acid-white/50" />
                      {r.commit_hash.slice(0, 8)}
                    </td>
                    <td className="p-3 text-acid-white/70">{r.author || '-'}</td>
                    <td className="p-3 text-acid-white/70">{r.branch}</td>
                    <td className="p-3 text-acid-white/70 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-acid-white/50" />
                      {new Date(r.deployed_at).toLocaleString()}
                    </td>
                    <td className="p-3 text-right flex justify-end gap-3">
                      {r.vercel_url ? (
                        <a
                          href={r.vercel_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-deep-crimson hover:underline flex items-center gap-1"
                        >
                          <ExternalLink className="w-4 h-4" /> View
                        </a>
                      ) : (
                        <span className="text-white/40">N/A</span>
                      )}
                      <Button
                        onClick={() => handleRollback(r.tag)}
                        disabled={rollbackLoading === r.tag}
                        className={`${
                          rollbackLoading === r.tag
                            ? 'bg-neutral-700'
                            : 'bg-deep-crimson hover:bg-red-700'
                        } flex items-center gap-1`}
                      >
                        <RotateCcw className="w-4 h-4" />
                        {rollbackLoading === r.tag ? 'Rolling...' : 'Rollback'}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </LayoutWrapper>
  );
}
