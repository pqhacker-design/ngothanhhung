/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Header } from './components/Header';
import { AppCard } from './components/AppCard';
import { AppDetailModal } from './components/AppDetailModal';
import { AddAppModal } from './components/AddAppModal';
import { AboutModal } from './components/AboutModal';
import { AdminLoginModal } from './components/AdminLoginModal';
import { Footer } from './components/Footer';
import { INITIAL_APPS } from './data/initialApps';
import { WebAppItem } from './types';
import { Plus } from 'lucide-react';

const STORAGE_KEY_APPS = 'ais_user_webapps_collection_v1';
const STORAGE_KEY_LIKES = 'ais_user_webapps_likes_v1';
const STORAGE_KEY_THEME = 'ais_user_theme_preference';
const STORAGE_KEY_ADMIN = 'ais_admin_auth_session';

export default function App() {
  // Theme state
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem(STORAGE_KEY_THEME);
      if (savedTheme) return savedTheme === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // Apply dark mode class to html element
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem(STORAGE_KEY_THEME, 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem(STORAGE_KEY_THEME, 'light');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark((prev) => !prev);

  // Admin authentication state
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(STORAGE_KEY_ADMIN) === 'true';
    }
    return false;
  });

  // Apps state with localStorage persistence
  const [apps, setApps] = useState<WebAppItem[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(STORAGE_KEY_APPS);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        }
      } catch (err) {
        console.error('Error loading saved apps:', err);
      }
    }
    return INITIAL_APPS;
  });

  // Likes state
  const [likes, setLikes] = useState<Record<string, boolean>>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(STORAGE_KEY_LIKES);
        if (saved) return JSON.parse(saved);
      } catch {}
    }
    return {};
  });

  // UI state
  const [activeNav, setActiveNav] = useState('all');

  // Modals state
  const [selectedApp, setSelectedApp] = useState<WebAppItem | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingApp, setEditingApp] = useState<WebAppItem | null>(null);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Hidden file input for JSON import
  const fileInputRef = useRef<HTMLInputElement>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Admin login / logout
  const handleLoginSuccess = () => {
    setIsAdmin(true);
    localStorage.setItem(STORAGE_KEY_ADMIN, 'true');
    showToast('Đăng nhập thành công quyền Admin (pqhacker@gmail.com)!');
  };

  const handleLogoutAdmin = () => {
    setIsAdmin(false);
    localStorage.removeItem(STORAGE_KEY_ADMIN);
    showToast('Đã đăng xuất tài khoản quản trị.');
  };

  const handleTriggerAddApp = () => {
    if (isAdmin) {
      setEditingApp(null);
      setIsAddModalOpen(true);
    } else {
      setIsLoginModalOpen(true);
      showToast('Vui lòng đăng nhập quyền Admin để bổ sung ứng dụng mới.');
    }
  };

  // Persist apps
  const saveApps = (newApps: WebAppItem[]) => {
    setApps(newApps);
    try {
      localStorage.setItem(STORAGE_KEY_APPS, JSON.stringify(newApps));
    } catch (e) {
      console.error('Error saving apps to localStorage:', e);
    }
  };

  // Like toggler
  const handleLikeApp = (id: string) => {
    const isCurrentlyLiked = !!likes[id];
    const newLikes = { ...likes, [id]: !isCurrentlyLiked };
    setLikes(newLikes);
    localStorage.setItem(STORAGE_KEY_LIKES, JSON.stringify(newLikes));

    // Update apps array
    const updated = apps.map((app) => {
      if (app.id === id) {
        const currentCount = app.likesCount || 0;
        return {
          ...app,
          likesCount: isCurrentlyLiked ? Math.max(0, currentCount - 1) : currentCount + 1,
        };
      }
      return app;
    });
    saveApps(updated);
  };

  // Add / Edit app
  const handleSaveApp = (appItem: WebAppItem) => {
    if (!isAdmin) {
      showToast('Yêu cầu quyền quản trị viên!');
      return;
    }
    const exists = apps.some((a) => a.id === appItem.id);
    let updated: WebAppItem[];
    if (exists) {
      updated = apps.map((a) => (a.id === appItem.id ? appItem : a));
      showToast(`Đã cập nhật ứng dụng "${appItem.title}"`);
    } else {
      updated = [appItem, ...apps];
      showToast(`Đã thêm ứng dụng mới "${appItem.title}"`);
    }
    saveApps(updated);
    setEditingApp(null);
  };

  // Delete app
  const handleDeleteApp = (id: string) => {
    if (!isAdmin) {
      showToast('Yêu cầu quyền quản trị viên!');
      return;
    }
    const target = apps.find((a) => a.id === id);
    if (!target) return;
    if (window.confirm(`Bạn có chắc muốn xóa ứng dụng "${target.title}"?`)) {
      const updated = apps.filter((a) => a.id !== id);
      saveApps(updated);
      showToast(`Đã xóa ứng dụng "${target.title}"`);
      if (selectedApp?.id === id) setSelectedApp(null);
    }
  };

  // Export JSON
  const handleExportData = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(apps, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', 'my-webapps-showcase.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Đã tải xuống tệp dữ liệu JSON của bạn!');
  };

  // Import JSON
  const handleImportData = () => {
    if (!isAdmin) {
      setIsLoginModalOpen(true);
      showToast('Chỉ Admin mới có quyền nhập dữ liệu JSON.');
      return;
    }
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        const imported = JSON.parse(content);
        if (Array.isArray(imported) && imported.length > 0) {
          saveApps(imported);
          showToast(`Nhập thành công ${imported.length} ứng dụng!`);
        } else {
          showToast('Định dạng tệp JSON không hợp lệ');
        }
      } catch (err) {
        showToast('Lỗi khi đọc file JSON');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  // Reset to default
  const handleResetData = () => {
    if (!isAdmin) {
      setIsLoginModalOpen(true);
      showToast('Chỉ Admin mới có quyền khôi phục dữ liệu gốc.');
      return;
    }
    if (window.confirm('Khôi phục danh sách ứng dụng ban đầu (AI Test Pro, GoiTenHS, Flashcard...)?')) {
      saveApps(INITIAL_APPS);
      showToast('Đã khôi phục danh mục ứng dụng mặc định.');
    }
  };

  // Nav selection
  const handleNavSelect = (nav: string) => {
    setActiveNav(nav);
    if (nav === 'about') {
      setIsAboutModalOpen(true);
    }
  };

  // Filtered apps based on navigation
  const filteredApps = useMemo(() => {
    return apps
      .filter((app) => {
        if (activeNav === 'featured' && !app.featured) return false;
        if (activeNav === 'classroom' && app.category !== 'classroom-tools' && app.category !== 'ai-education') {
          return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return (b.viewsCount || 0) - (a.viewsCount || 0);
      });
  }, [apps, activeNav]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      {/* Top Bar Contract (3 zones) */}
      <Header
        onOpenAddModal={handleTriggerAddApp}
        onOpenLoginModal={() => setIsLoginModalOpen(true)}
        isAdmin={isAdmin}
        onLogoutAdmin={handleLogoutAdmin}
        isDark={isDark}
        onToggleTheme={toggleTheme}
        activeNav={activeNav}
        onNavSelect={handleNavSelect}
      />

      {/* Admin Notice Strip (if logged in) */}
      {isAdmin && (
        <div className="bg-indigo-600 text-white text-xs py-1.5 px-4 text-center flex items-center justify-center gap-2 font-medium">
          <span>Đang đăng nhập với quyền Quản Trị Viên (pqhacker@gmail.com). Bạn có thể thêm, chỉnh sửa hoặc xóa ứng dụng.</span>
          <button
            onClick={handleLogoutAdmin}
            className="underline hover:text-indigo-200 font-semibold ml-1 cursor-pointer"
          >
            Đăng xuất
          </button>
        </div>
      )}



      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Section Title, Count and Admin Quick Action */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              {activeNav === 'featured'
                ? 'Ứng dụng nổi bật'
                : activeNav === 'classroom'
                ? 'Công cụ lớp học & Khảo thí'
                : 'Danh sách ứng dụng'}
            </h2>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-mono tabular-nums">
              ({filteredApps.length} ứng dụng)
            </span>
          </div>

          <div className="flex items-center gap-3">
            {isAdmin && (
              <button
                onClick={handleTriggerAddApp}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Thêm ứng dụng mới</span>
              </button>
            )}
          </div>
        </div>

        {/* Empty State */}
        {filteredApps.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 p-12 text-center bg-white dark:bg-slate-900/50">
            <h3 className="text-base font-semibold text-slate-800 dark:text-slate-200">
              Chưa có ứng dụng nào trong danh mục này
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
              Bạn có thể chọn danh mục khác hoặc đăng nhập Admin để bổ sung ứng dụng.
            </p>
            <div className="mt-5 flex items-center justify-center gap-3">
              <button
                onClick={() => setActiveNav('all')}
                className="px-4 py-2 text-xs font-medium border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                Xem tất cả ứng dụng
              </button>
              {isAdmin && (
                <button
                  onClick={handleTriggerAddApp}
                  className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Thêm ứng dụng mới</span>
                </button>
              )}
            </div>
          </div>
        ) : (
          /* Cards Grid View - 4 per row */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredApps.map((app) => (
              <AppCard
                key={app.id}
                app={app}
                viewMode="grid"
                onSelectApp={(clickedApp) => setSelectedApp(clickedApp)}
                onLikeApp={handleLikeApp}
                isLiked={!!likes[app.id]}
                isAdmin={isAdmin}
                onEditApp={(clickedApp) => {
                  setEditingApp(clickedApp);
                  setIsAddModalOpen(true);
                }}
                onDeleteApp={handleDeleteApp}
              />
            ))}
          </div>
        )}
      </main>

      {/* Hidden file input for JSON import */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".json,application/json"
        className="hidden"
      />

      {/* Detail / Interactive Preview Modal */}
      <AppDetailModal
        app={selectedApp}
        onClose={() => setSelectedApp(null)}
        onLikeApp={handleLikeApp}
        isLiked={selectedApp ? !!likes[selectedApp.id] : false}
      />

      {/* Add / Edit App Modal */}
      <AddAppModal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setEditingApp(null);
        }}
        onSave={handleSaveApp}
        editingApp={editingApp}
      />

      {/* About Author Modal */}
      <AboutModal
        isOpen={isAboutModalOpen}
        onClose={() => setIsAboutModalOpen(false)}
        totalApps={apps.length}
      />

      {/* Admin Login Modal */}
      <AdminLoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onSuccess={handleLoginSuccess}
      />

      {/* Footer */}
      <Footer
        onExportData={handleExportData}
        onImportData={handleImportData}
        onResetData={handleResetData}
        totalApps={apps.length}
        isAdmin={isAdmin}
        onOpenLoginModal={() => setIsLoginModalOpen(true)}
        onLogoutAdmin={handleLogoutAdmin}
      />

      {/* Global Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-xs font-medium py-2.5 px-4 rounded-xl shadow-xl border border-slate-700 dark:border-slate-200 animate-in fade-in slide-in-from-bottom-2 z-60">
          {toastMessage}
        </div>
      )}
    </div>
  );
}
