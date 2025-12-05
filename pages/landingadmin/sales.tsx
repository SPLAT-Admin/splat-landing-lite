import LayoutWrapper from './_layoutWrapper';
import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function SalesPage() {
  const [salesData, setSalesData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSales() {
      try {
        const { data, error } = await supabase
          .from('sales')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setSalesData(data || []);
      } catch (err) {
        console.error('Error fetching sales data:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchSales();
  }, []);

  return (
    <LayoutWrapper>
      <div className='space-y-6'>
        <h1 className='text-3xl font-bold mb-4'>Sales Overview</h1>
        {loading ? (
          <p>Loading sales...</p>
        ) : (
          <table className='w-full border-collapse border border-acid-white/20'>
            <thead>
              <tr className='bg-deep-crimson/40 text-acid-white'>
                <th className='p-3 text-left'>Order ID</th>
                <th className='p-3 text-left'>Customer</th>
                <th className='p-3 text-left'>Amount</th>
                <th className='p-3 text-left'>Date</th>
              </tr>
            </thead>
            <tbody>
              {salesData.map((sale) => (
                <tr key={sale.id} className='border-t border-acid-white/10 hover:bg-jet-black/50'>
                  <td className='p-3'>{sale.id}</td>
                  <td className='p-3'>{sale.customer_name}</td>
                  <td className='p-3'>${sale.amount?.toFixed(2)}</td>
                  <td className='p-3'>{new Date(sale.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </LayoutWrapper>
  );
}
