-- ============================================================
--  MIGRATION — add the Probability chapter's quests (p1..p7).
--  Safe on the LIVE database: it only adds/updates these 7 quest
--  rows. It does NOT touch learners or progress.
--  Run once in the Supabase SQL editor.
--
--  The probability quests are added OPEN (is_open = true) so you can
--  test the whole chapter end-to-end straight away. Once you're happy,
--  CLOSE the ones you haven't taught yet from the admin dashboard
--  (or run the "close" snippet at the bottom of this file).
--
--  Idempotent: re-running it (even if you already added them closed)
--  will re-open all seven.
-- ============================================================
insert into public.quests (quest_id, chapter, is_open, sort) values
  ('p1','prob',true,16),
  ('p2','prob',true,17),
  ('p3','prob',true,18),
  ('p4','prob',true,19),
  ('p5','prob',true,20),
  ('p6','prob',true,21),
  ('p7','prob',true,22)
on conflict (quest_id) do update
  set is_open = true, chapter = 'prob', sort = excluded.sort;

-- ------------------------------------------------------------
--  When you're done testing, close them all again with:
--
--    update public.quests set is_open = false
--    where quest_id in ('p1','p2','p3','p4','p5','p6','p7');
--
--  …then re-open each one from the admin dashboard as you teach it.
-- ------------------------------------------------------------
