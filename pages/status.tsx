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
            <p className="mb-4">Platform: {status.platform}</p>
            <ul className="space-y-2">
              {Object.entries(status.services).map(([service, state]) => (
                <li key={service} className="flex justify-between border-b border-gray-700 pb-1">
                  <span className="capitalize">{service}</span>
                  <span className={state === "operational" ? "text-green-400" : "text-yellow-400"}>{state}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-gray-400 text-center">
              Last Updated: {new Date(status.lastUpdated).toLocaleString()}
            </p>
          </div>
        )}

        {uptime.length > 0 && (
          <div className="w-full max-w-2xl bg-gray-900 p-6 rounded-lg shadow-lg mt-10">
            <h2 className="text-2xl font-bold text-[#851725] mb-4">90-Day Uptime</h2>
            <div className="grid grid-cols-30 gap-1">
              {uptime.map((day, idx) => (
                <div
                  key={idx}
                  className={`w-3 h-3 rounded-sm ${day.color}`}
                  title={`Day ${idx + 1}: ${day.uptime}% uptime`}
                ></div>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-2">Each square represents one day of uptime for the past 90 days.</p>
          </div>
        )}

        {history.length > 0 && (
          <div className="w-full max-w-2xl bg-gray-900 p-6 rounded-lg shadow-lg mt-10">
            <h2 className="text-2xl font-bold text-[#851725] mb-4">Recent Incidents</h2>
            <ul className="space-y-3">
              {history.map((incident, idx) => (
                <li key={idx} className="border-b border-gray-700 pb-2">
                  <p className="text-sm text-gray-300">{incident.date} - <span className={incident.status === 'resolved' ? 'text-green-400' : 'text-yellow-400'}>{incident.status}</span></p>
                  <p className="text-xs text-gray-400 mt-1">{incident.details}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </>
  );
}
