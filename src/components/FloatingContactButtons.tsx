import { Phone } from 'lucide-react';
import { Language } from '../types/visa';

interface FloatingContactButtonsProps {
  language: Language;
}

const HOTLINE_RAW = '0911909686';
const HOTLINE_DISPLAY = '0911 909 686';
const CONTACT_EMAIL = 'visa5giay@gmail.com';

export function FloatingContactButtons({ language }: FloatingContactButtonsProps) {
  const zaloLabel =
    language === 'en' ? `Chat on Zalo · ${HOTLINE_DISPLAY}` : `Nhắn Zalo · ${HOTLINE_DISPLAY}`;
  const gmailLabel =
    language === 'en' ? `Send Gmail · ${CONTACT_EMAIL}` : `Gửi Gmail · ${CONTACT_EMAIL}`;
  const callAriaLabel =
    language === 'en' ? `Call ${HOTLINE_DISPLAY}` : `Gọi ngay ${HOTLINE_DISPLAY}`;

  return (
    <div
      aria-label={language === 'en' ? 'Quick contact channels' : 'Kênh liên hệ nhanh'}
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-row sm:flex-col items-center sm:items-end gap-2 sm:gap-3"
    >
      {/* Zalo Button */}
      <a
        href={`https://zalo.me/${HOTLINE_RAW}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={zaloLabel}
        title={zaloLabel}
        className="group relative flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#0068FF] hover:bg-[#0055D4] text-white shadow-lg transition-transform duration-200 hover:-translate-y-0.5 focus-ring-brand shrink-0"
      >
        <span className="hidden sm:block pointer-events-none opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-150 absolute right-14 px-3 py-1.5 rounded-lg bg-[#0F172A] text-white text-xs font-semibold whitespace-nowrap shadow-md">
          {zaloLabel}
        </span>
        <svg
          viewBox="0 0 48 48"
          className="w-6 h-6"
          aria-hidden="true"
          fill="none"
        >
          <path
            d="M24 6C13.507 6 5 13.45 5 22.64c0 5.21 2.742 9.86 7.037 12.905-.286 2.382-1.158 4.92-2.297 6.322-.34.418-.018 1.033.516.956 3.015-.433 6.314-1.694 8.43-3.133A21.37 21.37 0 0 0 24 40.28c10.493 0 19-7.45 19-16.64C43 13.45 34.493 6 24 6Z"
            fill="currentColor"
          />
          <text
            x="24"
            y="27"
            textAnchor="middle"
            fill="#0068FF"
            fontSize="12.5"
            fontWeight="800"
            fontFamily="system-ui, -apple-system, sans-serif"
            letterSpacing="-0.4"
          >
            Zalo
          </text>
        </svg>
      </a>

      {/* Gmail Button */}
      <a
        href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
          CONTACT_EMAIL
        )}&su=${encodeURIComponent(
          language === 'en' ? 'U.S. Visa Advisory Inquiry — Visa5S' : 'Tư vấn Hồ sơ Visa Mỹ — Visa5S'
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={gmailLabel}
        title={gmailLabel}
        className="group relative flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white hover:bg-[#F8FAFC] border border-[#CBD5E1] shadow-lg transition-transform duration-200 hover:-translate-y-0.5 focus-ring-brand shrink-0"
      >
        <span className="hidden sm:block pointer-events-none opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-150 absolute right-14 px-3 py-1.5 rounded-lg bg-[#0F172A] text-white text-xs font-semibold whitespace-nowrap shadow-md">
          {gmailLabel}
        </span>
        <svg
          viewBox="0 0 24 24"
          className="w-5 h-5"
          aria-hidden="true"
        >
          <path
            fill="#4285F4"
            d="M2.5 6.8A2.3 2.3 0 0 1 4.8 4.5h.7L12 9.4l6.5-4.9h.7a2.3 2.3 0 0 1 2.3 2.3v10.4a2.3 2.3 0 0 1-2.3 2.3h-2.2V10.6L12 14.3 7 10.6v8.9H4.8a2.3 2.3 0 0 1-2.3-2.3V6.8Z"
          />
          <path
            fill="#34A853"
            d="M17 19.5h2.2a2.3 2.3 0 0 0 2.3-2.3V9.5L17 12.9v6.6Z"
          />
          <path
            fill="#FBBC05"
            d="M2.5 9.5v7.7a2.3 2.3 0 0 0 2.3 2.3H7v-6.6L2.5 9.5Z"
          />
          <path
            fill="#EA4335"
            d="M17 12.9 21.5 9.5V6.8a2.3 2.3 0 0 0-3.7-1.8L12 9.4 6.2 5a2.3 2.3 0 0 0-3.7 1.8v2.7L7 12.9l5 3.7 5-3.7Z"
          />
        </svg>
      </a>

      {/* Call Button */}
      <a
        href={`tel:${HOTLINE_RAW}`}
        aria-label={callAriaLabel}
        title={callAriaLabel}
        className="group relative flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#E11D25] hover:bg-[#B91C1C] text-white shadow-lg transition-transform duration-200 hover:-translate-y-0.5 focus-ring-brand shrink-0"
      >
        <span className="hidden sm:block pointer-events-none opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-150 absolute right-14 px-3 py-1.5 rounded-lg bg-[#0F172A] text-white text-xs font-semibold whitespace-nowrap shadow-md">
          {callAriaLabel}
        </span>
        <Phone className="w-5 h-5 shrink-0" />
      </a>
    </div>
  );
}
