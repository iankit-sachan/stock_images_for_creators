import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { IMAGES_PER_PAGE } from '../lib/constants';
import type { Image, SortOption } from '../types';

interface UseImagesOptions {
  sort?: SortOption;
  categorySlug?: string;
  featured?: boolean;
  limit?: number;
}

function getSortColumn(sort: SortOption): string {
  switch (sort) {
    case 'popular': return 'download_count';
    case 'trending': return 'view_count';
    default: return 'created_at';
  }
}

export function useImages(options: UseImagesOptions = {}) {
  const { sort = 'newest', categorySlug, featured, limit } = options;
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);

  const perPage = limit || IMAGES_PER_PAGE;

  const fetchImages = useCallback(async (pageNum: number, reset = false) => {
    setLoading(true);
    try {
      if (categorySlug) {
        const { data: catData } = await supabase
          .from('categories')
          .select('id')
          .eq('slug', categorySlug)
          .maybeSingle();

        if (!catData) {
          setImages([]);
          setHasMore(false);
          setLoading(false);
          return;
        }

        const { data: imageCategories, count } = await supabase
          .from('image_categories')
          .select('image_id, images!inner(*)', { count: 'exact' })
          .eq('category_id', catData.id)
          .order(getSortColumn(sort), { ascending: false, foreignTable: 'images' })
          .range(pageNum * perPage, (pageNum + 1) * perPage - 1);

        if (imageCategories) {
          const data = imageCategories.map((ic: any) => ic.images);
          setImages((prev) => reset ? data : [...prev, ...data]);
          setHasMore((pageNum + 1) * perPage < (count || 0));
        }
      } else {
        let query = supabase.from('images').select('*', { count: 'exact' });

        if (featured) {
          query = query.eq('featured', true);
        }

        query = query
          .order(getSortColumn(sort), { ascending: false })
          .range(pageNum * perPage, (pageNum + 1) * perPage - 1);

        const { data, count } = await query;

        if (data) {
          setImages((prev) => reset ? data : [...prev, ...data]);
          setHasMore((pageNum + 1) * perPage < (count || 0));
        }
      }
    } catch (err) {
      console.error('Error fetching images:', err);
    } finally {
      setLoading(false);
    }
  }, [sort, categorySlug, featured, perPage]);

  useEffect(() => {
    setPage(0);
    fetchImages(0, true);
  }, [fetchImages]);

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchImages(nextPage);
    }
  }, [loading, hasMore, page, fetchImages]);

  return { images, loading, hasMore, loadMore };
}
