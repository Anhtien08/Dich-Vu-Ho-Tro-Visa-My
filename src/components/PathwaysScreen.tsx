import { CalendarCheck2, Check, ChevronRight, Clock, PhoneCall } from 'lucide-react';
import { useState } from 'react';
import { CONSULATES, VISA_PATHWAYS } from '../data/visaData';
import { Language, VisaCategoryId, VisaFilterGroup } from '../types/visa';
import { LegalDisclaimerBlock } from './LegalDisclaimerBlock';

interface PathwaysScreenProps {
  language: Language;
  onSelectForAssessment: (
    visaId: VisaCategoryId,
    consulate: string,
    priorRefusal: boolean
  ) => void;
}

export function PathwaysScreen({
  language,
  onSelectForAssessment,
}: PathwaysScreenProps) {
  const [filter, setFilter] = useState<VisaFilterGroup>('all');
  const [selectedVisaId, setSelectedVisaId] = useState<VisaCategoryId>('tourism');
  const [applicantsCount, setApplicantsCount] = useState<number>(1);
  const [expeditedReview, setExpeditedReview] = useState<boolean>(false);
  const [selectedConsulate, setSelectedConsulate] = useState<string>(CONSULATES[0]);

  const filteredPathways =
    filter === 'all'
      ? VISA_PATHWAYS
      : VISA_PATHWAYS.filter((p) => p.filterGroup === filter);

  const activePlannerVisa =
    VISA_PATHWAYS.find((p) => p.id === selectedVisaId) ?? VISA_PATHWAYS[0];

  const filterTabs: { id: VisaFilterGroup; label: string }[] = [
    { id: 'all', label: language === 'en' ? 'All Services' : 'Tất cả Diện' },
    {
      id: 'tourism-visit',
      label: language === 'en' ? 'Tourism & Family Visit' : 'Du lịch & Thăm thân',
    },
    { id: 'business', label: language === 'en' ? 'Business (B1)' : 'Công tác (B1)' },
    {
      id: 'renewal',
      label: language === 'en' ? 'Postal Renewal' : 'Gia hạn Bưu điện',
    },
  ];

  const workflowSteps =
    language === 'en'
      ? [
          'Profile audit & DS-160 strategy',
          'DS-160 drafting & document organization',
          'Consular booking or postal drop-box setup',
          '1-on-1 mock interview & passport delivery',
        ]
      : [
          'Tư vấn thẩm định & xây dựng lộ trình',
          'Khai DS-160 chuẩn xác & sắp xếp chứng từ',
          'Đặt lịch phỏng vấn hoặc gửi bưu điện',
          'Luyện phỏng vấn 1-1 & giao nhận kết quả',
        ];

  return (
    <div className="max-w-[1240px] mx-auto px-5 md:px-8 lg:px-12 py-10 md:py-14 space-y-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#E2E8F0]">
        <div className="space-y-2 max-w-2xl">
          <p className="text-xs font-semibold text-[#E11D25]">
            {language === 'en'
              ? 'Service Scope & Dossier Preparation'
              : 'Phạm vi Dịch vụ & Lộ trình Hồ sơ'}
          </p>
          <h1 className="font-display text-3xl md:text-4xl font-extrabold text-[#1E247E] tracking-[-0.015em] [text-wrap:balance]">
            {language === 'en'
              ? 'U.S. Visa Full-Package Services'
              : 'Dịch vụ Xin Visa Mỹ Trọn gói tại Visa5S'}
          </h1>
          <p className="text-sm md:text-base text-[#334155] leading-relaxed">
            {language === 'en'
              ? 'Comprehensive support across four U.S. non-immigrant categories: Tourist (B2), Business (B1), Family Visit (B2), and Postal Renewal.'
              : 'Hỗ trợ chuyên sâu trọn gói bốn diện thị thực Hoa Kỳ: Du lịch (B2), Công tác (B1), Thăm thân (B2) và Gia hạn qua bưu điện.'}
          </p>
        </div>

        {/* Segmented Filter Tabs */}
        <div
          role="tablist"
          aria-label="Filter visa pathways"
          className="inline-flex flex-wrap items-center gap-1 p-1 bg-[#F1F5F9] rounded-lg border border-[#E2E8F0] shrink-0"
        >
          {filterTabs.map((tab) => {
            const active = filter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setFilter(tab.id)}
                className={`px-3 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  active
                    ? 'bg-white text-[#1E247E] shadow-sm'
                    : 'text-[#475569] hover:text-[#1E247E]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Split: Detailed Pathways List + Dossier Preparation Planner */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 space-y-6">
          {filteredPathways.map((pathway) => (
            <article
              key={pathway.id}
              className={`bg-white rounded-xl p-6 space-y-5 ${
                pathway.tierHighlight === 'waiver'
                  ? 'shadow-executive-accent'
                  : pathway.tierHighlight === 'popular'
                    ? 'border-[1.5px] border-[#1E247E]'
                    : 'border border-[#E2E8F0]'
              }`}
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="text-xs font-medium text-[#475569]">
                    {pathway.kicker[language]}
                  </div>
                  <h2 className="font-display text-xl font-bold text-[#1E247E]">
                    {pathway.code} — {pathway.title[language]}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedVisaId(pathway.id)}
                  className={`h-9 px-3.5 rounded-lg text-xs font-semibold border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    selectedVisaId === pathway.id
                      ? 'bg-[#EEF2FF] border-[#1E247E] text-[#1E247E]'
                      : 'bg-white border-[#CBD5E1] text-[#334155] hover:border-[#1E247E]'
                  }`}
                >
                  {selectedVisaId === pathway.id
                    ? language === 'en'
                      ? 'Selected in Planner'
                      : 'Đang xem lộ trình'
                    : language === 'en'
                      ? 'View Process'
                      : 'Xem lộ trình'}
                </button>
              </div>

              <p className="text-sm text-[#334155] leading-relaxed">
                {pathway.summary[language]}
              </p>

              {/* Key specs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4 border-y border-[#E2E8F0] text-sm">
                <div>
                  <div className="text-xs text-[#475569]">
                    {language === 'en' ? 'Prep Turnaround' : 'Thời gian chuẩn bị'}
                  </div>
                  <div className="font-semibold text-[#1E247E] mt-0.5">
                    {pathway.typicalTimeline[language]}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-[#475569]">
                    {language === 'en' ? 'Typical Visa Validity' : 'Thời hạn thị thực'}
                  </div>
                  <div className="font-semibold text-[#0F172A] mt-0.5">
                    {pathway.validityPeriod[language]}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-xs font-semibold text-[#1E247E]">
                  {language === 'en' ? 'Primary Consular Focus' : 'Trọng tâm Thẩm định Lãnh sự'}
                </div>
                <p className="text-xs text-[#475569] leading-relaxed">
                  {pathway.consularFocus[language]}
                </p>
              </div>

              <ul className="space-y-1.5">
                {pathway.keyRequirements.map((req, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-[#334155]">
                    <Check className="w-3.5 h-3.5 text-[#E11D25] shrink-0 mt-0.5" />
                    <span>{req[language]}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={() =>
                    onSelectForAssessment(pathway.id, selectedConsulate, false)
                  }
                  className="h-10 px-5 rounded-lg bg-[#E11D25] hover:bg-[#B91C1C] text-white text-xs font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>
                    {language === 'en'
                      ? `Start ${pathway.code} Assessment`
                      : `Đánh giá Hồ sơ ${pathway.code}`}
                  </span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Sticky Dossier Preparation Planner */}
        <aside className="lg:col-span-5 lg:sticky lg:top-24">
          <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-ambient p-6 md:p-7 space-y-6">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="font-display text-xl font-bold text-[#1E247E]">
                  {language === 'en'
                    ? 'Dossier Preparation Planner'
                    : 'Công cụ Lập Lộ trình Hồ sơ'}
                </h2>
                <p className="text-xs text-[#475569] mt-1">
                  {language === 'en'
                    ? 'Configure your visa class, submission channel, and review speed.'
                    : 'Chọn diện thị thực, địa điểm nộp hồ sơ và mức độ ưu tiên xử lý.'}
                </p>
              </div>
              <div className="w-9 h-9 rounded-lg bg-[#EEF2FF] text-[#1E247E] flex items-center justify-center shrink-0">
                <CalendarCheck2 className="w-4 h-4" />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="planner-visa"
                  className="block text-sm font-semibold text-[#334155] mb-1.5"
                >
                  {language === 'en' ? 'Visa Category' : 'Diện thị thực'}
                </label>
                <select
                  id="planner-visa"
                  value={selectedVisaId}
                  onChange={(e) => setSelectedVisaId(e.target.value as VisaCategoryId)}
                  className="w-full h-12 px-3.5 rounded-lg bg-white border border-[#CBD5E1] text-sm font-medium text-[#0F172A] input-visa cursor-pointer"
                >
                  {VISA_PATHWAYS.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.code} — {p.title[language]}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="planner-consulate"
                  className="block text-sm font-semibold text-[#334155] mb-1.5"
                >
                  {language === 'en' ? 'Submission Channel / Consulate' : 'Kênh nộp hồ sơ / Lãnh sự quán'}
                </label>
                <select
                  id="planner-consulate"
                  value={selectedConsulate}
                  onChange={(e) => setSelectedConsulate(e.target.value)}
                  className="w-full h-12 px-3.5 rounded-lg bg-white border border-[#CBD5E1] text-sm font-medium text-[#0F172A] input-visa cursor-pointer"
                >
                  {CONSULATES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label
                    htmlFor="planner-applicants"
                    className="text-sm font-semibold text-[#334155]"
                  >
                    {language === 'en' ? 'Applicants / Family Members' : 'Số lượng Đương đơn'}
                  </label>
                  <span className="font-mono text-sm font-bold text-[#1E247E] tabular-nums">
                    {applicantsCount}
                  </span>
                </div>
                <input
                  id="planner-applicants"
                  type="range"
                  min={1}
                  max={6}
                  value={applicantsCount}
                  onChange={(e) => setApplicantsCount(Number(e.target.value))}
                  className="w-full accent-[#1E247E] cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-[#475569] font-mono tabular-nums">
                  <span>1</span>
                  <span>2</span>
                  <span>3</span>
                  <span>4</span>
                  <span>5</span>
                  <span>6</span>
                </div>
              </div>

              <label className="flex items-start gap-3 p-3.5 rounded-lg border border-[#E2E8F0] hover:bg-[#F8FAFC] cursor-pointer">
                <input
                  type="checkbox"
                  checked={expeditedReview}
                  onChange={(e) => setExpeditedReview(e.target.checked)}
                  className="mt-0.5 w-5 h-5 rounded accent-[#1E247E] cursor-pointer"
                />
                <div className="text-xs leading-relaxed">
                  <div className="font-semibold text-[#1E247E]">
                    {language === 'en'
                      ? 'Priority 48-Hour Dossier Audit'
                      : 'Thẩm định & Chuẩn hóa Hồ sơ Ưu tiên (48h)'}
                  </div>
                  <div className="text-[#475569]">
                    {language === 'en'
                      ? 'Dedicated senior specialist review for urgent travel dates.'
                      : 'Chuyên viên cao cấp xử lý ưu tiên cho lịch khởi hành gấp.'}
                  </div>
                </div>
              </label>
            </div>

            {/* Process & Timeline Summary */}
            <div className="pt-5 border-t border-[#E2E8F0] space-y-4 text-sm">
              <div className="flex items-start justify-between gap-4">
                <div className="inline-flex items-center gap-1.5 text-xs font-medium text-[#475569]">
                  <Clock className="w-3.5 h-3.5 text-[#1E247E] shrink-0" />
                  <span>
                    {language === 'en' ? 'Prep Timeline' : 'Tiến độ chuẩn bị'}
                  </span>
                </div>
                <span className="text-xs font-semibold text-[#1E247E] text-right">
                  {expeditedReview
                    ? language === 'en'
                      ? 'Priority 48h dossier audit'
                      : 'Ưu tiên hoàn thiện trong 48 giờ'
                    : activePlannerVisa.typicalTimeline[language]}
                </span>
              </div>

              <div className="space-y-2.5 bg-[#F8FAFC] p-4 rounded-xl border border-[#E2E8F0]">
                <div className="text-xs font-semibold text-[#1E247E]">
                  {language === 'en'
                    ? '4-Step Visa5S Execution Flow'
                    : 'Quy trình 4 bước tại Visa5S'}
                </div>
                <ol className="space-y-2">
                  {workflowSteps.map((stepText, idx) => (
                    <li
                      key={stepText}
                      className="flex items-start gap-2.5 text-xs text-[#334155]"
                    >
                      <span className="w-4 h-4 rounded-full bg-[#1E247E] text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5 tabular-nums">
                        {idx + 1}
                      </span>
                      <span>{stepText}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="flex items-center gap-2.5 text-xs text-[#334155] bg-[#EEF2FF]/60 p-3 rounded-lg">
                <PhoneCall className="w-4 h-4 text-[#E11D25] shrink-0" />
                <span>
                  {language === 'en'
                    ? `Direct consultation for ${applicantsCount} applicant(s): 0911 909 686 · 0967 686 101`
                    : `Tư vấn trực tiếp cho ${applicantsCount} đương đơn: 0911 909 686 · 0967 686 101`}
                </span>
              </div>

              <button
                type="button"
                onClick={() =>
                  onSelectForAssessment(selectedVisaId, selectedConsulate, false)
                }
                className="w-full h-12 rounded-lg bg-[#1E247E] hover:bg-[#151A60] text-white text-sm font-semibold inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <span>
                  {language === 'en'
                    ? 'Save Plan & Start Assessment'
                    : 'Lưu Lộ trình & Đánh giá Hồ sơ'}
                </span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </aside>
      </div>

      <LegalDisclaimerBlock language={language} />
    </div>
  );
}
