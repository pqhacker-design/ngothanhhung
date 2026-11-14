import React from 'react';
import { Download, Upload, RotateCcw, ExternalLink, MessageSquare } from 'lucide-react';

interface FooterProps {
  onExportData: () => void;
  onImportData: () => void;
  onResetData: () => void;
  totalApps: number;
  isAdmin: boolean;
  onOpenLoginModal: () => void;
  onLogoutAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onExportData,
  onImportData,
  onResetData,
  isAdmin,
}) => {
  return (
    <footer className="mt-10 bg-slate-900 dark:bg-slate-900/95 text-slate-200 border-t-2 border-indigo-600 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row items-center justify-between gap-3 text-xs sm:text-[13px]">
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-2 gap-y-1 text-slate-300">
          <span className="font-semibold text-white">
            © {new Date().getFullYear()} Thầy Ngô Thanh Hùng
          </span>
          <span aria-hidden="true" className="text-slate-500">·</span>
          <span>Trường THCS Bình San - Mỹ Đức</span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 font-medium">
          {isAdmin && (
            <>
              <button
                type="button"
                onClick={onExportData}
                className="text-slate-300 hover:text-white transition-colors flex items-center gap-1 whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Xuất JSON</span>
              </button>
              <button
                type="button"
                onClick={onImportData}
                className="text-slate-300 hover:text-white transition-colors flex items-center gap-1 whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Nhập JSON</span>
              </button>
              <button
                type="button"
                onClick={onResetData}
                className="text-slate-300 hover:text-rose-300 transition-colors flex items-center gap-1 whitespace-nowrap shrink-0 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Khôi phục</span>
              </button>
              <span aria-hidden="true" className="text-slate-600">|</span>
            </>
          )}

          <a
            href="https://aitestpro.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-200 hover:text-indigo-300 transition-colors flex items-center gap-1 whitespace-nowrap shrink-0"
          >
            <span>AI Test Pro</span>
            <ExternalLink className="w-3.5 h-3.5 text-indigo-400" />
          </a>

          <span aria-hidden="true" className="text-slate-600">·</span>

          <a
            href="https://goitenhs.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-200 hover:text-indigo-300 transition-colors flex items-center gap-1 whitespace-nowrap shrink-0"
          >
            <span>GoiTenHS</span>
            <ExternalLink className="w-3.5 h-3.5 text-indigo-400" />
          </a>

          <span aria-hidden="true" className="text-slate-600">·</span>

          <a
            href="https://zalo.me/0913117321"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sky-300 hover:text-sky-200 font-semibold transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span className="tabular-nums">Zalo: 0913.117.321</span>
          </a>
        </div>
      </div>
    </footer>
  );
};
