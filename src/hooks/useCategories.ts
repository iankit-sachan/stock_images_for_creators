import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Category } from '../types';

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const { data: cats } = await supabase
          .from('categories')
          .select('*')
          .order('display_order', { ascending: true });

        if (!cats) {
          setLoading(false);
          return;
        }

        const withCounts = await Promise.all(
          cats.map(async (cat) => {
            const { count } = await supabase
              .from('image_categories')
              .select('*', { count: 'exact', head: true })
              .eq('category_id', cat.id);
            return { ...cat, image_count: count || 0 };
          })
        );

        setCategories(withCounts);
      } catch (err) {
        console.error('Error fetching categories:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  return { categories, loading };
}
