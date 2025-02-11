const xlsx = require('xlsx');
const path = require('path');

// Initial translation data
const translations = [
  { key: 'site.title', en: 'Knowledge Hub', vi: 'Kho Kiến Thức' },
  { key: 'site.description', en: 'Discover insights on technology, personal growth, and making a positive impact', vi: 'Khám phá những hiểu biết về công nghệ, phát triển bản thân và tạo tác động tích cực' },
  { key: 'nav.home', en: 'Home', vi: 'Trang Chủ' },
  { key: 'nav.blog', en: 'Blog', vi: 'Blog' },
  { key: 'nav.resources', en: 'Resources', vi: 'Tài Nguyên' },
  { key: 'nav.about', en: 'About', vi: 'Giới Thiệu' },
  { key: 'hero.title', en: 'Welcome to My Knowledge Hub', vi: 'Chào Mừng Đến Với Kho Kiến Thức' },
  { key: 'hero.subtitle', en: 'Discover insights on technology, personal growth, and making a positive impact', vi: 'Khám phá những hiểu biết về công nghệ, phát triển bản thân và tạo tác động tích cực' },
  { key: 'hero.description', en: 'Exploring the intersection of technology and social impact through thoughtful analysis and practical insights', vi: 'Khám phá sự giao thoa giữa công nghệ và tác động xã hội thông qua phân tích sâu sắc và những hiểu biết thực tế' },
  { key: 'hero.cta.primary', en: 'Explore Resources', vi: 'Khám Phá Tài Nguyên' },
  { key: 'hero.cta.secondary', en: 'View Blog', vi: 'Xem Blog' },
  { key: 'newsletter.title', en: 'Subscribe to Newsletter', vi: 'Đăng Ký Nhận Bản Tin' },
  { key: 'newsletter.description', en: 'Get the latest insights delivered to your inbox', vi: 'Nhận những thông tin mới nhất qua email' },
  { key: 'newsletter.placeholder', en: 'Enter your email', vi: 'Nhập email của bạn' },
  { key: 'newsletter.button', en: 'Subscribe', vi: 'Đăng Ký' },
  { key: 'newsletter.success', en: 'Thank you for subscribing!', vi: 'Cảm ơn bạn đã đăng ký!' },
  { key: 'newsletter.error', en: 'Something went wrong. Please try again.', vi: 'Đã xảy ra lỗi. Vui lòng thử lại.' }
];

// Create a new workbook
const workbook = xlsx.utils.book_new();

// Convert data to worksheet
const worksheet = xlsx.utils.json_to_sheet(translations);

// Set column widths
const colWidths = [
  { wch: 30 },  // key column
  { wch: 50 },  // en column
  { wch: 50 }   // vi column
];
worksheet['!cols'] = colWidths;

// Add the worksheet to the workbook
xlsx.utils.book_append_sheet(workbook, worksheet, 'Translations');

// Write to file
const filePath = path.join(__dirname, '../translations/translations.xlsx');
xlsx.writeFile(workbook, filePath);

console.log('✅ Translation template created successfully!'); 