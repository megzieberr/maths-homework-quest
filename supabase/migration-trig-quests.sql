-- ============================================================
--  MIGRATION — add the 2D Trigonometry chapter's quests (t1..t7).
--  Safe on the LIVE database: it only adds/updates these 7 quest
--  rows. It does NOT touch learners or progress.
--  Run once in the Supabase SQL editor.
--
--  The trig quests are added OPEN (is_open = true) so you can test
--  the whole chapter end-to-end straight away. Once you're happy,
--  CLOSE the ones you haven't taught yet from the admin dashboard
--  (or run the "close" snippet at the bottom of this file).
--
--  Idempotent: re-running it (even if you already added them closed)
--  will re-open all seven.
-- ============================================================
insert into public.quests (quest_id, chapter, is_open, sort) values
  ('t1','trig',true,23),
  ('t2','trig',true,24),
  ('t3','trig',true,25),
  ('t4','trig',true,26),
  ('t5','trig',true,27),
  ('t6','trig',true,28),
  ('t7','trig',true,29)
on conflict (quest_id) do update
  set is_open = true, chapter = 'trig', sort = excluded.sort;

-- ------------------------------------------------------------
--  When you're done testing, close them all again with:
--
--    update public.quests set is_open = false
--    where quest_id in ('t1','t2','t3','t4','t5','t6','t7');
--
--  …then re-open each one from the admin dashboard as you teach it.
-- ------------------------------------------------------------
