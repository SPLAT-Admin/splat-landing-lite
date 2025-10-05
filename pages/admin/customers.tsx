"use client";
import { withAdminAuth } from "@/components/withAdminAuth";
import AdminLayout from "@/components/layouts/AdminLayout";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

function Customers() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const pageSize = 25;
  const [search, setSearch] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  useEffect(() => {
    async function fetchCustomers() {
      setLoading(true);
      const from = page * pageSize;
      const to = from + pageSize - 1;

      let query = supabase
        .from("customers")
        .select("id,email,name,created_at")
        .order("created_at", { ascending: false })
        .range(from, to);

      if (search) {
        query = query.ilike("email", `%${search}%`);
      }
      if (fromDate) query = query.gte("created_at", fromDate);
      if (toDate) query = query.lte("created_at", toDate);

      const { data: custs, error } = await query;
      if (error) {
        alert("Error loading customers: " + error.message);
        setLoading(false);
        return;
      }

      const { data: ordersData } = await supabase.from("orders").select("customer_id,total_amount");
      const enriched =
        custs?.map((c) => {
          const custOrders = (ordersData || []).filter((o) => o.customer_id === c.id);
          const orderCount = custOrders.length;
          const totalSpent = custOrders.reduce((sum, o) => sum + Number(o.total_amount), 0);
          return { ...c, orderCount, totalSpent };
        }) || [];

      setCustomers(enriched);
      setLoading(false);
    }
    fetchCustomers();
  }, [page, search, fromDate, toDate]);

  const exportCSV = useMemo(() => {
    return () => {
      const headers = ["Email", "Name", "Created At", "Orders", "Total Spent"];
      const rows = customers.map((c) => [
        c.email,
        c.name || "-",
        new Date(c.created_at).toISOString(),
        c.orderCount,
        c.totalSpent,
      ]);
      const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
      const blob = new Blob([csv], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "customers.csv";
      a.click();
      URL.revokeObjectURL(url);
    };
  }, [customers]);

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-4">Customers</h1>
      <div className="flex flex-wrap gap-2 mb-4">
        <input
          placeholder="Search by email"
          value={search}
          onChange={(e) => {
            setPage(0);
            setSearch(e.target.value);
          }}
          className="border p-2 rounded"
        />
        <input
          type="date"
          value={fromDate}
          onChange={(e) => {
            setPage(0);
            setFromDate(e.target.value);
          }}
          className="border p-2 rounded"
        />
        <input
          type="date"
          value={toDate}
          onChange={(e) => {
            setPage(0);
            setToDate(e.target.value);
          }}
          className="border p-2 rounded"
        />
        <button onClick={exportCSV} className="bg-red-600 text-white px-3 py-1 rounded">
          Export CSV
        </button>
      </div>
      {loading ? (
        <p>Loading customers...</p>
      ) : customers.length === 0 ? (
        <p>No customers found.</p>
      ) : (
        <>
          <table className="w-full border text-sm">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 border">Email</th>
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Created At</th>
                <th className="p-2 border">Orders</th>
                <th className="p-2 border">Total Spent</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((c) => (
                <tr key={c.id}>
                  <td className="border p-2">{c.email}</td>
                  <td className="border p-2">{c.name || "-"}</td>
                  <td className="border p-2">{new Date(c.created_at).toLocaleDateString()}</td>
                  <td className="border p-2 text-center">{c.orderCount}</td>
                  <td className="border p-2">${c.totalSpent.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-between items-center mt-4">
            <button
              disabled={page === 0}
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            >
              Prev
            </button>
            <span>Page {page + 1}</span>
            <button onClick={() => setPage((p) => p + 1)} className="px-3 py-1 bg-gray-200 rounded">
              Next
            </button>
          </div>
        </>
      )}
    </AdminLayout>
  );
}

export default withAdminAuth(Customers);
