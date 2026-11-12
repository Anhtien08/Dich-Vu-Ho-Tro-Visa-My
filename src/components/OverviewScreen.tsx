import {
  ArrowRight,
  Award,
  Check,
  ChevronRight,
  Clock,
  FileCheck2,
  ShieldCheck,
} from 'lucide-react';
import { useState } from 'react';
import {
  CASE_OUTCOMES,
  CONSULATES,
  UI_COPY,
  VISA_PATHWAYS,
} from '../data/visaData';
import { AppScreen, Language, VisaCategoryId } from '../types/visa';
import { LegalDisclaimerBlock } from './LegalDisclaimerBlock';

interface OverviewScreenProps {
  language: Language;
  onChangeLanguage: (lang: Language) => void;
  onNavigate: (screen: AppScreen) => void;
  onStartAssessmentWith: (
    visaId: VisaCategoryId,
    consulate: string,
    priorRefusal: boolean
  ) => void;
}

export function OverviewScreen({
  language,
  onChangeLanguage,
  onNavigate,
  onStartAssessmentWith,
}: OverviewScreenProps) {
  const copy = UI_COPY[language];

  const [selectedVisa, setSelectedVisa] = useState<VisaCategoryId>('tourism');
  const [selectedConsulate, setSelectedConsulate] = useState<string>(CONSULATES[0]);
  const [priorRefusal, setPriorRefusal] = useState<boolean>(false);

  const activePathway =
    VISA_PATHWAYS.find((p) => p.id === selectedVisa) ?? VISA_PATHWAYS[0];

  return (
    <div className="space-y-16 md:space-y-24 pb-16">
      {/* Hero Section */}
      <section className="pt-8 md:pt-14">
        <div className="max-w-[1240px] mx-auto px-5 md:px-8 lg:px-12">
          {/* Subtle workspace utility bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-[#E2E8F0]">
            <p className="text-xs font-medium tracking-wide text-[#475569]">
              {copy.hero.eyebrow}
            </p>
            <div className="inline-flex items-center gap-1.5 text-xs text-[#475569]">
              <span>{language === 'en' ? 'Language:' : 'Ngôn ngữ:'}</span>
              <button
                type="button"
                onClick={() => onChangeLanguage('en')}
                className={`px-2 py-0.5 rounded font-semibold transition-colors cursor-pointer ${
                  language === 'en'
                    ? 'bg-[#1E247E] text-white'
                    : 'text-[#475569] hover:text-[#1E247E]'
                }`}
              >
                English
              </button>
              <span aria-hidden="true">·</span>
              <button
                type="button"
                onClick={() => onChangeLanguage('vi')}
                className={`px-2 py-0.5 rounded font-semibold transition-colors cursor-pointer ${
                  language === 'vi'
                    ? 'bg-[#1E247E] text-white'
                    : 'text-[#475569] hover:text-[#1E247E]'
                }`}
              >
                Tiếng Việt
              </button>
            </div>
          </div>

          {/* 2-Column Hero Split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
            {/* Left Dominant Anchor */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-8">
              <div className="space-y-5">
                <p className="text-sm font-semibold text-[#E11D25]">
                  {language === 'vi'
                    ? '“Hãy Đến Nơi Nào Bạn Muốn”'
                    : '“Go Wherever You Aspire”'}
                </p>
                <h1
                  className="font-display font-extrabold text-[#1E247E] tracking-[-0.02em] leading-[1.12] [text-wrap:balance]"
                  style={{ fontSize: 'clamp(2.25rem, 4vw, 3.5rem)' }}
                >
                  {copy.hero.headline}
                </h1>
                <p className="text-base md:text-lg text-[#334155] leading-[1.6] max-w-2xl">
                  {copy.hero.subheadline}
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <button
                    type="button"
                    onClick={() =>
                      onStartAssessmentWith(selectedVisa, selectedConsulate, priorRefusal)
                    }
                    className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-lg bg-[#E11D25] hover:bg-[#B91C1C] text-white font-semibold text-sm md:text-base transition-all duration-200 hover:-translate-y-0.5 whitespace-nowrap shrink-0 focus-ring-brand cursor-pointer"
                  >
                    <span>{copy.hero.primaryCta}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => onNavigate('pathways')}
                    className="inline-flex items-center justify-center h-12 px-6 rounded-lg border-[1.5px] border-[#1E247E] text-[#1E247E] hover:bg-[#1E247E]/5 font-semibold text-sm md:text-base transition-colors whitespace-nowrap shrink-0 focus-ring-brand cursor-pointer"
                  >
                    {copy.hero.secondaryCta}
                  </button>
                </div>
              </div>

              {/* Clean unboxed trust strip */}
              <div className="pt-6 border-t border-[#E2E8F0] flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-medium text-[#475569]">
                {copy.hero.trustRow.map((item, idx) => (
                  <div key={item} className="inline-flex items-center gap-4">
                    {idx > 0 && (
                      <span aria-hidden="true" className="text-[#CBD5E1]">
                        /
                      </span>
                    )}
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Interactive Quick Screener Card */}
            <div className="lg:col-span-5">
              <div className="h-full bg-white rounded-2xl border border-[#E2E8F0] shadow-ambient p-6 md:p-8 flex flex-col justify-between space-y-6">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between gap-3">
                    <h2 className="font-display text-xl font-bold text-[#1E247E]">
                      {copy.screener.title}
                    </h2>
                    <ShieldCheck className="w-5 h-5 text-[#E11D25] shrink-0" />
                  </div>
                  <p className="text-sm text-[#475569] leading-relaxed">
                    {copy.screener.subtitle}
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="quick-visa"
                      className="block text-sm font-semibold text-[#334155] mb-1.5"
                    >
                      {copy.screener.visaLabel}
                    </label>
                    <select
                      id="quick-visa"
                      value={selectedVisa}
                      onChange={(e) => setSelectedVisa(e.target.value as VisaCategoryId)}
                      className="w-full h-12 px-3.5 rounded-lg bg-white border border-[#CBD5E1] text-sm font-medium text-[#0F172A] input-visa cursor-pointer"
                    >
                      {VISA_PATHWAYS.map((pathway) => (
                        <option key={pathway.id} value={pathway.id}>
                          {pathway.code} — {pathway.title[language]}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="quick-consulate"
                      className="block text-sm font-semibold text-[#334155] mb-1.5"
                    >
                      {copy.screener.consulateLabel}
                    </label>
                    <select
                      id="quick-consulate"
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
                    <span className="block text-sm font-semibold text-[#334155] mb-2">
                      {copy.screener.priorRefusalLabel}
                    </span>
                    <div className="grid grid-cols-2 gap-2.5">
                      <button
                        type="button"
                        onClick={() => setPriorRefusal(false)}
                        className={`h-11 px-3 rounded-lg border text-xs font-semibold transition-colors cursor-pointer ${
                          !priorRefusal
                            ? 'border-[#1E247E] bg-[#EEF2FF] text-[#1E247E]'
                            : 'border-[#CBD5E1] bg-white text-[#334155] hover:bg-[#F8FAFC]'
                        }`}
                      >
                        {copy.screener.priorRefusalNo}
                      </button>
                      <button
                        type="button"
                        onClick={() => setPriorRefusal(true)}
                        className={`h-11 px-3 rounded-lg border text-xs font-semibold transition-colors cursor-pointer ${
                          priorRefusal
                            ? 'border-[#1E247E] bg-[#EEF2FF] text-[#1E247E]'
                            : 'border-[#CBD5E1] bg-white text-[#334155] hover:bg-[#F8FAFC]'
                        }`}
                      >
                        {copy.screener.priorRefusalYes}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Live Dossier Preview */}
                <div className="pt-4 border-t border-[#E2E8F0] space-y-3">
                  <div className="flex items-start justify-between gap-4 text-xs text-[#475569]">
                    <span className="shrink-0">
                      {language === 'en' ? 'Prep Turnaround' : 'Thời gian chuẩn bị'}
                    </span>
                    <span className="font-semibold text-[#0F172A] text-right">
                      {activePathway.typicalTimeline[language]}
                    </span>
                  </div>
                  <div className="flex items-start justify-between gap-4 text-xs text-[#475569]">
                    <span className="shrink-0">
                      {language === 'en' ? 'Visa Validity' : 'Thời hạn thị thực'}
                    </span>
                    <span className="font-semibold text-[#1E247E] text-right">
                      {activePathway.validityPeriod[language]}
                    </span>
                  </div>
                  {priorRefusal && (
                    <p className="text-xs text-[#92400E] bg-[#FEF3C7]/70 rounded-lg px-3 py-2">
                      {language === 'en'
                        ? 'Includes §214(b) prior-refusal discrepancy audit in your assessment.'
                        : 'Bao gồm bước rà soát nguyên nhân từ chối §214(b) trước đây.'}
                    </p>
                  )}

                  <button
                    type="button"
                    onClick={() =>
                      onStartAssessmentWith(selectedVisa, selectedConsulate, priorRefusal)
                    }
                    className="w-full h-12 rounded-lg bg-[#1E247E] hover:bg-[#151A60] text-white text-sm font-semibold inline-flex items-center justify-center gap-2 transition-colors focus-ring-brand cursor-pointer"
                  >
                    <span>{copy.screener.submitBtn}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* 4-Column Service Benchmarks Strip */}
          <div className="mt-12 md:mt-16 bg-white rounded-xl border border-[#E2E8F0] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#E2E8F0]">
            {copy.benchmarks.items.map((item) => (
              <div key={item.label} className="p-6 space-y-1.5">
                <div className="font-display text-2xl md:text-3xl font-extrabold text-[#1E247E] tabular-nums">
                  {item.value}
                </div>
                <div className="text-sm font-semibold text-[#0F172A]">{item.label}</div>
                <p className="text-xs text-[#475569] leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Visa Pathways & Service Tiers */}
      <section className="max-w-[1240px] mx-auto px-5 md:px-8 lg:px-12 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <p className="text-xs font-semibold tracking-wide text-[#E11D25]">
              {language === 'en' ? '01. U.S. Visa Services' : '01. Dịch vụ Xin Visa Mỹ Trọn Gói'}
            </p>
            <h2 className="font-display text-2xl md:text-4xl font-bold text-[#1E247E] tracking-[-0.015em] [text-wrap:balance]">
              {language === 'en'
                ? 'Four dedicated U.S. visa tracks tailored to your travel purpose'
                : 'Bốn diện dịch vụ visa Mỹ trọng tâm tại Visa5S'}
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('pathways')}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1E247E] hover:text-[#E11D25] whitespace-nowrap shrink-0 cursor-pointer transition-colors"
          >
            <span>
              {language === 'en'
                ? 'Compare all 4 visa services'
                : 'Xem chi tiết 4 diện dịch vụ'}
            </span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {VISA_PATHWAYS.map((pathway) => {
            const isPopular = pathway.tierHighlight === 'popular';
            const isWaiver = pathway.tierHighlight === 'waiver';

            return (
              <article
                key={pathway.id}
                className={`relative bg-white rounded-xl p-6 md:p-7 flex flex-col justify-between space-y-6 transition-transform duration-200 hover:-translate-y-0.5 ${
                  isWaiver
                    ? 'shadow-executive-accent'
                    : isPopular
                      ? 'border-[1.5px] border-[#1E247E]'
                      : 'border border-[#E2E8F0]'
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-[#475569]">
                        {pathway.kicker[language]}
                      </p>
                      <h3 className="font-display text-xl font-bold text-[#1E247E]">
                        {pathway.code} · {pathway.title[language]}
                      </h3>
                    </div>

                    {isPopular && (
                      <span className="px-2.5 py-1 rounded-md bg-[#EEF2FF] text-[#1E247E] text-xs font-semibold whitespace-nowrap shrink-0">
                        {language === 'en' ? 'High Demand' : 'Phổ biến'}
                      </span>
                    )}
                    {isWaiver && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#FEF2F2] text-[#E11D25] text-xs font-semibold whitespace-nowrap shrink-0">
                        <Award className="w-3.5 h-3.5 text-[#E11D25]" />
                        {language === 'en' ? 'Interview Waiver' : 'Miễn Phỏng vấn'}
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-[#334155] leading-relaxed">
                    {pathway.summary[language]}
                  </p>

                  <ul className="space-y-2 pt-2 border-t border-[#E2E8F0]">
                    {pathway.keyRequirements.map((req, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2.5 text-sm text-[#334155]"
                      >
                        <Check className="w-4 h-4 text-[#E11D25] shrink-0 mt-0.5" />
                        <span>{req[language]}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-[#E2E8F0] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-0.5">
                    <div className="text-xs text-[#475569]">
                      {language === 'en' ? 'Prep Turnaround' : 'Thời gian chuẩn bị'}
                    </div>
                    <div className="text-sm font-semibold text-[#1E247E]">
                      {pathway.typicalTimeline[language]}
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <button
                      type="button"
                      onClick={() =>
                        onStartAssessmentWith(pathway.id, selectedConsulate, false)
                      }
                      className="h-10 px-4 rounded-lg bg-[#1E247E] hover:bg-[#151A60] text-white text-xs font-semibold inline-flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      <span>
                        {language === 'en' ? 'Assess Eligibility' : 'Đánh giá Diện này'}
                      </span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Attributable Client Case Outcomes */}
      <section className="max-w-[1240px] mx-auto px-5 md:px-8 lg:px-12 space-y-8">
        <div className="space-y-2 max-w-2xl">
          <p className="text-xs font-semibold tracking-wide text-[#E11D25]">
            {language === 'en' ? '02. Documented Outcomes' : '02. Kết quả Hồ sơ Thực tế'}
          </p>
          <h2 className="font-display text-2xl md:text-4xl font-bold text-[#1E247E] tracking-[-0.015em] [text-wrap:balance]">
            {language === 'en'
              ? 'Actual U.S. visa approvals & verifiable case histories'
              : 'Kết quả Visa Mỹ thực tế tại Visa5S'}
          </h2>
        </div>

        {/* Featured Real U.S. Visa Results Photo */}
        <article className="bg-white rounded-2xl border border-[#E2E8F0] shadow-ambient overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-stretch">
          <div className="lg:col-span-5 bg-[#EEF2FF]">
            <img
              src="/assets/aistudio/m__7d7badf7.jpg"
              alt={
                language === 'en'
                  ? 'Visa5S specialist holding five approved U.S. visas in client passports'
                  : 'Chuyên viên Visa5S bàn giao 5 hộ chiếu đậu Visa Mỹ thực tế cho khách hàng'
              }
              referrerPolicy="no-referrer"
              className="w-full h-full min-h-[340px] max-h-[520px] object-cover object-top"
            />
          </div>

          <div className="lg:col-span-7 p-6 md:p-8 lg:p-10 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-[#475569]">
                <span className="font-semibold text-[#E11D25]">
                  {language === 'en' ? 'Issued U.S. Visas' : 'Kết quả Visa Mỹ'}
                </span>
                <span aria-hidden="true">·</span>
                <span>
                  {language === 'en'
                    ? 'Tourism, Business & Family Groups'
                    : 'Đoàn gia đình, Du lịch & Công tác B1/B2'}
                </span>
              </div>

              <h3 className="font-display text-xl md:text-2xl font-bold text-[#1E247E] [text-wrap:balance]">
                {language === 'en'
                  ? 'Batch of 5 U.S. B1/B2 visas approved and handed over at the Visa5S office'
                  : 'Loạt 5 hộ chiếu đậu Visa Mỹ B1/B2 được bàn giao trực tiếp tại văn phòng Visa5S'}
              </h3>

              <p className="text-sm md:text-base text-[#334155] leading-relaxed">
                {language === 'en'
                  ? 'Every passport shown represents a completed consular dossier prepared from DS-160 drafting and financial structuring through 1-on-1 interview rehearsal.'
                  : 'Mỗi bộ hộ chiếu là kết quả của quy trình chuẩn bị bài bản từ khâu thẩm định năng lực tài chính, khai DS-160 đồng bộ đến luyện phỏng vấn 1-1 trước ngày lên Lãnh sự quán.'}
              </p>

              <ul className="space-y-2.5 pt-4 border-t border-[#E2E8F0]">
                <li className="flex items-start gap-2.5 text-sm text-[#334155]">
                  <Check className="w-4 h-4 text-[#E11D25] shrink-0 mt-0.5" />
                  <span>
                    {language === 'en'
                      ? 'Personal details masked to protect client privacy'
                      : 'Thông tin cá nhân trên thị thực được che mờ nhằm bảo mật dữ liệu khách hàng'}
                  </span>
                </li>
                <li className="flex items-start gap-2.5 text-sm text-[#334155]">
                  <Check className="w-4 h-4 text-[#E11D25] shrink-0 mt-0.5" />
                  <span>
                    {language === 'en'
                      ? 'Consistent DS-160 declarations matched with supporting ties'
                      : 'Tờ khai DS-160 nhất quán với hồ sơ công việc, tài sản và lịch trình chuyến đi'}
                  </span>
                </li>
                <li className="flex items-start gap-2.5 text-sm text-[#334155]">
                  <Check className="w-4 h-4 text-[#E11D25] shrink-0 mt-0.5" />
                  <span>
                    {language === 'en'
                      ? 'Direct passport tracking and post-visa arrival briefing'
                      : 'Theo dõi giao nhận hộ chiếu tận tay và hướng dẫn lưu ý khi nhập cảnh Hoa Kỳ'}
                  </span>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-[#E2E8F0] flex flex-wrap items-center justify-between gap-4">
              <span className="text-xs text-[#475569]">
                {language === 'en'
                  ? 'HCMC · Binh Duong · Hanoi'
                  : 'Tiếp nhận hồ sơ toàn quốc · TP.HCM · Bình Dương · Hà Nội'}
              </span>
              <button
                type="button"
                onClick={() =>
                  onStartAssessmentWith(selectedVisa, selectedConsulate, priorRefusal)
                }
                className="h-11 px-5 rounded-lg bg-[#E11D25] hover:bg-[#B91C1C] text-white text-xs font-semibold inline-flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span>
                  {language === 'en' ? 'Assess Your Dossier' : 'Đánh giá Hồ sơ của bạn'}
                </span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </article>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {CASE_OUTCOMES.map((c) => (
            <article
              key={c.id}
              className="bg-white rounded-xl border border-[#E2E8F0] p-6 flex flex-col justify-between space-y-5"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2 text-xs text-[#475569]">
                  <span className="font-semibold text-[#E11D25]">{c.visaCode}</span>
                  <span aria-hidden="true">·</span>
                  <span>{c.consulate}</span>
                  <span aria-hidden="true">·</span>
                  <span className="inline-flex items-center gap-1 font-mono tabular-nums">
                    <Clock className="w-3.5 h-3.5" />
                    {c.timelineDays} {language === 'en' ? 'd' : 'ngày'}
                  </span>
                </div>

                <div>
                  <h3 className="font-display text-lg font-bold text-[#1E247E]">
                    {c.clientName}
                  </h3>
                  <p className="text-xs text-[#475569] mt-0.5">{c.roleAndOrg[language]}</p>
                </div>

                <div className="space-y-3 pt-3 border-t border-[#E2E8F0] text-sm text-[#334155] leading-relaxed">
                  <p>
                    <span className="font-semibold text-[#1E247E]">
                      {language === 'en' ? 'Challenge: ' : 'Vướng mắc: '}
                    </span>
                    {c.challenge[language]}
                  </p>
                  <p>
                    <span className="font-semibold text-[#1E247E]">
                      {language === 'en' ? 'Dossier Fix: ' : 'Giải pháp: '}
                    </span>
                    {c.approach[language]}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-[#E2E8F0] flex items-start gap-2 text-xs font-medium text-[#1E247E]">
                <FileCheck2 className="w-4 h-4 text-[#E11D25] shrink-0 mt-0.5" />
                <span>{c.outcome[language]}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Legal Disclaimer */}
      <div className="max-w-[1240px] mx-auto px-5 md:px-8 lg:px-12">
        <LegalDisclaimerBlock language={language} />
      </div>
    </div>
  );
}
