'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Header from '../../components/Header';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Store auth token
        localStorage.setItem('admin_auth', 'true');
        router.push('/admin');
      } else {
        setError('كلمة المرور غير صحيحة');
      }
    } catch (error) {
      setError('حدث خطأ أثناء تسجيل الدخول');
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

          <div className="relative z-10 max-w-md mx-auto px-6 sm:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-8 rounded-2xl bg-zinc-900/40 backdrop-blur-sm border border-zinc-800/50"
            >
              <h1 className="text-3xl font-bold text-zinc-50 mb-2 text-center" dir="rtl">
                تسجيل الدخول
              </h1>
              <p className="text-zinc-400 text-center mb-8" dir="rtl">
                لوحة التحكم
              </p>

              <form onSubmit={handleSubmit} className="space-y-6" dir="rtl">
                <div>
                  <label className="block text-sm font-medium text-zinc-300 mb-2">
                    كلمة المرور
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-lg text-zinc-50 focus:outline-none focus:border-green-500"
                    placeholder="أدخل كلمة المرور"
                  />
                </div>

                {error && (
                  <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 text-sm">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-6 py-3 bg-green-600 hover:bg-green-700 disabled:bg-zinc-700 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors"
                >
                  {loading ? 'جاري التحقق...' : 'دخول'}
                </button>
              </form>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
}

