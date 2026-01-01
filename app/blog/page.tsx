'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Header from '../components/Header';

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

export default function BlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await fetch('/api/blogs');
      const data = await response.json();
      setBlogs(data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Header />
      <main className="pt-24">
        <section className="relative w-full py-16 lg:py-20 overflow-hidden min-h-screen">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-radial from-zinc-900 via-zinc-950 to-black">
          </div>

          {/* Content */}
          <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-zinc-50 mb-6" dir="rtl">
                المدونة
              </h1>
              <p className="text-xl text-zinc-400 max-w-3xl mx-auto" dir="rtl">
                مقالات وتحليلات متخصصة في أسواق الذهب والفضة
              </p>
            </motion.div>

            {/* Blog Grid */}
            {loading ? (
              <div className="text-center py-20">
                <p className="text-zinc-400" dir="rtl">جاري التحميل...</p>
              </div>
            ) : blogs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogs.map((blog, index) => (
                  <motion.article
                    key={blog.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="group"
                  >
                    <Link href={`/blog/${blog.slug}`}>
                      <div className="relative h-full p-6 rounded-2xl bg-zinc-900/40 backdrop-blur-sm border border-zinc-800/50 hover:border-green-500/30 transition-all duration-300 overflow-hidden">
                        {/* Image */}
                        <div className="relative w-full h-48 rounded-lg mb-4 overflow-hidden bg-gradient-to-br from-green-500/20 to-emerald-500/20">
                          {blog.image && blog.image !== '/placeholder-blog.jpg' ? (
                            <Image
                              src={blog.image}
                              alt={blog.title}
                              fill
                              className="object-cover"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = '/placeholder-blog.jpg';
                              }}
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <span className="text-4xl">📊</span>
                            </div>
                          )}
                        </div>

                        {/* Category */}
                        <div className="mb-3">
                          <span className="text-xs text-green-500 font-medium px-3 py-1 bg-green-500/10 rounded-full">
                            {blog.category}
                          </span>
                        </div>

                        {/* Title */}
                        <h2 className="text-xl font-bold text-zinc-50 mb-3 group-hover:text-green-400 transition-colors" dir="rtl">
                          {blog.title}
                        </h2>

                        {/* Excerpt */}
                        <p className="text-zinc-400 text-sm leading-relaxed mb-4 line-clamp-3" dir="rtl">
                          {blog.excerpt}
                        </p>

                        {/* Meta */}
                        <div className="flex items-center justify-between text-xs text-zinc-500">
                          <span>{blog.author}</span>
                          <span>{new Date(blog.date).toLocaleDateString('ar-SA')}</span>
                        </div>

                        {/* Hover effect */}
                        <div className="absolute inset-0 rounded-2xl bg-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                      </div>
                    </Link>
                  </motion.article>
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <p className="text-zinc-400 text-lg" dir="rtl">
                  لا توجد مقالات متاحة حالياً
                </p>
              </motion.div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}

