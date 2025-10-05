"use client";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/router";
import { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const router = useRouter();

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-black text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">SPL@T Admin</h1>
        <button onClick={handleLogout} className="bg-red-600 px-3 py-1 rounded font-bold hover:bg-red-700">
          Logout
        </button>
      </header>
      <main className="p-6">{children}</main>
    </div>
  );
}
