import { useState, useEffect, useCallback } from 'react';
import { Plus, Pencil, Trash2, GripVertical } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import Modal from '../../components/dashboard/Modal';
import DeleteConfirm from '../../components/dashboard/DeleteConfirm';
import type { Category } from '../../types';

interface FormData {
  name: string;
  slug: string;
  description: string;
  cover_image_url: string;
  display_order: number;
}

const emptyForm: FormData = {
  name: '',
  slug: '',
  description: '',
  cover_image_url: '',
  display_order: 0,
};

export default function DashboardCategories() {
  const [categories, setCategories] = useState<(Category & { image_count: number })[]>([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editCategory, setEditCategory] = useState<Category | null>(null);
  const [deleteCategory, setDeleteCategory] = useState<Category | null>(null);
  const [form, setForm] = useState<FormData>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState('');

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    try {
      const { data: cats } = await supabase
        .from('categories')
        .select('*')
        .order('display_order', { ascending: true });

      if (cats) {
        const withCounts = await Promise.all(
          cats.map(async (cat) => {
            const { count } = await supabase
              .from('image_categories')
              .select('*', { count: 'exact', head: true })
              .eq('category_id', cat.id);
            return { ...cat, image_count: count || 0 };
          })
        );
        setCategories(withCounts);
      }
    } catch (err) {
      console.error('Error fetching categories:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const openCreate = () => {
    setEditCategory(null);
    setForm({ ...emptyForm, display_order: categories.length + 1 });
    setError('');
    setFormOpen(true);
  };

  const openEdit = (cat: Category) => {
    setEditCategory(cat);
    setForm({
      name: cat.name,
      slug: cat.slug,
      description: cat.description || '',
      cover_image_url: cat.cover_image_url || '',
      display_order: cat.display_order,
    });
    setError('');
    setFormOpen(true);
  };

  const generateSlug = (name: string) => {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  };

  const handleNameChange = (name: string) => {
    setForm((prev) => ({
      ...prev,
      name,
      slug: editCategory ? prev.slug : generateSlug(name),
    }));
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

      const catData = {
        name: form.name.trim(),
        slug: form.slug.trim(),
        description: form.description.trim(),
        cover_image_url: form.cover_image_url.trim(),
        display_order: form.display_order,
      };

      if (editCategory) {
        const { error: updateError } = await supabase
          .from('categories')
          .update(catData)
          .eq('id', editCategory.id);
        if (updateError) throw updateError;
      } else {
        const { error: insertError } = await supabase
          .from('categories')
          .insert(catData);
        if (insertError) throw insertError;
      }

      setFormOpen(false);
      setEditCategory(null);
      fetchCategories();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to save category.';
      setError(message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteCategory) return;
    setDeleting(true);
    try {
      await supabase.from('image_categories').delete().eq('category_id', deleteCategory.id);
      await supabase.from('categories').delete().eq('id', deleteCategory.id);
      setDeleteCategory(null);
      fetchCategories();
    } catch (err) {
      console.error('Error deleting category:', err);
    } finally {
      setDeleting(false);
    }
  };

  const inputClass = 'w-full px-3 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-accent-500/40 focus:border-accent-500 transition-colors';
  const labelClass = 'block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5';

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-end">
        <button
          onClick={openCreate}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-accent-600 text-white text-sm font-medium hover:bg-accent-700 transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Category
        </button>
      </div>

      <div className="bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-100 dark:border-neutral-800">
                <th className="w-10 px-3 py-3" />
                <th className="text-left px-5 py-3 font-medium text-neutral-500 dark:text-neutral-400">Cover</th>
                <th className="text-left px-5 py-3 font-medium text-neutral-500 dark:text-neutral-400">Name</th>
                <th className="text-left px-5 py-3 font-medium text-neutral-500 dark:text-neutral-400 hidden md:table-cell">Slug</th>
                <th className="text-left px-5 py-3 font-medium text-neutral-500 dark:text-neutral-400 hidden lg:table-cell">Description</th>
                <th className="text-left px-5 py-3 font-medium text-neutral-500 dark:text-neutral-400">Images</th>
                <th className="text-right px-5 py-3 font-medium text-neutral-500 dark:text-neutral-400">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
              {loading ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <tr key={i}>
                    <td colSpan={7} className="px-5 py-4"><div className="skeleton h-10 rounded-lg" /></td>
                  </tr>
                ))
              ) : categories.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-5 py-12 text-center text-neutral-400">
                    No categories yet. Add your first one!
                  </td>
                </tr>
              ) : (
                categories.map((cat) => (
                  <tr key={cat.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
                    <td className="px-3 py-3 text-center">
                      <GripVertical className="w-4 h-4 text-neutral-300 dark:text-neutral-600 mx-auto" />
                    </td>
                    <td className="px-5 py-3">
                      {cat.cover_image_url ? (
                        <img src={cat.cover_image_url} alt={cat.name} className="w-12 h-12 rounded-lg object-cover" />
                      ) : (
                        <div className="w-12 h-12 rounded-lg bg-neutral-100 dark:bg-neutral-800" />
                      )}
                    </td>
                    <td className="px-5 py-3 font-medium text-neutral-900 dark:text-white">
                      {cat.name}
                    </td>
                    <td className="px-5 py-3 text-neutral-500 dark:text-neutral-400 hidden md:table-cell font-mono text-xs">
                      {cat.slug}
                    </td>
                    <td className="px-5 py-3 text-neutral-500 dark:text-neutral-400 hidden lg:table-cell">
                      <p className="truncate max-w-[250px]">{cat.description}</p>
                    </td>
                    <td className="px-5 py-3">
                      <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">
                        {cat.image_count}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => openEdit(cat)}
                          className="p-2 rounded-lg text-neutral-400 hover:text-accent-600 hover:bg-accent-50 dark:hover:bg-accent-900/20 transition-colors"
                          aria-label="Edit"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteCategory(cat)}
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
      </div>

      <Modal
        open={formOpen}
        onClose={() => { setFormOpen(false); setEditCategory(null); }}
        title={editCategory ? 'Edit Category' : 'Add New Category'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="px-4 py-3 rounded-xl bg-red-50 dark:bg-red-900/20 text-sm text-red-700 dark:text-red-400 border border-red-100 dark:border-red-900/30">
              {error}
            </div>
          )}

          <div>
            <label className={labelClass}>Name *</label>
            <input type="text" value={form.name} onChange={(e) => handleNameChange(e.target.value)} className={inputClass} placeholder="Category name" />
          </div>

          <div>
            <label className={labelClass}>Slug *</label>
            <input type="text" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} className={inputClass} placeholder="category-slug" />
          </div>

          <div>
            <label className={labelClass}>Description</label>
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={2} className={inputClass} placeholder="Brief description" />
          </div>

          <div>
            <label className={labelClass}>Cover Image URL</label>
            <input type="url" value={form.cover_image_url} onChange={(e) => setForm({ ...form, cover_image_url: e.target.value })} className={inputClass} placeholder="https://..." />
          </div>

          <div>
            <label className={labelClass}>Display Order</label>
            <input type="number" value={form.display_order} onChange={(e) => setForm({ ...form, display_order: parseInt(e.target.value) || 0 })} className={inputClass} />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={() => { setFormOpen(false); setEditCategory(null); }}
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
              {saving ? 'Saving...' : (editCategory ? 'Update' : 'Create')}
            </button>
          </div>
        </form>
      </Modal>

      <DeleteConfirm
        open={!!deleteCategory}
        onClose={() => setDeleteCategory(null)}
        onConfirm={handleDelete}
        loading={deleting}
        title="Delete Category"
        message={`Are you sure you want to delete "${deleteCategory?.name}"? Images won't be deleted, only the category association.`}
      />
    </div>
  );
}
