/*
  # Add admin-only write policies to all public tables

  1. Modified Tables
    - `images` - Add INSERT, UPDATE, DELETE policies requiring admin role
    - `categories` - Add INSERT, UPDATE, DELETE policies requiring admin role
    - `tags` - Add INSERT, UPDATE, DELETE policies requiring admin role
    - `image_categories` - Add INSERT, DELETE policies requiring admin role
    - `image_tags` - Add INSERT, DELETE policies requiring admin role

  2. Security
    - All write operations now require authenticated user with admin role
    - Existing public SELECT policies remain unchanged
    - Uses is_admin() helper function for consistent role checks
*/

-- images: admin-only write
CREATE POLICY "Admins can insert images"
  ON images FOR INSERT
  TO authenticated
  WITH CHECK (public.is_admin());

CREATE POLICY "Admins can update images"
  ON images FOR UPDATE
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "Admins can delete images"
  ON images FOR DELETE
  TO authenticated
  USING (public.is_admin());

-- categories: admin-only write
CREATE POLICY "Admins can insert categories"
  ON categories FOR INSERT
  TO authenticated
  WITH CHECK (public.is_admin());

CREATE POLICY "Admins can update categories"
  ON categories FOR UPDATE
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "Admins can delete categories"
  ON categories FOR DELETE
  TO authenticated
  USING (public.is_admin());

-- tags: admin-only write
CREATE POLICY "Admins can insert tags"
  ON tags FOR INSERT
  TO authenticated
  WITH CHECK (public.is_admin());

CREATE POLICY "Admins can update tags"
  ON tags FOR UPDATE
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "Admins can delete tags"
  ON tags FOR DELETE
  TO authenticated
  USING (public.is_admin());

-- image_categories: admin-only write
CREATE POLICY "Admins can insert image_categories"
  ON image_categories FOR INSERT
  TO authenticated
  WITH CHECK (public.is_admin());

CREATE POLICY "Admins can delete image_categories"
  ON image_categories FOR DELETE
  TO authenticated
  USING (public.is_admin());

-- image_tags: admin-only write
CREATE POLICY "Admins can insert image_tags"
  ON image_tags FOR INSERT
  TO authenticated
  WITH CHECK (public.is_admin());

CREATE POLICY "Admins can delete image_tags"
  ON image_tags FOR DELETE
  TO authenticated
  USING (public.is_admin());
