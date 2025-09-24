-- Ensure only one promo is active at a time
drop trigger if exists trg_enforce_single_active_promo on public.promos;
drop function if exists public.enforce_single_active_promo();

create or replace function public.enforce_single_active_promo()
returns trigger
language plpgsql
as $$
begin
  if new.is_active then
    update public.promos
    set is_active = false
    where id <> new.id;
  end if;
  return new;
end;
$$;

create trigger trg_enforce_single_active_promo
before insert or update on public.promos
for each row
execute function public.enforce_single_active_promo();
