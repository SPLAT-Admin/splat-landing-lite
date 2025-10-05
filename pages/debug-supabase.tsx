"use client";
import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function DebugSupabase() {
  const [session, setSession] = useState<any>(null);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const getSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error("Error fetching session:", error);
      }
      setSession(data?.session || null);
    };
    getSession();
  }, [supabase]);

  if (!session) {
    return (
      <div className="flex flex-col gap-2 p-6">
        <h1 className="text-xl font-bold text-red-600">No active session 😢</h1>
        <p className="text-gray-500">Try logging in and refresh this page.</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-bold text-green-600">Supabase Session Debug</h1>
      <pre className="bg-black text-green-300 p-4 rounded-lg overflow-x-auto">
        {JSON.stringify(session, null, 2)}
      </pre>
      <p className="text-sm text-gray-400">
        Role: {session.user?.app_metadata?.role || "none"}
      </p>
    </div>
  );
}
