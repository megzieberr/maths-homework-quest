-- ============================================================
--  MIGRATION — add the Probability chapter's quests (p1..p7).
--  Safe on the LIVE database: it only INSERTS quest rows (and skips
--  any that already exist). It does NOT touch learners or progress.
--  Run once in the Supabase SQL editor.
--
--  The probability quests are added CLOSED (is_open = false) so they
--  stay hidden from learners until you open each one in the admin
--  dashboard as you teach it — exactly like the stats & finance quests.
-- ============================================================
insert into public.quests (quest_id, chapter, is_open, sort) values
  ('p1','prob',false,16),
  ('p2','prob',false,17),
  ('p3','prob',false,18),
  ('p4','prob',false,19),
  ('p5','prob',false,20),
  ('p6','prob',false,21),
  ('p7','prob',false,22)
on conflict (quest_id) do nothing;
