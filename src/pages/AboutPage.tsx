import { Link } from 'react-router-dom';
import { Aperture, Camera, Download, Shield, Zap, Heart } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex p-3 rounded-2xl bg-neutral-100 dark:bg-neutral-800 mb-6">
            <Aperture className="w-8 h-8 text-neutral-900 dark:text-white" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-neutral-900 dark:text-white">
            About Puma AI
          </h1>
          <p className="mt-4 text-lg text-neutral-500 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            A free stock image platform built for creators, designers, developers, and builders
            who need high-quality visuals without the hassle.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          {[
            {
              icon: Camera,
              title: 'High-Quality Images',
              desc: 'Every image in our collection is carefully curated for quality, composition, and relevance. No filler content.',
            },
            {
              icon: Download,
              title: 'Truly Free',
              desc: 'No sign-up required, no hidden fees, no watermarks. Download and use any image instantly for any purpose.',
            },
            {
              icon: Shield,
              title: 'Safe to Use',
              desc: 'All images are free to use for personal and commercial projects. Attribution is appreciated but not required.',
            },
            {
              icon: Zap,
              title: 'Fast & Simple',
              desc: 'Clean, minimal interface designed for speed. Find what you need, download it, and get back to creating.',
            },
          ].map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="p-6 rounded-2xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800"
            >
              <div className="p-2.5 rounded-xl bg-white dark:bg-neutral-800 inline-block mb-4 shadow-sm">
                <Icon className="w-5 h-5 text-neutral-700 dark:text-neutral-300" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">{title}</h3>
              <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        <div className="mb-20">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">How to Use</h2>
          <div className="space-y-6">
            {[
              { step: '01', title: 'Browse or Search', desc: 'Use the search bar or browse categories to find the perfect image for your project.' },
              { step: '02', title: 'Preview', desc: 'Click any image to see it in full resolution along with details and related images.' },
              { step: '03', title: 'Download', desc: 'Hit the download button to get the full-resolution image file. No account needed.' },
            ].map(({ step, title, desc }) => (
              <div key={step} className="flex gap-5">
                <span className="text-3xl font-bold text-neutral-200 dark:text-neutral-700 select-none">{step}</span>
                <div>
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">{title}</h3>
                  <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-20">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">License</h2>
          <div className="p-6 rounded-2xl bg-accent-50 dark:bg-accent-900/10 border border-accent-100 dark:border-accent-900/20">
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
              All images on Puma AI are released under a permissive license. You are free to use them
              for personal and commercial purposes without attribution. You may not sell unaltered copies
              of the images or redistribute them as a competing stock photo service.
            </p>
          </div>
        </div>

        <div className="text-center">
          <Heart className="w-6 h-6 text-neutral-300 dark:text-neutral-600 mx-auto mb-4" />
          <p className="text-neutral-500 dark:text-neutral-400 mb-6">
            Built with care for the creative community.
          </p>
          <Link
            to="/explore"
            className="inline-flex items-center gap-2 px-6 py-3 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-xl font-medium hover:opacity-90 transition-opacity"
          >
            Start Exploring
          </Link>
        </div>
      </div>
    </div>
  );
}
