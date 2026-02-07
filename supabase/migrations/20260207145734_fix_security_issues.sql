/*
  # Fix Security and Performance Issues

  ## 1. Add Missing Foreign Key Indexes
    - Add index on `image_categories.category_id` for better query performance
    - Add index on `image_tags.tag_id` for better query performance

  ## 2. Optimize RLS Policy
    - Fix `profiles` table RLS policy to use `(select auth.uid())` instead of `auth.uid()`
    - This prevents re-evaluation of auth function for each row, improving performance at scale

  ## 3. Remove Unused Indexes
    - Drop `idx_images_featured` - not being used by queries
    - Drop `idx_images_view_count` - not being used by queries
    - Drop `idx_tags_slug` - not being used by queries
    - Drop `idx_images_fts` - not being used by queries
    - Removing unused indexes improves write performance and reduces storage

  ## 4. Fix Function Search Path
    - Update `search_images` function to have immutable search_path
    - Prevents potential security issues with search_path manipulation

  ## Important Notes
    - Some issues require Supabase dashboard configuration:
      * Auth DB Connection Strategy: Switch to percentage-based allocation
      * Leaked Password Protection: Enable in Auth settings
*/

-- 1. Add missing foreign key indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_image_categories_category_id ON image_categories(category_id);
CREATE INDEX IF NOT EXISTS idx_image_tags_tag_id ON image_tags(tag_id);

-- 2. Fix RLS policy on profiles table to use subquery for better performance
DROP POLICY IF EXISTS "Users can read own profile" ON profiles;

CREATE POLICY "Users can read own profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING ((select auth.uid()) = id);

-- 3. Remove unused indexes to improve write performance
DROP INDEX IF EXISTS idx_images_featured;
DROP INDEX IF EXISTS idx_images_view_count;
DROP INDEX IF EXISTS idx_tags_slug;
DROP INDEX IF EXISTS idx_images_fts;

-- 4. Fix search_images function with proper search_path
CREATE OR REPLACE FUNCTION search_images(search_query text, result_limit integer DEFAULT 20, result_offset integer DEFAULT 0)
RETURNS SETOF images
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT DISTINCT i.*
  FROM images i
  LEFT JOIN image_tags it ON i.id = it.image_id
  LEFT JOIN tags t ON it.tag_id = t.id
  WHERE
    t.name ILIKE '%' || search_query || '%'
    OR i.title ILIKE '%' || search_query || '%'
    OR i.description ILIKE '%' || search_query || '%'
  ORDER BY i.download_count DESC, i.created_at DESC
  LIMIT result_limit
  OFFSET result_offset;
$$;
