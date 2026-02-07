import { ArrowUp } from 'lucide-react';
import { useScrollPosition } from '../../hooks/useScrollPosition';

export default function ScrollToTop() {
  const scrollY = useScrollPosition();

  if (scrollY < 500) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-8 right-8 z-40 p-3 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in hover:-translate-y-0.5"
      aria-label="Scroll to top"
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
}
