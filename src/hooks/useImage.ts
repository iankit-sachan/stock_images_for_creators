import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { ImageWithTags, Image } from '../types';

export function useImage(id: string | undefined) {
  const [image, setImage] = useState<ImageWithTags | null>(null);
  const [relatedImages, setRelatedImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    async function fetchImage() {
      setLoading(true);
      try {
        const { data: imageData } = await supabase
          .from('images')
          .select('*')
          .eq('id', id)
          .maybeSingle();

        if (!imageData) {
          setLoading(false);
          return;
        }

        const { data: tagLinks } = await supabase
          .from('image_tags')
          .select('tag_id')
          .eq('image_id', id);

        let tags: ImageWithTags['tags'] = [];
        if (tagLinks && tagLinks.length > 0) {
          const { data: tagData } = await supabase
            .from('tags')
            .select('*')
            .in('id', tagLinks.map((t) => t.tag_id));
          tags = tagData || [];
        }

        const { data: catLinks } = await supabase
          .from('image_categories')
          .select('category_id')
          .eq('image_id', id);

        let categories: ImageWithTags['categories'] = [];
        if (catLinks && catLinks.length > 0) {
          const { data: catData } = await supabase
            .from('categories')
            .select('*')
            .in('id', catLinks.map((c) => c.category_id));
          categories = catData || [];
        }

        setImage({ ...imageData, tags, categories });

        supabase.rpc('increment_view_count', { image_id: id }).then();

        if (catLinks && catLinks.length > 0) {
          const { data: relatedIds } = await supabase
            .from('image_categories')
            .select('image_id')
            .in('category_id', catLinks.map((c) => c.category_id))
            .neq('image_id', id)
            .limit(8);

          if (relatedIds && relatedIds.length > 0) {
            const { data: related } = await supabase
              .from('images')
              .select('*')
              .in('id', relatedIds.map((r) => r.image_id))
              .limit(8);
            setRelatedImages(related || []);
          }
        }
      } catch (err) {
        console.error('Error fetching image:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchImage();
  }, [id]);

  return { image, relatedImages, loading };
}
