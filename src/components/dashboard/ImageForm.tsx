import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import type { Image, Category, Tag } from '../../types';

interface ImageFormProps {
  image?: Image | null;
  onSave: () => void;
  onCancel: () => void;
}

interface FormData {
  title: string;
  description: string;
  url: string;
  thumbnail_url: string;
  width: number;
  height: number;
  photographer_name: string;
  photographer_url: string;
  is_ai_generated: boolean;
  featured: boolean;
  categoryIds: string[];
  tagIds: string[];
}

const emptyForm: FormData = {
  title: '',
  description: '',
  url: '',
  thumbnail_url: '',
  width: 0,
  height: 0,
  photographer_name: '',
  photographer_url: '',
  is_ai_generated: false,
  featured: false,
  categoryIds: [],
  tagIds: [],
};

export default function ImageForm({ image, onSave, onCancel }: ImageFormProps) {
  const [form, setForm] = useState<FormData>(emptyForm);
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    Promise.all([
      supabase.from('categories').select('*').order('display_order'),
      supabase.from('tags').select('*').order('name'),
    ]).then(([{ data: cats }, { data: tgs }]) => {
      setCategories(cats || []);
      setTags(tgs || []);
    });
  }, []);

  useEffect(() => {
    if (image) {
      setForm({
        title: image.title,
        description: image.description || '',
        url: image.url,
        thumbnail_url: image.thumbnail_url,
        width: image.width,
        height: image.height,
        photographer_name: image.photographer_name,
        photographer_url: image.photographer_url || '',
        is_ai_generated: image.is_ai_generated,
        featured: image.featured,
        categoryIds: [],
        tagIds: [],
      });

      Promise.all([
        supabase.from('image_categories').select('category_id').eq('image_id', image.id),
        supabase.from('image_tags').select('tag_id').eq('image_id', image.id),
      ]).then(([{ data: catLinks }, { data: tagLinks }]) => {
        setForm((prev) => ({
          ...prev,
          categoryIds: catLinks?.map((c) => c.category_id) || [],
          tagIds: tagLinks?.map((t) => t.tag_id) || [],
        }));
      });
    }
  }, [image]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSaving(true);

    try {
      if (!form.title.trim() || !form.url.trim()) {
        setError('Title and URL are required.');
        setSaving(false);
        return;
      }

      const imageData = {
        title: form.title.trim(),
        description: form.description.trim(),
        url: form.url.trim(),
        thumbnail_url: form.thumbnail_url.trim() || form.url.trim(),
        width: form.width || 1920,
        height: form.height || 1080,
        photographer_name: form.photographer_name.trim() || 'Unknown',
        photographer_url: form.photographer_url.trim(),
        is_ai_generated: form.is_ai_generated,
        featured: form.featured,
      };

      let imageId = image?.id;

      if (image) {
        const { error: updateError } = await supabase
          .from('images')
          .update(imageData)
          .eq('id', image.id);
        if (updateError) throw updateError;
      } else {
        const { data: newImage, error: insertError } = await supabase
          .from('images')
          .insert(imageData)
          .select('id')
          .single();
        if (insertError) throw insertError;
        imageId = newImage.id;
      }

      if (imageId) {
        await supabase.from('image_categories').delete().eq('image_id', imageId);
        if (form.categoryIds.length > 0) {
          await supabase.from('image_categories').insert(
            form.categoryIds.map((cid) => ({ image_id: imageId!, category_id: cid }))
          );
        }

        await supabase.from('image_tags').delete().eq('image_id', imageId);
        if (form.tagIds.length > 0) {
          await supabase.from('image_tags').insert(
            form.tagIds.map((tid) => ({ image_id: imageId!, tag_id: tid }))
          );
        }
      }

      onSave();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to save image.';
      setError(message);
    } finally {
      setSaving(false);
    }
  };

  const updateField = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const toggleArrayItem = (key: 'categoryIds' | 'tagIds', id: string) => {
    setForm((prev) => ({
      ...prev,
      [key]: prev[key].includes(id) ? prev[key].filter((v) => v !== id) : [...prev[key], id],
    }));
  };

  const inputClass = 'w-full px-3 py-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-accent-500/40 focus:border-accent-500 transition-colors';
  const labelClass = 'block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5';

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="px-4 py-3 rounded-xl bg-red-50 dark:bg-red-900/20 text-sm text-red-700 dark:text-red-400 border border-red-100 dark:border-red-900/30">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <label className={labelClass}>Title *</label>
          <input type="text" value={form.title} onChange={(e) => updateField('title', e.target.value)} className={inputClass} placeholder="Image title" />
        </div>

        <div className="sm:col-span-2">
          <label className={labelClass}>Description</label>
          <textarea value={form.description} onChange={(e) => updateField('description', e.target.value)} rows={2} className={inputClass} placeholder="Brief description" />
        </div>

        <div className="sm:col-span-2">
          <label className={labelClass}>Image URL *</label>
          <input type="url" value={form.url} onChange={(e) => updateField('url', e.target.value)} className={inputClass} placeholder="https://..." />
        </div>

        <div className="sm:col-span-2">
          <label className={labelClass}>Thumbnail URL</label>
          <input type="url" value={form.thumbnail_url} onChange={(e) => updateField('thumbnail_url', e.target.value)} className={inputClass} placeholder="https://... (optional, uses main URL)" />
        </div>

        <div>
          <label className={labelClass}>Width (px)</label>
          <input type="number" value={form.width || ''} onChange={(e) => updateField('width', parseInt(e.target.value) || 0)} className={inputClass} placeholder="1920" />
        </div>

        <div>
          <label className={labelClass}>Height (px)</label>
          <input type="number" value={form.height || ''} onChange={(e) => updateField('height', parseInt(e.target.value) || 0)} className={inputClass} placeholder="1080" />
        </div>

        <div>
          <label className={labelClass}>Photographer Name</label>
          <input type="text" value={form.photographer_name} onChange={(e) => updateField('photographer_name', e.target.value)} className={inputClass} placeholder="Photographer name" />
        </div>

        <div>
          <label className={labelClass}>Photographer URL</label>
          <input type="url" value={form.photographer_url} onChange={(e) => updateField('photographer_url', e.target.value)} className={inputClass} placeholder="https://..." />
        </div>
      </div>

      <div className="flex gap-6">
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={form.featured} onChange={(e) => updateField('featured', e.target.checked)} className="w-4 h-4 rounded border-neutral-300 dark:border-neutral-600 text-accent-600 focus:ring-accent-500" />
          <span className="text-sm text-neutral-700 dark:text-neutral-300">Featured</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={form.is_ai_generated} onChange={(e) => updateField('is_ai_generated', e.target.checked)} className="w-4 h-4 rounded border-neutral-300 dark:border-neutral-600 text-accent-600 focus:ring-accent-500" />
          <span className="text-sm text-neutral-700 dark:text-neutral-300">AI Generated</span>
        </label>
      </div>

      <div>
        <label className={labelClass}>Categories</label>
        <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => toggleArrayItem('categoryIds', cat.id)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                form.categoryIds.includes(cat.id)
                  ? 'bg-accent-600 text-white'
                  : 'bg-neutral-200 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-300 dark:hover:bg-neutral-600'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className={labelClass}>Tags</label>
        <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
          {tags.map((tag) => (
            <button
              key={tag.id}
              type="button"
              onClick={() => toggleArrayItem('tagIds', tag.id)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                form.tagIds.includes(tag.id)
                  ? 'bg-accent-600 text-white'
                  : 'bg-neutral-200 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-300 dark:hover:bg-neutral-600'
              }`}
            >
              {tag.name}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
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
          {saving ? 'Saving...' : (image ? 'Update Image' : 'Create Image')}
        </button>
      </div>
    </form>
  );
}
