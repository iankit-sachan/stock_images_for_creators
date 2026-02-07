/*
  # Add 1000 Images Per Category

  ## Overview
  Expand the image library to 1000 images per category.
  This migration adds 900 additional images to each of the 12 categories.

  ## Changes
  - Add 900 more images to each category (100 already exist, bringing total to 1000)
  - Total images: 12,000 (1000 per category × 12 categories)
  - Uses Lorem Picsum for reliable image URLs
  - Realistic metadata with varied download/view counts

  ## Categories
  - Nature, Business, Technology, People, Lifestyle, Travel
  - Food & Drink, Health & Fitness, Education, Creative, Events, Animals
*/

-- Nature: Add 900 more images (101-1000)
INSERT INTO images (title, description, url, thumbnail_url, width, height, photographer_name, photographer_url, download_count, view_count, created_at)
SELECT
  'Nature ' || s.num,
  'Beautiful natural landscape scene ' || s.num,
  'https://picsum.photos/seed/nature' || s.num || '/1920/1280',
  'https://picsum.photos/seed/nature' || s.num || '/600/400',
  CASE WHEN s.num % 2 = 0 THEN 5472 ELSE 4608 END,
  CASE WHEN s.num % 2 = 0 THEN 3648 ELSE 3456 END,
  'Stock Photographer',
  'https://www.pexels.com',
  floor(random() * 2000 + 200)::int,
  floor(random() * 8000 + 1000)::int,
  now() - (s.num || ' hours')::interval
FROM generate_series(101, 1000) AS s(num);

-- Business: Add 900 more images
INSERT INTO images (title, description, url, thumbnail_url, width, height, photographer_name, photographer_url, download_count, view_count, created_at)
SELECT
  'Business ' || s.num,
  'Professional business and workplace scene ' || s.num,
  'https://picsum.photos/seed/business' || s.num || '/1920/1280',
  'https://picsum.photos/seed/business' || s.num || '/600/400',
  CASE WHEN s.num % 3 = 0 THEN 6000 ELSE 5184 END,
  CASE WHEN s.num % 3 = 0 THEN 4000 ELSE 3456 END,
  'Corporate Photographer',
  'https://www.pexels.com',
  floor(random() * 3000 + 500)::int,
  floor(random() * 12000 + 2000)::int,
  now() - (s.num || ' hours')::interval
FROM generate_series(101, 1000) AS s(num);

-- Technology: Add 900 more images
INSERT INTO images (title, description, url, thumbnail_url, width, height, photographer_name, photographer_url, download_count, view_count, created_at)
SELECT
  'Technology ' || s.num,
  'Modern technology and innovation scene ' || s.num,
  'https://picsum.photos/seed/tech' || s.num || '/1920/1280',
  'https://picsum.photos/seed/tech' || s.num || '/600/400',
  CASE WHEN s.num % 2 = 0 THEN 5472 ELSE 4896 END,
  CASE WHEN s.num % 2 = 0 THEN 3648 ELSE 3264 END,
  'Tech Photographer',
  'https://www.pexels.com',
  floor(random() * 4000 + 800)::int,
  floor(random() * 15000 + 3000)::int,
  now() - (s.num || ' hours')::interval
FROM generate_series(101, 1000) AS s(num);

-- People: Add 900 more images
INSERT INTO images (title, description, url, thumbnail_url, width, height, photographer_name, photographer_url, download_count, view_count, created_at)
SELECT
  'People ' || s.num,
  'Portrait and people photography ' || s.num,
  'https://picsum.photos/seed/people' || s.num || '/1920/1280',
  'https://picsum.photos/seed/people' || s.num || '/600/400',
  CASE WHEN s.num % 2 = 0 THEN 4460 ELSE 5184 END,
  CASE WHEN s.num % 2 = 0 THEN 2973 ELSE 3456 END,
  'Portrait Photographer',
  'https://www.pexels.com',
  floor(random() * 2500 + 400)::int,
  floor(random() * 10000 + 1500)::int,
  now() - (s.num || ' hours')::interval
FROM generate_series(101, 1000) AS s(num);

-- Lifestyle: Add 900 more images
INSERT INTO images (title, description, url, thumbnail_url, width, height, photographer_name, photographer_url, download_count, view_count, created_at)
SELECT
  'Lifestyle ' || s.num,
  'Modern lifestyle and daily living scene ' || s.num,
  'https://picsum.photos/seed/lifestyle' || s.num || '/1920/1280',
  'https://picsum.photos/seed/lifestyle' || s.num || '/600/400',
  CASE WHEN s.num % 3 = 0 THEN 5472 ELSE 5081 END,
  CASE WHEN s.num % 3 = 0 THEN 3648 ELSE 3387 END,
  'Lifestyle Photographer',
  'https://www.pexels.com',
  floor(random() * 2000 + 300)::int,
  floor(random() * 9000 + 1200)::int,
  now() - (s.num || ' hours')::interval
FROM generate_series(101, 1000) AS s(num);

-- Travel: Add 900 more images
INSERT INTO images (title, description, url, thumbnail_url, width, height, photographer_name, photographer_url, download_count, view_count, created_at)
SELECT
  'Travel ' || s.num,
  'Travel destination and adventure scene ' || s.num,
  'https://picsum.photos/seed/travel' || s.num || '/1920/1280',
  'https://picsum.photos/seed/travel' || s.num || '/600/400',
  CASE WHEN s.num % 2 = 0 THEN 5472 ELSE 3787 END,
  CASE WHEN s.num % 2 = 0 THEN 3648 ELSE 5680 END,
  'Travel Photographer',
  'https://www.pexels.com',
  floor(random() * 3500 + 600)::int,
  floor(random() * 13000 + 2500)::int,
  now() - (s.num || ' hours')::interval
FROM generate_series(101, 1000) AS s(num);

-- Food & Drink: Add 900 more images
INSERT INTO images (title, description, url, thumbnail_url, width, height, photographer_name, photographer_url, download_count, view_count, created_at)
SELECT
  'Food ' || s.num,
  'Culinary and food photography ' || s.num,
  'https://picsum.photos/seed/food' || s.num || '/1920/1280',
  'https://picsum.photos/seed/food' || s.num || '/600/400',
  CASE WHEN s.num % 2 = 0 THEN 4928 ELSE 5472 END,
  CASE WHEN s.num % 2 = 0 THEN 3264 ELSE 3648 END,
  'Food Photographer',
  'https://www.pexels.com',
  floor(random() * 2500 + 400)::int,
  floor(random() * 10000 + 1500)::int,
  now() - (s.num || ' hours')::interval
FROM generate_series(101, 1000) AS s(num);

-- Health & Fitness: Add 900 more images
INSERT INTO images (title, description, url, thumbnail_url, width, height, photographer_name, photographer_url, download_count, view_count, created_at)
SELECT
  'Fitness ' || s.num,
  'Health and fitness activity scene ' || s.num,
  'https://picsum.photos/seed/fitness' || s.num || '/1920/1280',
  'https://picsum.photos/seed/fitness' || s.num || '/600/400',
  CASE WHEN s.num % 3 = 0 THEN 5616 ELSE 5472 END,
  CASE WHEN s.num % 3 = 0 THEN 3744 ELSE 3648 END,
  'Fitness Photographer',
  'https://www.pexels.com',
  floor(random() * 2000 + 300)::int,
  floor(random() * 8500 + 1000)::int,
  now() - (s.num || ' hours')::interval
FROM generate_series(101, 1000) AS s(num);

-- Education: Add 900 more images
INSERT INTO images (title, description, url, thumbnail_url, width, height, photographer_name, photographer_url, download_count, view_count, created_at)
SELECT
  'Education ' || s.num,
  'Educational and learning environment scene ' || s.num,
  'https://picsum.photos/seed/education' || s.num || '/1920/1280',
  'https://picsum.photos/seed/education' || s.num || '/600/400',
  CASE WHEN s.num % 2 = 0 THEN 5184 ELSE 6016 END,
  CASE WHEN s.num % 2 = 0 THEN 3456 ELSE 4016 END,
  'Education Photographer',
  'https://www.pexels.com',
  floor(random() * 1800 + 250)::int,
  floor(random() * 7500 + 900)::int,
  now() - (s.num || ' hours')::interval
FROM generate_series(101, 1000) AS s(num);

-- Creative: Add 900 more images
INSERT INTO images (title, description, url, thumbnail_url, width, height, photographer_name, photographer_url, download_count, view_count, created_at)
SELECT
  'Creative ' || s.num,
  'Creative and artistic expression scene ' || s.num,
  'https://picsum.photos/seed/creative' || s.num || '/1920/1280',
  'https://picsum.photos/seed/creative' || s.num || '/600/400',
  CASE WHEN s.num % 2 = 0 THEN 5184 ELSE 3648 END,
  CASE WHEN s.num % 2 = 0 THEN 3456 ELSE 5472 END,
  'Creative Photographer',
  'https://www.pexels.com',
  floor(random() * 2800 + 450)::int,
  floor(random() * 11000 + 1800)::int,
  now() - (s.num || ' hours')::interval
FROM generate_series(101, 1000) AS s(num);

-- Events: Add 900 more images
INSERT INTO images (title, description, url, thumbnail_url, width, height, photographer_name, photographer_url, download_count, view_count, created_at)
SELECT
  'Event ' || s.num,
  'Event and celebration scene ' || s.num,
  'https://picsum.photos/seed/event' || s.num || '/1920/1280',
  'https://picsum.photos/seed/event' || s.num || '/600/400',
  CASE WHEN s.num % 3 = 0 THEN 6000 ELSE 5184 END,
  CASE WHEN s.num % 3 = 0 THEN 4000 ELSE 3456 END,
  'Event Photographer',
  'https://www.pexels.com',
  floor(random() * 2200 + 350)::int,
  floor(random() * 9500 + 1300)::int,
  now() - (s.num || ' hours')::interval
FROM generate_series(101, 1000) AS s(num);

-- Animals: Add 900 more images
INSERT INTO images (title, description, url, thumbnail_url, width, height, photographer_name, photographer_url, download_count, view_count, created_at)
SELECT
  'Animal ' || s.num,
  'Wildlife and animal photography ' || s.num,
  'https://picsum.photos/seed/animal' || s.num || '/1920/1280',
  'https://picsum.photos/seed/animal' || s.num || '/600/400',
  CASE WHEN s.num % 2 = 0 THEN 5184 ELSE 4000 END,
  CASE WHEN s.num % 2 = 0 THEN 3456 ELSE 6000 END,
  'Wildlife Photographer',
  'https://www.pexels.com',
  floor(random() * 3200 + 550)::int,
  floor(random() * 12500 + 2200)::int,
  now() - (s.num || ' hours')::interval
FROM generate_series(101, 1000) AS s(num);

-- Link all new images to their respective categories
INSERT INTO image_categories (image_id, category_id)
SELECT i.id, c.id
FROM images i
CROSS JOIN categories c
WHERE c.slug = 'nature' AND i.title LIKE 'Nature %' AND i.title NOT IN (
  SELECT i2.title FROM images i2
  JOIN image_categories ic ON i2.id = ic.image_id
  WHERE i2.title LIKE 'Nature %'
)
ON CONFLICT DO NOTHING;

INSERT INTO image_categories (image_id, category_id)
SELECT i.id, c.id
FROM images i
CROSS JOIN categories c
WHERE c.slug = 'business' AND i.title LIKE 'Business %' AND i.id NOT IN (
  SELECT ic.image_id FROM image_categories ic
)
ON CONFLICT DO NOTHING;

INSERT INTO image_categories (image_id, category_id)
SELECT i.id, c.id
FROM images i
CROSS JOIN categories c
WHERE c.slug = 'technology' AND i.title LIKE 'Technology %' AND i.id NOT IN (
  SELECT ic.image_id FROM image_categories ic
)
ON CONFLICT DO NOTHING;

INSERT INTO image_categories (image_id, category_id)
SELECT i.id, c.id
FROM images i
CROSS JOIN categories c
WHERE c.slug = 'people' AND i.title LIKE 'People %' AND i.id NOT IN (
  SELECT ic.image_id FROM image_categories ic
)
ON CONFLICT DO NOTHING;

INSERT INTO image_categories (image_id, category_id)
SELECT i.id, c.id
FROM images i
CROSS JOIN categories c
WHERE c.slug = 'lifestyle' AND i.title LIKE 'Lifestyle %' AND i.id NOT IN (
  SELECT ic.image_id FROM image_categories ic
)
ON CONFLICT DO NOTHING;

INSERT INTO image_categories (image_id, category_id)
SELECT i.id, c.id
FROM images i
CROSS JOIN categories c
WHERE c.slug = 'travel' AND i.title LIKE 'Travel %' AND i.id NOT IN (
  SELECT ic.image_id FROM image_categories ic
)
ON CONFLICT DO NOTHING;

INSERT INTO image_categories (image_id, category_id)
SELECT i.id, c.id
FROM images i
CROSS JOIN categories c
WHERE c.slug = 'food-drink' AND i.title LIKE 'Food %' AND i.id NOT IN (
  SELECT ic.image_id FROM image_categories ic
)
ON CONFLICT DO NOTHING;

INSERT INTO image_categories (image_id, category_id)
SELECT i.id, c.id
FROM images i
CROSS JOIN categories c
WHERE c.slug = 'health-fitness' AND i.title LIKE 'Fitness %' AND i.id NOT IN (
  SELECT ic.image_id FROM image_categories ic
)
ON CONFLICT DO NOTHING;

INSERT INTO image_categories (image_id, category_id)
SELECT i.id, c.id
FROM images i
CROSS JOIN categories c
WHERE c.slug = 'education' AND i.title LIKE 'Education %' AND i.id NOT IN (
  SELECT ic.image_id FROM image_categories ic
)
ON CONFLICT DO NOTHING;

INSERT INTO image_categories (image_id, category_id)
SELECT i.id, c.id
FROM images i
CROSS JOIN categories c
WHERE c.slug = 'creative' AND i.title LIKE 'Creative %' AND i.id NOT IN (
  SELECT ic.image_id FROM image_categories ic
)
ON CONFLICT DO NOTHING;

INSERT INTO image_categories (image_id, category_id)
SELECT i.id, c.id
FROM images i
CROSS JOIN categories c
WHERE c.slug = 'events' AND i.title LIKE 'Event %' AND i.id NOT IN (
  SELECT ic.image_id FROM image_categories ic
)
ON CONFLICT DO NOTHING;

INSERT INTO image_categories (image_id, category_id)
SELECT i.id, c.id
FROM images i
CROSS JOIN categories c
WHERE c.slug = 'animals' AND i.title LIKE 'Animal %' AND i.id NOT IN (
  SELECT ic.image_id FROM image_categories ic
)
ON CONFLICT DO NOTHING;

-- Add tags to new images (batch tagging for performance)
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
    AND i.id NOT IN (SELECT image_id FROM image_tags)
  ON CONFLICT DO NOTHING;

  -- Tag Business images
  INSERT INTO image_tags (image_id, tag_id)
  SELECT DISTINCT i.id, t.id
  FROM images i
  CROSS JOIN tags t
  WHERE i.title LIKE 'Business %'
    AND t.slug = ANY(business_tags)
    AND i.id NOT IN (SELECT image_id FROM image_tags)
  ON CONFLICT DO NOTHING;

  -- Tag Technology images
  INSERT INTO image_tags (image_id, tag_id)
  SELECT DISTINCT i.id, t.id
  FROM images i
  CROSS JOIN tags t
  WHERE i.title LIKE 'Technology %'
    AND t.slug = ANY(tech_tags)
    AND i.id NOT IN (SELECT image_id FROM image_tags)
  ON CONFLICT DO NOTHING;

  -- Tag People images
  INSERT INTO image_tags (image_id, tag_id)
  SELECT DISTINCT i.id, t.id
  FROM images i
  CROSS JOIN tags t
  WHERE i.title LIKE 'People %'
    AND t.slug = ANY(people_tags)
    AND i.id NOT IN (SELECT image_id FROM image_tags)
  ON CONFLICT DO NOTHING;

  -- Tag Lifestyle images
  INSERT INTO image_tags (image_id, tag_id)
  SELECT DISTINCT i.id, t.id
  FROM images i
  CROSS JOIN tags t
  WHERE i.title LIKE 'Lifestyle %'
    AND t.slug = ANY(lifestyle_tags)
    AND i.id NOT IN (SELECT image_id FROM image_tags)
  ON CONFLICT DO NOTHING;

  -- Tag Travel images
  INSERT INTO image_tags (image_id, tag_id)
  SELECT DISTINCT i.id, t.id
  FROM images i
  CROSS JOIN tags t
  WHERE i.title LIKE 'Travel %'
    AND t.slug = ANY(travel_tags)
    AND i.id NOT IN (SELECT image_id FROM image_tags)
  ON CONFLICT DO NOTHING;

  -- Tag Food images
  INSERT INTO image_tags (image_id, tag_id)
  SELECT DISTINCT i.id, t.id
  FROM images i
  CROSS JOIN tags t
  WHERE i.title LIKE 'Food %'
    AND t.slug = ANY(food_tags)
    AND i.id NOT IN (SELECT image_id FROM image_tags)
  ON CONFLICT DO NOTHING;

  -- Tag Fitness images
  INSERT INTO image_tags (image_id, tag_id)
  SELECT DISTINCT i.id, t.id
  FROM images i
  CROSS JOIN tags t
  WHERE i.title LIKE 'Fitness %'
    AND t.slug = ANY(fitness_tags)
    AND i.id NOT IN (SELECT image_id FROM image_tags)
  ON CONFLICT DO NOTHING;

  -- Tag Education images
  INSERT INTO image_tags (image_id, tag_id)
  SELECT DISTINCT i.id, t.id
  FROM images i
  CROSS JOIN tags t
  WHERE i.title LIKE 'Education %'
    AND t.slug = ANY(edu_tags)
    AND i.id NOT IN (SELECT image_id FROM image_tags)
  ON CONFLICT DO NOTHING;

  -- Tag Creative images
  INSERT INTO image_tags (image_id, tag_id)
  SELECT DISTINCT i.id, t.id
  FROM images i
  CROSS JOIN tags t
  WHERE i.title LIKE 'Creative %'
    AND t.slug = ANY(creative_tags)
    AND i.id NOT IN (SELECT image_id FROM image_tags)
  ON CONFLICT DO NOTHING;

  -- Tag Event images
  INSERT INTO image_tags (image_id, tag_id)
  SELECT DISTINCT i.id, t.id
  FROM images i
  CROSS JOIN tags t
  WHERE i.title LIKE 'Event %'
    AND t.slug = ANY(event_tags)
    AND i.id NOT IN (SELECT image_id FROM image_tags)
  ON CONFLICT DO NOTHING;

  -- Tag Animal images
  INSERT INTO image_tags (image_id, tag_id)
  SELECT DISTINCT i.id, t.id
  FROM images i
  CROSS JOIN tags t
  WHERE i.title LIKE 'Animal %'
    AND t.slug = ANY(animal_tags)
    AND i.id NOT IN (SELECT image_id FROM image_tags)
  ON CONFLICT DO NOTHING;
END $$;
