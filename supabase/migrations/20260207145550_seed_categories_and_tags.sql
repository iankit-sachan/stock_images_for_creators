/*
  # Seed Categories and Tags

  1. Categories
    - 12 curated categories with cover images, descriptions, and display order
    - Categories: Nature, Business, Technology, People, Lifestyle, Travel,
      Food & Drink, Health & Fitness, Education, Creative, Events, Animals

  2. Tags
    - 60+ common tags for image discovery and search
    - Covers all major category themes
*/

-- Seed categories
INSERT INTO categories (name, slug, description, cover_image_url, display_order) VALUES
  ('Nature', 'nature', 'Stunning landscapes, forests, oceans, and the beauty of the natural world.', 'https://images.pexels.com/photos/3225517/pexels-photo-3225517.jpeg?auto=compress&cs=tinysrgb&w=800', 1),
  ('Business', 'business', 'Professional workspaces, meetings, strategy, and corporate life.', 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800', 2),
  ('Technology', 'technology', 'Innovation, devices, code, and the digital frontier.', 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=800', 3),
  ('People', 'people', 'Portraits, communities, diversity, and authentic human moments.', 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=800', 4),
  ('Lifestyle', 'lifestyle', 'Everyday moments, wellness, fashion, and modern living.', 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=800', 5),
  ('Travel', 'travel', 'Destinations, adventures, cultures, and wanderlust-inspiring imagery.', 'https://images.pexels.com/photos/2325446/pexels-photo-2325446.jpeg?auto=compress&cs=tinysrgb&w=800', 6),
  ('Food & Drink', 'food-drink', 'Culinary delights, beverages, recipes, and gourmet presentations.', 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800', 7),
  ('Health & Fitness', 'health-fitness', 'Workouts, wellness, nutrition, and active living.', 'https://images.pexels.com/photos/2294361/pexels-photo-2294361.jpeg?auto=compress&cs=tinysrgb&w=800', 8),
  ('Education', 'education', 'Learning, books, classrooms, and the pursuit of knowledge.', 'https://images.pexels.com/photos/256490/pexels-photo-256490.jpeg?auto=compress&cs=tinysrgb&w=800', 9),
  ('Creative', 'creative', 'Art, design, colors, textures, and creative expression.', 'https://images.pexels.com/photos/1266808/pexels-photo-1266808.jpeg?auto=compress&cs=tinysrgb&w=800', 10),
  ('Events', 'events', 'Celebrations, concerts, gatherings, and memorable occasions.', 'https://images.pexels.com/photos/2263436/pexels-photo-2263436.jpeg?auto=compress&cs=tinysrgb&w=800', 11),
  ('Animals', 'animals', 'Wildlife, pets, marine life, and creatures of all kinds.', 'https://images.pexels.com/photos/2295744/pexels-photo-2295744.jpeg?auto=compress&cs=tinysrgb&w=800', 12)
ON CONFLICT (slug) DO NOTHING;

-- Seed tags
INSERT INTO tags (name, slug) VALUES
  ('landscape', 'landscape'), ('mountain', 'mountain'), ('ocean', 'ocean'), ('forest', 'forest'), ('sunset', 'sunset'),
  ('sunrise', 'sunrise'), ('sky', 'sky'), ('flowers', 'flowers'), ('trees', 'trees'), ('river', 'river'),
  ('office', 'office'), ('meeting', 'meeting'), ('teamwork', 'teamwork'), ('startup', 'startup'), ('desk', 'desk'),
  ('laptop', 'laptop'), ('code', 'code'), ('digital', 'digital'), ('software', 'software'), ('innovation', 'innovation'),
  ('portrait', 'portrait'), ('smile', 'smile'), ('group', 'group'), ('diversity', 'diversity'), ('fashion', 'fashion'),
  ('minimal', 'minimal'), ('modern', 'modern'), ('interior', 'interior'), ('coffee', 'coffee'), ('urban', 'urban'),
  ('architecture', 'architecture'), ('city', 'city'), ('beach', 'beach'), ('adventure', 'adventure'), ('hiking', 'hiking'),
  ('food', 'food'), ('cooking', 'cooking'), ('restaurant', 'restaurant'), ('healthy', 'healthy'), ('fruit', 'fruit'),
  ('workout', 'workout'), ('yoga', 'yoga'), ('running', 'running'), ('gym', 'gym'), ('meditation', 'meditation'),
  ('books', 'books'), ('study', 'study'), ('classroom', 'classroom'), ('learning', 'learning'), ('university', 'university'),
  ('art', 'art'), ('painting', 'painting'), ('design', 'design'), ('color', 'color'), ('texture', 'texture'),
  ('concert', 'concert'), ('wedding', 'wedding'), ('party', 'party'), ('festival', 'festival'), ('celebration', 'celebration'),
  ('wildlife', 'wildlife'), ('dog', 'dog'), ('cat', 'cat'), ('bird', 'bird'), ('marine', 'marine'),
  ('abstract', 'abstract'), ('night', 'night'), ('rain', 'rain'), ('snow', 'snow'), ('autumn', 'autumn')
ON CONFLICT (slug) DO NOTHING;
