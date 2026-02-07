import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import type { Category } from '../../types';

interface CategoryCardProps {
  category: Category;
  large?: boolean;
}

export default function CategoryCard({ category, large }: CategoryCardProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <Link
      to={`/category/${category.slug}`}
      className={`group relative block overflow-hidden rounded-2xl ${
        large ? 'aspect-[4/3]' : 'aspect-[3/2]'
      }`}
    >
      {!loaded && <div className="absolute inset-0 skeleton" />}
      <img
        src={category.cover_image_url}
        alt={category.name}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-all duration-300 group-hover:from-black/80" />
      <div className="absolute bottom-0 left-0 right-0 p-5 flex items-end justify-between">
        <div>
          <h3 className="text-white font-semibold text-lg">{category.name}</h3>
          {category.image_count !== undefined && (
            <p className="text-white/60 text-sm mt-0.5">
              {category.image_count} {category.image_count === 1 ? 'image' : 'images'}
            </p>
          )}
        </div>
        <div className="p-2 rounded-full bg-white/10 backdrop-blur-sm text-white opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300">
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </Link>
  );
}
