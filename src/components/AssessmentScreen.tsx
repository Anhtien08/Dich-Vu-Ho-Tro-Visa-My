import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  FileCheck2,
  Mail,
  Send,
  ShieldAlert,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { CONSULATES, VISA_PATHWAYS } from '../data/visaData';
import {
  AssessmentDraft,
  ChecklistItem,
  ClientDossier,
  Language,
  VisaCategoryId,
} from '../types/visa';
import { LegalDisclaimerBlock } from './LegalDisclaimerBlock';

interface AssessmentScreenProps {
  language: Language;
  initialVisaId: VisaCategoryId;
  initialConsulate: string;
  initialPriorRefusal: boolean;
  onCreateDossier: (dossier: ClientDossier) => void;
  onViewServices: () => void;
}

const TARGET_EMAIL = 'visa5giay@gmail.com';

export function AssessmentScreen({
  language,
  initialVisaId,
  initialConsulate,
  initialPriorRefusal,
  onCreateDossier,
  onViewServices,
}: AssessmentScreenProps) {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [createdDossier, setCreatedDossier] = useState<ClientDossier | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [emailStatus, setEmailStatus] = useState<'idle' | 'sent' | 'error'>('idle');
  const [emailErrorMsg, setEmailErrorMsg] = useState<string>('');

  const [draft, setDraft] = useState<AssessmentDraft>({
    visaId: initialVisaId,
    consulate: initialConsulate || CONSULATES[0],
    applicantCount: 1,
    expeditedReview: false,
    fullName: '',
    email: '',
    phone: '',
    currentCountry: 'Vietnam',
    occupationType: 'business-owner',
    employmentYears: '3–5 năm',
    financialReserve: '30k-100k',
    hasPropertyOrFamilyTies: true,
    passportValidOverSixMonths: true,
    priorUsVisa: initialPriorRefusal ? 'refused-214b' : 'never',
    internationalTravelCount: '1-3',
    targetTravelWindow: 'Quý 2 / 2027',
    consentTerms: false,
  });

  useEffect(() => {
    setDraft((prev) => ({
      ...prev,
      visaId: initialVisaId,
      consulate: initialConsulate || prev.consulate,
      priorUsVisa: initialPriorRefusal ? 'refused-214b' : prev.priorUsVisa,
    }));
  }, [initialVisaId, initialConsulate, initialPriorRefusal]);

  const activePathway =
    VISA_PATHWAYS.find((p) => p.id === draft.visaId) ?? VISA_PATHWAYS[0];

  const validateStep = (targetStep: 1 | 2 | 3): boolean => {
    const nextErrors: Record<string, string> = {};

    if (targetStep === 1) {
      if (!draft.fullName.trim() || draft.fullName.trim().length < 2) {
        nextErrors.fullName =
          language === 'en'
            ? 'Please enter the primary applicant’s full passport name.'
            : 'Vui lòng nhập họ tên đầy đủ theo hộ chiếu.';
      }
      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(draft.email.trim());
      if (!emailOk) {
        nextErrors.email =
          language === 'en'
            ? 'Enter a valid email address for your dossier summary.'
            : 'Vui lòng nhập địa chỉ email hợp lệ để nhận báo cáo hồ sơ.';
      }
      const phoneDigits = draft.phone.replace(/[^\d]/g, '');
      if (phoneDigits.length < 8) {
        nextErrors.phone =
          language === 'en'
            ? 'Enter a valid phone number (minimum 8 digits).'
            : 'Vui lòng nhập số điện thoại liên hệ hợp lệ (tối thiểu 8 chữ số).';
      }
    }

    if (targetStep === 3) {
      if (!draft.consentTerms) {
        nextErrors.consentTerms =
          language === 'en'
            ? 'Please acknowledge the private non-government advisory notice before submitting.'
            : 'Vui lòng xác nhận đã đọc tuyên bố đơn vị tư vấn độc lập trước khi gửi.';
      }
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const computeReadinessScore = (input: AssessmentDraft): number => {
    let score = input.visaId === 'renewal' ? 76 : 64;
    if (input.passportValidOverSixMonths) score += 10;
    if (input.hasPropertyOrFamilyTies) score += 8;
    if (input.internationalTravelCount === '4-plus') score += 8;
    if (input.internationalTravelCount === '1-3') score += 4;
    if (input.priorUsVisa === 'approved-before') score += 7;
    if (input.priorUsVisa === 'refused-214b') score -= 16;

    if (input.financialReserve === 'over-100k' || input.financialReserve === '30k-100k') {
      score += 6;
    } else if (input.financialReserve === 'under-10k') {
      score -= 8;
    }

    return Math.max(40, Math.min(97, score));
  };

  const handleNext = () => {
    if (step === 1 && validateStep(1)) {
      setStep(2);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (step === 2) {
      setStep(3);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const buildFormPayload = (caseNumber: string, readinessScore: number) => ({
    _subject: `[Visa5S] Hồ sơ ${activePathway.code} — ${draft.fullName.trim()} (${caseNumber})`,
    _template: 'table',
    _captcha: 'false',
    _replyto: draft.email.trim(),
    Ma_Ho_So: caseNumber,
    Ho_Ten: draft.fullName.trim(),
    Email_Khach_Hang: draft.email.trim(),
    So_Dien_Thoai: draft.phone.trim(),
    Dich_Vu_Visa: `${activePathway.code} — ${activePathway.title.vi}`,
    Lanh_Su_Quan: draft.consulate,
    Thoi_Gian_Du_Kien: draft.targetTravelWindow,
    Nhom_Nghe_Nghiep: draft.occupationType,
    Tai_Chinh_Chung_Minh: draft.financialReserve,
    Co_Tai_San_Hoac_Gia_Dinh_Rang_Buoc: draft.hasPropertyOrFamilyTies ? 'Có' : 'Không',
    Ho_Chieu_Con_Han_Tren_6_Thang: draft.passportValidOverSixMonths ? 'Có' : 'Chưa đủ',
    Tien_Su_Visa_My: draft.priorUsVisa,
    So_Quoc_Gia_Da_Di_5_Nam: draft.internationalTravelCount,
    Chi_So_San_Sang: `${readinessScore}/100`,
  });

  const sendDossierEmail = async (caseNumber: string, readinessScore: number) => {
    setIsSubmitting(true);
    setEmailErrorMsg('');
    try {
      const response = await fetch(`https://formsubmit.co/ajax/${TARGET_EMAIL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(buildFormPayload(caseNumber, readinessScore)),
      });

      const result = await response.json().catch(() => null);
      if (!response.ok || (result && result.success === 'false')) {
        throw new Error(
          (result && typeof result.message === 'string' && result.message) ||
            `HTTP ${response.status}`
        );
      }
      setEmailStatus('sent');
    } catch (err) {
      setEmailStatus('error');
      setEmailErrorMsg(err instanceof Error ? err.message : 'Network error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting || !validateStep(3)) return;

    const readinessScore = computeReadinessScore(draft);
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const caseNumber = `V5S-2026-${randomNum}`;

    const checklist: ChecklistItem[] = [
      {
        id: `c-${randomNum}-1`,
        label: {
          en: 'Original Passport (6+ Months Validity Beyond Return)',
          vi: 'Hộ chiếu gốc còn hạn tối thiểu 6 tháng sau ngày về',
        },
        category: { en: 'Identity', vi: 'Định danh' },
        status: draft.passportValidOverSixMonths ? 'pending' : 'action-needed',
        required: true,
      },
      {
        id: `c-${randomNum}-2`,
        label: {
          en:
            draft.visaId === 'business'
              ? 'U.S. Partner Invitation Letter & Corporate Dispatch Decision'
              : draft.visaId === 'family-visit'
                ? 'U.S. Relative Invitation Letter & Civil Relationship Proof'
                : draft.visaId === 'renewal'
                  ? 'Prior U.S. Visa Stamp & Two 5×5 cm Biometric Photos'
                  : 'DS-160 Draft, Employment Proof & U.S. Travel Itinerary',
          vi:
            draft.visaId === 'business'
              ? 'Thư mời đối tác Hoa Kỳ & Quyết định cử đi công tác'
              : draft.visaId === 'family-visit'
                ? 'Thư mời người thân tại Mỹ & Giấy tờ chứng minh quan hệ'
                : draft.visaId === 'renewal'
                  ? 'Visa Mỹ cũ (bản gốc) & 02 ảnh thẻ 5×5 cm nền trắng'
                  : 'Tờ khai DS-160, Xác nhận công việc & Lịch trình du lịch',
        },
        category: { en: 'Primary Filing', vi: 'Hồ sơ trọng tâm' },
        status: 'pending',
        required: true,
      },
      {
        id: `c-${randomNum}-3`,
        label: {
          en: 'Savings Book, Bank Statements & Income Verification',
          vi: 'Sổ tiết kiệm, Sao kê Ngân hàng & Chứng minh Thu nhập',
        },
        category: { en: 'Financial', vi: 'Tài chính' },
        status: draft.financialReserve === 'under-10k' ? 'action-needed' : 'pending',
        required: draft.visaId !== 'renewal',
      },
    ];

    if (draft.priorUsVisa === 'refused-214b') {
      checklist.push({
        id: `c-${randomNum}-4`,
        label: {
          en: 'Prior §214(b) Refusal Notice & Material Change Summary',
          vi: 'Thư từ chối §214(b) trước đây & Giải trình điểm cải thiện mới',
        },
        category: { en: 'Compliance Audit', vi: 'Rà soát Pháp lý' },
        status: 'action-needed',
        required: true,
      });
    }

    const newDossier: ClientDossier = {
      caseNumber,
      applicantName: draft.fullName.trim(),
      email: draft.email.trim(),
      phone: draft.phone.trim(),
      visaId: draft.visaId,
      visaLabel: `${activePathway.code} · ${activePathway.title[language]}`,
      consulate: draft.consulate,
      targetTravelWindow: draft.targetTravelWindow,
      submittedDate: '11/11/2026',
      readinessScore,
      advisoryTier: activePathway.code,
      checklist,
      milestones: [
        {
          id: `m-${randomNum}-1`,
          title: { en: 'Eligibility Intake Submitted', vi: 'Đã tiếp nhận Đánh giá Hồ sơ' },
          detail: {
            en: `Diagnostic score ${readinessScore}/100 recorded for ${draft.consulate}.`,
            vi: `Ghi nhận chỉ số sẵn sàng ${readinessScore}/100 tại ${draft.consulate}.`,
          },
          dateLabel: 'Hôm nay',
          state: 'completed',
        },
        {
          id: `m-${randomNum}-2`,
          title: { en: 'DS-160 & Document Audit', vi: 'Khai DS-160 & Thẩm định Chứng từ' },
          detail: {
            en: 'Specialist team reviews submitted profile and contacts applicant.',
            vi: 'Chuyên viên tiếp nhận hồ sơ và liên hệ tư vấn chi tiết.',
          },
          dateLabel: 'Tiếp theo',
          state: 'active',
        },
        {
          id: `m-${randomNum}-3`,
          title: {
            en:
              draft.visaId === 'renewal'
                ? 'Postal Drop-box Dispatch'
                : '1-on-1 Mock Consular Interview',
            vi:
              draft.visaId === 'renewal'
                ? 'Gửi Hồ sơ qua Bưu điện'
                : 'Luyện Phỏng vấn 1-1',
          },
          detail: {
            en:
              draft.visaId === 'renewal'
                ? 'Submit waiver packet via authorized courier without in-person interview.'
                : 'Structured Q&A coaching tailored to your travel purpose and ties.',
            vi:
              draft.visaId === 'renewal'
                ? 'Nộp hồ sơ gia hạn miễn phỏng vấn qua bưu cục chỉ định.'
                : 'Thực hành trả lời 1-1 bám sát mục đích chuyến đi và ràng buộc tại Việt Nam.',
          },
          dateLabel: 'Chờ xử lý',
          state: 'upcoming',
        },
      ],
    };

    await sendDossierEmail(caseNumber, readinessScore);
    setCreatedDossier(newDossier);
    onCreateDossier(newDossier);
    setStep(4);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const buildGmailComposeHref = (dossier: ClientDossier) => {
    const subject = `[Visa5S] Hồ sơ ${dossier.visaLabel} — ${dossier.applicantName} (${dossier.caseNumber})`;
    const body = [
      `Mã hồ sơ: ${dossier.caseNumber}`,
      `Họ và tên: ${dossier.applicantName}`,
      `Email: ${dossier.email}`,
      `Số điện thoại: ${dossier.phone}`,
      `Diện thị thực: ${dossier.visaLabel}`,
      `Địa điểm nộp / Phỏng vấn: ${dossier.consulate}`,
      `Thời gian dự kiến: ${dossier.targetTravelWindow}`,
      `Chỉ số sẵn sàng: ${dossier.readinessScore}/100`,
    ].join('\n');
    return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
      TARGET_EMAIL
    )}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const stepLabels = [
    language === 'en' ? '1. Applicant & Pathway' : '1. Đương đơn & Diện thị thực',
    language === 'en' ? '2. Ties & Financials' : '2. Ràng buộc & Tài chính',
    language === 'en' ? '3. Consular History' : '3. Lịch sử Lãnh sự',
  ];

  return (
    <div className="max-w-[1240px] mx-auto px-5 md:px-8 lg:px-12 py-10 md:py-14 space-y-10">
      <div className="max-w-3xl space-y-2">
        <p className="text-xs font-semibold text-[#E11D25]">
          {language === 'en'
            ? 'Structured Eligibility Diagnostic'
            : 'Thẩm định Điều kiện Hồ sơ'}
        </p>
        <h1 className="font-display text-3xl md:text-4xl font-extrabold text-[#1E247E] tracking-[-0.015em] [text-wrap:balance]">
          {language === 'en'
            ? 'U.S. Visa Readiness & DS-160 Pre-Audit'
            : 'Kiểm tra Mức độ Sẵn sàng Hồ sơ Hoa Kỳ'}
        </h1>
        <p className="text-sm md:text-base text-[#334155] leading-relaxed">
          {language === 'en'
            ? 'Complete this three-step assessment to generate an instant dossier readiness score, pinpoint compliance risks, and view your personalized document checklist.'
            : 'Hoàn thành 3 bước để nhận ngay chỉ số sẵn sàng hồ sơ, phát hiện điểm rủi ro pháp lý và xem danh mục giấy tờ cần chuẩn bị.'}
        </p>
      </div>

      {/* Step Indicator */}
      {step < 4 && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl">
          {stepLabels.map((label, index) => {
            const stepNum = (index + 1) as 1 | 2 | 3;
            const isCurrent = step === stepNum;
            const isDone = step > stepNum;

            return (
              <div
                key={label}
                className={`px-4 py-3 rounded-lg border text-xs font-semibold flex items-center justify-between ${
                  isCurrent
                    ? 'bg-[#EEF2FF] border-[#1E247E] text-[#1E247E]'
                    : isDone
                      ? 'bg-white border-[#1E247E] text-[#1E247E]'
                      : 'bg-white border-[#E2E8F0] text-[#475569]'
                }`}
              >
                <span>{label}</span>
                {isDone && <CheckCircle2 className="w-4 h-4 text-[#E11D25]" />}
              </div>
            );
          })}
        </div>
      )}

      {/* Main Content Grid */}
      {step < 4 ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <form
            onSubmit={handleSubmit}
            className="lg:col-span-8 bg-white rounded-2xl border border-[#E2E8F0] shadow-ambient p-6 md:p-8 space-y-6"
            noValidate
          >
            {step === 1 && (
              <div className="space-y-5">
                <h2 className="font-display text-xl font-bold text-[#1E247E]">
                  {language === 'en'
                    ? 'Step 1 — Applicant & Target Visa Class'
                    : 'Bước 1 — Thông tin Đương đơn & Diện thị thực'}
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="ass-visa"
                      className="block text-sm font-semibold text-[#334155] mb-1.5"
                    >
                      {language === 'en' ? 'Visa Category' : 'Diện thị thực'}
                    </label>
                    <select
                      id="ass-visa"
                      value={draft.visaId}
                      onChange={(e) =>
                        setDraft({ ...draft, visaId: e.target.value as VisaCategoryId })
                      }
                      className="w-full h-12 px-3.5 rounded-lg bg-white border border-[#CBD5E1] text-sm text-[#0F172A] input-visa"
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
                      htmlFor="ass-consulate"
                      className="block text-sm font-semibold text-[#334155] mb-1.5"
                    >
                      {language === 'en' ? 'Preferred Consulate' : 'Địa điểm Phỏng vấn'}
                    </label>
                    <select
                      id="ass-consulate"
                      value={draft.consulate}
                      onChange={(e) => setDraft({ ...draft, consulate: e.target.value })}
                      className="w-full h-12 px-3.5 rounded-lg bg-white border border-[#CBD5E1] text-sm text-[#0F172A] input-visa"
                    >
                      {CONSULATES.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="ass-name"
                    className="block text-sm font-semibold text-[#334155] mb-1.5"
                  >
                    {language === 'en'
                      ? 'Full Name (as shown on Passport)'
                      : 'Họ và Tên (theo Hộ chiếu)'}
                  </label>
                  <input
                    id="ass-name"
                    type="text"
                    placeholder={language === 'en' ? 'e.g. Nguyen Minh Quan' : 'VD: Nguyễn Minh Quân'}
                    value={draft.fullName}
                    onChange={(e) => {
                      setDraft({ ...draft, fullName: e.target.value });
                      if (errors.fullName) setErrors({ ...errors, fullName: '' });
                    }}
                    className="w-full h-12 px-3.5 rounded-lg bg-white border border-[#CBD5E1] text-sm text-[#0F172A] input-visa"
                  />
                  {errors.fullName && (
                    <p className="mt-1.5 inline-flex items-center gap-1.5 text-xs font-medium text-[#BA1A1A]">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.fullName}</span>
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="ass-email"
                      className="block text-sm font-semibold text-[#334155] mb-1.5"
                    >
                      {language === 'en' ? 'Email Address' : 'Địa chỉ Email'}
                    </label>
                    <input
                      id="ass-email"
                      type="email"
                      placeholder="name@company.com"
                      value={draft.email}
                      onChange={(e) => {
                        setDraft({ ...draft, email: e.target.value });
                        if (errors.email) setErrors({ ...errors, email: '' });
                      }}
                      className="w-full h-12 px-3.5 rounded-lg bg-white border border-[#CBD5E1] text-sm text-[#0F172A] input-visa"
                    />
                    {errors.email && (
                      <p className="mt-1.5 inline-flex items-center gap-1.5 text-xs font-medium text-[#BA1A1A]">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.email}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="ass-phone"
                      className="block text-sm font-semibold text-[#334155] mb-1.5"
                    >
                      {language === 'en' ? 'Phone / WhatsApp / Zalo' : 'Số điện thoại liên hệ'}
                    </label>
                    <input
                      id="ass-phone"
                      type="tel"
                      placeholder="+84 908 123 456"
                      value={draft.phone}
                      onChange={(e) => {
                        setDraft({ ...draft, phone: e.target.value });
                        if (errors.phone) setErrors({ ...errors, phone: '' });
                      }}
                      className="w-full h-12 px-3.5 rounded-lg bg-white border border-[#CBD5E1] text-sm text-[#0F172A] input-visa"
                    />
                    {errors.phone && (
                      <p className="mt-1.5 inline-flex items-center gap-1.5 text-xs font-medium text-[#BA1A1A]">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.phone}</span>
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="ass-window"
                    className="block text-sm font-semibold text-[#334155] mb-1.5"
                  >
                    {language === 'en'
                      ? 'Intended U.S. Travel or Intake Window'
                      : 'Thời gian dự kiến nhập cảnh Hoa Kỳ'}
                  </label>
                  <input
                    id="ass-window"
                    type="text"
                    value={draft.targetTravelWindow}
                    onChange={(e) =>
                      setDraft({ ...draft, targetTravelWindow: e.target.value })
                    }
                    className="w-full h-12 px-3.5 rounded-lg bg-white border border-[#CBD5E1] text-sm text-[#0F172A] input-visa"
                  />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-5">
                <h2 className="font-display text-xl font-bold text-[#1E247E]">
                  {language === 'en'
                    ? 'Step 2 — Employment, Financial Reserve & Home Ties'
                    : 'Bước 2 — Nghề nghiệp, Tài chính & Ràng buộc'}
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="ass-occupation"
                      className="block text-sm font-semibold text-[#334155] mb-1.5"
                    >
                      {language === 'en' ? 'Primary Profile' : 'Nhóm nghề nghiệp'}
                    </label>
                    <select
                      id="ass-occupation"
                      value={draft.occupationType}
                      onChange={(e) =>
                        setDraft({
                          ...draft,
                          occupationType: e.target.value as AssessmentDraft['occupationType'],
                        })
                      }
                      className="w-full h-12 px-3.5 rounded-lg bg-white border border-[#CBD5E1] text-sm text-[#0F172A] input-visa"
                    >
                      <option value="business-owner">
                        {language === 'en' ? 'Business Owner / Household Business' : 'Chủ doanh nghiệp / Hộ kinh doanh'}
                      </option>
                      <option value="corporate-staff">
                        {language === 'en'
                          ? 'Office Staff / Manager'
                          : 'Nhân viên văn phòng / Quản lý'}
                      </option>
                      <option value="freelancer">
                        {language === 'en' ? 'Freelancer / Specialist' : 'Chuyên gia tự do'}
                      </option>
                      <option value="retired">
                        {language === 'en' ? 'Retired / Senior Visitor' : 'Đã nghỉ hưu / Thăm con cháu'}
                      </option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="ass-reserve"
                      className="block text-sm font-semibold text-[#334155] mb-1.5"
                    >
                      {language === 'en'
                        ? 'Savings & Liquid Financial Reserve'
                        : 'Sổ tiết kiệm & Tài chính Chứng minh'}
                    </label>
                    <select
                      id="ass-reserve"
                      value={draft.financialReserve}
                      onChange={(e) =>
                        setDraft({
                          ...draft,
                          financialReserve: e.target
                            .value as AssessmentDraft['financialReserve'],
                        })
                      }
                      className="w-full h-12 px-3.5 rounded-lg bg-white border border-[#CBD5E1] text-sm text-[#0F172A] input-visa"
                    >
                      <option value="under-10k">
                        {language === 'en' ? 'Under 250M VND' : 'Dưới 250 triệu VNĐ'}
                      </option>
                      <option value="10k-30k">
                        {language === 'en' ? '250M – 750M VND' : '250 – 750 triệu VNĐ'}
                      </option>
                      <option value="30k-100k">
                        {language === 'en' ? '750M – 2.5B VND' : '750 triệu – 2,5 tỷ VNĐ'}
                      </option>
                      <option value="over-100k">
                        {language === 'en' ? 'Over 2.5B VND' : 'Trên 2,5 tỷ VNĐ'}
                      </option>
                    </select>
                  </div>
                </div>

                {draft.visaId === 'renewal' && draft.priorUsVisa === 'refused-214b' && (
                  <div className="flex items-start gap-2.5 p-3.5 rounded-lg bg-[#FEF3C7] text-[#735C00] text-xs leading-relaxed">
                    <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>
                      {language === 'en'
                        ? 'Postal renewal requires no refusal after your last issued U.S. visa; if refused recently, an in-person interview will be required.'
                        : 'Gia hạn qua bưu điện yêu cầu không bị từ chối visa ở lần nộp gần nhất; nếu mới bị từ chối, cần đặt lịch phỏng vấn trực tiếp.'}
                    </span>
                  </div>
                )}

                <div className="space-y-3 pt-2">
                  <label className="flex items-start gap-3 p-4 rounded-lg border border-[#E2E8F0] hover:bg-[#F8FAFC] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={draft.hasPropertyOrFamilyTies}
                      onChange={(e) =>
                        setDraft({
                          ...draft,
                          hasPropertyOrFamilyTies: e.target.checked,
                        })
                      }
                      className="mt-0.5 w-5 h-5 rounded accent-[#1E247E] cursor-pointer"
                    />
                    <div className="text-sm">
                      <div className="font-semibold text-[#1E247E]">
                        {language === 'en'
                          ? 'Real estate ownership, registered business equity, or immediate family in home country'
                          : 'Có tài sản bất động sản, cổ phần doanh nghiệp hoặc gia đình trực hệ tại nước sở tại'}
                      </div>
                      <div className="text-xs text-[#475569] mt-0.5">
                        {language === 'en'
                          ? 'Key evidence supporting non-immigrant return ties under INA §214(b).'
                          : 'Bằng chứng quan trọng chứng minh ý định quay về theo điều khoản INA §214(b).'}
                      </div>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 p-4 rounded-lg border border-[#E2E8F0] hover:bg-[#F8FAFC] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={draft.passportValidOverSixMonths}
                      onChange={(e) =>
                        setDraft({
                          ...draft,
                          passportValidOverSixMonths: e.target.checked,
                        })
                      }
                      className="mt-0.5 w-5 h-5 rounded accent-[#1E247E] cursor-pointer"
                    />
                    <div className="text-sm">
                      <div className="font-semibold text-[#1E247E]">
                        {language === 'en'
                          ? 'Passport remains valid for at least 6 months beyond intended U.S. departure'
                          : 'Hộ chiếu còn hiệu lực ít nhất 6 tháng sau ngày dự kiến rời Hoa Kỳ'}
                      </div>
                      <div className="text-xs text-[#475569] mt-0.5">
                        {language === 'en'
                          ? 'Mandatory threshold prior to submitting Form DS-160.'
                          : 'Điều kiện bắt buộc trước khi khóa tờ khai DS-160.'}
                      </div>
                    </div>
                  </label>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-5">
                <h2 className="font-display text-xl font-bold text-[#1E247E]">
                  {language === 'en'
                    ? 'Step 3 — Prior Travel & Consular History'
                    : 'Bước 3 — Lịch sử Xuất nhập cảnh & Lãnh sự'}
                </h2>

                <div>
                  <span className="block text-sm font-semibold text-[#334155] mb-2">
                    {language === 'en'
                      ? 'Previous U.S. Visa History'
                      : 'Tiền sử Thị thực Hoa Kỳ'}
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {(
                      [
                        {
                          id: 'never',
                          en: 'First-time applicant',
                          vi: 'Chưa từng xin visa Mỹ',
                        },
                        {
                          id: 'approved-before',
                          en: 'Previously approved',
                          vi: 'Đã từng được cấp visa',
                        },
                        {
                          id: 'refused-214b',
                          en: 'Prior §214(b) refusal',
                          vi: 'Từng bị từ chối §214(b)',
                        },
                      ] as const
                    ).map((opt) => (
                      <label
                        key={opt.id}
                        className={`flex items-center gap-2.5 p-3.5 rounded-lg border cursor-pointer transition-colors ${
                          draft.priorUsVisa === opt.id
                            ? 'border-[#1E247E] bg-[#EEF2FF]'
                            : 'border-[#CBD5E1] hover:bg-[#F8FAFC]'
                        }`}
                      >
                        <input
                          type="radio"
                          name="priorUsVisa"
                          checked={draft.priorUsVisa === opt.id}
                          onChange={() => setDraft({ ...draft, priorUsVisa: opt.id })}
                          className="w-4 h-4 accent-[#1E247E]"
                        />
                        <span className="text-xs font-semibold text-[#1E247E]">
                          {opt[language]}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="block text-sm font-semibold text-[#334155] mb-2">
                    {language === 'en'
                      ? 'International Travel in Past 5 Years (OECD / G7 / Schengen / APAC)'
                      : 'Số quốc gia đã đến trong 5 năm qua (G7 / Schengen / Châu Á)'}
                  </span>
                  <div className="grid grid-cols-3 gap-3">
                    {(
                      [
                        { id: '0', en: '0 countries', vi: 'Chưa xuất cảnh' },
                        { id: '1-3', en: '1–3 countries', vi: '1–3 quốc gia' },
                        { id: '4-plus', en: '4+ countries', vi: 'Từ 4 quốc gia' },
                      ] as const
                    ).map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() =>
                          setDraft({ ...draft, internationalTravelCount: opt.id })
                        }
                        className={`h-11 rounded-lg border text-xs font-semibold transition-colors cursor-pointer ${
                          draft.internationalTravelCount === opt.id
                            ? 'border-[#1E247E] bg-[#EEF2FF] text-[#1E247E]'
                            : 'border-[#CBD5E1] text-[#334155] hover:bg-[#F8FAFC]'
                        }`}
                      >
                        {opt[language]}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <label className="flex items-start gap-3 p-4 rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={draft.consentTerms}
                      onChange={(e) => {
                        setDraft({ ...draft, consentTerms: e.target.checked });
                        if (errors.consentTerms)
                          setErrors({ ...errors, consentTerms: '' });
                      }}
                      className="mt-0.5 w-5 h-5 rounded accent-[#1E247E] cursor-pointer"
                    />
                    <span className="text-xs text-[#334155] leading-relaxed">
                      {language === 'en'
                        ? 'I understand Visa5S is an independent private consultancy, not affiliated with the U.S. government, and that readiness diagnostics provide procedural guidance rather than a guarantee of visa issuance.'
                        : 'Tôi hiểu rằng Visa5S là đơn vị tư vấn tư nhân độc lập, không trực thuộc Chính phủ Hoa Kỳ, và kết quả đánh giá mang tính định hướng quy trình, không bảo đảm kết quả cấp thị thực.'}
                    </span>
                  </label>
                  {errors.consentTerms && (
                    <p className="mt-1.5 inline-flex items-center gap-1.5 text-xs font-medium text-[#BA1A1A]">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.consentTerms}</span>
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Navigation Footer */}
            <div className="pt-6 border-t border-[#E2E8F0] flex items-center justify-between gap-4">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={() => setStep((s) => (s === 3 ? 2 : 1))}
                  className="h-11 px-4 rounded-lg border border-[#CBD5E1] text-sm font-semibold text-[#334155] hover:bg-[#F8FAFC] inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>{language === 'en' ? 'Back' : 'Quay lại'}</span>
                </button>
              ) : (
                <div />
              )}

              {step < 3 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="h-12 px-6 rounded-lg bg-[#1E247E] hover:bg-[#151A60] text-white text-sm font-semibold inline-flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <span>{language === 'en' ? 'Continue' : 'Tiếp tục'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="h-12 px-6 rounded-lg bg-[#E11D25] hover:bg-[#B91C1C] disabled:opacity-60 text-white text-sm font-semibold inline-flex items-center gap-2 transition-colors cursor-pointer disabled:cursor-not-allowed"
                >
                  <span>
                    {isSubmitting
                      ? language === 'en'
                        ? 'Sending...'
                        : 'Đang gửi hồ sơ...'
                      : language === 'en'
                        ? 'Submit & Generate Report'
                        : 'Gửi Hồ sơ & Tạo Báo cáo'}
                  </span>
                  {isSubmitting ? (
                    <Send className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </button>
              )}
            </div>
          </form>

          {/* Right Summary Context */}
          <aside className="lg:col-span-4 bg-white rounded-xl border border-[#E2E8F0] p-6 space-y-4">
            <div className="text-xs font-semibold text-[#E11D25]">
              {activePathway.code} · {activePathway.title[language]}
            </div>
            <h3 className="font-display text-lg font-bold text-[#1E247E]">
              {language === 'en' ? 'Selected Track Summary' : 'Thông tin Diện đã chọn'}
            </h3>
            <p className="text-xs text-[#475569] leading-relaxed">
              {activePathway.consularFocus[language]}
            </p>
            <div className="pt-3 border-t border-[#E2E8F0] space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-[#475569]">
                  {language === 'en' ? 'Consulate' : 'Lãnh sự quán'}
                </span>
                <span className="font-semibold text-[#1E247E]">{draft.consulate}</span>
              </div>
              <div className="flex justify-between gap-3">
                <span className="text-[#475569] shrink-0">
                  {language === 'en' ? 'Prep Turnaround' : 'Thời gian chuẩn bị'}
                </span>
                <span className="font-semibold text-[#0F172A] text-right">
                  {activePathway.typicalTimeline[language]}
                </span>
              </div>
              <div className="flex justify-between gap-3">
                <span className="text-[#475569] shrink-0">
                  {language === 'en' ? 'Visa Validity' : 'Thời hạn thị thực'}
                </span>
                <span className="font-semibold text-[#1E247E] text-right">
                  {activePathway.validityPeriod[language]}
                </span>
              </div>
            </div>
          </aside>
        </div>
      ) : (
        /* Step 4: Instant Readiness Report & Dossier Generated */
        createdDossier && (
          <section className="bg-white rounded-2xl border border-[#E2E8F0] shadow-ambient p-6 md:p-10 space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#E2E8F0]">
              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#E11D25]">
                  <FileCheck2 className="w-4 h-4" />
                  <span>
                    {language === 'en'
                      ? 'Eligibility Diagnostic Completed'
                      : 'Hoàn tất Báo cáo Thẩm định Hồ sơ'}
                  </span>
                </div>
                <h2 className="font-display text-2xl md:text-3xl font-extrabold text-[#1E247E]">
                  {createdDossier.applicantName} — {createdDossier.visaLabel}
                </h2>
                <p className="text-xs font-mono text-[#475569]">
                  {language === 'en' ? 'Reference:' : 'Mã hồ sơ:'} {createdDossier.caseNumber} ·{' '}
                  {createdDossier.consulate} · {createdDossier.targetTravelWindow}
                </p>
              </div>

              <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-6 py-4 text-center shrink-0">
                <div className="text-xs font-medium text-[#475569]">
                  {language === 'en' ? 'Dossier Readiness Index' : 'Chỉ số Sẵn sàng'}
                </div>
                <div className="font-display text-3xl font-extrabold text-[#1E247E] tabular-nums mt-0.5">
                  {createdDossier.readinessScore}/100
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-display text-base font-bold text-[#1E247E]">
                  {language === 'en'
                    ? 'Recommended Document Checklist'
                    : 'Danh mục Giấy tờ Cần chuẩn bị'}
                </h3>
                <ul className="space-y-2.5 text-sm text-[#334155]">
                  {!draft.passportValidOverSixMonths && (
                    <li className="flex items-start gap-2 text-[#BA1A1A]">
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>
                        {language === 'en'
                          ? 'Renew passport before DS-160 submission (requires 6+ months validity).'
                          : 'Cần gia hạn hộ chiếu trước khi nộp DS-160 (yêu cầu hạn trên 6 tháng).'}
                      </span>
                    </li>
                  )}
                  {draft.priorUsVisa === 'refused-214b' && (
                    <li className="flex items-start gap-2 text-[#735C00]">
                      <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>
                        {language === 'en'
                          ? 'Prior §214(b) refusal requires a documented material-change memorandum prior to re-booking.'
                          : 'Tiền sử từ chối §214(b) cần bản giải trình thay đổi hoàn cảnh mới trước khi đặt lịch lại.'}
                      </span>
                    </li>
                  )}
                  {createdDossier.checklist.map((item) => (
                    <li key={item.id} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#1E247E] shrink-0 mt-0.5" />
                      <span>{item.label[language]}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] p-5 space-y-4">
                <h3 className="font-display text-base font-bold text-[#1E247E]">
                  {language === 'en' ? 'Next Step with Visa5S' : 'Bước tiếp theo cùng Visa5S'}
                </h3>

                {emailStatus === 'sent' && (
                  <div className="flex items-start gap-2.5 p-3 rounded-lg bg-[#ECFDF5] border border-[#A7F3D0] text-xs text-[#065F46] leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>
                      {language === 'en'
                        ? `Your assessment details have been submitted to ${TARGET_EMAIL}. Our specialist will review and reach out shortly.`
                        : `Thông tin hồ sơ đã được gửi tới email ${TARGET_EMAIL}. Chuyên viên Visa5S sẽ kiểm tra và liên hệ lại sớm nhất.`}
                    </span>
                  </div>
                )}

                {emailStatus === 'error' && (
                  <div className="space-y-2 p-3 rounded-lg bg-[#FEF2F2] border border-[#FECACA] text-xs text-[#991B1B] leading-relaxed">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>
                        {language === 'en'
                          ? `Automatic email dispatch could not be completed (${emailErrorMsg || 'network issue'}). You can retry or open Gmail directly to send to ${TARGET_EMAIL}.`
                          : `Chưa thể gửi tự động qua máy chủ (${emailErrorMsg || 'lỗi kết nối'}). Bạn có thể thử gửi lại hoặc mở Gmail để gửi trực tiếp tới ${TARGET_EMAIL}.`}
                      </span>
                    </div>
                    <button
                      type="button"
                      disabled={isSubmitting}
                      onClick={() =>
                        sendDossierEmail(
                          createdDossier.caseNumber,
                          createdDossier.readinessScore
                        )
                      }
                      className="h-9 px-3.5 rounded-lg bg-[#991B1B] hover:bg-[#7F1D1D] text-white text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{language === 'en' ? 'Retry Automatic Send' : 'Thử gửi lại'}</span>
                    </button>
                  </div>
                )}

                <p className="text-xs text-[#475569] leading-relaxed">
                  {language === 'en'
                    ? `Contact our U.S. visa advisory desk at 0911 909 686 or ${TARGET_EMAIL} with your reference code to review your DS-160 and schedule 1-on-1 interview coaching.`
                    : `Liên hệ chuyên viên Visa5S qua hotline 0911 909 686 hoặc email ${TARGET_EMAIL} kèm mã hồ sơ để được rà soát DS-160, đặt lịch hẹn và luyện phỏng vấn 1-1.`}
                </p>

                <div className="flex flex-wrap gap-3 pt-1">
                  <a
                    href={buildGmailComposeHref(createdDossier)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-11 px-5 rounded-lg bg-[#1E247E] hover:bg-[#151A60] text-white text-xs font-semibold inline-flex items-center gap-2 transition-colors whitespace-nowrap shrink-0"
                  >
                    <Mail className="w-4 h-4" />
                    <span>
                      {language === 'en'
                        ? `Send via Gmail (${TARGET_EMAIL})`
                        : `Gửi qua Gmail (${TARGET_EMAIL})`}
                    </span>
                  </a>
                  <button
                    type="button"
                    onClick={onViewServices}
                    className="h-11 px-5 rounded-lg bg-[#E11D25] hover:bg-[#B91C1C] text-white text-xs font-semibold inline-flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <span>
                      {language === 'en'
                        ? 'View Visa Services'
                        : 'Xem Chi tiết Dịch vụ'}
                    </span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setEmailStatus('idle');
                      setStep(1);
                    }}
                    className="h-11 px-4 rounded-lg border border-[#CBD5E1] text-xs font-semibold text-[#334155] hover:bg-white cursor-pointer"
                  >
                    {language === 'en' ? 'Run Another Assessment' : 'Đánh giá Hồ sơ khác'}
                  </button>
                </div>
              </div>
            </div>
          </section>
        )
      )}

      <LegalDisclaimerBlock language={language} />
    </div>
  );
}
