export async function fetchPrinifyProducts(limit = 6) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_PRINIFY_API_URL}/products?limit=${limit}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_PRINIFY_API_KEY}`,
      },
      next: { revalidate: 3600 },
    }
  );
  if (!res.ok) throw new Error(`Prinify fetch error: ${res.status}`);
  return res.json();
}
