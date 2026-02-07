/*
  # Core Schema for pumaai.in Stock Image Platform

  1. New Tables
    - `categories` - Image categories (Nature, Business, Technology, etc.)
      - `id` (uuid, primary key)
      - `name` (text) - Display name
      - `slug` (text, unique) - URL-friendly identifier
      - `description` (text) - Short description
      - `cover_image_url` (text) - Cover image for category card
      - `display_order` (integer) - Sort order
      - `created_at` (timestamptz)

    - `images` - Stock images
      - `id` (uuid, primary key)
      - `title` (text) - Image title
      - `description` (text) - Image description
      - `url` (text) - Full resolution image URL
      - `thumbnail_url` (text) - Thumbnail/preview URL
      - `width` (integer) - Image width in pixels
      - `height` (integer) - Image height in pixels
      - `photographer_name` (text) - Credit name
      - `photographer_url` (text) - Link to photographer
      - `is_ai_generated` (boolean) - Whether AI-generated
      - `download_count` (integer) - Number of downloads
      - `view_count` (integer) - Number of views
      - `featured` (boolean) - Featured on homepage
      - `created_at` (timestamptz)

    - `tags` - Searchable tags
      - `id` (uuid, primary key)
      - `name` (text, unique) - Tag display name
      - `slug` (text, unique) - URL-friendly tag

    - `image_categories` - Junction table linking images to categories
      - `image_id` (uuid, FK to images)
      - `category_id` (uuid, FK to categories)

    - `image_tags` - Junction table linking images to tags
      - `image_id` (uuid, FK to images)
      - `tag_id` (uuid, FK to tags)

  2. Security
    - RLS enabled on all tables
    - Public read access for anonymous users (stock images are public)
    - No write access from client (admin-only via service role)

  3. Indexes
    - images: featured, download_count, created_at, view_count
    - categories: slug, display_order
    - tags: slug
    - Full-text search index on images (title, description)

  4. Functions
    - `search_images` - Full-text search across images, tags, and descriptions
    - `increment_download_count` - Safely increment download counter
    - `increment_view_count` - Safely increment view counter
*/

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text DEFAULT '',
  cover_image_url text DEFAULT '',
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view categories"
  ON categories FOR SELECT
  TO anon, authenticated
  USING (true);

-- Images table
CREATE TABLE IF NOT EXISTS images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text DEFAULT '',
  url text NOT NULL,
  thumbnail_url text DEFAULT '',
  width integer DEFAULT 0,
  height integer DEFAULT 0,
  photographer_name text DEFAULT '',
  photographer_url text DEFAULT '',
  is_ai_generated boolean DEFAULT false,
  download_count integer DEFAULT 0,
  view_count integer DEFAULT 0,
  featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view images"
  ON images FOR SELECT
  TO anon, authenticated
  USING (true);

-- Tags table
CREATE TABLE IF NOT EXISTS tags (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  slug text UNIQUE NOT NULL
);

ALTER TABLE tags ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view tags"
  ON tags FOR SELECT
  TO anon, authenticated
  USING (true);

-- Image-Categories junction
CREATE TABLE IF NOT EXISTS image_categories (
  image_id uuid NOT NULL REFERENCES images(id) ON DELETE CASCADE,
  category_id uuid NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  PRIMARY KEY (image_id, category_id)
);

ALTER TABLE image_categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view image categories"
  ON image_categories FOR SELECT
  TO anon, authenticated
  USING (true);

-- Image-Tags junction
CREATE TABLE IF NOT EXISTS image_tags (
  image_id uuid NOT NULL REFERENCES images(id) ON DELETE CASCADE,
  tag_id uuid NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (image_id, tag_id)
);

ALTER TABLE image_tags ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view image tags"
  ON image_tags FOR SELECT
  TO anon, authenticated
  USING (true);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_images_featured ON images(featured) WHERE featured = true;
CREATE INDEX IF NOT EXISTS idx_images_download_count ON images(download_count DESC);
CREATE INDEX IF NOT EXISTS idx_images_created_at ON images(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_images_view_count ON images(view_count DESC);
CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug);
CREATE INDEX IF NOT EXISTS idx_categories_display_order ON categories(display_order);
CREATE INDEX IF NOT EXISTS idx_tags_slug ON tags(slug);

-- Full-text search index
CREATE INDEX IF NOT EXISTS idx_images_fts ON images
  USING gin(to_tsvector('english', coalesce(title, '') || ' ' || coalesce(description, '')));

-- Function: Search images with full-text search
CREATE OR REPLACE FUNCTION search_images(search_query text, result_limit integer DEFAULT 20, result_offset integer DEFAULT 0)
RETURNS SETOF images
LANGUAGE sql
STABLE
AS $$
  SELECT DISTINCT i.*
  FROM images i
  LEFT JOIN image_tags it ON i.id = it.image_id
  LEFT JOIN tags t ON it.tag_id = t.id
  WHERE
    to_tsvector('english', coalesce(i.title, '') || ' ' || coalesce(i.description, '')) @@ plainto_tsquery('english', search_query)
    OR t.name ILIKE '%' || search_query || '%'
    OR i.title ILIKE '%' || search_query || '%'
  ORDER BY i.download_count DESC, i.created_at DESC
  LIMIT result_limit
  OFFSET result_offset;
$$;

-- Function: Increment download count
CREATE OR REPLACE FUNCTION increment_download_count(image_id uuid)
RETURNS void
LANGUAGE sql
AS $$
  UPDATE images SET download_count = download_count + 1 WHERE id = image_id;
$$;

-- Function: Increment view count
CREATE OR REPLACE FUNCTION increment_view_count(image_id uuid)
RETURNS void
LANGUAGE sql
AS $$
  UPDATE images SET view_count = view_count + 1 WHERE id = image_id;
$$;
