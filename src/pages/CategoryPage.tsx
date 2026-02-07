import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import MasonryGrid from '../components/ui/MasonryGrid';
import SortBar from '../components/ui/SortBar';
import InfiniteScrollTrigger from '../components/ui/InfiniteScrollTrigger';
import ScrollToTop from '../components/ui/ScrollToTop';
import { useImages } from '../hooks/useImages';
import { supabase } from '../lib/supabase';
import type { Category, SortOption } from '../types';

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const [sort, setSort] = useState<SortOption>('newest');
  const [category, setCategory] = useState<Category | null>(null);
  const { images, loading, hasMore, loadMore } = useImages({ sort, categorySlug: slug });

  useEffect(() => {
    if (!slug) return;
    supabase
      .from('categories')
      .select('*')
      .eq('slug', slug)
      .maybeSingle()
      .then(({ data }) => {
        if (data) setCategory(data);
      });
  }, [slug]);

  return (
    <div className="pt-16">
      <div className="relative h-64 sm:h-80 overflow-hidden">
        {category?.cover_image_url && (
          <img
            src={category.cover_image_url}
            alt={category.name}
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20" />
        <div className="absolute bottom-0 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
          <nav className="flex items-center gap-1.5 text-sm text-white/60 mb-3">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link to="/categories" className="hover:text-white transition-colors">Categories</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white">{category?.name}</span>
          </nav>
          <h1 className="text-4xl font-bold text-white">{category?.name}</h1>
          {category?.description && (
            <p className="mt-2 text-white/70 max-w-xl">{category.description}</p>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8">
          <SortBar active={sort} onChange={setSort} />
        </div>

        <MasonryGrid images={images} loading={loading && images.length === 0} />
        <InfiniteScrollTrigger hasMore={hasMore} loading={loading} onLoadMore={loadMore} />

        {!loading && images.length === 0 && (
          <div className="text-center py-20">
            <p className="text-neutral-400 dark:text-neutral-500">No images in this category yet.</p>
          </div>
        )}
      </div>
      <ScrollToTop />
    </div>
  );
}
