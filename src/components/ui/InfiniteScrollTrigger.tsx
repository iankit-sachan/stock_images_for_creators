import { useEffect } from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { Loader2 } from 'lucide-react';

interface InfiniteScrollTriggerProps {
  hasMore: boolean;
  loading: boolean;
  onLoadMore: () => void;
}

export default function InfiniteScrollTrigger({ hasMore, loading, onLoadMore }: InfiniteScrollTriggerProps) {
  const { ref, isIntersecting } = useIntersectionObserver();

  useEffect(() => {
    if (isIntersecting && hasMore && !loading) {
      onLoadMore();
    }
  }, [isIntersecting, hasMore, loading, onLoadMore]);

  if (!hasMore) return null;

  return (
    <div ref={ref} className="flex justify-center py-12">
      {loading && (
        <Loader2 className="w-6 h-6 text-neutral-400 animate-spin" />
      )}
    </div>
  );
}
