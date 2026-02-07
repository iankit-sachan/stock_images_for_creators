import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
  isDark: boolean;
  onToggleDark: () => void;
}

export default function Layout({ children, isDark, onToggleDark }: LayoutProps) {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar isDark={isDark} onToggleDark={onToggleDark} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
