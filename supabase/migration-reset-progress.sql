-- ============================================================
--  MIGRATION — "Reset scores" admin action.
--  Safe to run on the LIVE database: it only ADDS one function
--  (create or replace) and a grant. It does NOT touch your tables
--  or data, so it won't wipe anything. Run once in the Supabase
--  SQL editor; after that the admin dashboard's "Reset scores"
--  button works.
--
--  What it does: clears a learner's progress (XP, scores, badges)
--  and their struggle flags, but KEEPS the account (name, username,
--  password) so they can simply start the chapter fresh.
-- ============================================================

create or replace function public.mhq_admin_reset_progress(p_admin_password text, p_id uuid)
returns jsonb language plpgsql security definer set search_path = public, extensions as $$
begin
  if not public._mhq_admin_ok(p_admin_password) then return jsonb_build_object('ok', false, 'error', 'auth'); end if;
  delete from public.progress  where student_id = p_id;
  delete from public.struggles where student_id = p_id;
  return jsonb_build_object('ok', true);
end; $$;

grant execute on function public.mhq_admin_reset_progress(text, uuid) to anon, authenticated;
