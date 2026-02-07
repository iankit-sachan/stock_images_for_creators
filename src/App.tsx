import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import DashboardLayout from './components/dashboard/DashboardLayout';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext';
import { useDarkMode } from './hooks/useDarkMode';
import HomePage from './pages/HomePage';
import ExplorePage from './pages/ExplorePage';
import PopularPage from './pages/PopularPage';
import CategoriesPage from './pages/CategoriesPage';
import CategoryPage from './pages/CategoryPage';
import ImagePage from './pages/ImagePage';
import SearchPage from './pages/SearchPage';
import AboutPage from './pages/AboutPage';
import AdminLoginPage from './pages/AdminLoginPage';
import DashboardOverview from './pages/dashboard/DashboardOverview';
import DashboardImages from './pages/dashboard/DashboardImages';
import DashboardCategories from './pages/dashboard/DashboardCategories';
import DashboardTags from './pages/dashboard/DashboardTags';

export default function App() {
  const { isDark, toggle } = useDarkMode();

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/admin-login" element={<AdminLoginPage />} />

          <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout isDark={isDark} onToggleDark={toggle}><DashboardOverview /></DashboardLayout></ProtectedRoute>} />
          <Route path="/dashboard/images" element={<ProtectedRoute><DashboardLayout isDark={isDark} onToggleDark={toggle}><DashboardImages /></DashboardLayout></ProtectedRoute>} />
          <Route path="/dashboard/categories" element={<ProtectedRoute><DashboardLayout isDark={isDark} onToggleDark={toggle}><DashboardCategories /></DashboardLayout></ProtectedRoute>} />
          <Route path="/dashboard/tags" element={<ProtectedRoute><DashboardLayout isDark={isDark} onToggleDark={toggle}><DashboardTags /></DashboardLayout></ProtectedRoute>} />

          <Route element={<Layout isDark={isDark} onToggleDark={toggle}><HomePage /></Layout>} path="/" />
          <Route element={<Layout isDark={isDark} onToggleDark={toggle}><ExplorePage /></Layout>} path="/explore" />
          <Route element={<Layout isDark={isDark} onToggleDark={toggle}><PopularPage /></Layout>} path="/popular" />
          <Route element={<Layout isDark={isDark} onToggleDark={toggle}><CategoriesPage /></Layout>} path="/categories" />
          <Route element={<Layout isDark={isDark} onToggleDark={toggle}><CategoryPage /></Layout>} path="/category/:slug" />
          <Route element={<Layout isDark={isDark} onToggleDark={toggle}><ImagePage /></Layout>} path="/image/:id" />
          <Route element={<Layout isDark={isDark} onToggleDark={toggle}><SearchPage /></Layout>} path="/search" />
          <Route element={<Layout isDark={isDark} onToggleDark={toggle}><AboutPage /></Layout>} path="/about" />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
