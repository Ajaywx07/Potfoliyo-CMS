-- Sample placeholder data — clearly fake, meant to be replaced from Admin.
-- Run after 0001_init.sql if you want something to look at immediately.

insert into skills (name, level, category, description, display_order) values
  ('HTML', 85, 'Frontend', 'Placeholder — edit from Admin → Skills', 1),
  ('CSS', 80, 'Frontend', 'Placeholder — edit from Admin → Skills', 2),
  ('JavaScript', 75, 'Frontend', 'Placeholder — edit from Admin → Skills', 3),
  ('Python', 70, 'Backend', 'Placeholder — edit from Admin → Skills', 4);

insert into projects (name, slug, short_description, full_description, category, technologies, status, featured, display_order) values
  ('Sample Project', 'sample-project', 'Placeholder project — replace or delete from Admin.',
   'This is placeholder content generated during setup. Replace it with a real project from Admin → Projects.',
   'web', '["Next.js","Tailwind CSS"]', 'draft', false, 1);

insert into services (title, description, display_order) values
  ('Website Development', 'Placeholder — edit from Admin → Services.', 1);
