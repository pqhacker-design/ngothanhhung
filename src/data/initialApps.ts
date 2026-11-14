import { WebAppItem } from '../types';

import aitestproImg from '../assets/images/aitestpro_preview_1794380157331.jpg';
import goitenhsImg from '../assets/images/goitenhs_preview_1794380158400.jpg';
import smartflashImg from '../assets/images/smartflash_preview_1794380159223.jpg';
import classroomtimerImg from '../assets/images/classroomtimer_preview_1794380165456.jpg';

export const INITIAL_APPS: WebAppItem[] = [
  {
    id: 'aitestpro',
    title: 'AI Test Pro',
    tagline: 'Hệ thống khởi tạo ma trận đề thi & ngân hàng câu hỏi tự động bằng AI',
    description: 'AI Test Pro là giải pháp số hóa toàn diện dành cho giáo viên và các đơn vị giáo dục. Ứng dụng hỗ trợ phân tích chuyên đề, tự động sinh hàng loạt câu hỏi trắc nghiệm khách quan và bài tập tự luận theo chuẩn 4 mức độ nhận thức (Nhận biết, Thông hiểu, Vận dụng, Vận dụng cao), xuất file Word và PDF chuẩn phông chữ sư phạm.',
    url: 'https://aitestpro.vercel.app/',
    imageUrl: aitestproImg,
    category: 'ai-education',
    tags: ['AI Tạo đề thi', 'Ngân hàng câu hỏi', 'Ma trận kiểm tra', 'Trắc nghiệm online'],
    features: [
      'Tự động sinh đề kiểm tra 15 phút, 1 tiết, học kỳ chuẩn ma trận',
      'Phân loại độ khó câu hỏi tự động với gợi ý đáp án chi tiết',
      'Ngân hàng đề lưu trữ đám mây, dễ dàng chỉnh sửa và trộn đề',
      'Hỗ trợ xuất bản in Word (.docx) và PDF với mã đề linh hoạt'
    ],
    targetAudience: 'Giáo viên bộ môn, Tổ chuyên môn trường học, Trung tâm luyện thi',
    status: 'popular',
    featured: true,
    viewsCount: 3840,
    likesCount: 295,
    createdAt: '2025-01-15',
    isCustom: false
  },
  {
    id: 'goitenhs',
    title: 'Gọi Tên Học Sinh (GoiTenHS)',
    tagline: 'Vòng quay may mắn & bộ công cụ tương tác lớp học hiện đại cho giáo viên',
    description: 'GoiTenHS biến các buổi vấn đáp, kiểm tra bài cũ và hoạt động nhóm trở nên công bằng, sinh động và tràn ngập tiếng cười. Với giao diện tối ưu hóa cho màn hình tương tác và máy chiếu lớp học, giáo viên chỉ cần 1 cú click để quay ngẫu nhiên học sinh, kiểm diện sĩ số và ghi nhận điểm phát biểu tức thì.',
    url: 'https://goitenhs.vercel.app/',
    imageUrl: goitenhsImg,
    category: 'classroom-tools',
    tags: ['Vòng quay may mắn', 'Điểm danh sĩ số', 'Chế độ máy chiếu', 'Tương tác học sinh'],
    features: [
      'Vòng quay ngẫu nhiên mượt mà kèm âm thanh hào hứng và pháo hoa ăn mừng',
      'Quản lý danh sách lớp học không giới hạn, nhập dữ liệu nhanh từ Excel/Text',
      'Chế độ máy chiếu toàn màn hình (Teacher Presentation Mode) sắc nét',
      'Ghi nhận điểm cộng/trừ và lưu trạng thái vắng mặt trong buổi học'
    ],
    targetAudience: 'Giáo viên các cấp từ Tiểu học, THCS đến THPT, Giảng viên đại học',
    status: 'popular',
    featured: true,
    viewsCount: 5210,
    likesCount: 432,
    createdAt: '2025-02-01',
    isCustom: false
  },
  {
    id: 'smartflash',
    title: 'Smart Flashcards & Spaced Repetition',
    tagline: 'Ứng dụng ôn tập thẻ ghi nhớ tối ưu đường cong quên lãng theo thuật toán SM-2',
    description: 'Nền tảng học tập thông minh dựa trên kỹ thuật ghi nhớ lặp lại ngắt quãng (Spaced Repetition). Tự động phân bổ lịch ôn tập từ vựng, thuật ngữ khoa học và công thức toán học vào đúng thời điểm não bộ chuẩn bị quên, gia tăng hiệu suất ghi nhớ dài hạn lên đến 300%.',
    url: 'https://smartflash-learn.vercel.app/',
    imageUrl: smartflashImg,
    category: 'learning-study',
    tags: ['Thẻ ghi nhớ Flashcard', 'Spaced Repetition', 'Học từ vựng', 'Ghi nhớ dài hạn'],
    features: [
      'Thuật toán SM-2 điều chỉnh thời gian lặp lại thông minh theo độ khó',
      'Tạo bộ thẻ flashcard nhanh với hỗ trợ hình ảnh và phát âm chuẩn bản ngữ',
      'Bảng điều khiển theo dõi tỷ lệ duy trì kiến thức theo ngày và tuần',
      'Chế độ tự động lật thẻ rảnh tay kết hợp phím tắt thao tác nhanh'
    ],
    targetAudience: 'Học sinh ôn thi ngoại ngữ (IELTS/TOEIC), Sinh viên khối ngành y dược & kỹ thuật',
    status: 'new',
    featured: true,
    viewsCount: 2190,
    likesCount: 184,
    createdAt: '2025-02-18',
    isCustom: false
  },
  {
    id: 'classroomtimer',
    title: 'Classroom Hub & Activity Timer',
    tagline: 'Bộ công cụ quản lý nhịp độ lớp học, đếm ngược thảo luận nhóm & đo âm lượng',
    description: 'Ứng dụng trình chiếu chuyên dụng trên bảng thông minh tại các lớp học hiện đại. Tích hợp đồng hồ đếm ngược trạm hoạt động nhóm, máy đo âm lượng tiếng ồn trực quan để nhắc nhở trật tự lớp, cùng bảng ghi chú nhanh cho giáo viên giảng bài.',
    url: 'https://classhub-tools.vercel.app/',
    imageUrl: classroomtimerImg,
    category: 'classroom-tools',
    tags: ['Đồng hồ đếm ngược', 'Máy đo tiếng ồn', 'Chia nhóm ngẫu nhiên', 'Bảng thông minh'],
    features: [
      'Đồng hồ đếm ngược đa dạng kịch bản với âm thanh báo hết giờ rõ ràng',
      'Đo độ ồn phòng học theo thời gian thực (Sound Level Meter) với ngưỡng cảnh báo',
      'Chia nhóm và bốc thăm nhóm thuyết trình ngẫu nhiên chống trùng lặp',
      'Giao diện Dark Mode tương phản cao, dịu mắt khi chiếu máy chiếu thời gian dài'
    ],
    targetAudience: 'Giáo viên chủ nhiệm, Giáo viên dạy bộ môn kỹ năng, Điều phối viên workshop',
    status: 'live',
    featured: false,
    viewsCount: 1640,
    likesCount: 129,
    createdAt: '2025-02-24',
    isCustom: false
  }
];

export const CATEGORIES = [
  { id: 'all', label: 'Tất cả ứng dụng' },
  { id: 'ai-education', label: 'AI & Khảo thí' },
  { id: 'classroom-tools', label: 'Tiện ích lớp học' },
  { id: 'learning-study', label: 'Công cụ học tập' },
  { id: 'productivity', label: 'Năng suất' }
] as const;
