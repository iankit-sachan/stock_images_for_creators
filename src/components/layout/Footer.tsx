import { Link } from 'react-router-dom';
import { Aperture, Github, Twitter, Instagram } from 'lucide-react';

const footerLinks = {
  explore: [
    { to: '/explore', label: 'Browse Images' },
    { to: '/popular', label: 'Popular' },
    { to: '/categories', label: 'Categories' },
  ],
  categories: [
    { to: '/category/nature', label: 'Nature' },
    { to: '/category/technology', label: 'Technology' },
    { to: '/category/business', label: 'Business' },
    { to: '/category/travel', label: 'Travel' },
  ],
  company: [
    { to: '/about', label: 'About' },
    { to: '/about', label: 'License' },
    { to: '/about', label: 'Privacy' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-neutral-50 dark:bg-neutral-925 border-t border-neutral-200 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 font-bold text-xl text-neutral-900 dark:text-white">
              <Aperture className="w-6 h-6" />
              <span>Puma AI</span>
            </Link>
            <p className="mt-4 text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
              Free premium stock images for creators, designers, and builders. No payment, no sign-up required.
            </p>
            <div className="flex gap-3 mt-6">
              {[Github, Twitter, Instagram].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="p-2 rounded-full bg-neutral-200/50 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-all"
                  aria-label="Social link"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-neutral-900 dark:text-white mb-4">Explore</h4>
            <ul className="space-y-3">
              {footerLinks.explore.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-neutral-900 dark:text-white mb-4">Categories</h4>
            <ul className="space-y-3">
              {footerLinks.categories.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-neutral-900 dark:text-white mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-neutral-200 dark:border-neutral-800">
          <p className="text-sm text-neutral-400 dark:text-neutral-500 text-center">
            &copy; {new Date().getFullYear()} Puma AI. All images are free to use.
          </p>
        </div>
      </div>
    </footer>
  );
}
