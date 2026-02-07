import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { IMAGES_PER_PAGE } from '../lib/constants';
import type { Image } from '../types';

export function useSearch(query: string) {
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);

  const search = useCallback(async (pageNum: number, reset = false) => {
    if (!query.trim()) {
      setImages([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const { data } = await supabase.rpc('search_images', {
        search_query: query.trim(),
        result_limit: IMAGES_PER_PAGE,
        result_offset: pageNum * IMAGES_PER_PAGE,
      });

      if (data) {
        setImages((prev) => reset ? data : [...prev, ...data]);
        setHasMore(data.length === IMAGES_PER_PAGE);
      }
    } catch (err) {
      console.error('Error searching images:', err);
    } finally {
      setLoading(false);
    }
  }, [query]);

  useEffect(() => {
    setPage(0);
    search(0, true);
  }, [search]);

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      search(nextPage);
    }
  }, [loading, hasMore, page, search]);

  return { images, loading, hasMore, loadMore };
}
