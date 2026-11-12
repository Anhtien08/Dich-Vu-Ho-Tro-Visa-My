export type AppScreen = 'overview' | 'pathways' | 'assessment';

export type Language = 'en' | 'vi';

export type VisaCategoryId = 'tourism' | 'business' | 'family-visit' | 'renewal';

export type VisaFilterGroup = 'all' | 'tourism-visit' | 'business' | 'renewal';

export interface BilingualText {
  en: string;
  vi: string;
}

export interface VisaPathway {
  id: VisaCategoryId;
  code: string;
  filterGroup: Exclude<VisaFilterGroup, 'all'>;
  tierHighlight?: 'popular' | 'waiver';
  title: BilingualText;
  kicker: BilingualText;
  summary: BilingualText;
  typicalTimeline: BilingualText;
  validityPeriod: BilingualText;
  keyRequirements: BilingualText[];
  consularFocus: BilingualText;
}

export interface CaseOutcome {
  id: string;
  clientName: string;
  roleAndOrg: BilingualText;
  visaCode: string;
  consulate: string;
  timelineDays: number;
  challenge: BilingualText;
  approach: BilingualText;
  outcome: BilingualText;
}

export interface ChecklistItem {
  id: string;
  label: BilingualText;
  category: BilingualText;
  status: 'verified' | 'pending' | 'action-needed';
  required: boolean;
  fileName?: string;
}

export interface MilestoneStep {
  id: string;
  title: BilingualText;
  detail: BilingualText;
  dateLabel: string;
  state: 'completed' | 'active' | 'upcoming';
}

export interface InterviewQuestion {
  id: string;
  visaId: VisaCategoryId;
  question: BilingualText;
  officerIntent: BilingualText;
  recommendedApproach: BilingualText;
}

export interface ClientDossier {
  caseNumber: string;
  applicantName: string;
  email: string;
  phone: string;
  visaId: VisaCategoryId;
  visaLabel: string;
  consulate: string;
  targetTravelWindow: string;
  submittedDate: string;
  readinessScore: number;
  advisoryTier: string;
  checklist: ChecklistItem[];
  milestones: MilestoneStep[];
}

export interface AssessmentDraft {
  visaId: VisaCategoryId;
  consulate: string;
  applicantCount: number;
  expeditedReview: boolean;
  fullName: string;
  email: string;
  phone: string;
  currentCountry: string;
  occupationType: 'business-owner' | 'corporate-staff' | 'freelancer' | 'retired';
  employmentYears: string;
  financialReserve: 'under-10k' | '10k-30k' | '30k-100k' | 'over-100k';
  hasPropertyOrFamilyTies: boolean;
  passportValidOverSixMonths: boolean;
  priorUsVisa: 'never' | 'approved-before' | 'refused-214b';
  internationalTravelCount: '0' | '1-3' | '4-plus';
  targetTravelWindow: string;
  consentTerms: boolean;
}
