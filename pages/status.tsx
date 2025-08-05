import { useEffect, useState } from "react";
import Head from "next/head";

export default function StatusPage() {
  const [status, setStatus] = useState<any>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [uptime, setUptime] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/status")
      .then((res) => res.json())
      .then((data) => setStatus(data))
      .catch(() => setStatus({ error: "Unable to load status." }));

    fetch("/api/status-history")
      .then((res) => res.json())
      .then((data) => setHistory(data))
      .catch(() => setHistory([]));

    fetch("/api/uptime-90days")
      .then((res) => res.json())
      .then((data) => setUptime(data))
      .catch(() => setUptime([]));
  }, []);

  return (
    <>
      <Head>
        <title>SPL@T Platform Status</title>
      </Head>
      <section className="min-h-screen bg-black text-white flex flex-col items-center py-16 px-6">
        {!status ? (
          <p className="text-gray-300">Loading status...</p>
        ) : status.error ? (
          <p className="text-red-500">{status.error}</p>
        ) : (
          <div className="w-full max-w-2xl bg-gray-900 p-6 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold text-center mb-6 text-[#851725]">SPL@T Platform Status</h1>
            <p className="mb-4">Platform: {String(status.platform)}</p>
            <ul className="space-y-2">
              {Object.entries(status.services).map(([service, state]) => (
                <li key={String(service)} className="flex justify-between border-b border-gray-700 pb-1">
                  <span className="capitalize">{String(service)}</span>
                  <span className={state === "operational" ? "text-green-400" : "text-yellow-400"}>{String(state)}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-gray-400 text-center">
              Last Updated: {new Date(status.lastUpdated as string).toLocaleString()}
            </p>
          </div>
        )}
      </section>
    </>
  );
}
