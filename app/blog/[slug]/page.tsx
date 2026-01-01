'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Header from '../../components/Header';
import { use } from 'react';

interface Blog {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  image: string;
}

export default function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlog();
  }, [resolvedParams.slug]);

  const fetchBlog = async () => {
    try {
      const response = await fetch('/api/blogs');
      const blogs = await response.json();
      const foundBlog = blogs.find((b: Blog) => b.slug === resolvedParams.slug);
      setBlog(foundBlog);
    } catch (error) {
      console.error('Error fetching blog:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <Header />
        <main className="pt-24">
          <div className="text-center py-20">
            <p className="text-zinc-400" dir="rtl">جاري التحميل...</p>
          </div>
        </main>
      </>
    );
  }

  if (!blog) {
    return (
      <>
        <Header />
        <main className="pt-24">
          <div className="text-center py-20">
            <p className="text-zinc-400" dir="rtl">المقال غير موجود</p>
            <Link href="/blog" className="text-green-400 hover:text-green-300 mt-4 inline-block">
              العودة للمدونة
            </Link>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="pt-24">
        <article className="relative w-full py-16 lg:py-20 overflow-hidden min-h-screen">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-radial from-zinc-900 via-zinc-950 to-black">
          </div>

          {/* Content */}
          <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-8">
            {/* Back button */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-8"
            >
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-zinc-400 hover:text-green-400 transition-colors"
              >
                <svg className="w-5 h-5 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
                <span>العودة للمدونة</span>
              </Link>
            </motion.div>

            {/* Header */}
            <motion.header
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-12"
            >
              <div className="mb-4">
                <span className="text-sm text-green-500 font-medium px-3 py-1 bg-green-500/10 rounded-full">
                  {blog.category}
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-zinc-50 mb-6 leading-tight" dir="rtl">
                {blog.title}
              </h1>
              <div className="flex items-center gap-4 text-zinc-400 text-sm">
                <span>{blog.author}</span>
                <span>•</span>
                <span>{new Date(blog.date).toLocaleDateString('ar-SA', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
            </motion.header>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="relative w-full h-64 sm:h-80 lg:h-96 rounded-2xl mb-12 overflow-hidden bg-gradient-to-br from-green-500/20 to-emerald-500/20"
            >
              {blog.image && blog.image !== '/placeholder-blog.jpg' ? (
                <Image
                  src={blog.image}
                  alt={blog.title}
                  fill
                  className="object-cover"
                  priority
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/placeholder-blog.jpg';
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-6xl">📊</span>
                </div>
              )}
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="prose prose-invert prose-lg max-w-none"
              dir="rtl"
            >
              <div className="text-zinc-300 leading-relaxed space-y-6 text-lg">
                {blog.content.split('\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </motion.div>
          </div>
        </article>
      </main>
    </>
  );
}

