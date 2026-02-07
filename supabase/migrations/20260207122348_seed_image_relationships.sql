/*
  # Seed Image-Category and Image-Tag Relationships

  Links all seeded images to their respective categories and relevant tags
  for proper filtering and search functionality.
*/

-- Link Nature images to Nature category
INSERT INTO image_categories (image_id, category_id)
SELECT i.id, c.id FROM images i, categories c
WHERE c.slug = 'nature' AND i.id IN (
  'a0000001-0001-0001-0001-000000000001',
  'a0000001-0001-0001-0001-000000000002',
  'a0000001-0001-0001-0001-000000000003',
  'a0000001-0001-0001-0001-000000000004',
  'a0000001-0001-0001-0001-000000000005',
  'a0000001-0001-0001-0001-000000000006',
  'a0000001-0001-0001-0001-000000000007',
  'a0000001-0001-0001-0001-000000000008'
) ON CONFLICT DO NOTHING;

-- Link Business images to Business category
INSERT INTO image_categories (image_id, category_id)
SELECT i.id, c.id FROM images i, categories c
WHERE c.slug = 'business' AND i.id IN (
  'a0000001-0001-0001-0002-000000000001',
  'a0000001-0001-0001-0002-000000000002',
  'a0000001-0001-0001-0002-000000000003',
  'a0000001-0001-0001-0002-000000000004',
  'a0000001-0001-0001-0002-000000000005',
  'a0000001-0001-0001-0002-000000000006'
) ON CONFLICT DO NOTHING;

-- Link Technology images
INSERT INTO image_categories (image_id, category_id)
SELECT i.id, c.id FROM images i, categories c
WHERE c.slug = 'technology' AND i.id IN (
  'a0000001-0001-0001-0003-000000000001',
  'a0000001-0001-0001-0003-000000000002',
  'a0000001-0001-0001-0003-000000000003',
  'a0000001-0001-0001-0003-000000000004',
  'a0000001-0001-0001-0003-000000000005',
  'a0000001-0001-0001-0003-000000000006'
) ON CONFLICT DO NOTHING;

-- Link People images
INSERT INTO image_categories (image_id, category_id)
SELECT i.id, c.id FROM images i, categories c
WHERE c.slug = 'people' AND i.id IN (
  'a0000001-0001-0001-0004-000000000001',
  'a0000001-0001-0001-0004-000000000002',
  'a0000001-0001-0001-0004-000000000003',
  'a0000001-0001-0001-0004-000000000004',
  'a0000001-0001-0001-0004-000000000005'
) ON CONFLICT DO NOTHING;

-- Link Lifestyle images
INSERT INTO image_categories (image_id, category_id)
SELECT i.id, c.id FROM images i, categories c
WHERE c.slug = 'lifestyle' AND i.id IN (
  'a0000001-0001-0001-0005-000000000001',
  'a0000001-0001-0001-0005-000000000002',
  'a0000001-0001-0001-0005-000000000003',
  'a0000001-0001-0001-0005-000000000004'
) ON CONFLICT DO NOTHING;

-- Link Travel images
INSERT INTO image_categories (image_id, category_id)
SELECT i.id, c.id FROM images i, categories c
WHERE c.slug = 'travel' AND i.id IN (
  'a0000001-0001-0001-0006-000000000001',
  'a0000001-0001-0001-0006-000000000002',
  'a0000001-0001-0001-0006-000000000003',
  'a0000001-0001-0001-0006-000000000004',
  'a0000001-0001-0001-0006-000000000005'
) ON CONFLICT DO NOTHING;

-- Link Food & Drink images
INSERT INTO image_categories (image_id, category_id)
SELECT i.id, c.id FROM images i, categories c
WHERE c.slug = 'food-drink' AND i.id IN (
  'a0000001-0001-0001-0007-000000000001',
  'a0000001-0001-0001-0007-000000000002',
  'a0000001-0001-0001-0007-000000000003',
  'a0000001-0001-0001-0007-000000000004'
) ON CONFLICT DO NOTHING;

-- Link Health & Fitness images
INSERT INTO image_categories (image_id, category_id)
SELECT i.id, c.id FROM images i, categories c
WHERE c.slug = 'health-fitness' AND i.id IN (
  'a0000001-0001-0001-0008-000000000001',
  'a0000001-0001-0001-0008-000000000002',
  'a0000001-0001-0001-0008-000000000003',
  'a0000001-0001-0001-0008-000000000004'
) ON CONFLICT DO NOTHING;

-- Link Education images
INSERT INTO image_categories (image_id, category_id)
SELECT i.id, c.id FROM images i, categories c
WHERE c.slug = 'education' AND i.id IN (
  'a0000001-0001-0001-0009-000000000001',
  'a0000001-0001-0001-0009-000000000002',
  'a0000001-0001-0001-0009-000000000003'
) ON CONFLICT DO NOTHING;

-- Link Creative images
INSERT INTO image_categories (image_id, category_id)
SELECT i.id, c.id FROM images i, categories c
WHERE c.slug = 'creative' AND i.id IN (
  'a0000001-0001-0001-0010-000000000001',
  'a0000001-0001-0001-0010-000000000002',
  'a0000001-0001-0001-0010-000000000003',
  'a0000001-0001-0001-0010-000000000004'
) ON CONFLICT DO NOTHING;

-- Link Events images
INSERT INTO image_categories (image_id, category_id)
SELECT i.id, c.id FROM images i, categories c
WHERE c.slug = 'events' AND i.id IN (
  'a0000001-0001-0001-0011-000000000001',
  'a0000001-0001-0001-0011-000000000002',
  'a0000001-0001-0001-0011-000000000003'
) ON CONFLICT DO NOTHING;

-- Link Animals images
INSERT INTO image_categories (image_id, category_id)
SELECT i.id, c.id FROM images i, categories c
WHERE c.slug = 'animals' AND i.id IN (
  'a0000001-0001-0001-0012-000000000001',
  'a0000001-0001-0001-0012-000000000002',
  'a0000001-0001-0001-0012-000000000003',
  'a0000001-0001-0001-0012-000000000004',
  'a0000001-0001-0001-0012-000000000005'
) ON CONFLICT DO NOTHING;

-- Link tags to Nature images
INSERT INTO image_tags (image_id, tag_id)
SELECT 'a0000001-0001-0001-0001-000000000001', id FROM tags WHERE slug IN ('landscape', 'mountain', 'river', 'sky') ON CONFLICT DO NOTHING;
INSERT INTO image_tags (image_id, tag_id)
SELECT 'a0000001-0001-0001-0001-000000000002', id FROM tags WHERE slug IN ('forest', 'trees', 'landscape') ON CONFLICT DO NOTHING;
INSERT INTO image_tags (image_id, tag_id)
SELECT 'a0000001-0001-0001-0001-000000000003', id FROM tags WHERE slug IN ('ocean', 'sunset', 'sky') ON CONFLICT DO NOTHING;
INSERT INTO image_tags (image_id, tag_id)
SELECT 'a0000001-0001-0001-0001-000000000004', id FROM tags WHERE slug IN ('flowers', 'landscape', 'color') ON CONFLICT DO NOTHING;
INSERT INTO image_tags (image_id, tag_id)
SELECT 'a0000001-0001-0001-0001-000000000005', id FROM tags WHERE slug IN ('forest', 'trees', 'autumn') ON CONFLICT DO NOTHING;
INSERT INTO image_tags (image_id, tag_id)
SELECT 'a0000001-0001-0001-0001-000000000006', id FROM tags WHERE slug IN ('mountain', 'snow', 'sky', 'landscape') ON CONFLICT DO NOTHING;
INSERT INTO image_tags (image_id, tag_id)
SELECT 'a0000001-0001-0001-0001-000000000007', id FROM tags WHERE slug IN ('river', 'forest', 'trees') ON CONFLICT DO NOTHING;
INSERT INTO image_tags (image_id, tag_id)
SELECT 'a0000001-0001-0001-0001-000000000008', id FROM tags WHERE slug IN ('sky', 'night', 'landscape') ON CONFLICT DO NOTHING;

-- Link tags to Business images
INSERT INTO image_tags (image_id, tag_id)
SELECT 'a0000001-0001-0001-0002-000000000001', id FROM tags WHERE slug IN ('teamwork', 'office', 'meeting') ON CONFLICT DO NOTHING;
INSERT INTO image_tags (image_id, tag_id)
SELECT 'a0000001-0001-0001-0002-000000000002', id FROM tags WHERE slug IN ('meeting', 'office', 'teamwork') ON CONFLICT DO NOTHING;
INSERT INTO image_tags (image_id, tag_id)
SELECT 'a0000001-0001-0001-0002-000000000003', id FROM tags WHERE slug IN ('desk', 'laptop', 'minimal', 'coffee') ON CONFLICT DO NOTHING;
INSERT INTO image_tags (image_id, tag_id)
SELECT 'a0000001-0001-0001-0002-000000000004', id FROM tags WHERE slug IN ('startup', 'teamwork', 'office') ON CONFLICT DO NOTHING;
INSERT INTO image_tags (image_id, tag_id)
SELECT 'a0000001-0001-0001-0002-000000000005', id FROM tags WHERE slug IN ('teamwork', 'office') ON CONFLICT DO NOTHING;
INSERT INTO image_tags (image_id, tag_id)
SELECT 'a0000001-0001-0001-0002-000000000006', id FROM tags WHERE slug IN ('digital', 'laptop', 'office') ON CONFLICT DO NOTHING;

-- Link tags to Technology images
INSERT INTO image_tags (image_id, tag_id)
SELECT 'a0000001-0001-0001-0003-000000000001', id FROM tags WHERE slug IN ('code', 'software', 'digital', 'laptop') ON CONFLICT DO NOTHING;
INSERT INTO image_tags (image_id, tag_id)
SELECT 'a0000001-0001-0001-0003-000000000002', id FROM tags WHERE slug IN ('digital', 'innovation') ON CONFLICT DO NOTHING;
INSERT INTO image_tags (image_id, tag_id)
SELECT 'a0000001-0001-0001-0003-000000000003', id FROM tags WHERE slug IN ('innovation', 'digital') ON CONFLICT DO NOTHING;
INSERT INTO image_tags (image_id, tag_id)
SELECT 'a0000001-0001-0001-0003-000000000004', id FROM tags WHERE slug IN ('digital', 'modern') ON CONFLICT DO NOTHING;
INSERT INTO image_tags (image_id, tag_id)
SELECT 'a0000001-0001-0001-0003-000000000005', id FROM tags WHERE slug IN ('digital', 'innovation', 'software') ON CONFLICT DO NOTHING;
INSERT INTO image_tags (image_id, tag_id)
SELECT 'a0000001-0001-0001-0003-000000000006', id FROM tags WHERE slug IN ('innovation', 'digital', 'modern') ON CONFLICT DO NOTHING;

-- Link tags to People images
INSERT INTO image_tags (image_id, tag_id)
SELECT 'a0000001-0001-0001-0004-000000000001', id FROM tags WHERE slug IN ('portrait', 'smile') ON CONFLICT DO NOTHING;
INSERT INTO image_tags (image_id, tag_id)
SELECT 'a0000001-0001-0001-0004-000000000002', id FROM tags WHERE slug IN ('group', 'smile', 'diversity') ON CONFLICT DO NOTHING;
INSERT INTO image_tags (image_id, tag_id)
SELECT 'a0000001-0001-0001-0004-000000000003', id FROM tags WHERE slug IN ('portrait', 'fashion') ON CONFLICT DO NOTHING;
INSERT INTO image_tags (image_id, tag_id)
SELECT 'a0000001-0001-0001-0004-000000000004', id FROM tags WHERE slug IN ('design', 'teamwork') ON CONFLICT DO NOTHING;
INSERT INTO image_tags (image_id, tag_id)
SELECT 'a0000001-0001-0001-0004-000000000005', id FROM tags WHERE slug IN ('urban', 'art') ON CONFLICT DO NOTHING;

-- Link tags to Lifestyle images
INSERT INTO image_tags (image_id, tag_id)
SELECT 'a0000001-0001-0001-0005-000000000001', id FROM tags WHERE slug IN ('coffee', 'minimal', 'modern') ON CONFLICT DO NOTHING;
INSERT INTO image_tags (image_id, tag_id)
SELECT 'a0000001-0001-0001-0005-000000000002', id FROM tags WHERE slug IN ('interior', 'minimal', 'modern') ON CONFLICT DO NOTHING;
INSERT INTO image_tags (image_id, tag_id)
SELECT 'a0000001-0001-0001-0005-000000000003', id FROM tags WHERE slug IN ('books', 'trees') ON CONFLICT DO NOTHING;
INSERT INTO image_tags (image_id, tag_id)
SELECT 'a0000001-0001-0001-0005-000000000004', id FROM tags WHERE slug IN ('urban', 'modern') ON CONFLICT DO NOTHING;

-- Link tags to Travel images
INSERT INTO image_tags (image_id, tag_id)
SELECT 'a0000001-0001-0001-0006-000000000001', id FROM tags WHERE slug IN ('architecture', 'ocean', 'adventure') ON CONFLICT DO NOTHING;
INSERT INTO image_tags (image_id, tag_id)
SELECT 'a0000001-0001-0001-0006-000000000002', id FROM tags WHERE slug IN ('city', 'night', 'urban') ON CONFLICT DO NOTHING;
INSERT INTO image_tags (image_id, tag_id)
SELECT 'a0000001-0001-0001-0006-000000000003', id FROM tags WHERE slug IN ('adventure', 'landscape') ON CONFLICT DO NOTHING;
INSERT INTO image_tags (image_id, tag_id)
SELECT 'a0000001-0001-0001-0006-000000000004', id FROM tags WHERE slug IN ('mountain', 'adventure', 'landscape') ON CONFLICT DO NOTHING;
INSERT INTO image_tags (image_id, tag_id)
SELECT 'a0000001-0001-0001-0006-000000000005', id FROM tags WHERE slug IN ('architecture', 'city') ON CONFLICT DO NOTHING;

-- Link tags to Food images
INSERT INTO image_tags (image_id, tag_id)
SELECT 'a0000001-0001-0001-0007-000000000001', id FROM tags WHERE slug IN ('food', 'healthy', 'fruit') ON CONFLICT DO NOTHING;
INSERT INTO image_tags (image_id, tag_id)
SELECT 'a0000001-0001-0001-0007-000000000002', id FROM tags WHERE slug IN ('coffee', 'food') ON CONFLICT DO NOTHING;
INSERT INTO image_tags (image_id, tag_id)
SELECT 'a0000001-0001-0001-0007-000000000003', id FROM tags WHERE slug IN ('food', 'restaurant', 'cooking') ON CONFLICT DO NOTHING;
INSERT INTO image_tags (image_id, tag_id)
SELECT 'a0000001-0001-0001-0007-000000000004', id FROM tags WHERE slug IN ('food', 'fruit', 'healthy', 'color') ON CONFLICT DO NOTHING;

-- Link tags to Health & Fitness images
INSERT INTO image_tags (image_id, tag_id)
SELECT 'a0000001-0001-0001-0008-000000000001', id FROM tags WHERE slug IN ('yoga', 'sunrise', 'meditation') ON CONFLICT DO NOTHING;
INSERT INTO image_tags (image_id, tag_id)
SELECT 'a0000001-0001-0001-0008-000000000002', id FROM tags WHERE slug IN ('running', 'urban') ON CONFLICT DO NOTHING;
INSERT INTO image_tags (image_id, tag_id)
SELECT 'a0000001-0001-0001-0008-000000000003', id FROM tags WHERE slug IN ('gym', 'workout') ON CONFLICT DO NOTHING;
INSERT INTO image_tags (image_id, tag_id)
SELECT 'a0000001-0001-0001-0008-000000000004', id FROM tags WHERE slug IN ('meditation', 'yoga') ON CONFLICT DO NOTHING;

-- Link tags to Education images
INSERT INTO image_tags (image_id, tag_id)
SELECT 'a0000001-0001-0001-0009-000000000001', id FROM tags WHERE slug IN ('books', 'learning', 'study') ON CONFLICT DO NOTHING;
INSERT INTO image_tags (image_id, tag_id)
SELECT 'a0000001-0001-0001-0009-000000000002', id FROM tags WHERE slug IN ('study', 'minimal') ON CONFLICT DO NOTHING;
INSERT INTO image_tags (image_id, tag_id)
SELECT 'a0000001-0001-0001-0009-000000000003', id FROM tags WHERE slug IN ('university', 'celebration') ON CONFLICT DO NOTHING;

-- Link tags to Creative images
INSERT INTO image_tags (image_id, tag_id)
SELECT 'a0000001-0001-0001-0010-000000000001', id FROM tags WHERE slug IN ('art', 'color', 'abstract', 'painting') ON CONFLICT DO NOTHING;
INSERT INTO image_tags (image_id, tag_id)
SELECT 'a0000001-0001-0001-0010-000000000002', id FROM tags WHERE slug IN ('color', 'design', 'minimal') ON CONFLICT DO NOTHING;
INSERT INTO image_tags (image_id, tag_id)
SELECT 'a0000001-0001-0001-0010-000000000003', id FROM tags WHERE slug IN ('art', 'night', 'color') ON CONFLICT DO NOTHING;
INSERT INTO image_tags (image_id, tag_id)
SELECT 'a0000001-0001-0001-0010-000000000004', id FROM tags WHERE slug IN ('art', 'texture') ON CONFLICT DO NOTHING;

-- Link tags to Events images
INSERT INTO image_tags (image_id, tag_id)
SELECT 'a0000001-0001-0001-0011-000000000001', id FROM tags WHERE slug IN ('concert', 'party') ON CONFLICT DO NOTHING;
INSERT INTO image_tags (image_id, tag_id)
SELECT 'a0000001-0001-0001-0011-000000000002', id FROM tags WHERE slug IN ('wedding', 'celebration') ON CONFLICT DO NOTHING;
INSERT INTO image_tags (image_id, tag_id)
SELECT 'a0000001-0001-0001-0011-000000000003', id FROM tags WHERE slug IN ('festival', 'celebration', 'color') ON CONFLICT DO NOTHING;

-- Link tags to Animals images
INSERT INTO image_tags (image_id, tag_id)
SELECT 'a0000001-0001-0001-0012-000000000001', id FROM tags WHERE slug IN ('wildlife') ON CONFLICT DO NOTHING;
INSERT INTO image_tags (image_id, tag_id)
SELECT 'a0000001-0001-0001-0012-000000000002', id FROM tags WHERE slug IN ('bird', 'wildlife') ON CONFLICT DO NOTHING;
INSERT INTO image_tags (image_id, tag_id)
SELECT 'a0000001-0001-0001-0012-000000000003', id FROM tags WHERE slug IN ('dog') ON CONFLICT DO NOTHING;
INSERT INTO image_tags (image_id, tag_id)
SELECT 'a0000001-0001-0001-0012-000000000004', id FROM tags WHERE slug IN ('marine') ON CONFLICT DO NOTHING;
INSERT INTO image_tags (image_id, tag_id)
SELECT 'a0000001-0001-0001-0012-000000000005', id FROM tags WHERE slug IN ('wildlife', 'snow') ON CONFLICT DO NOTHING;
