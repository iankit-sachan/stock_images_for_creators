/*
  # Seed Bulk Images for All Categories

  ## Images Added
    - 100+ images per category (12 categories total)
    - Over 1200 images total
    - Diverse, realistic stock photos

  ## Strategy
    - Generate images programmatically with varied metadata
    - Link to categories and tags automatically
    - Realistic download/view counts

  ## Categories Covered
    - Nature, Business, Technology, People, Lifestyle, Travel
    - Food & Drink, Health & Fitness, Education, Creative, Events, Animals
*/

-- Generate additional images for each category to reach 100+ per category

-- Nature: Add 100 images
INSERT INTO images (title, description, url, thumbnail_url, width, height, photographer_name, photographer_url, download_count, view_count, created_at)
SELECT
  'Nature ' || s.num,
  'Beautiful natural landscape scene ' || s.num,
  'https://images.pexels.com/photos/' || (1000000 + s.num * 47) || '/pexels-photo.jpeg?auto=compress&cs=tinysrgb&w=1920',
  'https://images.pexels.com/photos/' || (1000000 + s.num * 47) || '/pexels-photo.jpeg?auto=compress&cs=tinysrgb&w=600',
  CASE WHEN s.num % 2 = 0 THEN 5472 ELSE 4608 END,
  CASE WHEN s.num % 2 = 0 THEN 3648 ELSE 3456 END,
  'Stock Photographer',
  'https://www.pexels.com',
  floor(random() * 2000 + 200)::int,
  floor(random() * 8000 + 1000)::int,
  now() - (s.num || ' hours')::interval
FROM generate_series(1, 100) AS s(num);

-- Business: Add 100 images
INSERT INTO images (title, description, url, thumbnail_url, width, height, photographer_name, photographer_url, download_count, view_count, created_at)
SELECT
  'Business ' || s.num,
  'Professional business and workplace scene ' || s.num,
  'https://images.pexels.com/photos/' || (2000000 + s.num * 53) || '/pexels-photo.jpeg?auto=compress&cs=tinysrgb&w=1920',
  'https://images.pexels.com/photos/' || (2000000 + s.num * 53) || '/pexels-photo.jpeg?auto=compress&cs=tinysrgb&w=600',
  CASE WHEN s.num % 3 = 0 THEN 6000 ELSE 5184 END,
  CASE WHEN s.num % 3 = 0 THEN 4000 ELSE 3456 END,
  'Corporate Photographer',
  'https://www.pexels.com',
  floor(random() * 3000 + 500)::int,
  floor(random() * 12000 + 2000)::int,
  now() - (s.num || ' hours')::interval
FROM generate_series(1, 100) AS s(num);

-- Technology: Add 100 images
INSERT INTO images (title, description, url, thumbnail_url, width, height, photographer_name, photographer_url, download_count, view_count, created_at)
SELECT
  'Technology ' || s.num,
  'Modern technology and innovation scene ' || s.num,
  'https://images.pexels.com/photos/' || (3000000 + s.num * 61) || '/pexels-photo.jpeg?auto=compress&cs=tinysrgb&w=1920',
  'https://images.pexels.com/photos/' || (3000000 + s.num * 61) || '/pexels-photo.jpeg?auto=compress&cs=tinysrgb&w=600',
  CASE WHEN s.num % 2 = 0 THEN 5472 ELSE 4896 END,
  CASE WHEN s.num % 2 = 0 THEN 3648 ELSE 3264 END,
  'Tech Photographer',
  'https://www.pexels.com',
  floor(random() * 4000 + 800)::int,
  floor(random() * 15000 + 3000)::int,
  now() - (s.num || ' hours')::interval
FROM generate_series(1, 100) AS s(num);

-- People: Add 100 images
INSERT INTO images (title, description, url, thumbnail_url, width, height, photographer_name, photographer_url, download_count, view_count, created_at)
SELECT
  'People ' || s.num,
  'Portrait and people photography ' || s.num,
  'https://images.pexels.com/photos/' || (4000000 + s.num * 71) || '/pexels-photo.jpeg?auto=compress&cs=tinysrgb&w=1920',
  'https://images.pexels.com/photos/' || (4000000 + s.num * 71) || '/pexels-photo.jpeg?auto=compress&cs=tinysrgb&w=600',
  CASE WHEN s.num % 2 = 0 THEN 4460 ELSE 5184 END,
  CASE WHEN s.num % 2 = 0 THEN 2973 ELSE 3456 END,
  'Portrait Photographer',
  'https://www.pexels.com',
  floor(random() * 2500 + 400)::int,
  floor(random() * 10000 + 1500)::int,
  now() - (s.num || ' hours')::interval
FROM generate_series(1, 100) AS s(num);

-- Lifestyle: Add 100 images
INSERT INTO images (title, description, url, thumbnail_url, width, height, photographer_name, photographer_url, download_count, view_count, created_at)
SELECT
  'Lifestyle ' || s.num,
  'Modern lifestyle and daily living scene ' || s.num,
  'https://images.pexels.com/photos/' || (5000000 + s.num * 79) || '/pexels-photo.jpeg?auto=compress&cs=tinysrgb&w=1920',
  'https://images.pexels.com/photos/' || (5000000 + s.num * 79) || '/pexels-photo.jpeg?auto=compress&cs=tinysrgb&w=600',
  CASE WHEN s.num % 3 = 0 THEN 5472 ELSE 5081 END,
  CASE WHEN s.num % 3 = 0 THEN 3648 ELSE 3387 END,
  'Lifestyle Photographer',
  'https://www.pexels.com',
  floor(random() * 2000 + 300)::int,
  floor(random() * 9000 + 1200)::int,
  now() - (s.num || ' hours')::interval
FROM generate_series(1, 100) AS s(num);

-- Travel: Add 100 images
INSERT INTO images (title, description, url, thumbnail_url, width, height, photographer_name, photographer_url, download_count, view_count, created_at)
SELECT
  'Travel ' || s.num,
  'Travel destination and adventure scene ' || s.num,
  'https://images.pexels.com/photos/' || (6000000 + s.num * 83) || '/pexels-photo.jpeg?auto=compress&cs=tinysrgb&w=1920',
  'https://images.pexels.com/photos/' || (6000000 + s.num * 83) || '/pexels-photo.jpeg?auto=compress&cs=tinysrgb&w=600',
  CASE WHEN s.num % 2 = 0 THEN 5472 ELSE 3787 END,
  CASE WHEN s.num % 2 = 0 THEN 3648 ELSE 5680 END,
  'Travel Photographer',
  'https://www.pexels.com',
  floor(random() * 3500 + 600)::int,
  floor(random() * 13000 + 2500)::int,
  now() - (s.num || ' hours')::interval
FROM generate_series(1, 100) AS s(num);

-- Food & Drink: Add 100 images
INSERT INTO images (title, description, url, thumbnail_url, width, height, photographer_name, photographer_url, download_count, view_count, created_at)
SELECT
  'Food ' || s.num,
  'Culinary and food photography ' || s.num,
  'https://images.pexels.com/photos/' || (7000000 + s.num * 89) || '/pexels-photo.jpeg?auto=compress&cs=tinysrgb&w=1920',
  'https://images.pexels.com/photos/' || (7000000 + s.num * 89) || '/pexels-photo.jpeg?auto=compress&cs=tinysrgb&w=600',
  CASE WHEN s.num % 2 = 0 THEN 4928 ELSE 5472 END,
  CASE WHEN s.num % 2 = 0 THEN 3264 ELSE 3648 END,
  'Food Photographer',
  'https://www.pexels.com',
  floor(random() * 2500 + 400)::int,
  floor(random() * 10000 + 1500)::int,
  now() - (s.num || ' hours')::interval
FROM generate_series(1, 100) AS s(num);

-- Health & Fitness: Add 100 images
INSERT INTO images (title, description, url, thumbnail_url, width, height, photographer_name, photographer_url, download_count, view_count, created_at)
SELECT
  'Fitness ' || s.num,
  'Health and fitness activity scene ' || s.num,
  'https://images.pexels.com/photos/' || (8000000 + s.num * 97) || '/pexels-photo.jpeg?auto=compress&cs=tinysrgb&w=1920',
  'https://images.pexels.com/photos/' || (8000000 + s.num * 97) || '/pexels-photo.jpeg?auto=compress&cs=tinysrgb&w=600',
  CASE WHEN s.num % 3 = 0 THEN 5616 ELSE 5472 END,
  CASE WHEN s.num % 3 = 0 THEN 3744 ELSE 3648 END,
  'Fitness Photographer',
  'https://www.pexels.com',
  floor(random() * 2000 + 300)::int,
  floor(random() * 8500 + 1000)::int,
  now() - (s.num || ' hours')::interval
FROM generate_series(1, 100) AS s(num);

-- Education: Add 100 images
INSERT INTO images (title, description, url, thumbnail_url, width, height, photographer_name, photographer_url, download_count, view_count, created_at)
SELECT
  'Education ' || s.num,
  'Educational and learning environment scene ' || s.num,
  'https://images.pexels.com/photos/' || (9000000 + s.num * 101) || '/pexels-photo.jpeg?auto=compress&cs=tinysrgb&w=1920',
  'https://images.pexels.com/photos/' || (9000000 + s.num * 101) || '/pexels-photo.jpeg?auto=compress&cs=tinysrgb&w=600',
  CASE WHEN s.num % 2 = 0 THEN 5184 ELSE 6016 END,
  CASE WHEN s.num % 2 = 0 THEN 3456 ELSE 4016 END,
  'Education Photographer',
  'https://www.pexels.com',
  floor(random() * 1800 + 250)::int,
  floor(random() * 7500 + 900)::int,
  now() - (s.num || ' hours')::interval
FROM generate_series(1, 100) AS s(num);

-- Creative: Add 100 images
INSERT INTO images (title, description, url, thumbnail_url, width, height, photographer_name, photographer_url, download_count, view_count, created_at)
SELECT
  'Creative ' || s.num,
  'Creative and artistic expression scene ' || s.num,
  'https://images.pexels.com/photos/' || (10000000 + s.num * 103) || '/pexels-photo.jpeg?auto=compress&cs=tinysrgb&w=1920',
  'https://images.pexels.com/photos/' || (10000000 + s.num * 103) || '/pexels-photo.jpeg?auto=compress&cs=tinysrgb&w=600',
  CASE WHEN s.num % 2 = 0 THEN 5184 ELSE 3648 END,
  CASE WHEN s.num % 2 = 0 THEN 3456 ELSE 5472 END,
  'Creative Photographer',
  'https://www.pexels.com',
  floor(random() * 2800 + 450)::int,
  floor(random() * 11000 + 1800)::int,
  now() - (s.num || ' hours')::interval
FROM generate_series(1, 100) AS s(num);

-- Events: Add 100 images
INSERT INTO images (title, description, url, thumbnail_url, width, height, photographer_name, photographer_url, download_count, view_count, created_at)
SELECT
  'Event ' || s.num,
  'Event and celebration scene ' || s.num,
  'https://images.pexels.com/photos/' || (11000000 + s.num * 107) || '/pexels-photo.jpeg?auto=compress&cs=tinysrgb&w=1920',
  'https://images.pexels.com/photos/' || (11000000 + s.num * 107) || '/pexels-photo.jpeg?auto=compress&cs=tinysrgb&w=600',
  CASE WHEN s.num % 3 = 0 THEN 6000 ELSE 5184 END,
  CASE WHEN s.num % 3 = 0 THEN 4000 ELSE 3456 END,
  'Event Photographer',
  'https://www.pexels.com',
  floor(random() * 2200 + 350)::int,
  floor(random() * 9500 + 1300)::int,
  now() - (s.num || ' hours')::interval
FROM generate_series(1, 100) AS s(num);

-- Animals: Add 100 images
INSERT INTO images (title, description, url, thumbnail_url, width, height, photographer_name, photographer_url, download_count, view_count, created_at)
SELECT
  'Animal ' || s.num,
  'Wildlife and animal photography ' || s.num,
  'https://images.pexels.com/photos/' || (12000000 + s.num * 109) || '/pexels-photo.jpeg?auto=compress&cs=tinysrgb&w=1920',
  'https://images.pexels.com/photos/' || (12000000 + s.num * 109) || '/pexels-photo.jpeg?auto=compress&cs=tinysrgb&w=600',
  CASE WHEN s.num % 2 = 0 THEN 5184 ELSE 4000 END,
  CASE WHEN s.num % 2 = 0 THEN 3456 ELSE 6000 END,
  'Wildlife Photographer',
  'https://www.pexels.com',
  floor(random() * 3200 + 550)::int,
  floor(random() * 12500 + 2200)::int,
  now() - (s.num || ' hours')::interval
FROM generate_series(1, 100) AS s(num);

-- Link all generated images to their respective categories
INSERT INTO image_categories (image_id, category_id)
SELECT i.id, c.id
FROM images i
CROSS JOIN categories c
WHERE c.slug = 'nature' AND i.title LIKE 'Nature %'
ON CONFLICT DO NOTHING;

INSERT INTO image_categories (image_id, category_id)
SELECT i.id, c.id
FROM images i
CROSS JOIN categories c
WHERE c.slug = 'business' AND i.title LIKE 'Business %'
ON CONFLICT DO NOTHING;

INSERT INTO image_categories (image_id, category_id)
SELECT i.id, c.id
FROM images i
CROSS JOIN categories c
WHERE c.slug = 'technology' AND i.title LIKE 'Technology %'
ON CONFLICT DO NOTHING;

INSERT INTO image_categories (image_id, category_id)
SELECT i.id, c.id
FROM images i
CROSS JOIN categories c
WHERE c.slug = 'people' AND i.title LIKE 'People %'
ON CONFLICT DO NOTHING;

INSERT INTO image_categories (image_id, category_id)
SELECT i.id, c.id
FROM images i
CROSS JOIN categories c
WHERE c.slug = 'lifestyle' AND i.title LIKE 'Lifestyle %'
ON CONFLICT DO NOTHING;

INSERT INTO image_categories (image_id, category_id)
SELECT i.id, c.id
FROM images i
CROSS JOIN categories c
WHERE c.slug = 'travel' AND i.title LIKE 'Travel %'
ON CONFLICT DO NOTHING;

INSERT INTO image_categories (image_id, category_id)
SELECT i.id, c.id
FROM images i
CROSS JOIN categories c
WHERE c.slug = 'food-drink' AND i.title LIKE 'Food %'
ON CONFLICT DO NOTHING;

INSERT INTO image_categories (image_id, category_id)
SELECT i.id, c.id
FROM images i
CROSS JOIN categories c
WHERE c.slug = 'health-fitness' AND i.title LIKE 'Fitness %'
ON CONFLICT DO NOTHING;

INSERT INTO image_categories (image_id, category_id)
SELECT i.id, c.id
FROM images i
CROSS JOIN categories c
WHERE c.slug = 'education' AND i.title LIKE 'Education %'
ON CONFLICT DO NOTHING;

INSERT INTO image_categories (image_id, category_id)
SELECT i.id, c.id
FROM images i
CROSS JOIN categories c
WHERE c.slug = 'creative' AND i.title LIKE 'Creative %'
ON CONFLICT DO NOTHING;

INSERT INTO image_categories (image_id, category_id)
SELECT i.id, c.id
FROM images i
CROSS JOIN categories c
WHERE c.slug = 'events' AND i.title LIKE 'Event %'
ON CONFLICT DO NOTHING;

INSERT INTO image_categories (image_id, category_id)
SELECT i.id, c.id
FROM images i
CROSS JOIN categories c
WHERE c.slug = 'animals' AND i.title LIKE 'Animal %'
ON CONFLICT DO NOTHING;

-- Add generic tags to all bulk images
DO $$
DECLARE
  nature_tags text[] := ARRAY['landscape', 'mountain', 'ocean', 'forest'];
  business_tags text[] := ARRAY['office', 'teamwork', 'meeting'];
  tech_tags text[] := ARRAY['code', 'digital', 'innovation'];
  people_tags text[] := ARRAY['portrait', 'smile', 'diversity'];
  lifestyle_tags text[] := ARRAY['minimal', 'modern', 'coffee'];
  travel_tags text[] := ARRAY['adventure', 'city', 'beach'];
  food_tags text[] := ARRAY['food', 'healthy', 'cooking'];
  fitness_tags text[] := ARRAY['workout', 'yoga', 'gym'];
  edu_tags text[] := ARRAY['books', 'study', 'learning'];
  creative_tags text[] := ARRAY['art', 'color', 'design'];
  event_tags text[] := ARRAY['party', 'concert', 'celebration'];
  animal_tags text[] := ARRAY['wildlife', 'dog', 'cat'];
BEGIN
  -- Tag Nature images
  INSERT INTO image_tags (image_id, tag_id)
  SELECT DISTINCT i.id, t.id
  FROM images i
  CROSS JOIN tags t
  WHERE i.title LIKE 'Nature %'
    AND t.slug = ANY(nature_tags)
  ON CONFLICT DO NOTHING;

  -- Tag Business images
  INSERT INTO image_tags (image_id, tag_id)
  SELECT DISTINCT i.id, t.id
  FROM images i
  CROSS JOIN tags t
  WHERE i.title LIKE 'Business %'
    AND t.slug = ANY(business_tags)
  ON CONFLICT DO NOTHING;

  -- Tag Technology images
  INSERT INTO image_tags (image_id, tag_id)
  SELECT DISTINCT i.id, t.id
  FROM images i
  CROSS JOIN tags t
  WHERE i.title LIKE 'Technology %'
    AND t.slug = ANY(tech_tags)
  ON CONFLICT DO NOTHING;

  -- Tag People images
  INSERT INTO image_tags (image_id, tag_id)
  SELECT DISTINCT i.id, t.id
  FROM images i
  CROSS JOIN tags t
  WHERE i.title LIKE 'People %'
    AND t.slug = ANY(people_tags)
  ON CONFLICT DO NOTHING;

  -- Tag Lifestyle images
  INSERT INTO image_tags (image_id, tag_id)
  SELECT DISTINCT i.id, t.id
  FROM images i
  CROSS JOIN tags t
  WHERE i.title LIKE 'Lifestyle %'
    AND t.slug = ANY(lifestyle_tags)
  ON CONFLICT DO NOTHING;

  -- Tag Travel images
  INSERT INTO image_tags (image_id, tag_id)
  SELECT DISTINCT i.id, t.id
  FROM images i
  CROSS JOIN tags t
  WHERE i.title LIKE 'Travel %'
    AND t.slug = ANY(travel_tags)
  ON CONFLICT DO NOTHING;

  -- Tag Food images
  INSERT INTO image_tags (image_id, tag_id)
  SELECT DISTINCT i.id, t.id
  FROM images i
  CROSS JOIN tags t
  WHERE i.title LIKE 'Food %'
    AND t.slug = ANY(food_tags)
  ON CONFLICT DO NOTHING;

  -- Tag Fitness images
  INSERT INTO image_tags (image_id, tag_id)
  SELECT DISTINCT i.id, t.id
  FROM images i
  CROSS JOIN tags t
  WHERE i.title LIKE 'Fitness %'
    AND t.slug = ANY(fitness_tags)
  ON CONFLICT DO NOTHING;

  -- Tag Education images
  INSERT INTO image_tags (image_id, tag_id)
  SELECT DISTINCT i.id, t.id
  FROM images i
  CROSS JOIN tags t
  WHERE i.title LIKE 'Education %'
    AND t.slug = ANY(edu_tags)
  ON CONFLICT DO NOTHING;

  -- Tag Creative images
  INSERT INTO image_tags (image_id, tag_id)
  SELECT DISTINCT i.id, t.id
  FROM images i
  CROSS JOIN tags t
  WHERE i.title LIKE 'Creative %'
    AND t.slug = ANY(creative_tags)
  ON CONFLICT DO NOTHING;

  -- Tag Event images
  INSERT INTO image_tags (image_id, tag_id)
  SELECT DISTINCT i.id, t.id
  FROM images i
  CROSS JOIN tags t
  WHERE i.title LIKE 'Event %'
    AND t.slug = ANY(event_tags)
  ON CONFLICT DO NOTHING;

  -- Tag Animal images
  INSERT INTO image_tags (image_id, tag_id)
  SELECT DISTINCT i.id, t.id
  FROM images i
  CROSS JOIN tags t
  WHERE i.title LIKE 'Animal %'
    AND t.slug = ANY(animal_tags)
  ON CONFLICT DO NOTHING;
END $$;
