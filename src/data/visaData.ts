import {
  CaseOutcome,
  ClientDossier,
  InterviewQuestion,
  Language,
  VisaPathway,
} from '../types/visa';

export const CONSULATES = [
  'TP. Hồ Chí Minh (Tổng LSQ Hoa Kỳ)',
  'Hà Nội (Đại sứ quán Hoa Kỳ)',
  'Gia hạn qua Bưu điện (Miễn phỏng vấn)',
] as const;

export const VISA_PATHWAYS: VisaPathway[] = [
  {
    id: 'tourism',
    code: 'B2 · Du lịch',
    filterGroup: 'tourism-visit',
    tierHighlight: 'popular',
    title: {
      en: 'U.S. Tourist Visa (B2)',
      vi: 'Visa Du lịch Mỹ (B2)',
    },
    kicker: {
      en: 'Non-Immigrant · Independent & Group Travel',
      vi: 'Không định cư · Du lịch tự túc & khám phá',
    },
    summary: {
      en: 'Complete DS-160 preparation, realistic travel itinerary structuring, financial tie packaging, and 1-on-1 mock consular interview coaching for U.S. tourism.',
      vi: 'Tư vấn lộ trình trọn gói: thẩm định hồ sơ nhân thân - tài chính, khai đơn DS-160 chuẩn xác, lên lịch trình tham quan hợp lý và luyện phỏng vấn 1-1 cùng chuyên viên.',
    },
    typicalTimeline: {
      en: '3–5 business days dossier prep + consulate slot',
      vi: '3–5 ngày làm việc hoàn thiện hồ sơ + đặt lịch phỏng vấn',
    },
    validityPeriod: {
      en: 'Up to 12 months (multiple entry)',
      vi: 'Thời hạn lên đến 12 tháng (nhập cảnh nhiều lần)',
    },
    keyRequirements: [
      {
        en: 'Valid original passport (at least 6 months remaining beyond return)',
        vi: 'Hộ chiếu gốc còn hạn tối thiểu 6 tháng sau ngày dự kiến rời Hoa Kỳ',
      },
      {
        en: 'Stable employment contract, business license, or retirement proof in Vietnam',
        vi: 'Giấy tờ chứng minh công việc ổn định, đăng ký kinh doanh hoặc hưu trí tại Việt Nam',
      },
      {
        en: 'Clear financial capability (savings book, income statements, property assets)',
        vi: 'Chứng minh tài chính minh bạch (sổ tiết kiệm, sao kê thu nhập, bất động sản)',
      },
    ],
    consularFocus: {
      en: 'Demonstrating genuine tourist intent, transparent trip funding, and strong ties ensuring timely return under INA §214(b).',
      vi: 'Chứng minh mục đích du lịch thuần túy, khả năng tự chi trả chuyến đi và ràng buộc chắc chắn quay về Việt Nam theo INA §214(b).',
    },
  },
  {
    id: 'business',
    code: 'B1 · Công tác',
    filterGroup: 'business',
    tierHighlight: 'popular',
    title: {
      en: 'U.S. Business Visa (B1)',
      vi: 'Visa Công tác Mỹ (B1)',
    },
    kicker: {
      en: 'Non-Immigrant · Meetings, Trade Shows & Conferences',
      vi: 'Không định cư · Gặp đối tác, hội nghị & triển lãm',
    },
    summary: {
      en: 'Structured DS-160 drafting, U.S. partner invitation audit, corporate dispatch decision review, and interview rehearsal for executives and specialists.',
      vi: 'Hỗ trợ chuẩn hóa quyết định cử đi công tác, rà soát thư mời từ đối tác Hoa Kỳ, khai đơn DS-160 đồng bộ và luyện phỏng vấn cho doanh nhân, chuyên viên.',
    },
    typicalTimeline: {
      en: '3–7 business days dossier prep + priority booking',
      vi: '3–7 ngày làm việc chuẩn bị hồ sơ & săn lịch hẹn phù hợp',
    },
    validityPeriod: {
      en: 'Up to 12 months (multiple entry)',
      vi: 'Thời hạn lên đến 12 tháng (nhập cảnh nhiều lần)',
    },
    keyRequirements: [
      {
        en: 'Official invitation letter or conference registration from U.S. counterpart',
        vi: 'Thư mời công tác chính thức hoặc xác nhận đăng ký hội nghị/triển lãm từ phía Hoa Kỳ',
      },
      {
        en: 'Employer dispatch decision and corporate tax/business registration documents',
        vi: 'Quyết định cử đi công tác của doanh nghiệp, giấy phép kinh doanh & biên lai thuế',
      },
      {
        en: 'Clear separation between short-term B1 business activities and paid U.S. labor',
        vi: 'Lịch trình làm việc ngắn hạn rõ ràng, đúng phạm vi hoạt động thương mại B1',
      },
    ],
    consularFocus: {
      en: 'Verifying legitimate commercial purpose, company sponsorship stability, and active business obligations back in Vietnam.',
      vi: 'Xác minh tính xác thực của đối tác Hoa Kỳ, năng lực doanh nghiệp cử đi và trách nhiệm điều hành/công việc tại Việt Nam.',
    },
  },
  {
    id: 'family-visit',
    code: 'B2 · Thăm thân',
    filterGroup: 'tourism-visit',
    title: {
      en: 'U.S. Family & Friend Visit Visa (B2)',
      vi: 'Visa Thăm thân Mỹ (B2)',
    },
    kicker: {
      en: 'Non-Immigrant · Visiting Relatives & Family Events',
      vi: 'Không định cư · Thăm người thân, bạn bè & dự lễ',
    },
    summary: {
      en: 'Comprehensive preparation of relationship evidence, U.S. host invitation letters, graduation/wedding invites, and consular interview strategy.',
      vi: 'Hướng dẫn chuẩn bị thư mời từ người thân tại Mỹ, chứng từ chứng minh mối quan hệ huyết thống/bạn bè và luyện trả lời phỏng vấn rõ ràng, trung thực.',
    },
    typicalTimeline: {
      en: '5–7 business days dossier & relationship alignment',
      vi: '5–7 ngày làm việc rà soát thư mời & chứng từ nhân thân',
    },
    validityPeriod: {
      en: 'Up to 12 months (multiple entry)',
      vi: 'Thời hạn lên đến 12 tháng (nhập cảnh nhiều lần)',
    },
    keyRequirements: [
      {
        en: 'Invitation letter and copy of U.S. host’s passport, Green Card, or legal status',
        vi: 'Thư mời từ người thân kèm bản sao hộ chiếu, Thẻ Xanh hoặc giấy tờ cư trú hợp pháp tại Mỹ',
      },
      {
        en: 'Civil status documents proving family relationship (birth/marriage certificates)',
        vi: 'Giấy tờ hộ tịch chứng minh mối quan hệ (giấy khai sinh, đăng ký kết hôn, hình ảnh)',
      },
      {
        en: 'Applicant’s own financial and family ties in Vietnam (property, pension, dependents)',
        vi: 'Ràng buộc gia đình, tài sản hoặc công việc của đương đơn tại Việt Nam để quay về',
      },
    ],
    consularFocus: {
      en: 'Ensuring transparent disclosure of U.S. relatives on DS-160 while proving the visit is strictly temporary.',
      vi: 'Khai báo minh bạch thông tin người thân đang cư trú tại Mỹ trên DS-160 và chứng minh chuyến thăm có thời hạn rõ ràng.',
    },
  },
  {
    id: 'renewal',
    code: 'Gia hạn · Bưu điện',
    filterGroup: 'renewal',
    tierHighlight: 'waiver',
    title: {
      en: 'U.S. Visa Renewal (Interview Waiver)',
      vi: 'Gia hạn Visa Mỹ (Qua đường Bưu điện)',
    },
    kicker: {
      en: 'Interview Waiver · Drop-box Postal Processing',
      vi: 'Miễn phỏng vấn · Nộp hồ sơ qua đường bưu điện',
    },
    summary: {
      en: 'Fast-track renewal eligibility audit, DS-160 update, waiver confirmation generation, and postal submission coordination for qualified applicants.',
      vi: 'Kiểm tra điều kiện miễn phỏng vấn, cập nhật tờ khai DS-160 mới, tạo thư xác nhận nộp hồ sơ và điều phối gửi - nhận hộ chiếu qua đường bưu điện nhanh chóng.',
    },
    typicalTimeline: {
      en: '2–3 business days prep + 2–3 weeks postal processing',
      vi: '2–3 ngày hoàn thiện hồ sơ + khoảng 2–3 tuần xét duyệt qua bưu điện',
    },
    validityPeriod: {
      en: 'Up to 12 months (same non-immigrant visa class)',
      vi: 'Thời hạn lên đến 12 tháng (cùng diện thị thực đã được cấp trước đó)',
    },
    keyRequirements: [
      {
        en: 'Prior U.S. visa in the same category still valid or expired within the eligible waiver window',
        vi: 'Visa Mỹ cùng loại còn hạn hoặc hết hạn trong khung thời gian được xét miễn phỏng vấn theo quy định',
      },
      {
        en: 'Original passport with prior U.S. visa stamp (or both old and new passports)',
        vi: 'Hộ chiếu gốc có dán visa Mỹ cũ (mang kèm cả hộ chiếu cũ và hộ chiếu mới nếu đã đổi sổ)',
      },
      {
        en: 'Updated DS-160 confirmation page, 5×5 cm biometric photo, and interview waiver confirmation',
        vi: 'Trang xác nhận DS-160 mới, ảnh thẻ 5×5 cm chuẩn Lãnh sự và thư xác nhận miễn phỏng vấn',
      },
    ],
    consularFocus: {
      en: 'Confirming strict interview-waiver eligibility (no prior 221(g)/refusal since last visa, identical visa category, physically in Vietnam).',
      vi: 'Đối chiếu chính xác điều kiện miễn phỏng vấn: đang có mặt tại Việt Nam, không bị từ chối visa gần nhất và thông tin DS-160 nhất quán.',
    },
  },
];

export const CASE_OUTCOMES: CaseOutcome[] = [
  {
    id: 'case-1',
    clientName: 'Nguyễn Hoàng Minh',
    roleAndOrg: {
      en: 'Managing Director · Mekong Precision Manufacturing',
      vi: 'Giám đốc Điều hành · Mekong Precision Manufacturing',
    },
    visaCode: 'B1 · Công tác',
    consulate: 'TP. Hồ Chí Minh',
    timelineDays: 14,
    challenge: {
      en: 'Previously refused under INA §214(b) due to an inconsistent DS-160 employment description and unclear trade-show invitation.',
      vi: 'Từng bị từ chối theo điều khoản INA §214(b) do mô tả công việc trên DS-160 thiếu nhất quán và thư mời hội chợ chưa rõ lịch trình.',
    },
    approach: {
      en: 'Reconstructed corporate governance records, tax filings, and structured a 4-day Chicago machinery exposition itinerary.',
      vi: 'Chuẩn hóa lại hồ sơ pháp lý doanh nghiệp, chứng từ thuế, thư mời đối tác và luyện phỏng vấn 1-1 giải trình rành mạch mục đích công tác.',
    },
    outcome: {
      en: 'Approved on re-application within 14 days from dossier intake to passport return.',
      vi: 'Được cấp thị thực ngay trong lần phỏng vấn lại, hoàn tất từ tiếp nhận đến nhận hộ chiếu trong 14 ngày.',
    },
  },
  {
    id: 'case-2',
    clientName: 'Trần Thị Thu Hà',
    roleAndOrg: {
      en: 'Business Owner · Bình Dương Furniture Export',
      vi: 'Chủ Cơ sở Kinh doanh · Nội thất Xuất khẩu Bình Dương',
    },
    visaCode: 'B2 · Thăm thân',
    consulate: 'TP. Hồ Chí Minh',
    timelineDays: 12,
    challenge: {
      en: 'Wanted to attend her daughter’s university graduation in California while having previously undisclosed extended relatives in the U.S.',
      vi: 'Muốn sang California dự lễ tốt nghiệp của con gái nhưng lo ngại cách khai báo thông tin người thân tại Mỹ trên mẫu đơn DS-160.',
    },
    approach: {
      en: 'Transparently mapped all U.S. relative details on DS-160, compiled graduation invite and Vietnam business/property ties.',
      vi: 'Khai báo minh bạch đầy đủ thông tin người thân trên DS-160, sắp xếp thư mời lễ tốt nghiệp cùng giấy tờ sở hữu nhà đất và cơ sở kinh doanh tại Việt Nam.',
    },
    outcome: {
      en: 'B2 visa approved on first interview without additional administrative review.',
      vi: 'Đạt visa B2 ngay lần phỏng vấn đầu tiên, kịp thời gian sang Mỹ dự lễ tốt nghiệp.',
    },
  },
  {
    id: 'case-3',
    clientName: 'Lê Quốc Bảo',
    roleAndOrg: {
      en: 'Senior Logistics Manager · Tân Cảng Supply Chain',
      vi: 'Trưởng phòng Vận tải · Tân Cảng Supply Chain',
    },
    visaCode: 'Gia hạn · Bưu điện',
    consulate: 'Gia hạn qua Bưu điện',
    timelineDays: 16,
    challenge: {
      en: 'Prior B1/B2 visa expired 4 months earlier while he had changed passport numbers and needed urgent renewal for a Q1 customer meeting.',
      vi: 'Visa B1/B2 cũ vừa hết hạn 4 tháng và khách hàng mới đổi sang hộ chiếu gắn chip mới, cần gia hạn kịp lịch họp đầu quý.',
    },
    approach: {
      en: 'Verified interview-waiver eligibility, linked old and new passport numbers in the new DS-160, and dispatched postal drop-box packet.',
      vi: 'Kiểm tra đủ điều kiện miễn phỏng vấn, khai DS-160 liên kết chuẩn số hộ chiếu cũ - mới và gửi bộ hồ sơ qua đường bưu điện đúng quy cách.',
    },
    outcome: {
      en: 'New 12-month multiple-entry B1/B2 visa stamped and returned by courier in 16 days without visiting the consulate.',
      vi: 'Nhận lại hộ chiếu kèm visa B1/B2 mới qua chuyển phát tận nhà sau 16 ngày mà không cần đến Lãnh sự quán.',
    },
  },
];

export const INITIAL_DOSSIERS: ClientDossier[] = [
  {
    caseNumber: 'V5S-2026-8419',
    applicantName: 'Lê Minh Tuấn',
    email: 'tuan.le@saigon-industrial.vn',
    phone: '+84 908 412 890',
    visaId: 'business',
    visaLabel: 'B1 · Visa Công tác Mỹ',
    consulate: 'TP. Hồ Chí Minh (Tổng LSQ Hoa Kỳ)',
    targetTravelWindow: 'Tháng 03/2027 (Hội chợ Thương mại Chicago)',
    submittedDate: '28/10/2026',
    readinessScore: 86,
    advisoryTier: 'Gói Công tác B1',
    checklist: [
      {
        id: 'chk-1',
        label: {
          en: 'Valid Passport (minimum 6 months validity beyond return)',
          vi: 'Hộ chiếu gốc còn hạn tối thiểu 6 tháng sau ngày về',
        },
        category: { en: 'Identity', vi: 'Định danh' },
        status: 'verified',
        required: true,
        fileName: 'LeMinhTuan_Passport_2032.pdf',
      },
      {
        id: 'chk-2',
        label: {
          en: 'DS-160 Confirmation Page & Barcode Audit',
          vi: 'Trang xác nhận DS-160 & đối soát mã vạch',
        },
        category: { en: 'Consular Form', vi: 'Đơn Lãnh sự' },
        status: 'verified',
        required: true,
        fileName: 'DS160_AA00E8419_Reviewed.pdf',
      },
      {
        id: 'chk-3',
        label: {
          en: 'U.S. Partner Conference Invitation Letter & Dispatch Decision',
          vi: 'Thư mời hội nghị đối tác Hoa Kỳ & Quyết định cử đi công tác',
        },
        category: { en: 'Purpose of Travel', vi: 'Mục đích chuyến đi' },
        status: 'verified',
        required: true,
        fileName: 'Chicago_Expo_Invitation_2027.pdf',
      },
      {
        id: 'chk-4',
        label: {
          en: '6-Month Corporate Bank Statement & Tax Receipt',
          vi: 'Sao kê ngân hàng doanh nghiệp 6 tháng & biên lai thuế',
        },
        category: { en: 'Financial Ties', vi: 'Năng lực tài chính' },
        status: 'action-needed',
        required: true,
      },
      {
        id: 'chk-5',
        label: {
          en: 'Land Use Right Certificate (Red Book) Copy',
          vi: 'Bản sao Giấy chứng nhận Quyền sử dụng đất',
        },
        category: { en: 'Home Ties', vi: 'Ràng buộc tại Việt Nam' },
        status: 'pending',
        required: false,
      },
    ],
    milestones: [
      {
        id: 'ms-1',
        title: { en: 'Intake & Eligibility Audit', vi: 'Tiếp nhận & Thẩm định hồ sơ' },
        detail: {
          en: 'Completed INA §214(b) risk review and document blueprint.',
          vi: 'Hoàn tất rà soát rủi ro INA §214(b) và danh mục giấy tờ.',
        },
        dateLabel: '28/10',
        state: 'completed',
      },
      {
        id: 'ms-2',
        title: { en: 'DS-160 Compliance & Appointment', vi: 'Chuẩn hóa DS-160 & Đặt lịch hẹn' },
        detail: {
          en: 'Cross-checked employment history and booked HCMC consulate slot.',
          vi: 'Đối chiếu lịch sử công tác và đặt lịch hẹn tại LSQ TP.HCM.',
        },
        dateLabel: '04/11',
        state: 'completed',
      },
      {
        id: 'ms-3',
        title: { en: 'Mock Consular Interview', vi: 'Luyện phỏng vấn 1-1 cùng chuyên viên' },
        detail: {
          en: 'Pending final bank statement upload before 45-minute simulation.',
          vi: 'Chờ bổ sung sao kê ngân hàng trước buổi mô phỏng 45 phút.',
        },
        dateLabel: '18/11',
        state: 'active',
      },
      {
        id: 'ms-4',
        title: { en: 'Consulate Window Appearance', vi: 'Phỏng vấn trực tiếp tại Lãnh sự quán' },
        detail: {
          en: 'Final dossier binder briefing and window protocol.',
          vi: 'Hướng dẫn quy trình sắp xếp hồ sơ và trả lời tại quầy phỏng vấn.',
        },
        dateLabel: '26/11',
        state: 'upcoming',
      },
    ],
  },
  {
    caseNumber: 'V5S-2026-9034',
    applicantName: 'Trần Thị Thu Hà',
    email: 'thuha.tran@binhduong-export.vn',
    phone: '+84 912 778 304',
    visaId: 'family-visit',
    visaLabel: 'B2 · Visa Thăm thân Mỹ',
    consulate: 'TP. Hồ Chí Minh (Tổng LSQ Hoa Kỳ)',
    targetTravelWindow: 'Tháng 05/2027 (Lễ Tốt nghiệp California)',
    submittedDate: '02/11/2026',
    readinessScore: 91,
    advisoryTier: 'Gói Thăm thân B2',
    checklist: [
      {
        id: 'fv-1',
        label: {
          en: 'Signed Invitation Letter & U.S. Relative Status Copy',
          vi: 'Thư mời từ người thân & bản sao giấy tờ cư trú hợp pháp tại Mỹ',
        },
        category: { en: 'Host Documentation', vi: 'Hồ sơ người mời' },
        status: 'verified',
        required: true,
        fileName: 'ThuMoi_California_2027.pdf',
      },
      {
        id: 'fv-2',
        label: {
          en: 'Birth / Marriage Certificate Proving Family Relationship',
          vi: 'Giấy khai sinh / Đăng ký kết hôn chứng minh quan hệ thân nhân',
        },
        category: { en: 'Relationship Proof', vi: 'Chứng minh quan hệ' },
        status: 'verified',
        required: true,
        fileName: 'GiayKhaiSinh_QuanHe.pdf',
      },
      {
        id: 'fv-3',
        label: {
          en: 'Savings Book & Business License in Vietnam',
          vi: 'Sổ tiết kiệm & Giấy phép hộ kinh doanh tại Việt Nam',
        },
        category: { en: 'Financial & Ties', vi: 'Tài chính & Ràng buộc' },
        status: 'pending',
        required: true,
      },
    ],
    milestones: [
      {
        id: 'fvms-1',
        title: { en: 'Relationship & DS-160 Audit', vi: 'Rà soát Quan hệ & DS-160' },
        detail: {
          en: 'Verified U.S. relative details match civil records.',
          vi: 'Đối chiếu thông tin người thân tại Mỹ khớp hồ sơ hộ tịch.',
        },
        dateLabel: '02/11',
        state: 'completed',
      },
      {
        id: 'fvms-2',
        title: { en: 'Financial Ties Packaging', vi: 'Hoàn thiện chứng từ Tài chính' },
        detail: {
          en: 'Organizing property deeds and business revenue statements.',
          vi: 'Sắp xếp sổ đỏ, sổ tiết kiệm và chứng từ kinh doanh.',
        },
        dateLabel: '09/11',
        state: 'active',
      },
      {
        id: 'fvms-3',
        title: { en: 'Mock Interview Coaching', vi: 'Luyện phỏng vấn Thăm thân' },
        detail: {
          en: 'Practicing concise answers on trip duration and return date.',
          vi: 'Thực hành trả lời rõ ràng về thời gian lưu trú và ngày quay về.',
        },
        dateLabel: '19/11',
        state: 'upcoming',
      },
      {
        id: 'fvms-4',
        title: { en: 'HCMC Consulate Interview', vi: 'Phỏng vấn tại LSQ TP.HCM' },
        detail: {
          en: 'Morning interview appointment slot confirmed.',
          vi: 'Đã xác nhận khung giờ phỏng vấn buổi sáng.',
        },
        dateLabel: '03/12',
        state: 'upcoming',
      },
    ],
  },
  {
    caseNumber: 'V5S-2026-7105',
    applicantName: 'Nguyễn Hoàng Nam',
    email: 'hoangnam.nguyen@vinalog.vn',
    phone: '+84 903 654 218',
    visaId: 'renewal',
    visaLabel: 'Gia hạn Visa Mỹ (Bưu điện)',
    consulate: 'Gia hạn qua Bưu điện (Miễn phỏng vấn)',
    targetTravelWindow: 'Tháng 01/2027 (Gia hạn B1/B2)',
    submittedDate: '05/11/2026',
    readinessScore: 95,
    advisoryTier: 'Gói Gia hạn Miễn phỏng vấn',
    checklist: [
      {
        id: 'rn-1',
        label: {
          en: 'Original Current Passport + Old Passport with Prior U.S. Visa',
          vi: 'Hộ chiếu mới còn hạn + Hộ chiếu cũ có dán visa Mỹ trước đây',
        },
        category: { en: 'Passport & Prior Visa', vi: 'Hộ chiếu & Visa cũ' },
        status: 'verified',
        required: true,
        fileName: 'NguyenHoangNam_OldVisa_B1B2.pdf',
      },
      {
        id: 'rn-2',
        label: {
          en: 'New DS-160 Confirmation & Interview Waiver Letter',
          vi: 'Trang xác nhận DS-160 mới & Thư xác nhận miễn phỏng vấn',
        },
        category: { en: 'Waiver Filing', vi: 'Hồ sơ Miễn phỏng vấn' },
        status: 'verified',
        required: true,
        fileName: 'InterviewWaiver_V5S7105.pdf',
      },
      {
        id: 'rn-3',
        label: {
          en: 'Two 5×5 cm Biometric Photos (White Background, Taken Within 6 Months)',
          vi: '02 ảnh thẻ 5×5 cm nền trắng (chụp trong vòng 6 tháng)',
        },
        category: { en: 'Biometrics', vi: 'Ảnh thẻ Lãnh sự' },
        status: 'pending',
        required: true,
      },
    ],
    milestones: [
      {
        id: 'rnms-1',
        title: { en: 'Waiver Eligibility Check', vi: 'Kiểm tra Điều kiện Miễn PV' },
        detail: {
          en: 'Confirmed prior B1/B2 expired within eligible renewal period.',
          vi: 'Xác nhận visa B1/B2 cũ đủ điều kiện gia hạn không cần phỏng vấn.',
        },
        dateLabel: '05/11',
        state: 'completed',
      },
      {
        id: 'rnms-2',
        title: { en: 'DS-160 & Drop-box Confirmation', vi: 'Khai DS-160 & Thư xác nhận bưu cục' },
        detail: {
          en: 'Generated official drop-box confirmation letter.',
          vi: 'Hoàn tất thư xác nhận nộp hồ sơ qua bưu cục.',
        },
        dateLabel: '07/11',
        state: 'completed',
      },
      {
        id: 'rnms-3',
        title: { en: 'Postal Drop-box Dispatch', vi: 'Gửi hồ sơ qua Bưu điện' },
        detail: {
          en: 'Collecting physical 5×5 cm photos to dispatch via designated courier.',
          vi: 'Nhận ảnh thẻ 5×5 cm và gửi bộ hồ sơ qua bưu cục chỉ định.',
        },
        dateLabel: '14/11',
        state: 'active',
      },
      {
        id: 'rnms-4',
        title: { en: 'Passport & Visa Delivery', vi: 'Nhận lại Hộ chiếu tận nhà' },
        detail: {
          en: 'Estimated 2–3 weeks return delivery upon consulate stamping.',
          vi: 'Dự kiến trả kết quả tận nơi sau 2–3 tuần xét duyệt.',
        },
        dateLabel: '02/12',
        state: 'upcoming',
      },
    ],
  },
];

export const INTERVIEW_QUESTIONS: InterviewQuestion[] = [
  {
    id: 'iq-tour-1',
    visaId: 'tourism',
    question: {
      en: 'Why do you want to travel to the United States right now, and what cities are on your itinerary?',
      vi: 'Tại sao ông/bà muốn đi du lịch Hoa Kỳ vào thời điểm này và dự kiến tham quan những thành phố nào?',
    },
    officerIntent: {
      en: 'Checks whether your travel plan is authentic, self-planned, and consistent with your declared leave duration and budget.',
      vi: 'Kiểm tra xem lịch trình du lịch có thực tế, tự chủ và khớp với thời gian nghỉ phép, ngân sách đã khai hay không.',
    },
    recommendedApproach: {
      en: 'State exact departure/return dates, 2–3 specific cities/landmarks, and confirm how many days your employer or business allows you to be away.',
      vi: 'Nêu rõ ngày đi - ngày về, 2–3 điểm đến cụ thể (ví dụ bờ Tây hoặc bờ Đông) và thời gian nghỉ phép được công ty phê duyệt.',
    },
  },
  {
    id: 'iq-tour-2',
    visaId: 'tourism',
    question: {
      en: 'Who is paying for this trip, and what is your current monthly income?',
      vi: 'Ai là người chi trả cho chuyến đi này và thu nhập hàng tháng hiện tại của ông/bà là bao nhiêu?',
    },
    officerIntent: {
      en: 'Verifies financial proportionality — ensuring the trip cost makes sense relative to savings and steady income.',
      vi: 'Đánh giá tính hợp lý giữa chi phí chuyến đi với mức thu nhập ổn định và tiền tiết kiệm tích lũy.',
    },
    recommendedApproach: {
      en: 'Answer clearly with your monthly salary/business profit and total savings, matching the figures written on DS-160.',
      vi: 'Trả lời dứt khoát mức lương/lợi nhuận kinh doanh hàng tháng và số dư tiết kiệm tự chi trả, khớp với số liệu khai trên DS-160.',
    },
  },
  {
    id: 'iq-bus-1',
    visaId: 'business',
    question: {
      en: 'What is the specific business purpose of your trip, and why does it require your physical presence in the U.S.?',
      vi: 'Mục đích công tác cụ thể của ông/bà là gì và tại sao cần phải sang làm việc trực tiếp tại Hoa Kỳ?',
    },
    officerIntent: {
      en: 'Tests whether your activities fall strictly within B1 commercial scope (meetings, trade shows, negotiations) rather than unauthorized U.S. labor.',
      vi: 'Kiểm tra hoạt động có đúng phạm vi thương mại B1 (họp đối tác, triển lãm, đàm phán) và không phải lao động hưởng lương tại Mỹ.',
    },
    recommendedApproach: {
      en: 'Lead with exact dates, city, U.S. counterpart company name, and specific meeting/conference agenda in 2 crisp sentences.',
      vi: 'Trả lời trực diện trong 2 câu gồm ngày đi, thành phố, tên công ty đối tác/hội nghị và nội dung đàm phán cụ thể.',
    },
  },
  {
    id: 'iq-bus-2',
    visaId: 'business',
    question: {
      en: 'Who manages your company or team responsibilities while you are in the United States?',
      vi: 'Ai sẽ phụ trách công việc hoặc điều hành doanh nghiệp của ông/bà trong thời gian công tác tại Hoa Kỳ?',
    },
    officerIntent: {
      en: 'Evaluates your operational anchor at home and confirms your stay is strictly temporary.',
      vi: 'Đánh giá mức độ gắn kết công việc tại Việt Nam và tính chất ngắn hạn của chuyến công tác.',
    },
    recommendedApproach: {
      en: 'Name your deputy or team structure and explain why your trip is time-bound before returning to ongoing domestic deliverables.',
      vi: 'Nêu rõ nhân sự bàn giao tạm thời và lý do phải quay về đúng hạn để tiếp tục điều hành dự án trong nước.',
    },
  },
  {
    id: 'iq-fam-1',
    visaId: 'family-visit',
    question: {
      en: 'How are you related to the person you are visiting in the United States, and when did they move there?',
      vi: 'Ông/bà có mối quan hệ như thế nào với người thân tại Hoa Kỳ và họ sang Mỹ từ khi nào?',
    },
    officerIntent: {
      en: 'Cross-checks family transparency against your DS-160 disclosures and assesses whether you might overstay with relatives.',
      vi: 'Đối chiếu tính trung thực với thông tin khai báo người thân trên DS-160 và đánh giá nguy cơ ở lại.',
    },
    recommendedApproach: {
      en: 'State the exact relationship, their current immigration status (Citizen / Green Card / F-1 student), and your fixed return reason in Vietnam.',
      vi: 'Nêu chính xác mối quan hệ, tình trạng cư trú hiện tại của người thân (Công dân / Thẻ Xanh / Du học sinh) cùng lý do chắc chắn phải quay về Việt Nam.',
    },
  },
  {
    id: 'iq-fam-2',
    visaId: 'family-visit',
    question: {
      en: 'How long do you plan to stay with your family, and who takes care of your home or business while you are away?',
      vi: 'Ông/bà dự kiến ở lại thăm người thân bao lâu và ai chăm lo công việc, gia đình tại Việt Nam?',
    },
    officerIntent: {
      en: 'Confirms a short, realistic visit duration (typically 2–4 weeks) rather than open-ended residency.',
      vi: 'Xác nhận thời gian thăm thân ngắn hạn hợp lý (thường 2–4 tuần) thay vì có ý định lưu trú kéo dài.',
    },
    recommendedApproach: {
      en: 'Give a specific 2–3 week window tied to a concrete milestone (graduation ceremony, family holiday) and highlight family/assets remaining in Vietnam.',
      vi: 'Đưa ra mốc thời gian cụ thể 2–3 tuần gắn với sự kiện (lễ tốt nghiệp, kỳ nghỉ) và nhấn mạnh các ràng buộc còn lại tại Việt Nam.',
    },
  },
  {
    id: 'iq-ren-1',
    visaId: 'renewal',
    question: {
      en: 'Under what conditions could a postal renewal applicant still be asked to appear for an in-person follow-up?',
      vi: 'Trong trường hợp nào hồ sơ gia hạn qua đường bưu điện vẫn có thể được Lãnh sự mời lên phỏng vấn bổ sung (221(g))?',
    },
    officerIntent: {
      en: 'While most qualifying renewals bypass interviews, officers can request an appearance if employment changed significantly, prior stays were unusually long, or biometric clarity is needed.',
      vi: 'Dù đa số hồ sơ đủ điều kiện sẽ được miễn phỏng vấn, Lãnh sự vẫn có quyền mời xác minh nếu lần đi Mỹ trước lưu trú quá dài hoặc thông tin công việc thay đổi lớn.',
    },
    recommendedApproach: {
      en: 'Ensure your new DS-160 clearly explains your prior U.S. stay durations and current employer, and keep supporting work/financial docs ready just in case.',
      vi: 'Khai DS-160 mới khớp thông tin lịch sử nhập cảnh Mỹ trước đây, cập nhật chính xác công việc hiện tại và lưu sẵn bản sao giấy tờ công việc phòng trường hợp cần đối chiếu.',
    },
  },
];

export const UI_COPY: Record<
  Language,
  {
    nav: {
      overview: string;
      pathways: string;
      assessment: string;
      portal: string;
      cta: string;
    };
    hero: {
      eyebrow: string;
      headline: string;
      subheadline: string;
      primaryCta: string;
      secondaryCta: string;
      trustRow: string[];
    };
    screener: {
      title: string;
      subtitle: string;
      visaLabel: string;
      consulateLabel: string;
      priorRefusalLabel: string;
      priorRefusalNo: string;
      priorRefusalYes: string;
      submitBtn: string;
    };
    benchmarks: {
      items: { value: string; label: string; detail: string }[];
    };
    disclaimer: {
      heading: string;
      body: string;
      bullets: string[];
    };
  }
> = {
  en: {
    nav: {
      overview: 'Overview',
      pathways: 'Visa Services',
      assessment: 'Assessment',
      portal: 'Client Portal',
      cta: 'Book Consultation',
    },
    hero: {
      eyebrow: 'U.S. Visa Full-Package Advisory · HCMC · Binh Duong · Hanoi',
      headline: 'U.S. Visa Advisory – Transparent & Professional Dossier Preparation',
      subheadline:
        'Visa5S specializes in U.S. Tourist (B2), Business (B1), Family Visit (B2), and Postal Visa Renewal—handling DS-160 drafting, document structuring, appointment booking, and 1-on-1 interview coaching.',
      primaryCta: 'Start Eligibility Assessment',
      secondaryCta: 'Explore Visa Services',
      trustRow: [
        'Tourism · Business · Family Visit · Renewal',
        'End-to-End DS-160 & Document Structuring',
        '1-on-1 Mock Consular Interview',
      ],
    },
    screener: {
      title: 'Quick Dossier Screener',
      subtitle: 'Select your U.S. visa purpose to preview timeline and required documents.',
      visaLabel: 'U.S. Visa Service',
      consulateLabel: 'Submission Channel / Consulate',
      priorRefusalLabel: 'Prior U.S. Visa Refusal (INA §214(b))',
      priorRefusalNo: 'No prior refusals',
      priorRefusalYes: 'Yes, previously refused',
      submitBtn: 'Continue to Full Assessment',
    },
    benchmarks: {
      items: [
        {
          value: '4 Services',
          label: 'Focused U.S. Visa Scope',
          detail: 'Tourism (B2), Business (B1), Family Visit (B2), and Postal Renewal',
        },
        {
          value: '3–7 Days',
          label: 'Dossier Prep Turnaround',
          detail: 'DS-160 drafting, translation review, and interview folder ready',
        },
        {
          value: 'A–Z',
          label: 'Full-Package Guidance',
          detail: 'Profile evaluation, form completion, booking, and post-visa support',
        },
        {
          value: '1-on-1',
          label: 'Mock Interview Coaching',
          detail: 'Simulated Q&A tailored to your job, finances, and travel history',
        },
      ],
    },
    disclaimer: {
      heading: 'Regulatory Disclosure & Non-Affiliation Notice',
      body: 'Visa5S is an independent private visa consultancy and document preparation firm. We are not affiliated with, endorsed by, or part of the U.S. Department of State or any U.S. Embassy or Consulate.',
      bullets: [
        'Visa issuance and interview-waiver eligibility are decided solely by U.S. Consular Officers under the Immigration and Nationality Act.',
        'Visa5S provides structured preparation of DS-160 forms, supporting dossiers, appointment scheduling, and interview coaching.',
        'Official U.S. visa instructions and DS-160 forms are publicly accessible at travel.state.gov.',
      ],
    },
  },
  vi: {
    nav: {
      overview: 'Tổng quan',
      pathways: 'Dịch vụ Visa Mỹ',
      assessment: 'Đánh giá hồ sơ',
      portal: 'Cổng khách hàng',
      cta: 'Đặt lịch tư vấn',
    },
    hero: {
      eyebrow: 'Dịch vụ Xin Visa Mỹ Trọn Gói · TP.HCM · Bình Dương · Hà Nội',
      headline: 'Tư Vấn Visa Mỹ – Hỗ Trợ Chuẩn Bị Hồ Sơ Minh Bạch, Chuyên Nghiệp',
      subheadline:
        'Visa5S đồng hành chuyên sâu bốn dịch vụ thị thực Hoa Kỳ: Visa Du lịch (B2), Visa Công tác (B1), Visa Thăm thân và Gia hạn Visa Mỹ qua đường bưu điện — từ thẩm định hồ sơ, khai DS-160, đặt lịch hẹn đến luyện phỏng vấn 1-1.',
      primaryCta: 'Đánh giá Hồ sơ Ngay',
      secondaryCta: 'Xem Chi tiết Dịch vụ',
      trustRow: [
        'Du lịch · Công tác · Thăm thân · Gia hạn',
        'Khai DS-160 & Sắp xếp hồ sơ chuẩn xác',
        'Luyện phỏng vấn 1-1 cùng chuyên viên',
      ],
    },
    screener: {
      title: 'Sàng lọc Hồ sơ Nhanh',
      subtitle: 'Chọn đúng nhu cầu xin visa Mỹ để xem ngay thời gian xử lý và quy trình chuẩn bị.',
      visaLabel: 'Dịch vụ Visa Mỹ',
      consulateLabel: 'Địa điểm nộp hồ sơ / Phỏng vấn',
      priorRefusalLabel: 'Lịch sử từ chối visa Mỹ (INA §214(b))',
      priorRefusalNo: 'Chưa từng bị từ chối',
      priorRefusalYes: 'Đã từng bị từ chối trước đây',
      submitBtn: 'Tiếp tục Đánh giá Chi tiết',
    },
    benchmarks: {
      items: [
        {
          value: '4 Diện',
          label: 'Chuyên biệt Visa Mỹ',
          detail: 'Du lịch (B2), Công tác (B1), Thăm thân (B2) và Gia hạn bưu điện',
        },
        {
          value: '3–7 Ngày',
          label: 'Hoàn thiện DS-160',
          detail: 'Sắp xếp chứng từ logic, dịch thuật & kiểm tra thông tin chuẩn xác',
        },
        {
          value: 'Trọn gói',
          label: 'Quy trình A–Z',
          detail: 'Thẩm định hồ sơ, đặt lịch hẹn, giao nhận bưu điện & hỗ trợ sau visa',
        },
        {
          value: '1 kèm 1',
          label: 'Luyện Phỏng vấn Thực tế',
          detail: 'Thực hành trả lời sát hồ sơ công việc, tài chính và lịch trình',
        },
      ],
    },
    disclaimer: {
      heading: 'Tuyên bố Tuân thủ Pháp lý & Miễn trừ Liên kết Chính phủ',
      body: 'Visa5S là đơn vị tư vấn hồ sơ thị thực tư nhân độc lập. Chúng tôi không trực thuộc, không đại diện và không được ủy quyền bởi Bộ Ngoại giao Hoa Kỳ hay bất kỳ Đại sứ quán / Tổng Lãnh sự quán Hoa Kỳ nào.',
      bullets: [
        'Quyết định cấp thị thực hay xét duyệt miễn phỏng vấn thuộc toàn quyền của Viên chức Lãnh sự Hoa Kỳ theo Luật Di trú và Quốc tịch (INA).',
        'Visa5S hỗ trợ thẩm định điều kiện, hoàn thiện tờ khai DS-160, sắp xếp chứng từ, đặt lịch hẹn và luyện phỏng vấn theo quy trình chuẩn.',
        'Đương đơn luôn có thể tự tiếp cận hướng dẫn và tờ khai DS-160 chính thức tại travel.state.gov.',
      ],
    },
  },
};
