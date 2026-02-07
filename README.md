# Stock Images for Creators

A modern, high-performance stock image platform built for creators. Browse, search, and discover thousands of categorized images with a beautiful, responsive interface.

🌐 **Live Site:** [pumaai.in](https://pumaai.in)

## Features

- **📸 Extensive Image Library** - Thousands of high-quality images across multiple categories
- **🔍 Advanced Search** - Search by keywords, tags, and categories
- **📊 Multiple Sorting Options** - Sort by newest, popular, views, or downloads
- **🎨 Category Browsing** - Organized categories for easy discovery
- **📱 Responsive Design** - Beautiful experience on all devices
- **⚡ Infinite Scroll** - Smooth, lazy-loaded image loading
- **🌙 Dark Mode** - Easy on the eyes, day or night
- **📈 Admin Dashboard** - Manage images, categories, and tags
- **🔒 Secure Authentication** - Admin login with Supabase Auth
- **♾️ Masonry Layout** - Pinterest-style grid for optimal image display

## Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first styling
- **React Router** - Client-side routing
- **Lucide React** - Beautiful icons

### Backend
- **Supabase** - Backend as a Service
  - PostgreSQL database
  - Row Level Security (RLS)
  - Authentication
  - Real-time subscriptions

### Deployment
- **Netlify** - Hosting and CDN
- **Custom Domain** - pumaai.in via GoDaddy DNS

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- Supabase account

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd stock_images_for_creators
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**

Create a `.env` file in the root directory:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. **Run database migrations**

All migrations are in the `supabase/migrations/` directory. Apply them in your Supabase project dashboard.

5. **Start development server**
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The production build will be in the `dist/` directory.

## Project Structure

```
src/
├── components/        # Reusable UI components
│   ├── auth/         # Authentication components
│   ├── dashboard/    # Admin dashboard components
│   ├── layout/       # Layout components (Navbar, Footer)
│   └── ui/           # UI components (Cards, Grids, etc.)
├── contexts/         # React contexts (Auth, etc.)
├── hooks/            # Custom React hooks
├── lib/              # Libraries and utilities
├── pages/            # Page components
│   └── dashboard/    # Admin dashboard pages
├── types/            # TypeScript type definitions
├── App.tsx           # Main app component
└── main.tsx          # App entry point
```

## Database Schema

The application uses Supabase with the following main tables:

- **images** - Image metadata and URLs
- **categories** - Image categories
- **tags** - Image tags
- **image_tags** - Many-to-many relationship
- **profiles** - User profiles with admin role

All tables are protected with Row Level Security (RLS) policies.

## Admin Access

Access the admin dashboard at `/admin/login`

Default admin credentials are set during database setup.

## Features in Detail

### Image Management
- Add, edit, and delete images
- Assign categories and tags
- Track views and downloads
- Manage image metadata

### Search & Discovery
- Full-text search across titles, descriptions, and tags
- Filter by category
- Sort by various metrics
- Infinite scroll pagination

### Performance
- Lazy loading images
- Optimized database queries
- Efficient caching strategies
- Masonry layout with intersection observer

## Environment Variables

| Variable | Description |
|----------|-------------|
| `VITE_SUPABASE_URL` | Your Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase anonymous key |

## Domain Setup

The site is hosted at **pumaai.in** using:
- **DNS Provider:** GoDaddy
- **Hosting:** Netlify
- **SSL:** Let's Encrypt (via Netlify)

## Contact

For questions, suggestions, or support:

**Email:** [ankitsachan982@gmail.com](mailto:ankitsachan982@gmail.com)

## License

All rights reserved © 2026

---

Built with ❤️ for creators by creators
