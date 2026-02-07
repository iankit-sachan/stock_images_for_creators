/*
  # Secure counter functions with SECURITY DEFINER

  1. Modified Functions
    - `increment_view_count` - Now uses SECURITY DEFINER so anonymous users can still increment view counts despite RLS write restrictions
    - `increment_download_count` - Same treatment for download counts

  2. Security
    - Both functions use explicit search_path = public to prevent search_path hijacking
    - Functions execute with elevated privileges but only perform controlled counter increments
*/

CREATE OR REPLACE FUNCTION public.increment_view_count(image_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE images SET view_count = view_count + 1 WHERE id = image_id;
END;
$$;

CREATE OR REPLACE FUNCTION public.increment_download_count(image_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE images SET download_count = download_count + 1 WHERE id = image_id;
END;
$$;
