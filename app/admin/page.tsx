'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
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

interface Service {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  value_proposition: string;
  icon: string;
  color: string;
  accent_color: string;
  display_order: number;
  is_active: boolean;
}

interface ContentItem {
  id: string;
  type: 'video' | 'image';
  media_url: string;
  title?: string | null;
  subtitle?: string | null;
  description?: string | null;
  eyebrow?: string | null;
  display_order: number;
  is_active: boolean;
}

export default function AdminPanel() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'blogs' | 'services' | 'content'>('blogs');
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [contentItems, setContentItems] = useState<ContentItem[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [editingContentItem, setEditingContentItem] = useState<ContentItem | null>(null);
  const [formData, setFormData] = useState<Blog>({
    id: '',
    slug: '',
    title: '',
    excerpt: '',
    content: '',
    author: 'ليث السالمي',
    date: new Date().toISOString().split('T')[0],
    category: 'تحليل فني',
    image: '/placeholder-blog.jpg'
  });
  const [serviceFormData, setServiceFormData] = useState<Service>({
    id: '',
    title: '',
    subtitle: '',
    description: '',
    value_proposition: '',
    icon: '🎯',
    color: 'from-green-500/20 to-emerald-500/20',
    accent_color: 'green-500',
    display_order: 1,
    is_active: true
  });
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [contentFormData, setContentFormData] = useState<ContentItem>({
    id: '',
    type: 'image',
    media_url: '',
    title: '',
    subtitle: '',
    description: '',
    eyebrow: '',
    display_order: 0,
    is_active: true
  });
  const [mediaPreview, setMediaPreview] = useState<string>('');
  const mediaFileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Check authentication
    const auth = localStorage.getItem('admin_auth');
    if (auth === 'true') {
      setIsAuthenticated(true);
      loadBlogs();
      loadServices();
      loadContentItems();
    } else {
      router.push('/admin/login');
    }
    setLoading(false);
  }, [router]);

  const loadBlogs = async () => {
    try {
      const response = await fetch('/api/blogs');
      const data = await response.json();
      setBlogs(data);
    } catch (error) {
      console.error('Error loading blogs:', error);
    }
  };

  const loadServices = async () => {
    try {
      const response = await fetch('/api/services');
      const data = await response.json();
      setServices(data);
    } catch (error) {
      console.error('Error loading services:', error);
    }
  };

  const loadContentItems = async () => {
    try {
      const response = await fetch('/api/content-items');
      const data = await response.json();
      setContentItems(data);
    } catch (error) {
      console.error('Error loading content items:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const blogData = {
      ...formData,
      id: editingBlog?.id || Date.now().toString(),
      slug: formData.slug || formData.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\u0621-\u064A\w-]/g, ''),
    };

    try {
      const response = await fetch('/api/blogs', {
        method: isEditing ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(blogData),
      });

      if (response.ok) {
        await loadBlogs();
        resetForm();
        alert(isEditing ? 'تم تحديث المقال بنجاح' : 'تم إضافة المقال بنجاح');
      }
    } catch (error) {
      console.error('Error saving blog:', error);
      alert('حدث خطأ أثناء الحفظ');
    }
  };

  const handleEdit = (blog: Blog) => {
    setEditingBlog(blog);
    setFormData(blog);
    setImagePreview(blog.image);
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      alert('نوع الملف غير مدعوم. يرجى اختيار صورة بصيغة JPEG أو PNG أو WebP');
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('حجم الملف كبير جداً. الحد الأقصى 5 ميجابايت');
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok && data.url) {
        setFormData(prev => ({ ...prev, image: data.url }));
        setImagePreview(data.url);
      } else {
        alert(data.error || 'فشل رفع الصورة');
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('حدث خطأ أثناء رفع الصورة');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('هل أنت متأكد من حذف هذا المقال؟')) return;

    try {
      const response = await fetch(`/api/blogs/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await loadBlogs();
        alert('تم حذف المقال بنجاح');
      }
    } catch (error) {
      console.error('Error deleting blog:', error);
      alert('حدث خطأ أثناء الحذف');
    }
  };

  // Service handlers
  const handleServiceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/services', {
        method: editingService ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(serviceFormData),
      });

      if (response.ok) {
        await loadServices();
        resetServiceForm();
        alert(editingService ? 'تم تحديث الخدمة بنجاح' : 'تم إضافة الخدمة بنجاح');
      }
    } catch (error) {
      console.error('Error saving service:', error);
      alert('حدث خطأ أثناء الحفظ');
    }
  };

  const handleServiceEdit = (service: Service) => {
    setEditingService(service);
    setServiceFormData(service);
    setActiveTab('services');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleServiceDelete = async (id: string) => {
    if (!confirm('هل أنت متأكد من حذف هذه الخدمة؟')) return;

    try {
      const response = await fetch(`/api/services/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await loadServices();
        alert('تم حذف الخدمة بنجاح');
      }
    } catch (error) {
      console.error('Error deleting service:', error);
      alert('حدث خطأ أثناء الحذف');
    }
  };

  const resetServiceForm = () => {
    setServiceFormData({
      id: '',
      title: '',
      subtitle: '',
      description: '',
      value_proposition: '',
      icon: '🎯',
      color: 'from-green-500/20 to-emerald-500/20',
      accent_color: 'green-500',
      display_order: services.length + 1,
      is_active: true
    });
    setEditingService(null);
  };

  const resetForm = () => {
    setFormData({
      id: '',
      slug: '',
      title: '',
      excerpt: '',
      content: '',
      author: 'ليث السالمي',
      date: new Date().toISOString().split('T')[0],
      category: 'تحليل فني',
      image: '/placeholder-blog.jpg'
    });
    setImagePreview('');
    setIsEditing(false);
    setEditingBlog(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Content Item handlers
  const handleContentItemSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/content-items', {
        method: editingContentItem ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contentFormData),
      });

      if (response.ok) {
        await loadContentItems();
        resetContentForm();
        alert(editingContentItem ? 'تم تحديث العنصر بنجاح' : 'تم إضافة العنصر بنجاح');
      }
    } catch (error) {
      console.error('Error saving content item:', error);
      alert('حدث خطأ أثناء الحفظ');
    }
  };

  const handleContentItemEdit = (item: ContentItem) => {
    setEditingContentItem(item);
    setContentFormData(item);
    setMediaPreview(item.media_url);
    setActiveTab('content');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleContentItemDelete = async (id: string) => {
    if (!confirm('هل أنت متأكد من حذف هذا العنصر؟')) return;

    try {
      const response = await fetch(`/api/content-items/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await loadContentItems();
        alert('تم حذف العنصر بنجاح');
      }
    } catch (error) {
      console.error('Error deleting content item:', error);
      alert('حدث خطأ أثناء الحذف');
    }
  };

  const handleMediaUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isImage = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(file.type);
    const isVideo = ['video/mp4', 'video/webm', 'video/ogg'].includes(file.type);

    if (!isImage && !isVideo) {
      alert('نوع الملف غير مدعوم. يرجى اختيار صورة أو فيديو');
      return;
    }

    const maxImageSize = 5 * 1024 * 1024; // 5MB
    const maxVideoSize = 50 * 1024 * 1024; // 50MB
    const maxSize = isImage ? maxImageSize : maxVideoSize;

    if (file.size > maxSize) {
      alert(`حجم الملف كبير جداً. الحد الأقصى ${isImage ? '5' : '50'} ميجابايت`);
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok && data.url) {
        setContentFormData(prev => ({ 
          ...prev, 
          media_url: data.url,
          type: data.type || (isImage ? 'image' : 'video')
        }));
        setMediaPreview(data.url);
      } else {
        alert(data.error || 'فشل رفع الملف');
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('حدث خطأ أثناء رفع الملف');
    } finally {
      setUploading(false);
    }
  };

  const resetContentForm = () => {
    setContentFormData({
      id: '',
      type: 'image',
      media_url: '',
      title: '',
      subtitle: '',
      description: '',
      eyebrow: '',
      display_order: contentItems.length,
      is_active: true
    });
    setMediaPreview('');
    setEditingContentItem(null);
    if (mediaFileInputRef.current) {
      mediaFileInputRef.current.value = '';
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_auth');
    router.push('/admin/login');
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

  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      <Header />
      <main className="pt-24">
        <section className="relative w-full py-16 lg:py-20 overflow-hidden min-h-screen">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-radial from-zinc-900 via-zinc-950 to-black">
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-12 flex items-center justify-between"
            >
              <div>
                <h1 className="text-4xl sm:text-5xl font-bold text-zinc-50 mb-4" dir="rtl">
                  لوحة التحكم
                </h1>
                <p className="text-zinc-400" dir="rtl">
                  إدارة المقالات والخدمات
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors text-sm font-medium"
              >
                تسجيل الخروج
              </button>
            </motion.div>

            {/* Tab Navigation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex gap-4 mb-8"
            >
              <button
                onClick={() => setActiveTab('blogs')}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  activeTab === 'blogs'
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                    : 'bg-zinc-800/30 text-zinc-400 border border-zinc-700/30 hover:text-zinc-300'
                }`}
              >
                المقالات ({blogs.length})
              </button>
              <button
                onClick={() => setActiveTab('services')}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  activeTab === 'services'
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                    : 'bg-zinc-800/30 text-zinc-400 border border-zinc-700/30 hover:text-zinc-300'
                }`}
              >
                الخدمات ({services.length})
              </button>
              <button
                onClick={() => setActiveTab('content')}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  activeTab === 'content'
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                    : 'bg-zinc-800/30 text-zinc-400 border border-zinc-700/30 hover:text-zinc-300'
                }`}
              >
                المحتوى ({contentItems.length})
              </button>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Form */}
              <div className="lg:col-span-2">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="p-8 rounded-2xl bg-zinc-900/40 backdrop-blur-sm border border-zinc-800/50"
                >
                  <h2 className="text-2xl font-bold text-zinc-50 mb-6" dir="rtl">
                    {activeTab === 'blogs' 
                      ? (isEditing ? 'تعديل مقال' : 'إضافة مقال جديد')
                      : activeTab === 'services'
                      ? (editingService ? 'تعديل خدمة' : 'إضافة خدمة جديدة')
                      : (editingContentItem ? 'تعديل عنصر محتوى' : 'إضافة عنصر محتوى جديد')
                    }
                  </h2>

                  {activeTab === 'blogs' ? (
                    <form onSubmit={handleSubmit} className="space-y-6" dir="rtl">
                    <div>
                      <label className="block text-sm font-medium text-zinc-300 mb-2">
                        العنوان
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-lg text-zinc-50 focus:outline-none focus:border-green-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-zinc-300 mb-2">
                        الرابط (Slug)
                      </label>
                      <input
                        type="text"
                        value={formData.slug}
                        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                        className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-lg text-zinc-50 focus:outline-none focus:border-green-500"
                        placeholder="سيتم إنشاؤه تلقائياً من العنوان"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-zinc-300 mb-2">
                        الملخص
                      </label>
                      <textarea
                        required
                        value={formData.excerpt}
                        onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                        rows={3}
                        className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-lg text-zinc-50 focus:outline-none focus:border-green-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-zinc-300 mb-2">
                        المحتوى
                      </label>
                      <textarea
                        required
                        value={formData.content}
                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                        rows={10}
                        className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-lg text-zinc-50 focus:outline-none focus:border-green-500"
                      />
                    </div>

                    {/* Image Upload */}
                    <div>
                      <label className="block text-sm font-medium text-zinc-300 mb-2">
                        صورة المقال
                      </label>
                      <div className="space-y-4">
                        {/* Image Preview */}
                        {(imagePreview || formData.image) && (
                          <div className="relative w-full h-48 rounded-lg overflow-hidden bg-zinc-800/50 border border-zinc-700">
                            <Image
                              src={imagePreview || formData.image}
                              alt="Preview"
                              fill
                              className="object-cover"
                              onError={() => setImagePreview('/placeholder-blog.jpg')}
                            />
                          </div>
                        )}
                        
                        {/* Upload Input */}
                        <div className="flex items-center gap-4">
                          <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/jpeg,image/jpg,image/png,image/webp"
                            onChange={handleImageUpload}
                            disabled={uploading}
                            className="hidden"
                            id="image-upload"
                          />
                          <label
                            htmlFor="image-upload"
                            className={`flex-1 px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-lg text-zinc-50 cursor-pointer hover:border-green-500 transition-colors text-center ${
                              uploading ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                          >
                            {uploading ? 'جاري الرفع...' : 'اختر صورة'}
                          </label>
                          <input
                            type="text"
                            placeholder="أو أدخل رابط الصورة"
                            value={formData.image}
                            onChange={(e) => {
                              setFormData({ ...formData, image: e.target.value });
                              setImagePreview(e.target.value);
                            }}
                            className="flex-1 px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-lg text-zinc-50 focus:outline-none focus:border-green-500"
                          />
                        </div>
                        <p className="text-xs text-zinc-500">
                          الحد الأقصى لحجم الملف: 5 ميجابايت | الصيغ المدعومة: JPEG, PNG, WebP
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-zinc-300 mb-2">
                          التصنيف
                        </label>
                        <select
                          value={formData.category}
                          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                          className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-lg text-zinc-50 focus:outline-none focus:border-green-500"
                        >
                          <option>تحليل فني</option>
                          <option>تحليل السوق</option>
                          <option>أسواق الذهب</option>
                          <option>أسواق الفضة</option>
                          <option>إدارة المخاطر</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-zinc-300 mb-2">
                          التاريخ
                        </label>
                        <input
                          type="date"
                          value={formData.date}
                          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                          className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-lg text-zinc-50 focus:outline-none focus:border-green-500"
                        />
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <button
                        type="submit"
                        className="flex-1 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors"
                      >
                        {isEditing ? 'تحديث' : 'إضافة'}
                      </button>
                      {isEditing && (
                        <button
                          type="button"
                          onClick={resetForm}
                          className="px-6 py-3 bg-zinc-700 hover:bg-zinc-600 text-zinc-300 font-semibold rounded-lg transition-colors"
                        >
                          إلغاء
                        </button>
                      )}
                      </div>
                    </form>
                  ) : activeTab === 'services' ? (
                    <form onSubmit={handleServiceSubmit} className="space-y-6" dir="rtl">
                      <div>
                        <label className="block text-sm font-medium text-zinc-300 mb-2">
                          عنوان الخدمة
                        </label>
                        <input
                          type="text"
                          required
                          value={serviceFormData.title}
                          onChange={(e) => setServiceFormData({ ...serviceFormData, title: e.target.value })}
                          className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-lg text-zinc-50 focus:outline-none focus:border-green-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-zinc-300 mb-2">
                          العنوان الفرعي
                        </label>
                        <input
                          type="text"
                          value={serviceFormData.subtitle}
                          onChange={(e) => setServiceFormData({ ...serviceFormData, subtitle: e.target.value })}
                          className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-lg text-zinc-50 focus:outline-none focus:border-green-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-zinc-300 mb-2">
                          الوصف
                        </label>
                        <textarea
                          required
                          value={serviceFormData.description}
                          onChange={(e) => setServiceFormData({ ...serviceFormData, description: e.target.value })}
                          rows={5}
                          className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-lg text-zinc-50 focus:outline-none focus:border-green-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-zinc-300 mb-2">
                          القيمة المضافة
                        </label>
                        <textarea
                          value={serviceFormData.value_proposition}
                          onChange={(e) => setServiceFormData({ ...serviceFormData, value_proposition: e.target.value })}
                          rows={3}
                          className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-lg text-zinc-50 focus:outline-none focus:border-green-500"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-zinc-300 mb-2">
                            الأيقونة
                          </label>
                          <input
                            type="text"
                            value={serviceFormData.icon}
                            onChange={(e) => setServiceFormData({ ...serviceFormData, icon: e.target.value })}
                            className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-lg text-zinc-50 focus:outline-none focus:border-green-500"
                            placeholder="🎯"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-zinc-300 mb-2">
                            ترتيب العرض
                          </label>
                          <input
                            type="number"
                            min="1"
                            value={serviceFormData.display_order}
                            onChange={(e) => setServiceFormData({ ...serviceFormData, display_order: parseInt(e.target.value) || 1 })}
                            className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-lg text-zinc-50 focus:outline-none focus:border-green-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={serviceFormData.is_active}
                            onChange={(e) => setServiceFormData({ ...serviceFormData, is_active: e.target.checked })}
                            className="w-4 h-4 text-green-600 bg-zinc-800 border-zinc-600 rounded focus:ring-green-500"
                          />
                          <span className="text-sm font-medium text-zinc-300">نشط</span>
                        </label>
                      </div>

                      <div className="flex gap-4">
                        <button
                          type="submit"
                          className="flex-1 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors"
                        >
                          {editingService ? 'تحديث' : 'إضافة'}
                        </button>
                        {editingService && (
                          <button
                            type="button"
                            onClick={resetServiceForm}
                            className="px-6 py-3 bg-zinc-700 hover:bg-zinc-600 text-zinc-300 font-semibold rounded-lg transition-colors"
                          >
                            إلغاء
                          </button>
                        )}
                      </div>
                    </form>
                  ) : activeTab === 'content' ? (
                    <form onSubmit={handleContentItemSubmit} className="space-y-6" dir="rtl">
                      <div>
                        <label className="block text-sm font-medium text-zinc-300 mb-2">
                          نوع المحتوى
                        </label>
                        <select
                          value={contentFormData.type}
                          onChange={(e) => setContentFormData({ ...contentFormData, type: e.target.value as 'video' | 'image' })}
                          className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-lg text-zinc-50 focus:outline-none focus:border-green-500"
                        >
                          <option value="image">صورة</option>
                          <option value="video">فيديو</option>
                        </select>
                      </div>

                      {/* Media Upload */}
                      <div>
                        <label className="block text-sm font-medium text-zinc-300 mb-2">
                          {contentFormData.type === 'video' ? 'الفيديو' : 'الصورة'} <span className="text-zinc-500 text-xs">(اختياري)</span>
                        </label>
                        <div className="space-y-4">
                          {/* Media Preview */}
                          {mediaPreview && (
                            <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-zinc-800/50 border border-zinc-700">
                              {contentFormData.type === 'video' ? (
                                <video
                                  src={mediaPreview}
                                  className="w-full h-full object-cover"
                                  controls
                                />
                              ) : (
                                <Image
                                  src={mediaPreview}
                                  alt="Preview"
                                  fill
                                  className="object-cover"
                                  onError={() => setMediaPreview('')}
                                />
                              )}
                            </div>
                          )}
                          
                          {/* Upload Input */}
                          <div className="flex items-center gap-4">
                            <input
                              ref={mediaFileInputRef}
                              type="file"
                              accept={contentFormData.type === 'video' 
                                ? 'video/mp4,video/webm,video/ogg' 
                                : 'image/jpeg,image/jpg,image/png,image/webp'}
                              onChange={handleMediaUpload}
                              disabled={uploading}
                              className="hidden"
                              id="media-upload"
                            />
                            <label
                              htmlFor="media-upload"
                              className={`flex-1 px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-lg text-zinc-50 cursor-pointer hover:border-green-500 transition-colors text-center ${
                                uploading ? 'opacity-50 cursor-not-allowed' : ''
                              }`}
                            >
                              {uploading ? 'جاري الرفع...' : `اختر ${contentFormData.type === 'video' ? 'فيديو' : 'صورة'}`}
                            </label>
                            <input
                              type="text"
                              placeholder="أو أدخل رابط الملف (اختياري)"
                              value={contentFormData.media_url}
                              onChange={(e) => {
                                setContentFormData({ ...contentFormData, media_url: e.target.value });
                                setMediaPreview(e.target.value);
                              }}
                              className="flex-1 px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-lg text-zinc-50 focus:outline-none focus:border-green-500"
                            />
                          </div>
                          <p className="text-xs text-zinc-500">
                            {contentFormData.type === 'video' 
                              ? 'الحد الأقصى لحجم الملف: 50 ميجابايت | الصيغ المدعومة: MP4, WebM, OGG | يمكنك ترك هذا الحقل فارغاً لعرض النص فقط'
                              : 'الحد الأقصى لحجم الملف: 5 ميجابايت | الصيغ المدعومة: JPEG, PNG, WebP | يمكنك ترك هذا الحقل فارغاً لعرض النص فقط'}
                          </p>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-zinc-300 mb-2">
                          العنوان الرئيسي
                        </label>
                        <input
                          type="text"
                          value={contentFormData.title || ''}
                          onChange={(e) => setContentFormData({ ...contentFormData, title: e.target.value })}
                          className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-lg text-zinc-50 focus:outline-none focus:border-green-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-zinc-300 mb-2">
                          العنوان الفرعي
                        </label>
                        <input
                          type="text"
                          value={contentFormData.subtitle || ''}
                          onChange={(e) => setContentFormData({ ...contentFormData, subtitle: e.target.value })}
                          className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-lg text-zinc-50 focus:outline-none focus:border-green-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-zinc-300 mb-2">
                          النص العلوي (Eyebrow)
                        </label>
                        <input
                          type="text"
                          value={contentFormData.eyebrow || ''}
                          onChange={(e) => setContentFormData({ ...contentFormData, eyebrow: e.target.value })}
                          className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-lg text-zinc-50 focus:outline-none focus:border-green-500"
                          placeholder="مثال: منهجية • فلسفة • انضباط"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-zinc-300 mb-2">
                          الوصف
                        </label>
                        <textarea
                          value={contentFormData.description || ''}
                          onChange={(e) => setContentFormData({ ...contentFormData, description: e.target.value })}
                          rows={5}
                          className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-lg text-zinc-50 focus:outline-none focus:border-green-500"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-zinc-300 mb-2">
                            ترتيب العرض
                          </label>
                          <input
                            type="number"
                            min="0"
                            value={contentFormData.display_order}
                            onChange={(e) => setContentFormData({ ...contentFormData, display_order: parseInt(e.target.value) || 0 })}
                            className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-lg text-zinc-50 focus:outline-none focus:border-green-500"
                          />
                        </div>

                        <div>
                          <label className="flex items-center gap-3 pt-8">
                            <input
                              type="checkbox"
                              checked={contentFormData.is_active}
                              onChange={(e) => setContentFormData({ ...contentFormData, is_active: e.target.checked })}
                              className="w-4 h-4 text-green-600 bg-zinc-800 border-zinc-600 rounded focus:ring-green-500"
                            />
                            <span className="text-sm font-medium text-zinc-300">نشط</span>
                          </label>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <button
                          type="submit"
                          className="flex-1 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors"
                        >
                          {editingContentItem ? 'تحديث' : 'إضافة'}
                        </button>
                        {editingContentItem && (
                          <button
                            type="button"
                            onClick={resetContentForm}
                            className="px-6 py-3 bg-zinc-700 hover:bg-zinc-600 text-zinc-300 font-semibold rounded-lg transition-colors"
                          >
                            إلغاء
                          </button>
                        )}
                      </div>
                    </form>
                  ) : null}
                </motion.div>
              </div>

              {/* List Sidebar */}
              <div className="lg:col-span-1">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="p-6 rounded-2xl bg-zinc-900/40 backdrop-blur-sm border border-zinc-800/50"
                >
                  <h2 className="text-xl font-bold text-zinc-50 mb-6" dir="rtl">
                    {activeTab === 'blogs' 
                      ? `المقالات (${blogs.length})` 
                      : activeTab === 'services'
                      ? `الخدمات (${services.length})`
                      : `عناصر المحتوى (${contentItems.length})`
                    }
                  </h2>

                  <div className="space-y-4 max-h-[600px] overflow-y-auto">
                    {activeTab === 'blogs' ? (
                      blogs.map((blog) => (
                        <div
                          key={blog.id}
                          className="p-4 rounded-lg bg-zinc-800/30 border border-zinc-700/30 hover:border-green-500/30 transition-colors"
                        >
                          <h3 className="text-sm font-semibold text-zinc-50 mb-2 line-clamp-2" dir="rtl">
                            {blog.title}
                          </h3>
                          <div className="flex gap-2 mt-3">
                            <button
                              onClick={() => handleEdit(blog)}
                              className="flex-1 px-3 py-1.5 text-xs bg-green-500/20 hover:bg-green-500/30 text-green-400 rounded transition-colors"
                            >
                              تعديل
                            </button>
                            <button
                              onClick={() => handleDelete(blog.id)}
                              className="px-3 py-1.5 text-xs bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded transition-colors"
                            >
                              حذف
                            </button>
                          </div>
                        </div>
                      ))
                    ) : activeTab === 'services' ? (
                      services.map((service) => (
                        <div
                          key={service.id}
                          className="p-4 rounded-lg bg-zinc-800/30 border border-zinc-700/30 hover:border-green-500/30 transition-colors"
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-lg">{service.icon}</span>
                            <h3 className="text-sm font-semibold text-zinc-50 line-clamp-1" dir="rtl">
                              {service.title}
                            </h3>
                          </div>
                          <p className="text-xs text-zinc-400 mb-3" dir="rtl">
                            ترتيب: {service.display_order} | {service.is_active ? 'نشط' : 'غير نشط'}
                          </p>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleServiceEdit(service)}
                              className="flex-1 px-3 py-1.5 text-xs bg-green-500/20 hover:bg-green-500/30 text-green-400 rounded transition-colors"
                            >
                              تعديل
                            </button>
                            <button
                              onClick={() => handleServiceDelete(service.id)}
                              className="px-3 py-1.5 text-xs bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded transition-colors"
                            >
                              حذف
                            </button>
                          </div>
                        </div>
                      ))
                    ) : activeTab === 'content' ? (
                      contentItems.map((item) => (
                        <div
                          key={item.id}
                          className="p-4 rounded-lg bg-zinc-800/30 border border-zinc-700/30 hover:border-green-500/30 transition-colors"
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-lg">{item.type === 'video' ? '🎥' : '🖼️'}</span>
                            <h3 className="text-sm font-semibold text-zinc-50 line-clamp-1" dir="rtl">
                              {item.title || `عنصر ${item.type === 'video' ? 'فيديو' : 'صورة'}`}
                            </h3>
                          </div>
                          <p className="text-xs text-zinc-400 mb-3" dir="rtl">
                            ترتيب: {item.display_order} | {item.is_active ? 'نشط' : 'غير نشط'}
                          </p>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleContentItemEdit(item)}
                              className="flex-1 px-3 py-1.5 text-xs bg-green-500/20 hover:bg-green-500/30 text-green-400 rounded transition-colors"
                            >
                              تعديل
                            </button>
                            <button
                              onClick={() => handleContentItemDelete(item.id)}
                              className="px-3 py-1.5 text-xs bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded transition-colors"
                            >
                              حذف
                            </button>
                          </div>
                        </div>
                      ))
                    ) : null}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

