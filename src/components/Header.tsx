import React from 'react';
import { Plus, Sun, Moon, Lock, LogOut, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  onOpenAddModal: () => void;
  onOpenLoginModal: () => void;
  isAdmin: boolean;
  onLogoutAdmin: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
  activeNav: string;
  onNavSelect: (nav: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenAddModal,
  onOpenLoginModal,
  isAdmin,
  onLogoutAdmin,
  isDark,
  onToggleTheme,
  activeNav,
  onNavSelect,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand wordmark (single text element) */}
        <button
          onClick={() => onNavSelect('all')}
          className="text-lg font-bold tracking-tight text-slate-900 dark:text-white whitespace-nowrap shrink-0 flex items-center gap-2 hover:opacity-80 transition-opacity text-left"
        >
          <span className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow-sm">
            TH
          </span>
          <span>Thầy Ngô Hùng AI</span>
        </button>

        {/* Zone 2: 4-5 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
          <button
            onClick={() => onNavSelect('all')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-indigo-600 dark:hover:text-indigo-400 ${
              activeNav === 'all'
                ? 'text-indigo-600 dark:text-indigo-400 font-semibold border-b-2 border-indigo-600 dark:border-indigo-400 pb-1'
                : 'text-slate-600 dark:text-slate-300'
            }`}
          >
            Tất cả ứng dụng
          </button>
          <button
            onClick={() => onNavSelect('featured')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-indigo-600 dark:hover:text-indigo-400 ${
              activeNav === 'featured'
                ? 'text-indigo-600 dark:text-indigo-400 font-semibold border-b-2 border-indigo-600 dark:border-indigo-400 pb-1'
                : 'text-slate-600 dark:text-slate-300'
            }`}
          >
            Ứng dụng nổi bật
          </button>
          <button
            onClick={() => onNavSelect('classroom')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-indigo-600 dark:hover:text-indigo-400 ${
              activeNav === 'classroom'
                ? 'text-indigo-600 dark:text-indigo-400 font-semibold border-b-2 border-indigo-600 dark:border-indigo-400 pb-1'
                : 'text-slate-600 dark:text-slate-300'
            }`}
          >
            Lớp học & Khảo thí
          </button>
          <button
            onClick={() => onNavSelect('about')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-indigo-600 dark:hover:text-indigo-400 ${
              activeNav === 'about'
                ? 'text-indigo-600 dark:text-indigo-400 font-semibold border-b-2 border-indigo-600 dark:border-indigo-400 pb-1'
                : 'text-slate-600 dark:text-slate-300'
            }`}
          >
            Giới thiệu tác giả
          </button>
        </nav>

        {/* Zone 3: 1 primary action button + Admin auth & theme toggle */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={isDark ? 'Chuyển sang giao diện sáng' : 'Chuyển sang giao diện tối'}
            className="p-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100 rounded-lg border border-slate-200 dark:border-slate-800 transition-colors"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>

          {isAdmin ? (
            <div className="flex items-center gap-2">
              <button
                onClick={onOpenAddModal}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 active:bg-indigo-800 transition-colors shadow-sm whitespace-nowrap shrink-0"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Thêm ứng dụng</span>
              </button>

              <button
                onClick={onLogoutAdmin}
                title="Đăng xuất tài khoản quản trị (pqhacker@gmail.com)"
                className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-rose-600 dark:hover:text-rose-400 rounded-lg border border-slate-200 dark:border-slate-700 transition-colors whitespace-nowrap shrink-0"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Đăng xuất</span>
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenLoginModal}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-lg transition-colors whitespace-nowrap shrink-0"
            >
              <Lock className="w-3.5 h-3.5 text-indigo-500" />
              <span>Đăng nhập Admin</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
