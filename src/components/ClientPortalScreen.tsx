import {
  AlertCircle,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock,
  FileText,
  Upload,
} from 'lucide-react';
import { useState } from 'react';
import { INTERVIEW_QUESTIONS } from '../data/visaData';
import { ChecklistItem, ClientDossier, Language } from '../types/visa';

interface ClientPortalScreenProps {
  language: Language;
  dossiers: ClientDossier[];
  activeCaseNumber: string;
  onSelectCase: (caseNumber: string) => void;
  onUpdateChecklistItem: (
    caseNumber: string,
    itemId: string,
    updates: Partial<ChecklistItem>
  ) => void;
  onStartNewAssessment: () => void;
}

export function ClientPortalScreen({
  language,
  dossiers,
  activeCaseNumber,
  onSelectCase,
  onUpdateChecklistItem,
  onStartNewAssessment,
}: ClientPortalScreenProps) {
  const [statusFilter, setStatusFilter] = useState<
    'all' | 'verified' | 'action-needed' | 'pending'
  >('all');
  const [openQuestionId, setOpenQuestionId] = useState<string | null>(null);

  const activeDossier =
    dossiers.find((d) => d.caseNumber === activeCaseNumber) ?? dossiers[0];

  const verifiedCount = activeDossier.checklist.filter(
    (c) => c.status === 'verified'
  ).length;
  const completionPct = Math.round(
    (verifiedCount / Math.max(1, activeDossier.checklist.length)) * 100
  );

  const filteredChecklist =
    statusFilter === 'all'
      ? activeDossier.checklist
      : activeDossier.checklist.filter((item) => item.status === statusFilter);

  const relevantQuestions = INTERVIEW_QUESTIONS.filter(
    (q) => q.visaId === activeDossier.visaId
  );

  const handleFileAttach = (itemId: string, file: File | undefined) => {
    if (!file) return;
    onUpdateChecklistItem(activeDossier.caseNumber, itemId, {
      status: 'verified',
      fileName: file.name,
    });
  };

  return (
    <div className="max-w-[1240px] mx-auto px-5 md:px-8 lg:px-12 py-10 md:py-14 space-y-10">
      {/* Workspace Header & Case Switcher */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-[#E2E8F0]">
        <div className="space-y-2">
          <p className="text-xs font-semibold text-[#E11D25]">
            {language === 'en'
              ? 'Visa5S Client Dossier Workspace'
              : 'Không gian Quản lý Hồ sơ Khách hàng'}
          </p>
          <h1 className="font-display text-3xl md:text-4xl font-extrabold text-[#1E247E] tracking-[-0.015em]">
            {activeDossier.applicantName}
          </h1>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#475569]">
            <span className="font-mono font-semibold text-[#1E247E] tabular-nums">
              {activeDossier.caseNumber}
            </span>
            <span aria-hidden="true">·</span>
            <span>{activeDossier.visaLabel}</span>
            <span aria-hidden="true">·</span>
            <span>{activeDossier.consulate}</span>
            <span aria-hidden="true">·</span>
            <span>{activeDossier.targetTravelWindow}</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div>
            <label htmlFor="portal-case-select" className="sr-only">
              Select active dossier
            </label>
            <select
              id="portal-case-select"
              value={activeDossier.caseNumber}
              onChange={(e) => onSelectCase(e.target.value)}
              className="h-11 px-3.5 rounded-lg bg-white border border-[#CBD5E1] text-xs font-semibold text-[#1E247E] input-visa cursor-pointer"
            >
              {dossiers.map((d) => (
                <option key={d.caseNumber} value={d.caseNumber}>
                  {d.caseNumber} — {d.applicantName} ({d.visaId.toUpperCase()})
                </option>
              ))}
            </select>
          </div>
          <button
            type="button"
            onClick={onStartNewAssessment}
            className="h-11 px-4 rounded-lg bg-[#1E247E] hover:bg-[#151A60] text-white text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            {language === 'en' ? '+ New Dossier Assessment' : '+ Tạo Hồ sơ Mới'}
          </button>
        </div>
      </div>

      {/* Summary Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white rounded-xl border border-[#E2E8F0] p-5 space-y-1">
          <div className="text-xs text-[#475569]">
            {language === 'en' ? 'Dossier Readiness Score' : 'Chỉ số Sẵn sàng'}
          </div>
          <div className="font-display text-2xl font-extrabold text-[#1E247E] tabular-nums">
            {activeDossier.readinessScore}/100
          </div>
          <div className="text-xs text-[#475569]">{activeDossier.advisoryTier}</div>
        </div>

        <div className="bg-white rounded-xl border border-[#E2E8F0] p-5 space-y-2">
          <div className="flex items-center justify-between text-xs text-[#475569]">
            <span>
              {language === 'en' ? 'Document Verification' : 'Tỷ lệ Chứng từ Hợp lệ'}
            </span>
            <span className="font-mono font-bold text-[#1E247E] tabular-nums">
              {verifiedCount}/{activeDossier.checklist.length} ({completionPct}%)
            </span>
          </div>
          <div className="h-2 rounded-full bg-[#F1F5F9] overflow-hidden">
            <div
              className="h-full bg-[#E11D25] transition-all duration-200"
              style={{ width: `${completionPct}%` }}
            />
          </div>
          <div className="text-xs text-[#475569]">
            {language === 'en'
              ? 'Attach files below to verify items live'
              : 'Đính kèm tài liệu bên dưới để cập nhật trạng thái'}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-[#E2E8F0] p-5 space-y-1">
          <div className="text-xs text-[#475569]">
            {language === 'en' ? 'Applicant Contact' : 'Thông tin Liên hệ'}
          </div>
          <div className="text-sm font-semibold text-[#1E247E] truncate">
            {activeDossier.email}
          </div>
          <div className="font-mono text-xs text-[#475569] tabular-nums">
            {activeDossier.phone}
          </div>
        </div>
      </div>

      {/* Milestone Timeline */}
      <section className="bg-white rounded-xl border border-[#E2E8F0] p-6 space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-bold text-[#1E247E]">
            {language === 'en' ? 'Consular Milestone Tracker' : 'Tiến trình Xử lý Lãnh sự'}
          </h2>
          <span className="text-xs font-mono text-[#475569]">
            {language === 'en' ? 'Updated ' : 'Cập nhật '}
            {activeDossier.submittedDate}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {activeDossier.milestones.map((ms, idx) => (
            <div
              key={ms.id}
              className={`p-4 rounded-lg border space-y-2 ${
                ms.state === 'active'
                  ? 'border-[#1E247E] bg-[#EEF2FF]/60'
                  : ms.state === 'completed'
                    ? 'border-[#E2E8F0] bg-[#F8FAFC]'
                    : 'border-[#E2E8F0] bg-white'
              }`}
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono font-semibold text-[#475569] tabular-nums">
                  0{idx + 1} · {ms.dateLabel}
                </span>
                {ms.state === 'completed' && (
                  <CheckCircle2 className="w-4 h-4 text-[#1E247E]" />
                )}
                {ms.state === 'active' && (
                  <Clock className="w-4 h-4 text-[#E11D25]" />
                )}
              </div>
              <div className="font-display text-sm font-bold text-[#1E247E]">
                {ms.title[language]}
              </div>
              <p className="text-xs text-[#475569] leading-relaxed">
                {ms.detail[language]}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Main Split: Interactive Checklist + Consular Interview Prep */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Document Checklist */}
        <section className="lg:col-span-7 bg-white rounded-xl border border-[#E2E8F0] p-6 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h2 className="font-display text-lg font-bold text-[#1E247E]">
              {language === 'en' ? 'Dossier Document Checklist' : 'Danh mục Chứng từ'}
            </h2>

            <div className="inline-flex items-center gap-1 p-1 bg-[#F1F5F9] rounded-lg">
              {(
                [
                  { id: 'all', en: 'All', vi: 'Tất cả' },
                  { id: 'verified', en: 'Verified', vi: 'Hợp lệ' },
                  { id: 'action-needed', en: 'Action', vi: 'Cần bổ sung' },
                  { id: 'pending', en: 'Pending', vi: 'Chờ nộp' },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setStatusFilter(tab.id)}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                    statusFilter === tab.id
                      ? 'bg-white text-[#1E247E] shadow-sm'
                      : 'text-[#475569] hover:text-[#1E247E]'
                  }`}
                >
                  {tab[language]}
                </button>
              ))}
            </div>
          </div>

          <div className="divide-y divide-[#E2E8F0]">
            {filteredChecklist.length === 0 ? (
              <p className="py-8 text-center text-sm text-[#475569]">
                {language === 'en'
                  ? 'No documents match this status filter.'
                  : 'Không có tài liệu nào ở trạng thái này.'}
              </p>
            ) : (
              filteredChecklist.map((item) => {
                const isVerified = item.status === 'verified';
                const isAction = item.status === 'action-needed';

                return (
                  <div
                    key={item.id}
                    className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-start gap-3">
                      <button
                        type="button"
                        onClick={() =>
                          onUpdateChecklistItem(activeDossier.caseNumber, item.id, {
                            status: isVerified ? 'pending' : 'verified',
                          })
                        }
                        aria-label={`Toggle verification for ${item.label.en}`}
                        className={`mt-0.5 w-5 h-5 rounded flex items-center justify-center border transition-colors shrink-0 cursor-pointer ${
                          isVerified
                            ? 'bg-[#1E247E] border-[#1E247E] text-white'
                            : 'bg-white border-[#CBD5E1] hover:border-[#1E247E]'
                        }`}
                      >
                        {isVerified && <Check className="w-3.5 h-3.5" />}
                      </button>

                      <div className="space-y-1">
                        <div className="text-sm font-semibold text-[#1E247E]">
                          {item.label[language]}
                        </div>
                        <div className="flex flex-wrap items-center gap-2 text-xs text-[#475569]">
                          <span>{item.category[language]}</span>
                          <span aria-hidden="true">·</span>
                          <span>
                            {item.required
                              ? language === 'en'
                                ? 'Mandatory'
                                : 'Bắt buộc'
                              : language === 'en'
                                ? 'Supporting'
                                : 'Bổ trợ'}
                          </span>
                          {item.fileName && (
                            <>
                              <span aria-hidden="true">·</span>
                              <span className="inline-flex items-center gap-1 font-mono text-[#1E247E]">
                                <FileText className="w-3 h-3" />
                                {item.fileName}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                      <span
                        className={`inline-flex items-center gap-1 text-xs font-semibold ${
                          isVerified
                            ? 'text-[#1E247E]'
                            : isAction
                              ? 'text-[#E11D25]'
                              : 'text-[#475569]'
                        }`}
                      >
                        {isAction && <AlertCircle className="w-3.5 h-3.5" />}
                        {isVerified
                          ? language === 'en'
                            ? 'Verified'
                            : 'Đã xác minh'
                          : isAction
                            ? language === 'en'
                              ? 'Action Needed'
                              : 'Cần bổ sung'
                            : language === 'en'
                              ? 'Pending'
                              : 'Đang chờ'}
                      </span>

                      <label className="inline-flex items-center gap-1.5 h-9 px-3 rounded-lg border border-[#CBD5E1] hover:border-[#1E247E] text-xs font-semibold text-[#1E247E] cursor-pointer transition-colors">
                        <Upload className="w-3.5 h-3.5" />
                        <span>{language === 'en' ? 'Attach' : 'Tải lên'}</span>
                        <input
                          type="file"
                          className="sr-only"
                          onChange={(e) =>
                            handleFileAttach(item.id, e.target.files?.[0])
                          }
                        />
                      </label>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </section>

        {/* Consular Interview Prep Simulator */}
        <section className="lg:col-span-5 bg-white rounded-xl border border-[#E2E8F0] p-6 space-y-5">
          <div className="space-y-1">
            <h2 className="font-display text-lg font-bold text-[#1E247E]">
              {language === 'en'
                ? 'Consular Interview Prep Bank'
                : 'Ngân hàng Luyện Phỏng vấn'}
            </h2>
            <p className="text-xs text-[#475569]">
              {language === 'en'
                ? `Tailored officer questions for ${activeDossier.visaId.toUpperCase()} applicants.`
                : `Câu hỏi trọng tâm dành riêng cho diện ${activeDossier.visaId.toUpperCase()}.`}
            </p>
          </div>

          <div className="space-y-3">
            {relevantQuestions.map((q) => {
              const isOpen = openQuestionId === q.id;
              return (
                <div
                  key={q.id}
                  className="rounded-lg border border-[#E2E8F0] overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => setOpenQuestionId(isOpen ? null : q.id)}
                    className="w-full p-4 text-left flex items-start justify-between gap-3 bg-[#F8FAFC] hover:bg-[#F1F5F9] transition-colors cursor-pointer"
                  >
                    <span className="text-sm font-semibold text-[#1E247E] leading-snug">
                      {q.question[language]}
                    </span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-[#475569] shrink-0 mt-0.5" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-[#475569] shrink-0 mt-0.5" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="p-4 bg-white space-y-3 text-xs leading-relaxed border-t border-[#E2E8F0]">
                      <div>
                        <div className="font-semibold text-[#E11D25] mb-0.5">
                          {language === 'en'
                            ? 'What the Consular Officer Evaluates'
                            : 'Mục tiêu Đánh giá của Viên chức Lãnh sự'}
                        </div>
                        <p className="text-[#334155]">{q.officerIntent[language]}</p>
                      </div>
                      <div>
                        <div className="font-semibold text-[#1E247E] mb-0.5">
                          {language === 'en'
                            ? 'Recommended Answer Structure'
                            : 'Cấu trúc Trả lời Khuyến nghị'}
                        </div>
                        <p className="text-[#334155]">
                          {q.recommendedApproach[language]}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
