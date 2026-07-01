-- ============================================================
--  MIGRATION — add the Equations & Inequalities chapter's quests (eq1..eq8).
--  Safe on the LIVE database: it only adds/updates these 8 quest
--  rows. It does NOT touch learners or progress.
--  Run once in the Supabase SQL editor.
--
--  The Equations & Inequalities quests are added OPEN (is_open = true)
--  so you can test/revise the whole chapter straight away — it sits in
--  the "Revision" tab on the hub. Close any you don't want yet from
--  the admin dashboard (or run the "close" snippet at the bottom).
--
--  Idempotent: re-running it re-opens all eight.
-- ============================================================
insert into public.quests (quest_id, chapter, is_open, sort) values
  ('eq1','eqn',true,72),
  ('eq2','eqn',true,73),
  ('eq3','eqn',true,74),
  ('eq4','eqn',true,75),
  ('eq5','eqn',true,76),
  ('eq6','eqn',true,77),
  ('eq7','eqn',true,78),
  ('eq8','eqn',true,79)
on conflict (quest_id) do update
  set is_open = true, chapter = 'eqn', sort = excluded.sort;

-- ------------------------------------------------------------
--  When you're done testing, close them all again with:
--
--    update public.quests set is_open = false
--    where quest_id in ('eq1','eq2','eq3','eq4','eq5','eq6','eq7','eq8');
--
--  …then re-open each one from the admin dashboard as you revise it.
-- ------------------------------------------------------------
