import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';

interface SearchBarProps {
  large?: boolean;
  className?: string;
  placeholder?: string;
}

export default function SearchBar({ large, className = '', placeholder }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      setQuery('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder || 'Search free images by keyword, style, or category...'}
        className={`w-full bg-white/95 dark:bg-neutral-800/95 backdrop-blur-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 rounded-2xl border border-neutral-200/50 dark:border-neutral-700/50 focus:outline-none focus:ring-2 focus:ring-accent-500/40 focus:border-transparent shadow-lg shadow-black/5 transition-all ${
          large ? 'px-7 py-5 pl-14 text-lg' : 'px-5 py-3 pl-11 text-sm'
        }`}
      />
      <Search
        className={`absolute top-1/2 -translate-y-1/2 text-neutral-400 ${
          large ? 'left-5 w-6 h-6' : 'left-4 w-4 h-4'
        }`}
      />
    </form>
  );
}
