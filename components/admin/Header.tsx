'use client';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { LogOut, RefreshCw } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function Header() {
  const router = useRouter();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.replace('/login');
  };

  const handleSwitchCommand = () => {
    router.push('/command');
  };

  return (
    <header className='flex items-center justify-between px-6 py-4 bg-neutral-950 border-b border-acid-white/10 text-acid-white sticky top-0 z-40'>
      <div>
        <h1 className='text-lg font-semibold tracking-tight text-acid-white'>
          Campaign Command
        </h1>
        <p className='text-xs opacity-70'>Admin Controls & Insights</p>
      </div>
      <div className='flex gap-3'>
        <Button
          onClick={handleSwitchCommand}
          className='flex items-center gap-2 bg-deep-crimson text-acid-white hover:bg-deep-crimson/80 text-sm'
        >
          <RefreshCw className='w-4 h-4' /> Switch Command
        </Button>
        <Button
          onClick={handleSignOut}
          className='flex items-center gap-2 bg-acid-white text-jet-black hover:bg-acid-white/90 text-sm'
        >
          <LogOut className='w-4 h-4' /> Sign Out
        </Button>
      </div>
    </header>
  );
}
