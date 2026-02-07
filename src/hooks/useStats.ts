import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface Stats {
  imageCount: number;
  categoryCount: number;
  downloadCount: number;
}

export function useStats() {
  const [stats, setStats] = useState<Stats>({
    imageCount: 0,
    categoryCount: 0,
    downloadCount: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const [imagesResult, categoriesResult, downloadsResult] = await Promise.all([
          supabase.from('images').select('id', { count: 'exact', head: true }),
          supabase.from('categories').select('id', { count: 'exact', head: true }),
          supabase.from('images').select('download_count'),
        ]);

        const totalDownloads = downloadsResult.data?.reduce(
          (sum, img) => sum + (img.download_count || 0),
          0
        ) || 0;

        setStats({
          imageCount: imagesResult.count || 0,
          categoryCount: categoriesResult.count || 0,
          downloadCount: totalDownloads,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  return { stats, loading };
}
