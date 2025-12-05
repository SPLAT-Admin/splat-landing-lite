-- ✅ Allow anonymous (public) client to use marketing schema and select from all tables
grant usage on schema marketing to anon;
grant select on all tables in schema marketing to anon;

-- ✅ Safety: ensure the marketing.products table has an open SELECT policy
drop policy if exists "allow_public_read_products" on marketing.products;
create policy "allow_public_read_products"
on marketing.products
for select
to anon
using (true);

comment on policy "allow_public_read_products" on marketing.products is 'Public read access for merch grid.';
