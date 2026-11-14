import React, { useState } from 'react';
import { ExternalLink, Eye, Heart, Copy, Check, Sparkles, Globe, Edit3, Trash2 } from 'lucide-react';
import { WebAppItem, ViewMode } from '../types';

interface AppCardProps {
  app: WebAppItem;
  viewMode: ViewMode;
  onSelectApp: (app: WebAppItem) => void;
  onLikeApp: (id: string) => void;
  isLiked: boolean;
  isAdmin?: boolean;
  onEditApp?: (app: WebAppItem) => void;
  onDeleteApp?: (id: string) => void;
}

export const AppCard: React.FC<AppCardProps> = ({
  app,
  viewMode,
  onSelectApp,
  onLikeApp,
  isLiked,
  isAdmin = false,
  onEditApp,
  onDeleteApp,
}) => {
  const [copied, setCopied] = useState(false);
  const [imgError, setImgError] = useState(false);

  const handleCopyUrl = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(app.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpenExternal = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(app.url, '_blank', 'noopener,noreferrer');
  };

  const domainName = (() => {
    try {
      const parsed = new URL(app.url);
      return parsed.hostname + (parsed.pathname !== '/' ? parsed.pathname : '');
    } catch {
      return app.url;
    }
  })();

  if (viewMode === 'compact') {
    return (
      <div
        onClick={() => onSelectApp(app)}
        className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 hover:border-indigo-300 dark:hover:border-indigo-700/60 hover:shadow-md transition-all cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
      >
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <div className="w-16 h-12 rounded-lg overflow-hidden shrink-0 border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800 relative">
            {!imgError ? (
              <img
                src={app.imageUrl}
                alt={`Giao diện ${app.title}`}
                referrerPolicy="no-referrer"
                onError={() => setImgError(true)}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-xs text-slate-400">
                <Globe className="w-5 h-5 text-indigo-500" />
              </div>
            )}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h3 className="text-base font-semibold text-slate-900 dark:text-white truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {app.title}
              </h3>
              {app.featured && (
                <span className="text-[11px] font-medium text-amber-600 dark:text-amber-400 flex items-center gap-0.5">
                  <Sparkles className="w-3 h-3" /> Nổi bật
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
              {app.tagline}
            </p>
            {/* Clean unboxed metadata with separators */}
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mt-1">
              <span>{domainName}</span>
              <span aria-hidden="true">·</span>
              <span>{app.targetAudience}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onLikeApp(app.id);
            }}
            className={`p-2 rounded-lg border text-xs flex items-center gap-1 transition-colors ${
              isLiked
                ? 'border-rose-200 bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:border-rose-900 dark:text-rose-400'
                : 'border-slate-200 dark:border-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-rose-500 text-rose-500' : ''}`} />
            <span className="tabular-nums font-mono text-xs">{(app.likesCount || 0) + (isLiked ? 1 : 0)}</span>
          </button>

          <button
            type="button"
            onClick={handleCopyUrl}
            title="Sao chép liên kết"
            className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
          </button>

          {isAdmin && onEditApp && onDeleteApp && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onEditApp(app);
                }}
                title="Chỉnh sửa ứng dụng (Admin)"
                className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                <Edit3 className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteApp(app.id);
                }}
                title="Xóa ứng dụng (Admin)"
                className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </>
          )}

          <button
            type="button"
            onClick={handleOpenExternal}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 active:bg-indigo-800 transition-colors"
          >
            <span>Mở app</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <article
      onClick={() => onSelectApp(app)}
      className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-lg transition-all duration-200 flex flex-col cursor-pointer"
    >
      {/* Browser Mockup Window Header */}
      <div className="bg-slate-100/90 dark:bg-slate-800/90 border-b border-slate-200 dark:border-slate-700/80 px-3.5 py-2 flex items-center justify-between gap-2">
        {/* Mock window control buttons */}
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
        </div>

        {/* Mock address bar */}
        <div className="flex-1 max-w-xs mx-auto bg-white/80 dark:bg-slate-900/80 rounded-md px-2.5 py-0.5 text-[11px] font-mono text-slate-500 dark:text-slate-400 flex items-center justify-center gap-1.5 truncate border border-slate-200/60 dark:border-slate-700/60">
          <Globe className="w-3 h-3 text-slate-400 shrink-0" />
          <span className="truncate">{domainName}</span>
        </div>

        {/* Quick action: copy link */}
        <button
          type="button"
          onClick={handleCopyUrl}
          title="Sao chép URL ứng dụng"
          className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors shrink-0"
        >
          {copied ? (
            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">Đã chép</span>
          ) : (
            <Copy className="w-3 h-3" />
          )}
        </button>
      </div>

      {/* App Screenshot / Mockup Image Preview */}
      <div className="relative aspect-video w-full overflow-hidden bg-slate-950/5 dark:bg-slate-950/40 border-b border-slate-100 dark:border-slate-800">
        {!imgError ? (
          <img
            src={app.imageUrl}
            alt={`Ảnh chụp giao diện của ${app.title}`}
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 to-slate-100 dark:from-slate-900 dark:to-indigo-950/30 p-6 text-center">
            <Globe className="w-10 h-10 text-indigo-500 mb-2" />
            <span className="font-semibold text-slate-800 dark:text-slate-200 text-sm">{app.title}</span>
            <span className="text-xs text-slate-500 dark:text-slate-400 mt-1">{domainName}</span>
          </div>
        )}

        {/* Floating Quick Action Overlay on Hover */}
        <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-[2px]">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelectApp(app);
            }}
            className="px-3.5 py-2 rounded-lg bg-white/95 text-slate-900 text-xs font-semibold hover:bg-white transition-colors flex items-center gap-1.5 shadow-md"
          >
            <Eye className="w-3.5 h-3.5 text-indigo-600" />
            <span>Xem chi tiết</span>
          </button>
          <button
            type="button"
            onClick={handleOpenExternal}
            className="px-3.5 py-2 rounded-lg bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700 transition-colors flex items-center gap-1.5 shadow-md"
          >
            <span>Mở app</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Unboxed Metadata with Typographic Separator (Zero-Pill Rule) */}
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-2">
            <span>{app.targetAudience}</span>
            <span aria-hidden="true">·</span>
            <span>{app.status === 'popular' ? 'Phổ biến' : app.status === 'new' ? 'Mới ra mắt' : 'Hoạt động'}</span>
            {app.featured && (
              <>
                <span aria-hidden="true">·</span>
                <span className="text-amber-600 dark:text-amber-400 font-medium">Nổi bật</span>
              </>
            )}
          </div>

          {/* Primary App Title */}
          <h2 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
            {app.title}
          </h2>

          {/* Tagline */}
          <p className="mt-1 text-sm font-medium text-slate-700 dark:text-slate-300 line-clamp-2">
            {app.tagline}
          </p>

          {/* Short Description */}
          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed">
            {app.description}
          </p>

          {/* Key Features Bullets */}
          {app.features && app.features.length > 0 && (
            <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800">
              <div className="text-[11px] font-semibold text-slate-600 dark:text-slate-300 mb-1.5">
                Tính năng cốt lõi:
              </div>
              <ul className="space-y-1">
                {app.features.slice(0, 2).map((feat, idx) => (
                  <li key={idx} className="text-xs text-slate-600 dark:text-slate-400 flex items-start gap-1.5">
                    <span className="text-indigo-500 font-bold mt-0.5">✓</span>
                    <span className="line-clamp-1">{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Clean Tags: Unboxed text separated by dots */}
          <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-slate-500 dark:text-slate-400">
            {app.tags.slice(0, 3).map((tag, idx) => (
              <React.Fragment key={idx}>
                <span>#{tag}</span>
                {idx < Math.min(app.tags.length, 3) - 1 && <span aria-hidden="true">·</span>}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Action Row */}
        <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onLikeApp(app.id);
              }}
              title="Yêu thích ứng dụng"
              className={`p-1.5 rounded-lg border text-xs flex items-center gap-1 transition-colors ${
                isLiked
                  ? 'border-rose-200 bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:border-rose-900 dark:text-rose-400'
                  : 'border-slate-200 dark:border-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-rose-500 text-rose-500' : ''}`} />
              <span className="tabular-nums font-mono text-[11px]">{(app.likesCount || 0) + (isLiked ? 1 : 0)}</span>
            </button>

            {isAdmin && onEditApp && onDeleteApp && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEditApp(app);
                  }}
                  title="Chỉnh sửa ứng dụng này (Admin)"
                  className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteApp(app.id);
                  }}
                  title="Xóa ứng dụng này (Admin)"
                  className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onSelectApp(app);
              }}
              className="px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Chi tiết
            </button>
            <button
              type="button"
              onClick={handleOpenExternal}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 active:bg-indigo-800 transition-colors shadow-xs"
            >
              <span>Mở ứng dụng</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};
