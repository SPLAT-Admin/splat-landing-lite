'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { isMobileDevice } from '@/lib/routing';

export default function CommandPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [checked, setChecked] = useState(false);
  const isMobile = isMobileDevice();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) router.replace('/login');
      else setUser(session.user);
      setChecked(true);
    });
  }, [router]);

  if (!checked) return null;

  const handlePlatformClick = () => {
    if (isMobile) {
      window.location.href =
        'splat://open' ||
        'intent://open#Intent;scheme=splat;package=com.splat.native;end;';
      setTimeout(() => router.push('/platformadmin'), 2500);
    } else {
      router.push('/platformadmin');
    }
  };

  const handleCampaignClick = () => router.push('/landingadmin');

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-jet-black text-acid-white p-6'>
      <h1 className='text-4xl font-extrabold mb-8 text-center'>Choose Your Command</h1>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl'>
        <button
          onClick={handlePlatformClick}
          className='p-10 bg-deep-crimson rounded-2xl text-xl hover:scale-105 transition-transform font-semibold shadow-lg'
        >
          🚀 Platform Command
          <p className='text-sm mt-2 opacity-75'>
            {isMobile ? 'Open in SPL@T App' : 'Launch Web Platform'}
          </p>
        </button>

        <button
          onClick={handleCampaignClick}
          className='p-10 bg-acid-white text-jet-black rounded-2xl text-xl hover:scale-105 transition-transform font-semibold shadow-lg'
        >
          🎯 Campaign Command
          <p className='text-sm mt-2 opacity-75'>LandingAdmin, Merch, Campaign Tools</p>
        </button>
      </div>

      {user && <p className='mt-8 text-xs opacity-60'>Logged in as {user.email}</p>}
    </div>
  );
}
