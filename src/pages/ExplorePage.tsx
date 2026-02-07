import { useState } from 'react';
import MasonryGrid from '../components/ui/MasonryGrid';
import SortBar from '../components/ui/SortBar';
import InfiniteScrollTrigger from '../components/ui/InfiniteScrollTrigger';
import ScrollToTop from '../components/ui/ScrollToTop';
import { useImages } from '../hooks/useImages';
import type { SortOption } from '../types';

export default function ExplorePage() {
  const [sort, setSort] = useState<SortOption>('newest');
  const { images, loading, hasMore, loadMore } = useImages({ sort });

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-neutral-900 dark:text-white">Explore</h1>
          <p className="mt-2 text-neutral-500 dark:text-neutral-400">
            Browse our entire collection of free stock images
          </p>
        </div>

        <div className="mb-8">
          <SortBar active={sort} onChange={setSort} />
        </div>

        <MasonryGrid images={images} loading={loading && images.length === 0} />
        <InfiniteScrollTrigger hasMore={hasMore} loading={loading} onLoadMore={loadMore} />

        {!loading && images.length === 0 && (
          <div className="text-center py-20">
            <p className="text-neutral-400 dark:text-neutral-500">No images found.</p>
          </div>
        )}
      </div>
      <ScrollToTop />
    </div>
  );
}
