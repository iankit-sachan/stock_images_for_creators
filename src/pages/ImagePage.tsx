import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Download, ChevronRight, ArrowLeft, Calendar,
  Eye, Monitor, User, Sparkles, ExternalLink
} from 'lucide-react';
import MasonryGrid from '../components/ui/MasonryGrid';
import { useImage } from '../hooks/useImage';
import { supabase } from '../lib/supabase';

export default function ImagePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { image, relatedImages, loading } = useImage(id);
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    if (!image) return;
    setDownloading(true);
    try {
      await supabase.rpc('increment_download_count', { image_id: image.id });
      window.open(image.url, '_blank');
    } finally {
      setDownloading(false);
    }
  };

  if (loading) {
    return (
      <div className="pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="skeleton w-full aspect-video rounded-2xl mb-8" />
          <div className="skeleton w-1/3 h-8 rounded-lg mb-4" />
          <div className="skeleton w-2/3 h-5 rounded-lg" />
        </div>
      </div>
    );
  }

  if (!image) {
    return (
      <div className="pt-24 pb-20 text-center">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">Image not found</h1>
          <p className="mt-2 text-neutral-500">The image you're looking for doesn't exist.</p>
          <Link to="/explore" className="inline-block mt-6 px-6 py-3 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-xl font-medium hover:opacity-90 transition-opacity">
            Browse Images
          </Link>
        </div>
      </div>
    );
  }

  const formattedDate = new Date(image.created_at).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });

  return (
    <div className="pt-20 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors text-neutral-600 dark:text-neutral-400"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <nav className="flex items-center gap-1.5 text-sm text-neutral-500">
            <Link to="/" className="hover:text-neutral-900 dark:hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            {image.categories.length > 0 && (
              <>
                <Link
                  to={`/category/${image.categories[0].slug}`}
                  className="hover:text-neutral-900 dark:hover:text-white transition-colors"
                >
                  {image.categories[0].name}
                </Link>
                <ChevronRight className="w-3.5 h-3.5" />
              </>
            )}
            <span className="text-neutral-900 dark:text-white truncate max-w-[200px]">{image.title}</span>
          </nav>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="relative rounded-2xl overflow-hidden bg-neutral-100 dark:bg-neutral-800">
              <img
                src={image.url}
                alt={image.title}
                className="w-full h-auto"
              />
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">{image.title}</h1>
              {image.description && (
                <p className="mt-2 text-neutral-500 dark:text-neutral-400 leading-relaxed">{image.description}</p>
              )}
            </div>

            <button
              onClick={handleDownload}
              disabled={downloading}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-accent-600 hover:bg-accent-700 text-white rounded-xl font-semibold text-lg transition-all hover:shadow-lg hover:shadow-accent-600/25 disabled:opacity-50"
            >
              <Download className="w-5 h-5" />
              {downloading ? 'Opening...' : 'Download Free'}
            </button>

            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800">
                  <User className="w-4 h-4 text-neutral-500" />
                </div>
                <div>
                  <p className="text-xs text-neutral-400">Photographer</p>
                  <div className="flex items-center gap-1.5">
                    <p className="text-sm font-medium text-neutral-900 dark:text-white">{image.photographer_name}</p>
                    {image.is_ai_generated && (
                      <span className="flex items-center gap-1 text-xs bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 px-2 py-0.5 rounded-full">
                        <Sparkles className="w-3 h-3" /> AI
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800">
                  <Monitor className="w-4 h-4 text-neutral-500" />
                </div>
                <div>
                  <p className="text-xs text-neutral-400">Resolution</p>
                  <p className="text-sm font-medium text-neutral-900 dark:text-white">{image.width} x {image.height}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800">
                  <Calendar className="w-4 h-4 text-neutral-500" />
                </div>
                <div>
                  <p className="text-xs text-neutral-400">Published</p>
                  <p className="text-sm font-medium text-neutral-900 dark:text-white">{formattedDate}</p>
                </div>
              </div>

              <div className="flex gap-6 pt-2">
                <div className="flex items-center gap-1.5 text-sm text-neutral-500">
                  <Eye className="w-4 h-4" />
                  {image.view_count.toLocaleString()} views
                </div>
                <div className="flex items-center gap-1.5 text-sm text-neutral-500">
                  <Download className="w-4 h-4" />
                  {image.download_count.toLocaleString()} downloads
                </div>
              </div>

              {image.photographer_url && (
                <a
                  href={image.photographer_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> View photographer profile
                </a>
              )}
            </div>

            {image.tags.length > 0 && (
              <div className="pt-2">
                <h3 className="text-sm font-medium text-neutral-900 dark:text-white mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {image.tags.map((tag) => (
                    <Link
                      key={tag.id}
                      to={`/search?q=${encodeURIComponent(tag.name)}`}
                      className="px-3 py-1.5 text-xs font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
                    >
                      {tag.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {relatedImages.length > 0 && (
          <section className="mt-20">
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-8">Related Images</h2>
            <MasonryGrid images={relatedImages} />
          </section>
        )}
      </div>
    </div>
  );
}
