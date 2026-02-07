import { useSearchParams } from 'react-router-dom';
import { SearchX } from 'lucide-react';
import MasonryGrid from '../components/ui/MasonryGrid';
import InfiniteScrollTrigger from '../components/ui/InfiniteScrollTrigger';
import SearchBar from '../components/ui/SearchBar';
import ScrollToTop from '../components/ui/ScrollToTop';
import { useSearch } from '../hooks/useSearch';

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const { images, loading, hasMore, loadMore } = useSearch(query);

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          {query ? (
            <>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-1">Search results for</p>
              <h1 className="text-4xl font-bold text-neutral-900 dark:text-white">"{query}"</h1>
              {!loading && (
                <p className="mt-2 text-neutral-500 dark:text-neutral-400">
                  {images.length} {images.length === 1 ? 'image' : 'images'} found
                </p>
              )}
            </>
          ) : (
            <>
              <h1 className="text-4xl font-bold text-neutral-900 dark:text-white">Search</h1>
              <p className="mt-2 text-neutral-500 dark:text-neutral-400">
                Find the perfect image for your project
              </p>
            </>
          )}
        </div>

        <div className="mb-10 max-w-2xl">
          <SearchBar placeholder="Search free images..." />
        </div>

        {images.length > 0 ? (
          <>
            <MasonryGrid images={images} loading={loading && images.length === 0} />
            <InfiniteScrollTrigger hasMore={hasMore} loading={loading} onLoadMore={loadMore} />
          </>
        ) : !loading && query ? (
          <div className="text-center py-20">
            <SearchX className="w-12 h-12 text-neutral-300 dark:text-neutral-600 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">No results found</h2>
            <p className="mt-2 text-neutral-500 dark:text-neutral-400 max-w-sm mx-auto">
              Try searching with different keywords or browse our categories instead.
            </p>
          </div>
        ) : null}
      </div>
      <ScrollToTop />
    </div>
  );
}
