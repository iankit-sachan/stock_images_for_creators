import type { Image } from '../../types';
import ImageCard from './ImageCard';
import ImageSkeleton from './ImageSkeleton';

interface MasonryGridProps {
  images: Image[];
  loading?: boolean;
}

export default function MasonryGrid({ images, loading }: MasonryGridProps) {
  return (
    <div className="masonry-grid">
      {images.map((image) => (
        <ImageCard key={image.id} image={image} />
      ))}
      {loading &&
        Array.from({ length: 6 }).map((_, i) => (
          <ImageSkeleton key={`skeleton-${i}`} index={i} />
        ))}
    </div>
  );
}
