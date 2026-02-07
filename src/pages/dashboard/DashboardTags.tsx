import { useState, useEffect, useCallback } from 'react';
import { Plus, Pencil, Trash2, Search } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import Modal from '../../components/dashboard/Modal';
import DeleteConfirm from '../../components/dashboard/DeleteConfirm';
import Pagination from '../../components/dashboard/Pagination';
import type { Tag } from '../../types';

interface TagWithCount extends Tag {
  image_count: number;
}

interface FormData {
  name: string;
  slug: string;
}

const PER_PAGE = 20;
const emptyForm: FormData = { name: '', slug: '' };

export default function DashboardTags() {
  const [tags, setTags] = useState<TagWithCount[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [formOpen, setFormOpen] = useState(false);
  const [editTag, setEditTag] = useState<Tag | null>(null);
  const [deleteTag, setDeleteTag] = useState<Tag | null>(null);
  const [form, setForm] = useState<FormData>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState('');

  const fetchTags = useCallback(async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('tags')
        .select('*', { count: 'exact' })
        .order('name', { ascending: true });

      if (search.trim()) {
        query = query.ilike('name', `%${search.trim()}%`);
      }

      const { data, count } = await query.range(page * PER_PAGE, (page + 1) * PER_PAGE - 1);

      if (data) {
        const withCounts = await Promise.all(
          data.map(async (tag) => {
            const { count: imgCount } = await supabase
              .from('image_tags')
              .select('*', { count: 'exact', head: true })
              .eq('tag_id', tag.id);
            return { ...tag, image_count: imgCount || 0 };
          })
        );
        setTags(withCounts);
      }
      setTotalCount(count || 0);
    } catch (err) {
      console.error('Error fetching tags:', err);
    } finally {
      setLoading(false);
    }
  }, [page, search]);

  useEffect(() => {
    fetchTags();
  }, [fetchTags]);

  useEffect(() => {
    setPage(0);
  }, [search]);

  const generateSlug = (name: string) => {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  };

  const openCreate = () => {
    setEditTag(null);
    setForm(emptyForm);
    setError('');
    setFormOpen(true);
  };

  const openEdit = (tag: Tag) => {
    setEditTag(tag);
    setForm({ name: tag.name, slug: tag.slug });
    setError('');
    setFormOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSaving(true);

    try {
      if (!form.name.trim() || !form.slug.trim()) {
        setError('Name and slug are required.');
        setSaving(false);
        return;
      }

      const tagData = {
        name: form.name.trim(),
        slug: form.slug.trim(),
      };

      if (editTag) {
        const { error: updateError } = await supabase
          .from('tags')
          .update(tagData)
          .eq('id', editTag.id);
        if (updateError) throw updateError;
      } else {
        const { error: insertError } = await supabase
          .from('tags')
          .insert(tagData);
        if (insertError) throw insertError;
      }

      setFormOpen(false);
      setEditTag(null);
      fetchTags();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to save tag.';
      setError(message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTag) return;
    setDeleting(true);
    try {
      await supabase.from('image_tags').delete().eq('tag_id', deleteTag.id);
      await supabase.from('tags').delete().eq('id', deleteTag.id);
      setDeleteTag(null);
      fetchTags();
    } catch (err) {
      console.error('Error deleting tag:', err);
    } finally {
      setDeleting(false);
    }
  };

  const totalPages = Math.ceil(totalCount / PER_PAGE);

  const inputClass = 'w-full px-3 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-accent-500/40 focus:border-accent-500 transition-colors';
  const labelClass = 'block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5';

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tags..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-accent-500/40 transition-colors"
          />
        </div>
        <button
          onClick={openCreate}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-accent-600 text-white text-sm font-medium hover:bg-accent-700 transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" /> Add Tag
        </button>
      </div>

      <div className="bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-100 dark:border-neutral-800">
                <th className="text-left px-5 py-3 font-medium text-neutral-500 dark:text-neutral-400">Name</th>
                <th className="text-left px-5 py-3 font-medium text-neutral-500 dark:text-neutral-400 hidden sm:table-cell">Slug</th>
                <th className="text-left px-5 py-3 font-medium text-neutral-500 dark:text-neutral-400">Images</th>
                <th className="text-right px-5 py-3 font-medium text-neutral-500 dark:text-neutral-400">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
              {loading ? (
                Array.from({ length: 6 }).map((_, i) => (
                  <tr key={i}>
                    <td colSpan={4} className="px-5 py-4"><div className="skeleton h-8 rounded-lg" /></td>
                  </tr>
                ))
              ) : tags.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-5 py-12 text-center text-neutral-400">
                    {search ? 'No tags match your search.' : 'No tags yet. Add your first one!'}
                  </td>
                </tr>
              ) : (
                tags.map((tag) => (
                  <tr key={tag.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
                    <td className="px-5 py-3">
                      <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
                        {tag.name}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-neutral-500 dark:text-neutral-400 hidden sm:table-cell font-mono text-xs">
                      {tag.slug}
                    </td>
                    <td className="px-5 py-3 text-neutral-500 dark:text-neutral-400">
                      {tag.image_count}
                    </td>
                    <td className="px-5 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => openEdit(tag)}
                          className="p-2 rounded-lg text-neutral-400 hover:text-accent-600 hover:bg-accent-50 dark:hover:bg-accent-900/20 transition-colors"
                          aria-label="Edit"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteTag(tag)}
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

      <Modal
        open={formOpen}
        onClose={() => { setFormOpen(false); setEditTag(null); }}
        title={editTag ? 'Edit Tag' : 'Add New Tag'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="px-4 py-3 rounded-xl bg-red-50 dark:bg-red-900/20 text-sm text-red-700 dark:text-red-400 border border-red-100 dark:border-red-900/30">
              {error}
            </div>
          )}

          <div>
            <label className={labelClass}>Name *</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({
                name: e.target.value,
                slug: editTag ? form.slug : generateSlug(e.target.value),
              })}
              className={inputClass}
              placeholder="Tag name"
            />
          </div>

          <div>
            <label className={labelClass}>Slug *</label>
            <input
              type="text"
              value={form.slug}
              onChange={(e) => setForm({ ...form, slug: e.target.value })}
              className={inputClass}
              placeholder="tag-slug"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={() => { setFormOpen(false); setEditTag(null); }}
              disabled={saving}
              className="flex-1 px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 px-4 py-2.5 rounded-xl bg-accent-600 text-white text-sm font-medium hover:bg-accent-700 transition-colors disabled:opacity-50"
            >
              {saving ? 'Saving...' : (editTag ? 'Update' : 'Create')}
            </button>
          </div>
        </form>
      </Modal>

      <DeleteConfirm
        open={!!deleteTag}
        onClose={() => setDeleteTag(null)}
        onConfirm={handleDelete}
        loading={deleting}
        title="Delete Tag"
        message={`Are you sure you want to delete "${deleteTag?.name}"? This will remove it from all associated images.`}
      />
    </div>
  );
}
