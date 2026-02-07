import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Download, Eye, User } from 'lucide-react';
import type { Image } from '../../types';

interface ImageCardProps {
  image: Image;
}

export default function ImageCard({ image }: ImageCardProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="masonry-item group">
      <Link to={`/image/${image.id}`} className="block relative overflow-hidden rounded-xl">
        <div
          className="relative"
          style={{ paddingBottom: `${(image.height / image.width) * 100}%` }}
        >
          {!loaded && (
            <div className="absolute inset-0 skeleton" />
          )}
          <img
            src={image.thumbnail_url || image.url}
            alt={image.title}
            loading="lazy"
            onLoad={() => setLoaded(true)}
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${
              loaded ? 'opacity-100' : 'opacity-0'
            }`}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
            <h3 className="text-white text-sm font-medium truncate">{image.title}</h3>
            <div className="flex items-center gap-3 mt-1.5">
              <span className="flex items-center gap-1 text-white/70 text-xs">
                <User className="w-3 h-3" />
                {image.photographer_name}
              </span>
            </div>
          </div>

          <div className="absolute top-3 right-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="flex items-center gap-1 text-white/80 text-xs bg-black/30 backdrop-blur-sm px-2 py-1 rounded-full">
              <Eye className="w-3 h-3" />
              {image.view_count.toLocaleString()}
            </span>
            <span className="flex items-center gap-1 text-white/80 text-xs bg-black/30 backdrop-blur-sm px-2 py-1 rounded-full">
              <Download className="w-3 h-3" />
              {image.download_count.toLocaleString()}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}
