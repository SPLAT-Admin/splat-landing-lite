"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Header, Sidebar } from "@/components/admin";
import { supabase } from "@/lib/supabaseClient";

export default function LandingAdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    let mounted = true;
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.replace("/login");
      }
      if (mounted) {
        setAuthChecked(true);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) router.replace("/login");
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [router]);

  if (!authChecked) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-950 text-acid-white">
        <p>Loading Campaign Command…</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-neutral-950 text-acid-white">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 overflow-y-auto p-8">{children}</main>
      </div>
    </div>
  );
}
