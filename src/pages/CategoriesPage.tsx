import CategoryCard from '../components/ui/CategoryCard';
import { useCategories } from '../hooks/useCategories';

export default function CategoriesPage() {
  const { categories, loading } = useCategories();

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-neutral-900 dark:text-white">Categories</h1>
          <p className="mt-2 text-neutral-500 dark:text-neutral-400">
            Browse images organized by theme and subject
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="skeleton aspect-[3/2] rounded-2xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {categories.map((cat) => (
              <CategoryCard key={cat.id} category={cat} large />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
