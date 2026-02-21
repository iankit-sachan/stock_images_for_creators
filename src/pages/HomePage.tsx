import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Download, Image as ImageIcon, Layers } from 'lucide-react';
import SearchBar from '../components/ui/SearchBar';
import MasonryGrid from '../components/ui/MasonryGrid';
import CategoryCard from '../components/ui/CategoryCard';
import EmptyState from '../components/ui/EmptyState';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { useImages } from '../hooks/useImages';
import { useCategories } from '../hooks/useCategories';
import { useStats } from '../hooks/useStats';
import { HERO_IMAGES } from '../lib/constants';

export default function HomePage() {
  const [heroIndex, setHeroIndex] = useState(0);
  const { images: featuredImages, loading: featuredLoading } = useImages({ featured: true, limit: 12 });
  const { images: recentImages, loading: recentLoading } = useImages({ sort: 'newest', limit: 12 });
  const { categories, loading: categoriesLoading, error: categoriesError } = useCategories();
  const { stats, loading: statsLoading } = useStats();

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  if (categoriesError) {
    return (
      <div className="pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <EmptyState
            icon={<ImageIcon className="w-8 h-8 text-neutral-400" />}
            title="Unable to load content"
            description="There was an error loading the homepage content. Please check your connection and try again."
            action={
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-xl font-medium hover:opacity-90 transition-opacity"
              >
                Retry
              </button>
            }
          />
        </div>
      </div>
    );
  }
  return (
    <div>
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        {HERO_IMAGES.map((src, i) => (
          <div
            key={src}
            className={`absolute inset-0 transition-opacity duration-[2000ms] ${
              i === heroIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={src}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/70" />

        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight animate-fade-in-up">
            Free premium stock images for creators, designers, and builders.
          </h1>
          <p className="mt-5 text-lg text-white/70 max-w-xl mx-auto animate-fade-in-up animation-delay-200" style={{ animationFillMode: 'both' }}>
            Thousands of high-quality images, completely free. No sign-up, no payment, no limits.
          </p>
          <div className="mt-8 animate-fade-in-up animation-delay-400" style={{ animationFillMode: 'both' }}>
            <SearchBar large />
          </div>
          <div className="mt-6 flex items-center justify-center gap-6 text-white/50 text-sm animate-fade-in animation-delay-500" style={{ animationFillMode: 'both' }}>
            <span className="flex items-center gap-1.5">
              <ImageIcon className="w-4 h-4" /> Trending: landscape
            </span>
            <span className="flex items-center gap-1.5">
              <Layers className="w-4 h-4" /> nature, business, people
            </span>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white dark:from-neutral-950 to-transparent" />
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold text-neutral-900 dark:text-white">Featured</h2>
            <p className="mt-2 text-neutral-500 dark:text-neutral-400">Hand-picked images from our collection</p>
          </div>
          <Link
            to="/explore"
            className="hidden sm:flex items-center gap-2 text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
          >
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <MasonryGrid images={featuredImages} loading={featuredLoading} />
      </section>

      <section className="bg-neutral-50 dark:bg-neutral-925 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-neutral-900 dark:text-white">Browse Categories</h2>
              <p className="mt-2 text-neutral-500 dark:text-neutral-400">Explore images organized by theme</p>
            </div>
            <Link
              to="/categories"
              className="hidden sm:flex items-center gap-2 text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
            >
              All categories <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {categoriesLoading ? (
              Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="skeleton aspect-[3/2] rounded-2xl" />
              ))
            ) : (
              categories.slice(0, 8).map((cat) => (
                <CategoryCard key={cat.id} category={cat} />
              ))
            )}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold text-neutral-900 dark:text-white">Recently Added</h2>
            <p className="mt-2 text-neutral-500 dark:text-neutral-400">Fresh images added to the collection</p>
          </div>
          <Link
            to="/explore"
            className="hidden sm:flex items-center gap-2 text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
          >
            Explore more <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <MasonryGrid images={recentImages} loading={recentLoading} />
      </section>

      <section className="bg-neutral-50 dark:bg-neutral-925 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-8">
              <div className="inline-flex p-3 rounded-2xl bg-accent-50 dark:bg-accent-900/20 mb-4">
                <ImageIcon className="w-6 h-6 text-accent-600 dark:text-accent-400" />
              </div>
              <div className="text-3xl font-bold text-neutral-900 dark:text-white">
                {statsLoading ? <LoadingSpinner size="sm" /> : `${stats.imageCount.toLocaleString()}+`}
              </div>
              <div className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">Free Images</div>
            </div>

            <div className="p-8">
              <div className="inline-flex p-3 rounded-2xl bg-accent-50 dark:bg-accent-900/20 mb-4">
                <Layers className="w-6 h-6 text-accent-600 dark:text-accent-400" />
              </div>
              <div className="text-3xl font-bold text-neutral-900 dark:text-white">
                {statsLoading ? <LoadingSpinner size="sm" /> : stats.categoryCount}
              </div>
              <div className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">Categories</div>
            </div>

            <div className="p-8">
              <div className="inline-flex p-3 rounded-2xl bg-accent-50 dark:bg-accent-900/20 mb-4">
                <Download className="w-6 h-6 text-accent-600 dark:text-accent-400" />
              </div>
              <div className="text-3xl font-bold text-neutral-900 dark:text-white">
                {statsLoading ? <LoadingSpinner size="sm" /> : `${(stats.downloadCount / 1000).toFixed(1)}K+`}
              </div>
              <div className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">Downloads</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
