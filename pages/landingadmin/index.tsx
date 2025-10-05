import LandingAdminLayout from "./_layout";

export default function LandingAdminHome() {
  return (
    <LandingAdminLayout>
      <h2 className="text-2xl font-bold mb-4">Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 bg-white rounded-lg shadow">Merch snapshot (coming soon)</div>
        <div className="p-4 bg-white rounded-lg shadow">Email subs snapshot (coming soon)</div>
        <div className="p-4 bg-white rounded-lg shadow">Customer inquiries snapshot</div>
        <div className="p-4 bg-white rounded-lg shadow">Analytics snapshot</div>
      </div>
    </LandingAdminLayout>
  );
}
