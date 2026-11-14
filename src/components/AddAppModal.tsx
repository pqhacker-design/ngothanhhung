import React, { useState, useEffect } from 'react';
import { X, Plus, Globe, Image as ImageIcon, Sparkles, Check } from 'lucide-react';
import { WebAppItem, AppCategory } from '../types';
import { CATEGORIES } from '../data/initialApps';

interface AddAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (app: WebAppItem) => void;
  editingApp?: WebAppItem | null;
}

const PRESET_IMAGES = [
  { label: 'Giao diện AI Test Pro', url: '/src/assets/images/aitestpro_preview_1794380157331.jpg' },
  { label: 'Giao diện Gọi Tên HS', url: '/src/assets/images/goitenhs_preview_1794380158400.jpg' },
  { label: 'Giao diện Flashcard Học tập', url: '/src/assets/images/smartflash_preview_1794380159223.jpg' },
  { label: 'Giao diện Bộ đếm & Tiện ích Lớp', url: '/src/assets/images/classroomtimer_preview_1794380165456.jpg' },
];

export const AddAppModal: React.FC<AddAppModalProps> = ({
  isOpen,
  onClose,
  onSave,
  editingApp,
}) => {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [tagline, setTagline] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<AppCategory>('ai-education');
  const [imageUrl, setImageUrl] = useState(PRESET_IMAGES[0].url);
  const [tagsInput, setTagsInput] = useState('');
  const [featuresInput, setFeaturesInput] = useState('');
  const [targetAudience, setTargetAudience] = useState('Giáo viên & Học sinh');
  const [featured, setFeatured] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (editingApp) {
      setTitle(editingApp.title);
      setUrl(editingApp.url);
      setTagline(editingApp.tagline);
      setDescription(editingApp.description);
      setCategory(editingApp.category);
      setImageUrl(editingApp.imageUrl);
      setTagsInput(editingApp.tags.join(', '));
      setFeaturesInput(editingApp.features.join('\n'));
      setTargetAudience(editingApp.targetAudience);
      setFeatured(!!editingApp.featured);
    } else {
      setTitle('');
      setUrl('');
      setTagline('');
      setDescription('');
      setCategory('ai-education');
      setImageUrl(PRESET_IMAGES[0].url);
      setTagsInput('');
      setFeaturesInput('');
      setTargetAudience('Giáo viên & Học sinh');
      setFeatured(false);
    }
    setErrors({});
  }, [editingApp, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!title.trim()) newErrors.title = 'Vui lòng nhập tên ứng dụng';
    if (!url.trim()) {
      newErrors.url = 'Vui lòng nhập đường dẫn ứng dụng';
    } else if (!url.startsWith('http://') && !url.startsWith('https://')) {
      newErrors.url = 'URL cần bắt đầu bằng https:// hoặc http://';
    }
    if (!tagline.trim()) newErrors.tagline = 'Vui lòng nhập khẩu hiệu hoặc mô tả ngắn';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const tags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const features = featuresInput
      .split('\n')
      .map((f) => f.trim())
      .filter(Boolean);

    const appItem: WebAppItem = {
      id: editingApp ? editingApp.id : `app_${Date.now()}`,
      title: title.trim(),
      url: url.trim(),
      tagline: tagline.trim(),
      description: description.trim() || tagline.trim(),
      category,
      imageUrl: imageUrl.trim() || PRESET_IMAGES[0].url,
      tags: tags.length > 0 ? tags : ['Ứng dụng Web'],
      features: features.length > 0 ? features : ['Giao diện trực quan', 'Hoạt động đa nền tảng'],
      targetAudience: targetAudience.trim() || 'Người dùng trực tuyến',
      status: 'live',
      featured,
      viewsCount: editingApp?.viewsCount || 1,
      likesCount: editingApp?.likesCount || 0,
      createdAt: editingApp?.createdAt || new Date().toISOString().split('T')[0],
      isCustom: true,
    };

    onSave(appItem);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col my-auto max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/80">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-sm">
              <Plus className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                {editingApp ? 'Chỉnh sửa ứng dụng' : 'Thêm ứng dụng mới vào danh mục'}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Thêm thông tin và liên kết ứng dụng web bạn đã tạo
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Tên ứng dụng <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ví dụ: AI Test Pro, GoiTenHS..."
                className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
              {errors.title && <p className="text-xs text-rose-500 mt-1">{errors.title}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Đường dẫn URL ứng dụng <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.vercel.app/"
                className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none font-mono text-xs"
              />
              {errors.url && <p className="text-xs text-rose-500 mt-1">{errors.url}</p>}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Khẩu hiệu / Giới thiệu ngắn gọn <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              placeholder="Ví dụ: Hệ thống tạo đề kiểm tra thông minh bằng AI"
              className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
            {errors.tagline && <p className="text-xs text-rose-500 mt-1">{errors.tagline}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Phân loại chuyên mục
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as AppCategory)}
                className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              >
                {CATEGORIES.filter((c) => c.id !== 'all').map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Đối tượng sử dụng chính
              </label>
              <input
                type="text"
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                placeholder="Ví dụ: Giáo viên bộ môn, Học sinh..."
                className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Mô tả chi tiết ứng dụng
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Nêu rõ mục đích, cách hoạt động và giá trị thực tế của ứng dụng..."
              className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Tính năng nổi bật (mỗi dòng 1 tính năng)
            </label>
            <textarea
              rows={3}
              value={featuresInput}
              onChange={(e) => setFeaturesInput(e.target.value)}
              placeholder="Tạo câu hỏi tự động&#10;Xuất file Word & PDF&#10;Chấm điểm trực tuyến"
              className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none font-mono text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Từ khóa / Thẻ phân loại (ngăn cách bằng dấu phẩy)
            </label>
            <input
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="AI Đề thi, Vòng quay, Toán học, Lớp học"
              className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          {/* Screenshot selection */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <ImageIcon className="w-3.5 h-3.5" />
                <span>Hình ảnh giao diện ứng dụng (Chọn mẫu hoặc nhập link ảnh)</span>
              </span>
            </label>

            {/* Presets */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-2">
              {PRESET_IMAGES.map((preset, idx) => (
                <button
                  type="button"
                  key={idx}
                  onClick={() => setImageUrl(preset.url)}
                  className={`p-1 rounded-lg border text-left transition-all relative overflow-hidden group ${
                    imageUrl === preset.url
                      ? 'border-indigo-600 ring-2 ring-indigo-500/30'
                      : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'
                  }`}
                >
                  <div className="aspect-video w-full rounded overflow-hidden bg-slate-100 dark:bg-slate-800 mb-1">
                    <img src={preset.url} alt={preset.label} className="w-full h-full object-cover" />
                  </div>
                  <div className="text-[10px] text-slate-600 dark:text-slate-400 truncate px-1 font-medium">
                    {preset.label}
                  </div>
                  {imageUrl === preset.url && (
                    <div className="absolute top-1.5 right-1.5 w-4 h-4 bg-indigo-600 text-white rounded-full flex items-center justify-center text-[10px]">
                      <Check className="w-2.5 h-2.5" />
                    </div>
                  )}
                </button>
              ))}
            </div>

            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="Hoặc dán URL ảnh chụp màn hình trực tiếp tại đây..."
              className="w-full px-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none font-mono"
            />
          </div>

          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="featured_app"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
              className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500"
            />
            <label htmlFor="featured_app" className="text-xs font-medium text-slate-700 dark:text-slate-300 cursor-pointer">
              Đánh dấu là ứng dụng nổi bật (ưu tiên hiển thị lên đầu)
            </label>
          </div>

          {/* Form Actions */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors shadow-sm"
            >
              {editingApp ? 'Lưu thay đổi' : 'Hoàn tất thêm ứng dụng'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
