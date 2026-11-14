import React, { useState, useEffect } from 'react';
import { X, ExternalLink, Copy, Check, Heart, Sparkles, Globe, Monitor, Smartphone, Share2, Layers } from 'lucide-react';
import { WebAppItem } from '../types';
import { normalizeImageUrl } from '../utils/imageUrl';

interface AppDetailModalProps {
  app: WebAppItem | null;
  onClose: () => void;
  onLikeApp: (id: string) => void;
  isLiked: boolean;
}

export const AppDetailModal: React.FC<AppDetailModalProps> = ({
  app,
  onClose,
  onLikeApp,
  isLiked,
}) => {
  const [viewTab, setViewTab] = useState<'screenshot' | 'interactive'>('screenshot');
  const [copied, setCopied] = useState(false);
  const [showShareNotification, setShowShareNotification] = useState(false);
  const [iframeError, setIframeError] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!app) return null;

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(app.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: app.title,
        text: app.tagline,
        url: app.url,
      }).catch(() => {});
    } else {
      handleCopyUrl();
      setShowShareNotification(true);
      setTimeout(() => setShowShareNotification(false), 2500);
    }
  };

  const domainName = (() => {
    try {
      const parsed = new URL(app.url);
      return parsed.hostname;
    } catch {
      return app.url;
    }
  })();

  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(
    app.url
  )}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-5xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col my-auto max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4 bg-slate-50/80 dark:bg-slate-800/80">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/10 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-sm shrink-0">
              <Globe className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white truncate">
                  {app.title}
                </h2>
                {app.featured && (
                  <span className="text-[11px] font-medium text-amber-600 dark:text-amber-400 flex items-center gap-0.5 shrink-0">
                    <Sparkles className="w-3 h-3" /> Nổi bật
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                <span>{domainName}</span>
                <span aria-hidden="true">·</span>
                <span>{app.targetAudience}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => onLikeApp(app.id)}
              className={`p-2 rounded-lg border text-xs flex items-center gap-1 transition-colors ${
                isLiked
                  ? 'border-rose-200 bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:border-rose-900 dark:text-rose-400'
                  : 'border-slate-200 dark:border-slate-700 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
              title="Yêu thích"
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-rose-500 text-rose-500' : ''}`} />
              <span className="tabular-nums font-mono text-xs">{(app.likesCount || 0) + (isLiked ? 1 : 0)}</span>
            </button>

            <button
              onClick={handleShare}
              title="Chia sẻ"
              className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
            >
              <Share2 className="w-4 h-4" />
            </button>

            <a
              href={app.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors shadow-sm"
            >
              <span>Mở website</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={onClose}
              aria-label="Đóng cửa sổ"
              className="p-2 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* View Mode Segmented Controls */}
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
              <button
                onClick={() => setViewTab('screenshot')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors flex items-center gap-1.5 ${
                  viewTab === 'screenshot'
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Monitor className="w-3.5 h-3.5" />
                <span>Ảnh chụp giao diện</span>
              </button>
              <button
                onClick={() => setViewTab('interactive')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors flex items-center gap-1.5 ${
                  viewTab === 'interactive'
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Globe className="w-3.5 h-3.5" />
                <span>Khung chạy thử Web (Iframe)</span>
              </button>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <span className="font-mono">{app.url}</span>
              <button
                onClick={handleCopyUrl}
                className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                title="Sao chép link"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Media Viewport */}
          <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-950/5 dark:bg-slate-950/40">
            {viewTab === 'screenshot' ? (
              <div className="relative aspect-video w-full overflow-hidden flex items-center justify-center bg-slate-900">
                <img
                  src={normalizeImageUrl(app.imageUrl)}
                  alt={`Giao diện ${app.title}`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain"
                />
              </div>
            ) : (
              <div className="relative w-full h-[520px] bg-slate-100 dark:bg-slate-900 flex flex-col">
                <div className="p-2 bg-slate-200/80 dark:bg-slate-800 text-[11px] text-slate-600 dark:text-slate-400 flex items-center justify-between px-4 border-b border-slate-300 dark:border-slate-700">
                  <span className="truncate">Đang nhúng trải nghiệm: {app.url}</span>
                  <a
                    href={app.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 font-medium ml-2 shrink-0"
                  >
                    Mở tab riêng nếu bị chặn hiển thị <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                {!iframeError ? (
                  <iframe
                    src={app.url}
                    title={app.title}
                    onError={() => setIframeError(true)}
                    className="w-full flex-1 border-0"
                    sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                  />
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                    <Globe className="w-12 h-12 text-slate-400 mb-3" />
                    <h4 className="text-base font-semibold text-slate-800 dark:text-slate-200">
                      Trang web này bảo mật không cho phép nhúng trực tiếp qua Iframe
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mt-1 mb-4">
                      Một số website trên Vercel kích hoạt chính sách X-Frame-Options để bảo vệ. Bạn vẫn có thể mở và sử dụng đầy đủ 100% tính năng bằng nút bên dưới:
                    </p>
                    <a
                      href={app.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5"
                    >
                      <span>Mở ứng dụng ngay</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Detail Grid: Info + QR Code */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
            {/* Left 2 Columns: Description & Features */}
            <div className="lg:col-span-2 space-y-5">
              <div>
                <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                  Giới thiệu tổng quan
                </h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {app.description}
                </p>
              </div>

              {app.features && app.features.length > 0 && (
                <div>
                  <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-2.5 flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                    <span>Các tính năng nổi bật</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {app.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 flex items-start gap-2.5"
                      >
                        <span className="w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                          ✓
                        </span>
                        <span className="text-xs text-slate-700 dark:text-slate-300 leading-snug">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tags: Unboxed text */}
              <div>
                <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">
                  Từ khóa liên quan:
                </div>
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-600 dark:text-slate-300">
                  {app.tags.map((tag, idx) => (
                    <React.Fragment key={idx}>
                      <span>#{tag}</span>
                      {idx < app.tags.length - 1 && <span aria-hidden="true">·</span>}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Mobile Quick Scan & Launch Box */}
            <div className="space-y-4">
              {/* QR Code Card */}
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 flex flex-col items-center text-center">
                <div className="text-xs font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5 mb-2">
                  <Smartphone className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  <span>Quét mã QR để mở trên điện thoại</span>
                </div>
                <div className="p-2 bg-white rounded-lg border border-slate-200 dark:border-slate-700 shadow-xs mb-2">
                  <img
                    src={qrCodeUrl}
                    alt={`Mã QR mở ${app.title}`}
                    className="w-32 h-32 object-contain"
                  />
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 max-w-[200px]">
                  Dùng camera điện thoại quét để thử ngay ứng dụng trên di động.
                </p>
              </div>

              {/* Direct Access Box */}
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
                <div className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Địa chỉ truy cập chính thức:
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-2">
                  <span className="text-xs font-mono text-indigo-600 dark:text-indigo-400 truncate">
                    {app.url}
                  </span>
                  <button
                    onClick={handleCopyUrl}
                    className="p-1 rounded text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 shrink-0"
                    title="Sao chép"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>

                <a
                  href={app.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                >
                  <span>Truy cập {app.title}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/80 dark:bg-slate-800/80">
          <div className="text-xs text-slate-500 dark:text-slate-400">
            Ngày cập nhật: <span className="font-mono tabular-nums">{app.createdAt}</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            Đóng
          </button>
        </div>
      </div>

      {showShareNotification && (
        <div className="fixed bottom-6 right-6 bg-slate-900 text-white text-xs py-2 px-4 rounded-lg shadow-lg animate-in fade-in slide-in-from-bottom-2 z-60">
          Đã sao chép liên kết ứng dụng vào bộ nhớ tạm!
        </div>
      )}
    </div>
  );
};
