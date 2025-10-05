"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/router";

export function withAdminAuth(Page: any) {
  return function ProtectedPage(props: any) {
    const [checking, setChecking] = useState(true);
    const [session, setSession] = useState<any>(null);
    const router = useRouter();

    useEffect(() => {
      let mounted = true;

      supabase.auth.getSession().then(({ data }) => {
        if (!mounted) return;
        if (!data.session) {
          router.replace("/login");
        } else {
          setSession(data.session);
        }
        setChecking(false);
      });

      const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
        if (!mounted) return;
        if (!session) {
          router.replace("/login");
        } else {
          setSession(session);
        }
      });

      return () => {
        mounted = false;
        listener?.subscription.unsubscribe();
      };
    }, [router]);

    if (checking) return <p className="p-6">Checking session...</p>;
    if (!session) return null; // nothing while redirecting

    return <Page {...props} session={session} />;
  };
}
