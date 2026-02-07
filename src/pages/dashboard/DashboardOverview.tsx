import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Image, Layers, Tags, Download, Eye, TrendingUp, ArrowUpRight } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface Stats {
  totalImages: number;
  totalCategories: number;
  totalTags: number;
  totalDownloads: number;
  totalViews: number;
  featuredCount: number;
  recentImages: Array<{ id: string; title: string; thumbnail_url: string; created_at: string; download_count: number }>;
  topImages: Array<{ id: string; title: string; thumbnail_url: string; download_count: number; view_count: number }>;
}

export default function DashboardOverview() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const [
          { count: totalImages },
          { count: totalCategories },
          { count: totalTags },
          { data: images },
          { data: recent },
          { data: top },
        ] = await Promise.all([
          supabase.from('images').select('*', { count: 'exact', head: true }),
          supabase.from('categories').select('*', { count: 'exact', head: true }),
          supabase.from('tags').select('*', { count: 'exact', head: true }),
          supabase.from('images').select('download_count, view_count, featured'),
          supabase.from('images').select('id, title, thumbnail_url, created_at, download_count').order('created_at', { ascending: false }).limit(5),
          supabase.from('images').select('id, title, thumbnail_url, download_count, view_count').order('download_count', { ascending: false }).limit(5),
        ]);

        const totalDownloads = images?.reduce((sum, img) => sum + (img.download_count || 0), 0) || 0;
        const totalViews = images?.reduce((sum, img) => sum + (img.view_count || 0), 0) || 0;
        const featuredCount = images?.filter((img) => img.featured).length || 0;

        setStats({
          totalImages: totalImages || 0,
          totalCategories: totalCategories || 0,
          totalTags: totalTags || 0,
          totalDownloads,
          totalViews,
          featuredCount,
          recentImages: recent || [],
          topImages: top || [],
        });
      } catch (err) {
        console.error('Error fetching stats:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="skeleton h-28 rounded-xl" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="skeleton h-80 rounded-xl" />
          <div className="skeleton h-80 rounded-xl" />
        </div>
      </div>
    );
  }

  if (!stats) return null;

  const statCards = [
    { icon: Image, label: 'Total Images', value: stats.totalImages, color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-900/20', link: '/dashboard/images' },
    { icon: Layers, label: 'Categories', value: stats.totalCategories, color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-900/20', link: '/dashboard/categories' },
    { icon: Tags, label: 'Tags', value: stats.totalTags, color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-900/20', link: '/dashboard/tags' },
    { icon: Download, label: 'Total Downloads', value: stats.totalDownloads.toLocaleString(), color: 'text-rose-600 dark:text-rose-400', bg: 'bg-rose-50 dark:bg-rose-900/20' },
    { icon: Eye, label: 'Total Views', value: stats.totalViews.toLocaleString(), color: 'text-cyan-600 dark:text-cyan-400', bg: 'bg-cyan-50 dark:bg-cyan-900/20' },
    { icon: TrendingUp, label: 'Featured', value: stats.featuredCount, color: 'text-accent-600 dark:text-accent-400', bg: 'bg-accent-50 dark:bg-accent-900/20' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {statCards.map(({ icon: Icon, label, value, color, bg, link }) => {
          const content = (
            <div className="bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className={`p-2.5 rounded-xl ${bg}`}>
                  <Icon className={`w-5 h-5 ${color}`} />
                </div>
                {link && <ArrowUpRight className="w-4 h-4 text-neutral-300 dark:text-neutral-600" />}
              </div>
              <div className="mt-4">
                <p className="text-2xl font-bold text-neutral-900 dark:text-white">{value}</p>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">{label}</p>
              </div>
            </div>
          );

          return link ? (
            <Link key={label} to={link}>{content}</Link>
          ) : (
            <div key={label}>{content}</div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 overflow-hidden">
          <div className="px-5 py-4 border-b border-neutral-100 dark:border-neutral-800">
            <h3 className="font-semibold text-neutral-900 dark:text-white">Recently Added</h3>
          </div>
          <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
            {stats.recentImages.map((img) => (
              <Link
                key={img.id}
                to={`/dashboard/images`}
                className="flex items-center gap-3 px-5 py-3 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors"
              >
                <img src={img.thumbnail_url} alt={img.title} className="w-10 h-10 rounded-lg object-cover" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-neutral-900 dark:text-white truncate">{img.title}</p>
                  <p className="text-xs text-neutral-400">{new Date(img.created_at).toLocaleDateString()}</p>
                </div>
                <div className="flex items-center gap-1 text-xs text-neutral-400">
                  <Download className="w-3.5 h-3.5" />
                  {img.download_count}
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 overflow-hidden">
          <div className="px-5 py-4 border-b border-neutral-100 dark:border-neutral-800">
            <h3 className="font-semibold text-neutral-900 dark:text-white">Most Downloaded</h3>
          </div>
          <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
            {stats.topImages.map((img, idx) => (
              <Link
                key={img.id}
                to={`/dashboard/images`}
                className="flex items-center gap-3 px-5 py-3 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors"
              >
                <span className="w-6 text-center text-sm font-bold text-neutral-300 dark:text-neutral-600">
                  {idx + 1}
                </span>
                <img src={img.thumbnail_url} alt={img.title} className="w-10 h-10 rounded-lg object-cover" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-neutral-900 dark:text-white truncate">{img.title}</p>
                  <p className="text-xs text-neutral-400">{img.view_count.toLocaleString()} views</p>
                </div>
                <div className="flex items-center gap-1 text-xs font-medium text-neutral-500 dark:text-neutral-400">
                  <Download className="w-3.5 h-3.5" />
                  {img.download_count.toLocaleString()}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
