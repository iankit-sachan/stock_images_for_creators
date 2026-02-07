/*
  # Use Reliable Placeholder Images

  ## Overview
  Replace Pexels URLs with reliable Lorem Picsum placeholder images.
  Lorem Picsum provides guaranteed-to-work image URLs for development/demo purposes.

  ## Changes
  - Update all image URLs to use picsum.photos
  - Maintains proper dimensions and aspect ratios
  - Images will load reliably without 404 errors

  ## Technical Details
  - Using picsum.photos service which provides real photos
  - Different seed values ensure image variety
  - Proper thumbnail sizes for performance
*/

-- Update Nature images
UPDATE images
SET 
  url = 'https://picsum.photos/seed/nature' || id || '/1920/1280',
  thumbnail_url = 'https://picsum.photos/seed/nature' || id || '/600/400'
WHERE title LIKE 'Nature %';

-- Update Business images
UPDATE images
SET 
  url = 'https://picsum.photos/seed/business' || id || '/1920/1280',
  thumbnail_url = 'https://picsum.photos/seed/business' || id || '/600/400'
WHERE title LIKE 'Business %';

-- Update Technology images
UPDATE images
SET 
  url = 'https://picsum.photos/seed/tech' || id || '/1920/1280',
  thumbnail_url = 'https://picsum.photos/seed/tech' || id || '/600/400'
WHERE title LIKE 'Technology %';

-- Update People images
UPDATE images
SET 
  url = 'https://picsum.photos/seed/people' || id || '/1920/1280',
  thumbnail_url = 'https://picsum.photos/seed/people' || id || '/600/400'
WHERE title LIKE 'People %';

-- Update Lifestyle images
UPDATE images
SET 
  url = 'https://picsum.photos/seed/lifestyle' || id || '/1920/1280',
  thumbnail_url = 'https://picsum.photos/seed/lifestyle' || id || '/600/400'
WHERE title LIKE 'Lifestyle %';

-- Update Travel images
UPDATE images
SET 
  url = 'https://picsum.photos/seed/travel' || id || '/1920/1280',
  thumbnail_url = 'https://picsum.photos/seed/travel' || id || '/600/400'
WHERE title LIKE 'Travel %';

-- Update Food images
UPDATE images
SET 
  url = 'https://picsum.photos/seed/food' || id || '/1920/1280',
  thumbnail_url = 'https://picsum.photos/seed/food' || id || '/600/400'
WHERE title LIKE 'Food %';

-- Update Fitness images
UPDATE images
SET 
  url = 'https://picsum.photos/seed/fitness' || id || '/1920/1280',
  thumbnail_url = 'https://picsum.photos/seed/fitness' || id || '/600/400'
WHERE title LIKE 'Fitness %';

-- Update Education images
UPDATE images
SET 
  url = 'https://picsum.photos/seed/education' || id || '/1920/1280',
  thumbnail_url = 'https://picsum.photos/seed/education' || id || '/600/400'
WHERE title LIKE 'Education %';

-- Update Creative images
UPDATE images
SET 
  url = 'https://picsum.photos/seed/creative' || id || '/1920/1280',
  thumbnail_url = 'https://picsum.photos/seed/creative' || id || '/600/400'
WHERE title LIKE 'Creative %';

-- Update Event images
UPDATE images
SET 
  url = 'https://picsum.photos/seed/event' || id || '/1920/1280',
  thumbnail_url = 'https://picsum.photos/seed/event' || id || '/600/400'
WHERE title LIKE 'Event %';

-- Update Animal images
UPDATE images
SET 
  url = 'https://picsum.photos/seed/animal' || id || '/1920/1280',
  thumbnail_url = 'https://picsum.photos/seed/animal' || id || '/600/400'
WHERE title LIKE 'Animal %';
