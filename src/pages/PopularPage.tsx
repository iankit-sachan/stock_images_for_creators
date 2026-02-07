import MasonryGrid from '../components/ui/MasonryGrid';
import InfiniteScrollTrigger from '../components/ui/InfiniteScrollTrigger';
import ScrollToTop from '../components/ui/ScrollToTop';
import { useImages } from '../hooks/useImages';

export default function PopularPage() {
  const { images, loading, hasMore, loadMore } = useImages({ sort: 'popular' });

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-neutral-900 dark:text-white">Popular</h1>
          <p className="mt-2 text-neutral-500 dark:text-neutral-400">
            Most downloaded images by our community
          </p>
        </div>

        <MasonryGrid images={images} loading={loading && images.length === 0} />
        <InfiniteScrollTrigger hasMore={hasMore} loading={loading} onLoadMore={loadMore} />
      </div>
      <ScrollToTop />
    </div>
  );
}
