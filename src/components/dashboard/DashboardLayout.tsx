import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Image, Layers, Tags, Aperture,
  ChevronLeft, ChevronRight, Sun, Moon, ExternalLink, Menu, LogOut,
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface DashboardLayoutProps {
  children: React.ReactNode;
  isDark: boolean;
  onToggleDark: () => void;
}

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Overview' },
  { to: '/dashboard/images', icon: Image, label: 'Images' },
  { to: '/dashboard/categories', icon: Layers, label: 'Categories' },
  { to: '/dashboard/tags', icon: Tags, label: 'Tags' },
];

export default function DashboardLayout({ children, isDark, onToggleDark }: DashboardLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { signOut, session } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    navigate('/admin-login', { replace: true });
  };

  const isActive = (path: string) => {
    if (path === '/dashboard') return location.pathname === '/dashboard';
    return location.pathname.startsWith(path);
  };

  const sidebar = (
    <div className="flex flex-col h-full">
      <div className={`flex items-center h-16 px-4 border-b border-neutral-200 dark:border-neutral-800 ${collapsed ? 'justify-center' : 'gap-2.5'}`}>
        <Aperture className="w-6 h-6 text-accent-600 dark:text-accent-400 shrink-0" />
        {!collapsed && <span className="font-bold text-neutral-900 dark:text-white text-lg">pumaai.in</span>}
      </div>

      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        {navItems.map(({ to, icon: Icon, label }) => (
          <Link
            key={to}
            to={to}
            onClick={() => setMobileOpen(false)}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              isActive(to)
                ? 'bg-accent-50 dark:bg-accent-900/20 text-accent-700 dark:text-accent-400'
                : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-white'
            } ${collapsed ? 'justify-center' : ''}`}
            title={collapsed ? label : undefined}
          >
            <Icon className="w-5 h-5 shrink-0" />
            {!collapsed && <span>{label}</span>}
          </Link>
        ))}
      </nav>

      <div className="border-t border-neutral-200 dark:border-neutral-800 p-3 space-y-1">
        <button
          onClick={onToggleDark}
          className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-white transition-colors ${collapsed ? 'justify-center' : ''}`}
          title={collapsed ? (isDark ? 'Light mode' : 'Dark mode') : undefined}
        >
          {isDark ? <Sun className="w-5 h-5 shrink-0" /> : <Moon className="w-5 h-5 shrink-0" />}
          {!collapsed && <span>{isDark ? 'Light Mode' : 'Dark Mode'}</span>}
        </button>

        <Link
          to="/"
          className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-white transition-colors ${collapsed ? 'justify-center' : ''}`}
          title={collapsed ? 'View Site' : undefined}
        >
          <ExternalLink className="w-5 h-5 shrink-0" />
          {!collapsed && <span>View Site</span>}
        </Link>

        <button
          onClick={handleSignOut}
          className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors ${collapsed ? 'justify-center' : ''}`}
          title={collapsed ? 'Sign Out' : undefined}
        >
          <LogOut className="w-5 h-5 shrink-0" />
          {!collapsed && <span>Sign Out</span>}
        </button>

        {!collapsed && session?.user?.email && (
          <div className="px-3 pt-2">
            <p className="text-xs text-neutral-400 dark:text-neutral-500 truncate">{session.user.email}</p>
          </div>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className={`hidden lg:flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-white transition-colors ${collapsed ? 'justify-center' : ''}`}
        >
          {collapsed ? <ChevronRight className="w-5 h-5 shrink-0" /> : <ChevronLeft className="w-5 h-5 shrink-0" />}
          {!collapsed && <span>Collapse</span>}
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 flex">
      <aside className={`hidden lg:block ${collapsed ? 'w-[72px]' : 'w-64'} bg-white dark:bg-neutral-925 border-r border-neutral-200 dark:border-neutral-800 shrink-0 transition-all duration-300 sticky top-0 h-screen`}>
        {sidebar}
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
          <aside className="relative w-64 h-full bg-white dark:bg-neutral-925 shadow-2xl">
            {sidebar}
          </aside>
        </div>
      )}

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white dark:bg-neutral-925 border-b border-neutral-200 dark:border-neutral-800 flex items-center px-4 lg:px-8 shrink-0 sticky top-0 z-30">
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden p-2 -ml-2 mr-2 rounded-lg text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2">
            {navItems.filter((n) => isActive(n.to)).map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2">
                <Icon className="w-5 h-5 text-neutral-400 dark:text-neutral-500" />
                <h1 className="text-lg font-semibold text-neutral-900 dark:text-white">{label}</h1>
              </div>
            ))}
          </div>
        </header>

        <div className="flex-1 p-4 lg:p-8 overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
