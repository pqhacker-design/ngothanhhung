import React from 'react';
import { X, User, Phone, MessageSquare, School, MapPin, Sparkles, Mail } from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
  totalApps: number;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose, totalApps }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2.5">
              <span className="w-9 h-9 rounded-xl bg-indigo-600/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                <User className="w-5 h-5" />
              </span>
              <div>
                <h2 className="text-base font-bold text-slate-900 dark:text-white">
                  Thông Tin Tác Giả & Nhà Phát Triển
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Dự án số hóa công cụ giáo dục và tiện ích lớp học
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Author Profile Card */}
          <div className="mt-5 p-5 rounded-2xl bg-gradient-to-br from-indigo-50/70 to-slate-50 dark:from-slate-800/80 dark:to-slate-850 border border-indigo-100/80 dark:border-slate-700/80">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-1">
                  Tác giả phát triển
                </div>
                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
                  Ngô Thanh Hùng
                </h3>
                <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300">
                  <School className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                  <span>Giáo viên trường THCS Bình San - Mỹ Đức</span>
                </div>
              </div>

              <div className="text-left sm:text-right">
                <div className="text-xs text-slate-500 dark:text-slate-400">Tổng sản phẩm</div>
                <div className="text-lg font-bold text-slate-900 dark:text-white font-mono tabular-nums">
                  {totalApps} Ứng dụng
                </div>
              </div>
            </div>

            {/* Contact links */}
            <div className="mt-4 pt-4 border-t border-slate-200/60 dark:border-slate-700/60 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <a
                href="tel:0913117321"
                className="flex items-center gap-2 p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-indigo-400 hover:text-indigo-600 transition-all text-xs font-medium group"
              >
                <div className="w-7 h-7 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center shrink-0">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] text-slate-400">Số điện thoại</div>
                  <div className="font-mono font-bold text-slate-900 dark:text-white group-hover:text-indigo-600">0913.117.321</div>
                </div>
              </a>

              <a
                href="https://zalo.me/0913117321"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-indigo-400 hover:text-indigo-600 transition-all text-xs font-medium group"
              >
                <div className="w-7 h-7 rounded-lg bg-sky-50 dark:bg-sky-950/60 text-sky-600 flex items-center justify-center shrink-0">
                  <MessageSquare className="w-3.5 h-3.5" />
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] text-slate-400">Liên hệ Zalo</div>
                  <div className="font-mono font-bold text-slate-900 dark:text-white group-hover:text-indigo-600">0913.117.321</div>
                </div>
              </a>
            </div>
          </div>

          {/* Mission description */}
          <div className="mt-5 space-y-3">
            <h4 className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              Mục tiêu & Định hướng phát triển
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Các ứng dụng được xây dựng xuất phát từ thực tế giảng dạy và quản lý lớp học tại trường THCS Bình San - Mỹ Đức, nhằm hỗ trợ giáo viên tiết kiệm thời gian chuẩn bị giáo án, tạo đề kiểm tra ma trận tự động và giúp học sinh hào hứng hơn trong mỗi tiết học tương tác.
            </p>

            <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
              <li className="flex items-start gap-2">
                <span className="text-indigo-600 font-bold">•</span>
                <span><strong>AI Test Pro:</strong> Giải pháp ứng dụng AI tạo đề thi và ngân hàng câu hỏi nhanh chóng theo chuẩn ma trận.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-600 font-bold">•</span>
                <span><strong>GoiTenHS:</strong> Vòng quay may mắn gọi tên ngẫu nhiên kết hợp điểm danh số hóa trên màn hình chiếu lớp học.</span>
              </li>
            </ul>
          </div>

          {/* Footer Action */}
          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div className="text-xs text-slate-400">
              Trường THCS Bình San - Mỹ Đức
            </div>
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors"
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
