import { Globe } from 'lucide-react';
import { UI_COPY } from '../data/visaData';
import { AppScreen, Language } from '../types/visa';

interface FooterProps {
  language: Language;
  onChangeLanguage: (lang: Language) => void;
  onNavigate: (screen: AppScreen) => void;
}

export function Footer({ language, onChangeLanguage, onNavigate }: FooterProps) {
  const copy = UI_COPY[language].nav;

  const handleNav = (screen: AppScreen) => {
    onNavigate(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#15195E] text-[#EEF2FF] border-t border-[#2A3199]">
      <div className="max-w-[1240px] mx-auto px-5 md:px-8 lg:px-12 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-10 border-b border-white/15">
          <div className="md:col-span-5 space-y-4">
            <div className="inline-block bg-white rounded-xl px-3.5 py-2">
              <img
                src="/assets/aistudio/image_5dd9c7ec.png"
                alt="Visa5S — Hãy Đến Nơi Nào Bạn Muốn"
                referrerPolicy="no-referrer"
                className="h-12 w-auto object-contain"
              />
            </div>
            <p className="text-sm leading-relaxed text-[#D5DCF9] max-w-md">
              {language === 'en'
                ? 'Full-package U.S. non-immigrant visa advisory for Tourism (B2), Business (B1), Family Visit (B2), and Postal Visa Renewal.'
                : 'Dịch vụ xin visa Mỹ trọn gói chuyên biệt: Visa Du lịch (B2), Visa Công tác (B1), Visa Thăm thân và Gia hạn Visa Mỹ qua đường bưu điện.'}
            </p>
            <div className="pt-2 flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 text-xs text-[#D5DCF9]">
                <Globe className="w-3.5 h-3.5 text-[#F87171]" />
                {language === 'en' ? 'Portal Language' : 'Ngôn ngữ cổng thông tin'}
              </span>
              <div className="inline-flex items-center rounded-lg bg-[#0F134A] p-1 border border-white/10">
                <button
                  type="button"
                  onClick={() => onChangeLanguage('en')}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                    language === 'en'
                      ? 'bg-[#E11D25] text-white'
                      : 'text-[#D5DCF9] hover:text-white'
                  }`}
                >
                  EN
                </button>
                <button
                  type="button"
                  onClick={() => onChangeLanguage('vi')}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                    language === 'vi'
                      ? 'bg-[#E11D25] text-white'
                      : 'text-[#D5DCF9] hover:text-white'
                  }`}
                >
                  VI
                </button>
              </div>
            </div>
          </div>

          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-semibold tracking-wider text-[#FCA5A5]">
              {language === 'en' ? 'Portal Sections' : 'Danh mục chính'}
            </div>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('overview')}
                  className="text-[#E0E7FF] hover:text-white transition-colors cursor-pointer"
                >
                  {copy.overview}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('pathways')}
                  className="text-[#E0E7FF] hover:text-white transition-colors cursor-pointer"
                >
                  {copy.pathways}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('assessment')}
                  className="text-[#E0E7FF] hover:text-white transition-colors cursor-pointer"
                >
                  {copy.assessment}
                </button>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4 space-y-3">
            <div className="text-xs font-semibold tracking-wider text-[#FCA5A5]">
              {language === 'en' ? 'Advisory Offices & Hotline' : 'Văn phòng Tiếp nhận & Hotline'}
            </div>
            <ul className="space-y-2.5 text-sm text-[#E0E7FF]">
              <li>
                <span className="font-semibold text-white">
                  {language === 'en' ? 'Ho Chi Minh City:' : 'TP. Hồ Chí Minh:'}
                </span>{' '}
                {language === 'en' ? 'Advisory Headquarters' : 'Trụ sở tư vấn hồ sơ'} · 0911 909 686
              </li>
              <li>
                <span className="font-semibold text-white">
                  {language === 'en' ? 'Binh Duong:' : 'Bình Dương:'}
                </span>{' '}
                {language === 'en' ? 'Regional Branch' : 'Chi nhánh tiếp nhận hồ sơ'} · 0967 686 101
              </li>
              <li>
                <span className="font-semibold text-white">
                  {language === 'en' ? 'Hanoi:' : 'Hà Nội:'}
                </span>{' '}
                {language === 'en' ? 'Northern Advisory Desk' : 'Chi nhánh khu vực miền Bắc'} · 0911 909 686
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#C7D2FE]">
          <p>
            © 2026 Visa5S.{' '}
            {language === 'en'
              ? 'Independent private consultancy — not affiliated with any government agency.'
              : 'Đơn vị tư vấn độc lập — không trực thuộc cơ quan Chính phủ Hoa Kỳ.'}
          </p>
          <p className="font-mono tabular-nums text-white">
            visa5giay@gmail.com · 0911 909 686
          </p>
        </div>
      </div>
    </footer>
  );
}
