interface ImageSkeletonProps {
  index: number;
}

const heights = [240, 320, 280, 360, 300, 260];

export default function ImageSkeleton({ index }: ImageSkeletonProps) {
  return (
    <div className="masonry-item">
      <div
        className="skeleton w-full rounded-xl"
        style={{ height: heights[index % heights.length] }}
      />
    </div>
  );
}
