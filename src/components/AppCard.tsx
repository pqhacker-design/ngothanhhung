import React, { useState } from 'react';
import { ExternalLink, Eye, Heart, Copy, Check, Sparkles, Globe, Edit3, Trash2 } from 'lucide-react';
import { WebAppItem, ViewMode } from '../types';
import { normalizeImageUrl } from '../utils/imageUrl';

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
                src={normalizeImageUrl(app.imageUrl)}
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
      className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden hover:border-indigo-300 dark:hover:border-indigo-700/60 hover:shadow-md transition-all duration-200 flex flex-col cursor-pointer"
    >
      {/* Compact Browser Mockup Header */}
      <div className="bg-slate-100/90 dark:bg-slate-800/90 border-b border-slate-200 dark:border-slate-700/80 px-2.5 py-1.5 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1 shrink-0">
          <span className="w-2 h-2 rounded-full bg-rose-400" />
          <span className="w-2 h-2 rounded-full bg-amber-400" />
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
        </div>

        <div className="flex-1 min-w-0 bg-white/80 dark:bg-slate-900/80 rounded px-2 py-0.5 text-[10px] font-mono text-slate-500 dark:text-slate-400 flex items-center justify-center gap-1 truncate border border-slate-200/60 dark:border-slate-700/60">
          <Globe className="w-2.5 h-2.5 text-slate-400 shrink-0" />
          <span className="truncate">{domainName}</span>
        </div>

        <button
          type="button"
          onClick={handleCopyUrl}
          title="Sao chép URL ứng dụng"
          className="p-0.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors shrink-0"
        >
          {copied ? (
            <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
          ) : (
            <Copy className="w-3 h-3" />
          )}
        </button>
      </div>

      {/* App Screenshot / Mockup Image Preview */}
      <div className="relative aspect-video w-full overflow-hidden bg-slate-950/5 dark:bg-slate-950/40 border-b border-slate-100 dark:border-slate-800">
        {!imgError ? (
          <img
            src={normalizeImageUrl(app.imageUrl)}
            alt={`Ảnh chụp giao diện của ${app.title}`}
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 to-slate-100 dark:from-slate-900 dark:to-indigo-950/30 p-4 text-center">
            <Globe className="w-7 h-7 text-indigo-500 mb-1.5" />
            <span className="font-semibold text-slate-800 dark:text-slate-200 text-xs truncate max-w-full">{app.title}</span>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 truncate max-w-full">{domainName}</span>
          </div>
        )}

        {/* Quick Hover Overlay */}
        <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 backdrop-blur-[1px]">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelectApp(app);
            }}
            className="px-2.5 py-1.5 rounded-lg bg-white/95 text-slate-900 text-[11px] font-semibold hover:bg-white transition-colors flex items-center gap-1 shadow-md whitespace-nowrap shrink-0"
          >
            <Eye className="w-3 h-3 text-indigo-600" />
            <span>Chi tiết</span>
          </button>
          <button
            type="button"
            onClick={handleOpenExternal}
            className="px-2.5 py-1.5 rounded-lg bg-indigo-600 text-white text-[11px] font-semibold hover:bg-indigo-700 transition-colors flex items-center gap-1 shadow-md whitespace-nowrap shrink-0"
          >
            <span>Mở app</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Compact Card Body */}
      <div className="p-3.5 flex-1 flex flex-col justify-between">
        <div>
          {/* Unboxed Metadata */}
          <div className="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400 mb-1 truncate">
            <span>{app.status === 'popular' ? 'Phổ biến' : app.status === 'new' ? 'Mới ra mắt' : 'Hoạt động'}</span>
            {app.featured && (
              <>
                <span aria-hidden="true">·</span>
                <span className="text-amber-600 dark:text-amber-400 font-medium">Nổi bật</span>
              </>
            )}
          </div>

          {/* App Title */}
          <h2 className="text-[15px] font-bold text-slate-900 dark:text-white tracking-tight leading-snug line-clamp-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
            {app.title}
          </h2>

          {/* Concise Tagline */}
          <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
            {app.tagline}
          </p>
        </div>

        {/* Compact Action Row */}
        <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-1.5">
          <div className="flex items-center gap-1 shrink-0">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onLikeApp(app.id);
              }}
              title="Yêu thích ứng dụng"
              className={`px-1.5 py-1 rounded-md border text-[11px] flex items-center gap-1 transition-colors whitespace-nowrap shrink-0 ${
                isLiked
                  ? 'border-rose-200 bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:border-rose-900 dark:text-rose-400'
                  : 'border-slate-200 dark:border-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <Heart className={`w-3 h-3 ${isLiked ? 'fill-rose-500 text-rose-500' : ''}`} />
              <span className="tabular-nums font-mono">{(app.likesCount || 0) + (isLiked ? 1 : 0)}</span>
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
                  className="p-1 rounded-md border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  <Edit3 className="w-3 h-3" />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteApp(app.id);
                  }}
                  title="Xóa ứng dụng (Admin)"
                  className="p-1 rounded-md border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </>
            )}
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onSelectApp(app);
              }}
              className="px-2 py-1 text-[11px] font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0"
            >
              Chi tiết
            </button>
            <button
              type="button"
              onClick={handleOpenExternal}
              className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 active:bg-indigo-800 transition-colors shadow-xs whitespace-nowrap shrink-0"
            >
              <span>Mở app</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};
