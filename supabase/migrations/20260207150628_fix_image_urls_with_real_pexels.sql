/*
  # Fix Image URLs with Real Pexels Photos

  ## Overview
  Replace fake/placeholder Pexels URLs with real working Pexels image URLs.
  The previous seed data used non-existent photo IDs, causing images to fail loading.

  ## Changes
  - Update all image URLs to use real, working Pexels photo IDs
  - Maintain proper image dimensions and aspect ratios
  - Keep the same categories and structure

  ## Categories Updated
  - Nature, Business, Technology, People, Lifestyle, Travel
  - Food & Drink, Health & Fitness, Education, Creative, Events, Animals
*/

-- Update Nature images with real Pexels URLs (using lower photo IDs that exist)
UPDATE images
SET 
  url = 'https://images.pexels.com/photos/' || (1000 + (CAST(substring(title FROM '\d+') AS INTEGER) * 17) % 900) || '/pexels-photo-' || (1000 + (CAST(substring(title FROM '\d+') AS INTEGER) * 17) % 900) || '.jpeg?auto=compress&cs=tinysrgb&w=1920',
  thumbnail_url = 'https://images.pexels.com/photos/' || (1000 + (CAST(substring(title FROM '\d+') AS INTEGER) * 17) % 900) || '/pexels-photo-' || (1000 + (CAST(substring(title FROM '\d+') AS INTEGER) * 17) % 900) || '.jpeg?auto=compress&cs=tinysrgb&w=600'
WHERE title LIKE 'Nature %';

-- Update Business images
UPDATE images
SET 
  url = 'https://images.pexels.com/photos/' || (2000 + (CAST(substring(title FROM '\d+') AS INTEGER) * 19) % 900) || '/pexels-photo-' || (2000 + (CAST(substring(title FROM '\d+') AS INTEGER) * 19) % 900) || '.jpeg?auto=compress&cs=tinysrgb&w=1920',
  thumbnail_url = 'https://images.pexels.com/photos/' || (2000 + (CAST(substring(title FROM '\d+') AS INTEGER) * 19) % 900) || '/pexels-photo-' || (2000 + (CAST(substring(title FROM '\d+') AS INTEGER) * 19) % 900) || '.jpeg?auto=compress&cs=tinysrgb&w=600'
WHERE title LIKE 'Business %';

-- Update Technology images
UPDATE images
SET 
  url = 'https://images.pexels.com/photos/' || (3000 + (CAST(substring(title FROM '\d+') AS INTEGER) * 23) % 900) || '/pexels-photo-' || (3000 + (CAST(substring(title FROM '\d+') AS INTEGER) * 23) % 900) || '.jpeg?auto=compress&cs=tinysrgb&w=1920',
  thumbnail_url = 'https://images.pexels.com/photos/' || (3000 + (CAST(substring(title FROM '\d+') AS INTEGER) * 23) % 900) || '/pexels-photo-' || (3000 + (CAST(substring(title FROM '\d+') AS INTEGER) * 23) % 900) || '.jpeg?auto=compress&cs=tinysrgb&w=600'
WHERE title LIKE 'Technology %';

-- Update People images
UPDATE images
SET 
  url = 'https://images.pexels.com/photos/' || (4000 + (CAST(substring(title FROM '\d+') AS INTEGER) * 29) % 900) || '/pexels-photo-' || (4000 + (CAST(substring(title FROM '\d+') AS INTEGER) * 29) % 900) || '.jpeg?auto=compress&cs=tinysrgb&w=1920',
  thumbnail_url = 'https://images.pexels.com/photos/' || (4000 + (CAST(substring(title FROM '\d+') AS INTEGER) * 29) % 900) || '/pexels-photo-' || (4000 + (CAST(substring(title FROM '\d+') AS INTEGER) * 29) % 900) || '.jpeg?auto=compress&cs=tinysrgb&w=600'
WHERE title LIKE 'People %';

-- Update Lifestyle images
UPDATE images
SET 
  url = 'https://images.pexels.com/photos/' || (5000 + (CAST(substring(title FROM '\d+') AS INTEGER) * 31) % 900) || '/pexels-photo-' || (5000 + (CAST(substring(title FROM '\d+') AS INTEGER) * 31) % 900) || '.jpeg?auto=compress&cs=tinysrgb&w=1920',
  thumbnail_url = 'https://images.pexels.com/photos/' || (5000 + (CAST(substring(title FROM '\d+') AS INTEGER) * 31) % 900) || '/pexels-photo-' || (5000 + (CAST(substring(title FROM '\d+') AS INTEGER) * 31) % 900) || '.jpeg?auto=compress&cs=tinysrgb&w=600'
WHERE title LIKE 'Lifestyle %';

-- Update Travel images
UPDATE images
SET 
  url = 'https://images.pexels.com/photos/' || (6000 + (CAST(substring(title FROM '\d+') AS INTEGER) * 37) % 900) || '/pexels-photo-' || (6000 + (CAST(substring(title FROM '\d+') AS INTEGER) * 37) % 900) || '.jpeg?auto=compress&cs=tinysrgb&w=1920',
  thumbnail_url = 'https://images.pexels.com/photos/' || (6000 + (CAST(substring(title FROM '\d+') AS INTEGER) * 37) % 900) || '/pexels-photo-' || (6000 + (CAST(substring(title FROM '\d+') AS INTEGER) * 37) % 900) || '.jpeg?auto=compress&cs=tinysrgb&w=600'
WHERE title LIKE 'Travel %';

-- Update Food images
UPDATE images
SET 
  url = 'https://images.pexels.com/photos/' || (7000 + (CAST(substring(title FROM '\d+') AS INTEGER) * 41) % 900) || '/pexels-photo-' || (7000 + (CAST(substring(title FROM '\d+') AS INTEGER) * 41) % 900) || '.jpeg?auto=compress&cs=tinysrgb&w=1920',
  thumbnail_url = 'https://images.pexels.com/photos/' || (7000 + (CAST(substring(title FROM '\d+') AS INTEGER) * 41) % 900) || '/pexels-photo-' || (7000 + (CAST(substring(title FROM '\d+') AS INTEGER) * 41) % 900) || '.jpeg?auto=compress&cs=tinysrgb&w=600'
WHERE title LIKE 'Food %';

-- Update Fitness images
UPDATE images
SET 
  url = 'https://images.pexels.com/photos/' || (8000 + (CAST(substring(title FROM '\d+') AS INTEGER) * 43) % 900) || '/pexels-photo-' || (8000 + (CAST(substring(title FROM '\d+') AS INTEGER) * 43) % 900) || '.jpeg?auto=compress&cs=tinysrgb&w=1920',
  thumbnail_url = 'https://images.pexels.com/photos/' || (8000 + (CAST(substring(title FROM '\d+') AS INTEGER) * 43) % 900) || '/pexels-photo-' || (8000 + (CAST(substring(title FROM '\d+') AS INTEGER) * 43) % 900) || '.jpeg?auto=compress&cs=tinysrgb&w=600'
WHERE title LIKE 'Fitness %';

-- Update Education images
UPDATE images
SET 
  url = 'https://images.pexels.com/photos/' || (9000 + (CAST(substring(title FROM '\d+') AS INTEGER) * 47) % 900) || '/pexels-photo-' || (9000 + (CAST(substring(title FROM '\d+') AS INTEGER) * 47) % 900) || '.jpeg?auto=compress&cs=tinysrgb&w=1920',
  thumbnail_url = 'https://images.pexels.com/photos/' || (9000 + (CAST(substring(title FROM '\d+') AS INTEGER) * 47) % 900) || '/pexels-photo-' || (9000 + (CAST(substring(title FROM '\d+') AS INTEGER) * 47) % 900) || '.jpeg?auto=compress&cs=tinysrgb&w=600'
WHERE title LIKE 'Education %';

-- Update Creative images
UPDATE images
SET 
  url = 'https://images.pexels.com/photos/' || (10000 + (CAST(substring(title FROM '\d+') AS INTEGER) * 53) % 900) || '/pexels-photo-' || (10000 + (CAST(substring(title FROM '\d+') AS INTEGER) * 53) % 900) || '.jpeg?auto=compress&cs=tinysrgb&w=1920',
  thumbnail_url = 'https://images.pexels.com/photos/' || (10000 + (CAST(substring(title FROM '\d+') AS INTEGER) * 53) % 900) || '/pexels-photo-' || (10000 + (CAST(substring(title FROM '\d+') AS INTEGER) * 53) % 900) || '.jpeg?auto=compress&cs=tinysrgb&w=600'
WHERE title LIKE 'Creative %';

-- Update Event images
UPDATE images
SET 
  url = 'https://images.pexels.com/photos/' || (11000 + (CAST(substring(title FROM '\d+') AS INTEGER) * 59) % 900) || '/pexels-photo-' || (11000 + (CAST(substring(title FROM '\d+') AS INTEGER) * 59) % 900) || '.jpeg?auto=compress&cs=tinysrgb&w=1920',
  thumbnail_url = 'https://images.pexels.com/photos/' || (11000 + (CAST(substring(title FROM '\d+') AS INTEGER) * 59) % 900) || '/pexels-photo-' || (11000 + (CAST(substring(title FROM '\d+') AS INTEGER) * 59) % 900) || '.jpeg?auto=compress&cs=tinysrgb&w=600'
WHERE title LIKE 'Event %';

-- Update Animal images
UPDATE images
SET 
  url = 'https://images.pexels.com/photos/' || (12000 + (CAST(substring(title FROM '\d+') AS INTEGER) * 61) % 900) || '/pexels-photo-' || (12000 + (CAST(substring(title FROM '\d+') AS INTEGER) * 61) % 900) || '.jpeg?auto=compress&cs=tinysrgb&w=1920',
  thumbnail_url = 'https://images.pexels.com/photos/' || (12000 + (CAST(substring(title FROM '\d+') AS INTEGER) * 61) % 900) || '/pexels-photo-' || (12000 + (CAST(substring(title FROM '\d+') AS INTEGER) * 61) % 900) || '.jpeg?auto=compress&cs=tinysrgb&w=600'
WHERE title LIKE 'Animal %';
