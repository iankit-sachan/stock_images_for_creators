import { useState, useEffect, useCallback } from 'react';
import { Plus, Pencil, Trash2, Search, Star, Sparkles } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import Modal from '../../components/dashboard/Modal';
import DeleteConfirm from '../../components/dashboard/DeleteConfirm';
import ImageForm from '../../components/dashboard/ImageForm';
import Pagination from '../../components/dashboard/Pagination';
import type { Image } from '../../types';

const PER_PAGE = 12;

export default function DashboardImages() {
  const [images, setImages] = useState<Image[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [createOpen, setCreateOpen] = useState(false);
  const [editImage, setEditImage] = useState<Image | null>(null);
  const [deleteImage, setDeleteImage] = useState<Image | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchImages = useCallback(async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('images')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false });

      if (search.trim()) {
        query = query.or(`title.ilike.%${search.trim()}%,photographer_name.ilike.%${search.trim()}%`);
      }

      const { data, count } = await query.range(page * PER_PAGE, (page + 1) * PER_PAGE - 1);
      setImages(data || []);
      setTotalCount(count || 0);
    } catch (err) {
      console.error('Error fetching images:', err);
    } finally {
      setLoading(false);
    }
  }, [page, search]);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  useEffect(() => {
    setPage(0);
  }, [search]);

  const handleDelete = async () => {
    if (!deleteImage) return;
    setDeleting(true);
    try {
      await supabase.from('image_tags').delete().eq('image_id', deleteImage.id);
      await supabase.from('image_categories').delete().eq('image_id', deleteImage.id);
      await supabase.from('images').delete().eq('id', deleteImage.id);
      setDeleteImage(null);
      fetchImages();
    } catch (err) {
      console.error('Error deleting image:', err);
    } finally {
      setDeleting(false);
    }
  };

  const handleSaved = () => {
    setCreateOpen(false);
    setEditImage(null);
    fetchImages();
  };

  const totalPages = Math.ceil(totalCount / PER_PAGE);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search images..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-accent-500/40 transition-colors"
          />
        </div>
        <button
          onClick={() => setCreateOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-accent-600 text-white text-sm font-medium hover:bg-accent-700 transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" /> Add Image
        </button>
      </div>

      <div className="bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-100 dark:border-neutral-800">
                <th className="text-left px-5 py-3 font-medium text-neutral-500 dark:text-neutral-400">Image</th>
                <th className="text-left px-5 py-3 font-medium text-neutral-500 dark:text-neutral-400">Title</th>
                <th className="text-left px-5 py-3 font-medium text-neutral-500 dark:text-neutral-400 hidden md:table-cell">Photographer</th>
                <th className="text-left px-5 py-3 font-medium text-neutral-500 dark:text-neutral-400 hidden lg:table-cell">Size</th>
                <th className="text-left px-5 py-3 font-medium text-neutral-500 dark:text-neutral-400 hidden sm:table-cell">Stats</th>
                <th className="text-left px-5 py-3 font-medium text-neutral-500 dark:text-neutral-400">Flags</th>
                <th className="text-right px-5 py-3 font-medium text-neutral-500 dark:text-neutral-400">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
              {loading && images.length === 0 ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i}>
                    <td colSpan={7} className="px-5 py-4"><div className="skeleton h-10 rounded-lg" /></td>
                  </tr>
                ))
              ) : images.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-5 py-12 text-center text-neutral-400">
                    {search ? 'No images match your search.' : 'No images yet. Add your first one!'}
                  </td>
                </tr>
              ) : (
                images.map((img) => (
                  <tr key={img.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
                    <td className="px-5 py-3">
                      <img src={img.thumbnail_url} alt={img.title} className="w-12 h-12 rounded-lg object-cover" />
                    </td>
                    <td className="px-5 py-3">
                      <p className="font-medium text-neutral-900 dark:text-white truncate max-w-[200px]">{img.title}</p>
                    </td>
                    <td className="px-5 py-3 text-neutral-500 dark:text-neutral-400 hidden md:table-cell">
                      {img.photographer_name}
                    </td>
                    <td className="px-5 py-3 text-neutral-500 dark:text-neutral-400 hidden lg:table-cell">
                      {img.width}x{img.height}
                    </td>
                    <td className="px-5 py-3 hidden sm:table-cell">
                      <div className="text-xs text-neutral-500 dark:text-neutral-400 space-y-0.5">
                        <div>{img.download_count.toLocaleString()} downloads</div>
                        <div>{img.view_count.toLocaleString()} views</div>
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-1.5">
                        {img.featured && <Star className="w-4 h-4 text-amber-500" fill="currentColor" />}
                        {img.is_ai_generated && <Sparkles className="w-4 h-4 text-blue-500" />}
                      </div>
                    </td>
                    <td className="px-5 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => setEditImage(img)}
                          className="p-2 rounded-lg text-neutral-400 hover:text-accent-600 hover:bg-accent-50 dark:hover:bg-accent-900/20 transition-colors"
                          aria-label="Edit"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteImage(img)}
                          className="p-2 rounded-lg text-neutral-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                          aria-label="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="px-5 py-3">
          <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
        </div>
      </div>

      <Modal open={createOpen} onClose={() => setCreateOpen(false)} title="Add New Image" wide>
        <ImageForm onSave={handleSaved} onCancel={() => setCreateOpen(false)} />
      </Modal>

      <Modal open={!!editImage} onClose={() => setEditImage(null)} title="Edit Image" wide>
        {editImage && <ImageForm image={editImage} onSave={handleSaved} onCancel={() => setEditImage(null)} />}
      </Modal>

      <DeleteConfirm
        open={!!deleteImage}
        onClose={() => setDeleteImage(null)}
        onConfirm={handleDelete}
        loading={deleting}
        title="Delete Image"
        message={`Are you sure you want to delete "${deleteImage?.title}"? This will also remove all category and tag associations.`}
      />
    </div>
  );
}
