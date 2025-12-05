"use client";
import Link from "next/link";
import { Rocket, Globe } from "lucide-react";

export default function AdminSelect() {
  return (
    <div className="min-h-screen bg-neutral-950 text-acid-white flex flex-col items-center justify-center p-8 text-center space-y-4">
      <h1 className="text-4xl font-bold">🚀 SPL@T Command Center</h1>
      <p className="opacity-70 max-w-xl">
        Welcome back, Commander. Choose your deck — Platform or Campaign.
      </p>

      <div className="grid gap-8 md:grid-cols-2 w-full max-w-4xl mt-8">
        <Link
          href="/admin"
          className="flex flex-col items-center justify-center bg-neutral-900 border border-neutral-800 rounded-2xl p-10 hover:bg-neutral-800 transition group"
        >
          <Rocket className="w-12 h-12 mb-4 text-acid-white group-hover:scale-105 transition" />
          <h2 className="text-2xl font-bold mb-2">Platform Command</h2>
          <p className="opacity-70 text-sm">
            Operate SPL@T’s systems: users, features, and infrastructure.
          </p>
        </Link>

        <Link
          href="/landingadmin"
          className="flex flex-col items-center justify-center bg-neutral-900 border border-neutral-800 rounded-2xl p-10 hover:bg-neutral-800 transition group"
        >
          <Globe className="w-12 h-12 mb-4 text-acid-white group-hover:scale-105 transition" />
          <h2 className="text-2xl font-bold mb-2">Campaign Command</h2>
          <p className="opacity-70 text-sm">
            Drive growth, merch, promos, and marketing content.
          </p>
        </Link>
      </div>
    </div>
  );
}
