import React from 'react';
import { Sparkles } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative pt-10 pb-8 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Heading */}
        <div className="max-w-3xl">
          <div className="text-xs font-semibold tracking-wider text-indigo-600 dark:text-indigo-400 uppercase mb-2 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Danh mục dự án số & giải pháp giáo dục · Thầy Ngô Thanh Hùng</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
            Kho Ứng Dụng Web & Tiện Ích Tương Tác
          </h1>

          <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
            Tổng hợp các ứng dụng web thông minh phục vụ kiểm tra, khảo thí tự động, vòng quay gọi tên và các công cụ hỗ trợ giảng dạy số hoá hiện đại.
          </p>
        </div>
      </div>
    </section>
  );
};
